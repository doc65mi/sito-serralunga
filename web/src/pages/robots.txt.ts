import type { APIRoute } from 'astro'
import { env, SITO } from '../lib/cms'

export const GET: APIRoute = () => {
  const base = SITO
  // Finché il sito è in prova si può bloccare l'indicizzazione con BLOCCA_INDICIZZAZIONE=1
  const blocca = env('BLOCCA_INDICIZZAZIONE') === '1'
  return new Response(`User-agent: *\n${blocca ? 'Disallow: /' : 'Allow: /'}\n\nSitemap: ${base}/sitemap.xml\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
