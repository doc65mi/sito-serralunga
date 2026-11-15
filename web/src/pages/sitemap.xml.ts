import type { APIRoute } from 'astro'
import { elenco, SITO } from '../lib/cms'
import { INFO, LINGUE, percorso } from '../lib/lingua'

/** Sitemap con tutte le lingue: ogni indirizzo dichiara le versioni alternative (hreflang). */
export const GET: APIRoute = async () => {
  const base = SITO
  const [prodotti, casi, designer, spunti] = await Promise.all([
    elenco('prodotti', { depth: 0, 'where[schedaPubblicata][equals]': 'true' }),
    elenco('case-history', { depth: 0 }),
    elenco('designer', { depth: 0, 'where[schedaPubblicata][equals]': 'true' }),
    elenco('spunti', { depth: 0 }),
  ])
  const alternative = (path: string) =>
    LINGUE.map((l) => `<xhtml:link rel="alternate" hreflang="${INFO[l].html}" href="${base}${percorso(l, path)}"/>`).join('')
  const url = (path: string, data?: string) =>
    LINGUE.map(
      (l) =>
        `<url><loc>${base}${percorso(l, path)}</loc>${data ? `<lastmod>${data.slice(0, 10)}</lastmod>` : ''}${alternative(path)}</url>`,
    ).join('')
  const voci = [
    url('/'),
    url('/designer/'),
    url('/installazioni/'),
    url('/spunti-e-idee/'),
    ...prodotti.map((p) => url(`/prodotti/${p.slug}/`, p.updatedAt)),
    ...casi.map((c) => url(`/case-history/${c.slug}/`, c.updatedAt)),
    ...designer.map((d) => url(`/designer/${d.slug}/`, d.updatedAt)),
    ...spunti.map((x) => url(`/spunti-e-idee/${x.slug}/`, x.updatedAt)),
  ]
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${voci.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  )
}
