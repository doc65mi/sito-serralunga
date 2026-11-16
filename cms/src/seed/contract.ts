/**
 * Sezione Contract (Version: 1.00): contenuti di partenza in italiano e inglese.
 *
 * Fonti: serralunga.com/pages/contract (Progetti, Le nostre competenze, All'italiana,
 * Personalizzazione, categorie Hotel / Bar e ristoranti / Progettazione urbana / Uffici e le loro foto),
 * serralunga.com/collections/urban-furniture (gli otto prodotti dell'arredo urbano, letti dalla scheda
 * del prodotto al momento del seed), serralunga.com/pages/serralunga-catalogs (i quattro cataloghi,
 * già nei box della home), reservedarea.serralunga.com (accesso dell'area riservata).
 * I testi sono una riscrittura redazionale di quelle pagine per un pubblico B2B: niente dati nuovi.
 * Le didascalie della galleria vengono dal nome dei file su serralunga.com: da far confermare al cliente.
 */
type Media = (sorgente: string, alt: string) => Promise<number | null>
type Dati = Record<string, unknown>

const I = 'https://serralunga.com/cdn/shop/files'
const FOTO = {
  progetto: `${I}/Contracts_projet_inspo.jpg`,
  residenziale: `${I}/ResidentialContractFurniture.jpg`,
  storia: `${I}/storia_5e3ef214-3e06-4c94-ad73-ac8b8d312ce6.jpg`,
  catalogo: `${I}/Serralunga_catalog_front.jpg?v=1750701072`,
  fletcher: `${I}/2013_Fletcher-Hotel-Amsterdam_atmosfera_20140523095406_720x_1de49ad1-9b8b-4abc-83b5-37d46dbe6057.jpg`,
  vapiano: `${I}/VAPIANO-RESTAURANT_GRAZ_20140523122402_1090x_86738c92-5ffc-413e-90ac-f5c0fb76e0ff.jpg`,
  porlezza: `${I}/2007_Porlezza_bar_612_740_20140523101826_1090x_3c9d2281-a566-4a39-9b63-89a28bc5f777.jpg`,
  villaOlmo: `${I}/villaolmo_1_20140324110026_1090x_c347fcc5-cf68-45c0-ac44-f1c799f4a10e.jpg`,
  capoOrlando: `${I}/capo_20d_20orlando_20villas_20resort_203_20150616113336_1090x_17512bb3-6f5c-4364-abfd-60f815ce256e.jpg`,
  yacht: `${I}/yacht_club_01_20140324105729_1090x_e287601d-3ec1-4531-bbc3-34b11d2b0ef5.jpg`,
  southBeach: `${I}/south_beach01_20140324102731_1090x_1.jpg`,
  rapallo: `${I}/rapallo01_20140320180226_1090x_e68783d9-2749-4250-9f6b-f155df4d5faf.jpg`,
  primavera: `${I}/primavera-_belle_etoile_-_primavera.jpg`,
  shop: `${I}/shop_miles01_20140321163126_1090x_9366a0af-6f5e-4d4c-acce-b8aebe4708e2.jpg`,
  showroom: `${I}/mercedes01_20140321170031_1090x_6c31b0b5-5a4e-4692-a812-13eb241348f8.jpg`,
}

/** Prodotti della collezione "Arredo urbano" di serralunga.com (handle della scheda). */
const URBANO: { h: string; tipo?: [string, string] }[] = [
  { h: 'big-bo-planter', tipo: ['Fioriera', 'Planter'] },
  { h: 'big-bo-planter-with-light', tipo: ['Fioriera luminosa', 'Illuminated planter'] },
  { h: 'cone-planter', tipo: ['Fioriera', 'Planter'] },
  { h: 'cone-planter-with-light', tipo: ['Fioriera luminosa', 'Illuminated planter'] },
  { h: 'onda' },
  { h: 'primavera-planter', tipo: ['Fioriera', 'Planter'] },
  { h: 'primavera-planter-with-light', tipo: ['Fioriera luminosa', 'Illuminated planter'] },
  { h: 'versailles-planter', tipo: ['Fioriera', 'Planter'] },
]

type Scheda = { title?: string; images?: { src?: string }[] }
async function scheda(url: string): Promise<Scheda | null> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30_000) })
    if (!res.ok) return null
    return ((await res.json()) as { product?: Scheda }).product ?? null
  } catch {
    return null
  }
}

/** Nome, foto e indirizzo letti dalla scheda di serralunga.com: se il sito non risponde la voce si salta. */
async function prodottiUrbano(media: Media) {
  const it: Dati[] = []
  const en: Dati[] = []
  for (const p of URBANO) {
    const [sIt, sEn] = await Promise.all([scheda(`https://serralunga.com/products/${p.h}.json`), scheda(`https://serralunga.com/en/products/${p.h}.json`)])
    if (!sIt?.title) continue
    const foto = sIt.images?.[0]?.src
    const immagine = foto ? await media(foto, `${sIt.title}, Serralunga`) : null
    it.push({ url: `https://serralunga.com/products/${p.h}`, nome: sIt.title, tipo: p.tipo?.[0], immagine })
    en.push({ url: `https://serralunga.com/en/products/${p.h}`, nome: sEn?.title || sIt.title, tipo: p.tipo?.[1], immagine })
  }
  return { it, en }
}

const PUNTI_CTA = {
  it: {
    kicker: 'Ufficio contract',
    titolo: 'Raccontateci\nil vostro progetto',
    testo: 'Dimensioni, colori e finiture dedicate, con il supporto del nostro ufficio contract.',
    pulsante: 'Invia la richiesta',
    grazie: 'Grazie: l’ufficio contract vi ricontatterà a breve.',
  },
  en: {
    kicker: 'Contract office',
    titolo: 'Tell us about\nyour project',
    testo: 'Dedicated sizes, colours and finishes, with the support of our contract office.',
    pulsante: 'Send the request',
    grazie: 'Thank you: our contract office will be in touch shortly.',
  },
}

export interface PaginaContractSeed { sezione: string; ordine: number; it: Dati; en: Dati }

export async function contractDati(media: Media): Promise<PaginaContractSeed[]> {
  const f = async (k: keyof typeof FOTO, alt: string) => media(FOTO[k], alt)
  const urbano = await prodottiUrbano(media)

  const galleriaHosp = [
    { immagine: await f('fletcher', 'Arredi Serralunga nel Fletcher Hotel di Amsterdam'), it: 'Fletcher Hotel, Amsterdam', en: 'Fletcher Hotel, Amsterdam' },
    { immagine: await f('vapiano', 'Arredi Serralunga nel ristorante Vapiano di Graz'), it: 'Vapiano, Graz', en: 'Vapiano, Graz' },
    { immagine: await f('capoOrlando', 'Arredi Serralunga al Capo d’Orlando Villas Resort'), it: 'Capo d’Orlando Villas Resort', en: 'Capo d’Orlando Villas Resort' },
    { immagine: await f('porlezza', 'Arredi Serralunga in un bar di Porlezza'), it: 'Bar, Porlezza', en: 'Bar, Porlezza' },
    { immagine: await f('villaOlmo', 'Arredi Serralunga a Villa Olmo'), it: 'Villa Olmo', en: 'Villa Olmo' },
    { immagine: await f('yacht', 'Arredi Serralunga in uno yacht club'), it: 'Yacht club', en: 'Yacht club' },
  ].filter((g) => g.immagine)
  const galleriaHome = [
    { immagine: await f('rapallo', 'Progetto contract Serralunga a Rapallo'), it: 'Rapallo', en: 'Rapallo' },
    { immagine: await f('southBeach', 'Progetto contract Serralunga in un locale sulla spiaggia'), it: '', en: '' },
    { immagine: await f('yacht', 'Arredi Serralunga in uno yacht club'), it: 'Yacht club', en: 'Yacht club' },
  ].filter((g) => g.immagine)
  const galleriaUrb = [
    { immagine: await f('primavera', 'Fioriere Primavera di Serralunga in uno spazio pubblico'), it: 'Primavera', en: 'Primavera' },
    { immagine: await f('shop', 'Fioriere Serralunga davanti a uno spazio commerciale'), it: '', en: '' },
    { immagine: await f('showroom', 'Fioriere Serralunga in uno showroom'), it: '', en: '' },
  ].filter((g) => g.immagine)
  const gal = (g: typeof galleriaHosp, l: 'it' | 'en') => g.map((x) => ({ immagine: x.immagine, didascalia: x[l] || undefined }))

  return [
    {
      sezione: 'principale',
      ordine: 0,
      it: {
        nome: 'Contract',
        kicker: 'Serralunga Contract',
        titolo: 'Arredi per progetti\n_contract_ e hospitality',
        testo:
          'Hotel, ristoranti, spazi wellness, residenze e luoghi pubblici. Da decenni Serralunga sviluppa con architetti, interior designer e committenti anche i progetti più complessi, con varianti di colore, personalizzazioni e prodotti su misura, tutti fabbricati in Italia.',
        immagine: await f('progetto', 'Progetto contract Serralunga: arredi e fioriere per uno spazio esterno'),
        estratto: '',
        punti: {
          kicker: 'Perché Serralunga',
          titolo: 'Cosa offriamo\nai professionisti',
          voci: [
            { titolo: 'Esperienza sui progetti complessi', testo: 'Decenni di lavoro per hotel, ristorazione e wellness: sappiamo come portare a termine anche i progetti più articolati.' },
            { titolo: 'Personalizzazione', testo: 'Varianti di colore, finiture e prodotti su misura: lavoriamo su materiali, tecnologie ed estetica per rispondere alle esigenze di ogni progetto.' },
            { titolo: 'Made in Italy', testo: 'Tutti i prodotti sono fabbricati in Italia: qualità del prodotto, ricerca continua, legame con la storia e il territorio, rispetto dell’ambiente.' },
            { titolo: 'Flessibilità, qualità, durata', testo: 'L’innovazione della produzione e il miglioramento continuo ci permettono di offrire ciò che serve a chi lavora nell’ospitalità.' },
          ],
        },
        galleria: { kicker: 'Portfolio', titolo: 'Progetti\nrealizzati', voci: gal(galleriaHome, 'it') },
        cta: PUNTI_CTA.it,
        seo: {
          titolo: 'Serralunga Contract: arredi per hotel e progetti',
          descrizione:
            'Arredi, fioriere e luci made in Italy per hotel, ristoranti, wellness, residenze e spazi pubblici: personalizzazioni, colori e su misura per i professionisti.',
        },
      },
      en: {
        nome: 'Contract',
        kicker: 'Serralunga Contract',
        titolo: 'Furniture for _contract_\nand hospitality projects',
        testo:
          'Hotels, restaurants, wellness areas, residences and public spaces. For decades Serralunga has been developing even the most complex projects with architects, interior designers and clients, with colour variants, customisation and bespoke products, all made in Italy.',
        punti: {
          kicker: 'Why Serralunga',
          titolo: 'What we offer\nprofessionals',
          voci: [
            { titolo: 'Experience with complex projects', testo: 'Decades of work for hotels, restaurants and wellness: we know how to bring even the most demanding projects to completion.' },
            { titolo: 'Customisation', testo: 'Colour variants, finishes and bespoke products: we work on materials, technologies and aesthetics to meet the needs of every project.' },
            { titolo: 'Made in Italy', testo: 'All our products are made in Italy: product quality, continuous research, ties to history and territory, respect for the environment.' },
            { titolo: 'Flexibility, quality, durability', testo: 'Innovation in production and continuous improvement let us offer what hospitality professionals need.' },
          ],
        },
        galleria: { kicker: 'Portfolio', titolo: 'Completed\nprojects', voci: gal(galleriaHome, 'en') },
        cta: PUNTI_CTA.en,
        seo: {
          titolo: 'Serralunga Contract: furniture for hotels and projects',
          descrizione:
            'Made in Italy furniture, planters and lighting for hotels, restaurants, wellness, residences and public spaces: customisation, colours and bespoke solutions.',
        },
      },
    },
    {
      sezione: 'hospitality',
      ordine: 10,
      it: {
        nome: 'Hospitality',
        kicker: 'Contract — Hospitality',
        titolo: 'Hotel, ristoranti\ne _wellness_',
        testo:
          'Terrazze, roof, dehors e bordi piscina: nell’ospitalità servono flessibilità, qualità e durata. Fioriere, sedute, tavoli e luci Serralunga si scelgono nei colori di cartella o in versione personalizzata, per dare a ogni struttura un’identità riconoscibile.',
        immagine: await f('fletcher', 'Arredi Serralunga nel Fletcher Hotel di Amsterdam'),
        estratto: 'Hotel, bar, ristoranti e spazi wellness: arredi, fioriere e luci per ambienti che lavorano ogni giorno.',
        punti: {
          kicker: 'Ambiti',
          titolo: 'Per chi accoglie\nogni giorno',
          voci: [
            { titolo: 'Hotel e resort', testo: 'Terrazze, roof e aree piscina: fioriere e sedute in LLDPE colorate su cartella, resistenti a sole, salsedine e gelo.' },
            { titolo: 'Bar e ristoranti', testo: 'Dehors e separé vegetali: sistemi modulari per delimitare i coperti mantenendo leggerezza e identità del locale.' },
            { titolo: 'Spa e piscine', testo: 'Lettini, sedute e oggetti luminosi per l’acqua e il bordo vasca, in materiali che non temono umidità, sole e sbalzi di temperatura.' },
            { titolo: 'Su misura', testo: 'Varianti di colore, personalizzazioni e prodotti su misura, con il supporto dell’ufficio contract.' },
          ],
        },
        galleria: { kicker: 'Portfolio', titolo: 'Hotel, bar\ne ristoranti', voci: gal(galleriaHosp, 'it') },
        casi: { kicker: 'Case history', titolo: 'Progetti\nraccontati', categorie: ['hotel', 'risto', 'spa'] },
        cta: PUNTI_CTA.it,
        seo: {
          titolo: 'Arredi per hotel e ristoranti | Serralunga Contract',
          descrizione:
            'Fioriere, sedute, tavoli e luci per hotel, resort, bar, ristoranti e spa: colori di cartella, personalizzazioni e su misura, made in Italy da Serralunga.',
        },
      },
      en: {
        nome: 'Hospitality',
        kicker: 'Contract — Hospitality',
        titolo: 'Hotels, restaurants\nand _wellness_',
        testo:
          'Terraces, rooftops, outdoor dining areas and poolsides: hospitality needs flexibility, quality and durability. Serralunga planters, seating, tables and lighting come in the colour-chart shades or in a customised version, to give each property a recognisable identity.',
        estratto: 'Hotels, bars, restaurants and wellness areas: furniture, planters and lighting for spaces that work every day.',
        punti: {
          kicker: 'Settings',
          titolo: 'For those who\nwelcome guests every day',
          voci: [
            { titolo: 'Hotels and resorts', testo: 'Terraces, rooftops and pool areas: LLDPE planters and seating in chart colours, resistant to sun, salt air and frost.' },
            { titolo: 'Bars and restaurants', testo: 'Outdoor dining areas and green partitions: modular systems that define the tables while keeping the venue light and true to its identity.' },
            { titolo: 'Spas and pools', testo: 'Sun loungers, seating and luminous objects for the water and the poolside, in materials unaffected by humidity, sun and temperature swings.' },
            { titolo: 'Bespoke', testo: 'Colour variants, customisation and bespoke products, with the support of our contract office.' },
          ],
        },
        galleria: { kicker: 'Portfolio', titolo: 'Hotels, bars\nand restaurants', voci: gal(galleriaHosp, 'en') },
        casi: { kicker: 'Case histories', titolo: 'Projects\nin detail', categorie: ['hotel', 'risto', 'spa'] },
        cta: PUNTI_CTA.en,
        seo: {
          titolo: 'Hotel and restaurant furniture | Serralunga Contract',
          descrizione:
            'Planters, seating, tables and lighting for hotels, resorts, bars, restaurants and spas: chart colours, customisation and bespoke pieces, made in Italy.',
        },
      },
    },
    {
      sezione: 'residenziale',
      ordine: 20,
      it: {
        nome: 'Residenziale',
        kicker: 'Contract — Residenziale',
        titolo: 'Progetti residenziali\nper architetti e _interior designer_',
        testo:
          'Ville, residenze di pregio, giardini e terrazze: lavoriamo con studi di architettura, paesaggisti e interior designer per scegliere pezzi, colori e finiture adatti a ogni progetto, anche su misura.',
        immagine: await f('residenziale', 'Arredi Serralunga in un progetto residenziale'),
        estratto: 'Per architetti e interior designer: pezzi d’autore, colori e finiture per residenze, giardini e terrazze.',
        punti: {
          kicker: 'Per i progettisti',
          titolo: 'Al fianco\ndi chi progetta',
          voci: [
            { titolo: 'Pezzi firmati', testo: 'Collezioni disegnate da architetti e designer italiani e internazionali: ogni pezzo porta il nome di chi lo ha pensato.' },
            { titolo: 'Finiture e colori', testo: 'Pezzi d’autore e finiture laccate o Moleskin, sviluppati con studi di architettura e interior designer.' },
            { titolo: 'Interni ed esterni', testo: 'Vasi della tradizione italiana e pezzi di design per giardini, terrazze e interni.' },
            { titolo: 'Documentazione', testo: 'Schede tecniche, disegni e campionature su richiesta, per il capitolato e la scelta con il cliente.' },
          ],
        },
        casi: { kicker: 'Case history', titolo: 'Residenze\nraccontate', categorie: ['resid'] },
        cta: PUNTI_CTA.it,
        seo: {
          titolo: 'Arredi per progetti residenziali | Serralunga',
          descrizione:
            'Per architetti e interior designer: arredi, vasi e luci Serralunga per ville, residenze, giardini e terrazze, con finiture laccate o Moleskin e su misura.',
        },
      },
      en: {
        nome: 'Residential',
        kicker: 'Contract — Residential',
        titolo: 'Residential projects\nfor architects and _interior designers_',
        testo:
          'Villas, prestigious residences, gardens and terraces: we work with architecture firms, landscape designers and interior designers to choose the right pieces, colours and finishes for each project, bespoke included.',
        estratto: 'For architects and interior designers: signature pieces, colours and finishes for residences, gardens and terraces.',
        punti: {
          kicker: 'For designers',
          titolo: 'Alongside\nthose who design',
          voci: [
            { titolo: 'Signature pieces', testo: 'Collections designed by Italian and international architects and designers: every piece bears the name of the person who conceived it.' },
            { titolo: 'Finishes and colours', testo: 'Signature pieces with lacquered or Moleskin finishes, developed with architecture studios and interior designers.' },
            { titolo: 'Indoors and outdoors', testo: 'Traditional Italian pots and design pieces for gardens, terraces and interiors.' },
            { titolo: 'Documentation', testo: 'Data sheets, drawings and samples on request, for specifications and for choosing with your client.' },
          ],
        },
        casi: { kicker: 'Case histories', titolo: 'Residences\nin detail', categorie: ['resid'] },
        cta: PUNTI_CTA.en,
        seo: {
          titolo: 'Furniture for residential projects | Serralunga',
          descrizione:
            'For architects and interior designers: Serralunga furniture, pots and lighting for villas, residences, gardens and terraces, lacquered, Moleskin or bespoke.',
        },
      },
    },
    {
      sezione: 'urbano',
      ordine: 30,
      it: {
        nome: 'Urbano',
        kicker: 'Contract — Arredo urbano',
        titolo: 'Arredo urbano\ne spazi _pubblici_',
        testo:
          'Piazze, viali, aree pedonali, ingressi e spazi commerciali: fioriere di grande formato, anche luminose, in polietilene tinto in massa e riciclabile al 100%, pensate per stare all’aperto tutto l’anno.',
        immagine: await f('primavera', 'Fioriere Primavera di Serralunga in uno spazio pubblico'),
        estratto: 'Big-Bo, Primavera, Versailles e le altre fioriere di grande formato per piazze, viali e spazi pubblici.',
        punti: {
          kicker: 'Spazio pubblico',
          titolo: 'Pensati per\nla città',
          voci: [
            { titolo: 'Grande formato', testo: 'Fioriere fino a 200 cm di diametro, come Big-Bo, per segnare piazze, ingressi e percorsi.' },
            { titolo: 'Versioni luminose', testo: 'Big-Bo, Cone e Primavera esistono anche con luce, per dare presenza agli spazi anche di sera.' },
            { titolo: 'Materiale resistente', testo: 'Polietilene lineare stampato in rotazionale, tinto in massa, con alta resistenza meccanica e riciclabile al 100%.' },
            { titolo: 'Più colori', testo: 'Le fioriere sono disponibili in diversi colori, per accordarle al contesto.' },
          ],
        },
        galleria: { kicker: 'Portfolio', titolo: 'Spazi pubblici\ne commerciali', voci: gal(galleriaUrb, 'it') },
        prodotti: { kicker: 'Arredo urbano', titolo: 'Le fioriere\nper lo spazio pubblico', testo: '', voci: urbano.it },
        casi: { kicker: 'Case history', titolo: 'Progetti\nraccontati', categorie: ['urbano'] },
        cta: PUNTI_CTA.it,
        seo: {
          titolo: 'Arredo urbano e fioriere giganti | Serralunga',
          descrizione:
            'Fioriere di grande formato e luminose per piazze, viali e spazi pubblici: Big-Bo, Cone, Primavera, Versailles in polietilene riciclabile, made in Italy.',
        },
      },
      en: {
        nome: 'Urban',
        kicker: 'Contract — Urban furniture',
        titolo: 'Urban furniture\nand _public_ spaces',
        testo:
          'Squares, avenues, pedestrian areas, entrances and retail spaces: large planters, illuminated versions included, in mass-coloured, 100% recyclable polyethylene, designed to stay outdoors all year round.',
        estratto: 'Big-Bo, Primavera, Versailles and our other large planters for squares, avenues and public spaces.',
        punti: {
          kicker: 'Public space',
          titolo: 'Designed\nfor the city',
          voci: [
            { titolo: 'Large format', testo: 'Planters up to 200 cm in diameter, such as Big-Bo, to mark squares, entrances and paths.' },
            { titolo: 'Illuminated versions', testo: 'Big-Bo, Cone and Primavera also come with a light, giving spaces presence after dark.' },
            { titolo: 'Durable material', testo: 'Rotationally moulded linear polyethylene, mass-coloured, with high mechanical strength and 100% recyclable.' },
            { titolo: 'Several colours', testo: 'The planters come in several colours, to suit the setting.' },
          ],
        },
        galleria: { kicker: 'Portfolio', titolo: 'Public and\nretail spaces', voci: gal(galleriaUrb, 'en') },
        prodotti: { kicker: 'Urban furniture', titolo: 'Planters\nfor public space', testo: '', voci: urbano.en },
        casi: { kicker: 'Case histories', titolo: 'Projects\nin detail', categorie: ['urbano'] },
        cta: PUNTI_CTA.en,
        seo: {
          titolo: 'Urban furniture and large planters | Serralunga',
          descrizione:
            'Large and illuminated planters for squares, avenues and public spaces: Big-Bo, Cone, Primavera and Versailles in recyclable polyethylene, made in Italy.',
        },
      },
    },
    {
      sezione: 'cataloghi',
      ordine: 40,
      it: {
        nome: 'Cataloghi',
        kicker: 'Contract — Cataloghi',
        titolo: 'Cataloghi\nda _scaricare_',
        testo:
          'Mobili, piscina e spiaggia, fioriere, regali: scegliete i cataloghi che vi servono e lasciateci i vostri riferimenti. I PDF si aprono subito e l’ufficio contract potrà inviarvi listino e condizioni riservate.',
        immagine: await f('catalogo', 'Catalogo Serralunga'),
        estratto: 'I cataloghi Serralunga in PDF: mobili, piscina e spiaggia, fioriere, regali.',
        cataloghi: {
          mostra: true,
          kicker: 'Download PDF',
          titolo: 'I cataloghi\nSerralunga',
          testo: 'Riservato ad alberghi, ristoranti, studi di architettura e rivenditori.',
          dopoInvio: 'Grazie. Ecco i cataloghi scelti, si aprono in una nuova scheda:',
        },
        cta: { pulsante: 'Ricevi i cataloghi', grazie: 'Grazie: i link ai cataloghi sono qui sotto.' },
        seo: {
          titolo: 'Cataloghi Serralunga in PDF | Serralunga Contract',
          descrizione:
            'Scaricate i cataloghi Serralunga in PDF: mobili, piscina e spiaggia, fioriere e regali. Per hotel, ristoranti, architetti e rivenditori, con listino riservato.',
        },
      },
      en: {
        nome: 'Catalogues',
        kicker: 'Contract — Catalogues',
        titolo: 'Catalogues\nto _download_',
        testo:
          'Furniture, pool and beach, planters, gifts: choose the catalogues you need and leave us your details. The PDFs open straight away and our contract office can send you the trade price list and conditions.',
        estratto: 'Serralunga catalogues in PDF: furniture, pool and beach, planters, gifts.',
        cataloghi: {
          mostra: true,
          kicker: 'PDF download',
          titolo: 'Serralunga\ncatalogues',
          testo: 'For hotels, restaurants, architecture firms and dealers.',
          dopoInvio: 'Thank you. Here are the catalogues you chose; they open in a new tab:',
        },
        cta: { pulsante: 'Get the catalogues', grazie: 'Thank you: the catalogue links are below.' },
        seo: {
          titolo: 'Serralunga catalogues in PDF | Serralunga Contract',
          descrizione:
            'Download the Serralunga catalogues in PDF: furniture, pool and beach, planters and gifts. For hotels, restaurants, architects and dealers, with trade prices.',
        },
      },
    },
    {
      sezione: 'area-riservata',
      ordine: 50,
      it: {
        nome: 'Area riservata',
        kicker: 'Contract — Area riservata',
        titolo: 'Area riservata\n_rivenditori e agenti_',
        testo: 'Lo spazio dedicato a rivenditori e agenti Serralunga: si entra con le credenziali fornite dall’azienda.',
        immagine: await f('storia', 'Serralunga, storia e produzione'),
        estratto: 'Accesso per rivenditori e agenti Serralunga.',
        accesso: {
          kicker: 'Accesso',
          titolo: 'Entrate\nnell’area riservata',
          testo: 'L’area riservata Serralunga ha un indirizzo dedicato: il pulsante apre la pagina di accesso in una nuova scheda.',
          pulsante: 'Accedi all’area riservata',
          link: 'https://reservedarea.serralunga.com/index.php/login',
          nota: 'Non avete ancora le credenziali? Scriveteci con il modulo qui sotto.',
        },
        cta: {
          kicker: 'Credenziali',
          titolo: 'Richiedere\nl’accesso',
          testo: 'Siete rivenditori o agenti Serralunga e non avete ancora l’accesso? Lasciateci i vostri riferimenti: vi ricontatteremo.',
          pulsante: 'Richiedi l’accesso',
          grazie: 'Grazie: vi ricontatteremo a breve.',
        },
        seo: {
          titolo: 'Area riservata rivenditori e agenti | Serralunga',
          descrizione:
            'Accesso all’area riservata Serralunga per rivenditori e agenti. Non avete ancora le credenziali? Richiedetele all’ufficio commerciale con il modulo.',
        },
      },
      en: {
        nome: 'Reserved area',
        kicker: 'Contract — Reserved area',
        titolo: 'Reserved area\nfor _dealers and agents_',
        testo: 'The area dedicated to Serralunga dealers and agents: log in with the credentials provided by the company.',
        estratto: 'Login for Serralunga dealers and agents.',
        accesso: {
          kicker: 'Login',
          titolo: 'Enter\nthe reserved area',
          testo: 'The Serralunga reserved area has its own address: the button opens the login page in a new tab.',
          pulsante: 'Log in to the reserved area',
          link: 'https://reservedarea.serralunga.com/index.php/login',
          nota: 'No credentials yet? Write to us using the form below.',
        },
        cta: {
          kicker: 'Credentials',
          titolo: 'Request\naccess',
          testo: 'Are you a Serralunga dealer or agent without access yet? Leave us your details and we will get back to you.',
          pulsante: 'Request access',
          grazie: 'Thank you: we will be in touch shortly.',
        },
        seo: {
          titolo: 'Reserved area for dealers and agents | Serralunga',
          descrizione:
            'Login to the Serralunga reserved area for dealers and agents. No credentials yet? Request them from our sales office using the form on this page.',
        },
      },
    },
  ]
}

/**
 * Inglese sulle stesse righe: gli elenchi localizzati di Payload si aggiornano per id di riga,
 * quindi si copiano gli id (e i campi non localizzati) dal documento italiano appena salvato.
 */
export function conIdRighe(en: unknown, salvato: unknown): unknown {
  if (Array.isArray(en)) {
    const righe = Array.isArray(salvato) ? salvato : []
    return en.map((v, k) => {
      const r = righe[k] as Record<string, unknown> | undefined
      const unito = conIdRighe(v, r)
      return r && typeof r === 'object' && unito && typeof unito === 'object' && !Array.isArray(unito) ? { ...r, ...(unito as object), id: r.id } : unito
    })
  }
  if (en && typeof en === 'object') {
    const s = (salvato && typeof salvato === 'object' ? salvato : {}) as Record<string, unknown>
    return Object.fromEntries(Object.entries(en as Record<string, unknown>).map(([k, v]) => [k, conIdRighe(v, s[k])]))
  }
  return en
}
