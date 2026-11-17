import { defineMiddleware } from 'astro:middleware'
import { regolaPer } from './lib/indicizzazione'

/**
 * Lingue del sito: italiano senza prefisso (/designer/), inglese con /en/ (/en/designer/).
 * Le pagine sono le stesse: qui si sceglie la lingua e si riscrive /en/x in /x.
 * La lingua resta impostata anche quando una pagina riscrive verso /404.
 *
 * Indicizzazione 1.00: le pagine fuori dai motori (area riservata, Account, indirizzi e contenuti
 * scelti nel pannello, sito in prova) ricevono anche l'intestazione X-Robots-Tag, che vale pure
 * per i motori che non leggono il meta robots. Le pagine riservate non si conservano nelle cache condivise.
 */
export const onRequest = defineMiddleware(async (ctx, next) => {
  const p = ctx.url.pathname
  if (p === '/en') return ctx.redirect('/en/', 301)
  let risposta: Response
  if (p.startsWith('/en/')) {
    ctx.locals.lingua = 'en'
    risposta = await next(p.slice(3) + ctx.url.search)
  } else {
    if (!ctx.locals.lingua) ctx.locals.lingua = 'it'
    risposta = await next()
  }
  if (!(risposta.headers.get('content-type') || '').includes('text/html')) return risposta
  try {
    const r = await regolaPer(p)
    if (r.noindex && !risposta.headers.has('X-Robots-Tag')) risposta.headers.set('X-Robots-Tag', 'noindex, follow')
    if (r.riservata) risposta.headers.set('Cache-Control', 'private, no-store')
  } catch {
    // Intestazioni non modificabili (es. reindirizzamenti): resta il meta robots della pagina.
  }
  return risposta
})
