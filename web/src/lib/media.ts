import { CMS_PUBLIC } from './cms'

export type Media = {
  url?: string
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
  if (m.width && m.mimeType !== 'image/webp') voci.push(`${pubblico(m.url)} ${m.width}w`)
  return voci.join(', ')
}

/** URL della versione più adatta alla larghezza richiesta. */
export function src(m: Media, larghezza = 1800): string {
  const sizes = Object.values(m.sizes || {}).filter((s) => s?.url && s.width) as { url: string; width: number }[]
  const adatta = sizes.sort((a, b) => a.width - b.width).find((s) => s.width >= larghezza)
  return pubblico(adatta?.url || m.url)
}

export const urlFile = (m?: Media | null) => (m?.url ? pubblico(m.url) : '')

export const fuoco = (m: Media) =>
  m.focalX != null && m.focalY != null && (m.focalX !== 50 || m.focalY !== 50) ? `${m.focalX}% ${m.focalY}%` : undefined
