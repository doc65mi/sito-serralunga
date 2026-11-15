import type { APIRoute } from 'astro'
import { env, SITO } from '../lib/cms'

/**
 * Version: 1.01
 * Motori di ricerca e assistenti (ricerca e risposte AI) possono leggere tutto il sito;
 * pannello e API restano fuori. BLOCCA_INDICIZZAZIONE=1 chiude tutto finché il sito è in prova.
 */
const ASSISTENTI = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot']

export const GET: APIRoute = () => {
  const blocca = env('BLOCCA_INDICIZZAZIONE') === '1'
  const regole = blocca ? 'Disallow: /' : 'Allow: /\nDisallow: /admin\nDisallow: /api/\nAllow: /api/media/file/'
  const corpo = [
    `User-agent: *\n${regole}`,
    ...(blocca ? [] : [`${ASSISTENTI.map((a) => `User-agent: ${a}`).join('\n')}\n${regole}`]),
    `Sitemap: ${SITO}/sitemap.xml`,
  ].join('\n\n')
  return new Response(`${corpo}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } })
}
