/**
 * Version: 1.00
 * Protezione dei contenuti per seed:aggiorna e seed:catalogo.
 *
 * Il sito si modifica dal pannello e dalla pagina: quelle modifiche stanno solo nel database,
 * non in GitHub. Per questo, di norma (modalità prudente):
 * - si CREANO solo documenti nuovi (designer, pagine, prodotti, foto che mancano);
 * - un documento o una pagina globale che esiste già NON si modifica: la modifica che il seed
 *   avrebbe fatto finisce in <compito>.proposte.json ("aggiornamenti disponibili" nel pannello);
 * - fanno eccezione i documenti creati in questa stessa esecuzione (es. il testo inglese di una
 *   scheda appena creata), le pagine globali mai salvate, e le versioni AVIF ridotte delle foto
 *   (rigenerate dal file caricato: testo, alt e punto focale non cambiano).
 *
 * Con SEED_APPLICA=1 (pulsante "Applica" nel pannello) le modifiche si applicano, ma prima di
 * ognuna si salva una copia completa (tutte le lingue) del documento in .compiti/copie/<data>/.
 * Le collezioni con le versioni (pagine, prodotti, designer, home…) le conservano anche nella
 * scheda "Versioni" del pannello.
 */
import fs from 'fs'
import path from 'path'

import type { Payload } from 'payload'

export interface Proposta {
  dove: string
  titolo: string
  lingua: string
  campi: string[]
}

const CARTELLA = path.join(process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media'), '.compiti')

/** Confronto approssimato: ignora gli id delle righe e le date di sistema. */
function pulito(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(pulito)
  if (v && typeof v === 'object') {
    const o: Record<string, unknown> = {}
    for (const [k, x] of Object.entries(v as Record<string, unknown>)) {
      if (k === 'id' || k === 'createdAt' || k === 'updatedAt' || k === 'blockName') continue
      // Relazione già popolata contro id semplice: conta solo l'id.
      o[k] = x && typeof x === 'object' && !Array.isArray(x) && 'id' in (x as object) && 'filename' in (x as object) ? (x as { id: unknown }).id : pulito(x)
    }
    return o
  }
  return v ?? null
}
const ugualeA = (a: unknown, b: unknown) => JSON.stringify(pulito(a)) === JSON.stringify(pulito(b))

/** Campi che l'aggiornamento cambierebbe davvero (vuoto = nessuna differenza). */
function campiCambiati(attuale: Record<string, unknown>, nuovo: Record<string, unknown>) {
  return Object.keys(nuovo).filter((k) => k !== '_status' && !ugualeA(attuale[k], nuovo[k]))
}

const titoloDi = (d: Record<string, unknown>) => String(d.titolo || d.nome || d.slug || d.email || d.id || '')

export function proteggi(payload: Payload, compito: string, log: (m: string) => void) {
  const applica = process.env.SEED_APPLICA === '1'
  const creati = new Set<string>()
  const globaliSalvati = new Set<string>()
  const proposte: Proposta[] = []
  const fileProposte = path.join(CARTELLA, `${compito}.proposte.json`)
  const copie = path.join(CARTELLA, 'copie', new Date().toISOString().replace(/[:.]/g, '-'))
  fs.mkdirSync(CARTELLA, { recursive: true })
  // Ogni esecuzione riparte da zero: in modalità applica le proposte vengono applicate.
  fs.writeFileSync(fileProposte, '[]')

  const proponi = (p: Proposta) => {
    proposte.push(p)
    fs.writeFileSync(fileProposte, JSON.stringify(proposte, null, 2))
    log(`non modificato (contenuto già presente): ${p.dove}${p.lingua !== 'it' ? ` [${p.lingua}]` : ''} → ${p.campi.join(', ')}`)
  }
  const copia = (nome: string, dati: unknown) => {
    fs.mkdirSync(copie, { recursive: true })
    fs.writeFileSync(path.join(copie, `${nome}.json`), JSON.stringify(dati, null, 2))
  }

  const create = payload.create.bind(payload)
  const update = payload.update.bind(payload)
  const updateGlobal = payload.updateGlobal.bind(payload)

  payload.create = (async (args: Parameters<typeof create>[0]) => {
    const doc = await create(args as never)
    creati.add(`${args.collection}:${doc.id}`)
    return doc
  }) as typeof create

  payload.update = (async (args: Record<string, unknown>) => {
    const collection = String(args.collection)
    const id = args.id as number | string | undefined
    const data = (args.data || {}) as Record<string, unknown>
    const tecnico = collection === 'media' && Object.keys(data).length === 0
    if (id === undefined || tecnico || creati.has(`${collection}:${id}`)) return update(args as never)
    const lingua = String(args.locale || 'it')
    const attuale = (await payload.findByID({ collection: collection as never, id, depth: 0, locale: lingua as never, draft: true })) as unknown as Record<string, unknown>
    const campi = campiCambiati(attuale, data)
    if (!campi.length) return attuale
    if (!applica) {
      proponi({ dove: `${collection}/${attuale.slug || id}`, titolo: titoloDi(attuale), lingua, campi })
      return attuale
    }
    copia(`${collection}-${id}`, await payload.findByID({ collection: collection as never, id, depth: 0, locale: 'all' as never, draft: true }))
    return update(args as never)
  }) as unknown as typeof update

  payload.updateGlobal = (async (args: Record<string, unknown>) => {
    const slug = String(args.slug)
    const lingua = String(args.locale || 'it')
    const attuale = (await payload.findGlobal({ slug: slug as never, depth: 0, locale: lingua as never, draft: true })) as unknown as Record<string, unknown>
    // Mai salvata da nessuno, o salvata poco fa da questa esecuzione: è contenuto nuovo.
    if (!attuale?.updatedAt || globaliSalvati.has(slug)) {
      globaliSalvati.add(slug)
      return updateGlobal(args as never)
    }
    const data = (args.data || {}) as Record<string, unknown>
    const campi = campiCambiati(attuale, data)
    if (!campi.length) return attuale
    if (!applica) {
      proponi({ dove: `pagina globale ${slug}`, titolo: slug, lingua, campi })
      return attuale
    }
    copia(`globale-${slug}`, await payload.findGlobal({ slug: slug as never, depth: 0, locale: 'all' as never, draft: true }))
    return updateGlobal(args as never)
  }) as unknown as typeof updateGlobal

  log(applica ? `modalità applica: prima di ogni modifica si salva una copia in ${copie}` : 'modalità prudente: si aggiunge solo ciò che manca, i contenuti esistenti non si toccano')
  return { applica, proposte }
}
