/**
 * Testi 2.00 (2026-11-17) — Version: 2.00
 * Revisione dei testi del sito per il pubblico professionale: architetti, interior designer,
 * progettisti e professionisti dell'hôtellerie. Tono diretto e informativo, niente prezzi,
 * sconti, condizioni riservate o promesse non verificate (regole in file-md/cliente.md §3).
 *
 * Ogni coppia è [italiano vecchio, italiano nuovo, inglese vecchio, inglese nuovo]. I file del seed
 * contengono già i testi nuovi (siti nuovi); `npm run seed:testi` (pannello → Strumenti → «Aggiorna i
 * testi») porta i testi nuovi nei siti già avviati, ma SOLO nei campi che contengono ancora il testo
 * vecchio parola per parola: un testo modificato dal pannello o dalla pagina non si tocca mai.
 * `dove`: pagine globali o collezioni in cui cercare ('*' = tutte quelle elencate in TUTTE).
 */
export type Coppia = [string, string, string?, string?]
export interface Gruppo {
  dove: string[]
  coppie: Coppia[]
}

export const VERSIONE_TESTI = '2.00'

/** Dove si cerca con '*': contenuti editoriali (non utenti, richieste, iscritti, consensi, foto). */
export const TUTTE = {
  globali: ['impostazioni', 'home', 'pagina-designer', 'pagina-installazioni', 'pagina-spunti', 'pagina-heritage', 'pagina-catalogo', 'pagina-materiali', 'moduli'],
  collezioni: ['pagine', 'contract', 'pagine-heritage', 'materiali', 'categorie', 'designer', 'case-history', 'spunti', 'prodotti'],
}

export const TESTI_2026_11: Gruppo[] = [
  // ---------------------------------------------------------------- Impostazioni (barra e footer)
  {
    dove: ['impostazioni'],
    coppie: [
      ['Contract & Hospitality — Made in Italy dal 1825', 'Arredi, vasi e luci di design — prodotti a Biella dal 1825', 'Contract & Hospitality — Made in Italy since 1825', 'Design furniture, planters and lighting — made in Biella since 1825'],
      ['Area riservata rivenditori', 'Richiedi il catalogo', 'Dealer area', 'Request the catalogue'],
      [
        'Mobili, illuminazione, fioriere e oggetti di design 100% made in Italy per interni ed esterni, hospitality e contract.',
        'Arredi, vasi e luci di design per interni ed esterni, prodotti a Biella dal 1825 per progetti di hôtellerie, residenziali e contract.',
        'Furniture, lighting, planters and design objects, 100% made in Italy, for indoors and outdoors, hospitality and contract.',
        'Design furniture, planters and lighting for indoor and outdoor spaces, made in Biella since 1825 for hospitality, residential and contract projects.',
      ],
    ],
  },

  // ---------------------------------------------------------------- Home
  {
    dove: ['home'],
    coppie: [
      ['Living outdoor — Contract & Hospitality', 'Serralunga — Biella, dal 1825', 'Outdoor living — Contract & Hospitality', 'Serralunga — Biella, since 1825'],
      ['Il design\nprende il sole', 'Design italiano\nper gli spazi _aperti_', 'Design\ntakes the sun', 'Italian design\nfor _open_ spaces'],
      [
        'Arredi outdoor su misura per hôtellerie, ristorazione e dimore di prestigio. Fioriere, sedute e illuminazione 100% made in Italy, dal 1825.',
        'Vasi, sedute, tavoli e luci in polietilene, disegnati da architetti e designer e prodotti a Biella. Per progetti di hôtellerie, ristorazione, residenze e spazi pubblici.',
        'Bespoke outdoor furniture for hotels, restaurants and prestigious residences. Planters, seating and lighting, 100% made in Italy, since 1825.',
        'Polyethylene planters, seating, tables and lighting, designed by architects and designers and made in Biella. For hotel, restaurant, residential and public-space projects.',
      ],
      ['Vedi la collezione', 'Le collezioni', 'See the collection', 'The collections'],
      [
        'Terrazze, roof e aree piscina: fioriere e sedute in LLDPE colorate su cartella, resistenti a sole, salsedine e gelo.',
        'Terrazze, roof e aree piscina: fioriere, sedute e luci in polietilene tinto in massa, che restano all’aperto tutto l’anno e resistono a sole, salsedine e gelo.',
        'Terraces, rooftops and pool areas: LLDPE planters and seating in chart colours, resistant to sun, salt air and frost.',
        'Terraces, rooftops and pool areas: planters, seating and lighting in mass-coloured polyethylene that stay outdoors all year round and withstand sun, salt air and frost.',
      ],
      [
        'Dehors e separé vegetali: sistemi modulari per delimitare i coperti mantenendo leggerezza e identità del locale.',
        'Dehors e sale: sedute, tavoli e fioriere per organizzare gli spazi, in colori e finiture coordinati con l’identità del locale.',
        'Outdoor dining areas and green partitions: modular systems that define the tables while keeping the venue light and true to its identity.',
        'Outdoor dining areas and dining rooms: seating, tables and planters to organise the space, in colours and finishes coordinated with the venue’s identity.',
      ],
      ['Dimore di prestigio', 'Residenze', 'Prestigious residences', 'Residences'],
      [
        "Pezzi d'autore e finiture laccate o Moleskin, sviluppati con studi di architettura e interior designer.",
        'Pezzi firmati, finiture laccate o Moleskin e vasi della tradizione italiana per ville, giardini e terrazze.',
        'Signature pieces with lacquered or Moleskin finishes, developed with architecture studios and interior designers.',
        'Signature pieces, lacquered or Moleskin finishes and traditional Italian planters for villas, gardens and terraces.',
      ],
      ["Una passione per la bellezza,\nuna passione per l'innovazione", 'Ricerca sui materiali\ndal 1825', 'A passion for beauty,\na passion for innovation', 'Research into materials\nsince 1825'],
      [
        'Dal 1825 lo spirito di ricerca e la tradizione produttiva sono le fondamenta del marchio. Stampaggio rotazionale in LLDPE, tinto in massa e riciclabile al 100%: prodotti pensati per resistere da −35 °C a +80 °C, negli spazi più esposti e più esigenti.',
        'Serralunga nasce a Biella nel 1825 ed è stata la prima azienda in Europa a sviluppare lo stampaggio rotazionale. Nello stabilimento di Biella produce arredi e vasi in polietilene lineare (LLDPE) tinto in massa e riciclabile al 100%, stabili da −35 °C a +80 °C e resistenti a raggi UV, urti e salsedine.',
        'Since 1825 a spirit of research and a manufacturing tradition have been the foundations of the brand. Rotational moulding in LLDPE, mass-coloured and 100% recyclable: products designed to withstand −35 °C to +80 °C in the most exposed and demanding spaces.',
        'Serralunga was founded in Biella in 1825 and was the first company in Europe to develop rotational moulding. At its Biella plant it makes furniture and planters in mass-coloured, 100% recyclable linear polyethylene (LLDPE), stable from −35 °C to +80 °C and resistant to UV rays, impacts and salt air.',
      ],
      ['100% Made in Italy', 'Prodotto a Biella', '100% Made in Italy', 'Made in Biella, Italy'],
      ['Cartella colori dedicata', '38 colori in cartella', 'Dedicated colour chart', '38 colours on the chart'],
      ['Finitura Moleskin e laccature', 'Finiture laccate, Moleskin e Corten', 'Moleskin finish and lacquers', 'Lacquered, Moleskin and Corten finishes'],
      ['Scopri Serralunga Contract', 'Serralunga Contract', 'Discover Serralunga Contract', 'Serralunga Contract'],
      // Numeri: quelli del template (500+ referenze, 40 colori, 60 paesi) non sono verificati.
      ['Anni di manifattura', 'Anni di storia industriale', 'Years of manufacturing', 'Years of industrial history'],
      ['500+', '38', '500+', '38'],
      ['Referenze a catalogo', 'Colori in cartella', 'Catalogue items', 'Colours on the chart'],
      ['40', '100%', '40', '100%'],
      ['Colori di cartella', 'Polietilene riciclabile', 'Chart colours', 'Recyclable polyethylene'],
      ['60', '−35/+80 °C', '60', '−35/+80 °C'],
      ['Paesi serviti', 'Intervallo di utilizzo', 'Countries served', 'Operating range'],
      [
        "Terrazze d'albergo, dehors, aree piscina e ville private: luoghi in cui il disegno italiano incontra la vita all'aperto.",
        'Terrazze d’albergo, dehors, aree piscina e giardini privati: ambientazioni con vasi, sedute e luci Serralunga.',
        'Hotel terraces, outdoor dining areas, pool areas and private villas: places where Italian design meets outdoor living.',
        'Hotel terraces, outdoor dining areas, pool areas and private gardens: settings with Serralunga planters, seating and lighting.',
      ],
      [
        "Una selezione di ambientazioni realizzate con studi di architettura e strutture ricettive in Italia e all'estero.",
        'Una selezione per tipo di spazio: hotel, ristorazione, spa e residenze.',
        'A selection of settings created with architecture studios and hospitality venues in Italy and abroad.',
        'A selection by type of space: hotels, restaurants, spas and residences.',
      ],
      // Didascalie del template con luoghi non verificati: resta solo il prodotto.
      ['Corte d’ingresso, hotel de charme', 'Corte d’ingresso', 'Entrance courtyard, boutique hotel', 'Entrance courtyard'],
      ['Piemonte — Big-Bo, Luisa Bocchietto', 'Big-Bo, Luisa Bocchietto', 'Piedmont — Big-Bo, Luisa Bocchietto', 'Big-Bo, Luisa Bocchietto'],
      ['Milano — Atmosfera, Vas-One Family', 'Atmosfera e Vas-One Family', 'Milan — Atmosfera, Vas-One Family', 'Atmosfera and Vas-One Family'],
      ['Riviera Ligure — Fiore di Loto', 'Fiore di Loto, Marta Sansoni', 'Ligurian Riviera — Fiore di Loto', 'Fiore di Loto, Marta Sansoni'],
      ['Costa Smeralda — Divano Riviera', 'Divano Riviera', 'Costa Smeralda — Riviera sofa', 'Riviera sofa'],
      ['Lago di Garda — Collezione Aqua', 'Collezione Aqua, Marc Sadler', 'Lake Garda — Aqua collection', 'Aqua collection, Marc Sadler'],
      ['Brianza — Vas-Two', 'Vas-Two', 'Brianza — Vas-Two', 'Vas-Two'],
      ['Toscana — Decorati, Festonato, Orcio', 'Decorati, Festonato, Orcio', 'Tuscany — Decorati, Festonato, Orcio', 'Decorati, Festonato, Orcio'],
      [
        "Quattro famiglie di prodotto, un'unica grammatica formale: forme scultoree, colore tinto in massa, resistenza da esterno.",
        'Vasi, arredi, illuminazione e accessori: forme disegnate da architetti e designer, in polietilene tinto in massa per interni ed esterni.',
        'Four product families, one formal grammar: sculptural shapes, mass-coloured material, outdoor durability.',
        'Planters, furniture, lighting and accessories: shapes designed by architects and designers, in mass-coloured polyethylene for indoor and outdoor use.',
      ],
      ['Consulenza progettuale', 'Supporto alla progettazione', 'Design consultancy', 'Design support'],
      [
        'Affiancamento a studi e general contractor dalla fase di concept al capitolato.',
        'Schede tecniche, disegni quotati e campioni colore per la scelta dei pezzi e la stesura del capitolato.',
        'Support for studios and general contractors from the concept stage to the specification.',
        'Technical sheets, dimensioned drawings and colour samples for choosing the pieces and writing the specification.',
      ],
      [
        "Campionature fisiche, laccature, metallizzati e finitura Moleskin coordinati all'identità della struttura.",
        '38 colori in cartella, laccati lucidi e metallizzati, finiture Moleskin e Corten. Per i progetti contract si valutano colori dedicati.',
        "Physical samples, lacquers, metallic colours and Moleskin finish matched to the venue's identity.",
        '38 colours on the chart, gloss and metallic lacquers, Moleskin and Corten finishes. Dedicated colours can be considered for contract projects.',
      ],
      ['Grandi volumi e logistica', 'Produzione a Biella', 'Large volumes and logistics', 'Made in Biella'],
      [
        'Produzione su commessa, spedizioni pallettizzate e consegne programmate per fasi di cantiere.',
        'Stampaggio rotazionale nello stabilimento di Biella: la maggior parte dei prodotti si realizza su richiesta, nel colore scelto.',
        'Made-to-order production, palletised shipments and deliveries scheduled by site phase.',
        'Rotational moulding at the Biella plant: most products are made to order, in the colour you choose.',
      ],
      ['Catalogo & listino B2B', 'Cataloghi e documentazione', 'Catalogue & B2B price list', 'Catalogues and documentation'],
      ['Richiedi il catalogo\ne le condizioni riservate', 'Richiedi il catalogo\ne la cartella colori', 'Request the catalogue\nand trade terms', 'Request the catalogue\nand colour chart'],
      [
        'Riservato ad alberghi, ristoranti, studi di architettura e rivenditori. Riceverai catalogo, cartella colori e listino dedicato entro 24 ore lavorative.',
        'Per architetti, interior designer, strutture dell’ospitalità e rivenditori: indicateci il progetto e vi inviamo catalogo, cartella colori e schede tecniche.',
        'For hotels, restaurants, architecture studios and dealers. You will receive the catalogue, colour chart and dedicated price list within 24 working hours.',
        'For architects, interior designers, hospitality venues and dealers: tell us about your project and we will send the catalogue, colour chart and technical sheets.',
      ],
      ['Richiesta catalogo', 'Richiedi il catalogo'],
      [
        'Grazie: riceverete catalogo, cartella colori e listino entro 24 ore lavorative.',
        'Grazie: vi invieremo catalogo, cartella colori e schede tecniche.',
        'Thank you: you will receive the catalogue, colour chart and price list within 24 working hours.',
        'Thank you: we will send you the catalogue, colour chart and technical sheets.',
      ],
      ['Grazie: riceverete catalogo e listino entro 24 ore lavorative.', 'Grazie: vi invieremo catalogo, cartella colori e schede tecniche.'],
      ['Serralunga Contract — arredi outdoor dal 1825', 'Serralunga: arredi, vasi e luci di design dal 1825', 'Serralunga Contract — outdoor furniture since 1825', 'Serralunga: design furniture and planters since 1825'],
      [
        'Arredi outdoor su misura per hôtellerie, ristorazione e dimore di prestigio: fioriere, sedute e illuminazione 100% made in Italy, dal 1825.',
        'Vasi, sedute, tavoli e luci in polietilene firmati da architetti e designer, prodotti a Biella dal 1825 per hôtellerie, ristorazione, residenze e spazi pubblici.',
        'Bespoke outdoor furniture for hotels, restaurants and prestigious residences: planters, seating and lighting, 100% made in Italy, since 1825.',
        'Polyethylene planters, seating, tables and lighting by architects and designers, made in Biella since 1825 for hotels, restaurants, residences and public spaces.',
      ],
    ],
  },

  // ---------------------------------------------------------------- Pagine di servizio (Contatti)
  {
    dove: ['pagine'],
    coppie: [
      [
        'Per progetti contract, forniture e informazioni sui prodotti scriveteci o chiamateci: il nostro ufficio contract vi ricontatterà.',
        'Per informazioni su prodotti, materiali, colori e documentazione tecnica, o per parlarci di un progetto, scriveteci o chiamateci: vi risponde l’ufficio contract.',
        'For contract projects, supplies and product information, write to us or call us: our contract office will get back to you.',
        'For information on products, materials, colours and technical documentation, or to tell us about a project, write to us or call us: our contract office will reply.',
      ],
      [
        'Contatti di Serralunga, Biella: ufficio contract per hotel, ristoranti, architetti e rivenditori. Scriveteci per forniture, campioni colore e progetti.',
        'Contatti Serralunga, Biella: l’ufficio contract risponde ad architetti, interior designer e strutture dell’ospitalità su prodotti, colori, campioni e documentazione.',
        'Contact Serralunga, Biella: contract office for hotels, restaurants, architects and dealers. Write to us for supplies, colour samples and projects.',
        'Contact Serralunga in Biella: the contract office answers architects, interior designers and hospitality professionals on products, colours, samples and documentation.',
      ],
    ],
  },

  // ---------------------------------------------------------------- Pagina Designer
  {
    dove: ['pagina-designer'],
    coppie: [
      [
        "Architetti e designer italiani e internazionali che dal secondo dopoguerra a oggi hanno dato forma alla nostra materia. Ogni pezzo a catalogo porta il nome di chi lo ha pensato: è la garanzia che dietro a un oggetto d'esterno ci sia un progetto, non un profilo di produzione.",
        'Architetti e designer italiani e internazionali che dagli anni Novanta disegnano per Serralunga. Ogni pezzo a catalogo porta il nome di chi lo ha progettato: forma, proporzioni e uso nascono da un progetto d’autore.',
        'Italian and international architects and designers who, from the post-war years to today, have given shape to our material. Every piece in the catalogue carries the name of the person who conceived it: the guarantee that behind an outdoor object there is a design, not a production profile.',
        'Italian and international architects and designers who have been designing for Serralunga since the 1990s. Every piece in the catalogue bears the name of its designer: shape, proportions and use come from an authored design.',
      ],
      ['Un pezzo disegnato\nper il vostro luogo', 'Colori e finiture\nper il vostro progetto', 'A piece designed\nfor your place', 'Colours and finishes\nfor your project'],
      [
        'Per i progetti contract sviluppiamo con i nostri designer dimensioni, colori e finiture dedicate.',
        'Per i progetti contract valutiamo colori, finiture e varianti dedicate: scriveteci prodotti, quantità e contesto.',
        'For contract projects we develop dedicated sizes, colours and finishes with our designers.',
        'For contract projects we consider dedicated colours, finishes and variants: tell us the products, quantities and setting.',
      ],
    ],
  },

  // ---------------------------------------------------------------- Contract
  {
    dove: ['contract'],
    coppie: [
      [
        'Terrazze, roof e aree piscina: fioriere e sedute in LLDPE colorate su cartella, resistenti a sole, salsedine e gelo.',
        'Terrazze, roof e aree piscina: fioriere, sedute e luci in polietilene tinto in massa, che restano all’aperto tutto l’anno e resistono a sole, salsedine e gelo.',
        'Terraces, rooftops and pool areas: LLDPE planters and seating in chart colours, resistant to sun, salt air and frost.',
        'Terraces, rooftops and pool areas: planters, seating and lighting in mass-coloured polyethylene that stay outdoors all year round and withstand sun, salt air and frost.',
      ],
      [
        'Dehors e separé vegetali: sistemi modulari per delimitare i coperti mantenendo leggerezza e identità del locale.',
        'Dehors e sale: sedute, tavoli e fioriere per organizzare gli spazi, in colori e finiture coordinati con l’identità del locale.',
        'Outdoor dining areas and green partitions: modular systems that define the tables while keeping the venue light and true to its identity.',
        'Outdoor dining areas and dining rooms: seating, tables and planters to organise the space, in colours and finishes coordinated with the venue’s identity.',
      ],
      [
        'Decenni di lavoro per hotel, ristorazione e wellness: sappiamo come portare a termine anche i progetti più articolati.',
        'Decenni di forniture per hotel, ristorazione e wellness, anche per progetti articolati in più fasi e più ambienti.',
        'Decades of work for hotels, restaurants and wellness: we know how to bring even the most demanding projects to completion.',
        'Decades of supplies for hotels, restaurants and wellness, including projects spanning several phases and spaces.',
      ],
      [
        'L’innovazione della produzione e il miglioramento continuo ci permettono di offrire ciò che serve a chi lavora nell’ospitalità.',
        'Materiali resistenti alle intemperie, colore in massa e produzione su richiesta: arredi pensati per l’uso intenso dell’ospitalità.',
        'Innovation in production and continuous improvement let us offer what hospitality professionals need.',
        'Weather-resistant materials, mass colouring and made-to-order production: furniture designed for intensive use in hospitality.',
      ],
      [
        'Pezzi d’autore e finiture laccate o Moleskin, sviluppati con studi di architettura e interior designer.',
        'Laccati lucidi e metallizzati, finiture Moleskin e Corten, 38 colori in cartella.',
        'Signature pieces with lacquered or Moleskin finishes, developed with architecture studios and interior designers.',
        'Gloss and metallic lacquers, Moleskin and Corten finishes, 38 colours on the chart.',
      ],
      [
        'Mobili, piscina e spiaggia, fioriere, regali: scegliete i cataloghi che vi servono e lasciateci i vostri riferimenti. I PDF si aprono subito e l’ufficio contract potrà inviarvi listino e condizioni riservate.',
        'Mobili, piscina e spiaggia, fioriere, regali: scegliete i cataloghi che vi servono e lasciateci i vostri riferimenti. I PDF si aprono subito; l’ufficio contract resta a disposizione per schede tecniche, campioni colore e informazioni sui prodotti.',
        'Furniture, pool and beach, planters, gifts: choose the catalogues you need and leave us your details. The PDFs open straight away and our contract office can send you the trade price list and conditions.',
        'Furniture, pool and beach, planters, gifts: choose the catalogues you need and leave us your details. The PDFs open straight away; our contract office is available for technical sheets, colour samples and product information.',
      ],
      [
        'Riservato ad alberghi, ristoranti, studi di architettura e rivenditori.',
        'Per architetti, interior designer, strutture dell’ospitalità e rivenditori.',
        'For hotels, restaurants, architecture firms and dealers.',
        'For architects, interior designers, hospitality venues and dealers.',
      ],
      [
        'Scaricate i cataloghi Serralunga in PDF: mobili, piscina e spiaggia, fioriere e regali. Per hotel, ristoranti, architetti e rivenditori, con listino riservato.',
        'Scaricate i cataloghi Serralunga in PDF: mobili, piscina e spiaggia, fioriere e regali, per architetti, interior designer, hotel e ristoranti.',
        'Download the Serralunga catalogues in PDF: furniture, pool and beach, planters and gifts. For hotels, restaurants, architects and dealers, with trade prices.',
        'Download the Serralunga catalogues in PDF: furniture, pool and beach, planters and gifts, for architects, interior designers, hotels and restaurants.',
      ],
    ],
  },

  // ---------------------------------------------------------------- Catalogo (pagina, categorie)
  {
    dove: ['pagina-catalogo'],
    coppie: [
      ['Catalogo B2B', 'Catalogo', 'B2B catalogue', 'Catalogue'],
      [
        'Vasi e fioriere, sedute, tavoli, arredi per piscina, illuminazione e accessori: le schede della produzione Serralunga con varianti e codici articolo, per hôtellerie, ristorazione, rivenditori e studi di progettazione.',
        'Vasi e fioriere, sedute, tavoli, arredi per piscina, illuminazione e accessori: le schede della produzione Serralunga con varianti, misure e codici articolo, per architetti, interior designer, hôtellerie e ristorazione.',
        'Planters, seating, tables, pool furniture, lighting and accessories: Serralunga product sheets with variants and item codes, for hotels, restaurants, dealers and design studios.',
        'Planters, seating, tables, pool furniture, lighting and accessories: Serralunga product sheets with variants, dimensions and item codes, for architects, interior designers, hotels and restaurants.',
      ],
      ['Listino riservato', 'Documentazione tecnica', 'Trade price list', 'Technical documentation'],
      ['Listino B2B\ne condizioni contract', 'Schede tecniche,\ncolori e campioni', 'B2B price list\nand contract terms', 'Technical sheets,\ncolours and samples'],
      [
        'Raccontateci il progetto o la vostra attività: vi inviamo listino riservato, schede tecniche e disponibilità.',
        'Indicateci prodotti e progetto: vi inviamo schede tecniche, cartella colori e informazioni su varianti e finiture.',
        'Tell us about your project or business: we will send the trade price list, technical sheets and availability.',
        'Tell us the products and the project: we will send technical sheets, the colour chart and information on variants and finishes.',
      ],
      ['Richiedi il listino', 'Richiedi la documentazione', 'Request the price list', 'Request the documentation'],
      ['/listino/', '/contatti/', '/listino/', '/contatti/'],
      ['Catalogo B2B: arredi, vasi e luci di design | Serralunga', 'Catalogo: arredi, vasi e luci di design | Serralunga', 'B2B catalogue: design furniture and planters | Serralunga', 'Catalogue: design furniture and planters | Serralunga'],
      [
        'Catalogo Serralunga per professionisti: vasi, sedute, tavoli, arredi piscina, lampade e accessori con varianti e codici articolo. Listino B2B su richiesta.',
        'Catalogo Serralunga per architetti e interior designer: vasi, sedute, tavoli, arredi piscina, lampade e accessori con varianti, misure e codici articolo.',
        'Serralunga catalogue for professionals: planters, seating, tables, pool furniture, lamps and accessories with variants and item codes. B2B price list on request.',
        'Serralunga catalogue for architects and interior designers: planters, seating, tables, pool furniture, lamps and accessories with variants, dimensions and item codes.',
      ],
    ],
  },
  {
    dove: ['categorie'],
    coppie: [
      [
        'Vasi e fioriere Serralunga in polietilene per hotel, ristoranti e progetti contract: forme classiche, con luce e oversize. Codici, varianti e listino B2B.',
        'Vasi e fioriere Serralunga in polietilene per hotel, ristoranti e progetti contract: forme classiche, con luce e grandi formati, con varianti, misure e codici.',
        'Serralunga polyethylene planters for hotels, restaurants and contract projects: classic shapes, light-up and oversize. Item codes, variants and B2B prices.',
        'Serralunga polyethylene planters for hotels, restaurants and contract projects: classic shapes, light-up and oversize, with variants, dimensions and codes.',
      ],
      [
        'Vasi e fioriere Serralunga con luce integrata per terrazze, giardini, hotel e locali: modelli, varianti e codici articolo del catalogo B2B Serralunga.',
        'Vasi e fioriere Serralunga con luce integrata per terrazze, giardini, hotel e locali: modelli, varianti e codici articolo del catalogo Serralunga.',
        'Serralunga planters with built-in light for terraces, gardens, hotels and venues: models, variants and item codes from the Serralunga B2B catalogue.',
        'Serralunga planters with built-in light for terraces, gardens, hotels and venues: models, variants and item codes from the Serralunga catalogue.',
      ],
      [
        'Poltrone, divani, sedie, panche e sgabelli Serralunga per hotel, ristoranti e spazi contract: modelli di design, varianti, codici articolo e listino B2B.',
        'Poltrone, divani, sedie, panche e sgabelli Serralunga per hotel, ristoranti e spazi contract: modelli di design con varianti, misure e codici articolo.',
        'Serralunga armchairs, sofas, chairs, benches and stools for hotels, restaurants and contract spaces: design models, variants, item codes and B2B prices.',
        'Serralunga armchairs, sofas, chairs, benches and stools for hotels, restaurants and contract spaces: design models with variants, dimensions and item codes.',
      ],
      [
        'Tavoli e tavolini Serralunga per dehors, lounge, camere d’hotel e progetti contract: modelli di design, varianti di colore, codici articolo e listino B2B.',
        'Tavoli e tavolini Serralunga per dehors, lounge, camere d’hotel e progetti contract: modelli di design, varianti di colore, misure e codici articolo.',
        'Serralunga tables and side tables for terraces, lounges, hotel rooms and contract projects: design models, colour variants, item codes and B2B prices.',
        'Serralunga tables and side tables for terraces, lounges, hotel rooms and contract projects: design models, colour variants, dimensions and item codes.',
      ],
      [
        'Lettini, sdraio e arredi Serralunga per piscine, spa, resort e stabilimenti balneari: modelli di design, varianti, codici articolo e listino B2B Serralunga.',
        'Lettini, sdraio e arredi Serralunga per piscine, spa, resort e stabilimenti balneari: modelli di design con varianti, misure e codici articolo.',
        'Serralunga sun loungers, deckchairs and furniture for pools, spas, resorts and beach clubs: design models, variants, item codes and the B2B price list.',
        'Serralunga sun loungers, deckchairs and furniture for pools, spas, resorts and beach clubs: design models with variants, dimensions and item codes.',
      ],
      [
        'Lampade Serralunga a sospensione, da terra e portatili per hotel, ristoranti, giardini e progetti contract: modelli, varianti, codici articolo e listino B2B.',
        'Lampade Serralunga a sospensione, da terra e portatili per hotel, ristoranti, giardini e progetti contract: modelli, varianti, misure e codici articolo.',
        'Serralunga pendant, floor and portable lamps for hotels, restaurants, gardens and contract projects: models, variants, item codes and the B2B price list.',
        'Serralunga pendant, floor and portable lamps for hotels, restaurants, gardens and contract projects: models, variants, dimensions and item codes.',
      ],
      [
        'Accessori e complementi Serralunga per completare vasi, sedute e arredi nei progetti contract e hospitality: modelli, varianti, codici articolo e listino B2B.',
        'Accessori e complementi Serralunga per completare vasi, sedute e arredi nei progetti contract e hospitality: modelli, varianti, misure e codici articolo.',
        'Serralunga accessories and complements for planters, seating and furniture in contract and hospitality projects: models, variants, item codes and B2B prices.',
        'Serralunga accessories and complements for planters, seating and furniture in contract and hospitality projects: models, variants, dimensions and item codes.',
      ],
      [
        'Le novità del catalogo Serralunga: vasi, sedute, tavoli e lampade di design per hotel, ristoranti e progetti contract, con varianti, codici e listino B2B.',
        'Le novità del catalogo Serralunga: vasi, sedute, tavoli e lampade di design per hotel, ristoranti e progetti contract, con varianti, misure e codici.',
        'New in the Serralunga catalogue: design planters, seating, tables and lamps for hotels, restaurants and contract projects, with variants, codes and B2B prices.',
        'New in the Serralunga catalogue: design planters, seating, tables and lamps for hotels, restaurants and contract projects, with variants, dimensions and codes.',
      ],
      [
        'La selezione stagionale del catalogo Serralunga: pezzi scelti per i progetti del momento in hôtellerie, ristorazione e contract, con codici e listino B2B.',
        'La selezione stagionale del catalogo Serralunga: pezzi scelti per i progetti del momento in hôtellerie, ristorazione e contract, con varianti e codici.',
        'The seasonal selection from the Serralunga catalogue: pieces chosen for current hospitality, restaurant and contract projects, with item codes and B2B prices.',
        'The seasonal selection from the Serralunga catalogue: pieces chosen for current hospitality, restaurant and contract projects, with variants and item codes.',
      ],
    ],
  },

  // ---------------------------------------------------------------- Schede prodotto: solo il riquadro di richiesta
  {
    dove: ['prodotti'],
    coppie: [
      ['Richiedi preventivo e listino', 'Richiedi informazioni', 'Request a quote and price list', 'Request information'],
      ['Catalogo B2B', 'Documentazione tecnica', 'B2B catalogue', 'Technical documentation'],
      ['Preventivo, listino\ne campionatura', 'Schede tecniche,\ndisegni e campioni', 'Quote, price list\nand samples', 'Data sheets,\ndrawings and samples'],
      [
        'Per forniture contract, rivenditori e studi di progettazione: indicate il progetto e vi inviamo listino riservato, schede tecniche e disponibilità.',
        'Per architetti, interior designer e strutture dell’ospitalità: indicateci il progetto e vi inviamo scheda tecnica, disegni, cartella colori e informazioni su varianti e finiture.',
        'For contract supplies, dealers and design studios: tell us about your project and we will send the trade price list, technical sheets and availability.',
        'For architects, interior designers and hospitality venues: tell us about your project and we will send the data sheet, drawings, colour chart and information on variants and finishes.',
      ],
      [
        'Inviamo scheda PDF, file CAD, cartella colori fisica e condizioni riservate per progetti alberghieri e di ristorazione.',
        'Inviamo scheda tecnica in PDF, file CAD e cartella colori fisica per progetti alberghieri, di ristorazione e residenziali.',
        'We send the PDF data sheet, CAD files, physical colour chart and trade terms for hotel and restaurant projects.',
        'We send the PDF data sheet, CAD files and physical colour chart for hotel, restaurant and residential projects.',
      ],
    ],
  },

  // ---------------------------------------------------------------- Heritage
  {
    dove: ['pagina-heritage', 'pagine-heritage'],
    coppie: [
      ['Firmati dai grandi nomi\ndel design', 'Firmati da architetti\ne designer', 'Signed by the great names\nof design', 'Signed by architects\nand designers'],
      [
        'I più importanti designer del mondo hanno progettato per Serralunga prodotti che uniscono funzione, estetica e stile.',
        'Designer di fama internazionale hanno progettato per Serralunga prodotti che uniscono funzione, forma e qualità costruttiva.',
        'The world’s leading designers have created products for Serralunga that combine function, aesthetics and style.',
        'Internationally renowned designers have created products for Serralunga that combine function, form and build quality.',
      ],
      [
        'I più importanti designer del mondo hanno collaborato con Serralunga, creando prodotti che uniscono funzionalità, estetica e stile.',
        'Designer di fama internazionale hanno collaborato con Serralunga, creando prodotti che uniscono funzione, forma e qualità costruttiva.',
        'The world’s leading designers have worked with Serralunga, creating products that combine functionality, aesthetics and style.',
        'Internationally renowned designers have worked with Serralunga, creating products that combine function, form and build quality.',
      ],
      ['Porta l’originale\nnel tuo progetto', 'L’originale\nper il vostro progetto', 'Bring the original\ninto your project', 'The original\nfor your project'],
      [
        'Sfoglia il catalogo o parla con noi: per architetti, hotel e progetti speciali c’è Serralunga Contract.',
        'I cataloghi sono disponibili in PDF; per architetti, interior designer e strutture dell’ospitalità c’è l’ufficio contract.',
        'Browse the catalogue or talk to us: for architects, hotels and special projects there is Serralunga Contract.',
        'The catalogues are available in PDF; for architects, interior designers and hospitality venues there is our contract office.',
      ],
      [
        'Prima in Europa a sviluppare la tecnologia dello stampaggio rotazionale. Prima a introdurre il vaso di design e a concepire il vaso fuori scala. Prima a disegnare un vaso illuminato, a esporre un vaso industriale in un museo e a sviluppare nuove tecnologie di laccatura con pattern.\nScegliere Serralunga significa saper riconoscere e apprezzare l’originalità.',
        'Prima in Europa a sviluppare la tecnologia dello stampaggio rotazionale. Prima a introdurre il vaso di design e a concepire il vaso fuori scala. Prima a disegnare un vaso illuminato, a esporre un vaso industriale in un museo e a sviluppare nuove tecnologie di laccatura con pattern.',
        'First in Europe to develop rotational moulding technology. First to introduce the design planter and to conceive the oversized planter. First to design an illuminated planter, to exhibit an industrial planter in a museum and to develop new patterned lacquering technologies.\nChoosing Serralunga means recognising and appreciating originality.',
        'First in Europe to develop rotational moulding technology. First to introduce the design planter and to conceive the oversized planter. First to design an illuminated planter, to exhibit an industrial planter in a museum and to develop new patterned lacquering technologies.',
      ],
      [
        'Serralunga mantiene l’eccellenza legata al Made in Italy e propone nuovi modi di vivere, con arredi pensati per riposare e rilassarsi.',
        'Serralunga progetta e produce in Italia, nello stabilimento di Biella, arredi pensati per il riposo e la vita all’aperto.',
        'Serralunga upholds the excellence associated with Made in Italy and proposes new ways of living, with furniture designed for rest and relaxation.',
        'Serralunga designs and manufactures in Italy, at its Biella plant, furniture made for rest and outdoor living.',
      ],
      ['Due secoli di storia\nper il tuo progetto', 'Due secoli di storia\nal servizio del progetto', 'Two centuries of history\nfor your project', 'Two centuries of history\nat the service of the project'],
      [
        'Hotel, ristoranti, spa e residenze: costruiamo insieme la selezione di pezzi, colori e finiture.',
        'Hotel, ristoranti, spa e residenze: l’ufficio contract vi aiuta a scegliere pezzi, colori e finiture.',
        'Hotels, restaurants, spas and residences: let’s build the selection of pieces, colours and finishes together.',
        'Hotels, restaurants, spas and residences: our contract office helps you choose pieces, colours and finishes.',
      ],
      ['Parla con il contract', 'Scrivete all’ufficio contract', 'Talk to the contract team', 'Write to the contract office'],
      ['Resistente, duraturo, con un buon rapporto qualità/prezzo.', 'Resistente e duraturo: oltre 10 anni di vita all’aperto.', 'Strong, durable and good value for money.', 'Strong and durable: over 10 years of outdoor life.'],
      ['Specifiche per il tuo capitolato', 'Specifiche per il capitolato', 'Specifications for your tender', 'Specifications for the tender'],
      ['Un colore per il tuo progetto', 'Un colore per il vostro progetto'],
      [
        'Per forniture contract valutiamo colori dedicati e campionature: scrivici quantità e prodotti.',
        'Per forniture contract valutiamo colori dedicati e campionature: scriveteci prodotti e quantità.',
      ],
      ['Contattaci', 'Contattateci'],
      [
        'Serralunga produce su richiesta: la maggior parte dei prodotti può essere realizzata in qualsiasi colore della cartella. Per un colore che non trovi nella scheda del prodotto, contattaci.',
        'Serralunga produce su richiesta: la maggior parte dei prodotti può essere realizzata in qualsiasi colore della cartella. Se il colore che vi serve non compare nella scheda del prodotto, contattateci.',
      ],
    ],
  },
]
