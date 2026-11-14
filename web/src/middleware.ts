import { defineMiddleware } from 'astro:middleware'

/**
 * Lingue del sito: italiano senza prefisso (/designer/), inglese con /en/ (/en/designer/).
 * Le pagine sono le stesse: qui si sceglie la lingua e si riscrive /en/x in /x.
 * La lingua resta impostata anche quando una pagina riscrive verso /404.
 */
export const onRequest = defineMiddleware((ctx, next) => {
  const p = ctx.url.pathname
  if (p === '/en') return ctx.redirect('/en/', 301)
  if (p.startsWith('/en/')) {
    ctx.locals.lingua = 'en'
    return next(p.slice(3) + ctx.url.search)
  }
  if (!ctx.locals.lingua) ctx.locals.lingua = 'it'
  return next()
})
