declare namespace App {
  interface Locals {
    /** Lingua della pagina, impostata da src/middleware.ts in base al prefisso /en/. */
    lingua: import('./lib/lingua').Lingua
  }
}
