import type { APIRoute } from 'astro'
import { SITO } from '../lib/cms'
import { disallow, inProva, regole } from '../lib/indicizzazione'

/**
 * Version: 1.02
 * Motori di ricerca e assistenti (ricerca e risposte AI) possono leggere il sito; pannello e API restano fuori.
 * 1.02 (Indicizzazione 1.00): in più gli indirizzi «bloccati» scelti nel pannello (Impostazioni > Indicizzazione
 * e SEO di ogni contenuto) e la scelta sugli assistenti AI. L'area riservata non si elenca: è noindex
 * (meta robots e X-Robots-Tag), e un motore deve poterla leggere per vederlo.
 * BLOCCA_INDICIZZAZIONE=1 chiude tutto finché il sito è in prova e prevale su ogni altra regola.
 */
/** Assistenti che leggono le pagine per rispondere e citare la fonte. */
const RISPOSTE = ['OAI-SearchBot', 'ChatGPT-User', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User']
/** Raccolta di testi per addestrare modelli. */
const ADDESTRAMENTO = ['GPTBot', 'ClaudeBot', 'CCBot', 'Google-Extended', 'Applebot-Extended']

export const GET: APIRoute = async () => {
  const intestazioni = { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=600' }
  if (inProva()) return new Response(`User-agent: *\nDisallow: /\n`, { headers: intestazioni })

  const r = await regole()
  const bloccati = new Set<string>([...r.bloccati])
  for (const [path, x] of r.pagine) if (x.motori === 'blocca' && !r.riservate.includes(path)) bloccati.add(path)
  const extra = [...bloccati].sort().flatMap(disallow)
  const regole_ = ['Allow: /', 'Disallow: /admin', 'Disallow: /api/', 'Allow: /api/media/file/', ...extra].join('\n')
  const gruppo = (agenti: string[], corpo: string) => `${agenti.map((a) => `User-agent: ${a}`).join('\n')}\n${corpo}`

  const gruppi = [gruppo(['*'], regole_)]
  if (r.assistenti === 'tutti') gruppi.push(gruppo([...ADDESTRAMENTO, ...RISPOSTE], regole_))
  if (r.assistenti === 'ricerca') gruppi.push(gruppo(RISPOSTE, regole_), gruppo(ADDESTRAMENTO, 'Disallow: /'))
  if (r.assistenti === 'nessuno') gruppi.push(gruppo([...ADDESTRAMENTO, ...RISPOSTE], 'Disallow: /'))

  return new Response(`${[...gruppi, `Sitemap: ${SITO}/sitemap.xml`].join('\n\n')}\n`, { headers: intestazioni })
}
