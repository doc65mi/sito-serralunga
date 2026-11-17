/**
 * Aggiorna i testi — Version: 1.00
 * Uso: npm run seed:testi  (pannello → Strumenti → «Aggiorna i testi»; parte da solo dopo un deploy
 * con AGGIORNAMENTO_AUTOMATICO=1, come gli altri compiti).
 *
 * Porta nei siti già avviati la revisione dei testi di testi-2026-11.ts. Regola: un campo cambia
 * SOLO se contiene ancora, parola per parola, il testo di partenza. Un testo scritto o corretto dal
 * pannello o dalla pagina è diverso dal testo di partenza, quindi non si tocca mai. Prima di ogni
 * modifica si salva una copia completa del documento (tutte le lingue) in .compiti/copie/<data>/.
 * Si può rilanciare: la seconda volta non trova più testi vecchi e non cambia nulla.
 */
import fs from 'fs'
import path from 'path'

import { getPayload } from 'payload'
import config from '@payload-config'

import { TESTI_2026_11, TUTTE, VERSIONE_TESTI } from './testi-2026-11'

const payload = await getPayload({ config })
const log = (m: string) => payload.logger.info(`[testi] ${m}`)

const LINGUE = ['it', 'en'] as const
type Lingua = (typeof LINGUE)[number]
const SALTA = new Set(['id', 'createdAt', 'updatedAt', '_status', 'slug', 'hex', 'email', 'globalType', 'filename', 'mimeType'])

const copie = path.join(process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media'), '.compiti', 'copie', `testi-${new Date().toISOString().replace(/[:.]/g, '-')}`)
const copia = (nome: string, dati: unknown) => {
  fs.mkdirSync(copie, { recursive: true })
  fs.writeFileSync(path.join(copie, `${nome}.json`), JSON.stringify(dati, null, 2))
}

/** Per ogni pagina globale o collezione e lingua: testo vecchio → testo nuovo. */
const mappe = new Map<string, Map<string, string>>()
const usate = new Set<string>()
for (const g of TESTI_2026_11) {
  const dove = g.dove.includes('*') ? [...TUTTE.globali, ...TUTTE.collezioni] : g.dove
  for (const d of dove)
    for (const [io, inn, eo, en] of g.coppie) {
      const coppie: [Lingua, string | undefined, string | undefined][] = [
        ['it', io, inn],
        ['en', eo, en],
      ]
      for (const [l, vecchio, nuovo] of coppie) {
        if (!vecchio || !nuovo || vecchio === nuovo) continue
        const k = `${d}|${l}`
        if (!mappe.has(k)) mappe.set(k, new Map())
        mappe.get(k)!.set(vecchio, nuovo)
      }
    }
}

/** Sostituisce i testi vecchi in profondità; restituisce i campi di primo livello cambiati. */
function sostituisci(v: unknown, mappa: Map<string, string>, chiave: string, dove: string, l: string, campi: Set<string>, radice: string): unknown {
  if (Array.isArray(v)) return v.map((x) => sostituisci(x, mappa, chiave, dove, l, campi, radice))
  if (v && typeof v === 'object') {
    const o: Record<string, unknown> = {}
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) o[k] = SALTA.has(k) ? x : sostituisci(x, mappa, k, dove, l, campi, radice || k)
    return o
  }
  if (typeof v === 'string' && !SALTA.has(chiave)) {
    const nuovo = mappa.get(v) ?? mappa.get(v.trim())
    if (nuovo !== undefined) {
      campi.add(radice)
      usate.add(`${dove}|${l}|${v.trim()}`)
      return nuovo
    }
  }
  return v
}

function cambiati(doc: Record<string, unknown>, mappa: Map<string, string>, dove: string, l: string) {
  const campi = new Set<string>()
  const nuovo = sostituisci(doc, mappa, '', dove, l, campi, '') as Record<string, unknown>
  const data: Record<string, unknown> = {}
  for (const c of campi) data[c] = nuovo[c]
  return data
}

let modifiche = 0
let errori = 0
for (const slug of TUTTE.globali) {
  for (const l of LINGUE) {
    const mappa = mappe.get(`${slug}|${l}`)
    if (!mappa) continue
    const doc = (await payload.findGlobal({ slug: slug as never, locale: l as never, fallbackLocale: false as never, depth: 0, draft: true })) as unknown as Record<string, unknown>
    const data = cambiati(doc, mappa, slug, l)
    if (!Object.keys(data).length) continue
    copia(`globale-${slug}-${l}`, await payload.findGlobal({ slug: slug as never, locale: 'all' as never, depth: 0, draft: true }))
    try {
      await payload.updateGlobal({ slug: slug as never, locale: l as never, depth: 0, draft: doc._status === 'draft', data: data as never })
    } catch (e) {
      errori++
      log(`NON aggiornato: pagina ${slug} [${l}]: ${(e as Error).message}`)
      continue
    }
    modifiche++
    log(`aggiornato: pagina ${slug} [${l}] → ${Object.keys(data).join(', ')}`)
  }
}
for (const collection of TUTTE.collezioni) {
  for (const l of LINGUE) {
    const mappa = mappe.get(`${collection}|${l}`)
    if (!mappa) continue
    const res = await payload.find({ collection: collection as never, locale: l as never, fallbackLocale: false as never, depth: 0, draft: true, pagination: false })
    for (const doc of res.docs as unknown as Record<string, unknown>[]) {
      const data = cambiati(doc, mappa, collection, l)
      if (!Object.keys(data).length) continue
      copia(`${collection}-${doc.id}-${l}`, await payload.findByID({ collection: collection as never, id: doc.id as number, locale: 'all' as never, depth: 0, draft: true }))
      try {
        await payload.update({ collection: collection as never, id: doc.id as number, locale: l as never, depth: 0, draft: doc._status === 'draft', data: data as never })
      } catch (e) {
        errori++
        log(`NON aggiornato: ${collection}/${doc.slug || doc.id} [${l}]: ${(e as Error).message}`)
        continue
      }
      modifiche++
      log(`aggiornato: ${collection}/${doc.slug || doc.id} [${l}] → ${Object.keys(data).join(', ')}`)
    }
  }
}

// Testi di partenza non trovati: la pagina non esiste in questo sito o il testo è stato modificato a mano.
const mancanti: string[] = []
for (const [k, mappa] of mappe) {
  const [dove, l] = k.split('|')
  for (const vecchio of mappa.keys()) if (!usate.has(`${dove}|${l}|${vecchio}`)) mancanti.push(`${dove} [${l}]: «${vecchio.replace(/\n/g, ' ').slice(0, 70)}»`)
}
if (mancanti.length) {
  log(`${mancanti.length} testi di partenza non trovati (già aggiornati, modificati dal sito o pagina assente): restano come sono`)
  for (const m of mancanti.slice(0, 80)) log(`  non trovato: ${m}`)
}
log(`testi ${VERSIONE_TESTI}: ${modifiche} documenti aggiornati${modifiche ? `, copie in ${copie}` : ''}${errori ? `, ${errori} non aggiornati per errore (vedi sopra)` : ''}`)
process.exit(errori ? 1 : 0)
