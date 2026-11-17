import type { APIRoute } from 'astro'
import { aPayload, ipDi, stessoSito } from '../../../lib/moduli'

/**
 * Version: 1.00
 * POST /api/v1/consent-log — registro dei consensi ai cookie (specifica CMP §5).
 * Chiamato da scripts/consenso.ts (fetch keepalive) a ogni scelta. Controlla che arrivi dal sito
 * stesso, aggiunge l'IP (che Payload trasforma subito in impronta SHA-256 con sale giornaliero)
 * e passa a Payload (/api/moduli/consenso) con la chiave del sito.
 */
const risposta = (stato: number, corpo: Record<string, unknown>) =>
  new Response(JSON.stringify(corpo), { status: stato, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!stessoSito(request)) return risposta(403, { errore: 'Origine non consentita' })
  let testo = ''
  try {
    testo = await request.text()
  } catch {
    return risposta(400, { errore: 'Dati non validi' })
  }
  if (testo.length > 6000) return risposta(413, { errore: 'Troppo grande' })
  let d: Record<string, unknown>
  try {
    d = JSON.parse(testo)
  } catch {
    return risposta(400, { errore: 'Dati non validi' })
  }
  if (!d || typeof d !== 'object' || Array.isArray(d)) return risposta(400, { errore: 'Dati non validi' })
  try {
    const { stato, dati } = await aPayload('consenso', {
      consent_id: d.consent_id,
      policy_version: d.policy_version,
      categories: d.categories,
      action_type: d.action_type,
      source_url: d.source_url,
      lingua: d.lingua,
      user_agent: request.headers.get('user-agent') || d.user_agent,
      ip: ipDi(request, clientAddress),
    })
    return risposta(stato, dati)
  } catch (err) {
    console.error('Registro consensi non raggiungibile', err)
    return risposta(502, { errore: 'Registro non raggiungibile' })
  }
}
