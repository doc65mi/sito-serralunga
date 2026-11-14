/**
 * Lettura dei contenuti da Payload (API REST).
 * CMS_INTERNAL_URL: indirizzo con cui il server Astro raggiunge Payload (in Docker: http://cms:3000).
 * CMS_PUBLIC_URL: indirizzo pubblico di Payload, usato per le immagini nel browser.
 */
export const env = (k: string, d = '') => process.env[k] || (import.meta.env as Record<string, string>)[k] || d

export const CMS_INTERNAL = env('CMS_INTERNAL_URL', 'http://localhost:3000').replace(/\/$/, '')
export const CMS_PUBLIC = env('CMS_PUBLIC_URL', 'http://localhost:3000').replace(/\/$/, '')
import type { Lingua } from './lingua'

export type Doc = Record<string, any>

async function get(path: string, params: Record<string, string | number> = {}, lingua: Lingua = 'it'): Promise<any> {
  // fallback-locale: un campo inglese vuoto mostra il testo italiano.
  const qs = new URLSearchParams({ locale: lingua, 'fallback-locale': 'it', ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])) })
  const res = await fetch(`${CMS_INTERNAL}/api/${path}?${qs}`, { headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`CMS ${path}: HTTP ${res.status}`)
  return res.json()
}

export const globale = (slug: string, depth = 2, lingua: Lingua = 'it'): Promise<Doc> =>
  get(`globals/${slug}`, { depth }, lingua)

export async function perSlug(collection: string, slug: string, depth = 2, lingua: Lingua = 'it'): Promise<Doc | null> {
  const r = await get(collection, { 'where[slug][equals]': slug, depth, limit: 1 }, lingua)
  return r.docs?.[0] ?? null
}

export async function elenco(
  collection: string,
  params: Record<string, string | number> = {},
  lingua: Lingua = 'it',
): Promise<Doc[]> {
  const r = await get(collection, { depth: 1, limit: 100, sort: 'ordine', ...params }, lingua)
  return r.docs ?? []
}

/** Impostazioni lette una volta ogni 60 secondi (header e footer in ogni pagina). */
const cacheImpostazioni = new Map<Lingua, { t: number; v: Doc }>()
export async function impostazioni(lingua: Lingua = 'it'): Promise<Doc> {
  const c = cacheImpostazioni.get(lingua)
  if (c && Date.now() - c.t < 60_000) return c.v
  const v = await globale('impostazioni', 1, lingua)
  cacheImpostazioni.set(lingua, { t: Date.now(), v })
  return v
}

/** Indirizzo pubblico del sito, letto a runtime (Astro.site è fissato alla build e in Docker non coincide). */
export const SITO = env('SITO_URL', 'http://localhost:4321').replace(/\/$/, '')
