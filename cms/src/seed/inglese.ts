/**
 * Traduzione inglese dei contenuti di partenza (Version: 1.01).
 * Chiave = testo italiano del seed, valore = testo inglese. Dopo il seed italiano,
 * `applicaInglese` riempie i campi inglesi ancora vuoti; quelli già scritti dal pannello restano.
 * Nomi propri, misure e codici uguali nelle due lingue non servono qui.
 */
import type { Payload } from 'payload'

import { designerInglese } from './designer-altri'

export const EN: Record<string, string> = {
  // Impostazioni
  'Contract & Hospitality — Made in Italy dal 1825': 'Contract & Hospitality — Made in Italy since 1825',
  'Area riservata rivenditori': 'Dealer area',
  Progetti: 'Projects',
  Installazioni: 'Installations',
  Materiali: 'Materials',
  'Listino B2B': 'B2B price list',
  'Richiedi il catalogo': 'Request the catalogue',
  'Mobili, illuminazione, fioriere e oggetti di design 100% made in Italy per interni ed esterni, hospitality e contract.':
    'Furniture, lighting, planters and design objects, 100% made in Italy, for indoors and outdoors, hospitality and contract.',
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
  'Living outdoor — Contract & Hospitality': 'Outdoor living — Contract & Hospitality',
  'Il design\nprende il sole': 'Design\ntakes the sun',
  'Arredi outdoor su misura per hôtellerie, ristorazione e dimore di prestigio. Fioriere, sedute e illuminazione 100% made in Italy, dal 1825.':
    'Bespoke outdoor furniture for hotels, restaurants and prestigious residences. Planters, seating and lighting, 100% made in Italy, since 1825.',
  'Vedi la collezione': 'See the collection',
  Hôtellerie: 'Hotels',
  'Terrazze, roof e aree piscina: fioriere e sedute in LLDPE colorate su cartella, resistenti a sole, salsedine e gelo.':
    'Terraces, rooftops and pool areas: LLDPE planters and seating in chart colours, resistant to sun, salt air and frost.',
  Ristorazione: 'Restaurants',
  'Dehors e separé vegetali: sistemi modulari per delimitare i coperti mantenendo leggerezza e identità del locale.':
    'Outdoor dining areas and green partitions: modular systems that define the tables while keeping the venue light and true to its identity.',
  'Dimore di prestigio': 'Prestigious residences',
  "Pezzi d'autore e finiture laccate o Moleskin, sviluppati con studi di architettura e interior designer.":
    'Signature pieces with lacquered or Moleskin finishes, developed with architecture studios and interior designers.',
  'Chi siamo': 'About us',
  "Una passione per la bellezza,\nuna passione per l'innovazione": 'A passion for beauty,\na passion for innovation',
  'Dal 1825 lo spirito di ricerca e la tradizione produttiva sono le fondamenta del marchio. Stampaggio rotazionale in LLDPE, tinto in massa e riciclabile al 100%: prodotti pensati per resistere da −35 °C a +80 °C, negli spazi più esposti e più esigenti.':
    'Since 1825 a spirit of research and a manufacturing tradition have been the foundations of the brand. Rotational moulding in LLDPE, mass-coloured and 100% recyclable: products designed to withstand −35 °C to +80 °C in the most exposed and demanding spaces.',
  'Materiale riciclabile al 100%': '100% recyclable material',
  'Cartella colori dedicata': 'Dedicated colour chart',
  'Finitura Moleskin e laccature': 'Moleskin finish and lacquers',
  'Scopri Serralunga Contract': 'Discover Serralunga Contract',
  'Anni di manifattura': 'Years of manufacturing',
  'Referenze a catalogo': 'Catalogue items',
  'Colori di cartella': 'Chart colours',
  'Paesi serviti': 'Countries served',
  INSTALLAZIONI: 'INSTALLATIONS',
  "Terrazze d'albergo, dehors, aree piscina e ville private: luoghi in cui il disegno italiano incontra la vita all'aperto.":
    'Hotel terraces, outdoor dining areas, pool areas and private villas: places where Italian design meets outdoor living.',
  "Una selezione di ambientazioni realizzate con studi di architettura e strutture ricettive in Italia e all'estero.":
    'A selection of settings created with architecture studios and hospitality venues in Italy and abroad.',
  'Corte d’ingresso, hotel de charme': 'Entrance courtyard, boutique hotel',
  'Piemonte — Big-Bo, Luisa Bocchietto': 'Piedmont — Big-Bo, Luisa Bocchietto',
  'Milano — Atmosfera, Vas-One Family': 'Milan — Atmosfera, Vas-One Family',
  'Vasca esterna, spa': 'Outdoor pool, spa',
  'Riviera Ligure — Fiore di Loto': 'Ligurian Riviera — Fiore di Loto',
  'Lounge esterna': 'Outdoor lounge',
  'Costa Smeralda — Divano Riviera': 'Costa Smeralda — Riviera sofa',
  'Bordo piscina': 'Poolside',
  'Lago di Garda — Collezione Aqua': 'Lake Garda — Aqua collection',
  'Giardino privato': 'Private garden',
  'Loggiato di una dimora storica': 'Loggia of a historic residence',
  'Toscana — Decorati, Festonato, Orcio': 'Tuscany — Decorati, Festonato, Orcio',
  'Vedi tutte le installazioni': 'See all installations',
  'Le collezioni': 'The collections',
  "Quattro famiglie di prodotto, un'unica grammatica formale: forme scultoree, colore tinto in massa, resistenza da esterno.":
    'Four product families, one formal grammar: sculptural shapes, mass-coloured material, outdoor durability.',
  Vasi: 'Vases',
  'Al servizio\ndel progetto': 'At the service\nof the project',
  'Consulenza progettuale': 'Design consultancy',
  'Affiancamento a studi e general contractor dalla fase di concept al capitolato.':
    'Support for studios and general contractors from the concept stage to the specification.',
  'Colori e finiture su misura': 'Bespoke colours and finishes',
  "Campionature fisiche, laccature, metallizzati e finitura Moleskin coordinati all'identità della struttura.":
    "Physical samples, lacquers, metallic colours and Moleskin finish matched to the venue's identity.",
  'Grandi volumi e logistica': 'Large volumes and logistics',
  'Produzione su commessa, spedizioni pallettizzate e consegne programmate per fasi di cantiere.':
    'Made-to-order production, palletised shipments and deliveries scheduled by site phase.',
  'Lavoro conto terzi': 'Contract manufacturing',
  'Catalogo & listino B2B': 'Catalogue & B2B price list',
  'Richiedi il catalogo\ne le condizioni riservate': 'Request the catalogue\nand trade terms',
  'Riservato ad alberghi, ristoranti, studi di architettura e rivenditori. Riceverai catalogo, cartella colori e listino dedicato entro 24 ore lavorative.':
    'For hotels, restaurants, architecture studios and dealers. You will receive the catalogue, colour chart and dedicated price list within 24 working hours.',
  'Richiesta catalogo': 'Request the catalogue',
  'Grazie: riceverete catalogo, cartella colori e listino entro 24 ore lavorative.':
    'Thank you: you will receive the catalogue, colour chart and price list within 24 working hours.',
  'Serralunga Contract — arredi outdoor dal 1825': 'Serralunga Contract — outdoor furniture since 1825',
  'Arredi outdoor su misura per hôtellerie, ristorazione e dimore di prestigio: fioriere, sedute e illuminazione 100% made in Italy, dal 1825.':
    'Bespoke outdoor furniture for hotels, restaurants and prestigious residences: planters, seating and lighting, 100% made in Italy, since 1825.',

  // Pagina designer
  'Le firme': 'The signatures',
  'I designer\nSerralunga': 'The Serralunga\ndesigners',
  "Architetti e designer italiani e internazionali che dal secondo dopoguerra a oggi hanno dato forma alla nostra materia. Ogni pezzo a catalogo porta il nome di chi lo ha pensato: è la garanzia che dietro a un oggetto d'esterno ci sia un progetto, non un profilo di produzione.":
    'Italian and international architects and designers who, from the post-war years to today, have given shape to our material. Every piece in the catalogue carries the name of the person who conceived it: the guarantee that behind an outdoor object there is a design, not a production profile.',
  'Progetti su misura': 'Bespoke projects',
  'Un pezzo disegnato\nper il vostro luogo': 'A piece designed\nfor your place',
  'Per i progetti contract sviluppiamo con i nostri designer dimensioni, colori e finiture dedicate.':
    'For contract projects we develop dedicated sizes, colours and finishes with our designers.',
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
  'Inviamo scheda PDF, file CAD, cartella colori fisica e condizioni riservate per progetti alberghieri e di ristorazione.':
    'We send the PDF data sheet, CAD files, physical colour chart and trade terms for hotel and restaurant projects.',
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
  Cataloghi: 'Catalogues',
  'Area riservata': 'Reserved area',
  Professionisti: 'Professionals',
  'Spunti e idee': 'Ideas and inspiration',
  'Domande frequenti': 'Frequently asked questions',
  'Listino riservato': 'Trade price list',
  'Serralunga, Biella dal 1825': 'Serralunga, Biella since 1825',
  'Per progetti contract, forniture e informazioni sui prodotti scriveteci o chiamateci: il nostro ufficio contract vi ricontatterà.':
    'For contract projects, supplies and product information, write to us or call us: our contract office will get back to you.',
  'Raccontateci il vostro progetto': 'Tell us about your project',
  'Invia la richiesta': 'Send the request',
  'Grazie: il nostro ufficio contract vi ricontatterà a breve.': 'Thank you: our contract office will get back to you shortly.',
  'Contatti | Serralunga Contract': 'Contacts | Serralunga Contract',
  'Contatti di Serralunga, Biella: ufficio contract per hotel, ristoranti, architetti e rivenditori. Scriveteci per forniture, campioni colore e progetti.':
    'Contact Serralunga, Biella: contract office for hotels, restaurants, architects and dealers. Write to us for supplies, colour samples and projects.',
  'Contract e rivenditori': 'Contract and dealers',
  'Richiedi il listino': 'Request the price list',
  'Grazie: riceverete catalogo, cartella colori e listino entro 24 ore lavorative.':
    'Thank you: you will receive the catalogue, colour chart and price list within 24 working hours.',
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
