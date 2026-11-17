/**
 * Version: 1.00
 * Impostazioni dei moduli (Payload: «Moduli, newsletter ed email») e protezione reCAPTCHA
 * (Impostazioni del sito > Sicurezza e tracciamento). I testi vuoti nel pannello usano i
 * predefiniti della lingua della pagina, gli stessi di cms/src/globals/Moduli.ts.
 */
import { CMS_INTERNAL, env, type Doc } from './cms'
import type { Lingua } from './lingua'

export const TESTI_MODULI = {
  it: {
    privacyEtichetta: 'Ho letto l’informativa privacy e acconsento al trattamento dei dati per ricevere una risposta alla richiesta.',
    newsletterEtichetta: 'Desidero ricevere la newsletter Serralunga con novità di prodotto, progetti contract e cataloghi.',
    privacyNewsletter: 'Ho letto l’informativa privacy e acconsento al trattamento dei dati per ricevere la newsletter Serralunga.',
    newsletterLink: 'Iscriviti alla newsletter',
    newsletterTitolo: 'La newsletter Serralunga',
    newsletterTesto: 'Novità di prodotto, progetti contract realizzati e nuovi cataloghi, per architetti, interior designer e strutture dell’ospitalità.',
    newsletterPulsante: 'Iscriviti',
    newsletterGrazie: 'Grazie. Vi abbiamo inviato un’email: per completare l’iscrizione aprite il link di conferma.',
    cookieTesto: 'Usiamo cookie tecnici necessari al sito e, solo con il vostro consenso, cookie di statistica e di marketing per misurare le visite e mostrare comunicazioni pertinenti.',
  },
  en: {
    privacyEtichetta: 'I have read the privacy policy and consent to the processing of my data in order to receive a reply to my request.',
    newsletterEtichetta: 'I would like to receive the Serralunga newsletter with product news, contract projects and catalogues.',
    privacyNewsletter: 'I have read the privacy policy and consent to the processing of my data in order to receive the Serralunga newsletter.',
    newsletterLink: 'Subscribe to the newsletter',
    newsletterTitolo: 'The Serralunga newsletter',
    newsletterTesto: 'Product news, completed contract projects and new catalogues, for architects, interior designers and hospitality venues.',
    newsletterPulsante: 'Subscribe',
    newsletterGrazie: 'Thank you. We have sent you an email: please open the confirmation link to complete your subscription.',
    cookieTesto: 'We use technical cookies that the site needs and, only with your consent, statistics and marketing cookies to measure visits and show relevant communications.',
  },
} as const

export type TestiModuli = { -readonly [K in keyof (typeof TESTI_MODULI)['it']]: string }

const cache = new Map<Lingua, { t: number; v: Doc }>()

/** Global «moduli» senza ripiego sull'italiano (il ripiego lo fanno i predefiniti qui sopra). */
export async function moduli(L: Lingua): Promise<Doc & { testi: TestiModuli }> {
  const c = cache.get(L)
  let v: Doc = c && Date.now() - c.t < 60_000 ? c.v : {}
  if (!c || Date.now() - c.t >= 60_000) {
    try {
      const qs = new URLSearchParams({ locale: L, 'fallback-locale': L === 'it' ? 'it' : 'none', depth: '0' })
      const res = await fetch(`${CMS_INTERNAL}/api/globals/moduli?${qs}`, { headers: { Accept: 'application/json' } })
      v = res.ok ? await res.json() : {}
    } catch {
      v = {}
    }
    cache.set(L, { t: Date.now(), v })
  }
  const testi = Object.fromEntries(
    Object.entries(TESTI_MODULI[L]).map(([k, d]) => [k, typeof v[k] === 'string' && v[k].trim() ? v[k].trim() : d]),
  ) as TestiModuli
  return { ...v, testi }
}

/** reCAPTCHA attivo solo con chiave pubblica e protezione accesa (la segreta la controlla Payload). */
export const recaptcha = (imp: Doc): { chiave: string; tipo: 'v2' | 'v3' } | null =>
  imp.recaptchaAttivo && typeof imp.recaptchaChiaveSito === 'string' && imp.recaptchaChiaveSito.trim()
    ? { chiave: imp.recaptchaChiaveSito.trim(), tipo: imp.recaptchaTipo === 'v2' ? 'v2' : 'v3' }
    : null

/* ----------------------------------------------------------- lato server */

const host = (u: string | null) => {
  try {
    return u ? new URL(u).host : ''
  } catch {
    return ''
  }
}

/** Accetta solo invii dal sito stesso (l'indirizzo pubblico arriva a runtime da SITO_URL). */
export const stessoSito = (request: Request) => {
  const origine = host(request.headers.get('origin')) || host(request.headers.get('referer'))
  if (!origine) return false
  const ammessi = [
    host(env('SITO_URL')),
    request.headers.get('x-forwarded-host')?.split(',')[0].trim(),
    request.headers.get('host'),
  ].filter(Boolean)
  return ammessi.includes(origine)
}

/** IP del visitatore come lo passa il proxy (Caddy imposta X-Forwarded-For). */
export const ipDi = (request: Request, clientAddress?: string) =>
  (request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || clientAddress || '').slice(0, 64)

/** Inoltra a Payload con la chiave del sito; restituisce stato e corpo JSON. */
export async function aPayload(percorso: string, corpo: Doc): Promise<{ stato: number; dati: Doc }> {
  const res = await fetch(`${CMS_INTERNAL}/api/moduli/${percorso}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-sito-chiave': env('SITO_CHIAVE') },
    body: JSON.stringify(corpo),
  })
  const dati = await res.json().catch(() => ({}))
  return { stato: res.status, dati }
}
