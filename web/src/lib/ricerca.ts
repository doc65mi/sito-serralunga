/**
 * Motore di ricerca interno (Version: 1.00).
 * Indice in memoria di prodotti, categorie, designer, progetti, spunti, journal e pagine,
 * una copia per lingua, ricostruito ogni 5 minuti (le ricerche non aspettano: si usa l'indice
 * precedente finché il nuovo è pronto). Ricerca con MiniSearch:
 *  - tollera gli errori di battitura (1 lettera sbagliata da 4 lettere, 2 da 7);
 *  - completa la parola mentre si scrive (prefisso);
 *  - ignora accenti, maiuscole e parole vuote (di, il, the, of...);
 *  - trova i codici articolo anche senza trattini (SR-120 = sr120).
 * Legge solo i contenuti pubblicati: le API di Payload, senza accesso, non mostrano le bozze.
 */
import MiniSearch, { type SearchResult } from 'minisearch'
import { elenco, type Doc } from './cms'
import { isMedia, src } from './media'
import { piatto } from './testo'
import type { Lingua } from './lingua'
import { categorie, conteggi, urlCategoria, urlProdotto } from './catalogo'

export type Tipo = 'prodotto' | 'categoria' | 'designer' | 'progetto' | 'spunto' | 'articolo' | 'pagina'

/** Ordine dei gruppi nei risultati e peso di ciascun tipo (i prodotti contano di più: il pubblico è B2B). */
export const TIPI: Tipo[] = ['prodotto', 'categoria', 'designer', 'progetto', 'spunto', 'articolo', 'pagina']
const PESO: Record<Tipo, number> = { prodotto: 1.5, categoria: 1.4, designer: 1.3, progetto: 1, spunto: 0.9, articolo: 0.9, pagina: 1 }
export const AMBITO_CATALOGO: Tipo[] = ['prodotto', 'categoria', 'designer']

export type Voce = {
  id: string
  tipo: Tipo
  titolo: string
  url: string
  sotto: string
  estratto: string
  img: string
  /** Testi indicizzati (non restituiti al browser). */
  chiavi: string
  testo: string
}

export type Risultato = Omit<Voce, 'chiavi' | 'testo'> & { evid: [number, number][] }

/* ---------- Testo ---------- */

const SEGNI = /[̀-ͯ]/g
/** minuscole senza accenti: «Città» → «citta». */
export const normalizza = (s: string) => s.normalize('NFD').replace(SEGNI, '').toLowerCase()

const VUOTE = new Set(
  ('a ad al alla alle allo agli ai anche che chi con da dal dalla dalle dai degli dei del della delle dello di e ed gli ha ho i il in la le lo ma ne nei nel nella nelle non o per piu se si su sul sulla tra fra un una uno ' +
    'an and are as at be by for from has in into is it its of on or the to with').split(' '),
)

/** Parole dell'indice e della ricerca. I codici con trattini contano anche uniti (sr-120 → sr, 120, sr120). */
function parole(testo: string): string[] {
  const n = normalizza(testo)
  const fuori: string[] = []
  for (const m of n.matchAll(/[a-z0-9]+(?:[-./][a-z0-9]+)*/g)) {
    const pezzi = m[0].split(/[-./]/)
    fuori.push(...pezzi)
    if (pezzi.length > 1) fuori.push(pezzi.join(''))
  }
  return fuori
}
const processTerm = (t: string) => (t && !VUOTE.has(t) ? t : null)

/** Toglie Markdown, HTML e marcatura del CMS da un testo. */
const pulisci = (s: string) =>
  piatto(
    s
      .replace(/<[^>]+>/g, ' ')
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/[#>*`|]+/g, ' ')
      .replace(/&nbsp;/g, ' '),
  ).replace(/\s+/g, ' ').trim()

const taglia = (s: string, n = 170) => {
  if (s.length <= n) return s
  const corto = s.slice(0, n)
  return `${corto.slice(0, Math.max(corto.lastIndexOf(' '), n - 30)).replace(/[,.;:\s]+$/, '')}…`
}

/* Chiavi che non sono testo da cercare: indirizzi, codici tecnici, impostazioni. */
const SALTA = new Set([
  'id', 'slug', 'url', 'filename', 'mimeType', 'hex', 'createdAt', 'updatedAt', '_status', 'fonte', 'fonteShopify', 'blockType',
  'blockName', 'link', 'href', 'chiave', 'sizes', 'file', 'documento', 'allineamento', 'forma', 'sezione', 'categoria', 'famiglia',
  'origine', 'format', 'mode', 'style', 'direction', 'version', 'type', 'tag', 'listType', 'rel', 'target', 'linkType', 'segnaposto',
  'segnapostoImmagine', 'pulsante', 'etichettaPulsante', 'dopoInvio', 'grazie', 'nota', 'accesso',
])

/** Un documento collegato e già letto (designer di un prodotto, foto): non è testo di questa scheda. */
const collegato = (o: Doc) => 'createdAt' in o

/** Tutti i testi propri di un documento, in ordine. */
function testi(v: unknown, fuori: string[] = [], radice = true): string[] {
  if (typeof v === 'string') {
    if (v.length > 1 && !/^(https?:|\/|#|mailto:|tel:)/.test(v)) fuori.push(v)
  } else if (Array.isArray(v)) {
    for (const x of v) testi(x, fuori, false)
  } else if (v && typeof v === 'object') {
    if (!radice && collegato(v as Doc)) return fuori
    for (const [k, x] of Object.entries(v)) if (!SALTA.has(k)) testi(x, fuori, false)
  }
  return fuori
}

/** Prima foto del documento (la più in alto), escluse quelle dei documenti collegati. */
function primaFoto(doc: Doc, campi = ['immagine', 'ritratto', 'ritrattoProvvisorio']): string {
  for (const k of campi) if (isMedia(doc[k])) return src(doc[k], 160)
  const coda: unknown[] = [doc]
  while (coda.length) {
    const v = coda.shift()
    if (isMedia(v) && String(v.mimeType || 'image/').startsWith('image/')) return src(v, 160)
    if (Array.isArray(v)) coda.push(...v)
    else if (v && typeof v === 'object' && (v === doc || !collegato(v as Doc))) for (const [k, x] of Object.entries(v)) if (k !== 'seo') coda.push(x)
  }
  return ''
}

/** Testo di presentazione: descrizione SEO, poi estratto, introduzione, descrizione... */
function presentazione(doc: Doc): string {
  if (doc.seo?.descrizione) return pulisci(doc.seo.descrizione)
  const chiavi = ['estratto', 'intro', 'introduzione', 'descrizione', 'testo', 'corpo']
  const coda: unknown[] = [doc]
  while (coda.length) {
    const v = coda.shift()
    if (!v || typeof v !== 'object') continue
    if (Array.isArray(v)) { coda.push(...v); continue }
    if (v !== doc && collegato(v as Doc)) continue
    for (const k of chiavi) { const x = (v as Doc)[k]; if (typeof x === 'string' && x.trim()) return pulisci(x) }
    for (const [k, x] of Object.entries(v)) if (k !== 'seo' && typeof x === 'object') coda.push(x)
  }
  return ''
}

const nomeDi = (x: unknown) => (x && typeof x === 'object' ? piatto((x as Doc).nome || (x as Doc).titolo || '') : '')
const titoloDi = (d: Doc) => piatto(d.nome || d.titolo || d.seo?.titolo || '').replace(/\s*\|\s*Serralunga\s*$/i, '')

/** Codici articolo di un prodotto (tabella varianti), ovunque siano nel documento. */
function codici(v: unknown, fuori: string[] = []): string[] {
  if (Array.isArray(v)) v.forEach((x) => codici(x, fuori))
  else if (v && typeof v === 'object' && !collegato(v as Doc)) {
    for (const [k, x] of Object.entries(v)) {
      if (k === 'codice' && typeof x === 'string' && x.trim()) fuori.push(x.trim())
      else if (typeof x === 'object') codici(x, fuori)
    }
  }
  return fuori
}

/* ---------- Indice ---------- */

const ETICHETTE_CONTRACT: Record<string, string> = { principale: 'Contract' }
const TIPOLOGIA_CASE: Record<Lingua, string> = { it: 'Progetto', en: 'Project' }

async function voci(L: Lingua): Promise<Voce[]> {
  const nulla = () => [] as Doc[]
  const [cats, prodotti, designer, casi, spunti, articoli, pagine, materiali, contract, heritage] = await Promise.all([
    categorie(L),
    elenco('prodotti', { depth: 1, limit: 2000, sort: 'nome', 'where[schedaPubblicata][equals]': 'true' }, L).catch(nulla),
    elenco('designer', { depth: 1, limit: 500, 'where[schedaPubblicata][equals]': 'true' }, L).catch(nulla),
    elenco('case-history', { depth: 1, limit: 500 }, L).catch(nulla),
    elenco('spunti', { depth: 1, limit: 500 }, L).catch(nulla),
    elenco('articoli', { depth: 1, limit: 500, sort: '-data' }, L).catch(nulla),
    elenco('pagine', { depth: 1, limit: 200 }, L).catch(nulla),
    elenco('materiali', { depth: 1, limit: 200 }, L).catch(nulla),
    elenco('contract', { depth: 1, limit: 50 }, L).catch(nulla),
    elenco('pagine-heritage', { depth: 1, limit: 50 }, L).catch(nulla),
  ])
  const n = await conteggi(cats, L).catch(() => new Map())
  const en = L === 'en'
  const tutti: Voce[] = []
  const aggiungi = (tipo: Tipo, d: Doc, url: string, extra: { titolo?: string; sotto?: string; chiavi?: string[]; img?: string } = {}) => {
    const titolo = extra.titolo || titoloDi(d)
    if (!titolo || !url) return
    tutti.push({
      id: `${tipo}:${d.id}`,
      tipo,
      titolo,
      url,
      sotto: extra.sotto || '',
      estratto: taglia(presentazione(d)),
      img: extra.img ?? primaFoto(d),
      chiavi: (extra.chiavi || []).filter(Boolean).join(' · '),
      testo: pulisci(testi(d).join(' · ')).slice(0, 8000),
    })
  }

  for (const p of prodotti) {
    const des = nomeDi(p.designer)
    const nomiCat = (p.categorie || []).map(nomeDi).filter(Boolean)
    aggiungi('prodotto', p, urlProdotto(p, cats), {
      sotto: [p.tipologia, des].filter(Boolean).join(' · '),
      chiavi: [p.tipologia, des, ...nomiCat, ...codici(p), ...(p.materiali || [])],
    })
  }
  for (const c of cats) {
    const q = n.get(c.id) || 0
    if (!q) continue
    const padre = cats.find((x) => x.id === (typeof c.padre === 'object' ? c.padre?.id : c.padre))
    aggiungi('categoria', c, urlCategoria(c, cats), {
      sotto: `${padre ? `${padre.nome} · ` : ''}${q} ${q === 1 ? (en ? 'item' : 'scheda') : en ? 'items' : 'schede'}`,
      chiavi: [padre?.nome],
    })
  }
  for (const d of designer) aggiungi('designer', d, `/designer/${d.slug}/`, { sotto: [d.ruolo, d.provenienza].filter(Boolean).map(piatto).join(' · ') })
  for (const c of casi) aggiungi('progetto', c, `/case-history/${c.slug}/`, { sotto: piatto(c.kicker || TIPOLOGIA_CASE[L]) })
  for (const s of spunti) aggiungi('spunto', s, `/spunti-e-idee/${s.slug}/`, { sotto: piatto(s.ambito || '') })
  for (const a of articoli) aggiungi('articolo', a, `/journal/${a.slug}/`, { sotto: ['Journal', a.data ? new Date(a.data).toLocaleDateString(en ? 'en-GB' : 'it-IT', { year: 'numeric', month: 'long' }) : ''].filter(Boolean).join(' · ') })
  for (const p of pagine) aggiungi('pagina', p, `/${p.slug}/`)
  for (const m of materiali) aggiungi('pagina', m, `/materiali/${m.slug}/`, { sotto: en ? 'Materials' : 'Materiali' })
  for (const h of heritage) aggiungi('pagina', h, `/heritage/${h.slug}/`, { titolo: piatto(h.nomeMenu || h.titolo || ''), sotto: 'Heritage' })
  for (const c of contract) {
    const sez = c.sezione || 'principale'
    aggiungi('pagina', c, sez === 'principale' ? '/contract/' : `/contract/${sez}/`, {
      titolo: piatto(c.nome || ETICHETTE_CONTRACT[sez] || titoloDi(c)),
      sotto: 'Contract',
    })
  }
  return tutti
}

type Indice = { ms: MiniSearch<Voce>; voci: Map<string, Voce>; t: number }
const indici = new Map<Lingua, Indice>()
const inCorso = new Map<Lingua, Promise<Indice>>()
const DURATA = 5 * 60_000

async function costruisci(L: Lingua): Promise<Indice> {
  const lista = await voci(L)
  const ms = new MiniSearch<Voce>({
    fields: ['titolo', 'chiavi', 'testo'],
    storeFields: [],
    tokenize: parole,
    processTerm,
  })
  ms.addAll(lista)
  const i = { ms, voci: new Map(lista.map((v) => [v.id, v])), t: Date.now() }
  indici.set(L, i)
  return i
}

/** Indice della lingua: subito quello in memoria; se è vecchio si rifà in background. */
export async function indice(L: Lingua): Promise<Indice> {
  const c = indici.get(L)
  const rifai = () => {
    let p = inCorso.get(L)
    if (!p) {
      p = costruisci(L).finally(() => inCorso.delete(L))
      inCorso.set(L, p)
    }
    return p
  }
  if (!c) return rifai()
  if (Date.now() - c.t > DURATA) rifai().catch(() => {})
  return c
}

/* ---------- Ricerca ---------- */

const sfocato = (term: string) => (term.length < 4 ? 0 : term.length < 7 ? 1 : 2)

/** Posizioni delle parole trovate nel titolo, per evidenziarle. */
function evidenzia(titolo: string, termini: string[]): [number, number][] {
  const n = [...titolo].map((c) => normalizza(c).charAt(0) || c).join('')
  const fuori: [number, number][] = []
  for (const t of termini) {
    if (t.length < 2) continue
    let da = 0
    while ((da = n.indexOf(t, da)) !== -1) {
      if (da === 0 || !/[a-z0-9]/.test(n[da - 1])) fuori.push([da, da + t.length])
      da += t.length
    }
  }
  return fuori.sort((a, b) => a[0] - b[0]).filter((r, k, a) => k === 0 || r[0] >= a[k - 1][1])
}

export type Esito = { q: string; totale: number; risultati: Risultato[]; suggerimento?: string; approssimata: boolean }

export async function cerca(q: string, L: Lingua, opzioni: { tipi?: Tipo[]; limite?: number } = {}): Promise<Esito> {
  const testo = q.replace(/\s+/g, ' ').trim().slice(0, 80)
  const vuoto: Esito = { q: testo, totale: 0, risultati: [], approssimata: false }
  if (parole(testo).filter((p) => processTerm(p)).length === 0) return vuoto
  const { ms, voci: tutte } = await indice(L)
  const tipi = opzioni.tipi?.length ? new Set(opzioni.tipi) : null
  const base = {
    boost: { titolo: 5, chiavi: 2.5, testo: 1 },
    prefix: (t: string, i: number, tutti: string[]) => i === tutti.length - 1 || t.length > 3,
    fuzzy: sfocato,
    maxFuzzy: 2,
    filter: (r: SearchResult) => !tipi || tipi.has(tutte.get(r.id)?.tipo as Tipo),
    boostDocument: (id: unknown) => PESO[tutte.get(String(id))?.tipo as Tipo] ?? 1,
  }
  // Prima tutte le parole; se non c'è nulla, basta una (la più rilevante sale comunque in cima).
  let trovati = ms.search(testo, { ...base, combineWith: 'AND' })
  let approssimata = false
  if (!trovati.length) {
    trovati = ms.search(testo, { ...base, combineWith: 'OR' })
    approssimata = trovati.length > 0
  }
  // «Forse cercavi»: se le parole scritte non esistono così come sono.
  let suggerimento: string | undefined
  const esatti = ms.search(testo, { ...base, fuzzy: 0, prefix: true, combineWith: 'AND' })
  if (!esatti.length) {
    const s = ms.autoSuggest(testo, { fuzzy: 0.25, prefix: true, combineWith: 'AND', filter: base.filter })[0]?.suggestion
    if (s && s !== normalizza(testo)) suggerimento = s
  }
  const limite = Math.min(Math.max(opzioni.limite || 60, 1), 200)
  const risultati = trovati.slice(0, limite).flatMap((r) => {
    const v = tutte.get(String(r.id))
    if (!v) return []
    const { chiavi: _c, testo: _t, ...pubblica } = v
    return [{ ...pubblica, evid: evidenzia(v.titolo, r.terms) }]
  })
  return { q: testo, totale: trovati.length, risultati, suggerimento, approssimata }
}

/** Scorciatoie mostrate a campo vuoto: le categorie principali del catalogo con schede. */
export async function scorciatoie(L: Lingua): Promise<{ titolo: string; url: string }[]> {
  const cats = await categorie(L)
  const n = await conteggi(cats, L).catch(() => new Map())
  return cats
    .filter((c) => !c.padre && (n.get(c.id) || 0) > 0)
    .slice(0, 8)
    .map((c) => ({ titolo: piatto(c.nome), url: urlCategoria(c, cats) }))
}
