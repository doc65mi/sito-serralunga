/**
 * Heritage (Version: 1.00): contenuti di partenza della pagina /heritage/ e delle sottopagine.
 *
 * Fonti (serralunga.com, lette il 2026-11-16):
 * - /pages/loriginale-vaso-italiano-in-polietilene → pagina Heritage (timeline "200 anni in evoluzione",
 *   numeri, primati, qualità, Made in Italy, collezioni). Titoli e testi brevi sono quelli della pagina.
 * - /pages/about-us → La nostra storia e Living different (frasi e temi della pagina "Chi siamo":
 *   "Ogni anima ha un luogo di calma", il confine fluido tra interno ed esterno, Sorpresa, Design-oriented).
 * - /pages/sustainability → Produzione (stampaggio rotazionale, stabilimento di Biella, riciclo).
 * - /pages/colors → I colori (la mappa dei colori arriva dalla collezione "colori" della sezione Materiali).
 * Nessun dato inventato: dove serviva un testo di raccordo è una riscrittura di quanto dicono le pagine.
 *
 * `completaHeritage` scrive solo ciò che manca: una pagina già modificata dal pannello o dal sito resta com'è.
 */
import type { Payload } from 'payload'

type Media = (sorgente: string, alt: string, opz?: { min?: number }) => Promise<number | null>
type Dati = Record<string, unknown>

const F = 'https://serralunga.com/cdn/shop/files'
const P = 'https://serralunga.com/cdn/shop/products'

/** Foto: indirizzo, testo alternativo italiano e inglese. Si chiede sempre l'originale (min = 1600). */
const FOTO = {
  hero: [`${F}/Aqua_family_Fiore_di_lotto_Lifestyle_2_landscape_cea80197-cf2b-4040-bdd8-73a894da482e.jpg?v=1683276853`, 'Lettini Aqua di Serralunga a bordo piscina'],
  fabbrica: [`${F}/FABBRICA_Serralunga.jpg?v=1675104448`, 'Lo stabilimento Serralunga a Biella'],
  sera: [`${F}/V_NERI-FIRENZE_SUNSETl_-_flow_-_holly_all.jpg?v=1666968202`, 'Vasi luminosi Serralunga in un’ambientazione al tramonto'],
  versailles: [`${F}/VERSAILLES.jpg?v=1667497697`, 'Vasi di design Serralunga'],
  tradizione: [`${P}/Decorati_Festonati_lifestyle_4.jpg?v=1771515510`, 'Vasi della tradizione italiana Serralunga'],
  moleskin: [`${F}/Aqua_sunlounger_moleskin_square_1_1.jpg?v=1667496006`, 'Arredo outdoor Serralunga in finitura Moleskin'],
  storia: [`${F}/storia.jpg?v=1663513844`, 'La storia di Serralunga, azienda di Biella dal 1825'],
  patrimonio: [`${F}/azienda_storia_bg_1_2.jpg?v=1666965742`, 'Il patrimonio della famiglia Serralunga'],
  giulietta: [`${F}/giulietta-_Giulietta_7.jpg?v=1667497616`, 'Seduta Giulietta di Serralunga in un ambiente'],
  vasTwo: [`${F}/Vas_two_-_Atmosfera_and_Big-Bo_lifestyle_1.jpg?v=1666968110`, 'Vas-Two, Atmosfera e Big-Bo di Serralunga in un’ambientazione'],
  primavera: [`${F}/primavera-_belle_etoile_-_suare.jpg?v=1667486258`, 'Vasi Primavera e Belle Etoile di Serralunga'],
  sottsass: [`${F}/Faituttotu_Sottsass_FondazionePistoletto_phFedericaMoglia_2008_10060051_1024x1024_2x_7c8e7898-9b2f-4776-9872-8769713d9c65.jpg?v=1667498637`, 'Installazione Fai tutto tu alla Fondazione Pistoletto, foto Federica Moglia 2008'],
  flow: [`${F}/flow-l-_Flow_6_1a65aa66-0691-4d1b-83c4-f013a6a273ca.jpg?v=1667498694`, 'Vaso Flow di Serralunga'],
  sostenibile: [`${F}/sustainable_banner_landscape.jpg?v=1663511486`, 'Prodotti Serralunga in polietilene riciclabile'],
  ming: [`${F}/1A7A6484_ming.jpg?v=1674399154`, 'Vaso Ming di Rodolfo Dordoni per Serralunga'],
  bay: [`${F}/bay-_1A7A6394.jpg?v=1674399302`, 'Prodotto Serralunga in polietilene stampato a Biella'],
  dettaglio: [`${F}/TE_9455-HDR.jpg?v=1674478895`, 'Dettaglio di un prodotto Serralunga in polietilene'],
} as const

type Tappa = { anno: string; titolo: string; testo: string; foto?: string; alt?: string; en: { anno?: string; titolo: string; testo: string } }

const TAPPE: Tappa[] = [
  { anno: '1825', titolo: 'Le origini', testo: 'Serralunga nasce come conceria e avvia una storia industriale che attraverserà sei generazioni.', foto: 'heritage-1825.png', alt: 'Stabilimento Serralunga nel 1825, dalla tavola storica', en: { titolo: 'The origins', testo: 'Serralunga starts out as a tannery, beginning an industrial story that will span six generations.' } },
  { anno: '1900', titolo: 'La World Expo di Parigi', testo: 'Serralunga partecipa alla prima World Expo di Parigi e G.B. Serralunga entra a far parte del board.', foto: 'heritage-1900.png', alt: 'Esposizione di Parigi del 1900, dalla tavola storica', en: { titolo: 'The Paris World Expo', testo: 'Serralunga takes part in the Paris World Expo and G.B. Serralunga joins its board.' } },
  { anno: '1935', titolo: 'La lavorazione della gomma', testo: 'Inizia il lavoro con la gomma, una nuova tappa nella ricerca aziendale sui materiali.', foto: 'heritage-1935.png', alt: 'Lavorazione della gomma nel 1935, dalla tavola storica', en: { titolo: 'Working with rubber', testo: 'Work with rubber begins: a new stage in the company’s research into materials.' } },
  { anno: '1959', titolo: 'Lo stampaggio a iniezione', testo: 'Serralunga introduce lo stampaggio a iniezione e consolida la propria esperienza industriale.', foto: 'heritage-1959.png', alt: 'Stampaggio a iniezione nel 1959, dalla tavola storica', en: { titolo: 'Injection moulding', testo: 'Serralunga introduces injection moulding and consolidates its industrial expertise.' } },
  { anno: '1976', titolo: 'Prima in Europa', testo: 'Serralunga è la prima azienda europea a sviluppare lo stampaggio rotazionale.', foto: 'heritage-1976.png', alt: 'Sviluppo dello stampaggio rotazionale nel 1976, dalla tavola storica', en: { titolo: 'First in Europe', testo: 'Serralunga becomes the first European company to develop rotational moulding.' } },
  { anno: 'Anni ’90', titolo: 'I designer internazionali', testo: 'Prendono forma i primi progetti sviluppati con designer di fama internazionale.', foto: 'heritage-1990.png', alt: 'Primi progetti con designer internazionali negli anni Novanta, dalla tavola storica', en: { anno: 'The 1990s', titolo: 'International designers', testo: 'The first projects developed with internationally renowned designers take shape.' } },
  { anno: '1999', titolo: 'Il primo vaso di design', testo: 'La funzione incontra la firma d’autore e cambia il modo di vivere gli spazi.', foto: 'heritage-1999.png', alt: 'Il primo vaso di design, 1999, dalla tavola storica', en: { titolo: 'The first design planter', testo: 'Function meets the designer’s signature and changes the way spaces are lived in.' } },
  { anno: '2000', titolo: 'Il vaso fuori scala', testo: 'Il contenitore cresce e diventa architettura, segno riconoscibile nei grandi spazi.', foto: 'heritage-2000.png', alt: 'Il primo vaso fuori scala, 2000, dalla tavola storica', en: { titolo: 'The oversized planter', testo: 'The container grows and becomes architecture, a recognisable sign in large spaces.' } },
  { anno: '2001', titolo: 'Il vaso si illumina', testo: 'Serralunga presenta il primo vaso luminoso, capace di arredare anche le sere all’aperto.', foto: 'heritage-2001.png', alt: 'Il primo vaso illuminato, 2001, dalla tavola storica', en: { titolo: 'The planter lights up', testo: 'Serralunga presents the first illuminated planter, furnishing outdoor evenings too.' } },
  { anno: '2003', titolo: 'Un vaso al museo', testo: 'Serralunga è la prima azienda ad avere un vaso industriale esposto in un museo.', foto: 'heritage-2003.png', alt: 'Un vaso industriale esposto in un museo, 2003, dalla tavola storica', en: { titolo: 'A planter in a museum', testo: 'Serralunga is the first company to have an industrial planter exhibited in a museum.' } },
  { anno: '2006', titolo: 'La laccatura', testo: 'Viene introdotta la tecnologia di laccatura, che amplia colori, finiture e possibilità espressive.', foto: 'heritage-2006.png', alt: 'Introduzione della laccatura, 2006, dalla tavola storica', en: { titolo: 'Lacquering', testo: 'Lacquering technology is introduced, widening colours, finishes and expressive possibilities.' } },
  { anno: '2021', titolo: 'La finitura Moleskin', testo: 'L’innovazione prosegue con Moleskin, una finitura materica sviluppata per il design contemporaneo.', foto: 'heritage-2021.png', alt: 'La finitura Moleskin, 2021, dalla tavola storica', en: { titolo: 'The Moleskin finish', testo: 'Innovation continues with Moleskin, a tactile finish developed for contemporary design.' } },
  { anno: '2026', titolo: 'La collaborazione con RiceHouse', testo: 'Serralunga avvia una collaborazione con RiceHouse, proseguendo la ricerca su materiali e sostenibilità.', foto: 'heritage-2026.png', alt: 'La collaborazione con RiceHouse, 2026, dalla tavola storica', en: { titolo: 'The RiceHouse collaboration', testo: 'Serralunga begins a collaboration with RiceHouse, continuing its research into materials and sustainability.' } },
  { anno: 'Verso il 2027…', titolo: 'La storia continua', testo: 'Duecento anni di evoluzione diventano il punto di partenza per i prossimi progetti.', en: { anno: 'Towards 2027…', titolo: 'The story continues', testo: 'Two hundred years of evolution become the starting point for the projects to come.' } },
]

/** Coppie italiano → inglese dei testi della pagina Heritage e delle sottopagine. */
const EN: Record<string, string> = {
  // Heritage
  'Serralunga · Biella, dal 1825': 'Serralunga · Biella, since 1825',
  'L’originale vaso italiano\nin polietilene': 'The original Italian\npolyethylene planter',
  'Abitare lo spazio, _dentro e fuori_': 'Living in space, _indoors and out_',
  'Serralunga, azienda di Biella fondata nel 1825, produce vasi, arredi e luci in polietilene firmati da designer come Philippe Starck, Eero Aarnio, Rodolfo Dordoni, Marc Sadler e Naoto Fukasawa.':
    'Serralunga, a Biella company founded in 1825, makes polyethylene planters, furniture and lights signed by designers such as Philippe Starck, Eero Aarnio, Rodolfo Dordoni, Marc Sadler and Naoto Fukasawa.',
  'Scopri le collezioni': 'Discover the collections',
  'La nostra storia': 'Our story',
  'Fondata a Biella': 'Founded in Biella',
  'Generazioni della famiglia Serralunga': 'Generations of the Serralunga family',
  'Anni ’80': '1980s',
  'Primi in Europa nello stampaggio rotazionale': 'First in Europe in rotational moulding',
  'Prodotto in Italia, polietilene riciclabile': 'Made in Italy, recyclable polyethylene',
  '10+ anni': '10+ years',
  'Di vita per ogni prodotto, da −35 °C a +80 °C': 'Lifespan of every product, from −35 °C to +80 °C',
  '200 anni\nin evoluzione': '200 years\nof evolution',
  'Da conceria a laboratorio del design contemporaneo: tutte le tappe che hanno accompagnato due secoli di materiali, tecnologia e cultura del progetto.':
    'From tannery to contemporary design workshop: every milestone of two centuries of materials, technology and design culture.',
  'I primati': 'Firsts',
  'Prima di tutti,\nl’originale': 'Before everyone else,\nthe original',
  'Primi in Europa': 'First in Europe',
  'A sviluppare la tecnologia dello stampaggio rotazionale.': 'To develop rotational moulding technology.',
  'Il vaso di design': 'The design planter',
  'I primi a introdurre vasi firmati da designer e vasi fuori scala.': 'The first to introduce designer-signed and oversized planters.',
  'Il vaso luminoso': 'The illuminated planter',
  'I primi a disegnare un vaso illuminato.': 'The first to design an illuminated planter.',
  'Al museo': 'In a museum',
  'I primi a esporre un vaso industriale in un museo.': 'The first to exhibit an industrial planter in a museum.',
  'Nuove laccature': 'New lacquers',
  'I primi a sviluppare tecnologie di laccatura con pattern.': 'The first to develop patterned lacquering technologies.',
  Designer: 'Designers',
  'Firmati da architetti\ne designer': 'Signed by architects\nand designers',
  'Designer di fama internazionale hanno progettato per Serralunga prodotti che uniscono funzione, forma e qualità costruttiva.':
    'Internationally renowned designers have created products for Serralunga that combine function, form and build quality.',
  'Tutti i designer': 'All designers',
  Qualità: 'Quality',
  'L’originale\nsi riconosce': 'You can tell\nthe original',
  'Polietilene lineare a bassa densità (LLDPE), monomateriale, stampato a rotazione a Biella. Leggero, ma fatto per durare oltre dieci anni all’aperto.':
    'Linear low-density polyethylene (LLDPE), single-material, rotationally moulded in Biella. Lightweight, yet made to last more than ten years outdoors.',
  'Colore in massa': 'Mass-coloured',
  'Il colore è nel materiale, non in superficie: puro, omogeneo, duraturo.': 'The colour is in the material, not on the surface: pure, even, lasting.',
  'Bordi definiti': 'Defined edges',
  'Spigoli netti e costanti: il dettaglio che distingue l’originale dalle imitazioni.': 'Sharp, consistent edges: the detail that sets the original apart from imitations.',
  'Clean Fighter': 'Clean Fighter',
  'Il compound Serralunga che riduce la porosità della superficie di oltre il 90%: si pulisce senza fatica.':
    'The Serralunga compound that reduces surface porosity by more than 90%: it cleans effortlessly.',
  'Per ogni clima': 'For every climate',
  'Da −35 °C a +80 °C, con protezione UV e alta resistenza agli urti.': 'From −35 °C to +80 °C, with UV protection and high impact resistance.',
  'Ogni anima ha un luogo di calma.': 'Every soul has a place of calm.',
  'Made in Italy': 'Made in Italy',
  'Dal progetto\nalla produzione': 'From design\nto production',
  'Ogni pezzo è prodotto interamente nel nostro stabilimento di Biella, con materia prima trasformata in Italia e certificata secondo le normative UE.':
    'Every piece is made entirely in our Biella factory, from raw material processed in Italy and certified to EU standards.',
  'Polietilene riciclabile al 100%': '100% recyclable polyethylene',
  'Dal 30% al 70% di materiale rigenerato': '30% to 70% regenerated material',
  'Stampaggio a bassa temperatura, senza pressione': 'Low-temperature, pressure-free moulding',
  'Nessun solvente inquinante in produzione': 'No polluting solvents in production',
  'Stabilimento con pannelli fotovoltaici': 'Factory powered by photovoltaic panels',
  'Scarti di produzione riciclati internamente': 'Production waste recycled in-house',
  'Come produciamo': 'How we make it',
  'Heritage Serralunga': 'Serralunga heritage',
  'Due secoli\nin quattro capitoli': 'Two centuries\nin four chapters',
  'Le collezioni': 'The collections',
  'Vasi di design': 'Design planters',
  'Le forme dei designer': 'Shapes by designers',
  'Vasi con luce': 'Planters with light',
  'Il primo vaso luminoso': 'The first illuminated planter',
  'Vasi della Tradizione': 'Traditional planters',
  'Il classico italiano': 'The Italian classic',
  Arredo: 'Furniture',
  'Serralunga dal 1825': 'Serralunga since 1825',
  'L’originale\nper il vostro progetto': 'The original\nfor your project',
  'I cataloghi sono disponibili in PDF; per architetti, interior designer e strutture dell’ospitalità c’è l’ufficio contract.':
    'The catalogues are available in PDF; for architects, interior designers and hospitality venues there is our contract office.',
  'Richiedi il catalogo': 'Request the catalogue',
  'Serralunga Contract': 'Serralunga Contract',
  'Heritage: 200 anni di Serralunga | Serralunga': 'Heritage: 200 years of Serralunga',
  'Dal 1825 a Biella: la storia di Serralunga, primi in Europa nello stampaggio rotazionale, inventori del vaso di design e del vaso luminoso. Made in Italy.':
    'Since 1825 in Biella: the story of Serralunga, first in Europe in rotational moulding, inventors of the design planter and the illuminated planter.',

  // La nostra storia
  'Una passione\nper l’_innovazione_': 'A passion\nfor _innovation_',
  'Serralunga ha sempre promosso la cultura e investito nell’innovazione, diventando in più occasioni pioniere del settore.':
    'Serralunga has always promoted culture and invested in innovation, pioneering its sector on several occasions.',
  'Fondata a Biella nel 1825': 'Founded in Biella in 1825',
  'Generazioni di famiglia': 'Generations of the family',
  'L’originale': 'The original',
  'Prima in Europa a sviluppare la tecnologia dello stampaggio rotazionale. Prima a introdurre il vaso di design e a concepire il vaso fuori scala. Prima a disegnare un vaso illuminato, a esporre un vaso industriale in un museo e a sviluppare nuove tecnologie di laccatura con pattern.':
    'First in Europe to develop rotational moulding technology. First to introduce the design planter and to conceive the oversized planter. First to design an illuminated planter, to exhibit an industrial planter in a museum and to develop new patterned lacquering technologies.',
  'Un’azienda familiare nel cuore': 'A family company at heart',
  'Il patrimonio': 'Our heritage',
  'Serralunga nasce a Biella nel 1825. Serralunga è anche il nome della famiglia che da sei generazioni guida la parte creativa e imprenditoriale dell’azienda.\nNata come conceria, l’azienda ha poi lavorato le pelli per uso industriale. La svolta è arrivata con la lavorazione della plastica e con lo stampaggio rotazionale, tecnica importata dagli Stati Uniti: da lì sono nati oggetti di design italiano, arredi contemporanei e luci per esterni, tutti prodotti in Italia.':
    'Serralunga was founded in Biella in 1825. Serralunga is also the name of the family that, for six generations, has led the creative and entrepreneurial side of the company.\nBorn as a tannery, the company went on to process leather for industrial use. The turning point came with plastics and with rotational moulding, a technique imported from the United States: from there came Italian design objects, contemporary furniture and outdoor lighting, all made in Italy.',
  'Fatto in Italia': 'Made in Italy',
  'Serralunga progetta e produce in Italia, nello stabilimento di Biella, arredi pensati per il riposo e la vita all’aperto.':
    'Serralunga designs and manufactures in Italy, at its Biella plant, furniture made for rest and outdoor living.',
  'Innovazione culturale': 'Cultural innovation',
  'Serralunga è nota per aver spinto oltre i confini di materiali, tecnologie ed estetica per creare prodotti innovativi.':
    'Serralunga is known for pushing the boundaries of materials, technology and aesthetics to create innovative products.',
  'Design-oriented': 'Design-oriented',
  'Designer di fama internazionale hanno collaborato con Serralunga, creando prodotti che uniscono funzione, forma e qualità costruttiva.':
    'Internationally renowned designers have worked with Serralunga, creating products that combine function, form and build quality.',
  'Scopri i designer': 'Discover the designers',
  'Le tappe': 'The milestones',
  'Le tappe di due secoli': 'Two centuries of milestones',
  'Dal 1825 a oggi, la timeline completa è nella pagina Heritage.': 'From 1825 to today, the full timeline is on the Heritage page.',
  'Vedi la timeline': 'See the timeline',
  'Due secoli di storia\nal servizio del progetto': 'Two centuries of history\nat the service of the project',
  'Architetti, hotel e progetti speciali: l’ufficio contract segue dimensioni, colori e finiture dedicate.':
    'Architects, hotels and special projects: the contract office handles dedicated sizes, colours and finishes.',
  'La nostra storia: Serralunga dal 1825 | Serralunga': 'Our story: Serralunga since 1825',
  'Serralunga, azienda di famiglia di Biella dal 1825: da conceria a pioniere dello stampaggio rotazionale e del vaso di design. Sei generazioni di innovazione.':
    'Serralunga, a Biella family company since 1825: from tannery to pioneer of rotational moulding and the design planter. Six generations of innovation.',

  // Living different
  Manifesto: 'Manifesto',
  'Living _different_': 'Living _different_',
  'Abitare lo spazio, dentro e fuori: per Serralunga l’arredo è un modo diverso di vivere i luoghi, con oggetti pensati per riposare, rilassarsi e dare carattere agli ambienti.':
    'Living in space, indoors and out: for Serralunga, furniture is a different way of experiencing places, with objects designed for rest, relaxation and giving spaces character.',
  'Un luogo di calma': 'A place of calm',
  'Ogni anima ha un luogo di calma': 'Every soul has a place of calm',
  'Le parole di Marco Serralunga sono il punto di partenza: creare spazi naturali di calma e bellezza, in cui gli oggetti trasmettano pace a chi li vive.':
    'Marco Serralunga’s words are the starting point: creating natural spaces of calm and beauty, where objects bring peace to the people who use them.',
  'Dentro e fuori': 'Indoors and out',
  'Un confine fluido\ntra interno ed esterno': 'A fluid boundary\nbetween inside and outside',
  'Vasi, sedute, tavoli e luci nascono per stare all’aperto come in casa: lo stesso pezzo arreda una terrazza, un giardino, una hall o un bordo piscina.':
    'Planters, seating, tables and lights are made to live outdoors as well as indoors: the same piece furnishes a terrace, a garden, a lobby or a poolside.',
  Sorpresa: 'Surprise',
  'Presenza scultorea': 'Sculptural presence',
  'Un raro senso di armonia permette composizioni intriganti e spesso scenografiche. La forte presenza scultorea dei prodotti dà carattere e identità agli ambienti.':
    'A rare sense of harmony allows intriguing and often dramatic compositions. The strong sculptural presence of the products gives spaces character and identity.',
  'Nuovi modi di vivere': 'New ways of living',
  'Arredi per riposare\ne rilassarsi': 'Furniture for rest\nand relaxation',
  'La collezione Arredo, firmata da designer internazionali, porta il Made in Italy negli spazi dell’ospitalità e della vita all’aperto.':
    'The Furniture collection, signed by international designers, brings Made in Italy to hospitality spaces and outdoor living.',
  'Scopri l’arredo': 'Discover the furniture',
  'Un ambiente da progettare?': 'A space to design?',
  'Hotel, ristoranti, spa e residenze: l’ufficio contract vi aiuta a scegliere pezzi, colori e finiture.':
    'Hotels, restaurants, spas and residences: our contract office helps you choose pieces, colours and finishes.',
  'Scrivete all’ufficio contract': 'Write to the contract office',
  'Living different: il manifesto Serralunga | Serralunga': 'Living different: the Serralunga manifesto',
  'Living different: abitare lo spazio dentro e fuori con arredi, vasi e luci Serralunga dal carattere scultoreo, pensati per hotel, residenze e spazi pubblici.':
    'Living different: indoor and outdoor living with sculptural Serralunga furniture, planters and lights, designed for hotels, residences and public spaces.',

  // Produzione
  'Produzione a Biella': 'Made in Biella',
  'Produzione': 'Production',
  'Dal progetto\nalla _produzione_': 'From design\nto _production_',
  'Ogni pezzo è prodotto interamente nello stabilimento di Biella, con materia prima trasformata in Italia e certificata secondo le normative UE: meno trasporti, meno emissioni, controllo diretto su ogni fase.':
    'Every piece is made entirely in the Biella factory, from raw material processed in Italy and certified to EU standards: less transport, lower emissions and direct control over every stage.',
  'Riciclabile': 'Recyclable',
  'Materiale rigenerato': 'Regenerated material',
  'Minuti di ciclo per pezzo, circa': 'Minutes of moulding per piece, approx.',
  'Intervallo di utilizzo': 'Operating range',
  'Il processo': 'The process',
  'Lo stampaggio rotazionale': 'Rotational moulding',
  'La maggior parte dei prodotti è in monomateriale: resina LLDPE (polietilene lineare a bassa densità) stampata a rotazione. Lo stampaggio avviene a bassa temperatura e senza pressione, con raffreddamento ad aria non forzata.\nIl ciclo è lungo, circa 30 minuti per pezzo: il materiale non subisce shock termici né meccanici e conserva resistenza, elasticità e durata.':
    'Most products are single-material: LLDPE resin (linear low-density polyethylene), rotationally moulded. Moulding takes place at low temperature and without pressure, with natural air cooling.\nThe cycle is long, around 30 minutes per piece: the material undergoes no thermal or mechanical shock and keeps its strength, elasticity and durability.',
  'Produzione consapevole': 'Responsible production',
  'Un processo continuo': 'A continuous process',
  'Solo materia prima trasformata in Italia e certificata UE. Gli scarti di produzione vengono riciclati internamente e si usa sempre più LLDPE di seconda vita, con dal 30% al 70% di materiale rigenerato, senza perdere qualità né resistenza. Lo stabilimento è dotato di pannelli fotovoltaici.':
    'Only raw material processed in Italy and EU-certified. Production waste is recycled in-house and ever more second-life LLDPE is used, with 30% to 70% regenerated material and no loss of quality or strength. The factory runs on photovoltaic panels.',
  'Il ciclo della trasformazione': 'The transformation cycle',
  'Un’economia circolare virtuosa': 'A virtuous circular economy',
  'Il polietilene è riciclabile al 100%: a fine vita gli oggetti possono diventare polvere di plastica per crearne di nuovi. I prodotti durano oltre dieci anni e resistono da −35 °C a +80 °C, agli urti, ai raggi UV e ai climi salini.':
    'Polyethylene is 100% recyclable: at the end of their life, objects can be turned into plastic powder to make new ones. Products last more than ten years and withstand −35 °C to +80 °C, impacts, UV rays and salt-air climates.',
  'Colore in massa, bordi definiti e il compound Clean Fighter, che riduce la porosità della superficie di oltre il 90%: i dettagli che distinguono l’originale dalle imitazioni.':
    'Mass colouring, defined edges and the Clean Fighter compound, which reduces surface porosity by more than 90%: the details that set the original apart from imitations.',
  'Caratteristiche': 'Features',
  'Perché il polietilene Serralunga': 'Why Serralunga polyethylene',
  Sostenibile: 'Sustainable',
  'Nessun solvente inquinante nel processo produttivo.': 'No polluting solvents in the production process.',
  Ecologico: 'Eco-friendly',
  'Materie prime inerti e riciclabili.': 'Inert, recyclable raw materials.',
  'Di lunga durata': 'Long-lasting',
  'Resistente e duraturo: oltre 10 anni di vita all’aperto.': 'Strong and durable: over 10 years of outdoor life.',
  'Resistente alle intemperie': 'Weatherproof',
  'Sopporta escursioni da −35 °C a +80 °C, urti e raggi UV.': 'Withstands −35 °C to +80 °C, impacts and UV rays.',
  Leggero: 'Lightweight',
  'Facile da movimentare.': 'Easy to move and handle.',
  'Manutenzione minima': 'Minimal maintenance',
  'Pulizia rapida e semplice.': 'Quick, simple cleaning.',
  'Consideriamo la plastica un materiale prezioso: va usata con attenzione, solo quando ha senso.':
    'We consider plastic a precious material: it should be used with care, only when it makes sense.',
  'Specifiche per il capitolato': 'Specifications for the tender',
  'Schede tecniche, colori e finiture per progetti contract: l’ufficio contract risponde a progettisti e general contractor.':
    'Technical sheets, colours and finishes for contract projects: the contract office supports designers and general contractors.',
  'Produzione a Biella: stampaggio rotazionale | Serralunga': 'Made in Biella: rotational moulding | Serralunga',
  'Come nasce un prodotto Serralunga: stampaggio rotazionale in LLDPE riciclabile al 100% nello stabilimento di Biella, con 30-70% di materiale rigenerato.':
    'How a Serralunga product is made: rotational moulding in 100% recyclable LLDPE at the Biella factory, with 30–70% regenerated material.',

  // I colori
  'Cartella colori': 'Colour chart',
  'I _colori_': 'The _colours_',
  'Serralunga produce su richiesta: la maggior parte dei prodotti può essere realizzata in qualsiasi colore della cartella. Se il colore che vi serve non compare nella scheda del prodotto, contattateci.':
    'Serralunga makes to order: most products can be produced in any colour on the chart. For a colour not shown on the product page, contact us.',
  'Il colore è nel materiale, non in superficie: puro, omogeneo e duraturo, non sbiadisce facilmente.':
    'The colour is in the material, not on the surface: pure, even and lasting, it does not fade easily.',
  'Laccati e metallizzati': 'Lacquered and metallic',
  'Finiture laccate': 'Lacquered finishes',
  'Dal 2006 la tecnologia di laccatura amplia colori, finiture e possibilità espressive: laccati lucidi, laccati metallizzati lucidi e metallizzati opachi.':
    'Since 2006 lacquering technology has widened colours, finishes and expressive possibilities: gloss lacquers, gloss metallic lacquers and matt metallics.',
  'Un colore per il vostro progetto': 'A colour for your project',
  'Per forniture contract valutiamo colori dedicati e campionature: scriveteci prodotti e quantità.':
    'For contract supplies we consider dedicated colours and samples: tell us the quantities and products.',
  'Contattateci': 'Contact us',
  'I colori Serralunga: cartella colori e laccati | Serralunga': 'Serralunga colours: colour chart and lacquers',
  'La cartella colori Serralunga: colori in massa, laccati lucidi e metallizzati per vasi e arredi in polietilene. Produzione su richiesta per progetti contract.':
    'The Serralunga colour chart: mass colours, gloss lacquers and metallics for polyethylene planters and furniture. Made to order for contract projects.',
}

const en = (s: string) => EN[s] ?? s

async function foto(media: Media, chiave: keyof typeof FOTO): Promise<number | null> {
  const [url, alt] = FOTO[chiave]
  return media(url, alt, { min: 1600 })
}

export async function paginaHeritageDati(media: Media): Promise<Dati> {
  const tappe = []
  for (const t of TAPPE) {
    tappe.push({
      anno: t.anno,
      titolo: t.titolo,
      testo: t.testo,
      // Le foto della tavola storica non sono pubblicate su serralunga.com (la landing le chiama
      // con un percorso che risponde 404): si caricano dalla pagina quando il cliente le fornisce.
      immagine: null,
    })
  }
  return {
    kicker: 'Serralunga · Biella, dal 1825',
    titolo: 'L’originale vaso italiano\nin polietilene',
    sottotitolo: 'Abitare lo spazio, _dentro e fuori_',
    testo:
      'Serralunga, azienda di Biella fondata nel 1825, produce vasi, arredi e luci in polietilene firmati da designer come Philippe Starck, Eero Aarnio, Rodolfo Dordoni, Marc Sadler e Naoto Fukasawa.',
    immagine: await foto(media, 'hero'),
    pulsanti: [
      { testo: 'Scopri le collezioni', link: '/catalogo/' },
      { testo: 'La nostra storia', link: '/heritage/la-nostra-storia/' },
    ],
    numeri: [
      { valore: '1825', etichetta: 'Fondata a Biella' },
      { valore: '6', etichetta: 'Generazioni della famiglia Serralunga' },
      { valore: 'Anni ’80', etichetta: 'Primi in Europa nello stampaggio rotazionale' },
      { valore: '100%', etichetta: 'Prodotto in Italia, polietilene riciclabile' },
      { valore: '10+ anni', etichetta: 'Di vita per ogni prodotto, da −35 °C a +80 °C' },
    ],
    timeline: {
      kicker: 'Heritage',
      titolo: '200 anni\nin evoluzione',
      testo:
        'Da conceria a laboratorio del design contemporaneo: tutte le tappe che hanno accompagnato due secoli di materiali, tecnologia e cultura del progetto.',
      tappe,
    },
    primati: {
      kicker: 'I primati',
      titolo: 'Prima di tutti,\nl’originale',
      voci: [
        { titolo: 'Primi in Europa', testo: 'A sviluppare la tecnologia dello stampaggio rotazionale.' },
        { titolo: 'Il vaso di design', testo: 'I primi a introdurre vasi firmati da designer e vasi fuori scala.' },
        { titolo: 'Il vaso luminoso', testo: 'I primi a disegnare un vaso illuminato.' },
        { titolo: 'Al museo', testo: 'I primi a esporre un vaso industriale in un museo.' },
        { titolo: 'Nuove laccature', testo: 'I primi a sviluppare tecnologie di laccatura con pattern.' },
      ],
    },
    designer: {
      kicker: 'Designer',
      titolo: 'Firmati da architetti\ne designer',
      testo: 'Designer di fama internazionale hanno progettato per Serralunga prodotti che uniscono funzione, forma e qualità costruttiva.',
      pulsante: 'Tutti i designer',
    },
    qualita: {
      kicker: 'Qualità',
      titolo: 'L’originale\nsi riconosce',
      testo:
        'Polietilene lineare a bassa densità (LLDPE), monomateriale, stampato a rotazione a Biella. Leggero, ma fatto per durare oltre dieci anni all’aperto.',
      immagine: await foto(media, 'sera'),
      voci: [
        { titolo: 'Colore in massa', testo: 'Il colore è nel materiale, non in superficie: puro, omogeneo, duraturo.' },
        { titolo: 'Bordi definiti', testo: 'Spigoli netti e costanti: il dettaglio che distingue l’originale dalle imitazioni.' },
        { titolo: 'Clean Fighter', testo: 'Il compound Serralunga che riduce la porosità della superficie di oltre il 90%: si pulisce senza fatica.' },
        { titolo: 'Per ogni clima', testo: 'Da −35 °C a +80 °C, con protezione UV e alta resistenza agli urti.' },
      ],
    },
    citazione: { testo: 'Ogni anima ha un luogo di calma.', autore: 'Marco Serralunga', immagine: await foto(media, 'ming') },
    produzione: {
      kicker: 'Made in Italy',
      titolo: 'Dal progetto\nalla produzione',
      testo:
        'Ogni pezzo è prodotto interamente nel nostro stabilimento di Biella, con materia prima trasformata in Italia e certificata secondo le normative UE.',
      immagine: await foto(media, 'fabbrica'),
      punti: [
        'Polietilene riciclabile al 100%',
        'Dal 30% al 70% di materiale rigenerato',
        'Stampaggio a bassa temperatura, senza pressione',
        'Nessun solvente inquinante in produzione',
        'Stabilimento con pannelli fotovoltaici',
        'Scarti di produzione riciclati internamente',
      ].map((testo) => ({ testo })),
      pulsante: 'Come produciamo',
      link: '/heritage/produzione/',
    },
    sottopagine: { kicker: 'Heritage Serralunga', titolo: 'Due secoli\nin quattro capitoli' },
    collezioni: {
      kicker: 'Le collezioni',
      titolo: 'Scopri le collezioni',
      voci: [
        { titolo: 'Vasi di design', sottotitolo: 'Le forme dei designer', immagine: await foto(media, 'versailles'), link: '/catalogo/vasi/' },
        { titolo: 'Vasi con luce', sottotitolo: 'Il primo vaso luminoso', immagine: await foto(media, 'sera'), link: '/catalogo/vasi/con-luce/' },
        { titolo: 'Vasi della Tradizione', sottotitolo: 'Il classico italiano', immagine: await foto(media, 'tradizione'), link: '/catalogo/vasi/classici/' },
        { titolo: 'Arredo', sottotitolo: 'Living Different', immagine: await foto(media, 'moleskin'), link: '/catalogo/' },
      ],
    },
    cta: {
      kicker: 'Serralunga dal 1825',
      titolo: 'L’originale\nper il vostro progetto',
      testo: 'I cataloghi sono disponibili in PDF; per architetti, interior designer e strutture dell’ospitalità c’è l’ufficio contract.',
      pulsanti: [
        { testo: 'Richiedi il catalogo', link: '/contract/cataloghi/' },
        { testo: 'Serralunga Contract', link: '/contract/' },
      ],
    },
    seo: {
      titolo: 'Heritage: 200 anni di Serralunga | Serralunga',
      descrizione:
        'Dal 1825 a Biella: la storia di Serralunga, primi in Europa nello stampaggio rotazionale, inventori del vaso di design e del vaso luminoso. Made in Italy.',
    },
  }
}

export async function sottopagineHeritageDati(media: Media): Promise<Dati[]> {
  return [
    {
      slug: 'la-nostra-storia',
      ordine: 10,
      titolo: 'Una passione\nper l’_innovazione_',
      nomeMenu: 'La nostra storia',
      kicker: 'La nostra storia',
      testo: 'Serralunga ha sempre promosso la cultura e investito nell’innovazione, diventando in più occasioni pioniere del settore.',
      immagine: await foto(media, 'storia'),
      numeri: [
        { valore: '1825', etichetta: 'Fondata a Biella nel 1825' },
        { valore: '6', etichetta: 'Generazioni di famiglia' },
      ],
      capitoli: [
        {
          kicker: 'L’originale',
          titolo: 'L’originale',
          testo:
            'Prima in Europa a sviluppare la tecnologia dello stampaggio rotazionale. Prima a introdurre il vaso di design e a concepire il vaso fuori scala. Prima a disegnare un vaso illuminato, a esporre un vaso industriale in un museo e a sviluppare nuove tecnologie di laccatura con pattern.',
          immagine: await foto(media, 'flow'),
        },
        {
          kicker: 'Un’azienda familiare nel cuore',
          titolo: 'Il patrimonio',
          testo:
            'Serralunga nasce a Biella nel 1825. Serralunga è anche il nome della famiglia che da sei generazioni guida la parte creativa e imprenditoriale dell’azienda.\nNata come conceria, l’azienda ha poi lavorato le pelli per uso industriale. La svolta è arrivata con la lavorazione della plastica e con lo stampaggio rotazionale, tecnica importata dagli Stati Uniti: da lì sono nati oggetti di design italiano, arredi contemporanei e luci per esterni, tutti prodotti in Italia.',
          immagine: await foto(media, 'patrimonio'),
        },
        {
          kicker: 'Made in Italy',
          titolo: 'Fatto in Italia',
          testo: 'Serralunga progetta e produce in Italia, nello stabilimento di Biella, arredi pensati per il riposo e la vita all’aperto.',
          immagine: await foto(media, 'moleskin'),
        },
        {
          kicker: 'Innovazione culturale',
          titolo: 'Innovazione culturale',
          testo: 'Serralunga è nota per aver spinto oltre i confini di materiali, tecnologie ed estetica per creare prodotti innovativi.',
          immagine: await foto(media, 'sottsass'),
        },
        {
          kicker: 'Design-oriented',
          titolo: 'Design-oriented',
          testo: 'Designer di fama internazionale hanno collaborato con Serralunga, creando prodotti che uniscono funzione, forma e qualità costruttiva.',
          immagine: await foto(media, 'vasTwo'),
          pulsante: 'Scopri i designer',
          link: '/designer/',
        },
        {
          kicker: 'Le tappe',
          titolo: 'Le tappe di due secoli',
          testo: 'Dal 1825 a oggi, la timeline completa è nella pagina Heritage.',
          immagine: await foto(media, 'fabbrica'),
          pulsante: 'Vedi la timeline',
          link: '/heritage/#timeline',
        },
      ],
      citazione: { testo: 'Ogni anima ha un luogo di calma.', autore: 'Marco Serralunga' },
      cta: {
        kicker: 'Serralunga Contract',
        titolo: 'Due secoli di storia\nal servizio del progetto',
        testo: 'Architetti, hotel e progetti speciali: l’ufficio contract segue dimensioni, colori e finiture dedicate.',
        pulsante: 'Serralunga Contract',
        link: '/contract/',
      },
      seo: {
        titolo: 'La nostra storia: Serralunga dal 1825 | Serralunga',
        descrizione:
          'Serralunga, azienda di famiglia di Biella dal 1825: da conceria a pioniere dello stampaggio rotazionale e del vaso di design. Sei generazioni di innovazione.',
      },
    },
    {
      slug: 'living-different',
      ordine: 20,
      titolo: 'Living _different_',
      nomeMenu: 'Living different',
      kicker: 'Manifesto',
      testo:
        'Abitare lo spazio, dentro e fuori: per Serralunga l’arredo è un modo diverso di vivere i luoghi, con oggetti pensati per riposare, rilassarsi e dare carattere agli ambienti.',
      immagine: await foto(media, 'giulietta'),
      capitoli: [
        {
          kicker: 'Un luogo di calma',
          titolo: 'Ogni anima ha un luogo di calma',
          testo:
            'Le parole di Marco Serralunga sono il punto di partenza: creare spazi naturali di calma e bellezza, in cui gli oggetti trasmettano pace a chi li vive.',
          immagine: await foto(media, 'hero'),
        },
        {
          kicker: 'Dentro e fuori',
          titolo: 'Un confine fluido\ntra interno ed esterno',
          testo:
            'Vasi, sedute, tavoli e luci nascono per stare all’aperto come in casa: lo stesso pezzo arreda una terrazza, un giardino, una hall o un bordo piscina.',
          immagine: await foto(media, 'sera'),
        },
        {
          kicker: 'Sorpresa',
          titolo: 'Presenza scultorea',
          testo:
            'Un raro senso di armonia permette composizioni intriganti e spesso scenografiche. La forte presenza scultorea dei prodotti dà carattere e identità agli ambienti.',
          immagine: await foto(media, 'primavera'),
        },
        {
          kicker: 'Nuovi modi di vivere',
          titolo: 'Arredi per riposare\ne rilassarsi',
          testo:
            'La collezione Arredo, firmata da designer internazionali, porta il Made in Italy negli spazi dell’ospitalità e della vita all’aperto.',
          immagine: await foto(media, 'moleskin'),
          pulsante: 'Scopri l’arredo',
          link: '/catalogo/',
        },
      ],
      citazione: { testo: 'Ogni anima ha un luogo di calma.', autore: 'Marco Serralunga', immagine: await foto(media, 'versailles') },
      cta: {
        kicker: 'Serralunga Contract',
        titolo: 'Un ambiente da progettare?',
        testo: 'Hotel, ristoranti, spa e residenze: l’ufficio contract vi aiuta a scegliere pezzi, colori e finiture.',
        pulsante: 'Scrivete all’ufficio contract',
        link: '/contract/',
      },
      seo: {
        titolo: 'Living different: il manifesto Serralunga | Serralunga',
        descrizione:
          'Living different: abitare lo spazio dentro e fuori con arredi, vasi e luci Serralunga dal carattere scultoreo, pensati per hotel, residenze e spazi pubblici.',
      },
    },
    {
      slug: 'produzione',
      ordine: 30,
      titolo: 'Dal progetto\nalla _produzione_',
      nomeMenu: 'Produzione',
      kicker: 'Produzione a Biella',
      testo:
        'Ogni pezzo è prodotto interamente nello stabilimento di Biella, con materia prima trasformata in Italia e certificata secondo le normative UE: meno trasporti, meno emissioni, controllo diretto su ogni fase.',
      immagine: await foto(media, 'fabbrica'),
      numeri: [
        { valore: '100%', etichetta: 'Riciclabile' },
        { valore: '30–70%', etichetta: 'Materiale rigenerato' },
        { valore: '30', etichetta: 'Minuti di ciclo per pezzo, circa' },
        { valore: '−35/+80 °C', etichetta: 'Intervallo di utilizzo' },
      ],
      capitoli: [
        {
          kicker: 'Il processo',
          titolo: 'Lo stampaggio rotazionale',
          testo:
            'La maggior parte dei prodotti è in monomateriale: resina LLDPE (polietilene lineare a bassa densità) stampata a rotazione. Lo stampaggio avviene a bassa temperatura e senza pressione, con raffreddamento ad aria non forzata.\nIl ciclo è lungo, circa 30 minuti per pezzo: il materiale non subisce shock termici né meccanici e conserva resistenza, elasticità e durata.',
          immagine: await foto(media, 'bay'),
        },
        {
          kicker: 'Produzione consapevole',
          titolo: 'Un processo continuo',
          testo:
            'Solo materia prima trasformata in Italia e certificata UE. Gli scarti di produzione vengono riciclati internamente e si usa sempre più LLDPE di seconda vita, con dal 30% al 70% di materiale rigenerato, senza perdere qualità né resistenza. Lo stabilimento è dotato di pannelli fotovoltaici.',
          immagine: await foto(media, 'sostenibile'),
        },
        {
          kicker: 'Il ciclo della trasformazione',
          titolo: 'Un’economia circolare virtuosa',
          testo:
            'Il polietilene è riciclabile al 100%: a fine vita gli oggetti possono diventare polvere di plastica per crearne di nuovi. I prodotti durano oltre dieci anni e resistono da −35 °C a +80 °C, agli urti, ai raggi UV e ai climi salini.',
          immagine: await foto(media, 'ming'),
        },
        {
          kicker: 'Qualità',
          titolo: 'L’originale\nsi riconosce',
          testo:
            'Colore in massa, bordi definiti e il compound Clean Fighter, che riduce la porosità della superficie di oltre il 90%: i dettagli che distinguono l’originale dalle imitazioni.',
          immagine: await foto(media, 'dettaglio'),
        },
      ],
      punti: {
        kicker: 'Caratteristiche',
        titolo: 'Perché il polietilene Serralunga',
        voci: [
          { titolo: 'Sostenibile', testo: 'Nessun solvente inquinante nel processo produttivo.' },
          { titolo: 'Ecologico', testo: 'Materie prime inerti e riciclabili.' },
          { titolo: 'Di lunga durata', testo: 'Resistente e duraturo: oltre 10 anni di vita all’aperto.' },
          { titolo: 'Resistente alle intemperie', testo: 'Sopporta escursioni da −35 °C a +80 °C, urti e raggi UV.' },
          { titolo: 'Leggero', testo: 'Facile da movimentare.' },
          { titolo: 'Manutenzione minima', testo: 'Pulizia rapida e semplice.' },
        ],
      },
      citazione: { testo: 'Consideriamo la plastica un materiale prezioso: va usata con attenzione, solo quando ha senso.', autore: 'Serralunga' },
      cta: {
        kicker: 'Serralunga Contract',
        titolo: 'Specifiche per il capitolato',
        testo: 'Schede tecniche, colori e finiture per progetti contract: l’ufficio contract risponde a progettisti e general contractor.',
        pulsante: 'Serralunga Contract',
        link: '/contract/',
      },
      seo: {
        titolo: 'Produzione a Biella: stampaggio rotazionale | Serralunga',
        descrizione:
          'Come nasce un prodotto Serralunga: stampaggio rotazionale in LLDPE riciclabile al 100% nello stabilimento di Biella, con 30-70% di materiale rigenerato.',
      },
    },
    {
      slug: 'i-colori',
      ordine: 40,
      titolo: 'I _colori_',
      nomeMenu: 'I colori',
      kicker: 'Cartella colori',
      testo:
        'Serralunga produce su richiesta: la maggior parte dei prodotti può essere realizzata in qualsiasi colore della cartella. Se il colore che vi serve non compare nella scheda del prodotto, contattateci.',
      immagine: await foto(media, 'vasTwo'),
      capitoli: [
        {
          kicker: 'Colore in massa',
          titolo: 'Colore in massa',
          testo: 'Il colore è nel materiale, non in superficie: puro, omogeneo e duraturo, non sbiadisce facilmente.',
          immagine: await foto(media, 'primavera'),
        },
        {
          kicker: 'Laccati e metallizzati',
          titolo: 'Finiture laccate',
          testo:
            'Dal 2006 la tecnologia di laccatura amplia colori, finiture e possibilità espressive: laccati lucidi, laccati metallizzati lucidi e metallizzati opachi.',
          immagine: await foto(media, 'versailles'),
        },
      ],
      cta: {
        kicker: 'Serralunga Contract',
        titolo: 'Un colore per il vostro progetto',
        testo: 'Per forniture contract valutiamo colori dedicati e campionature: scriveteci prodotti e quantità.',
        pulsante: 'Contattateci',
        link: '/contatti/',
      },
      seo: {
        titolo: 'I colori Serralunga: cartella colori e laccati | Serralunga',
        descrizione:
          'La cartella colori Serralunga: colori in massa, laccati lucidi e metallizzati per vasi e arredi in polietilene. Produzione su richiesta per progetti contract.',
      },
    },
  ]
}

/**
 * Inglese sulle stesse righe del documento salvato (stessi id): si traduce ogni testo con EN,
 * le tappe della timeline con la loro traduzione, e si lasciano link, numeri e foto come sono.
 */
const NON_TRADURRE = new Set(['id', 'slug', 'link', 'immagine', 'ordine', 'blockType', 'createdAt', 'updatedAt', 'globalType'])
function inglese(v: unknown, chiave = ''): unknown {
  if (Array.isArray(v)) return v.map((x) => inglese(x, chiave))
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v as Dati).map(([k, x]) => [k, NON_TRADURRE.has(k) ? x : inglese(x, k)]))
  }
  if (typeof v === 'string') return en(v)
  return v
}
function tappeInglese(tappe: Dati[] = []) {
  return tappe.map((t) => {
    const fonte = TAPPE.find((x) => x.anno === t.anno && x.titolo === t.titolo)
    if (!fonte) return t
    return { ...t, anno: fonte.en.anno ?? fonte.anno, titolo: fonte.en.titolo, testo: fonte.en.testo }
  })
}
const pulisci = (d: Dati) => {
  const { id: _i, createdAt: _c, updatedAt: _u, globalType: _g, ...resto } = d
  return resto
}

/** Crea la pagina Heritage e le sottopagine mancanti (IT + EN). Non tocca ciò che esiste già. */
export async function completaHeritage(payload: Payload, media: Media, log: (m: string) => void) {
  const pagina = (await payload.findGlobal({ slug: 'pagina-heritage', depth: 0 })) as unknown as Dati
  if (!pagina.titolo) {
    const salvata = (await payload.updateGlobal({ slug: 'pagina-heritage', depth: 0, data: (await paginaHeritageDati(media)) as never })) as unknown as Dati
    const dati = inglese(pulisci(salvata)) as Dati
    const tl = (salvata.timeline || {}) as Dati
    dati.timeline = { ...(dati.timeline as Dati), tappe: tappeInglese(tl.tappe as Dati[]) }
    await payload.updateGlobal({ slug: 'pagina-heritage', locale: 'en', depth: 0, data: dati as never })
    log('creata la pagina Heritage (IT + EN)')
  }
  for (const d of await sottopagineHeritageDati(media)) {
    const trovata = await payload.find({ collection: 'pagine-heritage', where: { slug: { equals: d.slug } }, limit: 1, depth: 0 })
    if (trovata.docs[0]) continue
    const doc = (await payload.create({ collection: 'pagine-heritage', depth: 0, data: d as never })) as unknown as Dati
    await payload.update({ collection: 'pagine-heritage', id: doc.id as number, locale: 'en', depth: 0, data: inglese(pulisci(doc)) as never })
    log(`creata la sottopagina Heritage /heritage/${d.slug}/ (IT + EN)`)
  }
}

