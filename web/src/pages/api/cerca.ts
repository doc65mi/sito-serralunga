/**
 * Ricerca per l'anteprima mentre si scrive (Version: 1.00).
 * GET /api/cerca?q=vaso&l=it[&ambito=catalogo][&limite=12]
 * Risponde JSON con i risultati in ordine di rilevanza; senza q restituisce le scorciatoie (categorie).
 * Solo lettura di contenuti pubblicati: nessun dato personale, nessun HTML nella risposta.
 */
import type { APIRoute } from 'astro'
import { lingua } from '../../lib/lingua'
import { AMBITO_CATALOGO, cerca, scorciatoie } from '../../lib/ricerca'

export const GET: APIRoute = async ({ url }) => {
  const L = lingua(url.searchParams.get('l'))
  const q = (url.searchParams.get('q') || '').slice(0, 80)
  const tipi = url.searchParams.get('ambito') === 'catalogo' ? AMBITO_CATALOGO : undefined
  const limite = Number(url.searchParams.get('limite')) || 12
  const intestazioni = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=60',
    'X-Robots-Tag': 'noindex',
  }
  try {
    const corpo = q.trim() ? await cerca(q, L, { tipi, limite: Math.min(limite, 30) }) : { q: '', totale: 0, risultati: [], scorciatoie: await scorciatoie(L) }
    return new Response(JSON.stringify(corpo), { headers: intestazioni })
  } catch (e) {
    console.error('[ricerca]', e)
    return new Response(JSON.stringify({ q, totale: 0, risultati: [], errore: true }), { status: 503, headers: { ...intestazioni, 'Cache-Control': 'no-store' } })
  }
}
