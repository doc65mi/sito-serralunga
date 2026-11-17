/**
 * Version: 1.00
 * POST /api/moduli/consenso — registro dei consensi ai cookie (specifica CMP §5).
 * Lo chiama il sito Astro (/api/v1/consent-log) con SITO_CHIAVE: il browser non scrive mai
 * direttamente nel database. Righe immutabili; IP solo come SHA-256 con sale giornaliero.
 */
import crypto from 'crypto'

import type { Endpoint, PayloadRequest } from 'payload'

import { uguali } from '../ai/segreto'

const json = (dati: unknown, status = 200) => Response.json(dati, { status, headers: { 'cache-control': 'no-store' } })
const AZIONI = ['accept_all', 'reject_all', 'close_x', 'custom', 'revoke']
const CATEGORIE = ['necessary', 'preferences', 'analytics', 'marketing']
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

const dalSito = (req: PayloadRequest) => {
  const chiave = process.env.SITO_CHIAVE || ''
  const arrivata = req.headers.get('x-sito-chiave') || ''
  return Boolean(chiave) && Boolean(arrivata) && uguali(arrivata, chiave)
}

/** Sale che cambia ogni giorno (UTC), derivato dal segreto del server: non si salva da nessuna parte. */
export function impronta(ip: string, giorno = new Date().toISOString().slice(0, 10)) {
  if (!ip) return ''
  const sale = crypto.createHmac('sha256', process.env.PAYLOAD_SECRET || 'serralunga').update(`consenso:${giorno}`).digest('hex')
  return crypto.createHash('sha256').update(`${sale}:${ip}`).digest('hex')
}

const conteggi = new Map<string, number[]>()
function troppe(chiave: string, massimo = 30, finestraMs = 10 * 60_000) {
  const ora = Date.now()
  const recenti = (conteggi.get(chiave) || []).filter((t) => ora - t < finestraMs)
  recenti.push(ora)
  conteggi.set(chiave, recenti)
  if (conteggi.size > 5000) conteggi.clear()
  return recenti.length > massimo
}

let ultimaPulizia = 0

export const endpointConsenso: Endpoint = {
  path: '/moduli/consenso',
  method: 'post',
  handler: async (req) => {
    if (!dalSito(req)) return json({ errore: 'Non autorizzato' }, 403)
    let d: Record<string, unknown> = {}
    try {
      const testo = await (req as unknown as Request).text()
      if (testo.length > 8000) return json({ errore: 'Troppo grande' }, 413)
      d = JSON.parse(testo || '{}')
    } catch {
      return json({ errore: 'Dati non validi' }, 400)
    }
    const uuid = str(d.consent_id, 36)
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)) return json({ errore: 'Identificativo non valido' }, 400)
    const azione = str(d.action_type, 20)
    if (!AZIONI.includes(azione)) return json({ errore: 'Azione non valida' }, 400)
    const ip = str(d.ip, 64)
    if (troppe(`${ip}|${uuid}`)) return json({ errore: 'Troppe richieste' }, 429)
    const ricevute = d.categories && typeof d.categories === 'object' ? (d.categories as Record<string, unknown>) : {}
    const stato = Object.fromEntries(CATEGORIE.map((k) => [k, k === 'necessary' ? true : ricevute[k] === true]))
    await req.payload.create({
      collection: 'registro-consensi',
      overrideAccess: true,
      data: {
        consentUuid: uuid.toLowerCase(),
        azione: azione as never,
        policyVersione: str(d.policy_version, 20),
        stato,
        fonteUrl: str(d.source_url, 500),
        lingua: str(d.lingua, 5),
        ipHash: impronta(ip),
        userAgent: str(d.user_agent, 400),
      },
    })
    // Conservazione (Impostazioni > Privacy e cookies): al massimo una pulizia all'ora.
    if (Date.now() - ultimaPulizia > 3600_000) {
      ultimaPulizia = Date.now()
      try {
        const pc = (await req.payload.findGlobal({ slug: 'privacy-cookies', depth: 0 })) as { conservaMesi?: number | null }
        const mesi = Number(pc.conservaMesi)
        if (mesi >= 6) {
          const limite = new Date()
          limite.setUTCMonth(limite.getUTCMonth() - mesi)
          await req.payload.delete({ collection: 'registro-consensi', overrideAccess: true, where: { createdAt: { less_than: limite.toISOString() } } })
        }
      } catch (err) {
        req.payload.logger.warn({ err }, 'Pulizia del registro consensi non riuscita')
      }
    }
    return json({ ok: true }, 201)
  },
}
