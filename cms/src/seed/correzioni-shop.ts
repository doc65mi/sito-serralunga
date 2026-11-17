/**
 * Correzioni dei dati di serralunga.com — Version: 1.00.
 *
 * Perché: il negozio Shopify di serralunga.com è stato tradotto in automatico in italiano e alcune
 * parole sono sbagliate già all'origine (controllo del 17/11/2026 su 281 prodotti):
 * - tipologia "pot" tradotta "pentola" in 94 schede (sul sito i nomi dicono "Vaso …"), "lettino7",
 *   "Sottovaso Dignhy";
 * - nomi dei colori: "PIÙ DI ROVO" (traduzione di "MORE DI ROVO"), "LACQUEROSSO BIANCO",
 *   "RED LACQUERED", "PIETRA DELLA DOLOMITI", "SALVA DI SARDEGNA", "ARGILLA ROSSA" (= Red Clay)…;
 * - nomi delle opzioni: "Misurare" (traduzione del verbo "size") al posto di "Misure".
 * Le correzioni usano solo parole già usate da Serralunga (nomi dei prodotti, cartella colori,
 * versione inglese dello stesso prodotto): nulla di inventato.
 *
 * Le usano l'importazione (catalogo.ts) e la correzione delle schede già importate
 * (correggiSchedeImportate): lì un campo si corregge SOLO se contiene ancora esattamente il valore
 * sbagliato scritto dall'importazione, così le modifiche fatte dal pannello o dalla pagina restano.
 */
import type { Payload } from 'payload'

/** Come l'importazione: tutto maiuscolo o tutto minuscolo → "Prima lettera maiuscola". */
export const frase = (s: string) => {
  const t = s.trim()
  if (t === t.toLowerCase()) return t.charAt(0).toUpperCase() + t.slice(1)
  if (t !== t.toUpperCase()) return t
  const m = t.toLowerCase()
  return m.charAt(0).toUpperCase() + m.slice(1)
}

const chiave = (s: string) => s.trim().toLowerCase().replace(/\s+/g, ' ')

/** Tipologia italiana sbagliata su serralunga.com → parola giusta. */
const TIPOLOGIA_IT: Record<string, string> = {
  pentola: 'Vaso',
  lettino7: 'Lettino',
  'sottovaso dignhy': 'Sottovaso Dinghy',
}
/** Tipologia inglese: "pot" → "Planter" come nei nomi dei prodotti inglesi (Cubotti Alto Planter…). */
const TIPOLOGIA_EN: Record<string, string> = {
  pot: 'Planter',
  'lighted pot': 'Lighted planter',
  floorlamp: 'Floor lamp',
  sparepart: 'Spare part',
}

export function tipologiaIt(tipo?: string | null): string {
  const t = (tipo || '').trim()
  if (!t) return ''
  return TIPOLOGIA_IT[chiave(t)] || frase(t)
}
export function tipologiaEn(tipo?: string | null): string {
  const t = (tipo || '').trim()
  if (!t) return ''
  return TIPOLOGIA_EN[chiave(t)] || frase(t)
}

type Regola = [RegExp, string]

/** Nomi dei colori e delle versioni in italiano (si confrontano in minuscolo). */
const VALORI_IT: Regola[] = [
  [/^più di rovo/, 'more di rovo'],
  [/^moro di rovo ?- ?nero$/, 'more di rovo / nero'],
  [/^rovo more/, 'more di rovo'],
  [/^lacquerosso bianco$/, 'laccato bianco'],
  [/^red lacquered$/, 'laccato rosso'],
  [/^lacquered (bianco|white)$/, 'laccato bianco'],
  [/^lacquered rosso$/, 'laccato rosso'],
  [/^lacquered gold$/, 'laccato oro'],
  [/^laccato black\/bianco$/, 'laccato nero/bianco'],
  [/^nero lacquere$/, 'laccato nero'],
  [/^glossy? black lacquered$/, 'laccato lucido nero'],
  [/^glossy? white lacquered$/, 'laccato lucido bianco'],
  [/^copper lacquered$/, 'laccato rame'],
  [/^(matt metallic sand lacquer|sand matt metallic lacquer)$/, 'laccato sabbia metallizzato opaco'],
  [/^anthracite$/, 'antracite'],
  [/^pietra della dolomiti/, 'pietra delle dolomiti'],
  [/^salva di sardegna/, 'salvia di sardegna'],
  [/^rosso pompeaiano/, 'rosso pompeiano'],
  [/^giallo sahara0$/, 'giallo sahara'],
  [/^verde oliv[ae] di cerignola/, 'olive di cerignola'],
  [/^(uva di moleskin|moleskin grape)$/, 'moleskin uva'],
  [/^moleskin lime$/, 'moleskin calce'],
  [/^moleskin rose$/, 'moleskin rosa'],
  [/^(moleskin mediterrane(an|e)|mediterrane mediterrane)$/, 'moleskin mediterraneo'],
  [/^champagne in moleskin$/, 'moleskin champagne'],
  [/^menta verde$/, 'verde menta'],
  [/^neutral translucent$/, 'neutro traslucido'],
  [/^neutral\b/, 'neutro'],
  [/^light green$/, 'verde chiaro'],
  [/^argilla rossa$/, 'red clay'],
  [/^white light con cavo$/, 'luce bianca con cavo'],
  [/^rgb light con cavo$/, 'luce rgb con cavo'],
  [/^rgb light wireless$/, 'luce rgb wireless'],
  [/^wireless led bulb$/, 'lampadina led wireless'],
  [/ con cuscini half moon white$/, ' con cuscino bianco a mezzaluna'],
]

/** Nomi in inglese: laccati rimasti in italiano o a metà, refusi. I nomi di colore propri (More di Rovo…) restano. */
const VALORI_EN: Regola[] = [
  [/^lacquerosso bianco$/, 'white lacquered'],
  [/^laccato black\/bianco$/, 'black/white lacquered'],
  [/^laccato rosso\/bianco$/, 'red/white lacquered'],
  [/^laccato black$/, 'black lacquered'],
  [/^(laccato white|lacquered bianco|laccato bianco)$/, 'white lacquered'],
  [/^laccato rosso$/, 'red lacquered'],
  [/^(laccato nero|nero lacquere)$/, 'black lacquered'],
  [/^laccato lucido bianco$/, 'glossy white lacquered'],
  [/^laccato lucido nero$/, 'glossy black lacquered'],
  [/^laccato lucido red clay$/, 'glossy red clay lacquered'],
  [/^laccato metallizzato opaco sabbia$/, 'matt metallic sand lacquered'],
  [/^laccato rame$/, 'copper lacquered'],
  [/^pietra della dolomiti/, 'pietra delle dolomiti'],
  [/^senza lampadina$/, 'without bulb'],
]

const SIGLE = /\b(rgb|rgbw|led|hpl|ip65|e27)\b/g

function correggiParte(parte: string, regole: Regola[]): string {
  const bassa = chiave(parte)
  let nuova = bassa
  for (const [re, con] of regole) nuova = nuova.replace(re, con)
  if (nuova === bassa) return parte
  return frase(nuova).replace(SIGLE, (s) => s.toUpperCase())
}

/** Nome di una variante ("Colore / Impianto luce"): ogni parte si corregge da sola. */
export function valoreVariante(nome: string, lingua: 'it' | 'en'): string {
  const regole = lingua === 'en' ? VALORI_EN : VALORI_IT
  return nome
    .split(' / ')
    .map((p) => correggiParte(p, regole))
    .join(' / ')
}

/** Nome di un'opzione (misure): "Misurare" → "Misure". */
const OPZIONI_IT: Record<string, string> = {
  misurare: 'Misure',
  misure: 'Misure',
  'dimensione superiore': 'Misure del piano',
}
const OPZIONI_EN: Record<string, string> = {
  'top size': 'Top size',
}
export function etichettaOpzione(nome: string, lingua: 'it' | 'en'): string {
  return (lingua === 'en' ? OPZIONI_EN : OPZIONI_IT)[chiave(nome)] || frase(nome)
}

// ---------------------------------------------------------------------------------------------
// Contenuti già importati

type Riga = { id?: string; nome?: string; codice?: string; etichetta?: string; valore?: string; tipo?: string }

/** Tipologia sbagliata già scritta nel database → giusta, con le stesse maiuscole ("pentola" → "vaso", "Pentola" → "Vaso"). */
function tipologiaDb(v: unknown, lingua: 'it' | 'en'): string | null {
  if (typeof v !== 'string' || !v.trim()) return null
  const giusta = lingua === 'en' ? TIPOLOGIA_EN[chiave(v)] : TIPOLOGIA_IT[chiave(v)]
  if (!giusta) return null
  const t = v.trim()
  const out = t === t.toLowerCase() ? giusta.toLowerCase() : t === t.toUpperCase() ? giusta.toUpperCase() : giusta
  return out !== v ? out : null
}

/** "Pentola — Marc Sadler" → "Vaso — Marc Sadler", solo se la prima parte è il valore sbagliato. */
function etichettaDb(v: unknown, lingua: 'it' | 'en'): string | null {
  if (typeof v !== 'string' || !v.trim()) return null
  const [prima, ...resto] = v.split(' — ')
  const giusta = tipologiaDb(prima, lingua)
  return giusta ? [giusta, ...resto].join(' — ') : null
}

const SBAGLIATE_MISURE = /^(misurare|dimensione superiore)$/i

/** Campi da correggere in un documento (una lingua). Vuoto = niente da fare. */
function correzioniDi(collezione: string, d: Record<string, any>, lingua: 'it' | 'en'): Record<string, unknown> {
  const agg: Record<string, unknown> = {}
  if (collezione === 'prodotti') {
    for (const campo of ['tipologia', 'categoria'] as const) {
      const g = tipologiaDb(d[campo], lingua)
      if (g) agg[campo] = g
    }
    const et = etichettaDb(d.etichettaCard, lingua)
    if (et) agg.etichettaCard = et
    const fin = (d.finiture || []) as Riga[]
    if (fin.some((r) => r.nome && valoreVariante(r.nome, lingua) !== r.nome)) {
      agg.finiture = fin.map((r) => ({ ...r, nome: r.nome ? valoreVariante(r.nome, lingua) : r.nome }))
    }
    const dim = (d.dimensioni || []) as Riga[]
    if (dim.some((r) => r.etichetta && SBAGLIATE_MISURE.test(r.etichetta.trim()))) {
      agg.dimensioni = dim.map((r) => ({ ...r, etichetta: r.etichetta && SBAGLIATE_MISURE.test(r.etichetta.trim()) ? etichettaOpzione(r.etichetta, lingua) : r.etichetta }))
    }
  }
  // Designer › Creazioni e Materiali › Pezzi: la tipologia di ogni foto/pezzo.
  const righe = collezione === 'designer' ? 'creazioni' : collezione === 'materiali' ? 'pezzi' : ''
  if (righe) {
    const lista = (d[righe] || []) as Riga[]
    if (lista.some((r) => tipologiaDb(r.tipo, lingua))) agg[righe] = lista.map((r) => ({ ...r, tipo: tipologiaDb(r.tipo, lingua) || r.tipo }))
  }
  return agg
}

/**
 * Corregge i contenuti importati da serralunga.com: schede prodotto (tipologia, sopratitolo,
 * etichetta della card, nomi delle varianti e delle misure), tipologie delle creazioni dei designer
 * e dei pezzi dei materiali. Un campo cambia solo se contiene ancora il valore sbagliato
 * dell'importazione; tutto il resto resta com'è. Rilanciabile: la seconda volta non trova nulla.
 */
export async function correggiImportati(
  payload: Payload,
  log: (m: string) => void,
  opz: {
    req?: unknown
    /** Modifica da usare al posto di payload.update (seed prudente: copia di sicurezza e poi modifica diretta). */
    aggiorna?: (args: Record<string, unknown>) => Promise<unknown>
  } = {},
) {
  const aggiorna = opz.aggiorna || ((args: Record<string, unknown>) => payload.update(args as never))
  const esito: string[] = []
  let totale = 0
  for (const collezione of ['prodotti', 'designer', 'materiali'] as const) {
    let n = 0
    for (let pagina = 1; ; pagina++) {
      const lotto = await payload.find({ collection: collezione, limit: 100, page: pagina, depth: 0, draft: true, req: opz.req as never })
      for (const base of lotto.docs as unknown as { id: number }[]) {
        const dati: Record<'it' | 'en', Record<string, unknown>> = { it: {}, en: {} }
        let stato: string | undefined
        for (const lingua of ['it', 'en'] as const) {
          const d = (await payload.findByID({ collection: collezione, id: base.id, locale: lingua, fallbackLocale: false as never, depth: 0, draft: true, req: opz.req as never })) as unknown as Record<string, any>
          if (lingua === 'it') stato = d._status
          dati[lingua] = correzioniDi(collezione, d, lingua)
        }
        if (!Object.keys(dati.it).length && !Object.keys(dati.en).length) continue
        for (const lingua of ['it', 'en'] as const) {
          if (!Object.keys(dati[lingua]).length) continue
          // Un documento con modifiche in bozza resta in bozza: si corregge la bozza, non si pubblica nulla.
          const bozza = stato === 'draft'
          await aggiorna({
            collection: collezione,
            id: base.id,
            locale: lingua,
            depth: 0,
            draft: bozza,
            data: { ...dati[lingua], ...(bozza || !stato ? {} : { _status: 'published' }) },
            req: opz.req,
            context: { correzioneImportazione: true },
          })
        }
        n++
      }
      if (!lotto.hasNextPage) break
    }
    if (n) esito.push(`${collezione} ${n}`)
    totale += n
  }
  log(totale ? `correzioni dei dati di serralunga.com: ${esito.join(', ')} documenti corretti` : 'correzioni dei dati di serralunga.com: niente da correggere')
  return totale
}
