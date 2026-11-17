/**
 * Indicizzazione (Version: 1.00).
 * Un solo posto che decide, per ogni indirizzo del sito, se va:
 *  - ai motori di ricerca (meta robots e intestazione X-Robots-Tag),
 *  - nella sitemap e in /llms.txt,
 *  - nella ricerca interna,
 *  - bloccato in robots.txt (Disallow).
 * Fonti, in ordine di forza:
 *  1. BLOCCA_INDICIZZAZIONE=1 del server: tutto il sito fuori dai motori (prevale su tutto).
 *  2. Area riservata e pagina Account: sempre fuori da motori, sitemap, llms.txt e ricerca interna.
 *  3. Impostazioni > Indicizzazione: indirizzi noindex o bloccati (anche con * per una sezione),
 *     tipi di contenuto fuori dalla sitemap, assistenti AI.
 *  4. Opzioni di ogni contenuto (SEO > Motori di ricerca, sitemap e ricerca interna).
 * Gli indirizzi sono senza /en: la versione inglese segue quella italiana.
 * Le regole si rileggono ogni 60 secondi.
 */
import { elenco, env, globale, impostazioni, type Doc } from './cms'
import { senzaLingua } from './lingua'
import { categorie, urlCategoria, urlProdotto } from './catalogo'

export type Regola = {
  /** La pagina dichiara noindex. */
  noindex: boolean
  /** La pagina compare nella sitemap (e in llms.txt). */
  sitemap: boolean
  /** La pagina compare nella ricerca interna. */
  ricerca: boolean
  /** robots.txt la blocca (Disallow). */
  blocca: boolean
  /** Area riservata o Account: sempre fuori da tutto. */
  riservata: boolean
}

/** Pagine riservate, sempre escluse. La pagina Account si aggiunge dalle Impostazioni se è interna al sito. */
export const RISERVATE = ['/contract/area-riservata/']

/** Pagine di sezione (globals): indirizzo e documento del pannello. */
export const SEZIONI: { globale: string; url: string; nome: { it: string; en: string } }[] = [
  { globale: 'home', url: '/', nome: { it: 'Serralunga, home', en: 'Serralunga, home' } },
  { globale: 'pagina-catalogo', url: '/catalogo/', nome: { it: 'Catalogo', en: 'Catalogue' } },
  { globale: 'pagina-designer', url: '/designer/', nome: { it: 'Designer', en: 'Designers' } },
  { globale: 'pagina-installazioni', url: '/installazioni/', nome: { it: 'Installazioni', en: 'Installations' } },
  { globale: 'pagina-spunti', url: '/spunti-e-idee/', nome: { it: 'Spunti e idee', en: 'Ideas' } },
  { globale: 'pagina-journal', url: '/journal/', nome: { it: 'Journal', en: 'Journal' } },
  { globale: 'pagina-materiali', url: '/materiali/', nome: { it: 'Materiali', en: 'Materials' } },
  { globale: 'pagina-heritage', url: '/heritage/', nome: { it: 'Heritage', en: 'Heritage' } },
]

export type AssistentiAI = 'tutti' | 'ricerca' | 'nessuno'

type Stato = {
  t: number
  /** Opzioni dei singoli contenuti, per indirizzo. */
  pagine: Map<string, { motori: string; fuoriSitemap: boolean; fuoriRicerca: boolean }>
  riservate: string[]
  noindex: string[]
  bloccati: string[]
  tipiFuoriSitemap: Set<string>
  assistenti: AssistentiAI
}

/** /x/y → /x/y/ ; tiene * finale; toglie dominio, /en, query e frammento. */
export function normalizza(p: string): string {
  let s = String(p || '').trim()
  if (!s) return ''
  s = s.replace(/^https?:\/\/[^/]+/i, '').split(/[?#]/)[0]
  if (!s.startsWith('/')) s = `/${s}`
  const stella = s.endsWith('*')
  if (stella) s = s.slice(0, -1)
  s = senzaLingua(s)
  if (!s.endsWith('/') && !/\.[a-z0-9]{2,5}$/i.test(s)) s += '/'
  return stella ? `${s}*` : s
}

const righe = (t: unknown) =>
  String(t || '')
    .split(/\r?\n/)
    .map(normalizza)
    .filter(Boolean)

const corrisponde = (path: string, schemi: string[]) =>
  schemi.some((s) => (s.endsWith('*') ? path.startsWith(s.slice(0, -1)) : path === s))

/** Contenuti con almeno un'opzione diversa da quella predefinita. */
const FILTRO = {
  'where[or][0][seo.motori][in]': 'noindex,blocca',
  'where[or][1][seo.fuoriSitemap][equals]': 'true',
  'where[or][2][seo.fuoriRicerca][equals]': 'true',
}

let stato: Stato | null = null
let inCorso: Promise<Stato> | null = null

async function leggi(): Promise<Stato> {
  const nulla = (e: unknown) => (console.error('[indicizzazione] lettura non riuscita:', (e as Error)?.message), [] as Doc[])
  const q = { depth: 0, limit: 2000, ...FILTRO }
  const [imp, cats, prodotti, categ, designer, casi, spunti, articoli, pagine, materiali, contract, heritage, globali] = await Promise.all([
    impostazioni('it').catch(() => ({}) as Doc),
    categorie().catch(() => [] as Doc[]),
    elenco('prodotti', q).catch(nulla),
    elenco('categorie', q).catch(nulla),
    elenco('designer', q).catch(nulla),
    elenco('case-history', q).catch(nulla),
    elenco('spunti', q).catch(nulla),
    elenco('articoli', { ...q, sort: '-data' }).catch(nulla),
    elenco('pagine', { ...q, sort: 'titolo' }).catch(nulla),
    elenco('materiali', q).catch(nulla),
    elenco('contract', q).catch(nulla),
    elenco('pagine-heritage', q).catch(nulla),
    Promise.all(SEZIONI.map((x) => globale(x.globale, 0, 'it').then((d) => ({ ...x, d })).catch(() => null))),
  ])
  const mappa: Stato['pagine'] = new Map()
  const metti = (url: string, d: Doc) => {
    const s = d?.seo || {}
    if (!url) return
    mappa.set(normalizza(url), { motori: s.motori || 'indicizza', fuoriSitemap: s.fuoriSitemap === true, fuoriRicerca: s.fuoriRicerca === true })
  }
  for (const p of prodotti) {
    metti(urlProdotto(p, cats), p)
    if (p.slug) metti(`/prodotti/${p.slug}/`, p)
  }
  for (const c of categ) metti(urlCategoria(c, cats), c)
  for (const d of designer) metti(`/designer/${d.slug}/`, d)
  for (const c of casi) metti(`/case-history/${c.slug}/`, c)
  for (const s of spunti) metti(`/spunti-e-idee/${s.slug}/`, s)
  for (const a of articoli) metti(`/journal/${a.slug}/`, a)
  for (const p of pagine) metti(`/${p.slug}/`, p)
  for (const m of materiali) metti(`/materiali/${m.slug}/`, m)
  for (const h of heritage) metti(`/heritage/${h.slug}/`, h)
  for (const c of contract) metti(!c.sezione || c.sezione === 'principale' ? '/contract/' : `/contract/${c.sezione}/`, c)
  for (const g of globali) {
    const s = g?.d?.seo
    if (g && s && (s.motori === 'noindex' || s.motori === 'blocca' || s.fuoriSitemap || s.fuoriRicerca)) metti(g.url, g.d)
  }

  // Pagina «Account»: il link della barra mobile o la voce Account del menu superiore, se porta dentro il sito.
  const account = [imp.barraMobile?.account, ...(imp.menuSuperiore || []).filter((v: Doc) => /^account$/i.test(String(v?.etichetta || '').trim())).map((v: Doc) => v.link)]
    .map((x) => String(x || '').trim())
    .filter((x) => x.startsWith('/') && !x.startsWith('//'))
    .map(normalizza)
    .filter((x) => x && x !== '/')
  const ind = imp.indicizzazione || {}
  const assistenti: AssistentiAI = ind.assistentiAI === 'ricerca' || ind.assistentiAI === 'nessuno' ? ind.assistentiAI : 'tutti'
  return {
    t: Date.now(),
    pagine: mappa,
    riservate: [...new Set([...RISERVATE, ...account])],
    noindex: righe(ind.percorsiNoindex),
    bloccati: righe(ind.percorsiBloccati).filter((x) => x !== '/' && x !== '/*'),
    tipiFuoriSitemap: new Set<string>(Array.isArray(ind.tipiFuoriSitemap) ? ind.tipiFuoriSitemap : []),
    assistenti,
  }
}

/** Regole correnti (ricarica in sottofondo dopo 60 secondi; la prima volta aspetta). */
export async function regole(): Promise<Stato> {
  const fresco = stato && Date.now() - stato.t < 60_000
  if (fresco) return stato as Stato
  if (!inCorso) {
    inCorso = leggi()
      .then((s) => (stato = s))
      .catch((e) => {
        console.error('[indicizzazione]', e)
        return stato || { t: Date.now(), pagine: new Map(), riservate: [...RISERVATE], noindex: [], bloccati: [], tipiFuoriSitemap: new Set<string>(), assistenti: 'tutti' as AssistentiAI }
      })
      .finally(() => (inCorso = null))
  }
  return stato || inCorso
}

/** Il sito è in prova: tutto fuori dai motori (BLOCCA_INDICIZZAZIONE=1). */
export const inProva = () => env('BLOCCA_INDICIZZAZIONE') === '1'

/** Regola di un indirizzo (con o senza /en). `tipo` = collezione del contenuto, per «tipi fuori dalla sitemap». */
export function regolaDa(s: Stato, path: string, tipo?: string): Regola {
  const p = normalizza(path)
  const riservata = corrisponde(p, s.riservate)
  const propria = s.pagine.get(p)
  // Le pagine riservate non vanno in robots.txt: un motore deve poterle leggere per vedere il noindex,
  // e robots.txt è pubblico (non serve elencarle).
  const blocca = !riservata && (propria?.motori === 'blocca' || corrisponde(p, s.bloccati))
  const escluso = riservata || blocca || propria?.motori === 'noindex' || corrisponde(p, s.noindex)
  return {
    riservata,
    blocca,
    noindex: inProva() || escluso,
    // Con il sito in prova la sitemap resta completa (robots.txt chiude comunque tutto): serve al
    // controllo SEO prima della pubblicazione (tools/controllo-seo.mjs legge la sitemap).
    sitemap: !escluso && !propria?.fuoriSitemap && !(tipo && s.tipiFuoriSitemap.has(tipo)),
    ricerca: !riservata && propria?.motori !== 'blocca' && !propria?.fuoriRicerca && !corrisponde(p, s.bloccati),
  }
}

export async function regolaPer(path: string, tipo?: string): Promise<Regola> {
  return regolaDa(await regole(), path, tipo)
}

/** Righe Disallow di robots.txt per un indirizzo (italiano e inglese). */
export function disallow(schema: string): string[] {
  const base = schema.endsWith('*') ? schema.slice(0, -1) : schema
  // In robots.txt un prefisso vale già per tutto quello che segue; senza * si blocca solo l'indirizzo esatto.
  const fine = schema.endsWith('*') ? '' : '$'
  return [`Disallow: ${base}${fine}`, `Disallow: /en${base}${fine}`]
}
