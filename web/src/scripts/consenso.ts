/**
 * consenso.ts — CMP Serralunga, SDK lato browser (Version: 2.00)
 * Specifica tecnica CMP: GDPR, art. 122 Codice privacy, Garante provv. 231/2021, Google Consent Mode v2.
 *
 * - Senza consenso non parte nulla: Consent Mode resta «denied» (impostato nel <head> da
 *   Tracciamento.astro) e nessuno script di terze parti viene caricato.
 * - La scelta sta nel cookie tecnico di prima parte `cmp_consent` (JSON: consent_id, timestamp,
 *   policy_version, categories), Path=/; SameSite=Lax; Secure in HTTPS; durata ≤ 180 giorni.
 * - Ogni scelta (accetta, rifiuta, X, personalizza, revoca) va nel registro dei consensi:
 *   POST /api/v1/consent-log con fetch keepalive.
 * - Al consenso: gtag('consent','update'), evento dataLayer `cmp_consent_updated` con le
 *   categorie, caricamento dei tag (GA4, Ads, GTM, Clarity, Meta, LinkedIn), sblocco degli script
 *   `type="text/plain" data-cmp-category` e dei video/mappe `data-cmp-embed`.
 * - Consenso tolto: si cancellano i cookie della categoria sul dominio del sito e si ricarica
 *   la pagina, così gli script già partiti non restano attivi.
 * - A ogni modulo inviato (evento «serralunga:lead») parte la conversione dove consentito.
 */
type Cat = 'preferences' | 'analytics' | 'marketing'
type Categorie = { necessary: true } & Record<Cat, boolean>
type Stato = { consent_id: string; timestamp: string; policy_version: string; categories: Categorie }
type Azione = 'accept_all' | 'reject_all' | 'close_x' | 'custom' | 'revoke'
type Codici = { ga4: string; gtm: string; ads: string; adsConversione: string; clarity: string; meta: string; linkedin: string }
type Config = { v: string; g: number; mostra: boolean; lingua: string; codici: Codici; googleAvanzata: boolean; metaLdu: boolean }

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...a: unknown[]) => void
    __cmpStato?: Stato | null
    fbq?: ((...a: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown }
    _fbq?: unknown
    _linkedin_partner_id?: string
    _linkedin_data_partner_ids?: string[]
    lintrk?: ((...a: unknown[]) => void) & { q?: unknown[] }
    clarity?: ((...a: unknown[]) => void) & { q?: unknown[] }
    serralungaCmp?: { apri: () => void; stato: () => Stato | null }
  }
}

const COOKIE = 'cmp_consent'
const CATEGORIE: Cat[] = ['preferences', 'analytics', 'marketing']
/** Cookie del sito da cancellare quando si toglie il consenso (vedi lib/cmp.ts, DA_CANCELLARE). */
const DA_CANCELLARE: Record<Cat, string[]> = {
  preferences: [],
  analytics: ['_ga', '_ga_*', '_gid', '_gat*', '_clck', '_clsk'],
  marketing: ['_gcl_*', '_fbp', '_fbc', 'li_fat_id', 'li_sugr', '_uetsid', '_uetvid'],
}

const banner = document.querySelector<HTMLElement>('[data-cmp-banner]')
const pannello = document.querySelector<HTMLDialogElement>('[data-cmp-pannello]')
let config: Config | null = null
try {
  config = banner ? (JSON.parse(banner.dataset.cmpConfig || 'null') as Config) : null
} catch {
  config = null
}
window.dataLayer = window.dataLayer || []
const gtag = (...a: unknown[]) => {
  if (window.gtag) window.gtag(...a)
  else window.dataLayer.push(a)
}

/* ------------------------------------------------------------------ stato */

function leggi(): Stato | null {
  if (!config) return null
  try {
    const m = document.cookie.match(/(?:^|;\s*)cmp_consent=([^;]+)/)
    const s = m ? (JSON.parse(decodeURIComponent(m[1])) as Stato) : null
    if (!s || s.policy_version !== config.v || !s.categories) return null
    if (!(Date.now() - Date.parse(s.timestamp) < config.g * 864e5)) return null
    return s
  } catch {
    return null
  }
}

function scrivi(s: Stato) {
  if (!config) return
  const sicuro = location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(s))}; Path=/; Max-Age=${config.g * 86400}; SameSite=Lax${sicuro}`
  try {
    localStorage.removeItem('serralunga-consenso') // banner 1.00: la scelta ora sta nel cookie
  } catch {
    /* niente */
  }
}

function uuid(): string {
  if (crypto.randomUUID) return crypto.randomUUID()
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = [...b].map((x) => x.toString(16).padStart(2, '0')).join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

function registra(s: Stato, azione: Azione) {
  try {
    void fetch('/api/v1/consent-log', {
      method: 'POST',
      keepalive: true,
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...s,
        action_type: azione,
        // Solo indirizzo della pagina, senza parametri (minimizzazione).
        source_url: location.origin + location.pathname,
        lingua: config?.lingua,
        user_agent: navigator.userAgent,
      }),
    }).catch(() => undefined)
  } catch {
    /* il registro non deve mai bloccare la navigazione */
  }
}

/** Cancella i cookie indicati su questo dominio e sui domini superiori (es. .serralunga.com). */
function cancellaCookie(modelli: string[]) {
  if (!modelli.length) return
  const nomi = document.cookie.split(';').map((c) => c.split('=')[0].trim()).filter(Boolean)
  const parti = location.hostname.split('.')
  const domini = [''].concat(parti.map((_, i) => parti.slice(i).join('.')).filter((d) => d.includes('.')))
  for (const nome of nomi) {
    if (!modelli.some((m) => (m.endsWith('*') ? nome.startsWith(m.slice(0, -1)) : nome === m))) continue
    for (const d of domini) {
      document.cookie = `${nome}=; Path=/; Max-Age=0${d ? `; Domain=.${d}` : ''}`
    }
  }
}

/* ------------------------------------------------------------- caricamenti */

const caricato = new Set<string>()
function script(src: string, id: string) {
  if (caricato.has(id)) return
  caricato.add(id)
  const s = document.createElement('script')
  s.async = true
  s.src = src
  document.head.appendChild(s)
}
const una = (id: string) => (caricato.has(id) ? false : (caricato.add(id), true))

function aggiornaGoogle(k: Categorie) {
  const v = (x: boolean) => (x ? 'granted' : 'denied')
  gtag('consent', 'update', {
    analytics_storage: v(k.analytics),
    ad_storage: v(k.marketing),
    ad_user_data: v(k.marketing),
    ad_personalization: v(k.marketing),
    personalization_storage: v(k.preferences),
  })
}

function applica(k: Categorie) {
  if (!config) return
  const c = config.codici
  const avanzata = config.googleAvanzata

  // Google: con la modalità avanzata i tag partono anche senza consenso, ma solo con ping senza cookie.
  const ga4 = c.ga4 && (k.analytics || avanzata)
  const ads = c.ads && (k.marketing || avanzata)
  if (ga4 || ads) {
    script(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4 ? c.ga4 : c.ads)}`, 'gtag')
    if (una('gtag-js')) gtag('js', new Date())
    if (ga4 && una('ga4')) gtag('config', c.ga4)
    if (ads && una('ads')) gtag('config', c.ads)
  }
  if (c.gtm && (k.analytics || k.marketing || avanzata) && una('gtm')) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    script(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(c.gtm)}`, 'gtm-js')
  }
  if (k.analytics && c.clarity && una('clarity')) {
    if (!window.clarity) {
      const coda: unknown[] = []
      window.clarity = Object.assign((...a: unknown[]) => void coda.push(a), { q: coda })
    }
    window.clarity('consent')
    script(`https://www.clarity.ms/tag/${encodeURIComponent(c.clarity)}`, 'clarity-js')
  }
  if (k.marketing && c.meta && !window.fbq) {
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
    f('consent', 'grant')
    if (config.metaLdu) f('dataProcessingOptions', ['LDU'], 0, 0)
    f('init', c.meta)
    f('track', 'PageView')
  }
  if (k.marketing && c.linkedin && una('linkedin')) {
    window._linkedin_partner_id = c.linkedin
    window._linkedin_data_partner_ids = [...(window._linkedin_data_partner_ids || []), c.linkedin]
    if (!window.lintrk) {
      const coda: unknown[] = []
      window.lintrk = Object.assign((...a: unknown[]) => void coda.push(a), { q: coda })
    }
    script('https://snap.licdn.com/li.lms-analytics/insight.min.js', 'linkedin-js')
  }

  // Script del pannello (Fornitori e script): type="text/plain" → clonati come JavaScript.
  document.querySelectorAll<HTMLScriptElement>('script[type="text/plain"][data-cmp-category]').forEach((vecchio) => {
    if (!k[vecchio.dataset.cmpCategory as Cat]) return
    const nuovo = document.createElement('script')
    for (const a of [...vecchio.attributes]) if (a.name !== 'type') nuovo.setAttribute(a.name, a.value)
    nuovo.type = 'text/javascript'
    if (!vecchio.src) nuovo.textContent = vecchio.textContent
    vecchio.replaceWith(nuovo)
  })

  // Video e mappe: l'iframe nasce solo adesso.
  document.querySelectorAll<HTMLElement>('[data-cmp-embed]').forEach((box) => {
    if (!k[box.dataset.cmpCategory as Cat] || box.querySelector('iframe')) return
    const f = document.createElement('iframe')
    f.src = box.dataset.cmpSrc || ''
    f.title = box.dataset.cmpTitolo || ''
    f.loading = 'lazy'
    f.allow = 'accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen'
    f.referrerPolicy = 'strict-origin-when-cross-origin'
    f.allowFullscreen = true
    box.replaceChildren(f)
    box.classList.add('incorporato--attivo')
  })
}

/* --------------------------------------------------------------- decisioni */

function categorie(scelta: Partial<Record<Cat, boolean>>): Categorie {
  return { necessary: true, preferences: Boolean(scelta.preferences), analytics: Boolean(scelta.analytics), marketing: Boolean(scelta.marketing) }
}

function decidi(k: Categorie, azione: Azione) {
  if (!config) return
  const prima = leggi()
  const tolte = prima ? CATEGORIE.filter((c) => prima.categories[c] && !k[c]) : []
  const s: Stato = { consent_id: prima?.consent_id || uuid(), timestamp: new Date().toISOString(), policy_version: config.v, categories: k }
  scrivi(s)
  window.__cmpStato = s
  registra(s, tolte.length && azione !== 'close_x' ? 'revoke' : azione)
  aggiornaGoogle(k)
  window.dataLayer.push({ event: 'cmp_consent_updated', cmp_categories: ['necessary', ...CATEGORIE.filter((c) => k[c])] })
  nascondi()
  if (tolte.length) {
    // Revoca: via i cookie della categoria e pagina ricaricata, così nulla resta in esecuzione.
    cancellaCookie(tolte.flatMap((c) => DA_CANCELLARE[c]))
    setTimeout(() => location.reload(), 150)
  } else applica(k)
}

/* --------------------------------------------------------------------- UI */

function nascondi() {
  if (banner) banner.hidden = true
  if (pannello?.open) pannello.close()
}

function caselle(k: Categorie | null) {
  pannello?.querySelectorAll<HTMLInputElement>('[data-cmp-cat]').forEach((i) => {
    const c = i.dataset.cmpCat as Cat | 'necessary'
    i.checked = c === 'necessary' ? true : Boolean(k?.[c])
  })
}

function apri() {
  if (!pannello) return
  caselle(leggi()?.categories || null)
  if (!pannello.open) pannello.showModal()
}

function sceltaPannello(): Categorie {
  const v: Partial<Record<Cat, boolean>> = {}
  pannello?.querySelectorAll<HTMLInputElement>('[data-cmp-cat]').forEach((i) => {
    const c = i.dataset.cmpCat as Cat | 'necessary'
    if (c !== 'necessary') v[c] = i.checked
  })
  return categorie(v)
}

const TUTTE = categorie({ preferences: true, analytics: true, marketing: true })
const NESSUNA = categorie({})

if (config) {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cmp], [data-cmp-sblocca], [data-cookie-preferenze], [data-cmp-apri]')
    if (!el) return
    if (el.matches('[data-cookie-preferenze], [data-cmp-apri]')) {
      e.preventDefault()
      apri()
      return
    }
    if (el.dataset.cmpSblocca) {
      const c = el.dataset.cmpSblocca as Cat
      decidi(categorie({ ...(leggi()?.categories || {}), [c]: true }), 'custom')
      return
    }
    switch (el.dataset.cmp) {
      case 'accetta':
        decidi(TUTTE, 'accept_all')
        break
      case 'rifiuta':
        decidi(NESSUNA, 'reject_all')
        break
      case 'chiudi':
        decidi(NESSUNA, 'close_x')
        break
      case 'personalizza':
        apri()
        break
      case 'salva':
        decidi(sceltaPannello(), 'custom')
        break
      case 'chiudi-pannello':
        pannello?.close()
        break
    }
  })
  // Esc sul banner = «X»: si continua senza accettare.
  banner?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') decidi(NESSUNA, 'close_x')
  })

  window.serralungaCmp = { apri, stato: leggi }
  const s = leggi()
  if (s) {
    window.dataLayer.push({ event: 'cmp_consent_updated', cmp_categories: ['necessary', ...CATEGORIE.filter((c) => s.categories[c])] })
    applica(s.categories)
  } else {
    if (config.googleAvanzata) applica(NESSUNA)
    if (config.mostra && banner) banner.hidden = false
  }
}

/* Conversione: modulo inviato con successo (vedi site.ts). */
window.addEventListener('serralunga:lead', (e) => {
  const tipo = (e as CustomEvent<{ tipo?: string }>).detail?.tipo || 'richiesta'
  window.dataLayer.push({ event: 'generate_lead', modulo: tipo })
  const s = leggi()
  const c = config?.codici
  if (!c || !s) return
  if (s.categories.analytics && c.ga4) gtag('event', 'generate_lead', { form: tipo })
  if (s.categories.marketing && c.ads && c.adsConversione) gtag('event', 'conversion', { send_to: `${c.ads}/${c.adsConversione}` })
  if (s.categories.marketing && c.meta) window.fbq?.('track', tipo === 'newsletter' ? 'CompleteRegistration' : 'Lead')
})

export {}
