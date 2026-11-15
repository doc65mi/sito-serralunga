/**
 * Version: 1.00
 * Prova dell'AI dal server (npm run ai:prova): usa le impostazioni salvate nel pannello e fa
 * una richiesta di testo e, con AI_PROVA=immagine, una generazione di immagine.
 * Non salva nulla e non stampa mai le chiavi: serve a capire se fornitore, chiave e modello
 * funzionano, senza passare dal browser. L'immagine consuma un po' di credito del fornitore.
 */
import { getPayload } from 'payload'
import config from '@payload-config'

import { chiediTesto, configAi, generaImmagine } from './fornitori'

const payload = await getPayload({ config })
const c = await configAi(payload)
const riga = (t: string) => console.log(`[ai:prova] ${t}`)

riga(`interruttore: ${c.attiva ? 'acceso' : 'spento'}`)
riga(`testi: ${c.fornitoreTesti}, modello ${c.testi[c.fornitoreTesti] || '(vuoto)'}, chiave ${c.chiavi[c.fornitoreTesti] ? 'presente' : 'MANCANTE'}`)
riga(`immagini: ${c.fornitoreImmagini}, modello ${c.immagini[c.fornitoreImmagini] || '(vuoto)'}, chiave ${c.chiavi[c.fornitoreImmagini] ? 'presente' : 'MANCANTE'}`)

let esito = 0
try {
  const inizio = Date.now()
  const r = await chiediTesto(c, { sistema: 'Rispondi solo con la parola OK.', utente: 'OK', maxToken: 20 })
  riga(`testo: riuscito in ${Date.now() - inizio} ms, risposta "${r.slice(0, 40)}"`)
} catch (err) {
  esito = 1
  riga(`testo: NON riuscito. ${(err as Error).message}`)
}

if (process.env.AI_PROVA === 'immagine') {
  try {
    const inizio = Date.now()
    const img = await generaImmagine(c, 'Un vaso da esterno bianco, forma semplice, su sfondo neutro chiaro.', 'quadrata')
    riga(`immagine: riuscita in ${Date.now() - inizio} ms, ${img.mime}, ${Math.round(img.dati.length / 1024)} KB (non salvata)`)
  } catch (err) {
    esito = 1
    riga(`immagine: NON riuscita. ${(err as Error).message}`)
  }
}

process.exit(esito)
