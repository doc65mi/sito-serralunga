import { CMS_PUBLIC } from './cms'

export type Media = {
  id?: number
  url?: string
  filename?: string
  alt?: string
  width?: number
  height?: number
  mimeType?: string
  focalX?: number
  focalY?: number
  sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }>
}

const pubblico = (u?: string | null) => {
  if (!u) return ''
  // Foto statiche del sito (web/public/prodotti-foto), non del CMS.
  if (u.startsWith('/prodotti-foto/')) return u
  try {
    const p = new URL(u, 'http://x')
    return `${CMS_PUBLIC}${p.pathname}${p.search}`
  } catch {
    return u
  }
}

export const isMedia = (m: unknown): m is Media => !!m && typeof m === 'object' && 'url' in (m as object)

export function srcset(m: Media) {
  const voci = Object.values(m.sizes || {})
    .filter((s) => s?.url && s.width)
    .sort((a, b) => (a.width || 0) - (b.width || 0))
    .map((s) => `${pubblico(s.url)} ${s.width}w`)
  // Una foto più stretta della taglia richiesta non viene ingrandita: le taglie uguali si contano una volta.
  return [...new Set(voci)].join(', ')
}

/** URL della versione più adatta alla larghezza richiesta. */
export function src(m: Media, larghezza = 1800): string {
  const sizes = Object.values(m.sizes || {}).filter((s) => s?.url && s.width) as { url: string; width: number }[]
  const adatta = sizes.sort((a, b) => a.width - b.width).find((s) => s.width >= larghezza)
  return pubblico(adatta?.url || m.url)
}

/** File caricato (WebP, JPEG o PNG): riserva per i browser senza AVIF e immagine per la condivisione. */
export const originale = (m: Media) => pubblico(m.url)

/** Tipo delle versioni ridotte: 'image/avif' dopo la rigenerazione, altrimenti quello vecchio. */
export function tipoRidotte(m: Media): string | undefined {
  const prima = Object.values(m.sizes || {}).find((s) => s?.url)
  const est = prima?.url?.split('?')[0].split('.').pop()?.toLowerCase()
  return est === 'avif' ? 'image/avif' : est === 'webp' ? 'image/webp' : undefined
}

export const urlFile = (m?: Media | null) => (m?.url ? pubblico(m.url) : '')

export const fuoco = (m: Media) =>
  m.focalX != null && m.focalY != null && (m.focalX !== 50 || m.focalY !== 50) ? `${m.focalX}% ${m.focalY}%` : undefined
