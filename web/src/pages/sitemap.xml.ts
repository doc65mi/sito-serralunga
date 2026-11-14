import type { APIRoute } from 'astro'
import { elenco } from '../lib/cms'

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.toString() || '').replace(/\/$/, '')
  const [prodotti, casi, designer] = await Promise.all([
    elenco('prodotti', { depth: 0, 'where[schedaPubblicata][equals]': 'true' }),
    elenco('case-history', { depth: 0 }),
    elenco('designer', { depth: 0, 'where[schedaPubblicata][equals]': 'true' }),
  ])
  const url = (path: string, data?: string) =>
    `<url><loc>${base}${path}</loc>${data ? `<lastmod>${data.slice(0, 10)}</lastmod>` : ''}</url>`
  const voci = [
    url('/'),
    url('/designer/'),
    ...prodotti.map((p) => url(`/prodotti/${p.slug}/`, p.updatedAt)),
    ...casi.map((c) => url(`/case-history/${c.slug}/`, c.updatedAt)),
    ...designer.map((d) => url(`/designer/${d.slug}/`, d.updatedAt)),
  ]
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${voci.join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  )
}
