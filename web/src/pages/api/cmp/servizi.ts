import type { APIRoute } from 'astro'
import { CMS_INTERNAL, type Doc } from '../../../lib/cms'
import { configCmp, ORIGINE, privacyCookies } from '../../../lib/cmp'

/**
 * Version: 1.00
 * GET /api/cmp/servizi — servizi rilevati dalla CMP, letti adesso (senza cache) da
 * Impostazioni del sito > Sicurezza e tracciamento e da Impostazioni > Privacy e cookies.
 * È lo stesso elenco che compare nel banner e nella Cookie Policy: lo mostra il pannello
 * (riquadro «Servizi rilevati» in Privacy e cookies). Contiene solo dati già pubblici
 * nelle pagine del sito (identificativi dei tag, fornitori, cookie): nessuna chiave segreta.
 */
export const GET: APIRoute = async () => {
  let imp: Doc = {}
  try {
    const r = await fetch(`${CMS_INTERNAL}/api/globals/impostazioni?locale=it&depth=0`, { headers: { Accept: 'application/json' } })
    imp = r.ok ? await r.json() : {}
  } catch {
    imp = {}
  }
  const cmp = configCmp(imp, await privacyCookies('it', true), 'it')
  const corpo = {
    versione: cmp.versione,
    giorni: cmp.giorni,
    mostraBanner: cmp.mostraBanner,
    googleAvanzata: cmp.googleAvanzata,
    privacyLink: cmp.privacyLink,
    cookieLink: cmp.cookieLink,
    categorie: cmp.categorie,
    fornitori: cmp.fornitori.map((f) => ({
      id: f.id,
      nome: f.nome,
      societa: f.societa,
      categoria: f.categoria,
      origine: ORIGINE[f.id]?.campo || 'Privacy e cookies › Altri fornitori',
      codice: ORIGINE[f.id]?.codice ? cmp.codici[ORIGINE[f.id].codice!] : '',
      cookie: f.cookie.map((k) => `${k.nome} (${k.durata.it})`),
    })),
    script: cmp.script.map((s) => ({ nome: s.nome, categoria: s.categoria })),
  }
  return new Response(JSON.stringify(corpo), { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } })
}
