/**
 * Version: 1.01
 * Strumenti del pannello: aggiornano i contenuti senza aprire il terminale.
 * - POST /api/strumenti/avvia  { compito, applica?, daCapo? }  avvia il compito in background.
 *   Senza applica aggiunge solo ciò che manca; con applica modifica anche i contenuti esistenti
 *   indicati in <compito>.proposte.json, dopo averne salvato una copia (seed/prudenza.ts).
 *   Se un'esecuzione precedente si è interrotta riparte dal punto salvato (seed/punto.ts),
 *   a meno di daCapo.
 * - POST /api/strumenti/ferma  { compito }  interrompe il compito; il punto raggiunto resta.
 * - GET  /api/strumenti/stato  stato, punto di ripresa, proposte e registro di ogni compito.
 * Solo per chi ha fatto l'accesso alla redazione. I compiti girano con compito.sh,
 * uno alla volta, e continuano anche se si chiude il pannello.
 */
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

import type { Endpoint, PayloadRequest } from 'payload'

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
const righe = (nome: string) => leggi(nome).split('\n').filter(Boolean).length

/** Ultime righe del registro, senza i codici colore del logger. */
function coda(testo: string, n = 40) {
  // eslint-disable-next-line no-control-regex
  return testo.replace(/\u001b\[[0-9;]*m/g, '').split('\n').filter(Boolean).slice(-n).join('\n')
}

function stato(c: Compito) {
  const [valore, quando = ''] = leggi(`${c}.stato`).trim().split(/\s+/)
  let proposte: unknown[] = []
  try {
    proposte = JSON.parse(leggi(`${c}.proposte.json`) || '[]')
  } catch {
    /* file in scrittura: al prossimo giro */
  }
  const registro = coda(leggi(`${c}.log`))
  return {
    compito: c,
    stato: valore || 'mai',
    quando,
    inAttesa: valore === 'in-corso' && !registro,
    fermando: fs.existsSync(path.join(cartella(), `${c}.ferma`)),
    // Passaggi già completati di un'esecuzione interrotta: «Riprendi» li salta.
    punto: { prudente: righe(`${c}.prudente.punto`), applica: righe(`${c}.applica.punto`) },
    registro,
    proposte,
  }
}

async function corpo(req: PayloadRequest) {
  try {
    return (await (req as unknown as Request).json()) as { compito?: string; applica?: boolean; daCapo?: boolean }
  } catch {
    return {}
  }
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
    const b = await corpo(req)
    const compito = String(b.compito || '')
    const applica = b.applica === true
    if (!COMPITI.includes(compito as Compito)) return json({ errore: 'Compito sconosciuto.' }, 400)
    if (stato(compito as Compito).stato === 'in-corso') return json({ errore: 'Questo compito è già in corso.' }, 409)

    fs.mkdirSync(cartella(), { recursive: true })
    fs.rmSync(path.join(cartella(), `${compito}.ferma`), { force: true })
    // Stato subito visibile: compito.sh lo riscrive quando parte davvero (dopo un eventuale altro compito).
    fs.writeFileSync(path.join(cartella(), `${compito}.stato`), `in-corso ${new Date().toISOString()}\n`)
    fs.writeFileSync(path.join(cartella(), `${compito}.log`), '')
    const figlio = spawn('sh', [path.resolve(process.cwd(), 'compito.sh'), compito], {
      cwd: process.cwd(),
      env: { ...process.env, SEED_APPLICA: applica ? '1' : '0', SEED_DA_CAPO: b.daCapo ? '1' : '0' },
      detached: true,
      stdio: 'ignore',
    })
    figlio.unref()
    req.payload.logger.info(`[strumenti] ${compito}${applica ? ' (applica modifiche)' : ''}${b.daCapo ? ' da capo' : ''} avviato da ${req.user.email}`)
    return json({ ok: true })
  },
}

const ferma: Endpoint = {
  path: '/strumenti/ferma',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return json({ errore: 'Serve l’accesso alla redazione.' }, 401)
    const compito = String((await corpo(req)).compito || '')
    if (!COMPITI.includes(compito as Compito)) return json({ errore: 'Compito sconosciuto.' }, 400)
    if (stato(compito as Compito).stato !== 'in-corso') return json({ errore: 'Il compito non è in corso.' }, 409)
    fs.writeFileSync(path.join(cartella(), `${compito}.ferma`), new Date().toISOString())
    const pid = Number(leggi(`${compito}.pid`).trim())
    if (pid > 1) {
      try {
        // Tutto il gruppo (npm e il processo del seed): il punto raggiunto è già sul disco.
        process.kill(-pid, 'SIGTERM')
      } catch {
        /* già terminato */
      }
    }
    // Se era ancora in coda, compito.sh vede il file .ferma e si ferma da solo.
    req.payload.logger.info(`[strumenti] ${compito} interrotto da ${req.user.email}`)
    return json({ ok: true })
  },
}

export const endpointStrumenti: Endpoint[] = [statoEndpoint, avvia, ferma]
