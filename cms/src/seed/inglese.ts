/**
 * Traduzione inglese dei contenuti di partenza (Version: 1.02).
 * Chiave = testo italiano del seed, valore = testo inglese. Dopo il seed italiano,
 * `applicaInglese` riempie i campi inglesi ancora vuoti; quelli già scritti dal pannello restano.
 * Nomi propri, misure e codici uguali nelle due lingue non servono qui.
 */
import type { Payload } from 'payload'

import { designerInglese } from './designer-altri'

export const EN: Record<string, string> = {
  // Impostazioni
  'Arredi, vasi e luci di design — prodotti a Biella dal 1825': 'Design furniture, planters and lighting — made in Biella since 1825',
  'Richiedi il catalogo': 'Request the catalogue',
  Progetti: 'Projects',
  Installazioni: 'Installations',
  Materiali: 'Materials',
  'Listino B2B': 'B2B price list',
  'Arredi, vasi e luci di design per interni ed esterni, prodotti a Biella dal 1825 per progetti di hôtellerie, residenziali e contract.':
    'Design furniture, planters and lighting for indoor and outdoor spaces, made in Biella since 1825 for hospitality, residential and contract projects.',
  Prodotti: 'Products',
  'Vasi e fioriere': 'Vases and planters',
  Arredo: 'Furniture',
  Illuminazione: 'Lighting',
  Accessori: 'Accessories',
  'Cartella colori': 'Colour chart',
  Professionisti: 'Professionals',
  'I designer': 'The designers',
  'Listino riservato': 'Trade price list',
  'Condizioni di vendita': 'Terms of sale',
  Termini: 'Terms',
  Italia: 'Italy',

  // Home
  'Serralunga — Biella, dal 1825': 'Serralunga — Biella, since 1825',
  'Design italiano\nper gli spazi _aperti_': 'Italian design\nfor _open_ spaces',
  'Vasi, sedute, tavoli e luci in polietilene, disegnati da architetti e designer e prodotti a Biella. Per progetti di hôtellerie, ristorazione, residenze e spazi pubblici.':
    'Polyethylene planters, seating, tables and lighting, designed by architects and designers and made in Biella. For hotel, restaurant, residential and public-space projects.',
  'Le collezioni': 'The collections',
  Hôtellerie: 'Hotels',
  'Terrazze, roof e aree piscina: fioriere, sedute e luci in polietilene tinto in massa, che restano all’aperto tutto l’anno e resistono a sole, salsedine e gelo.':
    'Terraces, rooftops and pool areas: planters, seating and lighting in mass-coloured polyethylene that stay outdoors all year round and withstand sun, salt air and frost.',
  Ristorazione: 'Restaurants',
  'Dehors e sale: sedute, tavoli e fioriere per organizzare gli spazi, in colori e finiture coordinati con l’identità del locale.':
    'Outdoor dining areas and dining rooms: seating, tables and planters to organise the space, in colours and finishes coordinated with the venue’s identity.',
  'Residenze': 'Residences',
  "Pezzi firmati, finiture laccate o Moleskin e vasi della tradizione italiana per ville, giardini e terrazze.":
    'Signature pieces, lacquered or Moleskin finishes and traditional Italian planters for villas, gardens and terraces.',
  'Chi siamo': 'About us',
  "Ricerca sui materiali\ndal 1825": 'Research into materials\nsince 1825',
  'Serralunga nasce a Biella nel 1825 ed è stata la prima azienda in Europa a sviluppare lo stampaggio rotazionale. Nello stabilimento di Biella produce arredi e vasi in polietilene lineare (LLDPE) tinto in massa e riciclabile al 100%, stabili da −35 °C a +80 °C e resistenti a raggi UV, urti e salsedine.':
    'Serralunga was founded in Biella in 1825 and was the first company in Europe to develop rotational moulding. At its Biella plant it makes furniture and planters in mass-coloured, 100% recyclable linear polyethylene (LLDPE), stable from −35 °C to +80 °C and resistant to UV rays, impacts and salt air.',
  'Materiale riciclabile al 100%': '100% recyclable material',
  'Prodotto a Biella': 'Made in Biella, Italy',
  '38 colori in cartella': '38 colours on the chart',
  'Finiture laccate, Moleskin e Corten': 'Lacquered, Moleskin and Corten finishes',
  'Serralunga Contract': 'Serralunga Contract',
  'Anni di storia industriale': 'Years of industrial history',
  'Colori in cartella': 'Colours on the chart',
  'Polietilene riciclabile': 'Recyclable polyethylene',
  'Intervallo di utilizzo': 'Operating range',
  INSTALLAZIONI: 'INSTALLATIONS',
  "Terrazze d’albergo, dehors, aree piscina e giardini privati: ambientazioni con vasi, sedute e luci Serralunga.":
    'Hotel terraces, outdoor dining areas, pool areas and private gardens: settings with Serralunga planters, seating and lighting.',
  "Una selezione per tipo di spazio: hotel, ristorazione, spa e residenze.":
    'A selection by type of space: hotels, restaurants, spas and residences.',
  'Corte d’ingresso': 'Entrance courtyard',
  'Big-Bo, Luisa Bocchietto': 'Big-Bo, Luisa Bocchietto',
  'Atmosfera e Vas-One Family': 'Atmosfera and Vas-One Family',
  'Vasca esterna, spa': 'Outdoor pool, spa',
  'Fiore di Loto, Marta Sansoni': 'Fiore di Loto, Marta Sansoni',
  'Lounge esterna': 'Outdoor lounge',
  'Divano Riviera': 'Riviera sofa',
  'Bordo piscina': 'Poolside',
  'Collezione Aqua, Marc Sadler': 'Aqua collection, Marc Sadler',
  'Giardino privato': 'Private garden',
  'Loggiato di una dimora storica': 'Loggia of a historic residence',
  'Decorati, Festonato, Orcio': 'Decorati, Festonato, Orcio',
  'Vedi tutte le installazioni': 'See all installations',
  "Vasi, arredi, illuminazione e accessori: forme disegnate da architetti e designer, in polietilene tinto in massa per interni ed esterni.":
    'Planters, furniture, lighting and accessories: shapes designed by architects and designers, in mass-coloured polyethylene for indoor and outdoor use.',
  Vasi: 'Vases',
  'Al servizio\ndel progetto': 'At the service\nof the project',
  'Supporto alla progettazione': 'Design support',
  'Schede tecniche, disegni quotati e campioni colore per la scelta dei pezzi e la stesura del capitolato.':
    'Technical sheets, dimensioned drawings and colour samples for choosing the pieces and writing the specification.',
  'Colori e finiture su misura': 'Bespoke colours and finishes',
  "38 colori in cartella, laccati lucidi e metallizzati, finiture Moleskin e Corten. Per i progetti contract si valutano colori dedicati.":
    "38 colours on the chart, gloss and metallic lacquers, Moleskin and Corten finishes. Dedicated colours can be considered for contract projects.",
  'Produzione a Biella': 'Made in Biella',
  'Stampaggio rotazionale nello stabilimento di Biella: la maggior parte dei prodotti si realizza su richiesta, nel colore scelto.':
    'Rotational moulding at the Biella plant: most products are made to order, in the colour you choose.',
  'Lavoro conto terzi': 'Contract manufacturing',
  'Cataloghi e documentazione': 'Catalogues and documentation',
  'Richiedi il catalogo\ne la cartella colori': 'Request the catalogue\nand colour chart',
  'Per architetti, interior designer, strutture dell’ospitalità e rivenditori: indicateci il progetto e vi inviamo catalogo, cartella colori e schede tecniche.':
    'For architects, interior designers, hospitality venues and dealers: tell us about your project and we will send the catalogue, colour chart and technical sheets.',
  'Grazie: vi invieremo catalogo, cartella colori e schede tecniche.':
    'Thank you: we will send you the catalogue, colour chart and technical sheets.',
  'Serralunga: arredi, vasi e luci di design dal 1825': 'Serralunga: design furniture and planters since 1825',
  'Vasi, sedute, tavoli e luci in polietilene firmati da architetti e designer, prodotti a Biella dal 1825 per hôtellerie, ristorazione, residenze e spazi pubblici.':
    'Polyethylene planters, seating, tables and lighting by architects and designers, made in Biella since 1825 for hotels, restaurants, residences and public spaces.',

  // Pagina designer
  'Le firme': 'The signatures',
  'I designer\nSerralunga': 'The Serralunga\ndesigners',
  "Architetti e designer italiani e internazionali che dagli anni Novanta disegnano per Serralunga. Ogni pezzo a catalogo porta il nome di chi lo ha progettato: forma, proporzioni e uso nascono da un progetto d’autore.":
    'Italian and international architects and designers who have been designing for Serralunga since the 1990s. Every piece in the catalogue bears the name of its designer: shape, proportions and use come from an authored design.',
  'Progetti su misura': 'Bespoke projects',
  'Colori e finiture\nper il vostro progetto': 'Colours and finishes\nfor your project',
  'Per i progetti contract valutiamo colori, finiture e varianti dedicate: scriveteci prodotti, quantità e contesto.':
    'For contract projects we consider dedicated colours, finishes and variants: tell us the products, quantities and setting.',
  'Parliamo del progetto': 'Let’s talk about the project',
  'I designer Serralunga': 'The Serralunga designers',
  "Marc Sadler, Luisa Bocchietto, Marta Sansoni: i designer e gli architetti che firmano vasi, arredi e luci Serralunga per l'ospitalità e il contract.":
    'Marc Sadler, Luisa Bocchietto, Marta Sansoni: the designers and architects behind Serralunga vases, furniture and lights for hospitality and contract.',

  // Designer
  Architetto: 'Architect',
  'Designer · Francia / Italia': 'Designer · France / Italy',
  "Quattro volte Compasso d'Oro. Per Serralunga firma l'Aqua Lounger e la famiglia Aqua.":
    "Four-time Compasso d'Oro winner. For Serralunga he designed the Aqua Lounger and the Aqua family.",
  '«Il materiale non è un vincolo: è il primo interlocutore del progetto.»':
    '“The material is not a constraint: it is the first partner in the design.”',
  "Nato in Austria e cresciuto tra Francia e Italia, si forma all'ENSAD di Parigi con una tesi sulle materie plastiche. Negli anni Settanta mette a punto il primo scarpone da sci termoplastico interamente riciclabile: da lì in avanti la sua ricerca vive sulle contaminazioni fra tecnologie sportive, industria e arredo.":
    'Born in Austria and raised between France and Italy, he trained at ENSAD in Paris with a thesis on plastics. In the 1970s he developed the first fully recyclable thermoplastic ski boot: from then on his research has thrived on the cross-pollination of sports technology, industry and furniture.',
  'Il suo lavoro attraversa illuminazione, attrezzatura sportiva, imbottiti e outdoor. Per Serralunga porta nel mondo della piscina la logica dello stampaggio rotazionale: un guscio unico, nessun assemblaggio, il comfort ottenuto dalla sola geometria.':
    'His work spans lighting, sports equipment, upholstery and outdoor furniture. For Serralunga he brings the logic of rotational moulding to the poolside: a single shell, no assembly, comfort achieved through geometry alone.',
  "Compassi d'Oro": "Compasso d'Oro awards",
  'Primo riconoscimento ADI': 'First ADI award',
  Parigi: 'Paris',
  'Un guscio unico, nessun assemblaggio.': 'A single shell, no assembly.',
  'I pezzi\nper Serralunga': 'The pieces\nfor Serralunga',
  'Lavoriamo con i designer,\nper il vostro luogo': 'We work with designers,\nfor your place',
  'Marc Sadler, designer | Serralunga': 'Marc Sadler, designer | Serralunga',
  "Marc Sadler, quattro Compassi d'Oro, firma per Serralunga l'Aqua Lounger e la famiglia Aqua: biografia, premi e pezzi disegnati per l'outdoor contract.":
    "Marc Sadler, four-time Compasso d'Oro winner, designed the Aqua Lounger and the Aqua family for Serralunga: biography, awards and pieces for outdoor contract.",
  'Vas-One Family e Big-Bo: i volumi monumentali che segnano gli ingressi e le corti.':
    'Vas-One Family and Big-Bo: the monumental volumes that mark entrances and courtyards.',
  'Direzione artistica della collezione e disegno della Vas-One Family, da Big-Bo ai volumi fuori scala.':
    'Art direction of the collection and design of the Vas-One Family, from Big-Bo to the oversized volumes.',
  'Fiore di Loto: geometria, monocromia e un rapporto armonioso fra luce, oggetto e acqua.':
    'Fiore di Loto: geometry, monochrome and a harmonious relationship between light, object and water.',
  'Autrice del Fiore di Loto: geometria, monocromia e un rapporto armonioso fra luce, oggetto e spazio.':
    'Designer of the Fiore di Loto: geometry, monochrome and a harmonious relationship between light, object and space.',

  // Case history — La Loge du Massif
  "Case history — Courmayeur, Valle d'Aosta": 'Case history — Courmayeur, Aosta Valley',
  'Una terrazza a quota 1.700 sul Monte Bianco: arredarla significa resistere a due metri di neve e restare eleganti quando il sole torna a batterci sopra.':
    'A terrace at 1,700 metres facing Mont Blanc: furnishing it means withstanding two metres of snow and staying elegant when the sun beats down on it again.',
  'Poltrone Canisse': 'Canisse armchairs',
  'Ristorazione · Courmayeur': 'Restaurants · Courmayeur',
  'La Loge du Massif: sedersi davanti al Monte Bianco': 'La Loge du Massif: a seat in front of Mont Blanc',
  'Il progetto': 'The project',
  'Sedersi\ndavanti al Massiccio': 'A seat\nfacing the Massif',
  "Chalet in legno affacciato sulle piste, cucina d'altura e un dehors che d'inverno diventa il salotto più ambìto della valle. La committenza chiedeva sedute che non temessero gelo, sale antineve e sbalzi termici, ma che al tramonto avessero la morbidezza di un divano da interni.":
    'A wooden chalet overlooking the slopes, mountain cuisine and an outdoor area that in winter becomes the most sought-after lounge in the valley. The client asked for seating that would not fear frost, road salt or temperature swings, yet at sunset would feel as soft as an indoor sofa.',
  'La risposta è Canisse: la poltrona a canne verticali in polietilene tinto in massa, disposta a corona intorno al braciere. Un disegno che cita le stuoie di canne dei rifugi, ma nasce dallo stesso stampaggio rotazionale dei nostri vasi monumentali.':
    'The answer is Canisse: the armchair with vertical reeds in mass-coloured polyethylene, arranged in a ring around the fire pit. A design that recalls the reed mats of mountain huts, yet comes from the same rotational moulding as our monumental vases.',
  Luogo: 'Location',
  Quota: 'Altitude',
  '1.700 m s.l.m.': '1,700 m a.s.l.',
  Tipologia: 'Type',
  'Ristorante & lounge sulle piste': 'Slope-side restaurant & lounge',
  Uso: 'Use',
  "Dehors, tutto l'anno": 'Outdoor area, all year round',
  'Escursione termica': 'Temperature range',
  "Da −20 °C al sole d'agosto": 'From −20 °C to the August sun',
  '«Alle cinque del pomeriggio la terrazza è il posto più caldo della montagna.»':
    '“At five in the afternoon the terrace is the warmest place on the mountain.”',
  'La sfida': 'The challenge',
  "Sedute lasciate fuori tutto l'inverno, sepolte dalla neve e scoperte al primo sole: nessun tessuto, nessuna verniciatura che possa sfogliarsi.":
    'Seating left outside all winter, buried by snow and uncovered at the first sun: no fabric, no paint that could peel.',
  'La scelta': 'The choice',
  "Polietilene tinto in massa, resistente da −35 °C a +80 °C: il colore è il corpo dell'oggetto, i graffi della stagione non lo scoprono mai.":
    "Mass-coloured polyethylene, resistant from −35 °C to +80 °C: the colour is the body of the object, so a season's scratches never show through.",
  'Il risultato': 'The result',
  'Una corona di poltrone intorno al fuoco, spostabili in pochi secondi e impilabili a fine stagione: il dehors cambia scena con il servizio.':
    'A ring of armchairs around the fire, moved in seconds and stacked at the end of the season: the outdoor area changes scene with the service.',
  'Il pezzo protagonista': 'The leading piece',
  'Canisse,\nuna stuoia che accoglie': 'Canisse,\na mat that welcomes',
  "Canne verticali che avvolgono la seduta come una recinzione domestica: leggerezza visiva, massa sufficiente a non muoversi col vento di cresta. In antracite si legge come un elemento d'arredo e non come un complemento tecnico.":
    'Vertical reeds that wrap the seat like a domestic enclosure: visually light, yet heavy enough not to move in the ridge wind. In anthracite it reads as a piece of furniture, not a technical accessory.',
  Materiale: 'Material',
  'LLDPE tinto in massa': 'Mass-coloured LLDPE',
  Produzione: 'Production',
  'Stampaggio rotazionale, Biella': 'Rotational moulding, Biella',
  Manutenzione: 'Maintenance',
  'Panno umido e detergente neutro': 'Damp cloth and neutral detergent',
  Stoccaggio: 'Storage',
  'Impilabile a fine stagione': 'Stackable at the end of the season',
  'Il diario\ndella stagione': 'The diary\nof the season',
  "Scatti di servizio dal cantiere e dalle prime aperture: la stessa terrazza dall'alba alla notte.":
    'Working shots from the site and the first openings: the same terrace from dawn to night.',
  'altri scatti\nin alta risoluzione': 'more shots\nin high resolution',
  'Prodotti utilizzati': 'Products used',
  "Cosa c'è\nsu questa terrazza": 'What is\non this terrace',
  'La fornitura per La Loge du Massif: le poltrone Canisse in antracite, disposte a corona intorno al braciere e sui tavoli del dehors.':
    'The supply for La Loge du Massif: Canisse armchairs in anthracite, arranged in a ring around the fire pit and at the outdoor tables.',
  'Poltrona Canisse': 'Canisse armchair',
  'Arredo outdoor · LLDPE tinto in massa · antracite': 'Outdoor furniture · mass-coloured LLDPE · anthracite',
  'quantità in opera da confermare': 'installed quantity to be confirmed',
  'Cuscini di seduta': 'Seat cushions',
  'Complemento · tessuto outdoor sfoderabile': 'Accessory · removable outdoor fabric',
  'codice e quantità da confermare': 'code and quantity to be confirmed',
  'immagine prodotto\ncuscino di seduta — da fornire': 'product image\nseat cushion — to be supplied',
  'Il prossimo progetto': 'The next project',
  'Dove lo apriamo,\nla prossima stagione?': 'Where shall we open\nnext season?',
  'Sopralluogo, selezione dei pezzi, colori dedicati e consegne programmate per fasi di cantiere.':
    'Site survey, selection of pieces, dedicated colours and deliveries scheduled by site phase.',
  'Case history: le poltrone Canisse in polietilene tinto in massa sulla terrazza della Loge du Massif a 1.700 metri, tra neve, gelo e sole del Monte Bianco.':
    'Case history: Canisse armchairs in mass-coloured polyethylene on the terrace of La Loge du Massif at 1,700 metres, among the snow, frost and sun of Mont Blanc.',

  // Prodotto — Aqua Lounger
  'Piscina — Marc Sadler': 'Pool — Marc Sadler',
  'Piscina & spiaggia — set da 2': 'Pool & beach — set of 2',
  'Disegno di Marc Sadler': 'Design by Marc Sadler',
  "Un lettino pensato per stare _dentro_ l'acqua: profilo rigoroso e solidità ergonomica in equilibrio, posato come una conchiglia sulla battigia. Utilizzabile a bordo piscina o immerso fino a 15 cm d'acqua — 20 cm con l'Aqua Riser opzionale, agganciabile in quattro punti.":
    'A sunlounger designed to stay _in_ the water: a rigorous profile and ergonomic solidity in balance, resting like a shell on the shoreline. It can be used at the poolside or immersed in up to 15 cm of water — 20 cm with the optional Aqua Riser, which attaches at four points.',
  Bianco: 'White',
  'Azzurro di Provenza': 'Provence blue',
  'Salvia di Sardegna': 'Sardinian sage',
  'Acqua della Maddalena': 'Maddalena aqua',
  'Pietra di Matera': 'Matera stone',
  'Tortora di Torino': 'Turin taupe',
  'Origano di Sardegna': 'Sardinian oregano',
  'More di rovo / Nero': 'Blackberry / Black',
  'Otto tonalità tinte in massa. Su progetto contract sviluppiamo colori dedicati con campionatura preventiva.':
    'Eight mass-coloured shades. For contract projects we develop dedicated colours with advance sampling.',
  Lunghezza: 'Length',
  Larghezza: 'Width',
  Altezza: 'Height',
  Peso: 'Weight',
  '51,5 cm': '51.5 cm',
  'Richiedi scheda e campionatura': 'Request data sheet and samples',
  'LLDPE tinto in massa, stampaggio rotazionale': 'Mass-coloured LLDPE, rotational moulding',
  Resistenza: 'Resistance',
  'Da −35 °C a +80 °C, protezione UV, alta resistenza agli urti': 'From −35 °C to +80 °C, UV protection, high impact resistance',
  Impiego: 'Use',
  'Indoor e outdoor, in acqua fino a 15 cm (20 cm con Riser)': 'Indoor and outdoor, in water up to 15 cm (20 cm with Riser)',
  Sostenibilità: 'Sustainability',
  'Riciclabile al 100%, produzione su commessa in 10 giorni lavorativi': '100% recyclable, made to order in 10 working days',
  'Disegno\ne proporzioni': 'Drawing\nand proportions',
  "Ingombri e scala d'uso del set da due elementi, impilabili per lo stoccaggio a fine stagione.":
    'Overall dimensions and scale of use of the two-piece set, stackable for end-of-season storage.',
  'In ambiente': 'In context',
  "Dentro e fuori dall'acqua, in coppia o in fila: la stessa seduta cambia ruolo con la posa.":
    'In and out of the water, in pairs or in a row: the same seat changes role with its placement.',
  'La firma del progetto': 'The designer behind it',
  "Francese nato in Austria, formato all'ENSAD di Parigi con una tesi sulle materie plastiche: da allora la sua ricerca vive sulle contaminazioni fra materiali e tecnologie. Negli anni Settanta mette a punto il primo scarpone da sci termoplastico interamente riciclabile; oggi il suo segno attraversa illuminazione, sport e arredo d'esterno.":
    'A Frenchman born in Austria, trained at ENSAD in Paris with a thesis on plastics: ever since, his research has thrived on the cross-pollination of materials and technologies. In the 1970s he developed the first fully recyclable thermoplastic ski boot; today his mark spans lighting, sport and outdoor furniture.',
  "Per Serralunga disegna l'Aqua Lounger portando nel mondo della piscina la logica dello stampaggio rotazionale: un guscio unico, nessun assemblaggio, il comfort ottenuto dalla sola geometria.":
    'For Serralunga he designed the Aqua Lounger, bringing the logic of rotational moulding to the poolside: a single shell, no assembly, comfort achieved through geometry alone.',
  'Hôtellerie · da definire': 'Hotels · to be defined',
  "Solarium d'albergo: venti lettini in acqua": 'Hotel solarium: twenty sunloungers in the water',
  'progetto e foto da fornire': 'project and photos to be supplied',
  'Spa · da definire': 'Spa · to be defined',
  "Area relax indoor: Aqua fuori dall'acqua": 'Indoor relaxation area: Aqua out of the water',
  "Elementi della stessa famiglia Aqua e complementi che completano l'area piscina.":
    'Pieces from the same Aqua family and accessories that complete the pool area.',
  'Cuscino Aqua': 'Aqua cushion',
  'Complemento · tessuto outdoor': 'Accessory · outdoor fabric',
  'Collezione Aqua': 'Aqua collection',
  'Famiglia · Marc Sadler': 'Family · Marc Sadler',
  'Illuminazione · Marta Sansoni': 'Lighting · Marta Sansoni',
  'Divani · modulare outdoor': 'Sofas · modular outdoor',
  'Documentazione contract': 'Contract documentation',
  'Scheda tecnica,\ndisegni e campioni': 'Data sheet,\ndrawings and samples',
  'Inviamo scheda tecnica in PDF, file CAD e cartella colori fisica per progetti alberghieri, di ristorazione e residenziali.':
    'We send the PDF data sheet, CAD files and physical colour chart for hotel, restaurant and residential projects.',
  'Aqua Lounger, lettino per piscina | Serralunga': 'Aqua Lounger, pool sunlounger | Serralunga',
  "Aqua Lounger di Marc Sadler: lettino in polietilene tinto in massa da usare a bordo piscina o in acqua fino a 15 cm. Dimensioni, colori e scheda tecnica contract.":
    'Aqua Lounger by Marc Sadler: a mass-coloured polyethylene sunlounger for the poolside or in up to 15 cm of water. Dimensions, colours and contract data sheet.',
  'Vasi — Luisa Bocchietto': 'Vases — Luisa Bocchietto',
  'Illuminazione — Marta Sansoni': 'Lighting — Marta Sansoni',
  'Divani — modulare': 'Sofas — modular',
  'Vasi — Vas-One Family': 'Vases — Vas-One Family',
  'Vasi — Decorati': 'Vases — Decorati',
}

// Schede di tutti i designer (designer-altri.ts)
Object.assign(EN, designerInglese())

// Pagine Installazioni e Spunti e idee
Object.assign(EN, {
  Installazioni: 'Installations',
  'Spunti e idee': 'Ideas',
  'Dove i nostri pezzi\nsono già di casa': 'Where our pieces\nalready feel at home',
  'Hotel, ristoranti, spa e residenze: gli ambiti in cui lavoriamo con architetti e committenti. Ogni sezione raccoglie le installazioni e le case history che la raccontano.':
    'Hotels, restaurants, spas and residences: the settings where we work with architects and clients. Each section gathers the installations and case histories that tell its story.',
  'Hôtellerie': 'Hospitality',
  'Hotel e resort': 'Hotels and resorts',
  "Ingressi, corti, terrazze e bordi piscina: fioriere di grande formato, sedute e luci che restano all'aperto tutto l'anno, coordinate nei colori e nelle finiture del progetto.":
    'Entrances, courtyards, terraces and poolsides: large-format planters, seating and lighting that stay outdoors all year round, coordinated with the colours and finishes of the project.',
  Ristorazione: 'Restaurants',
  'Ristoranti e dehors': 'Restaurants and outdoor dining',
  'Sedute, tavoli e illuminazione per sale e dehors: arredi in polietilene tinto in massa, pensati per un uso quotidiano e intenso.':
    'Seating, tables and lighting for dining rooms and terraces: furniture in mass-coloured polyethylene, designed for intensive daily use.',
  'Spa & Piscine': 'Spas & Pools',
  'Spa, piscine e wellness': 'Spas, pools and wellness',
  "Lettini, sedute e oggetti luminosi per l'acqua e il bordo vasca, in materiali che non temono umidità, sole e sbalzi di temperatura.":
    'Sun loungers, seating and luminous objects for the water and the poolside, in materials unaffected by humidity, sun and temperature swings.',
  Residenze: 'Residences',
  'Residenze e giardini privati': 'Residences and private gardens',
  'Vasi della tradizione italiana e pezzi di design per giardini, terrazze e interni, scelti insieme a paesaggisti e interior designer.':
    'Traditional Italian pots and design pieces for gardens, terraces and interiors, chosen together with landscape and interior designers.',
  'Case history in preparazione.': 'Case histories coming soon.',
  'Raccontateci\nil vostro progetto': 'Tell us about\nyour project',
  'Dimensioni, colori e finiture dedicate, con il supporto del nostro ufficio contract.':
    'Dedicated sizes, colours and finishes, with the support of our contract office.',
  'Installazioni e case history | Serralunga Contract': 'Installations and case histories | Serralunga Contract',
  'Le installazioni Serralunga per hotel, ristoranti, spa e residenze: gli ambiti di lavoro e le case history dei progetti realizzati.':
    'Serralunga installations for hotels, restaurants, spas and residences: the settings we work in and the case histories of completed projects.',
  'Idee per usare\ni nostri pezzi': 'Ideas for using\nour pieces',
  'Esempi di cosa si può fare con i prodotti Serralunga: accostamenti, ambienti e soluzioni da cui partire per il vostro progetto.':
    'Examples of what can be done with Serralunga products: combinations, settings and solutions to start your project from.',
  'I primi spunti sono in preparazione.': 'The first ideas are on their way.',
  'Avete in mente\nuno spazio preciso?': 'Do you have a specific\nspace in mind?',
  'Partiamo dal luogo e costruiamo insieme la selezione di pezzi, colori e finiture.':
    'We start from the place and build the selection of pieces, colours and finishes together.',
  'Spunti e idee | Serralunga': 'Ideas and inspiration | Serralunga Contract',
  'Spunti e idee per arredare terrazze, giardini, dehors e bordi piscina con vasi, sedute e luci Serralunga.':
    'Ideas for furnishing terraces, gardens, outdoor dining areas and poolsides with Serralunga pots, seating and lighting.',
})

// Navigazione 2026-11 (menu superiore e inferiore, footer) e pagine di servizio
Object.assign(EN, {
  Contatti: 'Contacts',
  'Richiedi catalogo': 'Request catalogue',
  Listino: 'Price list',
  Faq: 'FAQ',
  Materiali: 'Materials',
  'Polietilene e Clean Fighter': 'Polyethylene and Clean Fighter',
  Colori: 'Colours',
  Sostenibilità: 'Sustainability',
  Catalogo: 'Catalogue',
  Sedute: 'Seating',
  Tavoli: 'Tables',
  'Pool & lettini': 'Pool & loungers',
  Illuminazione: 'Lighting',
  Accessori: 'Accessories',
  'La nostra storia': 'Our story',
  Produzione: 'Production',
  'I colori': 'Colours',
  Residenziale: 'Residential',
  Urbano: 'Urban',
  'Su misura': 'Bespoke',
  Cataloghi: 'Catalogues',
  'Area riservata': 'Reserved area',
  Professionisti: 'Professionals',
  'Spunti e idee': 'Ideas and inspiration',
  'Domande frequenti': 'Frequently asked questions',
  'Listino riservato': 'Trade price list',
  'Serralunga, Biella dal 1825': 'Serralunga, Biella since 1825',
  'Per informazioni su prodotti, materiali, colori e documentazione tecnica, o per parlarci di un progetto, scriveteci o chiamateci: vi risponde l’ufficio contract.':
    'For information on products, materials, colours and technical documentation, or to tell us about a project, write to us or call us: our contract office will reply.',
  'Raccontateci il vostro progetto': 'Tell us about your project',
  'Invia la richiesta': 'Send the request',
  'Grazie: il nostro ufficio contract vi ricontatterà a breve.': 'Thank you: our contract office will get back to you shortly.',
  'Contatti | Serralunga Contract': 'Contacts | Serralunga Contract',
  'Contatti Serralunga, Biella: l’ufficio contract risponde ad architetti, interior designer e strutture dell’ospitalità su prodotti, colori, campioni e documentazione.':
    'Contact Serralunga in Biella: the contract office answers architects, interior designers and hospitality professionals on products, colours, samples and documentation.',
  'Contract e rivenditori': 'Contract and dealers',
  'Richiedi il listino': 'Request the price list',
  'Grazie: vi invieremo catalogo, cartella colori e schede tecniche.':
    'Thank you: we will send you the catalogue, colour chart and technical sheets.',
  'Listino riservato B2B | Serralunga Contract': 'Trade price list | Serralunga Contract',
  'Listino Serralunga riservato a hotel, ristoranti, studi di architettura e rivenditori: richiedete catalogo, cartella colori e condizioni dedicate.':
    'Serralunga trade price list for hotels, restaurants, architecture studios and dealers: request the catalogue, colour chart and dedicated terms.',
  'Domande frequenti | Serralunga': 'FAQ | Serralunga',
})

const SALTA = new Set(['id', 'slug', 'createdAt', 'updatedAt', '_status', 'link', 'link1', 'link2', 'hex', 'email', 'url'])

/** Unisce italiano e inglese: resta l'inglese già scritto, altrimenti la traduzione, altrimenti l'italiano. */
function unisci(it: unknown, en: unknown, chiave = ''): unknown {
  if (Array.isArray(it)) {
    const enArr = Array.isArray(en) ? en : []
    return it.map((v, k) => unisci(v, enArr[k], chiave))
  }
  if (it && typeof it === 'object') {
    const enObj = (en && typeof en === 'object' ? en : {}) as Record<string, unknown>
    return Object.fromEntries(Object.entries(it as Record<string, unknown>).map(([k, v]) => [k, unisci(v, enObj[k], k)]))
  }
  if (typeof it === 'string' && !SALTA.has(chiave)) {
    // Un inglese uguale all'italiano è il testo di riserva, non una traduzione.
    if (typeof en === 'string' && en.trim() && en !== it) return en
    return EN[it] ?? it
  }
  return it
}

const pulisci = (d: Record<string, unknown>) => {
  const { id: _id, createdAt: _c, updatedAt: _u, globalType: _g, ...resto } = d
  return resto
}

const GLOBALI = ['impostazioni', 'home', 'pagina-designer', 'pagina-installazioni', 'pagina-spunti'] as const
const COLLEZIONI = ['designer', 'case-history', 'prodotti', 'spunti', 'pagine'] as const

/**
 * Riempie i campi inglesi ancora vuoti. `solo` limita il lavoro ad alcuni documenti
 * (aggiornamento di un sito già avviato): il resto non viene toccato.
 */
export async function applicaInglese(
  payload: Payload,
  log: (m: string) => void,
  solo?: { globali: (typeof GLOBALI)[number][]; collezioni: (typeof COLLEZIONI)[number][] },
) {
  for (const slug of solo ? solo.globali : GLOBALI) {
    const it = (await payload.findGlobal({ slug, locale: 'it', depth: 0 })) as unknown as Record<string, unknown>
    const en = (await payload.findGlobal({ slug, locale: 'en', fallbackLocale: false, depth: 0 })) as unknown as Record<string, unknown>
    await payload.updateGlobal({ slug, locale: 'en', data: pulisci(unisci(it, en) as Record<string, unknown>) as never })
  }
  for (const collection of solo ? solo.collezioni : COLLEZIONI) {
    const it = await payload.find({ collection, locale: 'it', depth: 0, limit: 500, draft: false })
    for (const doc of it.docs as unknown as Record<string, unknown>[]) {
      const en = (await payload.findByID({ collection, id: doc.id as number, locale: 'en', fallbackLocale: false, depth: 0 })) as unknown as Record<string, unknown>
      await payload.update({ collection, id: doc.id as number, locale: 'en', data: pulisci(unisci(doc, en) as Record<string, unknown>) as never })
    }
  }
  log('applicate le traduzioni inglesi ai campi ancora vuoti')
}
