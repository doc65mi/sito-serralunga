/**
 * Version: 1.03
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
 * Eccezione voluta (cambiaStruttura): un cambio di struttura del sito che il seed applica una volta sola
 * e solo quando il campo nuovo è ancora vuoto (es. il doppio menu della navigazione 2.x: finché il menu
 * superiore è vuoto il sito non l'ha mai avuto, quindi nessuno l'ha modificato). Si applica sempre,
 * anche in modalità prudente, dopo aver salvato una copia completa della pagina globale.
 *
 * Eccezione voluta (riempiVuoti, 1.02): campi NUOVI di un documento esistente (es. disegno quotato e campioni
 * colore della scheda prodotto, colore pieno della cartella colori) si scrivono solo se nel documento sono
 * ancora vuoti: nessuno li ha mai compilati, quindi non si perde nessuna modifica. Copia di sicurezza prima.
 *
 * Eccezione voluta (correggi, 1.03): errori noti dei dati importati da serralunga.com (correzioni-shop.ts,
 * es. tipologia "Pentola" al posto di "Vaso"). Il campo cambia solo se contiene ancora esattamente il
 * valore sbagliato scritto dall'importazione: nessuno l'ha modificato. Copia di sicurezza prima.
 *
 * Con SEED_APPLICA=1 (pulsante "Applica" nel pannello) le modifiche si applicano, ma prima di
 * ognuna si salva una copia completa (tutte le lingue) del documento in .compiti/copie/<data>/.
 * Le collezioni con le versioni (pagine, prodotti, designer, home…) le conservano anche nella
 * scheda "Versioni" del pannello.
 */
import fs from 'fs'
import path from 'path'

import type { Payload } from 'payload'

import { giaFatti } from './punto'

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
  // Un'esecuzione nuova riparte da zero (in modalità applica le proposte vengono applicate);
  // una ripresa dopo un'interruzione tiene quelle raccolte dalle fasi già fatte.
  if (giaFatti()) {
    try {
      proposte.push(...(JSON.parse(fs.readFileSync(fileProposte, 'utf8')) as Proposta[]))
    } catch {
      /* nessuna proposta salvata */
    }
  } else fs.writeFileSync(fileProposte, '[]')

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

  /** Vedi l'eccezione in testa al file: copia di sicurezza, poi modifica diretta. */
  const cambiaStruttura = (async (args: Record<string, unknown>) => {
    const slug = String(args.slug)
    copia(`globale-${slug}`, await payload.findGlobal({ slug: slug as never, depth: 0, locale: 'all' as never, draft: true }))
    globaliSalvati.add(slug)
    log(`cambio di struttura applicato: pagina globale ${slug} (copia salvata in ${copie})`)
    return updateGlobal(args as never)
  }) as unknown as typeof updateGlobal

  /** Vedi l'eccezione in testa al file: scrive solo i campi ancora vuoti, gli altri restano come sono. */
  const vuoto = (v: unknown): boolean =>
    v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0) ||
    (typeof v === 'object' && !Array.isArray(v) && Object.values(v as object).every(vuoto))
  const riempiVuoti = async (args: { collection: string; id: number | string; data: Record<string, unknown>; locale?: string }) => {
    // Senza ripiego sull'italiano: un campo inglese vuoto deve risultare vuoto.
    const attuale = (await payload.findByID({ collection: args.collection as never, id: args.id, depth: 0, locale: (args.locale || 'it') as never, fallbackLocale: false as never, draft: true })) as unknown as Record<string, unknown>
    const gruppo = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)
    // Unisce in profondità nei gruppi: un valore nuovo entra solo dove il campo attuale è vuoto.
    const unisci = (ora: Record<string, unknown>, nuovo: Record<string, unknown>): Record<string, unknown> | null => {
      const out: Record<string, unknown> = {}
      for (const [k, v] of Object.entries(nuovo)) {
        if (gruppo(ora[k]) && gruppo(v)) {
          const sotto = unisci(ora[k] as Record<string, unknown>, v)
          if (sotto) out[k] = sotto
        } else if (vuoto(ora[k])) out[k] = v
      }
      return Object.keys(out).length ? { ...ora, ...out } : null
    }
    const data = unisci(attuale, args.data) || {}
    for (const k of Object.keys(data)) if (!(k in args.data)) delete data[k]
    if (!Object.keys(data).length) return null
    copia(`${args.collection}-${args.id}`, await payload.findByID({ collection: args.collection as never, id: args.id, depth: 0, locale: 'all' as never, draft: true }))
    log(`campi nuovi compilati: ${args.collection}/${attuale.slug || attuale.codice || args.id} → ${Object.keys(data).join(', ')}`)
    return update({ collection: args.collection as never, id: args.id, locale: (args.locale || 'it') as never, depth: 0, data: data as never })
  }

  /** Vedi l'eccezione in testa al file: copia di sicurezza, poi modifica diretta. */
  const correggi = async (args: Record<string, unknown>) => {
    const collection = String(args.collection)
    copia(`${collection}-${args.id}-correzione`, await payload.findByID({ collection: collection as never, id: args.id as number, depth: 0, locale: 'all' as never, draft: true }))
    return update(args as never)
  }

  log(applica ? `modalità applica: prima di ogni modifica si salva una copia in ${copie}` : 'modalità prudente: si aggiunge solo ciò che manca, i contenuti esistenti non si toccano')
  return { applica, proposte, cambiaStruttura, riempiVuoti, correggi }
}
