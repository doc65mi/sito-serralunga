declare namespace App {
  interface Locals {
    /** Lingua della pagina, impostata da src/middleware.ts in base al prefisso /en/. */
    lingua: import('./lib/lingua').Lingua
    /** Foto in più e lightbox degli spazi del documento mostrato (vedi Base.astro e Img.astro). */
    spazi?: Record<string, import('./lib/cms').Spazio>
  }
}
