/**
 * Sezione Materiali (Version: 1.00): contenuti di partenza di /materiali/ e della cartella colori.
 * Fonti (serralunga.com, lette il 2026-11-16): /pages/moleskin, /pages/sustainability, /pages/colors,
 * /pages/about-us, schede Corten (bonnie-corten, bay-corten-armchair), products.json per i pezzi.
 * Nessun dato tecnico è aggiunto: i testi riprendono e riordinano quanto pubblicato dall'azienda.
 * Si scrive solo ciò che manca: pagine e colori già presenti (anche modificati dal pannello) restano come sono.
 */
import type { Payload } from 'payload'

import { catalogo, type ProdottoShop } from './creazioni'

type Media = (sorgente: string, alt: string) => Promise<number | null>
type Bi = { it: string; en: string }

const F = 'https://serralunga.com/cdn/shop/files'
const S = 'https://cdn.shopify.com/s/files/1/0587/3775/4249/files'

interface Capitolo { titolo: Bi; testo: Bi; foto?: string; alt?: Bi }
interface Materiale {
  slug: string
  ordine: number
  titolo: Bi
  titoloPagina?: Bi
  kicker: Bi
  sottotitolo: Bi
  foto: string
  alt: Bi
  intro: Bi
  cifre?: { valore: Bi; etichetta: Bi }[]
  capitoli: Capitolo[]
  galleria?: { foto: string; alt: Bi }[]
  /** Pezzi presi da products.json: filtro sul titolo, sull'handle o sulle etichette. */
  pezzi?: { filtro: RegExp; titolo: Bi }
  colori?: { titolo: Bi; nota: Bi }
  seo: { titolo: Bi; descrizione: Bi }
}

const b = (it: string, en: string): Bi => ({ it, en })

export const MATERIALI: Materiale[] = [
  {
    slug: 'polietilene',
    ordine: 10,
    titolo: b('Polietilene e Clean Fighter', 'Polyethylene and Clean Fighter'),
    titoloPagina: b('Polietilene e _Clean Fighter_', 'Polyethylene and _Clean Fighter_'),
    kicker: b('Materiale', 'Material'),
    sottotitolo: b('Come nasce, perché dura, come si pulisce.', 'How it is made, why it lasts, how it is cleaned.'),
    foto: `${F}/sustainable_banner_landscape.jpg`,
    alt: b('Arredi Serralunga in polietilene in uno spazio esterno', 'Serralunga polyethylene furniture in an outdoor space'),
    intro: b(
      'La maggior parte degli arredi Serralunga è realizzata in polietilene lineare (LLDPE), un monomateriale riciclabile al 100%, stampato in rotazione nello stabilimento di Biella. Per hôtellerie, ristorazione e contract significa pezzi leggeri, resistenti alle intemperie e con una manutenzione minima.',
      'Most Serralunga furniture is made of linear polyethylene (LLDPE), a 100% recyclable single material, rotationally moulded at the Biella plant. For hotels, restaurants and contract projects this means light pieces that stand up to the weather and need minimal maintenance.',
    ),
    cifre: [
      { valore: b('-35 / +80 °C', '-35 / +80 °C'), etichetta: b('Escursione termica sopportata', 'Temperature range withstood') },
      { valore: b('> 10 anni', '> 10 years'), etichetta: b('Durata dei prodotti', 'Product lifespan') },
      { valore: b('> 90%', '> 90%'), etichetta: b('Porosità superficiale ridotta da Clean Fighter', 'Surface porosity reduced by Clean Fighter') },
      { valore: b('100%', '100%'), etichetta: b('Polimero riciclabile', 'Recyclable polymer') },
    ],
    capitoli: [
      {
        titolo: b('Come nasce', 'How it is made'),
        testo: b(
          'Serralunga è stata la prima in Europa a sviluppare la tecnologia dello stampaggio rotazionale, importata dagli Stati Uniti. Il processo lavora a bassa temperatura e senza pressione: per produrre un pezzo servono circa 30 minuti, e non vengono impiegati solventi inquinanti.',
          'Serralunga was the first company in Europe to develop rotational moulding technology, imported from the United States. The process runs at low temperature and without pressure: one piece takes about 30 minutes to produce, and no polluting solvents are used.',
        ),
        foto: `${F}/bay-_1A7A6394.jpg`,
        alt: b('Poltrona Bay in polietilene stampato in rotazione', 'Bay armchair in rotationally moulded polyethylene'),
      },
      {
        titolo: b('Perché dura', 'Why it lasts'),
        testo: b(
          'Il polietilene LLDPE sopporta brusche escursioni termiche da -35 °C a +80 °C ed è robusto e resistente agli urti, ai raggi UV e ai climi salini. I prodotti durano oltre 10 anni e restano leggeri, facili da movimentare.',
          'LLDPE polyethylene withstands sudden temperature swings from -35 °C to +80 °C and is sturdy and resistant to impacts, UV rays and salty climates. The products last over 10 years and stay light and easy to move.',
        ),
        foto: `${F}/1A7A6484_ming.jpg`,
        alt: b('Fioriera Ming in polietilene all’aperto', 'Ming planter in polyethylene outdoors'),
      },
      {
        titolo: b('Come si pulisce: Clean Fighter', 'How it is cleaned: Clean Fighter'),
        testo: b(
          'Clean Fighter è un nuovo compound su polietilene lineare che riduce ampiamente il problema della porosità superficiale (oltre il 90%). Le superfici si puliscono rapidamente e facilmente, con una manutenzione minima.',
          'Clean Fighter is a new compound based on linear polyethylene that largely reduces surface porosity (by over 90%). Surfaces can be cleaned quickly and easily, with minimal maintenance.',
        ),
        foto: `${F}/TE_9455-HDR.jpg`,
        alt: b('Arredi Serralunga in polietilene in un ambiente contract', 'Serralunga polyethylene furniture in a contract setting'),
      },
    ],
    seo: {
      titolo: b('Polietilene e Clean Fighter | Serralunga', 'Polyethylene and Clean Fighter | Serralunga'),
      descrizione: b(
        'Polietilene LLDPE stampato in rotazione a Biella: -35/+80 °C, resistente a UV e urti, 100% riciclabile. Clean Fighter riduce la porosità di oltre il 90%.',
        'Rotationally moulded LLDPE polyethylene made in Biella: -35/+80 °C, UV and impact resistant, 100% recyclable. Clean Fighter cuts porosity by over 90%.',
      ),
    },
  },
  {
    slug: 'moleskin',
    ordine: 20,
    titolo: b('Moleskin', 'Moleskin'),
    kicker: b('Finitura artigianale sviluppata nei laboratori Serralunga', 'Handcrafted finish developed in the Serralunga laboratories'),
    sottotitolo: b('Dal cuoio al velluto outdoor.', 'From leather to outdoor velvet.'),
    foto: `${F}/MOLE_3.jpg`,
    alt: b('Superficie con finitura Moleskin', 'Surface with Moleskin finish'),
    intro: b(
      'Una rifinitura brevettata che nasce dalla storia di Serralunga e, nello specifico, dall’esperienza nella lavorazione della pelle.',
      'A patented finish born from Serralunga’s history and, specifically, from its experience in leather working.',
    ),
    capitoli: [
      {
        titolo: b('Dalla conceria al polietilene', 'From tannery to polyethylene'),
        testo: b(
          'Serralunga nasce a Biella nel 1825 come conceria e passa poi alla lavorazione delle pelli per uso industriale. Moleskin porta quell’esperienza sugli arredi in polietilene stampato in rotazione: una superficie opaca e vellutata, morbida al tatto, che non riflette la luce in modo diretto ma la diffonde.',
          'Serralunga was founded in Biella in 1825 as a tannery and then moved on to processing leather for industrial use. Moleskin brings that experience to rotationally moulded polyethylene furniture: a matte, velvety, soft-touch surface that does not reflect light directly but diffuses it.',
        ),
        foto: `${F}/SKIN.jpg`,
        alt: b('Dettaglio della finitura Moleskin', 'Detail of the Moleskin finish'),
      },
      {
        titolo: b('Fustagno', 'Fustian'),
        testo: b(
          'Con lo spirito di ricerca e innovazione che da sempre caratterizza l’evoluzione dell’azienda, Moleskin dà ai prodotti un aspetto inedito alla vista e inaspettato al tatto. Una lavorazione che richiama i preziosi tessuti fustagno, resistenti, caldi e confortevoli: superfici da toccare e pettinare come la pelle di daino.',
          'In the spirit of research and innovation that has always shaped the company, Moleskin gives the products a look that is new to the eye and unexpected to the touch. The finish recalls fine fustian fabrics, durable, warm and comfortable: surfaces to touch and brush like suede.',
        ),
        foto: `${F}/bay_moleskin_4_1_83b81b6d-8348-4c14-a511-9538ab8c2041.jpg`,
        alt: b('Poltrona Bay con finitura Moleskin', 'Bay armchair with Moleskin finish'),
      },
      {
        titolo: b('All’aperto, come ogni Serralunga', 'Outdoors, like every Serralunga piece'),
        testo: b(
          'Con Moleskin la resistenza e la qualità degli arredi da esterno Serralunga si vestono di un’eleganza raffinata e al tempo stesso tradizionale. La finitura mantiene la resistenza ai raggi UV, la durata nel tempo e la facilità di manutenzione: si pulisce come le superfici standard. Trova posto nell’outdoor residenziale, negli spazi contract come hotel e lounge bar e negli interni.',
          'With Moleskin, the strength and quality of Serralunga outdoor furniture take on a refined yet traditional elegance. The finish keeps UV resistance, long-term durability and easy maintenance: it cleans just like standard surfaces. It suits residential outdoor spaces, contract spaces such as hotels and lounge bars, and interiors.',
        ),
        foto: `${F}/01-MEDITERRANEAN-photo_1_c6c7eb70-b845-4f52-bfe8-8c146ecf99a7.jpg`,
        alt: b('Arredi Moleskin in uno spazio esterno mediterraneo', 'Moleskin furniture in a Mediterranean outdoor space'),
      },
    ],
    galleria: [
      { foto: `${F}/serralunga_1638_1_fe8548d0-fa16-44f0-9f6f-fb323caf4987.jpg`, alt: b('Arredi con finitura Moleskin', 'Furniture with Moleskin finish') },
      { foto: `${F}/moleskin_5_718a580e-5069-405c-91aa-f7bd5bbd776e.jpg`, alt: b('Pezzi della collezione Moleskin', 'Pieces from the Moleskin collection') },
      { foto: `${F}/serralunga_1673_1_9a137c33-cf54-4bfb-af5c-7b532453da11.jpg`, alt: b('Ambientazione con arredi Moleskin', 'Setting with Moleskin furniture') },
      { foto: `${F}/serralunga_1638_1_5c5c13c0-fcd5-4006-88b8-846c8a5c2a5d.jpg`, alt: b('Dettaglio di arredi Moleskin', 'Detail of Moleskin furniture') },
    ],
    pezzi: { filtro: /moleskin/i, titolo: b('I pezzi in Moleskin', 'Pieces in Moleskin') },
    seo: {
      titolo: b('Finitura Moleskin per arredi outdoor | Serralunga', 'Moleskin finish for outdoor furniture | Serralunga'),
      descrizione: b(
        'Moleskin: rifinitura brevettata Serralunga nata dalla lavorazione della pelle. Superficie opaca e vellutata, resistente ai raggi UV, per outdoor e contract.',
        'Moleskin: Serralunga’s patented finish born from leather working. A matte, velvety surface, UV resistant, for outdoor spaces and contract projects.',
      ),
    },
  },
  {
    slug: 'corten',
    ordine: 30,
    titolo: b('Corten', 'Corten'),
    kicker: b('Finitura', 'Finish'),
    sottotitolo: b('L’ossidazione come valore estetico.', 'Oxidation as an aesthetic value.'),
    foto: `${S}/LifestyleimageCorten1_1.jpg`,
    alt: b('Vaso Cup con finitura Corten', 'Cup planter with Corten finish'),
    intro: b(
      'Corten è un materiale unico, ingegnerizzato con la resina, che unisce il fascino estetico del vero ferro arrugginito alla promessa di resistenza alla CORrosione e alla TENsione.',
      'Corten is a unique material engineered with resin to present the natural aesthetic of genuine rusted iron, while promising resistance to CORrosion and TENsile strength.',
    ),
    capitoli: [
      {
        titolo: b('L’essenza organica della materia', 'The organic essence of the material'),
        testo: b(
          'Il concetto di Corten mette al centro l’essenza organica del materiale. L’aspetto cromatico non uniforme apre infinite possibilità di abbinamento con altri materiali.',
          'The concept of Corten emphasises the organic essence of the material. Its non-uniform colour opens up endless possibilities for combining it with other materials.',
        ),
        foto: `${S}/CUP_CORTEN.jpg`,
        alt: b('Vaso Cup Big con finitura Corten', 'Cup Big planter with Corten finish'),
      },
      {
        titolo: b('Arredi e fioriere', 'Furniture and planters'),
        testo: b(
          'La finitura Corten veste fioriere, sedute e tavoli della collezione: dai vasi Cup alla poltrona Bay, dal tavolino Juju al vaso Rettangolare.',
          'The Corten finish is used on planters, seating and tables in the collection: from the Cup planters to the Bay armchair, from the Juju table to the Rettangolare planter.',
        ),
        foto: `${S}/LifestyleimageCorten1_1_-Copy.jpg`,
        alt: b('Poltrona Bay con finitura Corten', 'Bay armchair with Corten finish'),
      },
    ],
    pezzi: { filtro: /corten/i, titolo: b('I pezzi in Corten', 'Pieces in Corten') },
    seo: {
      titolo: b('Finitura Corten in resina | Serralunga', 'Resin Corten finish | Serralunga'),
      descrizione: b(
        'Corten Serralunga: materiale ingegnerizzato con la resina, con il fascino del ferro arrugginito. Fioriere, sedute e tavoli per spazi esterni e contract.',
        'Serralunga Corten: a resin-engineered material with the look of rusted iron. Planters, seating and tables for outdoor spaces and contract projects.',
      ),
    },
  },
  {
    slug: 'colori',
    ordine: 40,
    titolo: b('Colori', 'Colours'),
    titoloPagina: b('La gamma _colori_', 'The _colour_ range'),
    kicker: b('Finiture e colori', 'Finishes and colours'),
    sottotitolo: b('La cartella colori e una guida alla scelta.', 'The colour chart and a guide to choosing.'),
    foto: `${F}/pietra-della-dolomiti_715b1c8c-2d16-4839-b824-f2c4b0c45b40.jpg`,
    alt: b('Campione di colore Pietra delle Dolomiti', 'Pietra delle Dolomiti colour sample'),
    intro: b(
      'Serralunga produce su richiesta: la maggior parte dei prodotti può essere realizzata in qualsiasi colore della gamma. Se il colore che vi serve non compare nella scheda di un prodotto, contattateci.',
      'Serralunga makes to order: most products can be made in any colour of the range. If the colour you need is not listed on a product page, contact us.',
    ),
    capitoli: [
      {
        titolo: b('Colori standard', 'Standard colours'),
        testo: b(
          'Venticinque tinte del polietilene, dai bianchi alle pietre, dalle terre ai verdi, fino ai rossi e al giallo. Neutro Luce (NT) è la versione traslucida; Pietra delle Dolomiti (GG) è proposta sia per le collezioni di design sia per i vasi della tradizione italiana.',
          'Twenty-five polyethylene shades, from whites and stones to earths and greens, through to reds and yellow. Neutro Luce (NT) is the translucent version; Pietra delle Dolomiti (GG) is offered both for design collections and for traditional Italian pots.',
        ),
      },
      {
        titolo: b('Laccati', 'Lacquered'),
        testo: b(
          'Tredici finiture laccate, lucide e opache, comprese le metallizzate oro, argento, azzurro, rame, sabbia e titanio.',
          'Thirteen lacquered finishes, glossy and matt, including metallic gold, silver, blue, copper, sand and titanium.',
        ),
      },
      {
        titolo: b('Colori con materiale riciclato', 'Colours with recycled material'),
        testo: b(
          'Alcuni colori della gamma sono realizzati con materiali riciclati. Per conoscere i colori disponibili per i prodotti del vostro progetto, scriveteci: vi rispondiamo con le opzioni per ogni pezzo.',
          'Some colours in the range are made with recycled materials. To find out which colours are available for the products in your project, write to us and we will reply with the options for each piece.',
        ),
      },
    ],
    colori: {
      titolo: b('Cartella colori', 'Colour chart'),
      nota: b(
        'I colori a video sono indicativi: per un progetto richiedete i campioni.',
        'On-screen colours are indicative: request samples for a project.',
      ),
    },
    seo: {
      titolo: b('Cartella colori Serralunga: 38 colori', 'Serralunga colour chart: 38 colours'),
      descrizione: b(
        'La gamma colori Serralunga: 25 colori standard e 13 laccati lucidi, opachi e metallizzati. Quasi tutti i prodotti si realizzano su richiesta nel colore scelto.',
        'The Serralunga colour range: 25 standard colours and 13 glossy, matt and metallic lacquers. Most products are made to order in the colour you choose.',
      ),
    },
  },
  {
    slug: 'sostenibilita',
    ordine: 50,
    titolo: b('Sostenibilità', 'Sustainability'),
    titoloPagina: b('Consideriamo la plastica un materiale _prezioso_', 'We consider plastic a _precious_ material'),
    kicker: b('Sostenibilità', 'Sustainability'),
    sottotitolo: b('100% riciclabile, produzione a Biella, filiera corta.', '100% recyclable, made in Biella, short supply chain.'),
    foto: `${F}/sustainable_banner_landscape.jpg`,
    alt: b('Arredi Serralunga in polietilene riciclabile', 'Serralunga furniture in recyclable polyethylene'),
    intro: b(
      'Consideriamo la plastica un materiale prezioso: va usata con attenzione, solo quando ha senso. I nostri prodotti sono riutilizzabili un numero illimitato di volte.',
      'We consider plastic a precious material: it should be used carefully, only when it makes sense. Our products can be reused an unlimited number of times.',
    ),
    cifre: [
      { valore: b('100%', '100%'), etichetta: b('Riciclabile', 'Recyclable') },
      { valore: b('30–70%', '30–70%'), etichetta: b('Materiale rigenerato nell’LLDPE seconda vita', 'Regenerated content in second-life LLDPE') },
      { valore: b('~30 min', '~30 min'), etichetta: b('Per stampare un pezzo', 'To mould one piece') },
      { valore: b('Biella', 'Biella'), etichetta: b('Tutto il processo produttivo', 'The whole production process') },
    ],
    capitoli: [
      {
        titolo: b('100% riciclabile', '100% recyclable'),
        testo: b(
          'La maggior parte dei prodotti è realizzata in monomateriale: il polietilene LLDPE, un polimero riciclabile al 100%. Alcuni colori sono realizzati con materiali riciclati. I prodotti sono ottenuti con materie prime inerti e riciclabili.',
          'Most products are made from a single material: LLDPE polyethylene, a 100% recyclable polymer. Some colours are made with recycled materials. The products are made from inert, recyclable raw materials.',
        ),
        foto: `${F}/1A7A6484_ming.jpg`,
        alt: b('Fioriera Ming in polietilene riciclabile', 'Ming planter in recyclable polyethylene'),
      },
      {
        titolo: b('Un’economia circolare virtuosa', 'A virtuous circular economy'),
        testo: b(
          'A fine vita gli oggetti possono essere trasformati in polvere di plastica, per dare nuova vita ad altri oggetti. Lo stampaggio rotazionale lavora a bassa temperatura e senza pressione: servono circa 30 minuti per produrre un pezzo.',
          'At the end of their life, our objects can be turned into plastic powder to give new life to other objects. Rotational moulding works at low temperature and without pressure: it takes about 30 minutes to produce one piece.',
        ),
        foto: `${F}/bay-_1A7A6394.jpg`,
        alt: b('Poltrona Bay in polietilene', 'Bay armchair in polyethylene'),
      },
      {
        titolo: b('Produzione consapevole, filiera corta', 'Conscious production, short supply chain'),
        testo: b(
          'Serralunga utilizza solo materia prima trasformata in Italia e certificata secondo le normative UE, riducendo la CO2 dei trasporti, e impiega LLDPE seconda vita con il 30–70% di materiale rigenerato. L’intero processo si svolge nello stabilimento di Biella, nel Nord Italia, dotato di pannelli fotovoltaici. In produzione non si usano solventi inquinanti.',
          'Serralunga uses only raw material transformed in Italy and certified under EU legislation, reducing transport CO2, and uses second-life LLDPE containing 30–70% regenerated material. The whole process takes place at the Biella plant in Northern Italy, which is equipped with solar panels. No polluting solvents are used in production.',
        ),
        foto: `${F}/TE_9455-HDR.jpg`,
        alt: b('Arredi Serralunga prodotti a Biella', 'Serralunga furniture made in Biella'),
      },
    ],
    seo: {
      titolo: b('Sostenibilità: polietilene 100% riciclabile', 'Sustainability: 100% recyclable polyethylene'),
      descrizione: b(
        'Arredi in polietilene 100% riciclabile, prodotti a Biella con pannelli fotovoltaici, materia prima italiana certificata UE e LLDPE con 30–70% di rigenerato.',
        'Furniture in 100% recyclable polyethylene, made in Biella with solar panels, EU-certified Italian raw material and LLDPE with 30–70% regenerated content.',
      ),
    },
  },
]

/** Cartella colori di serralunga.com/pages/colors: 25 righe standard + 13 laccati (GG compare due volte, come sul sito). */
type ColoreSeed = {
  codice: string
  nome: string
  nomeEn?: string
  tono?: Bi
  famiglia: 'standard' | 'laccato'
  finitura?: 'lucido' | 'opaco'
  metallizzato?: boolean
  foto?: string
}
const st = (codice: string, nome: string, tono: Bi | undefined, foto?: string): ColoreSeed => ({ codice, nome, tono, famiglia: 'standard', foto })
const la = (codice: string, nome: string, nomeEn: string, finitura: 'lucido' | 'opaco', metallizzato: boolean, foto?: string): ColoreSeed => ({
  codice,
  nome,
  nomeEn,
  famiglia: 'laccato',
  finitura,
  metallizzato,
  foto,
})

export const COLORI: ColoreSeed[] = [
  st('NT', 'Neutro Luce', b('traslucido', 'translucent'), `${F}/NT.jpg`),
  st('IWH', 'Neve di San Candido', b('bianco ghiaccio', 'ice white'), `${F}/IWH.jpg`),
  st('WH', 'Bianco', b('bianco panna', 'creamy white'), `${F}/WH_2a34644c-ee38-455a-90bc-298214e283fd.jpg`),
  st('WH5', 'Gesso di Bologna', b('bianco gesso', 'chalk white'), `${F}/gesso-di-bologna_5cea9176-da7c-4931-beda-933057d6a803.jpg`),
  st('AV', 'Pietra di Matera', b('avorio', 'ivory'), `${F}/AV.jpg`),
  st('GG', 'Pietra delle Dolomiti', b('vasi tradizione italiana', 'traditional Italian pots'), `${F}/pietra-della-dolomiti_715b1c8c-2d16-4839-b824-f2c4b0c45b40.jpg`),
  st('GG', 'Pietra delle Dolomiti', b('grigio chiaro · design', 'light grey · design'), `${F}/pietra-della-dolomiti_715b1c8c-2d16-4839-b824-f2c4b0c45b40.jpg`),
  st('TO', 'Tortora di Torino', b('tortora', 'dove'), `${F}/tortora-di-torino_63e76419-6ad6-43ac-83c4-d9bfa1029293.jpg`),
  st('TC2', 'Castoro', b('marroncino chiaro', 'light brown'), `${F}/TC2.jpg`),
  st('TC4', 'Terracotta Scura', b('cioccolato', 'chocolate'), `${F}/terracotta-scura_be2884a6-4676-438a-a6e8-9db427d23489.jpg`),
  st('ANT', 'Antracite di Sardegna', b('antracite', 'anthracite'), `${F}/antracite_b8bc7125-1b04-4145-877e-0024f222fd0a.jpg`),
  st('BK', 'More di Rovo', b('nero', 'black'), `${F}/BK.jpg`),
  st('AZP', 'Azzurro di Provenza', b('azzurro chiaro', 'pale blue'), `${F}/azzurro-di-provenza_823405da-1f69-4215-b543-fdf4c94e26fb.png`),
  st('AQM', 'Acqua della Maddalena', b('blu acciaio', 'steel blue'), `${F}/acqua-della-maddalena_6c9f0048-d86f-40b4-a625-99ce4fe2b6c2.jpg`),
  st('SAV', 'Salvia di Sardegna', b('verde salvia', 'sage green'), `${F}/salvia-di-sardegna_49ab0db3-2992-40b9-b6e6-dbd6beae91b5.jpg`),
  st('VOC', 'Olive di Cerignola', b('verde oliva', 'olive green'), `${F}/verde-olivi-di-cerignola_b3572364-95dd-4f93-aa17-020271310042.jpg`),
  st('VMA', 'Origano di Sardegna', b('verde / marrone', 'brown / green'), `${F}/origano-di-sardegna_0c32121f-c3c3-4a79-86c4-6ce88e2b99e6.jpg`),
  st('VB', 'Verde British', b('verde pino', 'pine green'), `${F}/VB.jpg`),
  st('WP', 'Verde Pavone', b('petrolio', 'peacock green'), `${F}/verde-pavone_283da54f-4168-4ede-a7fb-1340b47049c3.jpg`),
  st('RO', 'Rosso', b('rosso vivo', 'bright red'), `${F}/rosso_8d906ce8-9517-4003-90ef-9370c89efe4c.jpg`),
  st('PR', 'Rosso Pompeiano', b('vinaccia', 'bordeaux'), `${F}/RP.jpg`),
  st('RCL', 'Red Clay', undefined),
  st('IMP', 'Impruneta Classica', undefined, `${F}/impruneta_classica_imp.jpg`),
  st('T', 'Terracotta Toscana', undefined, `${F}/terracotta-toscana_bba43ab8-dfe1-40b2-a65b-db11733f390c.jpg`),
  st('GS', 'Giallo Sahara', b('giallo senape', 'mustard yellow'), `${F}/GS.jpg`),
  la('LWH', 'Laccato lucido bianco', 'Glossy white lacquered', 'lucido', false, `${F}/01_MG_9940-LWH_ead5e5bb-d117-4b9c-9e90-6a4371753309.jpg`),
  la('LAN', 'Laccato lucido antracite', 'Glossy anthracite lacquered', 'lucido', false, `${F}/10_MG_9950-LAN_d868a9df-b672-430e-970c-d44143147102.jpg`),
  la('LBK', 'Laccato lucido nero', 'Glossy black lacquered', 'lucido', false, `${F}/17_MG_9958-LBK_51318cb4-5fdc-4f17-9fd1-13cbb3802a75.jpg`),
  la('LRO', 'Laccato lucido rosso', 'Glossy red lacquered', 'lucido', false, `${F}/07_MG_9946-LRO_64c12c89-4c33-4224-950c-0c9d3513d55d.jpg`),
  la('LRC', 'Laccato lucido terra rossa', 'Glossy red clay lacquered', 'lucido', false),
  la('LTO', 'Laccato lucido tortora', 'Glossy dove lacquered', 'lucido', false),
  la('LMT', 'Laccato opaco tortora', 'Matt dove lacquered', 'opaco', false),
  la('LAM', 'Laccato azzurro metallizzato opaco', 'Matt metallic blue lacquered', 'opaco', true, `${F}/LAM2-removebg-preview_76655d13-1f1d-497b-8422-b2f1fa439749.jpg`),
  la('LCM', 'Laccato rame metallizzato opaco', 'Matt metallic copper lacquered', 'opaco', true, `${F}/LCM2-removebg-preview_e54d1c2b-92c3-407a-a4a9-f4f61f1bbd2a.jpg`),
  la('LSM', 'Laccato sabbia metallizzato opaco', 'Matt metallic sand lacquered', 'opaco', true, `${F}/LSM2-removebg-preview_181302fb-242a-49cc-9067-55de2abd0c08.jpg`),
  la('LTM', 'Laccato titanio metallizzato opaco', 'Matt metallic titanium lacquered', 'opaco', true, `${F}/LTM2-removebg-preview_09547445-8cec-4030-b2f1-752940b2f008.jpg`),
  la('LCH', 'Laccato argento metallizzato lucido', 'Glossy metallic silver lacquered', 'lucido', true, `${F}/08_MG_9948-LCH_a72636d8-9c79-4d37-ace6-7393d1956b0d.jpg`),
  la('LGO', 'Laccato oro metallizzato lucido', 'Glossy metallic gold lacquered', 'lucido', true, `${F}/11_MG_9951-LGO_07508f1c-a911-4b2c-8533-51940829b47c.jpg`),
]

export const PAGINA_MATERIALI = {
  kicker: b('Materiali', 'Materials'),
  titolo: b('Materia, _finitura_, colore', 'Material, _finish_, colour'),
  testo: b(
    'Polietilene stampato in rotazione, le finiture Moleskin e Corten, una gamma di 38 colori: i materiali con cui Serralunga realizza a Biella arredi per hôtellerie, ristorazione e contract.',
    'Rotationally moulded polyethylene, the Moleskin and Corten finishes and a range of 38 colours: the materials Serralunga uses in Biella to make furniture for hotels, restaurants and contract projects.',
  ),
  foto: `${F}/MOLE_3.jpg`,
  alt: b('Superficie con finitura Moleskin', 'Surface with Moleskin finish'),
  cta: {
    kicker: b('Campioni e capitolati', 'Samples and specifications'),
    titolo: b('Materiali e colori per il vostro progetto', 'Materials and colours for your project'),
    testo: b(
      'Indicateci prodotti, quantità e contesto: vi rispondiamo con le finiture e i colori disponibili.',
      'Tell us the products, quantities and setting: we will reply with the finishes and colours available.',
    ),
    pulsante: b('Richiedi informazioni', 'Request information'),
    link: '/#listino',
  },
  seo: {
    titolo: b('Materiali e finiture per arredi outdoor | Serralunga', 'Materials and finishes for outdoor furniture'),
    descrizione: b(
      'Polietilene e Clean Fighter, Moleskin, Corten, 38 colori e sostenibilità: i materiali degli arredi Serralunga per hôtellerie e contract, prodotti a Biella.',
      'Polyethylene and Clean Fighter, Moleskin, Corten, 38 colours and sustainability: the materials of Serralunga furniture for hospitality and contract.',
    ),
  },
}

const RICAMBI = /ricambio|spare|cuscino|cushion|tappo|plug|telecomando|remote|lampadina|bulb|kit\b|cavo|cable/i

type Righe = Record<string, { id?: string }[] | undefined>

/**
 * Crea pagina Materiali, pagine dei materiali e colori che mancano, in italiano e in inglese.
 * Le righe degli elenchi (capitoli, pezzi...) sono le stesse nelle due lingue: l'inglese si scrive
 * sulle righe create dall'italiano (stesso id), come per i box della home.
 */
export async function completaMateriali(payload: Payload, media: Media, log: (m: string) => void) {
  // 1. Pagina indice
  const pag = (await payload.findGlobal({ slug: 'pagina-materiali', depth: 0 })) as unknown as { titolo?: string }
  if (!pag.titolo) {
    const P = PAGINA_MATERIALI
    const immagine = await media(P.foto, P.alt.it)
    const dati = (l: 'it' | 'en') => ({
      kicker: P.kicker[l],
      titolo: P.titolo[l],
      testo: P.testo[l],
      immagine,
      cta: { kicker: P.cta.kicker[l], titolo: P.cta.titolo[l], testo: P.cta.testo[l], pulsante: P.cta.pulsante[l], link: P.cta.link },
      seo: { titolo: P.seo.titolo[l], descrizione: P.seo.descrizione[l] },
    })
    await payload.updateGlobal({ slug: 'pagina-materiali', data: dati('it') as never })
    await payload.updateGlobal({ slug: 'pagina-materiali', locale: 'en', data: dati('en') as never })
    log('creata la pagina Materiali')
  }

  // 2. Pagine dei materiali
  let prodotti: ProdottoShop[] = []
  for (const m of MATERIALI) {
    const c = await payload.find({ collection: 'materiali', where: { slug: { equals: m.slug } }, limit: 1, depth: 0, draft: true })
    if (c.docs[0]) continue
    const immagine = await media(m.foto, m.alt.it)
    const capFoto: (number | null)[] = []
    for (const k of m.capitoli) capFoto.push(k.foto ? await media(k.foto, (k.alt || m.alt).it) : null)
    const galleria: { alt: Bi; id: number }[] = []
    for (const g of m.galleria || []) {
      const id = await media(g.foto, g.alt.it)
      if (id) galleria.push({ alt: g.alt, id })
    }

    const pezzi: { nome: Bi; tipo: Bi; immagine: number | null; link: string; fonte: string }[] = []
    if (m.pezzi) {
      const filtro = m.pezzi.filtro
      try {
        if (!prodotti.length) prodotti = await catalogo()
        const scelti = prodotti.filter(
          (p) =>
            !RICAMBI.test(`${p.product_type} ${p.title} ${p.handle}`) &&
            (filtro.test(p.title) || filtro.test(p.handle) || p.tags.some((t) => filtro.test(t))),
        )
        for (const p of scelti.slice(0, 36)) {
          const foto = p.images?.[0]?.src
          pezzi.push({
            nome: b(p.title, p.titoloEn || p.title),
            tipo: b(p.product_type || '', p.tipoEn || p.product_type || ''),
            immagine: foto ? await media(foto.replace(/^\/\//, 'https://'), p.title.slice(0, 120)) : null,
            link: `/prodotti/${p.handle}/`,
            fonte: p.handle,
          })
        }
      } catch (err) {
        payload.logger.warn(`[seed] materiali/${m.slug}: pezzi non letti da serralunga.com: ${(err as Error).message}`)
      }
    }

    const dati = (l: 'it' | 'en', righe?: Righe) => ({
      titolo: m.titolo[l],
      titoloPagina: m.titoloPagina?.[l],
      slug: m.slug,
      ordine: m.ordine,
      kicker: m.kicker[l],
      sottotitolo: m.sottotitolo[l],
      immagine,
      intro: m.intro[l],
      cifre: (m.cifre || []).map((x, k) => ({ id: righe?.cifre?.[k]?.id, valore: x.valore[l], etichetta: x.etichetta[l] })),
      capitoli: m.capitoli.map((x, k) => ({ id: righe?.capitoli?.[k]?.id, titolo: x.titolo[l], testo: x.testo[l], immagine: capFoto[k] })),
      galleria: galleria.map((x, k) => ({ id: righe?.galleria?.[k]?.id, immagine: x.id, didascalia: x.alt[l] })),
      pezziTitolo: m.pezzi?.titolo[l],
      pezzi: pezzi.map((x, k) => ({ id: righe?.pezzi?.[k]?.id, nome: x.nome[l], tipo: x.tipo[l], immagine: x.immagine, link: x.link, fonte: x.fonte })),
      mostraColori: !!m.colori,
      coloriTitolo: m.colori?.titolo[l],
      coloriNota: m.colori?.nota[l],
      seo: { titolo: m.seo.titolo[l], descrizione: m.seo.descrizione[l], immagine },
      _status: 'published',
    })
    const doc = (await payload.create({ collection: 'materiali', data: dati('it') as never, depth: 0 })) as unknown as Righe & { id: number }
    await payload.update({ collection: 'materiali', id: doc.id, locale: 'en', data: dati('en', doc) as never, depth: 0 })
    log(`creata la pagina materiali/${m.slug}${pezzi.length ? ` (${pezzi.length} pezzi)` : ''}`)
  }

  // 3. Cartella colori: si carica solo se la collezione è vuota.
  const quanti = await payload.count({ collection: 'colori' })
  if (quanti.totalDocs === 0) {
    let k = 0
    for (const c of COLORI) {
      k++
      const campione = c.foto ? await media(c.foto, `Campione colore ${c.nome} (${c.codice})`) : null
      const doc = await payload.create({
        collection: 'colori',
        data: {
          codice: c.codice,
          nome: c.nome,
          descrizione: c.tono?.it,
          famiglia: c.famiglia,
          finitura: c.finitura,
          metallizzato: !!c.metallizzato,
          campione,
          ordine: k * 10,
        } as never,
        depth: 0,
      })
      if (c.nomeEn || c.tono) {
        await payload.update({ collection: 'colori', id: doc.id, locale: 'en', data: { nome: c.nomeEn || c.nome, descrizione: c.tono?.en } as never, depth: 0 })
      }
    }
    log(`cartella colori: ${COLORI.length} colori`)
  }
}
