/**
 * Version: 1.00
 * Pubblica su Coolify: copia contenuti e foto dal sito sul PC al sito online con un clic.
 *
 * Perché: su GitHub viaggia solo il codice. Testi, menu, logo, blocchi della home, ritratti e
 * schede modificati dal pannello o dalla pagina stanno nel database e nella cartella media,
 * quindi senza questo strumento le due copie del sito si allontanano.
 *
 * Come funziona (il PC invia, Coolify riceve):
 * 1. Controllo: i due siti devono avere lo stesso schema del database (stesse migrazioni,
 *    cioè la stessa versione del codice). Se no si ferma e dice quale aggiornare.
 * 2. Foto: si confrontano nome e dimensione dei file; si inviano solo quelli che mancano o
 *    sono cambiati. La volta successiva passano solo le foto nuove.
 * 3. Contenuti: si inviano tutte le tabelle dei contenuti. Coolify salva prima una copia di
 *    quello che ha (media/.compiti/copie/), poi sostituisce tutto in una sola transazione:
 *    o riesce tutto o non cambia nulla. «Ripristina» rimette la copia.
 *
 * Restano di ciascun sito, mai copiati: utenti e accessi, preferenze del pannello,
 * richieste ricevute dai clienti (modulo catalogo), registro delle migrazioni.
 * Le chiavi API dell'AI viaggiano in chiaro solo dentro la connessione HTTPS e vengono
 * cifrate di nuovo con il PAYLOAD_SECRET del sito che le riceve.
 *
 * Sicurezza: il sito che riceve accetta solo richieste con la sua chiave di ricezione
 * (Authorization: Bearer), generata la prima volta che un redattore apre Strumenti.
 * Si può fissare anche con la variabile SINCRONIZZA_CHIAVE.
 */
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

import type { Endpoint, Payload, PayloadRequest } from 'payload'
import type { Pool, PoolClient } from 'pg'

import { cifra, decifra, uguali } from '../ai/segreto'

export const VERSIONE_SINCRONIZZA = '1.00'

/** Tabelle che restano di ciascun sito. Le tabelle dei blocchi bloccati si svuotano soltanto. */
const ESCLUSE = new Set([
  'users',
  'users_sessions',
  'payload_preferences',
  'payload_preferences_rels',
  'payload_locked_documents',
  'payload_locked_documents_rels',
  'payload_migrations',
  'payload_kv',
  'richieste',
])
const DA_SVUOTARE = ['payload_locked_documents_rels', 'payload_locked_documents']
const CIFRATO = 'c1:'

const json = (dati: unknown, status = 200) => Response.json(dati, { status, headers: { 'cache-control': 'no-store' } })
const mediaDir = () => process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media')
const cartella = () => path.join(mediaDir(), '.compiti')
const file = (nome: string) => path.join(cartella(), nome)
const ora = () => new Date().toISOString()
const q = (nome: string) => `"${nome.replace(/"/g, '""')}"`

function leggi(nome: string) {
  try {
    return fs.readFileSync(file(nome), 'utf8')
  } catch {
    return ''
  }
}
function scrivi(nome: string, testo: string) {
  fs.mkdirSync(cartella(), { recursive: true })
  fs.writeFileSync(file(nome), testo)
}
function leggiJson<T>(nome: string, riserva: T): T {
  try {
    return JSON.parse(leggi(nome)) as T
  } catch {
    return riserva
  }
}

const pool = (payload: Payload) => (payload.db as unknown as { pool: Pool }).pool

/* ------------------------------------------------------------------ registro e stato */

type Lato = 'invio' | 'ricezione'
function stato(lato: Lato, valore: string, extra: Record<string, unknown> = {}) {
  scrivi(`sincronizza-${lato}.stato.json`, JSON.stringify({ stato: valore, quando: ora(), ...extra }))
}
function registra(lato: Lato, riga: string, da = false) {
  fs.mkdirSync(cartella(), { recursive: true })
  const testo = `[${new Date().toLocaleTimeString('it-IT', { timeZone: 'Europe/Rome' })}] ${riga}\n`
  if (da) fs.writeFileSync(file(`sincronizza-${lato}.log`), testo)
  else fs.appendFileSync(file(`sincronizza-${lato}.log`), testo)
}
const coda = (lato: Lato, n = 40) => leggi(`sincronizza-${lato}.log`).split('\n').filter(Boolean).slice(-n).join('\n')

/* ------------------------------------------------------------------ chiave di ricezione */

function chiaveRicezione(crea = false): string {
  if (process.env.SINCRONIZZA_CHIAVE) return process.env.SINCRONIZZA_CHIAVE
  const salvata = leggi('sincronizza.chiave').trim()
  if (salvata || !crea) return salvata
  const nuova = crypto.randomBytes(32).toString('hex')
  scrivi('sincronizza.chiave', nuova)
  return nuova
}
function autorizzato(req: PayloadRequest) {
  const attesa = chiaveRicezione()
  const data = (req.headers.get('authorization') || '').replace(/^Bearer\s+/i, '').trim()
  return Boolean(attesa && data && uguali(attesa, data))
}

/* ------------------------------------------------------------------ database */

async function tabelle(db: Pool | PoolClient) {
  const r = await db.query(
    `SELECT c.table_name AS t, array_agg(c.column_name::text ORDER BY c.ordinal_position) AS colonne
       FROM information_schema.columns c
       JOIN information_schema.tables t ON t.table_schema = c.table_schema AND t.table_name = c.table_name
      WHERE c.table_schema = 'public' AND t.table_type = 'BASE TABLE'
      GROUP BY c.table_name`,
  )
  return Object.fromEntries(r.rows.map((x: { t: string; colonne: string[] }) => [x.t, x.colonne])) as Record<string, string[]>
}
async function migrazioni(db: Pool | PoolClient) {
  try {
    const r = await db.query(`SELECT name FROM payload_migrations WHERE name <> 'dev' ORDER BY name`)
    return r.rows.map((x: { name: string }) => x.name)
  } catch {
    return []
  }
}

interface Pacchetto {
  versione: string
  creato: string
  origine: string
  migrazioni: string[]
  tabelle: Record<string, { colonne: string[]; righe: Record<string, unknown>[] }>
  /** Chiavi dell'AI decifrate dal sito che invia: chi riceve le cifra con il proprio segreto. */
  chiari?: Record<string, Record<string, string>>
}

/** Tutte le tabelle dei contenuti, riga per riga, così come sono nel database. */
async function esporta(payload: Payload, origine: string, decifraChiavi: boolean): Promise<Pacchetto> {
  const db = pool(payload)
  const tutte = await tabelle(db)
  const p: Pacchetto = { versione: VERSIONE_SINCRONIZZA, creato: ora(), origine, migrazioni: await migrazioni(db), tabelle: {} }
  for (const [t, colonne] of Object.entries(tutte).sort()) {
    if (ESCLUSE.has(t)) continue
    const r = await db.query(`SELECT row_to_json(x) AS r FROM ${q(t)} x`)
    p.tabelle[t] = { colonne, righe: r.rows.map((x: { r: Record<string, unknown> }) => x.r) }
  }
  if (decifraChiavi && p.tabelle.ai) {
    p.chiari = { ai: {} }
    for (const riga of p.tabelle.ai.righe)
      for (const [k, v] of Object.entries(riga))
        if (typeof v === 'string' && v.startsWith(CIFRATO)) {
          const chiaro = decifra(v)
          if (chiaro) p.chiari.ai[k] = chiaro
          riga[k] = null
        }
  }
  return p
}

/** Ordine di inserimento: prima le tabelle a cui le altre fanno riferimento. */
async function ordine(db: PoolClient, nomi: string[]) {
  const r = await db.query(
    `SELECT DISTINCT cl.relname AS da, rf.relname AS a
       FROM pg_constraint c
       JOIN pg_class cl ON cl.oid = c.conrelid
       JOIN pg_class rf ON rf.oid = c.confrelid
       JOIN pg_namespace n ON n.oid = cl.relnamespace
      WHERE c.contype = 'f' AND n.nspname = 'public'`,
  )
  const insieme = new Set(nomi)
  const dipende = new Map<string, Set<string>>(nomi.map((n) => [n, new Set()]))
  const autoRif = new Set<string>()
  for (const { da, a } of r.rows as { da: string; a: string }[]) {
    if (!insieme.has(da) || !insieme.has(a)) continue
    if (da === a) autoRif.add(da)
    else dipende.get(da)!.add(a)
  }
  const fatto = new Set<string>()
  const lista: string[] = []
  let giro = true
  while (lista.length < nomi.length && giro) {
    giro = false
    for (const n of nomi) {
      if (fatto.has(n)) continue
      if ([...dipende.get(n)!].every((x) => fatto.has(x))) {
        fatto.add(n)
        lista.push(n)
        giro = true
      }
    }
  }
  const ciclo = nomi.filter((n) => !fatto.has(n))
  return { lista: [...lista, ...ciclo], ciclo, autoRif }
}

/**
 * Sostituisce i contenuti di questo sito con quelli del pacchetto, in una sola transazione.
 * Prima salva una copia di ciò che c'è (per «Ripristina»).
 */
async function importa(payload: Payload, p: Pacchetto, log: (r: string) => void, copia = true) {
  const db = pool(payload)
  const locali = await tabelle(db)
  const mieMigr = await migrazioni(db)
  if (p.migrazioni.join('|') !== mieMigr.join('|')) {
    const manca = p.migrazioni.filter((m) => !mieMigr.includes(m))
    const troppe = mieMigr.filter((m) => !p.migrazioni.includes(m))
    throw new Error(
      `Le due copie del sito hanno versioni diverse del codice. ${manca.length ? `Qui mancano: ${manca.join(', ')} (attendi il deploy di Coolify). ` : ''}${troppe.length ? `Sul PC mancano: ${troppe.join(', ')} (aggiorna il PC con aggiorna-pc.bat). ` : ''}`.trim(),
    )
  }

  if (copia) {
    const io = await esporta(payload, 'copia prima della sincronizzazione', false)
    const giorno = ora().replace(/[:.]/g, '-')
    const dove = path.join(cartella(), 'copie', `${giorno}-prima-della-sincronizzazione.json.gz`)
    fs.mkdirSync(path.dirname(dove), { recursive: true })
    fs.writeFileSync(dove, zlib.gzipSync(JSON.stringify(io)))
    log(`Copia dei contenuti attuali salvata: copie/${path.basename(dove)}`)
    // Si tengono le ultime 5 copie.
    const vecchie = fs.readdirSync(path.dirname(dove)).filter((f) => f.endsWith('-prima-della-sincronizzazione.json.gz')).sort().slice(0, -5)
    for (const f of vecchie) fs.rmSync(path.join(path.dirname(dove), f), { force: true })
  }

  const nomi = Object.keys(locali).filter((t) => !ESCLUSE.has(t))
  const client = await db.connect()
  try {
    await client.query('BEGIN')
    // Chiavi dell'AI: quelle in arrivo si cifrano con il segreto di questo sito;
    // se non ne arrivano, restano quelle già salvate qui.
    let aiPrima: Record<string, unknown> | undefined
    if (locali.ai) aiPrima = (await client.query(`SELECT * FROM ai ORDER BY id LIMIT 1`)).rows[0]

    const { lista, ciclo, autoRif } = await ordine(client, nomi)
    if (ciclo.length) {
      // Riferimenti circolari tra tabelle: si sospendono i controlli per la transazione (serve il proprietario del database).
      await client.query(`SET LOCAL session_replication_role = replica`)
      log(`Riferimenti circolari tra ${ciclo.join(', ')}: controlli sospesi per la transazione`)
    }
    // Svuotamento con DELETE, dalle tabelle che dipendono dalle altre verso quelle principali:
    // con centinaia di tabelle piccole è molto più veloce di TRUNCATE (che riscrive ogni file).
    for (const t of [...DA_SVUOTARE.filter((x) => locali[x]), ...[...lista].reverse()]) await client.query(`DELETE FROM ${q(t)}`)

    let righe = 0
    for (const t of lista) {
      const arrivo = p.tabelle[t]
      if (!arrivo || !arrivo.righe.length) continue
      const colonne = arrivo.colonne.filter((c) => locali[t].includes(c))
      if (t === 'ai') {
        for (const r of arrivo.righe) {
          for (const c of colonne) {
            const chiaro = p.chiari?.ai?.[c]
            if (chiaro) r[c] = cifra(chiaro)
            else if (r[c] == null && typeof aiPrima?.[c] === 'string' && String(aiPrima[c]).startsWith(CIFRATO)) r[c] = aiPrima[c]
          }
        }
      }
      const elenco = colonne.map(q).join(', ')
      const passo = autoRif.has(t) ? arrivo.righe.length : 1000
      for (let i = 0; i < arrivo.righe.length; i += passo) {
        await client.query(
          `INSERT INTO ${q(t)} (${elenco}) SELECT ${elenco} FROM json_populate_recordset(NULL::${q(t)}, $1::json)`,
          [JSON.stringify(arrivo.righe.slice(i, i + passo))],
        )
      }
      righe += arrivo.righe.length
    }
    // Contatori degli id: il prossimo documento creato qui non deve scontrarsi con quelli copiati.
    for (const t of nomi) {
      if (!locali[t].includes('id')) continue
      const seq = (await client.query(`SELECT pg_get_serial_sequence($1, 'id') AS s`, [`public.${q(t)}`])).rows[0]?.s as string | null
      if (seq) await client.query(`SELECT setval($1, COALESCE((SELECT MAX(id) FROM ${q(t)}), 0) + 1, false)`, [seq])
    }
    await client.query('COMMIT')
    log(`Contenuti sostituiti: ${lista.length} tabelle, ${righe} righe`)
  } catch (e) {
    await client.query('ROLLBACK').catch(() => undefined)
    throw e
  } finally {
    client.release()
  }
}

/* ------------------------------------------------------------------ foto */

/** File della cartella media (non le cartelle di servizio che iniziano col punto). */
function fileMedia(): [string, number][] {
  try {
    return fs
      .readdirSync(mediaDir(), { withFileTypes: true })
      .filter((d) => d.isFile() && !d.name.startsWith('.'))
      .map((d) => [d.name, fs.statSync(path.join(mediaDir(), d.name)).size])
  } catch {
    return []
  }
}
const nomeValido = (n: string) => !!n && n === path.basename(n) && !n.startsWith('.') && !/[\\/\0]/.test(n) && n.length < 250

/* ------------------------------------------------------------------ invio (PC) */

interface Destinazione {
  url: string
  chiave: string
}
const destinazione = () => leggiJson<Destinazione | null>('sincronizza.destinazione.json', null)
let inCorso = false
let ferma = false

async function chiama(d: Destinazione, percorso: string, init: RequestInit & { attesa?: number } = {}) {
  const r = await fetch(`${d.url}/api/sincronizza/${percorso}`, {
    ...init,
    headers: { authorization: `Bearer ${d.chiave}`, ...(init.headers || {}) },
    signal: AbortSignal.timeout(init.attesa || 120_000),
  })
  const testo = await r.text()
  let dati: Record<string, unknown> = {}
  try {
    dati = JSON.parse(testo)
  } catch {
    /* risposta non JSON */
  }
  if (!r.ok) {
    if (r.status === 401) throw new Error('Coolify ha rifiutato la chiave di ricezione: ricopiala da Strumenti sul sito online.')
    if (r.status === 404) throw new Error('Su Coolify questo strumento non c’è ancora: attendi che finisca il deploy del codice nuovo.')
    throw new Error(String(dati.errore || `Coolify ha risposto ${r.status}`))
  }
  return dati
}

async function pubblica(payload: Payload, chi: string) {
  const d = destinazione()
  if (!d) throw new Error('Manca l’indirizzo del sito online.')
  const log = (r: string) => registra('invio', r)
  registra('invio', `Pubblicazione verso ${d.url} avviata da ${chi}`, true)
  stato('invio', 'in-corso', { verso: d.url })

  // 1. Stessa versione del codice?
  const info = (await chiama(d, 'info')) as { migrazioni: string[] }
  const mie = await migrazioni(pool(payload))
  if (info.migrazioni.join('|') !== mie.join('|')) {
    const manca = mie.filter((m) => !info.migrazioni.includes(m))
    const troppe = info.migrazioni.filter((m) => !mie.includes(m))
    throw new Error(
      `Il codice dei due siti non è alla stessa versione. ${manca.length ? `Su Coolify manca: ${manca.join(', ')} (attendi la fine del deploy). ` : ''}${troppe.length ? `Sul PC manca: ${troppe.join(', ')} (lancia aggiorna-pc.bat). ` : ''}`.trim(),
    )
  }
  log('Versione del codice: uguale sui due siti')

  // 2. Foto: solo quelle che mancano o sono cambiate.
  const locali = fileMedia()
  const mancanti: string[] = []
  for (let i = 0; i < locali.length; i += 2000) {
    const r = (await chiama(d, 'media-mancanti', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ file: locali.slice(i, i + 2000) }),
    })) as { mancanti: string[] }
    mancanti.push(...r.mancanti)
  }
  log(`Foto e file: ${locali.length} sul PC, ${mancanti.length} da inviare`)
  let inviati = 0
  let pesoInviato = 0
  const coda = [...mancanti]
  const lavora = async () => {
    for (let nome = coda.shift(); nome; nome = coda.shift()) {
      if (ferma) throw new Error('Interrotto: le foto già inviate restano su Coolify, «Pubblica» riparte da quelle mancanti.')
      const corpo = fs.readFileSync(path.join(mediaDir(), nome))
      await chiama(d, `media?nome=${encodeURIComponent(nome)}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/octet-stream' },
        body: corpo,
        attesa: 600_000,
      })
      inviati++
      pesoInviato += corpo.length
      if (inviati % 25 === 0 || inviati === mancanti.length)
        log(`Inviati ${inviati} di ${mancanti.length} file (${(pesoInviato / 1048576).toFixed(0)} MB)`)
      stato('invio', 'in-corso', { verso: d.url, file: inviati, daInviare: mancanti.length })
    }
  }
  await Promise.all([lavora(), lavora(), lavora()])

  // 3. Contenuti.
  if (ferma) throw new Error('Interrotto prima dei contenuti.')
  const p = await esporta(payload, `PC (${chi})`, true)
  const righe = Object.values(p.tabelle).reduce((n, t) => n + t.righe.length, 0)
  const corpo = zlib.gzipSync(JSON.stringify(p))
  log(`Contenuti: ${Object.keys(p.tabelle).length} tabelle, ${righe} righe (${(corpo.length / 1048576).toFixed(1)} MB compressi), invio…`)
  await chiama(d, 'dati', { method: 'POST', headers: { 'content-type': 'application/gzip' }, body: corpo, attesa: 600_000 })
  // Coolify li applica in background: si attende l'esito.
  const fine = Date.now() + 30 * 60_000
  for (;;) {
    await new Promise((ok) => setTimeout(ok, 3000))
    const e = (await chiama(d, 'esito')) as { stato: string; errore?: string; registro?: string }
    if (e.stato === 'ok') break
    if (e.stato === 'errore') throw new Error(`Coolify non ha applicato i contenuti: ${e.errore || 'vedi il registro su Coolify'}. Nulla è cambiato.`)
    if (Date.now() > fine) throw new Error('Coolify non ha risposto entro 30 minuti: controlla Strumenti sul sito online.')
  }
  log('Fatto: il sito online ora ha gli stessi contenuti e le stesse foto del PC.')
  stato('invio', 'ok', { verso: d.url, file: inviati })
}

/* ------------------------------------------------------------------ ricezione (Coolify) */

let ricevendo = false
function avviaImportazione(payload: Payload, origine: string, leggiPacchetto: () => Pacchetto, copia: boolean) {
  ricevendo = true
  stato('ricezione', 'in-corso', { origine })
  registra('ricezione', `Contenuti in arrivo: ${origine}`, true)
  setImmediate(async () => {
    try {
      await importa(payload, leggiPacchetto(), (r) => registra('ricezione', r), copia)
      stato('ricezione', 'ok', { origine })
      // Da qui il PC è la fonte dei contenuti: avvio.sh non lancia più gli aggiornamenti automatici.
      scrivi('sincronizza.ricevuta', `${ora()}\n`)
      registra('ricezione', 'Completato')
      payload.logger.info(`[sincronizza] contenuti applicati (${origine})`)
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      stato('ricezione', 'errore', { origine, errore: msg })
      registra('ricezione', `Errore: ${msg}. I contenuti di prima sono rimasti com’erano.`)
      payload.logger.error(`[sincronizza] ${msg}`)
    } finally {
      ricevendo = false
      fs.rmSync(file('sincronizza-arrivo.json.gz'), { force: true })
    }
  })
}

const copie = () => {
  try {
    return fs.readdirSync(path.join(cartella(), 'copie')).filter((f) => f.endsWith('-prima-della-sincronizzazione.json.gz')).sort().reverse()
  } catch {
    return []
  }
}

/* ------------------------------------------------------------------ endpoint */

async function corpoJson<T>(req: PayloadRequest): Promise<T> {
  try {
    return (await (req as unknown as Request).json()) as T
  } catch {
    return {} as T
  }
}
const negato = () => json({ errore: 'Chiave di ricezione mancante o errata.' }, 401)
const soloRedazione = () => json({ errore: 'Serve l’accesso alla redazione.' }, 401)

export const endpointSincronizza: Endpoint[] = [
  // --- chiamati dal PC, con la chiave di ricezione
  {
    path: '/sincronizza/info',
    method: 'get',
    handler: async (req) => {
      if (!autorizzato(req)) return negato()
      return json({ versione: VERSIONE_SINCRONIZZA, migrazioni: await migrazioni(pool(req.payload)) })
    },
  },
  {
    path: '/sincronizza/media-mancanti',
    method: 'post',
    handler: async (req) => {
      if (!autorizzato(req)) return negato()
      const { file: elenco = [] } = await corpoJson<{ file?: [string, number][] }>(req)
      const qui = new Map(fileMedia())
      return json({ mancanti: elenco.filter(([n, s]) => nomeValido(n) && qui.get(n) !== s).map(([n]) => n) })
    },
  },
  {
    path: '/sincronizza/media',
    method: 'put',
    handler: async (req) => {
      if (!autorizzato(req)) return negato()
      const nome = new URL(req.url || '', 'http://x').searchParams.get('nome') || ''
      if (!nomeValido(nome)) return json({ errore: 'Nome di file non valido.' }, 400)
      const dati = Buffer.from(await (req as unknown as Request).arrayBuffer())
      fs.mkdirSync(mediaDir(), { recursive: true })
      const tmp = path.join(mediaDir(), `.arrivo-${crypto.randomBytes(6).toString('hex')}`)
      fs.writeFileSync(tmp, dati)
      fs.renameSync(tmp, path.join(mediaDir(), nome))
      return json({ ok: true })
    },
  },
  {
    path: '/sincronizza/dati',
    method: 'post',
    handler: async (req) => {
      if (!autorizzato(req)) return negato()
      if (ricevendo) return json({ errore: 'Sta già applicando un invio precedente.' }, 409)
      const dati = Buffer.from(await (req as unknown as Request).arrayBuffer())
      fs.mkdirSync(cartella(), { recursive: true })
      fs.writeFileSync(file('sincronizza-arrivo.json.gz'), dati)
      avviaImportazione(
        req.payload,
        'dal PC',
        () => JSON.parse(zlib.gunzipSync(fs.readFileSync(file('sincronizza-arrivo.json.gz'))).toString('utf8')) as Pacchetto,
        true,
      )
      return json({ ok: true }, 202)
    },
  },
  {
    path: '/sincronizza/esito',
    method: 'get',
    handler: async (req) => {
      if (!autorizzato(req)) return negato()
      const s = leggiJson<Record<string, unknown>>('sincronizza-ricezione.stato.json', { stato: 'mai' })
      return json({ ...s, registro: coda('ricezione', 10) })
    },
  },

  // --- pannello (redazione)
  {
    path: '/sincronizza/stato',
    method: 'get',
    handler: async (req) => {
      if (!req.user) return soloRedazione()
      const d = destinazione()
      return json({
        versione: VERSIONE_SINCRONIZZA,
        chiave: chiaveRicezione(true),
        chiaveDaVariabile: Boolean(process.env.SINCRONIZZA_CHIAVE),
        destinazione: d ? { url: d.url, chiave: d.chiave ? `••••${d.chiave.slice(-4)}` : '' } : null,
        invio: { ...leggiJson('sincronizza-invio.stato.json', { stato: 'mai' }), registro: coda('invio') },
        ricezione: { ...leggiJson('sincronizza-ricezione.stato.json', { stato: 'mai' }), registro: coda('ricezione') },
        ultimaRicevuta: leggi('sincronizza.ricevuta').trim(),
        copie: copie().slice(0, 5),
      })
    },
  },
  {
    path: '/sincronizza/destinazione',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return soloRedazione()
      const b = await corpoJson<{ url?: string; chiave?: string }>(req)
      let url: URL
      try {
        url = new URL(String(b.url || '').trim())
      } catch {
        return json({ errore: 'Indirizzo non valido: scrivilo completo, per esempio https://serralunga1825.oltre.media' }, 400)
      }
      if (url.protocol !== 'https:' && !/^(localhost|127\.0\.0\.1)$/.test(url.hostname))
        return json({ errore: 'Serve un indirizzo https: le chiavi viaggiano in questa connessione.' }, 400)
      const prima = destinazione()
      const chiave = String(b.chiave || '').trim() || (prima?.url === url.origin ? prima.chiave : '')
      if (chiave.length < 32) return json({ errore: 'Incolla la chiave di ricezione del sito online (Strumenti, riquadro «Ricevi dal PC»).' }, 400)
      scrivi('sincronizza.destinazione.json', JSON.stringify({ url: url.origin, chiave }))
      return json({ ok: true })
    },
  },
  {
    path: '/sincronizza/pubblica',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return soloRedazione()
      if (inCorso) return json({ errore: 'La pubblicazione è già in corso.' }, 409)
      if (!destinazione()) return json({ errore: 'Prima salva indirizzo e chiave del sito online.' }, 400)
      inCorso = true
      ferma = false
      const chi = req.user.email || 'redazione'
      const payload = req.payload
      setImmediate(async () => {
        try {
          await pubblica(payload, String(chi))
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e)
          registra('invio', `Errore: ${msg}`)
          stato('invio', 'errore', { errore: msg })
        } finally {
          inCorso = false
        }
      })
      return json({ ok: true })
    },
  },
  {
    path: '/sincronizza/ferma',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return soloRedazione()
      ferma = true
      return json({ ok: true })
    },
  },
  {
    path: '/sincronizza/ripristina',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return soloRedazione()
      if (ricevendo) return json({ errore: 'Sta già applicando dei contenuti.' }, 409)
      const ultima = copie()[0]
      if (!ultima) return json({ errore: 'Non ci sono copie da ripristinare.' }, 404)
      avviaImportazione(
        req.payload,
        `ripristino della copia ${ultima}`,
        () => JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(cartella(), 'copie', ultima))).toString('utf8')) as Pacchetto,
        false,
      )
      return json({ ok: true })
    },
  },
]
