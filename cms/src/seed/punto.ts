/**
 * Version: 1.00
 * Punto di ripresa di seed:aggiorna e seed:catalogo.
 * Ogni fase (o prodotto del catalogo) finita si segna in .compiti/<compito>.<modo>.punto.
 * Se il compito viene interrotto (pulsante "Interrompi" in Strumenti, riavvio del server),
 * all'esecuzione successiva le voci segnate si saltano e si riparte da dove era arrivato.
 * A compito completato il file si cancella; SEED_DA_CAPO=1 ("Ricomincia da capo") lo azzera.
 * Il modo (prudente / applica) ha un file suo: una fase fatta in prudente non conta come applicata.
 */
import fs from 'fs'
import path from 'path'

const CARTELLA = path.join(process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media'), '.compiti')
const compito = process.env.SEED_SOLO === 'catalogo' ? 'catalogo' : 'aggiorna'
const modo = process.env.SEED_APPLICA === '1' ? 'applica' : 'prudente'
const attivo = ['aggiorna', 'designer', 'catalogo'].includes(process.env.SEED_SOLO || '')
const FILE = path.join(CARTELLA, `${compito}.${modo}.punto`)

let fatti = new Set<string>()
if (attivo) {
  fs.mkdirSync(CARTELLA, { recursive: true })
  if (process.env.SEED_DA_CAPO === '1') fs.rmSync(FILE, { force: true })
  try {
    fatti = new Set(fs.readFileSync(FILE, 'utf8').split('\n').filter(Boolean))
  } catch {
    /* nessun punto salvato: si parte dall'inizio */
  }
}

/** Quante voci risultano già fatte (per il registro). */
export const giaFatti = () => fatti.size

export const fatto = (chiave: string) => attivo && fatti.has(chiave)

export function segna(chiave: string) {
  if (!attivo || fatti.has(chiave)) return
  fatti.add(chiave)
  fs.appendFileSync(FILE, `${chiave}\n`)
}

/** Esegue una fase solo se non è già stata completata; poi la segna. */
export async function fase(chiave: string, fn: () => Promise<unknown>, log: (m: string) => void) {
  if (fatto(chiave)) {
    log(`ripresa: fase «${chiave}» già completata, si salta`)
    return
  }
  await fn()
  segna(chiave)
}

/** Compito arrivato in fondo: il punto non serve più. */
export function completato() {
  if (attivo) fs.rmSync(FILE, { force: true })
}
