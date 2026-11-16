/**
 * Version: 1.01
 * Ritratti dei designer migliorati con l'AI (npm run ai:ritratti).
 *
 * Per molti designer serralunga.com pubblica solo una miniatura (225 px): ingrandita risulta sgranata.
 * Questo comando rilegge la miniatura originale, la fa ingrandire e ripulire dal fornitore AI scelto
 * per le immagini (Impostazioni > Intelligenza artificiale) e la sostituisce al ritratto del designer.
 *
 * - Lavora solo sui ritratti messi dal seed e con fonte più stretta di SOGLIA px: una foto caricata a mano
 *   o già grande non viene toccata. Un ritratto già migliorato non viene rifatto (AI_RITRATTI_RIFAI=1 lo rifà).
 * - Il risultato è una ricostruzione: il volto può differire in piccoli dettagli. Per questo la foto porta il
 *   credito "Ritratto migliorato con AI" e la scheda resta segnata come ritratto provvisorio, da rivedere.
 * - La foto di prima resta nella libreria: per tornare indietro basta riselezionarla nella scheda.
 * - AI_RITRATTI_SOLO=slug1,slug2 limita il lavoro ad alcuni designer; AI_RITRATTI_PROVA=1 non salva nulla.
 * - AI_RITRATTI_MODELLO=nome prova un altro modello per le immagini solo per questa esecuzione, senza cambiare
 *   le impostazioni; AI_RITRATTI_USCITA=cartella salva lì una copia di ogni risultato (anche in prova), per confrontarli.
 * Ogni ritratto consuma una generazione di immagine sul credito del fornitore.
 */
import fs from 'fs'
import path from 'path'

import { getPayload } from 'payload'
import sharp from 'sharp'
import config from '@payload-config'

import { designerFonti } from '../seed/designer-altri'
import { configAi, ritoccaImmagine } from './fornitori'

const SOGLIA = 700
const MARCA = '-ritratto-ai'
const ISTRUZIONE = [
  'This is a small, low-resolution portrait photograph of a real person. Restore it and upscale it to a sharp, high-resolution photograph.',
  'It must remain the same photograph of the same person: keep exactly the same face, facial features, age, expression, hair, pose, clothing, framing, crop, background, lighting and colours.',
  'If the photo is black and white, keep it black and white. Do not beautify, do not change the identity, do not add or remove any element, do not add text, borders or watermarks.',
  'Only remove compression artefacts and blur, and recover natural photographic detail. Return only the image, with the same aspect ratio as the original.',
].join(' ')

const payload = await getPayload({ config })
const riga = (t: string) => console.log(`[ai:ritratti] ${t}`)
const c = await configAi(payload)
const f = c.fornitoreImmagini
const modelloProva = (process.env.AI_RITRATTI_MODELLO || '').trim()
if (modelloProva) c.immagini[f] = modelloProva
const uscita = (process.env.AI_RITRATTI_USCITA || '').trim()
if (!c.chiavi[f] || !c.immagini[f]) {
  riga(`manca la chiave o il modello per le immagini (${f}): si impostano nel pannello, Impostazioni > Intelligenza artificiale`)
  process.exit(1)
}
riga(`fornitore ${f}, modello ${c.immagini[f]}`)

const solo = (process.env.AI_RITRATTI_SOLO || '').split(',').map((x) => x.trim()).filter(Boolean)
const prova = process.env.AI_RITRATTI_PROVA === '1'
const rifai = process.env.AI_RITRATTI_RIFAI === '1'
// I nomi dei file caricati passano dallo slug (minuscole e trattini): si confrontano nella stessa forma.
const radice = (nome?: string | null) =>
  (nome || '')
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-hd$/, '')
    .replace(/-\d$/, '')

let fatti = 0
let saltati = 0
let falliti = 0
for (const d of designerFonti()) {
  if (solo.length && !solo.includes(d.slug)) continue
  if (!d.ritratto) continue
  const trovato = await payload.find({ collection: 'designer', where: { slug: { equals: d.slug } }, limit: 1, depth: 1, draft: true })
  const doc = trovato.docs[0] as unknown as { id: number; ritratto?: { id: number; filename?: string } | null } | undefined
  if (!doc) continue
  const attuale = doc.ritratto?.filename || ''
  const giaAi = attuale.includes(MARCA)
  const attesa = radice(decodeURIComponent(path.basename(new URL(d.ritratto).pathname)))
  if (giaAi && !rifai) {
    saltati++
    continue
  }
  if (attuale && !giaAi && radice(attuale) !== attesa) {
    riga(`${d.slug}: ritratto caricato a mano (${attuale}), non lo tocco`)
    saltati++
    continue
  }
  try {
    const url = new URL(d.ritratto)
    url.searchParams.delete('width')
    const res = await fetch(url, { signal: AbortSignal.timeout(60_000) })
    if (!res.ok) throw new Error(`fonte non scaricata (HTTP ${res.status})`)
    const fonte = Buffer.from(await res.arrayBuffer())
    const info = await sharp(fonte).metadata()
    const larga = info.width || 0
    if (larga >= SOGLIA) {
      saltati++
      continue
    }
    // Al fornitore si manda un PNG pulito della miniatura originale, senza passaggi intermedi.
    const png = await sharp(fonte).rotate().png().toBuffer()
    const inizio = Date.now()
    const esito = await ritoccaImmagine(c, { dati: png, mime: 'image/png' }, ISTRUZIONE)
    const dopo = await sharp(esito.dati).metadata()
    if (!dopo.width || !dopo.height || dopo.width < 600) throw new Error(`risultato troppo piccolo (${dopo.width}x${dopo.height})`)
    // Stesse proporzioni della fonte: se il fornitore le cambia si ritaglia al centro, senza deformare.
    const proporzione = (info.width || 1) / (info.height || 1)
    const largaFinale = Math.min(dopo.width, Math.round(dopo.height * proporzione))
    const altaFinale = Math.round(largaFinale / proporzione)
    const webp = await sharp(esito.dati).resize({ width: largaFinale, height: altaFinale, fit: 'cover', position: 'attention' }).webp({ quality: 90, effort: 5 }).toBuffer()
    riga(`${d.slug}: da ${info.width}x${info.height} a ${largaFinale}x${altaFinale} in ${Date.now() - inizio} ms${prova ? ' (prova, non salvato)' : ''}`)
    if (uscita) {
      fs.mkdirSync(uscita, { recursive: true })
      fs.writeFileSync(path.join(uscita, `${d.slug}--${c.immagini[f].replace(/[^a-z0-9.]+/gi, '-')}.webp`), webp)
    }
    if (!prova) {
      const media = await payload.create({
        collection: 'media',
        data: { alt: `Ritratto di ${d.nome}`, credito: 'Ritratto migliorato con AI' },
        file: { data: webp, mimetype: 'image/webp', name: `${d.slug}${MARCA}.webp`, size: webp.length },
      })
      await payload.update({ collection: 'designer', id: doc.id, data: { ritratto: media.id, ritrattoProvvisorio: true } as never, depth: 0 })
    }
    fatti++
  } catch (err) {
    falliti++
    riga(`${d.slug}: NON riuscito. ${(err as Error).message.slice(0, 300)}`)
  }
}
riga(`fatti ${fatti}, lasciati com'erano ${saltati}, non riusciti ${falliti}`)
process.exit(falliti && !fatti ? 1 : 0)
