/**
 * Version: 1.01
 * 1.01: Vivienda Residences nella sezione «Hotel e resort» di Installazioni (prima in «Residenze»): è una struttura
 *       ricettiva (hotel residence). Sui siti già avviati si sposta solo se categoria ed etichetta sono ancora quelle di partenza.
 * Case history aggiunte dopo il primo avvio e collegamento dei "Prodotti utilizzati" alle schede del Catalogo.
 *
 * - Vivienda Residences (Arabia Saudita): seconda case history (ordine 2), IT + EN. Foto: cartella del cliente
 *   «case-history/Vivienda Residences Saudi Arabia», copiate in template/assets/case-history/vivienda (JPEG ridotti a
 *   max 2400 px; il sito le serve in AVIF). I prodotti sono quelli indicati nei nomi dei file del cliente; materiali,
 *   designer e caratteristiche vengono dalle schede di serralunga.com. Nessun dato inventato: città, anno, committente,
 *   progettisti e quantità non sono indicati perché non risultano né dal materiale del cliente né da serralunga.com.
 * - Si crea solo se manca (per slug): se esiste già, anche modificata dal pannello, non si tocca.
 * - "Prodotti utilizzati": ogni voce si collega alla scheda del Catalogo (handle di serralunga.com), così la card porta
 *   alla scheda. Per La Loge du Massif la voce Canisse si collega alla Poltrona Canisse e si tolgono le righe provvisorie
 *   del template (cuscini «da confermare», note «quantità da confermare»), solo se sono ancora quelle di partenza.
 * - Sulle schede prodotto la case history si aggiunge in «Case history collegate» solo se quel campo è ancora vuoto.
 */
import type { Payload } from 'payload'

import { conIdRighe } from './contract'

type Media = (sorgente: string, alt: string) => Promise<number | null>
type Aggiorna = (a: Record<string, unknown>) => Promise<unknown>
type RiempiVuoti = (a: { collection: string; id: number | string; data: Record<string, unknown>; locale?: string }) => Promise<unknown>

const F = 'assets/case-history/vivienda'

/** Voci "Prodotti utilizzati" di Vivienda: handle della scheda su serralunga.com (= fonteShopify / slug nel Catalogo). */
const VOCI_VIVIENDA = [
  { handle: 'ming-high-planter', it: { nome: 'Vaso Ming High', sotto: 'Vaso · design Rodolfo Dordoni · LLDPE' }, en: { nome: 'Ming High planter', sotto: 'Planter · design Rodolfo Dordoni · LLDPE' }, foto: 'vivienda-corte-vasi-ming.jpg', alt: 'Corte interna con file di vasi Ming' },
  { handle: 'kabin-maxi-planter-with-light', it: { nome: 'Vaso Kabin Maxi con luce', sotto: 'Vaso con luce · design Luisa Bocchietto · LLDPE' }, en: { nome: 'Kabin Maxi planter with light', sotto: 'Light-up planter · design Luisa Bocchietto · LLDPE' }, foto: 'vivienda-patio-kabin-maxi-luce.jpg', alt: 'Vaso Kabin Maxi con luce in un patio lungo la vasca' },
  { handle: 'barceloneta-armchair', it: { nome: 'Poltrona Barceloneta', sotto: 'Poltrona · design Raffaella Mangiarotti · poliuretano e acciaio inox' }, en: { nome: 'Barceloneta armchair', sotto: 'Armchair · design Raffaella Mangiarotti · polyurethane and stainless steel' }, foto: 'vivienda-terrazza-barceloneta-tramonto.jpg', alt: 'Poltrone Barceloneta su una terrazza privata al tramonto' },
  { handle: 'solea-chair-set-of-4', it: { nome: 'Sedia Solea', sotto: 'Sedia · design Giovanni Giacobone e Massimo Roj · LLDPE' }, en: { nome: 'Solea chair', sotto: 'Chair · design Giovanni Giacobone and Massimo Roj · LLDPE' }, foto: 'vivienda-piscina-solea-ming.jpg', alt: 'Sedie Solea a bordo piscina' },
  { handle: 'lazy-lettino-sunbed', it: { nome: 'Lettino Lazy', sotto: 'Lettino · design Michel Boucquillon · alluminio e tessuto Batyline' }, en: { nome: 'Lazy sunbed', sotto: 'Sunbed · design Michel Boucquillon · aluminium and Batyline fabric' }, foto: 'vivienda-piscina-cone-vas-one-lazy.jpg', alt: 'Lettini Lazy e vasi Cone e Vas-One lungo la piscina' },
  { handle: 'cone-planter', it: { nome: 'Vaso Cone', sotto: 'Vaso · design Naoto Fukasawa · LLDPE' }, en: { nome: 'Cone planter', sotto: 'Planter · design Naoto Fukasawa · LLDPE' }, foto: '', alt: '' },
  { handle: 'vas-one-planter', it: { nome: 'Vaso Vas-One', sotto: 'Vaso · design Luisa Bocchietto · LLDPE' }, en: { nome: 'Vas-One planter', sotto: 'Planter · design Luisa Bocchietto · LLDPE' }, foto: '', alt: '' },
  { handle: 'cup-big-planter', it: { nome: 'Vaso Cup Big', sotto: 'Vaso · design Naoto Fukasawa · LLDPE' }, en: { nome: 'Cup Big planter', sotto: 'Planter · design Naoto Fukasawa · LLDPE' }, foto: 'vivienda-corte-cup-solea.jpg', alt: 'Vasi Cup e sedute Solea in una corte' },
]

async function viviendaIt(m: Media) {
  const f = (nome: string, alt: string) => m(`${F}/${nome}`, alt)
  return {
    nome: 'Vivienda Residences',
    slug: 'vivienda-residences',
    ordine: 2,
    categoria: 'hotel',
    kicker: 'Case history — Arabia Saudita',
    titolo: 'Vivienda\nResidences',
    introduzione:
      'Corti, piscine e terrazze private di un complesso residenziale in Arabia Saudita: vasi, anche con luce, sedute e lettini Serralunga disegnano gli spazi esterni dal giorno alla sera.',
    etichetta: 'Vasi con luce, sedute e lettini',
    immagine: await f('vivienda-corte-vasi-ming.jpg', 'Vivienda Residences, corte interna con file di vasi Ming illuminati'),
    card: {
      etichetta: 'Hotel e residenze · Arabia Saudita',
      titolo: 'Vivienda Residences: corti e piscine arredate con vasi e sedute Serralunga',
      immagine: await f('vivienda-piscina-palme-vista-alto.jpg', 'Vivienda Residences, piscina tra le palme vista dall’alto'),
    },
    progetto: {
      kicker: 'Il progetto',
      titolo: 'Spazi esterni\nda vivere fino a sera',
      paragrafi: [
        {
          testo:
            'Vivienda Residences è un complesso residenziale in Arabia Saudita organizzato attorno a corti interne, vasche d’acqua, piscine e terrazze private. Gli spazi aperti fanno parte dell’abitare: si attraversano, si usano per sostare e, come mostrano gli scatti del progetto, restano vissuti anche dopo il tramonto.',
        },
        {
          testo:
            'La fornitura Serralunga riunisce vasi in polietilene stampato in rotazionale, anche nella versione con luce, le poltrone Barceloneta, le sedie Solea e i lettini Lazy: un solo linguaggio per patii, bordi piscina e terrazze.',
        },
      ],
      scheda: [
        { etichetta: 'Luogo', valore: 'Arabia Saudita' },
        { etichetta: 'Tipologia', valore: 'Complesso residenziale' },
        { etichetta: 'Ambienti', valore: 'Corti, piscine, patii e terrazze' },
        { etichetta: 'Vasi', valore: 'Ming, Kabin Maxi con luce, Cup, Cone, Vas-One' },
        { etichetta: 'Sedute', valore: 'Poltrone Barceloneta, sedie Solea, lettini Lazy' },
        { etichetta: 'Uso', valore: 'Esterni' },
      ],
    },
    citazione: {
      testo: 'Di sera sono i vasi luminosi a disegnare corti e percorsi.',
      immagine: await f('vivienda-giardino-palme-sera.jpg', 'Giardino con palme e vasi illuminati la sera'),
    },
    passi: [
      {
        titolo: 'Il contesto',
        testo: 'Spazi esterni da arredare con un linguaggio coerente: corti strette tra le facciate, vasche e piscine, patii privati e terrazze sui tetti.',
      },
      {
        titolo: 'La scelta',
        testo:
          'Vasi in LLDPE tinto in massa, protetto dai raggi UV e riciclabile al 100%, prodotti con stampaggio rotazionale; versioni con luce per i percorsi serali; sedute e lettini pensati per l’esterno.',
      },
      {
        titolo: 'Il risultato',
        testo: 'Il bianco di vasi e sedute accompagna le facciate chiare; di sera i vasi con luce segnano i bordi delle vasche e le file di palme.',
      },
    ],
    coppiaImmagini: [
      { immagine: await f('vivienda-terrazza-barceloneta-idromassaggio.jpg', 'Terrazza privata con idromassaggio e poltrone Barceloneta'), allineamento: 'centro' },
      { immagine: await f('vivienda-patio-kabin-maxi-luce.jpg', 'Patio lungo la vasca con vaso Kabin Maxi con luce'), allineamento: 'centro' },
    ].filter((i) => i.immagine),
    protagonista: {
      kicker: 'Il pezzo protagonista',
      titolo: 'Ming,\nil vaso che scandisce la corte',
      testo:
        'Disegnato da Rodolfo Dordoni, Ming ritma le corti interne di Vivienda Residences in file regolari. Un volume pulito in polietilene, stampato in un pezzo unico, pensato per stare all’esterno.',
      dati: [
        { etichetta: 'Design', valore: 'Rodolfo Dordoni' },
        { etichetta: 'Materiale', valore: 'LLDPE, polietilene lineare a bassa densità' },
        { etichetta: 'Produzione', valore: 'Stampaggio rotazionale' },
      ],
      immagine: await f('vivienda-vasi-luminosi-vasca.jpg', 'Vasi Ming illuminati lungo una vasca'),
    },
    diario: {
      titolo: 'Il diario\ndel progetto',
      testo: 'Corti, piscine e terrazze di Vivienda Residences: gli scatti del progetto, dal giorno alla sera.',
      immagini: (
        await Promise.all(
          [
            ['vivienda-piscina-palme-vista-alto.jpg', 'Piscina tra le palme vista dall’alto'],
            ['vivienda-piscina-lunga-notte.jpg', 'Piscina lunga tra le residenze, di notte'],
            ['vivienda-piscina-cone-vas-one-lazy.jpg', 'Lettini Lazy e vasi Cone e Vas-One lungo la piscina'],
            ['vivienda-corte-cup-solea.jpg', 'Vasi Cup e sedute Solea in una corte'],
            ['vivienda-piscina-solea-ming.jpg', 'Sedie Solea e vasi Ming a bordo piscina, di sera'],
            ['vivienda-piscina-solea-ming-2.jpg', 'Piscina privata con sedie Solea e vasi Ming'],
            ['vivienda-patio-barceloneta-sera.jpg', 'Patio con poltrone Barceloneta la sera'],
            ['vivienda-veranda-barceloneta.jpg', 'Veranda con poltrone Barceloneta e vaso con luce'],
            ['vivienda-terrazza-barceloneta-tramonto.jpg', 'Terrazza con idromassaggio e poltrone Barceloneta al tramonto'],
            ['vivienda-patio-barceloneta-soggiorno.jpg', 'Patio con poltrone Barceloneta davanti al soggiorno'],
            ['vivienda-balcone-barceloneta.jpg', 'Balcone con poltrona Barceloneta e vaso'],
            ['vivienda-ingresso-vasi-ming.jpg', 'Ingresso con vasi Ming'],
            ['vivienda-piscina-privata-vasi.jpg', 'Piscina privata con vasi'],
            ['vivienda-terrazza-panoramica.jpg', 'Terrazza panoramica sul tetto con lettini'],
            ['vivienda-terrazza-panoramica-2.jpg', 'Terrazza panoramica sul tetto'],
            ['vivienda-terrazza-panoramica-3.jpg', 'Terrazza sul tetto con sedute'],
            ['vivienda-spa-interna.jpg', 'Area relax interna delle residenze'],
          ].map(async ([n, a]) => ({ immagine: await f(n, a) })),
        )
      ).filter((i) => i.immagine),
      segnaposto: '',
    },
    prodottiUsati: {
      kicker: 'Prodotti utilizzati',
      titolo: 'Cosa c’è\nin queste corti',
      testo:
        'La fornitura per Vivienda Residences: vasi, anche con luce, poltrone, sedie e lettini dal catalogo Serralunga. Ogni scheda riporta varianti, misure e codici articolo.',
      voci: await Promise.all(
        // Senza foto propria (Cone, Vas-One: nella foto del cliente sono insieme ai lettini Lazy) la card usa la foto della scheda.
        VOCI_VIVIENDA.map(async (v) => ({ nome: v.it.nome, sottotitolo: v.it.sotto, immagine: v.foto ? await f(v.foto, v.alt) : null })),
      ),
    },
    contatto: {
      kicker: 'Il prossimo progetto',
      titolo: 'Corti, piscine e terrazze:\nparliamo del vostro progetto',
      testo: 'Selezione dei pezzi, colori e versioni con luce, consegne programmate per fasi di cantiere.',
    },
    seo: {
      titolo: 'Vivienda Residences, Arabia Saudita | Serralunga',
      descrizione:
        'Case history: vasi Ming, Kabin Maxi con luce, Cup, Cone e Vas-One, poltrone Barceloneta, sedie Solea e lettini Lazy a Vivienda Residences, Arabia Saudita.',
    },
  }
}

const viviendaEn = {
  nome: 'Vivienda Residences',
  kicker: 'Case history — Saudi Arabia',
  titolo: 'Vivienda\nResidences',
  introduzione:
    'Courtyards, pools and private terraces in a residential complex in Saudi Arabia: Serralunga planters, including light-up versions, seating and sunbeds shape the outdoor spaces from day into evening.',
  etichetta: 'Light-up planters, seating and sunbeds',
  card: {
    etichetta: 'Hotels and residences · Saudi Arabia',
    titolo: 'Vivienda Residences: courtyards and pools furnished with Serralunga planters and seating',
  },
  progetto: {
    kicker: 'The project',
    titolo: 'Outdoor spaces\nlived in until evening',
    paragrafi: [
      {
        testo:
          'Vivienda Residences is a residential complex in Saudi Arabia laid out around inner courtyards, water features, pools and private terraces. The open spaces are part of everyday living: people walk through them, pause in them and, as the project photos show, keep using them after sunset.',
      },
      {
        testo:
          'The Serralunga supply brings together rotomoulded polyethylene planters, including light-up versions, Barceloneta armchairs, Solea chairs and Lazy sunbeds: one language for patios, poolsides and terraces.',
      },
    ],
    scheda: [
      { etichetta: 'Location', valore: 'Saudi Arabia' },
      { etichetta: 'Type', valore: 'Residential complex' },
      { etichetta: 'Spaces', valore: 'Courtyards, pools, patios and terraces' },
      { etichetta: 'Planters', valore: 'Ming, Kabin Maxi with light, Cup, Cone, Vas-One' },
      { etichetta: 'Seating', valore: 'Barceloneta armchairs, Solea chairs, Lazy sunbeds' },
      { etichetta: 'Use', valore: 'Outdoors' },
    ],
  },
  citazione: { testo: 'In the evening, light-up planters trace the courtyards and paths.' },
  passi: [
    { titolo: 'The setting', testo: 'Outdoor spaces to furnish in a consistent language: narrow courtyards between façades, water features and pools, private patios and rooftop terraces.' },
    {
      titolo: 'The choice',
      testo: 'Planters in mass-coloured, UV-protected, 100% recyclable LLDPE made by rotational moulding; light-up versions for evening paths; seating and sunbeds designed for outdoor use.',
    },
    { titolo: 'The result', testo: 'The white of planters and seating matches the pale façades; in the evening the light-up planters mark the edges of the pools and the rows of palms.' },
  ],
  protagonista: {
    kicker: 'The leading piece',
    titolo: 'Ming,\nthe planter that sets the rhythm of the courtyard',
    testo:
      'Designed by Rodolfo Dordoni, Ming sets the rhythm of the inner courtyards of Vivienda Residences in regular rows. A clean polyethylene volume, moulded in a single piece, made for outdoor use.',
    dati: [
      { etichetta: 'Design', valore: 'Rodolfo Dordoni' },
      { etichetta: 'Material', valore: 'LLDPE, linear low-density polyethylene' },
      { etichetta: 'Production', valore: 'Rotational moulding' },
    ],
  },
  diario: {
    titolo: 'The project\ndiary',
    testo: 'Courtyards, pools and terraces at Vivienda Residences: project photos from day into evening.',
    segnaposto: '',
  },
  prodottiUsati: {
    kicker: 'Products used',
    titolo: 'What’s in\nthese courtyards',
    testo: 'The supply for Vivienda Residences: planters, including light-up versions, armchairs, chairs and sunbeds from the Serralunga catalogue. Each product sheet lists variants, dimensions and item codes.',
    voci: VOCI_VIVIENDA.map((v) => ({ nome: v.en.nome, sottotitolo: v.en.sotto })),
  },
  contatto: {
    kicker: 'The next project',
    titolo: 'Courtyards, pools and terraces:\nlet’s talk about your project',
    testo: 'Selection of pieces, colours and light-up versions, deliveries scheduled by construction phase.',
  },
  seo: {
    titolo: 'Vivienda Residences, Saudi Arabia | Serralunga',
    descrizione:
      'Case history: Ming, Kabin Maxi, Cup, Cone and Vas-One planters, Barceloneta armchairs, Solea chairs and Lazy sunbeds at Vivienda Residences, Saudi Arabia.',
  },
}

/** Id della scheda del Catalogo per handle di serralunga.com (null se il prodotto non è nel Catalogo di questo sito). */
async function schedaPer(payload: Payload, handle: string): Promise<number | null> {
  const r = await payload.find({
    collection: 'prodotti',
    where: { or: [{ fonteShopify: { equals: handle } }, { slug: { equals: handle } }] },
    limit: 1,
    depth: 0,
    draft: true,
  })
  return (r.docs[0]?.id as number | undefined) ?? null
}

/** Aggiunge la case history alla scheda prodotto, solo se «Case history collegate» è ancora vuoto. */
async function collegaAScheda(prodotto: number, caso: number, riempiVuoti: RiempiVuoti) {
  await riempiVuoti({ collection: 'prodotti', id: prodotto, data: { caseHistory: [caso] } })
}

type Voce = { id?: string; prodotto?: number | null; nome?: string; nota?: string | null; segnapostoImmagine?: string | null; [k: string]: unknown }

export async function completaCaseHistory(
  payload: Payload,
  media: Media,
  opz: { aggiorna: Aggiorna; riempiVuoti: RiempiVuoti },
  log: (m: string) => void,
) {
  // 1. Vivienda Residences: si crea solo se manca.
  const esiste = await payload.find({ collection: 'case-history', where: { slug: { equals: 'vivienda-residences' } }, limit: 1, depth: 0, draft: true })
  let vivienda = esiste.docs[0]?.id as number | undefined
  if (!vivienda) {
    const it = await viviendaIt(media)
    const doc = (await payload.create({ collection: 'case-history', depth: 0, data: { ...it, _status: 'published' } as never })) as unknown as Record<string, unknown>
    vivienda = doc.id as number
    await payload.update({ collection: 'case-history', id: vivienda, locale: 'en', depth: 0, data: { ...(conIdRighe(viviendaEn, doc) as object), _status: 'published' } as never })
    log('creata la case history Vivienda Residences (IT + EN)')
  }

  // 1b. Case history 1.01: da «Residenze» a «Hotel e resort», solo se nessuno ha cambiato categoria o etichetta.
  {
    const it = (await payload.findByID({ collection: 'case-history', id: vivienda, depth: 0, draft: true })) as unknown as { categoria?: string; card?: Record<string, unknown> }
    if (it.categoria === 'resid') {
      await opz.aggiorna({ collection: 'case-history', id: vivienda, depth: 0, data: { categoria: 'hotel', ...(it.card?.etichetta === 'Residenze · Arabia Saudita' ? { card: { ...it.card, etichetta: 'Hotel e residenze · Arabia Saudita' } } : {}) } })
      const en = (await payload.findByID({ collection: 'case-history', id: vivienda, locale: 'en', fallbackLocale: false as never, depth: 0, draft: true })) as unknown as { card?: Record<string, unknown> }
      if (en.card?.etichetta === 'Residences · Saudi Arabia')
        await opz.aggiorna({ collection: 'case-history', id: vivienda, locale: 'en', depth: 0, data: { card: { ...en.card, etichetta: 'Hotels and residences · Saudi Arabia' } } })
      log('Vivienda Residences: spostata in Installazioni › Hotel e resort')
    }
  }

  // 2. Vivienda: voci collegate alle schede del Catalogo (solo le voci ancora senza scheda, con lo stesso nome di partenza).
  {
    const doc = (await payload.findByID({ collection: 'case-history', id: vivienda, depth: 0, draft: true })) as unknown as { prodottiUsati?: { voci?: Voce[] } }
    const voci = [...(doc.prodottiUsati?.voci || [])]
    let collegate = 0
    for (const v of voci) {
      const modello = VOCI_VIVIENDA.find((x) => x.it.nome === v.nome)
      if (!modello || v.prodotto) continue
      const id = await schedaPer(payload, modello.handle)
      if (id) {
        v.prodotto = id
        collegate++
      }
    }
    if (collegate) {
      await opz.aggiorna({ collection: 'case-history', id: vivienda, depth: 0, data: { prodottiUsati: { ...doc.prodottiUsati, voci } } })
      log(`Vivienda Residences: ${collegate} prodotti utilizzati collegati alle schede del Catalogo`)
    }
    for (const v of voci) if (v.prodotto) await collegaAScheda(v.prodotto, vivienda, opz.riempiVuoti)
    const mancanti = VOCI_VIVIENDA.filter((x) => !voci.some((v) => v.nome === x.it.nome && v.prodotto))
    if (mancanti.length) log(`Vivienda Residences: schede non presenti nel Catalogo (voce senza link): ${mancanti.map((x) => x.handle).join(', ')}`)
  }

  // 3. La Loge du Massif: Canisse collegata alla Poltrona Canisse; via le righe provvisorie del template.
  const loge = await payload.find({ collection: 'case-history', where: { slug: { equals: 'la-loge-du-massif' } }, limit: 1, depth: 0, draft: true })
  const caso = loge.docs[0] as unknown as { id: number; prodottiUsati?: { voci?: Voce[] } } | undefined
  if (caso) {
    const canisse = await schedaPer(payload, 'canisse-armchair')
    const prima = caso.prodottiUsati?.voci || []
    let cambiato = false
    const voci = prima
      .filter((v) => {
        // Riga del template mai compilata: non è un prodotto del Catalogo.
        const provvisoria = v.nome === 'Cuscini di seduta' && !v.prodotto && v.nota === 'codice e quantità da confermare'
        if (provvisoria) cambiato = true
        return !provvisoria
      })
      .map((v) => {
        if (v.nome !== 'Poltrona Canisse') return v
        const nuova = { ...v }
        if (!v.prodotto && canisse) {
          nuova.prodotto = canisse
          cambiato = true
        }
        if (v.nota === 'quantità in opera da confermare') {
          nuova.nota = null
          cambiato = true
        }
        return nuova
      })
    if (cambiato) {
      await opz.aggiorna({ collection: 'case-history', id: caso.id, depth: 0, data: { prodottiUsati: { ...caso.prodottiUsati, voci } } })
      // La nota è tradotta: si toglie anche in inglese, solo se è ancora quella di partenza.
      const en = (await payload.findByID({ collection: 'case-history', id: caso.id, locale: 'en', fallbackLocale: false as never, depth: 0, draft: true })) as unknown as { prodottiUsati?: { voci?: Voce[] } }
      const vociEn = (en.prodottiUsati?.voci || []).map((v) => (/to be confirmed/i.test(v.nota || '') ? { ...v, nota: null } : v))
      if (vociEn.some((v, k) => v.nota !== en.prodottiUsati?.voci?.[k]?.nota))
        await opz.aggiorna({ collection: 'case-history', id: caso.id, locale: 'en', depth: 0, data: { prodottiUsati: { ...en.prodottiUsati, voci: vociEn } } })
      log(`La Loge du Massif: prodotti utilizzati ${canisse ? 'collegati alla Poltrona Canisse del Catalogo' : 'ripuliti (Poltrona Canisse non presente nel Catalogo)'}`)
    }
    if (canisse) await collegaAScheda(canisse, caso.id, opz.riempiVuoti)
  }
}
