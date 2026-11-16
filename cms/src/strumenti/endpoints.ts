/**
 * Version: 1.00
 * Strumenti del pannello: aggiornano i contenuti senza aprire il terminale.
 * - POST /api/strumenti/avvia  { compito: 'aggiorna' | 'catalogo', applica?: boolean }  avvia il compito in background;
 *   senza applica aggiunge solo ciò che manca, con applica modifica anche i contenuti esistenti
 *   indicati in <compito>.proposte.json, dopo averne salvato una copia (seed/prudenza.ts)
 * - GET  /api/strumenti/stato  stato e ultime righe del registro di ogni compito
 * Solo per chi ha fatto l'accesso alla redazione. I compiti girano con compito.sh,
 * uno alla volta, e continuano anche se si chiude il pannello.
 */
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

import type { Endpoint } from 'payload'

const COMPITI = ['aggiorna', 'catalogo'] as const
type Compito = (typeof COMPITI)[number]

const json = (dati: unknown, status = 200) => Response.json(dati, { status, headers: { 'cache-control': 'no-store' } })
const cartella = () => path.join(process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media'), '.compiti')
const leggi = (nome: string) => {
  try {
    return fs.readFileSync(path.join(cartella(), nome), 'utf8')
  } catch {
    return ''
  }
}

/** Ultime righe del registro, senza i codici colore del logger. */
function coda(testo: string, righe = 40) {
  // eslint-disable-next-line no-control-regex
  return testo.replace(/\u001b\[[0-9;]*m/g, '').split('\n').filter(Boolean).slice(-righe).join('\n')
}

function stato(c: Compito) {
  const [valore, quando = ''] = leggi(`${c}.stato`).trim().split(/\s+/)
  if (!valore) return { compito: c, stato: 'mai', quando: '', inAttesa: false, registro: '', proposte: [] }
  const inAttesa = valore === 'in-corso' && !coda(leggi(`${c}.log`), 1)
  let proposte: unknown[] = []
  try {
    proposte = JSON.parse(leggi(`${c}.proposte.json`) || '[]')
  } catch {
    /* file in scrittura: al prossimo giro */
  }
  return { compito: c, stato: valore, quando, inAttesa, registro: coda(leggi(`${c}.log`)), proposte }
}

const statoEndpoint: Endpoint = {
  path: '/strumenti/stato',
  method: 'get',
  handler: async (req) => {
    if (!req.user) return json({ errore: 'Serve l’accesso alla redazione.' }, 401)
    return json({ compiti: COMPITI.map(stato), occupato: fs.existsSync(path.join(cartella(), 'lucchetto')) })
  },
}

const avvia: Endpoint = {
  path: '/strumenti/avvia',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return json({ errore: 'Serve l’accesso alla redazione.' }, 401)
    let compito = ''
    let applica = false
    try {
      const b = (await (req as unknown as Request).json()) as { compito?: string; applica?: boolean }
      compito = String(b.compito || '')
      applica = b.applica === true
    } catch {
      /* corpo non valido */
    }
    if (!COMPITI.includes(compito as Compito)) return json({ errore: 'Compito sconosciuto.' }, 400)
    if (stato(compito as Compito).stato === 'in-corso') return json({ errore: 'Questo compito è già in corso.' }, 409)

    fs.mkdirSync(cartella(), { recursive: true })
    // Stato subito visibile: compito.sh lo riscrive quando parte davvero (dopo un eventuale altro compito).
    fs.writeFileSync(path.join(cartella(), `${compito}.stato`), `in-corso ${new Date().toISOString()}\n`)
    fs.writeFileSync(path.join(cartella(), `${compito}.log`), '')
    const figlio = spawn('sh', [path.resolve(process.cwd(), 'compito.sh'), compito], {
      cwd: process.cwd(),
      env: { ...process.env, SEED_APPLICA: applica ? '1' : '0' },
      detached: true,
      stdio: 'ignore',
    })
    figlio.unref()
    req.payload.logger.info(`[strumenti] ${compito}${applica ? ' (applica modifiche)' : ''} avviato da ${req.user.email}`)
    return json({ ok: true })
  },
}

export const endpointStrumenti: Endpoint[] = [statoEndpoint, avvia]
