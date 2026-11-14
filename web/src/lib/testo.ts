/**
 * Convenzione dei testi scritti nel CMS (file-md/editing.md):
 * - a capo → <br>
 * - _parola_ → <em class="acc">parola</em> (corsivo color oro)
 */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function fmt(s?: string | null): string {
  if (!s) return ''
  return esc(s.trim())
    .replace(/_([^_\n]+)_/g, '<em class="acc">$1</em>')
    .replace(/\r?\n/g, '<br />')
}

/** Testo semplice (title, alt, JSON-LD): toglie la marcatura. */
export const piatto = (s?: string | null) => (s || '').replace(/_([^_\n]+)_/g, '$1').replace(/\s*\r?\n\s*/g, ' ').trim()

/** true se il colore è chiaro (serve il bordo sul pallino). */
export function chiaro(hex: string): boolean {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return 0.299 * r + 0.587 * g + 0.114 * b > 215
}

/** Link del CMS: "#invito" resta ancora, "/x" percorso, "https://" esterno. */
export const href = (l?: string | null) => l || '#'
export const esterno = (l?: string | null) => !!l && /^https?:\/\//.test(l)
