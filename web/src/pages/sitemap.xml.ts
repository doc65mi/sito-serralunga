import type { APIRoute } from 'astro'
import { elenco, SITO } from '../lib/cms'
import { INFO, LINGUE, percorso } from '../lib/lingua'
import { isMedia, originale } from '../lib/media'

/** Sitemap con tutte le lingue: ogni indirizzo dichiara le versioni alternative (hreflang). */
export const GET: APIRoute = async () => {
  const base = SITO
  const [prodotti, casi, designer, spunti, articoli] = await Promise.all([
    elenco('prodotti', { depth: 1, 'where[schedaPubblicata][equals]': 'true' }),
    elenco('case-history', { depth: 1 }),
    elenco('designer', { depth: 1, 'where[schedaPubblicata][equals]': 'true' }),
    elenco('spunti', { depth: 1 }),
    elenco('articoli', { depth: 1, sort: '-data', limit: 500 }).catch(() => []),
  ])
  const alternative = (path: string) =>
    LINGUE.map((l) => `<xhtml:link rel="alternate" hreflang="${INFO[l].html}" href="${base}${percorso(l, path)}"/>`).join('')
  const xml = (v: string) => v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  // Foto principale della pagina: aiuta la ricerca per immagini.
  const foto = (m?: unknown) => (isMedia(m) ? `<image:image><image:loc>${xml(originale(m).replace(/^\//, `${base}/`))}</image:loc></image:image>` : '')
  const url = (path: string, data?: string, immagine?: unknown) =>
    LINGUE.map(
      (l) =>
        `<url><loc>${base}${percorso(l, path)}</loc>${data ? `<lastmod>${data.slice(0, 10)}</lastmod>` : ''}${alternative(path)}${foto(immagine)}</url>`,
    ).join('')
  const voci = [
    url('/'),
    url('/designer/'),
    url('/installazioni/'),
    url('/spunti-e-idee/'),
    url('/journal/'),
    ...prodotti.map((p) => url(`/prodotti/${p.slug}/`, p.updatedAt, p.immagine)),
    ...casi.map((c) => url(`/case-history/${c.slug}/`, c.updatedAt, c.immagine)),
    ...designer.map((d) => url(`/designer/${d.slug}/`, d.updatedAt, d.ritratto)),
    ...spunti.map((x) => url(`/spunti-e-idee/${x.slug}/`, x.updatedAt, x.immagine)),
    ...articoli.map((x) => url(`/journal/${x.slug}/`, x.updatedAt, x.immagine)),
  ]
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">${voci.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  )
}
