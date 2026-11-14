// @ts-check
import { defineConfig } from 'astro/config'
import node from '@astrojs/node'

// Il sito è renderizzato a ogni richiesta (SSR): un testo salvato in Payload
// compare subito, senza ricostruire il sito.
export default defineConfig({
  site: process.env.SITO_URL || 'http://localhost:4321',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  trailingSlash: 'ignore',
  server: { host: true, port: 4321 },
  // Controllo dell'origine fatto in src/pages/api/richiesta.ts (indirizzo pubblico noto solo a runtime).
  security: { checkOrigin: false },
  devToolbar: { enabled: false },
})
