/**
 * Contenuti iniziali presi dai template (template/*.dc.html).
 * Uso: npm run seed  (oppure, in Docker: docker compose exec cms npm run seed)
 *
 * - Crea l'utente amministratore da SEED_EMAIL / SEED_PASSWORD se non ci sono utenti.
 * - Carica le foto: quelle in template/ dal disco, quelle di serralunga.com scaricandole.
 *   Se una foto non si scarica, il campo resta vuoto e il sito mostra il segnaposto.
 * - Si può rilanciare: i documenti esistenti con lo stesso slug vengono aggiornati, non duplicati.
 */
import fs from 'fs'
import path from 'path'

import { getPayload } from 'payload'
import config from '@payload-config'

import { aquaLounger, caseLoge, designerDati, prodottiCard } from './dati'
import { homeDati, impostazioniDati, paginaDesignerDati } from './globali'

const payload = await getPayload({ config })
const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

const TEMPLATE_DIR = path.resolve(process.cwd(), process.env.SEED_TEMPLATE_DIR || '../template')

const mediaCache = new Map<string, number | null>()

const tipo = (nome: string) => {
  const ext = path.extname(nome).toLowerCase()
  return (
    { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[ext] ||
    'application/octet-stream'
  )
}

/** Restituisce l'id del media; sorgente = percorso in template/ oppure URL https. */
export async function media(sorgente: string, alt: string): Promise<number | null> {
  if (mediaCache.has(sorgente)) return mediaCache.get(sorgente) ?? null
  let id: number | null = null
  try {
    let data: Buffer
    let nome: string
    if (/^https?:\/\//.test(sorgente)) {
      const url = new URL(sorgente)
      nome = path.basename(url.pathname)
      const res = await fetch(sorgente, { signal: AbortSignal.timeout(30_000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data = Buffer.from(await res.arrayBuffer())
    } else {
      const file = path.join(TEMPLATE_DIR, sorgente)
      nome = path.basename(file)
      data = fs.readFileSync(file)
    }
    const esistente = await payload.find({
      collection: 'media',
      where: { filename: { equals: nome } },
      limit: 1,
      depth: 0,
    })
    if (esistente.docs[0]) {
      id = esistente.docs[0].id as number
    } else {
      const doc = await payload.create({
        collection: 'media',
        data: { alt },
        file: { data, mimetype: tipo(nome), name: nome, size: data.length },
      })
      id = doc.id as number
    }
  } catch (err) {
    payload.logger.warn(`[seed] foto non caricata (${sorgente}): ${(err as Error).message}`)
  }
  mediaCache.set(sorgente, id)
  return id
}

type Slugged = 'prodotti' | 'designer' | 'case-history'

async function salva(collection: Slugged, data: Record<string, unknown>): Promise<number> {
  const slug = data.slug as string
  const trovato = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true })
  const dati = { ...data, _status: 'published' } as never
  if (trovato.docs[0]) {
    const doc = await payload.update({ collection, id: trovato.docs[0].id, data: dati })
    log(`aggiornato ${collection}/${slug}`)
    return doc.id as number
  }
  const doc = await payload.create({ collection, data: dati })
  log(`creato ${collection}/${slug}`)
  return doc.id as number
}

// 1. Utente amministratore
const utenti = await payload.count({ collection: 'users' })
if (utenti.totalDocs === 0 && process.env.SEED_EMAIL && process.env.SEED_PASSWORD) {
  await payload.create({
    collection: 'users',
    data: { email: process.env.SEED_EMAIL, password: process.env.SEED_PASSWORD, nome: 'Amministratore' },
  })
  log(`creato l'utente ${process.env.SEED_EMAIL}`)
}

// 2. Designer
const designerId: Record<string, number> = {}
for (const d of await designerDati(media)) {
  designerId[d.slug as string] = await salva('designer', d)
}

// 3. Case history (prima dei prodotti, che la collegano)
const caseId = await salva('case-history', await caseLoge(media))

// 4. Prodotti
const prodottoId: Record<string, number> = {}
prodottoId['aqua-lounger'] = await salva('prodotti', await aquaLounger(media, designerId, [caseId]))
for (const p of await prodottiCard(media, designerId)) {
  prodottoId[p.slug as string] = await salva('prodotti', p)
}

// 5. Pagine e impostazioni
await payload.updateGlobal({ slug: 'impostazioni', data: (await impostazioniDati(media)) as never })
log('aggiornate le impostazioni')
await payload.updateGlobal({
  slug: 'home',
  data: { ...(await homeDati(media, designerId, prodottoId)), _status: 'published' } as never,
})
log('aggiornata la home')
await payload.updateGlobal({ slug: 'pagina-designer', data: (await paginaDesignerDati()) as never })
log('aggiornata la pagina designer')

const mancanti = [...mediaCache.entries()].filter(([, id]) => id === null).map(([s]) => s)
if (mancanti.length) {
  log(`${mancanti.length} foto non caricate: si possono aggiungere dal pannello Media.`)
  mancanti.forEach((m) => log(`  - ${m}`))
}
log('fatto')
process.exit(0)
