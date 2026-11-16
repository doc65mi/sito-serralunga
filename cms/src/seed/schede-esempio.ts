/**
 * Version: 1.00
 * Disegno quotato e campioni colore (quadrati 30×30) sulle prime schede del Catalogo.
 *
 * Dati presi da serralunga.com (16/11/2026), mai inventati:
 * - Vaso Cubotti Alto (Nat Wave): lunghezza 37 cm, larghezza 37 cm, altezza 90 cm, peso 8,5 kg;
 *   colori a listino Bianco, Tortora di Torino, Antracite, Terracotta Scura, Azzurro di Provenza, Salvia di Sardegna,
 *   Rosso, Terracotta Toscana, Verde Pavone, Giallo Sahara, Verde British, Rosso Pompeiano (più Corten,
 *   che è una finitura e non sta nella cartella colori).
 * - Vaso Vas-Two (Luisa Bocchietto): diametro 160 cm, altezza 150 cm, peso 41,5 kg; varianti con codice
 *   VASTWO-ANT, -WH, -AZP, -LWH, -RO, -SAV, -TO, -GS, -VB, -PR. Il diametro di base non è dichiarato:
 *   il disegno lo lascia senza quota (svasatura indicativa).
 *
 * Si scrivono solo i campi ancora vuoti (vedi riempiVuoti in prudenza.ts): ciò che la redazione ha
 * compilato dal pannello resta com'è. Calcola anche il colore pieno dei campioni della cartella colori.
 */
import type { Payload } from 'payload'

import { coloreMedio } from '../fields/coloreMedio'

type Riempi = (a: { collection: string; id: number | string; data: Record<string, unknown>; locale?: string }) => Promise<unknown>

const FONTE = { it: 'Misure dichiarate nella scheda serralunga.com', en: 'Measurements as stated on serralunga.com' }

export const SCHEDE_ESEMPIO = [
  {
    handle: 'cubotti-alto-planter',
    quote: { forma: 'parallelepipedo', larghezza: 37, profondita: 37, altezza: 90, peso: 8.5 },
    colori: ['WH', 'TO', 'ANT', 'TC4', 'AZP', 'SAV', 'RO', 'T', 'WP', 'GS', 'VB', 'PR'],
  },
  {
    handle: 'vas-two-planter',
    quote: { forma: 'troncoConico', diametro: 160, altezza: 150, peso: 41.5 },
    colori: ['ANT', 'WH', 'AZP', 'LWH', 'RO', 'SAV', 'TO', 'GS', 'VB', 'PR'],
  },
]

export async function completaSchedeEsempio(payload: Payload, riempi: Riempi, log: (m: string) => void) {
  // 1. Colore pieno dei campioni della cartella colori (dalla foto del campione).
  const colori = await payload.find({ collection: 'colori', limit: 200, depth: 0, sort: 'ordine' })
  const tutti = colori.docs as unknown as { id: number; codice: string; hex?: string | null; campione?: number | null }[]
  let calcolati = 0
  for (const c of tutti) {
    if (c.hex || !c.campione) continue
    const hex = await coloreMedio(payload, c.campione)
    if (hex && (await riempi({ collection: 'colori', id: c.id, data: { hex } }))) calcolati++
  }
  if (calcolati) log(`cartella colori: colore pieno calcolato per ${calcolati} campioni`)

  // 2. Schede prodotto di esempio.
  const perCodice = new Map<string, number>()
  for (const c of tutti) if (!perCodice.has(c.codice)) perCodice.set(c.codice, c.id)
  for (const s of SCHEDE_ESEMPIO) {
    const r = await payload.find({ collection: 'prodotti', where: { fonteShopify: { equals: s.handle } }, limit: 1, depth: 0, draft: true })
    const p = r.docs[0] as unknown as { id: number } | undefined
    if (!p) {
      log(`scheda ${s.handle} non ancora importata: disegno e colori al prossimo aggiornamento`)
      continue
    }
    const campioni = s.colori.map((k) => perCodice.get(k)).filter((x): x is number => typeof x === 'number')
    await riempi({
      collection: 'prodotti',
      id: p.id,
      data: { disegno: { quote: { ...s.quote, fonte: FONTE.it } }, ...(campioni.length ? { campioni } : {}) },
    })
    try {
      await riempi({ collection: 'prodotti', id: p.id, locale: 'en', data: { disegno: { quote: { fonte: FONTE.en } } } })
    } catch (e) {
      // Scheda senza testi inglesi obbligatori (es. nome): la fonte in inglese si aggiunge dal pannello.
      log(`scheda ${s.handle}: fonte delle misure in inglese non salvata (${(e as Error).message})`)
    }
  }
}
