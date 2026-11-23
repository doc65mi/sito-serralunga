/**
 * Specifiche tecniche della scheda prodotto — Version: 1.04.
 *
 * Fonti, senza aggiunte:
 * - progetto/specifiche/Specifiche_Tecniche_Serralunga.txt (estratto da "Technical Details" e
 *   "Colours & Fabrics" del catalogo Serralunga) e catalogo CATALOGUE_POOL.pdf, pagine 7, 49-62;
 * - testi delle tendine "Caratteristiche / Dimensioni / Istruzioni per la cura / Informazioni sulla
 *   spedizione" delle schede serralunga.com (src/data/schede-serralunga.json, oggi solo Cubotti Alto).
 *
 * Ogni regola vale solo per i prodotti che la fonte nomina (elenchi "Prodotti associati") o per il
 * materiale dichiarato (LLDPE): un prodotto non nominato non riceve la domanda né l'icona.
 * Icone ritagliate dal PDF in public/specifiche/ (AVIF + PNG).
 */
import type { Doc } from './cms'
import type { Lingua } from './lingua'
import SCHEDE from '../data/schede-serralunga.json'

export interface TestiScheda {
  caratteristiche?: string
  dimensioni?: string
  cura?: string
  spedizione?: string
  illuminazione?: string
}
export interface Icona { file: string; testo: string; nota?: string }
export interface Domanda { domanda: string; risposta: string; immagine?: { file: string; alt: string; w: number; h: number } }

type Scheda = { fonte: string; tag?: string[]; it?: TestiScheda; en?: TestiScheda }
const DATI = SCHEDE as unknown as Record<string, Scheda>

/** Testi delle tendine: campo del CMS se scritto, altrimenti scheda serralunga.com. */
export function testiScheda(p: Doc, lingua: Lingua): TestiScheda & { tag: string[] } {
  const s = DATI[p.fonteShopify || p.slug] || DATI[p.slug]
  const da = (s?.[lingua] || {}) as TestiScheda
  const cms = (p.scheda || {}) as TestiScheda
  const pulito = (x?: string) => (x || '').replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/\n{2,}/g, '\n').trim() || undefined
  return {
    caratteristiche: pulito(cms.caratteristiche || da.caratteristiche),
    dimensioni: pulito(cms.dimensioni || da.dimensioni),
    cura: pulito(cms.cura || da.cura),
    spedizione: pulito(cms.spedizione || da.spedizione),
    illuminazione: pulito(cms.illuminazione || da.illuminazione),
    tag: s?.tag || [],
  }
}

/** "lunghezza: 37 cm" → coppie etichetta/valore; righe senza ":" restano testo. */
export function righeMisure(t?: string): { etichetta: string; valore: string }[] {
  if (!t) return []
  return t
    .split('\n')
    .map((r) => r.match(/^\s*([^:]{2,30}):\s*(.+)$/))
    .filter((m): m is RegExpMatchArray => !!m)
    .map((m) => ({ etichetta: m[1].trim().replace(/^./, (c) => c.toUpperCase()), valore: m[2].trim() }))
}

// ---- Elenchi "Prodotti associati" della scheda tecnica (nomi come nel catalogo) ----

/** 03 Fissaggio a terra. */
const FISSAGGIO_TERRA = ['vas one', 'vas two', 'big bo', 'cone', 'primavera', 'versailles', 'bordato liscio', 'camelia', 'cassero', 'cubotti', 'cup', 'eufronio', 'fence', 'green pills', 'inorbita', 'june', 'kabin', 'liscio siena', 'lluna', 'marcantonio', 'memory pot', 'ming', 'missed tree', 'neoclassic', 'newpot', 'pisa', 'scarlett', 'sevres', 'sleeky', 'top pot', 'torre', 'tubini', 'uovo di colombo', 'vas three', 'vaso rettangolare', 'decorati', 'doppio bordo', 'graniglia', 'millerighe', 'kentia']
/** 05 Vasi a singola parete. */
const SINGOLA_PARETE = ['bordato liscio', 'camelia', 'cassero', 'cubotti', 'fence', 'lluna', 'neoclassic', 'sleeky', 'decorati', 'doppio bordo', 'graniglia', 'millerighe']
/** 05 Vasi a doppia parete. */
const DOPPIA_PARETE = ['vas one', 'vas two', 'big bo', 'cone', 'primavera', 'versailles', 'cup', 'eufronio', 'kabin', 'liscio siena', 'marcantonio', 'memory pot', 'ming', 'missed tree', 'newpot', 'pisa', 'scarlett', 'sevres', 'top pot', 'torre', 'tubini', 'uovo di colombo', 'vas three', 'vaso rettangolare']
/** 02 Linee disponibili anche nella versione "With Light" (impianto IP67 e drenaggio interno). */
const CON_LUCE = ['vas one', 'vas two', 'big bo', 'bordato liscio', 'cubotti', 'grand jane', 'grand mary', 'holly all', 'june', 'kabin', 'liscio siena', 'lluna', 'marcantonio', 'memory pot', 'ming', 'missed tree', 'new wave', 'newpot', 'princess', 'top pot', 'torre', 'tubini', 'uovo di colombo', 'vaso rettangolare']
/** 07 C: Moleskin. */
const MOLESKIN = ['cero', 'doggy', 'gatt one', 'juju', 'lounge cube', 'otto', 'pulcino', 'porcino', 'bay', 'pine beach', 'ripple', 'sirchester', 'duetto', 'loop', 'lindos', 'pic nic', 'memory pot', 'ming', 'newpot', 'aqua']

/** Colori standard Clean Fighter (pag. 55-56) e colori esclusi (scheda tecnica 07 A). */
const STANDARD = ['WH', 'IWH', 'WH5', 'BK', 'GG', 'SAV', 'WP', 'AV', 'TO', 'ANT', 'VMA', 'RCL', 'PR', 'VOC', 'RO', 'AQM', 'AZP', 'VB', 'TC2', 'TC4', 'T', 'GS']
const NON_CLEAN = ['NT', 'IMP', 'COR', 'DAL', 'ECO', 'LVB', 'LGS', 'LSA', 'LAQ', 'LWH', 'LAN', 'LBK', 'LRO', 'LRC', 'LTO', 'LMT', 'LAM', 'LCM', 'LSM', 'LTM', 'LCH', 'LGO', 'MAN', 'MTC', 'MWP', 'MVO', 'MGS', 'MPR', 'MT']

/** Clean Fighter del colore: true, false (escluso) o null (colore non in elenco). */
export function cleanFighter(codice?: string | null): boolean | null {
  const c = String(codice || '').toUpperCase().split(/[-_\s]/).pop() || ''
  if (STANDARD.includes(c)) return true
  if (NON_CLEAN.includes(c)) return false
  return null
}

const norm = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()

/** Specifiche applicabili al prodotto (icone e domande frequenti, in italiano). */
export function specifiche(p: Doc, testi: TestiScheda & { tag: string[] }, campioni: Doc[]) {
  const nome = ` ${norm(`${p.nome || ''} ${p.fonteShopify || p.slug || ''}`)} `
  const ha = (elenco: string[]) => elenco.some((k) => nome.includes(` ${k} `))
  const linea = (elenco: string[]) => elenco.find((k) => nome.includes(` ${k} `))
  const vaso = p.famiglia === 'vasi' || /\b(vaso|vasi|fioriera|planter|pot)\b/i.test(`${p.tipologia || ''} ${p.nome || ''}`)
  const conLuce = !!p.luce || / (con luce|with light) /.test(nome)
  const lldpe = (p.materiali || []).includes('polietilene') || /LLDPE/.test(testi.caratteristiche || '')
  const auMur = / au mur /.test(nome)
  const quadrato = testi.tag.some((t) => /^(square|rectangular)$/i.test(t)) || p.disegno?.quote?.forma === 'parallelepipedo'
  const tondo = testi.tag.some((t) => /^round$/i.test(t)) || ['cilindro', 'troncoConico'].includes(p.disegno?.quote?.forma)
  const codici = campioni.map((c) => c.codice)
  const conCF = codici.some((c) => cleanFighter(c) === true)
  const senzaCF = campioni.filter((c) => cleanFighter(c.codice) === false)
  const nomeLinea = (k?: string) => (k ? k.replace(/\b\w/g, (c) => c.toUpperCase()) : p.nome)

  const icone: Icona[] = []
  if (lldpe) {
    icone.push({ file: 'esterno', testo: 'Adatto ad uso esterno', nota: 'Protezione UV' })
    icone.push({ file: 'sale', testo: 'Resistente agli ambienti salini' })
  }
  if (conCF) icone.push({ file: 'clean-fighter', testo: 'Clean Fighter', nota: 'Colori standard' })
  if (senzaCF.length) icone.push({ file: 'non-clean-fighter', testo: 'Non Clean Fighter', nota: senzaCF.map((c) => c.codice).join(', ') })
  if (lldpe) icone.push({ file: 'fuoco', testo: 'Antifiamma UL94-V2', nota: 'Su richiesta' })

  const faq: Domanda[] = []
  if (lldpe) {
    faq.push({
      domanda: `Di che materiale è fatto ${p.nome} e a quali condizioni resiste?`,
      risposta:
        'È realizzato in polietilene lineare a bassa densità (LLDPE), 100% monomateriale, mediante stampaggio rotazionale. ' +
        'Il materiale è riciclabile al 100% e riutilizzabile, con una vita utile superiore a 10 anni, e resiste a escursioni termiche da −35 °C a +80 °C, agli urti, ai raggi UV e agli ambienti salini.',
    })
  }
  if (vaso && ha(SINGOLA_PARETE)) {
    faq.push({
      domanda: 'Si può piantare direttamente all’esterno? Servono fori di drenaggio?',
      risposta:
        `${nomeLinea(linea(SINGOLA_PARETE))} è un vaso a singola parete: all’esterno si usa come un vaso in terracotta, praticando con un comune trapano dei fori di drenaggio sul fondo (foratura Ø\u00a06\u00a0mm circa).`,
      immagine: { file: 'foratura-pareti', alt: 'Foratura del fondo: vaso a singola parete e vaso a doppia parete', w: 724, h: 651 },
    })
  } else if (vaso && ha(DOPPIA_PARETE)) {
    faq.push({
      domanda: 'Si può piantare direttamente all’esterno? Servono fori di drenaggio?',
      risposta:
        `${nomeLinea(linea(DOPPIA_PARETE))} è un vaso a doppia parete: se è munito di kit di drenaggio va rimosso il tappo interno prima dell’invasatura; se ne è sprovvisto vanno forati (Ø\u00a06\u00a0mm circa) sia la vasca interna sia il fondo esterno.`,
      immagine: { file: 'foratura-pareti', alt: 'Foratura del fondo: vaso a singola parete e vaso a doppia parete', w: 724, h: 651 },
    })
  }
  if (vaso) {
    faq.push({
      domanda: 'Come si riempie il vaso per la messa a dimora?',
      risposta:
        'Riempire il fondo per 1/3 dell’altezza con argilla espansa, che fa da riserva d’acqua trattenendo l’umidità in eccesso e rilasciandola quando serve; posare uno strato di tessuto drenante e completare con terriccio alleggerito per giardini pensili fino a circa 5 cm dal bordo. ' +
        'L’uso della sola terra comune è sconsigliato: si compatta, non drena e appesantisce la struttura oltre il consentito, con il rischio di deformare o danneggiare il vaso.',
      immagine: { file: 'invasatura', alt: 'Stratigrafia: 1/3 argilla espansa, tessuto drenante, 2/3 terriccio', w: 642, h: 552 },
    })
    faq.push({
      domanda: 'Si può usare come portavaso o in interni?',
      risposta:
        'Sì. Come portavaso (cachepot) si inserisce all’interno un semplice vaso in plastica a iniezione, con sottovaso facoltativo. In interni si procede con l’invasatura senza forare il prodotto' +
        (conLuce ? ' e senza rimuovere il tappino in PVC del kit di drenaggio.' : '.'),
    })
  }
  if (ha(FISSAGGIO_TERRA) && !auMur) {
    const piastre = quadrato ? '2 o 4 piastre, come indicato per i vasi quadrati e rettangolari' : tondo ? '3 piastre, come indicato per i vasi tondi' : '3 piastre per i vasi tondi, 2 o 4 per quelli quadrati e rettangolari'
    faq.push({
      domanda: 'Si può fissare a terra, per esempio su terrazze e spazi pubblici?',
      risposta:
        `Sì, con piastre in acciaio inox AISI 316 avvitate sul fondo: si consigliano ${piastre}. I tasselli per l’ancoraggio non sono inclusi e vanno scelti in base alla pavimentazione.`,
      immagine: { file: 'fissaggio-a-terra', alt: 'Fissaggio a terra con piastra in acciaio inox sul fondo del vaso', w: 940, h: 1158 },
    })
  }
  if (vaso && conLuce && ha(CON_LUCE)) {
    faq.push({
      domanda: 'Come si scarica l’acqua nella versione con luce?',
      risposta:
        'I vasi illuminati hanno un sistema interno di drenaggio: un tubo flessibile collega l’alloggiamento superiore al fondo ed è chiuso da un tappino in PVC. Per far defluire l’acqua in eccesso si rimuove il tappo all’interno del vaso.',
      immagine: { file: 'drenaggio', alt: 'Sistema di drenaggio dei vasi illuminati', w: 690, h: 1516 },
    })
  } else if (vaso && ha(CON_LUCE)) {
    faq.push({
      domanda: 'Esiste una versione illuminata?',
      risposta:
        `Sì: la linea ${nomeLinea(linea(CON_LUCE))} è disponibile anche nella versione With Light, con impianto luce IP67 e sistema interno di drenaggio dell’acqua.`,
    })
  }
  if (lldpe) {
    faq.push({
      domanda: 'È disponibile in versione antifiamma?',
      risposta:
        'Su richiesta si può utilizzare LLDPE addizionato con ritardante di fiamma, classificato V-2 secondo la normativa UL-94. Non tutti i prodotti sono fornibili in UL94-V2: la fattibilità per questo modello va verificata con l’ufficio commerciale Serralunga.',
    })
  }
  if (conCF) {
    faq.push({
      domanda: 'Che cos’è il trattamento Clean Fighter?',
      risposta:
        'È una miscela studiata nei laboratori Serralunga per rendere più facile la pulizia dei prodotti nei colori standard. Ne sono esclusi Neutro Luce (NT), Impruneta classica (IMP), le Special Nuance (Corten, Dalmata, Eco), Sleeky, i colori laccati e Moleskin.' +
        (senzaCF.length ? ` Per questo prodotto non è Clean Fighter: ${senzaCF.map((c) => `${c.nome} (${c.codice})`).join(', ')}.` : ''),
    })
  }
  if (ha(MOLESKIN) || (p.materiali || []).includes('moleskin')) {
    faq.push({
      domanda: 'Come si mantiene la finitura Moleskin?',
      risposta:
        'Moleskin è una lavorazione artigianale vellutata al tatto, riciclabile al 100% e resistente ai raggi UV e alle intemperie. Viene fornita con una spugna speciale per il ripristino della finitura e con le istruzioni per la pulizia.',
    })
  }
  return { icone, faq }
}
