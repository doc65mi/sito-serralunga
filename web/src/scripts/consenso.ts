/**
 * consenso.ts — banner dei cookie e caricamento dei tracciamenti (Version: 1.00)
 * Senza consenso non parte nulla (Consent Mode v2 resta su «denied»). Con il consenso:
 *  - statistiche: Google Analytics 4, Microsoft Clarity (e GTM);
 *  - marketing: Google Ads, Meta Pixel, LinkedIn Insight (e GTM).
 * A ogni modulo inviato (evento «serralunga:lead») parte la conversione dove consentito.
 */
type Codici = { ga4: string; gtm: string; ads: string; adsConversione: string; clarity: string; meta: string; linkedin: string }
type Scelta = { statistiche: boolean; marketing: boolean; v: 1; data: string }

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...a: unknown[]) => void
    fbq?: ((...a: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown }
    _fbq?: unknown
    _linkedin_partner_id?: string
    _linkedin_data_partner_ids?: string[]
    lintrk?: ((...a: unknown[]) => void) & { q?: unknown[] }
    clarity?: ((...a: unknown[]) => void) & { q?: unknown[] }
  }
}

const CHIAVE = 'serralunga-consenso'
const DURATA_GIORNI = 180

const nodo = document.querySelector<HTMLScriptElement>('script[data-tracciamento]')
const codici: Codici | null = nodo ? JSON.parse(nodo.dataset.tracciamento || '{}') : null

function leggi(): Scelta | null {
  try {
    const s = JSON.parse(localStorage.getItem(CHIAVE) || 'null') as Scelta | null
    if (!s || s.v !== 1) return null
    if (Date.now() - new Date(s.data).getTime() > DURATA_GIORNI * 864e5) return null
    return s
  } catch {
    return null
  }
}
function scrivi(s: Scelta) {
  try {
    localStorage.setItem(CHIAVE, JSON.stringify(s))
  } catch {
    /* navigazione privata: la scelta vale per questa pagina */
  }
}

const caricato = new Set<string>()
function script(src: string, id: string) {
  if (caricato.has(id)) return
  caricato.add(id)
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}

function applica(s: Scelta) {
  if (!codici) return
  const g = (...a: unknown[]) => window.gtag?.(...a)
  g('consent', 'update', {
    analytics_storage: s.statistiche ? 'granted' : 'denied',
    ad_storage: s.marketing ? 'granted' : 'denied',
    ad_user_data: s.marketing ? 'granted' : 'denied',
    ad_personalization: s.marketing ? 'granted' : 'denied',
  })
  const google = (s.statistiche && codici.ga4) || (s.marketing && codici.ads)
  if (google) {
    script(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(google)}`, 'gtag')
    if (!caricato.has('gtag-config')) {
      caricato.add('gtag-config')
      g('js', new Date())
    }
    if (s.statistiche && codici.ga4 && !caricato.has('ga4')) {
      caricato.add('ga4')
      g('config', codici.ga4, { anonymize_ip: true })
    }
    if (s.marketing && codici.ads && !caricato.has('ads')) {
      caricato.add('ads')
      g('config', codici.ads)
    }
  }
  if (codici.gtm && (s.statistiche || s.marketing) && !caricato.has('gtm')) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    script(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(codici.gtm)}`, 'gtm')
  }
  if (s.statistiche && codici.clarity && !caricato.has('clarity')) {
    if (!window.clarity) {
      const coda: unknown[] = []
      window.clarity = Object.assign((...a: unknown[]) => void coda.push(a), { q: coda })
    }
    script(`https://www.clarity.ms/tag/${encodeURIComponent(codici.clarity)}`, 'clarity')
  }
  if (s.marketing && codici.meta && !window.fbq) {
    const f = ((...a: unknown[]) => {
      if (f.callMethod) (f.callMethod as (...x: unknown[]) => void)(...a)
      else f.queue!.push(a)
    }) as NonNullable<Window['fbq']>
    f.push = f
    f.loaded = true
    f.version = '2.0'
    f.queue = []
    window.fbq = window._fbq = f
    script('https://connect.facebook.net/en_US/fbevents.js', 'meta')
    f('init', codici.meta)
    f('track', 'PageView')
  }
  if (s.marketing && codici.linkedin && !caricato.has('linkedin')) {
    window._linkedin_partner_id = codici.linkedin
    window._linkedin_data_partner_ids = [...(window._linkedin_data_partner_ids || []), codici.linkedin]
    if (!window.lintrk) {
      const coda: unknown[] = []
      window.lintrk = Object.assign((...a: unknown[]) => void coda.push(a), { q: coda })
    }
    script('https://snap.licdn.com/li.lms-analytics/insight.min.js', 'linkedin')
  }
}

/* Conversione: modulo inviato con successo (vedi site.ts). */
window.addEventListener('serralunga:lead', (e) => {
  const tipo = (e as CustomEvent<{ tipo?: string }>).detail?.tipo || 'richiesta'
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event: 'generate_lead', modulo: tipo })
  const s = leggi()
  if (!codici || !s) return
  if (s.statistiche && codici.ga4) window.gtag?.('event', 'generate_lead', { form: tipo })
  if (s.marketing && codici.ads && codici.adsConversione) window.gtag?.('event', 'conversion', { send_to: `${codici.ads}/${codici.adsConversione}` })
  if (s.marketing && codici.meta) window.fbq?.('track', tipo === 'newsletter' ? 'CompleteRegistration' : 'Lead')
})

/* Banner */
const banner = document.querySelector<HTMLElement>('[data-banner-cookie]')
if (codici && banner) {
  const scelte = banner.querySelector<HTMLElement>('[data-cookie-scelte]')
  const casella = (k: string) => banner.querySelector<HTMLInputElement>(`[data-categoria="${k}"]`)
  const pulsante = (k: string) => banner.querySelector<HTMLButtonElement>(`[data-cookie="${k}"]`)
  const mostra = (personalizza = false) => {
    const s = leggi()
    if (casella('statistiche')) casella('statistiche')!.checked = Boolean(s?.statistiche)
    if (casella('marketing')) casella('marketing')!.checked = Boolean(s?.marketing)
    if (scelte) scelte.hidden = !personalizza
    pulsante('salva')!.hidden = !personalizza
    pulsante('personalizza')!.hidden = personalizza
    banner.hidden = false
  }
  const decidi = (statistiche: boolean, marketing: boolean) => {
    const prima = leggi()
    const s: Scelta = { statistiche, marketing, v: 1, data: new Date().toISOString() }
    scrivi(s)
    banner.hidden = true
    // Un consenso tolto non si applica agli script già caricati: si ricarica la pagina.
    if ((prima?.statistiche && !statistiche) || (prima?.marketing && !marketing)) location.reload()
    else applica(s)
  }
  pulsante('rifiuta')?.addEventListener('click', () => decidi(false, false))
  pulsante('tutti')?.addEventListener('click', () => decidi(true, true))
  pulsante('personalizza')?.addEventListener('click', () => mostra(true))
  pulsante('salva')?.addEventListener('click', () => decidi(Boolean(casella('statistiche')?.checked), Boolean(casella('marketing')?.checked)))
  banner.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') decidi(false, false)
  })
  document.querySelectorAll('[data-cookie-preferenze]').forEach((b) => b.addEventListener('click', () => mostra(true)))

  const s = leggi()
  if (s) applica(s)
  else mostra(false)
}

export {}
