/**
 * Version: 1.00
 * CMP Serralunga: registro dei fornitori e dei cookie, categorie e configurazione del banner.
 * Fonte delle impostazioni: pannello > Impostazioni > «Privacy e cookies» (global privacy-cookies)
 * e i codici di Impostazioni del sito > Sicurezza e tracciamento.
 *
 * Categorie (specifica tecnica CMP §2): necessari (sempre attivi), preferenze, statistiche, marketing.
 * Un fornitore compare nel banner e nella cookie policy solo se è davvero attivo sul sito
 * (codice inserito nel pannello, script aggiunto, contenuto incorporato).
 * Durate dei cookie: quelle dichiarate dai fornitori (e dalla cookie policy di serralunga.com dove presenti).
 */
import { CMS_INTERNAL, type Doc } from './cms'
import type { Lingua } from './lingua'
import { codiciTracciamento } from './tracciamento'

export const CATEGORIE = ['necessari', 'preferenze', 'statistiche', 'marketing'] as const
export type Categoria = (typeof CATEGORIE)[number]
/** Nomi delle categorie nel cookie cmp_consent, nel registro e negli attributi data-cmp-category (specifica §5). */
export const CHIAVE: Record<Categoria, 'necessary' | 'preferences' | 'analytics' | 'marketing'> = { necessari: 'necessary', preferenze: 'preferences', statistiche: 'analytics', marketing: 'marketing' }
export const NOME_CATEGORIA: Record<Categoria, string> = { necessari: 'Necessari', preferenze: 'Preferenze', statistiche: 'Statistiche', marketing: 'Marketing' }

type Bi = { it: string; en: string }
export interface CookieInfo { nome: string; dominio: string; finalita: Bi; durata: Bi }
export interface Fornitore {
  id: string
  categoria: Categoria
  nome: string
  societa: string
  privacy: string
  descrizione: Bi
  cookie: CookieInfo[]
}

const c = (nome: string, dominio: string, finalita: Bi, durata: Bi): CookieInfo => ({ nome, dominio, finalita, durata })
const D = {
  sessione: { it: 'sessione', en: 'session' },
  min15: { it: '15 minuti', en: '15 minutes' },
  ore2: { it: '2 ore', en: '2 hours' },
  g1: { it: '1 giorno', en: '1 day' },
  g30: { it: '30 giorni', en: '30 days' },
  m3: { it: '3 mesi', en: '3 months' },
  m6: { it: '6 mesi', en: '6 months' },
  m7: { it: '7 mesi', en: '7 months' },
  m8: { it: '8 mesi', en: '8 months' },
  m13: { it: '13 mesi', en: '13 months' },
  a1: { it: '1 anno', en: '1 year' },
  a2: { it: '2 anni', en: '2 years' },
}

/** Durata della scelta del visitatore, in giorni (massimo 6 mesi per il Garante, provv. 231/2021). */
export const DURATA_MASSIMA = 180

export function cookieConsenso(giorni: number): CookieInfo {
  const g = { it: `${giorni} giorni`, en: `${giorni} days` }
  return c('cmp_consent', 'sito', { it: 'Memorizza le scelte sui cookie (categorie, data, versione dell’informativa).', en: 'Stores the cookie choices (categories, date, policy version).' }, g)
}

/** Fornitori noti. Si attivano dai codici del pannello o dai contenuti della pagina. */
export const FORNITORI: Record<string, Omit<Fornitore, 'id'>> = {
  sito: {
    categoria: 'necessari',
    nome: 'Sito Serralunga',
    societa: '',
    privacy: '',
    descrizione: { it: 'Funzionamento del sito, sicurezza dell’area di redazione e memoria delle scelte sui cookie.', en: 'Site operation, security of the editorial area and storage of cookie choices.' },
    cookie: [
      c('payload-token', 'sito', { it: 'Accesso degli utenti della redazione al pannello (non viene impostato ai visitatori).', en: 'Login of editorial staff to the admin panel (not set for visitors).' }, D.ore2),
    ],
  },
  recaptcha: {
    categoria: 'necessari',
    nome: 'Google reCAPTCHA',
    societa: 'Google Ireland Limited',
    privacy: 'https://policies.google.com/privacy',
    descrizione: { it: 'Protegge i moduli di contatto e di iscrizione dagli invii automatici (spam).', en: 'Protects contact and subscription forms from automated submissions (spam).' },
    cookie: [c('_GRECAPTCHA', 'google.com', { it: 'Analisi del rischio per distinguere persone e programmi automatici.', en: 'Risk analysis to tell people from automated programs.' }, D.m6)],
  },
  ga4: {
    categoria: 'statistiche',
    nome: 'Google Analytics 4',
    societa: 'Google Ireland Limited',
    privacy: 'https://policies.google.com/privacy',
    descrizione: { it: 'Statistiche aggregate sulle visite e sull’uso delle pagine.', en: 'Aggregate statistics on visits and page use.' },
    cookie: [
      c('_ga', 'sito', { it: 'Distingue i visitatori in forma pseudonima.', en: 'Distinguishes visitors pseudonymously.' }, D.a2),
      c('_ga_<ID>', 'sito', { it: 'Mantiene lo stato della sessione di misurazione.', en: 'Keeps the measurement session state.' }, D.a2),
    ],
  },
  clarity: {
    categoria: 'statistiche',
    nome: 'Microsoft Clarity',
    societa: 'Microsoft Ireland Operations Limited',
    privacy: 'https://privacy.microsoft.com/privacystatement',
    descrizione: { it: 'Mappe di calore e registrazioni anonime della navigazione per migliorare le pagine.', en: 'Heatmaps and anonymous session recordings to improve the pages.' },
    cookie: [
      c('_clck', 'sito', { it: 'Identificativo utente di Clarity.', en: 'Clarity user identifier.' }, D.a1),
      c('_clsk', 'sito', { it: 'Collega più pagine viste nella stessa sessione.', en: 'Links several page views into one session.' }, D.g1),
      c('CLID', 'clarity.ms', { it: 'Riconosce il browser tra i siti che usano Clarity.', en: 'Recognises the browser across sites using Clarity.' }, D.a1),
      c('MUID', 'bing.com', { it: 'Identificativo Microsoft del browser.', en: 'Microsoft browser identifier.' }, D.a1),
    ],
  },
  gtm: {
    categoria: 'statistiche',
    nome: 'Google Tag Manager',
    societa: 'Google Ireland Limited',
    privacy: 'https://policies.google.com/privacy',
    descrizione: { it: 'Gestione dei tag: non imposta cookie propri, carica solo i servizi consentiti.', en: 'Tag management: sets no cookies of its own, loads only the permitted services.' },
    cookie: [],
  },
  ads: {
    categoria: 'marketing',
    nome: 'Google Ads',
    societa: 'Google Ireland Limited',
    privacy: 'https://policies.google.com/privacy',
    descrizione: { it: 'Misura le conversioni (richieste inviate) delle campagne Google Ads.', en: 'Measures conversions (submitted requests) from Google Ads campaigns.' },
    cookie: [
      c('_gcl_au', 'sito', { it: 'Collega le conversioni ai clic sugli annunci.', en: 'Links conversions to ad clicks.' }, D.m3),
      c('IDE', 'doubleclick.net', { it: 'Pubblicità e misurazione delle campagne.', en: 'Advertising and campaign measurement.' }, D.m13),
      c('test_cookie', 'doubleclick.net', { it: 'Verifica se il browser accetta i cookie.', en: 'Checks whether the browser accepts cookies.' }, D.min15),
    ],
  },
  meta: {
    categoria: 'marketing',
    nome: 'Meta Pixel',
    societa: 'Meta Platforms Ireland Limited',
    privacy: 'https://www.facebook.com/privacy/policy/',
    descrizione: { it: 'Misura le conversioni e crea pubblici per le campagne su Facebook e Instagram.', en: 'Measures conversions and builds audiences for Facebook and Instagram campaigns.' },
    cookie: [
      c('_fbp', 'sito', { it: 'Identifica il browser per la pubblicità di Meta.', en: 'Identifies the browser for Meta advertising.' }, D.m3),
      c('_fbc', 'sito', { it: 'Memorizza l’ultimo clic su un annuncio Meta.', en: 'Stores the last click on a Meta ad.' }, D.m3),
      c('fr', 'facebook.com', { it: 'Pubblicità e misurazione delle campagne.', en: 'Advertising and campaign measurement.' }, D.m3),
    ],
  },
  linkedin: {
    categoria: 'marketing',
    nome: 'LinkedIn Insight Tag',
    societa: 'LinkedIn Ireland Unlimited Company',
    privacy: 'https://www.linkedin.com/legal/privacy-policy',
    descrizione: { it: 'Misura le conversioni delle campagne LinkedIn e fornisce statistiche aggregate sui visitatori professionali.', en: 'Measures LinkedIn campaign conversions and provides aggregate statistics on professional visitors.' },
    cookie: [
      c('li_fat_id', 'sito', { it: 'Collega le conversioni ai clic sugli annunci LinkedIn.', en: 'Links conversions to LinkedIn ad clicks.' }, D.g30),
      c('bcookie', 'linkedin.com', { it: 'Identificativo del browser.', en: 'Browser identifier.' }, D.a1),
      c('lidc', 'linkedin.com', { it: 'Instradamento verso i server LinkedIn.', en: 'Routing to LinkedIn servers.' }, D.g1),
      c('UserMatchHistory', 'linkedin.com', { it: 'Sincronizzazione degli identificativi pubblicitari.', en: 'Advertising ID syncing.' }, D.g30),
    ],
  },
  youtube: {
    categoria: 'marketing',
    nome: 'YouTube',
    societa: 'Google Ireland Limited',
    privacy: 'https://policies.google.com/privacy',
    descrizione: { it: 'Video incorporati nelle pagine (modalità privacy avanzata: nessun cookie finché il video non parte).', en: 'Videos embedded in the pages (privacy-enhanced mode: no cookies until playback).' },
    cookie: [
      c('VISITOR_INFO1_LIVE', 'youtube.com', { it: 'Stima la banda per la qualità del video.', en: 'Estimates bandwidth for video quality.' }, D.m8),
      c('VISITOR_PRIVACY_METADATA', 'youtube.com', { it: 'Memorizza lo stato del consenso di YouTube.', en: 'Stores YouTube consent state.' }, D.m7),
      c('PREF', 'youtube.com', { it: 'Preferenze del lettore.', en: 'Player preferences.' }, D.m8),
      c('YSC', 'youtube.com', { it: 'Statistiche delle visualizzazioni.', en: 'View statistics.' }, D.sessione),
    ],
  },
  vimeo: {
    categoria: 'marketing',
    nome: 'Vimeo',
    societa: 'Vimeo.com, Inc.',
    privacy: 'https://vimeo.com/privacy',
    descrizione: { it: 'Video incorporati nelle pagine.', en: 'Videos embedded in the pages.' },
    cookie: [c('vuid', 'vimeo.com', { it: 'Statistiche delle visualizzazioni.', en: 'View statistics.' }, D.a2)],
  },
  maps: {
    categoria: 'preferenze',
    nome: 'Google Maps',
    societa: 'Google Ireland Limited',
    privacy: 'https://policies.google.com/privacy',
    descrizione: { it: 'Mappe interattive incorporate nelle pagine.', en: 'Interactive maps embedded in the pages.' },
    cookie: [c('NID', 'google.com', { it: 'Preferenze e sicurezza dei servizi Google.', en: 'Preferences and security of Google services.' }, D.m6)],
  },
}

/**
 * Da dove arriva ogni servizio: campo del pannello che lo attiva (Impostazioni del sito >
 * Sicurezza e tracciamento) e codice inserito. Serve al riquadro «Servizi rilevati» del pannello.
 */
export const ORIGINE: Record<string, { campo: string; codice?: keyof ReturnType<typeof codiciTracciamento> }> = {
  sito: { campo: 'Sempre attivo (sito e pannello)' },
  recaptcha: { campo: 'Sicurezza e tracciamento › reCAPTCHA' },
  ga4: { campo: 'Sicurezza e tracciamento › Statistiche › Google Analytics 4', codice: 'ga4' },
  gtm: { campo: 'Sicurezza e tracciamento › Statistiche › Google Tag Manager', codice: 'gtm' },
  clarity: { campo: 'Sicurezza e tracciamento › Statistiche › Microsoft Clarity', codice: 'clarity' },
  ads: { campo: 'Sicurezza e tracciamento › Marketing › Google Ads', codice: 'ads' },
  meta: { campo: 'Sicurezza e tracciamento › Marketing › Meta Pixel', codice: 'meta' },
  linkedin: { campo: 'Sicurezza e tracciamento › Marketing › LinkedIn Insight Tag', codice: 'linkedin' },
  youtube: { campo: 'Privacy e cookies › Video e mappe incorporati' },
  vimeo: { campo: 'Privacy e cookies › Video e mappe incorporati' },
  maps: { campo: 'Privacy e cookies › Video e mappe incorporati' },
}

/** Cookie di ogni categoria da cancellare sul dominio del sito quando il consenso viene tolto. */
export const DA_CANCELLARE: Record<Exclude<Categoria, 'necessari'>, string[]> = {
  preferenze: [],
  statistiche: ['_ga', '_ga_*', '_gid', '_gat*', '_clck', '_clsk'],
  marketing: ['_gcl_*', '_fbp', '_fbc', 'li_fat_id', 'li_sugr', '_uetsid', '_uetvid'],
}

/** Riconosce il fornitore di un indirizzo da incorporare (video, mappa). */
export function fornitoreEmbed(url: string): { id: 'youtube' | 'vimeo' | 'maps'; src: string } | null {
  let u: URL
  try {
    u = new URL(url.trim())
  } catch {
    return null
  }
  if (u.protocol !== 'https:') return null
  const h = u.hostname.replace(/^www\./, '')
  if (h === 'youtu.be' || h.endsWith('youtube.com') || h === 'youtube-nocookie.com') {
    const id = h === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v') || u.pathname.split('/').filter(Boolean).pop() || ''
    return /^[\w-]{6,20}$/.test(id) ? { id: 'youtube', src: `https://www.youtube-nocookie.com/embed/${id}?rel=0` } : null
  }
  if (h === 'vimeo.com' || h === 'player.vimeo.com') {
    const id = u.pathname.split('/').filter(Boolean).find((p) => /^\d+$/.test(p))
    return id ? { id: 'vimeo', src: `https://player.vimeo.com/video/${id}?dnt=1` } : null
  }
  if ((h === 'google.com' || h.endsWith('.google.com') || h === 'google.it') && u.pathname.startsWith('/maps')) {
    return { id: 'maps', src: u.toString() }
  }
  return null
}

/* ----------------------------------------------------------- impostazioni */

export const TESTI_CMP = {
  it: {
    titolo: 'Rispettiamo la vostra privacy',
    testo: 'Usiamo cookie tecnici necessari al funzionamento del sito. Con il vostro consenso usiamo anche cookie di preferenze, statistica e marketing per misurare le visite e mostrare comunicazioni pertinenti alla vostra attività. Potete accettarli tutti, rifiutarli o scegliere per categoria; la scelta si cambia in ogni momento da «Gestisci preferenze cookie» in fondo alla pagina.',
    pannello: 'Scegliete quali categorie di cookie consentire. I cookie necessari sono sempre attivi perché senza di essi il sito non funziona. La scelta vale 6 mesi.',
    necessari: 'Servono al funzionamento e alla sicurezza del sito e a ricordare le vostre scelte. Non richiedono consenso.',
    preferenze: 'Ricordano le vostre impostazioni e attivano contenuti esterni come le mappe.',
    statistiche: 'Ci aiutano a capire in forma aggregata come vengono usate le pagine, per migliorarle.',
    marketing: 'Misurano l’efficacia delle nostre campagne e permettono comunicazioni pertinenti sulle piattaforme pubblicitarie e social; attivano anche i video incorporati.',
  },
  en: {
    titolo: 'We respect your privacy',
    testo: 'We use technical cookies that the site needs to work. With your consent we also use preference, statistics and marketing cookies to measure visits and show communications relevant to your business. You can accept them all, reject them or choose by category; you can change your choice at any time from “Manage cookie preferences” at the bottom of the page.',
    pannello: 'Choose which categories of cookies to allow. Necessary cookies are always on because the site cannot work without them. Your choice lasts 6 months.',
    necessari: 'Required for the site to work securely and to remember your choices. They do not require consent.',
    preferenze: 'Remember your settings and enable external content such as maps.',
    statistiche: 'Help us understand, in aggregate form, how the pages are used so we can improve them.',
    marketing: 'Measure the effectiveness of our campaigns and allow relevant communications on advertising and social platforms; they also enable embedded videos.',
  },
} as const
export type TestiCmp = { -readonly [K in keyof (typeof TESTI_CMP)['it']]: string }

const cache = new Map<Lingua, { t: number; v: Doc }>()

/** Global «privacy-cookies» senza ripiego sull'italiano (il ripiego lo fanno i testi qui sopra). */
export async function privacyCookies(L: Lingua, fresco = false): Promise<Doc> {
  const x = cache.get(L)
  if (!fresco && x && Date.now() - x.t < 60_000) return x.v
  let v: Doc = {}
  try {
    const qs = new URLSearchParams({ locale: L, 'fallback-locale': L === 'it' ? 'it' : 'none', depth: '0' })
    const res = await fetch(`${CMS_INTERNAL}/api/globals/privacy-cookies?${qs}`, { headers: { Accept: 'application/json' } })
    v = res.ok ? await res.json() : {}
  } catch {
    v = {}
  }
  cache.set(L, { t: Date.now(), v })
  return v
}

const pulisci = (s: unknown, max = 400) => (typeof s === 'string' ? s.trim().slice(0, max) : '')
const categoria = (v: unknown): Categoria => (CATEGORIE.includes(v as Categoria) ? (v as Categoria) : 'marketing')

export interface ScriptCmp { nome: string; categoria: Exclude<Categoria, 'necessari'>; src: string; codice: string }

/** Tutto ciò che serve al banner, alla cookie policy e allo script del consenso. */
export function configCmp(imp: Doc, pc: Doc, L: Lingua, embed: string[] = []) {
  const codici = codiciTracciamento(imp)
  const giorni = Math.min(DURATA_MASSIMA, Math.max(1, Number(pc.durataGiorni) || DURATA_MASSIMA))
  const versione = pulisci(pc.versionePolicy, 20) || '1.00'
  const attivi = new Set<string>(['sito'])
  if (imp.recaptchaAttivo && pulisci(imp.recaptchaChiaveSito)) attivi.add('recaptcha')
  if (codici.ga4) attivi.add('ga4')
  if (codici.gtm) attivi.add('gtm')
  if (codici.clarity) attivi.add('clarity')
  if (codici.ads) attivi.add('ads')
  if (codici.meta) attivi.add('meta')
  if (codici.linkedin) attivi.add('linkedin')
  // Video e mappe incorporati: quelli scelti nel pannello più quelli presenti nella pagina.
  for (const e of [...(Array.isArray(pc.incorporati) ? pc.incorporati : []), ...embed]) if (['youtube', 'vimeo', 'maps'].includes(e)) attivi.add(e)

  const fornitori: Fornitore[] = [...attivi].filter((id) => FORNITORI[id]).map((id) => {
    const f = FORNITORI[id]
    return { id, ...f, cookie: id === 'sito' ? [cookieConsenso(giorni), ...f.cookie] : f.cookie }
  })
  for (const [i, e] of (Array.isArray(pc.fornitori) ? pc.fornitori : []).entries()) {
    const nome = pulisci(e?.nome, 120)
    if (!nome) continue
    fornitori.push({
      id: `extra-${i}`,
      categoria: categoria(e.categoria),
      nome,
      societa: pulisci(e.societa, 160),
      privacy: /^https:\/\//.test(pulisci(e.privacy)) ? pulisci(e.privacy) : '',
      descrizione: { it: pulisci(e.finalita, 600), en: pulisci(e.finalita, 600) },
      cookie: (Array.isArray(e.cookie) ? e.cookie : [])
        .filter((k: Doc) => pulisci(k?.nome))
        .map((k: Doc) => c(pulisci(k.nome, 120), pulisci(k.dominio, 120) || 'sito', { it: pulisci(k.finalita, 300), en: pulisci(k.finalita, 300) }, { it: pulisci(k.durata, 60), en: pulisci(k.durata, 60) })),
    })
  }
  const script: ScriptCmp[] = (Array.isArray(pc.script) ? pc.script : [])
    .filter((s: Doc) => s && s.attivo !== false && (pulisci(s.src) || pulisci(s.codice, 20000)))
    .map((s: Doc) => ({
      nome: pulisci(s.nome, 120) || 'Script',
      categoria: (['preferenze', 'statistiche', 'marketing'].includes(s.categoria) ? s.categoria : 'marketing') as ScriptCmp['categoria'],
      src: /^https:\/\/[^\s"'<>]+$/.test(pulisci(s.src, 500)) ? pulisci(s.src, 500) : '',
      codice: pulisci(s.codice, 20000),
    }))

  const testi = Object.fromEntries(
    Object.entries(TESTI_CMP[L]).map(([k, d]) => [k, pulisci(pc.testi?.[k], 2000) || (k === 'testo' ? pulisci(imp.cookieTesto, 2000) : '') || d]),
  ) as TestiCmp
  // Il banner serve solo se c'è qualcosa che richiede il consenso (o se il pannello lo vuole sempre).
  const conConsenso = fornitori.some((f) => f.categoria !== 'necessari' && !['youtube', 'vimeo', 'maps'].includes(f.id)) || script.length > 0
  // Predefinito «sempre» (scelta dell'utente 2026-11-17): con «auto» solo se servono consensi.
  const mostraBanner = pc.quandoBanner !== 'auto' || conConsenso
  const categoriePresenti = CATEGORIE.filter((k) => k === 'necessari' || fornitori.some((f) => f.categoria === k) || script.some((s) => s.categoria === k))
  return {
    versione,
    giorni,
    mostraBanner,
    categorie: categoriePresenti,
    fornitori,
    script,
    testi,
    privacyLink: pulisci(pc.privacyLink, 300) || '/privacy-policy/',
    cookieLink: pulisci(pc.cookieLink, 300) || pulisci(imp.cookieLink, 300) || '/cookie-policy/',
    metaLdu: pc.metaLdu === true,
    googleAvanzata: pc.googleAvanzata === true,
    codici,
  }
}

export type ConfigCmp = ReturnType<typeof configCmp>
