/**
 * Version: 2.00
 * Contenuti su GitHub: GitHub è l'unico punto di riferimento, per il codice e per i contenuti.
 *
 * Perché: testi, menu, logo, blocchi della home, schede e foto modificati dal pannello o dalla
 * pagina stanno nel database e nella cartella media di ciascun sito. Senza questo strumento il
 * sito sul PC e quello su Coolify si allontanano (come era successo con logo, menu e catalogo).
 *
 * Dove: nel repository del sito, ramo `contenuti` (solo contenuti, separato dal codice: salvare i
 * contenuti non fa ricompilare Coolify). Dentro:
 *   manifesto.json        chi ha salvato, quando, impronta dei contenuti, versione dello schema
 *   dati/<tabella>.json   ogni tabella dei contenuti, una riga per riga del database
 *   media/<file>          foto, video e PDF caricati (con le versioni AVIF)
 * La cronologia del ramo è la cronologia dei contenuti: ogni salvataggio è un commit.
 *
 * Come (da qualunque sito, PC o Coolify):
 * - «Salva su GitHub»: scrive lo stato di questo sito nel ramo `contenuti` (git push, solo le
 *   differenze). Se su GitHub c'è un salvataggio più recente che questo sito non ha ancora
 *   caricato si ferma, per non cancellare il lavoro fatto altrove (si può forzare).
 * - «Carica da GitHub»: porta qui i contenuti del ramo. Prima salva una copia locale
 *   (media/.compiti/copie/, ultime 5, «Ripristina»), poi sostituisce tutto in una transazione.
 * - Automatico: ogni 10 minuti e all'avvio ogni sito controlla GitHub e carica da solo i
 *   contenuti nuovi, ma solo se qui non ci sono modifiche non ancora salvate: in quel caso lo
 *   segnala nel pannello e aspetta una scelta.
 *
 * Restano di ciascun sito, mai su GitHub: utenti e accessi, preferenze del pannello, richieste dei
 * clienti, iscritti alla newsletter, registro dei consensi ai cookie, registro delle migrazioni, chiavi e password cifrate (AI,
 * reCAPTCHA, SMTP) e dati del server di posta.
 *
 * Accesso a GitHub: token personale con permesso Contents (lettura e scrittura) sul repository,
 * inserito una volta nel pannello (salvato cifrato in media/.compiti/github.json) oppure nella
 * variabile CONTENUTI_GITHUB_TOKEN. Repository e ramo: CONTENUTI_GITHUB_REPO, CONTENUTI_GITHUB_RAMO.
 */
import { execFile } from 'child_process'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'
import zlib from 'zlib'

import type { Endpoint, Payload } from 'payload'
import type { Pool, PoolClient } from 'pg'

import { cifra, decifra } from '../ai/segreto'

export const VERSIONE_SINCRONIZZA = '2.00'
const MAX_FILE = 95 * 1024 * 1024 // GitHub rifiuta i file oltre 100 MB

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
  'iscritti_newsletter',
  'registro_consensi',
])
/**
 * Tabelle con chiavi cifrate (AI, reCAPTCHA, password SMTP): si inviano in chiaro e chi riceve
 * le cifra con il proprio segreto. Le colonne qui sotto, se arrivano vuote, restano quelle di
 * chi riceve: server di posta e destinatari degli avvisi sono propri di ciascun sito.
 */
const CON_SEGRETI = ['ai', 'impostazioni', 'moduli']
const RESTANO_SE_VUOTE: Record<string, string[]> = {
  moduli: ['smtp_host', 'smtp_porta', 'smtp_utente', 'smtp_password', 'notifiche_a', 'mittente_email'],
  impostazioni: ['recaptcha_chiave_segreta'],
}
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
  /** Chiavi (AI, reCAPTCHA, SMTP) decifrate dal sito che invia: chi riceve le cifra con il proprio segreto. */
  chiari?: Record<string, Record<string, string>>
}

/** Ordine stabile delle righe: per id, così lo stesso contenuto produce sempre lo stesso file. */
function ordina(righe: Record<string, unknown>[]) {
  const chiave = (r: Record<string, unknown>) => (r.id ?? JSON.stringify(r)) as string | number
  return righe.sort((a, b) => {
    const x = chiave(a)
    const y = chiave(b)
    if (typeof x === 'number' && typeof y === 'number') return x - y
    return String(x) < String(y) ? -1 : String(x) > String(y) ? 1 : 0
  })
}

/** Tutte le tabelle dei contenuti, riga per riga, così come sono nel database (orari in UTC). */
async function esporta(payload: Payload, origine: string, decifraChiavi: boolean): Promise<Pacchetto> {
  const client = await pool(payload).connect()
  try {
    await client.query(`SET TIME ZONE 'UTC'`)
    const tutte = await tabelle(client)
    const p: Pacchetto = { versione: VERSIONE_SINCRONIZZA, creato: ora(), origine, migrazioni: await migrazioni(client), tabelle: {} }
    for (const [t, colonne] of Object.entries(tutte).sort(([a], [b]) => (a < b ? -1 : 1))) {
      if (ESCLUSE.has(t)) continue
      const r = await client.query(`SELECT row_to_json(x) AS r FROM ${q(t)} x`)
      p.tabelle[t] = { colonne, righe: ordina(r.rows.map((x: { r: Record<string, unknown> }) => x.r)) }
    }
    if (decifraChiavi) {
      p.chiari = {}
      for (const t of CON_SEGRETI) {
        if (!p.tabelle[t]) continue
        const chiari: Record<string, string> = (p.chiari[t] = {})
        for (const riga of p.tabelle[t].righe)
          for (const [k, v] of Object.entries(riga))
            if (typeof v === 'string' && v.startsWith(CIFRATO)) {
              const chiaro = decifra(v)
              if (chiaro) chiari[k] = chiaro
              riga[k] = null
            }
      }
    }
    return p
  } finally {
    await client.query('RESET TIME ZONE').catch(() => undefined)
    client.release()
  }
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
  const manca = p.migrazioni.filter((m) => !mieMigr.includes(m))
  if (manca.length)
    throw new Error(
      `I contenuti su GitHub sono stati salvati da una versione più nuova del codice (${manca.join(', ')}). Questo sito li carica dopo il proprio aggiornamento: deploy di Coolify, oppure aggiorna-pc.bat sul PC.`,
    )

  if (copia) {
    const io = await esporta(payload, 'copia prima del caricamento da GitHub', false)
    const giorno = ora().replace(/[:.]/g, '-')
    const dove = path.join(cartella(), 'copie', `${giorno}-prima-del-caricamento.json.gz`)
    fs.mkdirSync(path.dirname(dove), { recursive: true })
    fs.writeFileSync(dove, zlib.gzipSync(JSON.stringify(io)))
    log(`Copia dei contenuti attuali salvata: copie/${path.basename(dove)}`)
    // Si tengono le ultime 5 copie.
    const vecchie = fs.readdirSync(path.dirname(dove)).filter((f) => f.endsWith('-prima-del-caricamento.json.gz')).sort().slice(0, -5)
    for (const f of vecchie) fs.rmSync(path.join(path.dirname(dove), f), { force: true })
  }

  const nomi = Object.keys(locali).filter((t) => !ESCLUSE.has(t))
  const client = await db.connect()
  try {
    await client.query('BEGIN')
    // Chiavi dell'AI: quelle in arrivo si cifrano con il segreto di questo sito;
    // se non ne arrivano, restano quelle già salvate qui.
    const prima: Record<string, Record<string, unknown> | undefined> = {}
    for (const t of CON_SEGRETI) if (locali[t]) prima[t] = (await client.query(`SELECT * FROM ${q(t)} ORDER BY id LIMIT 1`)).rows[0]

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
      if (CON_SEGRETI.includes(t)) {
        const qui = prima[t]
        const restano = RESTANO_SE_VUOTE[t] || []
        for (const r of arrivo.righe) {
          for (const c of colonne) {
            const chiaro = p.chiari?.[t]?.[c]
            if (chiaro) r[c] = cifra(chiaro)
            else if ((r[c] == null || r[c] === '') && qui?.[c] != null && qui[c] !== '' && (restano.includes(c) || String(qui[c]).startsWith(CIFRATO))) r[c] = qui[c]
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
      .map((d) => [d.name, fs.statSync(path.join(mediaDir(), d.name)).size] as [string, number])
      .sort(([a], [b]) => (a < b ? -1 : 1))
  } catch {
    return []
  }
}

/* ------------------------------------------------------------------ registro */

function registra(riga: string, da = false) {
  fs.mkdirSync(cartella(), { recursive: true })
  const testo = `[${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome', dateStyle: 'short', timeStyle: 'medium' })}] ${riga}\n`
  if (da) fs.writeFileSync(file('github.log'), testo)
  else fs.appendFileSync(file('github.log'), testo)
}
const registro = (n = 40) => leggi('github.log').split('\n').filter(Boolean).slice(-n).join('\n')

/* ------------------------------------------------------------------ configurazione */

const REPO = () => (process.env.CONTENUTI_GITHUB_REPO || 'doc65mi/sito-serralunga').trim()
/** Indirizzo del repository: di norma GitHub; CONTENUTI_GIT_URL serve per le prove con un repository locale. */
const URL_GIT = () => process.env.CONTENUTI_GIT_URL || `https://github.com/${REPO()}.git`
const RAMO = () => (process.env.CONTENUTI_GITHUB_RAMO || 'contenuti').trim()
interface Config {
  token?: string
  automatico?: boolean
}
const config = () => leggiJson<Config>('github.json', {})
const token = () => process.env.CONTENUTI_GITHUB_TOKEN?.trim() || decifra(config().token || '')
const automatico = () => config().automatico !== false

/** Stato rispetto a GitHub: quale salvataggio è caricato qui e com'erano i contenuti in quel momento. */
interface Allineamento {
  /** impronta del salvataggio di GitHub con cui questo sito è allineato */
  github?: string
  /** impronta dei contenuti di questo sito subito dopo l'ultimo salvataggio o caricamento */
  locale?: string
  commit?: string
  quando?: string
}
const allineamento = () => leggiJson<Allineamento>('github.allineamento.json', {})
const salvaAllineamento = (a: Allineamento) => scrivi('github.allineamento.json', JSON.stringify({ ...a, quando: ora() }))

interface Manifesto {
  versione: string
  salvato: string
  da: string
  chi: string
  impronta: string
  migrazioni: string[]
  tabelle: number
  righe: number
  file: number
}

/* ------------------------------------------------------------------ istantanea */

/** Tabelle che finiscono su GitHub: senza segreti e senza i dati del server di posta di questo sito. */
function perGithub(p: Pacchetto) {
  const file = new Map<string, string>()
  let righe = 0
  for (const [t, { colonne, righe: rr }] of Object.entries(p.tabelle)) {
    if (!rr.length) continue
    const restano = RESTANO_SE_VUOTE[t] || []
    const pulite = rr.map((r) => {
      if (!CON_SEGRETI.includes(t)) return r
      const c = { ...r }
      for (const [k, v] of Object.entries(c)) if ((typeof v === 'string' && v.startsWith(CIFRATO)) || restano.includes(k)) c[k] = null
      return c
    })
    righe += pulite.length
    file.set(`dati/${t}.json`, `{"colonne":${JSON.stringify(colonne)},"righe":[\n${pulite.map((r) => JSON.stringify(r)).join(',\n')}\n]}\n`)
  }
  const impronta = crypto.createHash('sha256')
  for (const k of [...file.keys()].sort()) impronta.update(k).update('\0').update(file.get(k)!).update('\0')
  return { file, impronta: impronta.digest('hex').slice(0, 20), righe }
}
async function improntaLocale(payload: Payload) {
  return perGithub(await esporta(payload, 'impronta', false)).impronta
}

/* ------------------------------------------------------------------ git */

const dirGit = () => path.join(cartella(), 'contenuti-git')

function git(args: string[], conToken = false): Promise<string> {
  const t = token()
  const extra = conToken && t ? ['-c', `http.extraHeader=Authorization: Basic ${Buffer.from(`x-access-token:${t}`).toString('base64')}`] : []
  return new Promise((ok, ko) =>
    execFile(
      'git',
      [...extra, '-c', 'core.quotepath=off', '-c', 'safe.directory=*', ...args],
      { cwd: dirGit(), maxBuffer: 256 * 1024 * 1024, env: { ...process.env, GIT_TERMINAL_PROMPT: '0', LC_ALL: 'C' } },
      (e, out, err) => {
        if (!e) return ok(String(out))
        const msg = `${String(err || '')} ${e.message}`.replace(t || '\u0000', '***').trim()
        ko(new Error(msg.split('\n').filter((r) => !r.startsWith('hint:')).slice(-3).join(' ')))
      },
    ),
  )
}

async function preparaRepo() {
  fs.mkdirSync(dirGit(), { recursive: true })
  if (!fs.existsSync(path.join(dirGit(), '.git'))) {
    await git(['init', '-q'])
    await git(['remote', 'add', 'origin', URL_GIT()])
  } else await git(['remote', 'set-url', 'origin', URL_GIT()])
}

/** Scarica l'ultimo salvataggio di GitHub (solo l'ultimo commit). Null se il ramo non esiste ancora. */
async function scaricaRemoto(): Promise<{ commit: string; manifesto: Manifesto | null } | null> {
  if (!token()) throw new Error('Manca il token di GitHub: inseriscilo nel riquadro «Contenuti su GitHub».')
  await preparaRepo()
  try {
    await git(['fetch', '-q', '--depth', '1', 'origin', `+refs/heads/${RAMO()}:refs/remotes/origin/${RAMO()}`], true)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (/couldn't find remote ref|not found.*ref/i.test(msg)) return null
    if (/403|401|Authentication failed|could not read Username/i.test(msg)) throw new Error('GitHub ha rifiutato il token: controlla che sia valido e abbia il permesso Contents in scrittura sul repository.')
    throw new Error(`GitHub non raggiungibile: ${msg}`)
  }
  const commit = (await git(['rev-parse', `refs/remotes/origin/${RAMO()}`])).trim()
  let manifesto: Manifesto | null = null
  try {
    manifesto = JSON.parse(await git(['show', `${commit}:manifesto.json`])) as Manifesto
  } catch {
    /* ramo senza manifesto */
  }
  return { commit, manifesto }
}

/** Collega (o copia, se non si può) un file senza duplicare lo spazio quando possibile. */
function collega(da: string, a: string) {
  fs.rmSync(a, { force: true })
  try {
    fs.linkSync(da, a)
  } catch {
    fs.copyFileSync(da, a)
  }
}

/* ------------------------------------------------------------------ salva */

let occupato: string | null = null

async function salva(payload: Payload, chi: string, forza: boolean) {
  registra(`Salvataggio su GitHub (${REPO()}, ramo ${RAMO()}) avviato da ${chi}`, true)
  const remoto = await scaricaRemoto()
  const a = allineamento()
  if (remoto?.manifesto && remoto.manifesto.impronta !== a.github && !forza)
    throw new Error(
      `Su GitHub c'è un salvataggio più recente (${remoto.manifesto.da}, ${new Date(remoto.manifesto.salvato).toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}) che questo sito non ha ancora caricato. Carica prima da GitHub, oppure «Salva comunque» per sostituirlo con i contenuti di qui.`,
    )

  const p = await esporta(payload, chi, false)
  const { file: dati, impronta, righe } = perGithub(p)

  // Cartella di lavoro: da zero, così i file tolti qui spariscono anche su GitHub.
  if (remoto) await git(['reset', '-q', '--mixed', remoto.commit])
  else if (!(await git(['branch', '--show-current']).catch(() => '')).trim()) await git(['checkout', '-q', '--orphan', RAMO()]).catch(() => undefined)
  for (const d of ['dati', 'media']) fs.rmSync(path.join(dirGit(), d), { recursive: true, force: true })
  fs.mkdirSync(path.join(dirGit(), 'dati'), { recursive: true })
  fs.mkdirSync(path.join(dirGit(), 'media'), { recursive: true })
  for (const [nome, testo] of dati) fs.writeFileSync(path.join(dirGit(), nome), testo)
  let nFile = 0
  for (const [nome, peso] of fileMedia()) {
    if (peso > MAX_FILE) {
      registra(`Saltato ${nome}: ${(peso / 1048576).toFixed(0)} MB, oltre il limite di GitHub (100 MB). Va caricato a mano su ogni sito.`)
      continue
    }
    collega(path.join(mediaDir(), nome), path.join(dirGit(), 'media', nome))
    nFile++
  }
  const manifesto: Manifesto = {
    versione: VERSIONE_SINCRONIZZA,
    salvato: ora(),
    da: (process.env.SITO_URL || 'sito').replace(/\/+$/, ''),
    chi,
    impronta,
    migrazioni: p.migrazioni,
    tabelle: dati.size,
    righe,
    file: nFile,
  }
  fs.writeFileSync(path.join(dirGit(), 'manifesto.json'), `${JSON.stringify(manifesto, null, 2)}\n`)

  await git(['add', '-A'])
  const cambiati = (await git(['status', '--porcelain'])).split('\n').filter(Boolean)
  if (remoto && cambiati.length <= 1 && remoto.manifesto?.impronta === impronta) {
    await git(['reset', '-q', '--hard', remoto.commit])
    salvaAllineamento({ github: impronta, locale: impronta, commit: remoto.commit })
    registra('Nessuna differenza: GitHub ha già questi contenuti.')
    return
  }
  const foto = cambiati.filter((r) => r.slice(3).startsWith('media/')).length
  registra(`Da inviare: ${cambiati.length} file cambiati (${foto} tra foto e documenti), ${dati.size} tabelle, ${righe} righe`)
  await git([
    '-c', 'user.name=Sito Serralunga', '-c', 'user.email=contenuti@serralunga.invalid',
    'commit', '-q', '-m', `Contenuti salvati da ${manifesto.da} (${chi})`, '-m', `${dati.size} tabelle, ${righe} righe, ${nFile} file. Impronta ${impronta}.`,
  ])
  try {
    await git(['push', '-q', 'origin', `HEAD:refs/heads/${RAMO()}`, ...(forza && remoto ? [`--force-with-lease=refs/heads/${RAMO()}:${remoto.commit}`] : [])], true)
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (/rejected|non-fast-forward|fetch first|stale info/i.test(msg)) throw new Error('Nel frattempo un altro sito ha salvato su GitHub: carica prima i suoi contenuti, poi salva di nuovo.')
    throw e
  }
  const commit = (await git(['rev-parse', 'HEAD'])).trim()
  salvaAllineamento({ github: impronta, locale: impronta, commit })
  registra(`Fatto: contenuti salvati su GitHub (commit ${commit.slice(0, 7)}).`)
}

/* ------------------------------------------------------------------ carica */

async function carica(payload: Payload, chi: string, forza: boolean, auto = false) {
  if (!auto) registra(`Caricamento da GitHub avviato da ${chi}`, true)
  const remoto = await scaricaRemoto()
  if (!remoto?.manifesto) {
    if (!auto) registra('Su GitHub non ci sono ancora contenuti: salva da questo sito (o da quello più aggiornato).')
    return 'vuoto'
  }
  const m = remoto.manifesto
  const a = allineamento()
  if (m.impronta === a.github && !forza) {
    if (!auto) registra('Questo sito ha già l’ultimo salvataggio di GitHub.')
    return 'allineato'
  }
  if (!forza) {
    // Mai sovrascrivere da soli modifiche fatte qui e non ancora salvate.
    const qui = await improntaLocale(payload)
    if (!a.locale || qui !== a.locale) {
      if (auto) return 'conflitto'
      throw new Error('Qui ci sono modifiche non ancora salvate su GitHub. Salvale prima, oppure «Carica comunque» (finiscono nella copia di sicurezza).')
    }
  }
  if (auto) registra(`Contenuti nuovi su GitHub (${m.da}, ${m.chi}): caricamento automatico`, true)
  const mieMigr = await migrazioni(pool(payload))
  const manca = m.migrazioni.filter((x) => !mieMigr.includes(x))
  if (manca.length) {
    if (auto) return 'codice-vecchio'
    throw new Error(`Il salvataggio su GitHub viene da una versione più nuova del codice: aggiorna prima questo sito (deploy di Coolify, oppure aggiorna-pc.bat sul PC).`)
  }

  await git(['checkout', '-q', '-f', '-B', RAMO(), remoto.commit])
  await git(['clean', '-q', '-fd'])
  // 1. Foto: solo quelle mancanti o diverse.
  const qui = new Map(fileMedia())
  const dir = path.join(dirGit(), 'media')
  let nuove = 0
  if (fs.existsSync(dir))
    for (const nome of fs.readdirSync(dir)) {
      const st = fs.statSync(path.join(dir, nome))
      if (!st.isFile() || qui.get(nome) === st.size) continue
      collega(path.join(dir, nome), path.join(mediaDir(), nome))
      nuove++
    }
  registra(`Foto e documenti: ${nuove} nuovi o cambiati`)
  // 2. Contenuti.
  const p: Pacchetto = { versione: m.versione, creato: m.salvato, origine: m.da, migrazioni: m.migrazioni, tabelle: {} }
  const dd = path.join(dirGit(), 'dati')
  for (const f of fs.existsSync(dd) ? fs.readdirSync(dd) : []) {
    if (!f.endsWith('.json')) continue
    p.tabelle[f.slice(0, -5)] = JSON.parse(fs.readFileSync(path.join(dd, f), 'utf8'))
  }
  await importa(payload, p, (r) => registra(r), true)
  salvaAllineamento({ github: m.impronta, locale: await improntaLocale(payload), commit: remoto.commit })
  registra(`Fatto: contenuti caricati da GitHub (salvati da ${m.da}, ${new Date(m.salvato).toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}).`)
  return 'caricato'
}

/* ------------------------------------------------------------------ controllo periodico */

interface Controllo {
  quando: string
  esito: 'allineato' | 'da-salvare' | 'da-caricare' | 'conflitto' | 'vuoto' | 'codice-vecchio' | 'senza-token' | 'errore'
  errore?: string
  github?: Pick<Manifesto, 'salvato' | 'da' | 'chi'>
}
const ultimoControllo = () => leggiJson<Controllo | null>('github.controllo.json', null)

async function controlla(payload: Payload, auto: boolean) {
  if (!token()) return scrivi('github.controllo.json', JSON.stringify({ quando: ora(), esito: 'senza-token' }))
  try {
    const remoto = await scaricaRemoto()
    const a = allineamento()
    const qui = await improntaLocale(payload)
    const m = remoto?.manifesto
    const cambiatoQui = !a.locale || qui !== a.locale
    const cambiatoLa = !!m && m.impronta !== a.github
    let esito: Controllo['esito'] = !m ? 'vuoto' : cambiatoLa && cambiatoQui ? 'conflitto' : cambiatoLa ? 'da-caricare' : cambiatoQui ? 'da-salvare' : 'allineato'
    if (esito === 'da-caricare' && auto && automatico()) {
      occupato = 'carica'
      try {
        const r = await carica(payload, 'aggiornamento automatico', false, true)
        if (r === 'caricato') esito = 'allineato'
        else if (r === 'codice-vecchio') esito = 'codice-vecchio'
      } finally {
        occupato = null
      }
    }
    scrivi('github.controllo.json', JSON.stringify({ quando: ora(), esito, github: m ? { salvato: m.salvato, da: m.da, chi: m.chi } : undefined }))
  } catch (e) {
    scrivi('github.controllo.json', JSON.stringify({ quando: ora(), esito: 'errore', errore: e instanceof Error ? e.message : String(e) }))
  }
}

let avviato = false
/** Da payload.config onInit: controllo all'avvio (dopo 1 minuto) e poi ogni 10 minuti (CONTENUTI_GITHUB_MINUTI). */
export function avviaControlloContenuti(payload: Payload) {
  if (avviato || process.env.CONTENUTI_GITHUB_CONTROLLO === '0') return
  avviato = true
  const giro = () => {
    if (occupato || !token()) return
    occupato = 'controllo'
    controlla(payload, true)
      .catch(() => undefined)
      .finally(() => {
        if (occupato === 'controllo') occupato = null
      })
  }
  const minuti = Math.max(1, Number(process.env.CONTENUTI_GITHUB_MINUTI) || 10)
  setTimeout(giro, 60_000).unref?.()
  setInterval(giro, minuti * 60_000).unref?.()
}

/* ------------------------------------------------------------------ endpoint del pannello */

async function corpoJson<T>(req: { json?: () => Promise<unknown> }): Promise<T> {
  try {
    return (await (req as unknown as Request).json()) as T
  } catch {
    return {} as T
  }
}
const soloRedazione = () => json({ errore: 'Serve l’accesso alla redazione.' }, 401)
const copie = () => {
  try {
    return fs.readdirSync(path.join(cartella(), 'copie')).filter((f) => f.endsWith('-prima-del-caricamento.json.gz')).sort().reverse()
  } catch {
    return []
  }
}

function inBackground(payload: Payload, nome: string, lavoro: () => Promise<unknown>) {
  occupato = nome
  setImmediate(async () => {
    try {
      await lavoro()
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      registra(`Non completato: ${msg}`)
      payload.logger.error(`[contenuti-github] ${msg}`)
    } finally {
      occupato = 'controllo'
      await controlla(payload, false).catch(() => undefined)
      occupato = null
    }
  })
}

export const endpointSincronizza: Endpoint[] = [
  {
    path: '/contenuti-github/stato',
    method: 'get',
    handler: async (req) => {
      if (!req.user) return soloRedazione()
      return json({
        versione: VERSIONE_SINCRONIZZA,
        repo: REPO(),
        ramo: RAMO(),
        token: process.env.CONTENUTI_GITHUB_TOKEN ? 'variabile' : config().token ? `••••${token().slice(-4)}` : '',
        automatico: automatico(),
        occupato,
        controllo: ultimoControllo(),
        allineamento: allineamento(),
        registro: registro(),
        copie: copie().slice(0, 5),
      })
    },
  },
  {
    path: '/contenuti-github/impostazioni',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return soloRedazione()
      const b = await corpoJson<{ token?: string; automatico?: boolean }>(req)
      const c = config()
      if (typeof b.token === 'string' && b.token.trim()) {
        if (!/^(gh[pousr]_|github_pat_)[A-Za-z0-9_]{20,}$/.test(b.token.trim())) return json({ errore: 'Non sembra un token di GitHub (inizia con github_pat_ o ghp_).' }, 400)
        c.token = cifra(b.token.trim())
      }
      if (typeof b.automatico === 'boolean') c.automatico = b.automatico
      scrivi('github.json', JSON.stringify(c))
      if (!occupato) inBackground(req.payload, 'controllo', () => controlla(req.payload, false))
      return json({ ok: true })
    },
  },
  {
    path: '/contenuti-github/azione',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return soloRedazione()
      if (occupato && occupato !== 'controllo') return json({ errore: 'C’è già un’operazione in corso: attendi che finisca.' }, 409)
      if (occupato === 'controllo') return json({ errore: 'Sto controllando GitHub: riprova tra qualche secondo.' }, 409)
      const { azione, forza } = await corpoJson<{ azione?: string; forza?: boolean }>(req)
      const chi = String(req.user.email || 'redazione')
      const payload = req.payload
      if (azione === 'salva') inBackground(payload, 'salva', () => salva(payload, chi, forza === true))
      else if (azione === 'carica') inBackground(payload, 'carica', () => carica(payload, chi, forza === true))
      else if (azione === 'controlla') inBackground(payload, 'controllo', () => controlla(payload, false))
      else if (azione === 'ripristina') {
        const ultima = copie()[0]
        if (!ultima) return json({ errore: 'Non ci sono copie da ripristinare.' }, 404)
        inBackground(payload, 'ripristina', async () => {
          registra(`Ripristino della copia ${ultima} avviato da ${chi}`, true)
          const p = JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(cartella(), 'copie', ultima))).toString('utf8')) as Pacchetto
          await importa(payload, p, (r) => registra(r), false)
          // Dopo un ripristino questo sito ha contenuti diversi da GitHub: vanno salvati o ricaricati.
          salvaAllineamento({ ...allineamento(), locale: 'ripristino' })
          registra('Fatto: contenuti di prima ripristinati. Non sono su GitHub finché non li salvi.')
        })
      } else return json({ errore: 'Azione sconosciuta.' }, 400)
      return json({ ok: true })
    },
  },
]
