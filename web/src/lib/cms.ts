/**
 * Lettura dei contenuti da Payload (API REST).
 * CMS_INTERNAL_URL: indirizzo con cui il server Astro raggiunge Payload (in Docker: http://cms:3000).
 * CMS_PUBLIC_URL: indirizzo pubblico di Payload, usato per le immagini nel browser.
 */
export const env = (k: string, d = '') => process.env[k] || (import.meta.env as Record<string, string>)[k] || d

export const CMS_INTERNAL = env('CMS_INTERNAL_URL', 'http://localhost:3000').replace(/\/$/, '')
export const CMS_PUBLIC = env('CMS_PUBLIC_URL', 'http://localhost:3000').replace(/\/$/, '')
const LOCALE = 'it'

export type Doc = Record<string, any>

async function get(path: string, params: Record<string, string | number> = {}): Promise<any> {
  const qs = new URLSearchParams({ locale: LOCALE, ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) })
  const res = await fetch(`${CMS_INTERNAL}/api/${path}?${qs}`, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`CMS ${path}: HTTP ${res.status}`)
  return res.json()
}

export const globale = (slug: string, depth = 2): Promise<Doc> => get(`globals/${slug}`, { depth })

export async function perSlug(collection: string, slug: string, depth = 2): Promise<Doc | null> {
  const r = await get(collection, { 'where[slug][equals]': slug, depth, limit: 1 })
  return r.docs?.[0] ?? null
}

export async function elenco(collection: string, params: Record<string, string | number> = {}): Promise<Doc[]> {
  const r = await get(collection, { depth: 1, limit: 100, sort: 'ordine', ...params })
  return r.docs ?? []
}

/** Impostazioni lette una volta ogni 60 secondi (header e footer in ogni pagina). */
let cacheImpostazioni: { t: number; v: Doc } | null = null
export async function impostazioni(): Promise<Doc> {
  if (cacheImpostazioni && Date.now() - cacheImpostazioni.t < 60_000) return cacheImpostazioni.v
  const v = await globale('impostazioni', 1)
  cacheImpostazioni = { t: Date.now(), v }
  return v
}
