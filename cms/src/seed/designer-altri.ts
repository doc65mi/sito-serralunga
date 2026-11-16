/**
 * Schede di tutti i designer con pezzi nel catalogo attuale (Version: 1.02).
 * Fonte: le schede prodotto di serralunga.com (nome, ritratto, nota biografica, collezioni firmate).
 * Le biografie sono riassunti redazionali dei dati pubblicati lì, in italiano e in inglese:
 * vanno riviste dal cliente. Dove serralunga.com non riporta una biografia, la scheda
 * elenca solo i pezzi firmati. I ritratti si scaricano da serralunga.com durante il seed.
 */
type Media = (sorgente: string, alt: string, opz?: { min?: number }) => Promise<number | null>

/** Larghezza minima dei ritratti: quelli più piccoli vengono ingranditi dal seed. */
export const RITRATTO_MIN = 1400
type Due = [it: string, en: string]

interface Voce {
  nome: string
  slug: string
  ruolo: Due
  prov?: Due
  /** Nome del file del ritratto in serralunga.com/cdn/shop/files, con la versione. */
  foto?: string
  pezzi: string[]
  /** Altri nomi con cui il designer compare tra le etichette dei prodotti di serralunga.com. */
  etichette?: string[]
  /** Nota sui pezzi firmati con altri, aggiunta dopo l'elenco. */
  nota?: Due
  bio?: Due
  premi?: { anno: string; titolo: Due }[]
}

const D: Due = ['Designer', 'Designer']
const A: Due = ['Architetto', 'Architect']
const AD: Due = ['Architetto e designer', 'Architect and designer']

const VOCI: Voce[] = [
  {
    nome: 'Luisa Bocchietto',
    slug: 'luisa-bocchietto',
    ruolo: A,
    prov: ['Architetto · Italia', 'Architect · Italy'],
    pezzi: ['Vas-One', 'Big Bo', 'Kabin', 'Giano', 'Lampa-Daria'],
    bio: [
      "Si laurea in architettura a Milano nel 1985 con Marco Zanuso e consegue il diploma in design all'Istituto Europeo di Design. Da libera professionista lavora su sviluppo locale, riqualificazione urbana e ristrutturazioni, e progetta arredi, negozi e allestimenti in Italia e all'estero. È direttore artistico della collezione Serralunga, segnalata dall'ADI Index 2004. Già presidente dell'Ordine degli Architetti, guida la delegazione ADI Piemonte e Valle d'Aosta.",
      'She graduated in architecture in Milan in 1985 under Marco Zanuso and holds a design diploma from the Istituto Europeo di Design. As a freelance professional she works on local development, urban regeneration and renovation, and designs furniture, shops and stands in Italy and abroad. She is artistic director of the Serralunga collection, selected for the ADI Index 2004. A former president of the Order of Architects, she chairs the ADI delegation for Piedmont and Aosta Valley.',
    ],
  },
  {
    nome: 'Marta Sansoni',
    slug: 'marta-sansoni',
    ruolo: AD,
    prov: ['Architetto e designer · Firenze', 'Architect and designer · Florence'],
    pezzi: ['Fiore di Loto'],
    bio: [
      "Architetto e designer fiorentina, si occupa di architettura e di interni per abitazioni private, spazi pubblici e allestimenti in Italia e all'estero. Il suo lavoro unisce astrazione geometrica, rigore, gioco degli spazi, cura del dettaglio e monocromia, alla ricerca di un rapporto armonioso fra luce, oggetto e spazio.",
      'An architect and designer from Florence, she works on architecture and interiors for private homes, public spaces and installations in Italy and abroad. Her work combines geometric abstraction, rigour, spatial play, attention to detail and monochrome, in search of a harmonious relationship between light, object and space.',
    ],
  },
  {
    nome: 'Eero Aarnio',
    slug: 'eero-aarnio',
    ruolo: D,
    prov: ['Designer · Finlandia', 'Designer · Finland'],
    foto: 'Eero_Aarnio.webp?v=1666096882',
    pezzi: ['Primavera', 'Doggy', 'Paloma', 'Pulcino'],
    bio: [
      "Designer finlandese nato nel 1932, studia all'Istituto di Arti Industriali di Helsinki dal 1954 al 1957 e nel 1962 apre il proprio studio di interni e disegno industriale. Nel 1963 disegna la Ball Chair, una forma in fibra di vetro allora inedita nell'arredo; la fibra di vetro resta il suo materiale d'elezione per la libertà che concede alle forme ergonomiche.",
      'A Finnish designer born in 1932, he studied at the Institute of Industrial Arts in Helsinki from 1954 to 1957 and opened his own interior and industrial design studio in 1962. In 1963 he designed the Ball Chair, a fibreglass form then unseen in furniture; fibreglass remained his material of choice for the freedom it gives to ergonomic shapes.',
    ],
  },
  {
    nome: 'Laura Aquili & Ergian Alberg',
    slug: 'aquili-alberg',
    foto: 'aquilialberg.jpg?v=1771517194',
    ruolo: [`Architetti`, 'Architects'],
    prov: ['Studio · Milano', 'Studio · Milan'],
    pezzi: ['Milo'],
    bio: [
      "Dal 1999 Laura Aquili ed Ergian Alberg lavorano ad Amsterdam, Rotterdam, Roma, Londra e Pechino per studi come Zaha Hadid, OMA, UNStudio, ONL e Massimiliano Fuksas. Nel 2006 fondano a Milano il proprio studio, una pratica sperimentale che spazia dall'architettura agli interni, dal prodotto all'urbanistica.",
      'From 1999 Laura Aquili and Ergian Alberg worked in Amsterdam, Rotterdam, Rome, London and Beijing for practices such as Zaha Hadid, OMA, UNStudio, ONL and Massimiliano Fuksas. In 2006 they founded their own studio in Milan, an experimental practice ranging from architecture to interiors, products and urbanism.',
    ],
  },
  {
    nome: 'Ron Arad',
    slug: 'ron-arad',
    ruolo: AD,
    foto: 'Ron_Arad.jpg?v=1676383640',
    pezzi: ['Top Pot', 'The Vases'],
    bio: [
      "Sperimenta con acciaio, alluminio e poliammide, ripensando da capo la forma e la struttura dell'arredo. Affianca i pezzi in edizione limitata del proprio studio al lavoro per aziende come Kartell, Vitra e Alessi, e firma progetti di architettura in Italia, Spagna, Inghilterra, Messico e Israele. Pluripremiato, è presente in collezioni pubbliche e ha insegnato design del prodotto al Royal College of Art di Londra.",
      'He experiments with steel, aluminium and polyamide, rethinking the form and structure of furniture from scratch. Alongside the limited editions of his own studio he designs for companies such as Kartell, Vitra and Alessi, and has completed architecture projects in Italy, Spain, England, Mexico and Israel. A multiple award winner, his work is in public collections and he has taught product design at the Royal College of Art in London.',
    ],
  },
  {
    nome: 'Alessandra Baldereschi',
    slug: 'alessandra-baldereschi',
    ruolo: D,
    prov: ['Designer · Italia', 'Designer · Italy'],
    foto: 'Alessandra_Baldereschi.webp?v=1771517192',
    pezzi: ['Bonnie', 'Cactus', 'Otto'],
    bio: [
      "Dopo una formazione artistica consegue il master in Industrial Design alla Domus Academy di Milano. Una borsa di studio in Giappone la porta a sviluppare ceramiche per la tavola con le aziende di Gifu; rientrata in Italia disegna luci, arredi e complementi per marchi come Fabbian, Seletti e IVV. I suoi progetti sono stati esposti in mostre internazionali e nel 2017 la Triennale di Milano l'ha nominata Ambasciatrice del Design Italiano.",
      'After training as an artist she took a master in Industrial Design at Domus Academy in Milan. A scholarship in Japan led her to develop tableware ceramics with companies in Gifu; back in Italy she designs lighting, furniture and accessories for brands such as Fabbian, Seletti and IVV. Her projects have been shown in international exhibitions and in 2017 Triennale Milano named her Ambassador of Italian Design.',
    ],
    premi: [{ anno: '2017', titolo: ['Ambasciatrice del Design Italiano, Triennale di Milano', 'Ambassador of Italian Design, Triennale Milano'] }],
  },
  {
    nome: 'Sebastian Bergne',
    slug: 'sebastian-bergne',
    ruolo: D,
    prov: ['Designer · Regno Unito', 'Designer · United Kingdom'],
    foto: 'Sebastian_Bergne.webp?v=1666096606',
    pezzi: ['Oasis', 'Flame'],
    bio: [
      "Designer industriale britannico, noto per un approccio essenziale e umano agli oggetti di ogni giorno. Si diploma al Royal College of Art nel 1990 e nello stesso anno fonda il proprio studio, che lavora per marchi internazionali, realizza pezzi su misura per ristoranti, negozi e clienti privati e produce edizioni proprie. I suoi lavori hanno ricevuto premi internazionali e fanno parte delle collezioni del MoMA di New York e del Design Museum di Londra.",
      'A British industrial designer known for an essential, human approach to everyday objects. He graduated from the Royal College of Art in 1990 and founded his studio the same year; it works for international brands, makes bespoke pieces for restaurants, retailers and private clients, and produces its own editions. His work has won international awards and is held by MoMA in New York and the Design Museum in London.',
    ],
  },
  {
    nome: 'Fabio Bortolani & Ermanno Righi',
    slug: 'bortolani-righi',
    ruolo: D,
    prov: ['Designer · Italia', 'Designer · Italy'],
    pezzi: ['Dado'],
    bio: [
      "Fabio Bortolani nasce a Modena e si laurea in architettura a Firenze; dal 1985 al 1987 lavora nello studio di Cesare Leonardi. Ha disegnato per Alessi, Driade, Lapalma e Serralunga, ricevendo il premio «Top Ten» di Promosedia, il Design Plus di Francoforte nel 1997 e una selezione al Compasso d'Oro nel 2001. Per Serralunga firma Dado insieme a Ermanno Righi.",
      'Fabio Bortolani was born in Modena and graduated in architecture in Florence; from 1985 to 1987 he worked in the studio of Cesare Leonardi. He has designed for Alessi, Driade, Lapalma and Serralunga, receiving the Promosedia "Top Ten" award, the Design Plus prize in Frankfurt in 1997 and a Compasso d\'Oro selection in 2001. For Serralunga he designed Dado together with Ermanno Righi.',
    ],
    premi: [
      { anno: '1997', titolo: ['Design Plus, Francoforte', 'Design Plus, Frankfurt'] },
      { anno: '2001', titolo: ["Selezione Compasso d'Oro", "Compasso d'Oro selection"] },
    ],
  },
  {
    nome: 'Michel Boucquillon',
    slug: 'michel-boucquillon',
    ruolo: AD,
    prov: ['Architetto e designer · Belgio / Italia', 'Architect and designer · Belgium / Italy'],
    foto: 'Michel_Boucquillon.webp?v=1666096606',
    pezzi: ['Lazy'],
    bio: [
      "Nato in Belgio nel 1962, si laurea in architettura a Bruxelles nel 1988. Dopo due anni di lavoro a Firenze vince, a ventisei anni, il concorso per l'emiciclo del Parlamento europeo, di cui disegna anche gli arredi. Nel 2005 riceve il premio Design Plus. Ha uno studio di architettura a Bruxelles e uno di design a Lucca, e lavora per Serralunga, Artemide, Valli & Valli e Tecno.",
      'Born in Belgium in 1962, he graduated in architecture in Brussels in 1988. After two years working in Florence he won, aged twenty-six, the competition for the hemicycle of the European Parliament, for which he also designed the furniture. He received the Design Plus award in 2005. He runs an architecture practice in Brussels and a design studio in Lucca, working for Serralunga, Artemide, Valli & Valli and Tecno.',
    ],
    premi: [{ anno: '2005', titolo: ['Design Plus', 'Design Plus'] }],
  },
  {
    nome: 'Calvi & Brambilla',
    slug: 'calvi-brambilla',
    ruolo: [`Studio di progettazione`, 'Design studio'],
    pezzi: ['Banquété'],
  },
  {
    nome: 'Aldo Cibic',
    slug: 'aldo-cibic',
    foto: 'Aldo_Cibic.webp?v=1771517188',
    ruolo: AD,
    prov: ['Architetto e designer · Italia', 'Architect and designer · Italy'],
    pezzi: ['Porcino'],
    bio: [
      "Nato a Schio (Vicenza) nel 1955, nel 1978 entra nello studio di Ettore Sottsass a Milano, di cui diventa socio nel 1980, ed è tra i fondatori del gruppo Memphis. Nel 1989 fonda Cibic & Partners, studio internazionale di architettura e design. Ha insegnato, tra gli altri, al Politecnico di Milano e alla Tongji University di Shanghai, dove è professore onorario.",
      'Born in Schio (Vicenza) in 1955, in 1978 he joined the studio of Ettore Sottsass in Milan, becoming a partner in 1980, and was one of the founders of the Memphis group. In 1989 he founded Cibic & Partners, an international architecture and design studio. He has taught at the Politecnico di Milano and at Tongji University in Shanghai, among others, where he is an honorary professor.',
    ],
  },
  {
    nome: 'Florent Coirier',
    slug: 'florent-coirier',
    ruolo: D,
    prov: ['Designer · Francia', 'Designer · France'],
    pezzi: ['Croisette'],
    bio: [
      "Designer francese nato a Nantes nel 1983, vive e lavora a Parigi. Si forma all'ENSAAMA Olivier de Serres e prosegue al Birmingham Institute of Art and Design, dove consegue Bachelor e Master, diplomandosi con lode nel 2005.",
      'A French designer born in Nantes in 1983, he lives and works in Paris. He trained at ENSAAMA Olivier de Serres and continued at the Birmingham Institute of Art and Design, where he took his Bachelor and Master degrees, graduating with honours in 2005.',
    ],
  },
  {
    nome: 'Carlo Colombo',
    slug: 'carlo-colombo',
    ruolo: AD,
    prov: ['Architetto e designer · Italia', 'Architect and designer · Italy'],
    foto: 'Carlo_Colombo.jpg?v=1771573051',
    pezzi: ['Uovo di Colombo'],
    bio: [
      "Nato a Carimate nel 1967, si laurea in architettura al Politecnico di Milano nel 1993. Esordisce nel 1992 con il letto Kyoto per Giulio Cappellini e da allora lavora con molti dei principali marchi italiani come designer di prodotto, di arredo e di interni. Nel 2004 è Designer dell'anno a Tokyo; ha ricevuto quattro International Design Awards e, nel 2009, un Good Design Award.",
      'Born in Carimate in 1967, he graduated in architecture from the Politecnico di Milano in 1993. He made his debut in 1992 with the Kyoto bed for Giulio Cappellini and has since worked with many leading Italian brands as a product, furniture and interior designer. He was named Designer of the Year in Tokyo in 2004 and has received four International Design Awards and, in 2009, a Good Design Award.',
    ],
    premi: [
      { anno: '2004', titolo: ["Designer dell'anno, Tokyo", 'Designer of the Year, Tokyo'] },
      { anno: '2009', titolo: ['Good Design Award', 'Good Design Award'] },
    ],
  },
  {
    nome: 'Marta Daza Fernandez',
    slug: 'marta-daza-fernandez',
    foto: 'Marta-Daza-Fernandez.jpg?v=1676381833',
    ruolo: D,
    pezzi: ['Memory Pot'],
  },
  {
    nome: 'Michele De Lucchi',
    slug: 'michele-de-lucchi',
    ruolo: AD,
    prov: ['Architetto e designer · Italia', 'Architect and designer · Italy'],
    foto: 'Michele_De_Lucchi.jpg?v=1666096691',
    pezzi: ['Bonheur'],
    bio: [
      "Protagonista di Memphis, all'inizio degli anni Novanta fonda Produzione Privata per restituire all'architetto il ruolo di intellettuale che disegna e realizza oggetti con una responsabilità più forte verso la qualità e la bellezza. Nata come piccola produzione artigianale di progetti sperimentali, usa tecnologie al margine della manifattura industriale, applicate con una logica di serie.",
      'A leading figure of Memphis, in the early 1990s he founded Produzione Privata to give the architect back the role of an intellectual who designs and makes objects with a stronger responsibility towards quality and beauty. Started as a small craft production of experimental designs, it uses technologies at the edge of industrial manufacturing, applied with the logic of series production.',
    ],
  },
  {
    nome: 'Rodolfo Dordoni',
    slug: 'rodolfo-dordoni',
    ruolo: AD,
    prov: ['Architetto e designer · Milano', 'Architect and designer · Milan'],
    foto: 'Rodolfo_Dordoni.jpg?v=1666097260',
    pezzi: ['Ming', 'Sevres', 'Time Out'],
    bio: [
      "Architetto e designer nato a Milano, dove si laurea in architettura. È stato art director di Artemide, Cappellini, Fontana Arte, Foscarini, Minotti e Roda e ha disegnato per numerose aziende, tra cui Serralunga. Con Alessandro Acerbi e Luca Zaniboni fonda Dordoni Architetti, studio che si occupa di architettura e interni in tutto il mondo.",
      'An architect and designer born in Milan, where he graduated in architecture. He was art director of Artemide, Cappellini, Fontana Arte, Foscarini, Minotti and Roda and designed for many companies, including Serralunga. With Alessandro Acerbi and Luca Zaniboni he founded Dordoni Architetti, a practice working on architecture and interiors worldwide.',
    ],
  },
  {
    nome: 'Naoto Fukasawa',
    slug: 'naoto-fukasawa',
    ruolo: D,
    prov: ['Designer · Giappone', 'Designer · Japan'],
    foto: 'Naoto_Fukasawa.webp?v=1666096606',
    pezzi: ['Cone', 'Cup'],
    bio: [
      "Lavora a Tokyo con un piccolo gruppo di collaboratori, per le principali aziende internazionali. Nel 2007 la Royal Society of Arts gli conferisce il titolo di Honorary Royal Designer for Industry, accanto a numerosi premi internazionali. È direttore di 21_21 Design Site, fa parte del comitato di design di MUJI, presiede il Good Design Award e insegna alla Musashino Art University e alla Tama Art University.",
      'He works in Tokyo with a small team for leading international companies. In 2007 the Royal Society of Arts made him an Honorary Royal Designer for Industry, alongside many international awards. He is a director of 21_21 Design Site, sits on the MUJI design advisory board, chairs the Good Design Award and teaches at Musashino Art University and Tama Art University.',
    ],
    premi: [{ anno: '2007', titolo: ['Honorary Royal Designer for Industry, Royal Society of Arts', 'Honorary Royal Designer for Industry, Royal Society of Arts'] }],
  },
  {
    nome: 'Joan Gaspar',
    slug: 'joan-gaspar',
    ruolo: D,
    prov: ['Designer · Spagna', 'Designer · Spain'],
    foto: 'Joan_Gaspar.webp?v=1666096606',
    pezzi: ['Lluna', 'Pic-nic'],
    bio: [
      "Designer industriale, dal 1996 è legato a Marset Iluminación, per cui disegna prodotti e dirige il reparto prodotto. I suoi lavori sono stati selezionati ai premi FAD e hanno vinto il Delta d'argento nel 2001 con Atlas e nel 2004 con Neón de Luz. Nel 2002 apre il proprio studio di disegno industriale.",
      'An industrial designer, since 1996 he has been linked to Marset Iluminación, for which he designs products and heads the product department. His work has been selected for the FAD Awards and won the Silver Delta in 2001 with Atlas and in 2004 with Neón de Luz. He opened his own industrial design studio in 2002.',
    ],
    premi: [
      { anno: '2001', titolo: ["Delta d'argento (Atlas)", 'Silver Delta (Atlas)'] },
      { anno: '2004', titolo: ["Delta d'argento (Neón de Luz)", 'Silver Delta (Neón de Luz)'] },
    ],
  },
  {
    nome: 'Giovanni Giacobone & Massimo Roj',
    slug: 'giacobone-roj',
    foto: 'Giovanni_Giacobone_-_Massimo_Roj.jpg?v=1676383464',
    ruolo: [`Architetti`, 'Architects'],
    prov: ['Progetto CMR · Italia', 'Progetto CMR · Italy'],
    pezzi: ['Solea'],
    bio: [
      "Architetto e designer, Giovanni Giacobone dirige dal 1999 la divisione Industrial Design di Progetto CMR, dove sviluppa prodotti per la casa e l'ufficio che uniscono design, tecnologia e sostenibilità. I suoi lavori hanno ricevuto nel 2016 i premi Red Dot e iF Design. Per Serralunga firma Solea insieme a Massimo Roj.",
      'An architect and designer, Giovanni Giacobone has headed the Industrial Design division of Progetto CMR since 1999, developing home and office products that combine design, technology and sustainability. His work received the Red Dot and iF Design awards in 2016. For Serralunga he designed Solea together with Massimo Roj.',
    ],
    premi: [{ anno: '2016', titolo: ['Red Dot e iF Design Award', 'Red Dot and iF Design Award'] }],
  },
  {
    nome: 'Zaha Hadid',
    slug: 'zaha-hadid',
    etichette: ['Zaha Hadid Architects', 'ZHA'],
    ruolo: A,
    foto: 'Zaha_Hadid.webp?v=1666096606',
    pezzi: ['Flow', 'The Ripple'],
    nota: ['The Ripple è firmata da Zaha Hadid Architects.', 'The Ripple is by Zaha Hadid Architects.'],
    bio: [
      "Architetto che ha spinto con costanza i confini dell'architettura e del disegno urbano. Tra le sue opere più note la Vitra Fire Station e il Phaeno Science Center. Nel 2004 è stata la prima donna a ricevere il Pritzker Architecture Prize.",
      'An architect who consistently pushed the boundaries of architecture and urban design. Her best-known built works include the Vitra Fire Station and the Phaeno Science Center. In 2004 she became the first woman to receive the Pritzker Architecture Prize.',
    ],
    premi: [{ anno: '2004', titolo: ['Pritzker Architecture Prize', 'Pritzker Architecture Prize'] }],
  },
  {
    nome: 'Emanuelle Jacques',
    slug: 'emanuelle-jacques',
    ruolo: D,
    prov: ['Designer · Svizzera', 'Designer · Switzerland'],
    pezzi: ['Ramo'],
    bio: [
      "Nata nel 1982, ha base a Losanna e si diploma all'ECAL nel settembre 2005. Già durante gli studi espone al Salone del Mobile di Milano e disegna prodotti per nanoo, BCV e Serralunga. È considerata una figura promettente del design svizzero e ha ricevuto diversi premi.",
      'Born in 1982 and based in Lausanne, she graduated from ECAL in September 2005. While still a student she exhibited at the Milan furniture fair and designed products for nanoo, BCV and Serralunga. She is regarded as a promising figure in Swiss design and has received several awards.',
    ],
  },
  {
    nome: 'Nicolas Le Moigne',
    slug: 'nicolas-le-moigne',
    ruolo: D,
    pezzi: ['Pot au Mur'],
  },
  {
    nome: 'Arik Levy',
    slug: 'arik-levy',
    ruolo: D,
    prov: ['Designer · Parigi', 'Designer · Paris'],
    foto: 'Arik_Levy.webp?v=1771517190',
    pezzi: ['Meteor'],
    bio: [
      "Nato a Tel Aviv nel 1963, studia disegno industriale all'Art Center Europe in Svizzera, dove si diploma nel 1991. La vittoria in un concorso Seiko Epson avvia la sua carriera; a Parigi guida con Pippo Lionni lo studio L design. Il suo lavoro spazia fra prodotto, luce, interni e allestimenti, e comprende la collezione di cristalli Intangible per Baccarat. Fra i suoi clienti Vitra e Serralunga.",
      'Born in Tel Aviv in 1963, he studied industrial design at Art Center Europe in Switzerland, graduating in 1991. Winning a Seiko Epson competition launched his career; in Paris he leads the studio L design with Pippo Lionni. His work ranges across products, lighting, interiors and exhibitions, and includes the Intangible crystal collection for Baccarat. His clients include Vitra and Serralunga.',
    ],
  },
  {
    nome: 'Lineeverdi',
    slug: 'lineeverdi',
    foto: 'Lineeverdi_x-sito.jpg?v=1676381207',
    ruolo: [`Studio di paesaggio`, 'Landscape studio'],
    prov: ['Stefania Naretto e Chiara Otella · Torino', 'Stefania Naretto and Chiara Otella · Turin'],
    pezzi: ['Kentia'],
    bio: [
      "Stefania Naretto e Chiara Otella fondano lo studio Lineeverdi nel 2004, dopo la laurea alla Facoltà di Agraria di Torino. Formate nella progettazione del paesaggio, nel restauro di parchi storici e nella realizzazione di giardini e terrazzi, hanno progettato il verde di edifici residenziali e commerciali e di uno stabilimento FCA in Brasile; dal 2010 lavorano al parco zoologico Zoom Torino.",
      'Stefania Naretto and Chiara Otella founded the studio Lineeverdi in 2004, after graduating from the Faculty of Agriculture in Turin. Trained in landscape design, the restoration of historic parks and the creation of gardens and terraces, they have designed green spaces for residential and commercial buildings and for an FCA plant in Brazil; since 2010 they have worked on the Zoom Torino zoological park.',
    ],
  },
  {
    nome: 'Ross Lovegrove',
    slug: 'ross-lovegrove',
    ruolo: D,
    prov: ['Designer · Regno Unito', 'Designer · United Kingdom'],
    foto: 'Ross_Lovegrove.jpg.700x700_q85_crop-center_upscale.jpg?v=1676382470',
    pezzi: ['New Wave'],
    bio: [
      "Nato a Cardiff, in Galles, nel 1958, studia disegno industriale al Manchester Polytechnic e al Royal College of Art di Londra. Inizia da Frog Design in Germania, poi è consulente per Knoll a Parigi. Rientrato a Londra nel 1986, lavora per marchi come Kartell, Vitra e Herman Miller. I suoi progetti, pluripremiati, sono stati esposti al MoMA e al Centre Pompidou.",
      'Born in Cardiff, Wales, in 1958, he studied industrial design at Manchester Polytechnic and the Royal College of Art in London. He started at Frog Design in Germany, then worked as a consultant for Knoll in Paris. Back in London from 1986, he has worked for brands such as Kartell, Vitra and Herman Miller. His award-winning designs have been exhibited at MoMA and the Centre Pompidou.',
    ],
  },
  {
    nome: 'Vico Magistretti',
    slug: 'vico-magistretti',
    foto: 'Vico_magistretti.jpg?v=1676383305',
    ruolo: AD,
    prov: ['Architetto e designer · Milano, 1920–2006', 'Architect and designer · Milan, 1920–2006'],
    pezzi: ['Russell'],
    bio: [
      "Architetto, urbanista e designer milanese (1920–2006), membro dei CIAM e honorary fellow del Royal College of Art di Londra. Ha collaborato con aziende come Artemide, Cassina e Kartell. Medaglia d'oro alla Triennale del 1951, ha ricevuto più volte il Compasso d'Oro.",
      "A Milanese architect, town planner and designer (1920–2006), a member of CIAM and an honorary fellow of the Royal College of Art in London. He worked with companies such as Artemide, Cassina and Kartell. Gold medal at the 1951 Triennale, he won the Compasso d'Oro several times.",
    ],
    premi: [{ anno: '1951', titolo: ["Medaglia d'oro, Triennale di Milano", 'Gold medal, Triennale di Milano'] }],
  },
  {
    nome: 'Raffaella Mangiarotti',
    slug: 'raffaella-mangiarotti',
    etichette: ['Matteo Bazzicalupo and Raffaella Mangiarotti', 'Raffaella Mangiarotti and Marco Ravina', 'Bazzicalupo Mangiarotti', 'deepdesign'],
    ruolo: AD,
    prov: ['Architetto e designer · Milano', 'Architect and designer · Milan'],
    foto: 'Raffaella_Mangiarotti.webp?v=1666096606',
    pezzi: ['Bay', 'Fence', 'Sirchester', 'Honey', 'Babà'],
    nota: [
      'Sirchester è firmata con Matteo Bazzicalupo; Honey e Babà con Marco Ravina.',
      'Sirchester is designed with Matteo Bazzicalupo; Honey and Babà with Marco Ravina.',
    ],
    bio: [
      "Vive e lavora a Milano. Si laurea con lode in architettura al Politecnico di Milano, dove è ricercatrice di design. Con Matteo Bazzicalupo fonda deepdesign, studio di disegno industriale che lavora per marchi come Barilla, Whirlpool e Serralunga. La sua Dandelion Lamp fa parte della collezione permanente del MoMA; nel 2009 il Triennale Design Museum di Milano ha dedicato una personale al lavoro dello studio.",
      'She lives and works in Milan. She graduated with honours in architecture from the Politecnico di Milano, where she is a design researcher. With Matteo Bazzicalupo she founded deepdesign, an industrial design studio working for brands such as Barilla, Whirlpool and Serralunga. Her Dandelion Lamp is in the permanent collection of MoMA; in 2009 the Triennale Design Museum in Milan devoted a solo exhibition to the studio\'s work.',
    ],
  },
  {
    nome: 'Jean-Marie Massaud',
    slug: 'jean-marie-massaud',
    ruolo: AD,
    prov: ['Architetto e designer · Francia', 'Architect and designer · France'],
    foto: 'designerdetail_Jean-Marie-Massaud.jpg?v=1676382138',
    pezzi: ['Missed Tree'],
    bio: [
      "Nato a Tolosa nel 1966, si diploma all'ENSCI di Parigi nel 1990. Ha lavorato con marchi come Axor, Cassina, Cappellini, Armani, Baccarat, Lancôme, Renault e Poltrona Frau. Fra i suoi progetti di architettura il Volcano Stadium di Guadalajara e le TriBeCa Condominium Towers di New York. Ha ricevuto numerosi premi e i suoi lavori sono presenti in collezioni museali.",
      'Born in Toulouse in 1966, he graduated from ENSCI in Paris in 1990. He has worked with brands such as Axor, Cassina, Cappellini, Armani, Baccarat, Lancôme, Renault and Poltrona Frau. His architecture projects include the Volcano Stadium in Guadalajara and the TriBeCa Condominium Towers in New York. He has received many awards and his work is held in museum collections.',
    ],
  },
  {
    nome: 'Alberto Meda',
    slug: 'alberto-meda',
    ruolo: [`Ingegnere e designer`, 'Engineer and designer'],
    prov: ['Designer · Milano', 'Designer · Milan'],
    foto: 'Alberto_Meda.jpg?v=1771517193',
    pezzi: ['Inorbita'],
    bio: [
      "Si laurea in ingegneria meccanica al Politecnico di Milano nel 1969. Designer industriale, ha insegnato allo IUAV di Venezia e collaborato con molte aziende. Ha vinto due Compassi d'Oro, nel 1989 e nel 1994, con le lampade Lola e Metropoli di Luceplan. Dal 1994 suoi pezzi sono nella collezione permanente del MoMA di New York; nel 2005 la Royal Society of Arts di Londra lo nomina Honorary Royal Designer for Industry. Vive e lavora a Milano.",
      "He graduated in mechanical engineering from the Politecnico di Milano in 1969. An industrial designer, he has taught at IUAV in Venice and worked with many companies. He won two Compasso d'Oro awards, in 1989 and 1994, with the Lola and Metropoli lamps for Luceplan. Since 1994 his pieces have been in the permanent collection of MoMA in New York; in 2005 the Royal Society of Arts in London named him Honorary Royal Designer for Industry. He lives and works in Milan.",
    ],
    premi: [
      { anno: '1989', titolo: ["Compasso d'Oro (Lola, Luceplan)", "Compasso d'Oro (Lola, Luceplan)"] },
      { anno: '1994', titolo: ["Compasso d'Oro (Metropoli, Luceplan)", "Compasso d'Oro (Metropoli, Luceplan)"] },
      { anno: '2005', titolo: ['Honorary Royal Designer for Industry', 'Honorary Royal Designer for Industry'] },
    ],
  },
  {
    nome: 'Nat Wave',
    slug: 'nat-wave',
    ruolo: D,
    pezzi: ['Cubotti', 'Tubini'],
  },
  {
    nome: 'Philippe Nigro',
    slug: 'philippe-nigro',
    ruolo: D,
    prov: ['Designer · Francia / Italia', 'Designer · France / Italy'],
    foto: 'Philippe_Nigro.webp?v=1666096606',
    pezzi: ['Canisse'],
    bio: [
      "Designer francese nato a Nizza nel 1975, vive a Milano e lavora tra Francia e Italia. Indipendente dal 1999, collabora con lo Studio De Lucchi. Tra i suoi progetti la libreria Spiral, i contenitori Storage-Unit e i divani Intersections, sviluppati poi da Ligne Roset con il nome Confluences e premiati con il Red Dot nel 2009. Collabora con Serralunga dal 2011.",
      'A French designer born in Nice in 1975, he lives in Milan and works between France and Italy. Independent since 1999, he collaborates with Studio De Lucchi. His projects include the Spiral bookshelf, the Storage-Unit containers and the Intersections sofas, later developed by Ligne Roset as Confluences and awarded a Red Dot in 2009. He has worked with Serralunga since 2011.',
    ],
    premi: [{ anno: '2009', titolo: ['Red Dot Award (Confluences, Ligne Roset)', 'Red Dot Award (Confluences, Ligne Roset)'] }],
  },
  {
    nome: 'Patrick Norguet',
    slug: 'patrick-norguet',
    ruolo: D,
    pezzi: ['Balzac'],
    nota: [
      'La collezione Balzac segna la prima collaborazione fra Serralunga e Norguet.',
      'The Balzac collection marks the first collaboration between Serralunga and Norguet.',
    ],
  },
  {
    nome: 'Lina Obregon',
    slug: 'lina-obregon',
    ruolo: D,
    prov: ['Designer · Colombia / Italia', 'Designer · Colombia / Italy'],
    foto: 'Lina-Obregon.jpg?v=1676382642',
    pezzi: ['Palenquera'],
    bio: [
      "Designer colombiana nata nel 1972, vive a Milano dal 2000. Studia disegno industriale a Medellín (1995) e bionica e design a Milano (1997). Dal 2009 è consulente di design per Serralunga e altre aziende, dopo essere stata direttore del design di Totaltool. Ha lavorato per Telecom Italia, Autogrill ed Elica, con progetti selezionati per il Compasso d'Oro.",
      "A Colombian designer born in 1972, she has lived in Milan since 2000. She studied industrial design in Medellín (1995) and bionics and design in Milan (1997). Since 2009 she has been a design consultant for Serralunga and other companies, after serving as design director at Totaltool. She has worked for Telecom Italia, Autogrill and Elica, with projects selected for the Compasso d'Oro.",
    ],
  },
  {
    nome: 'Christophe Pillet',
    slug: 'christophe-pillet',
    ruolo: D,
    prov: ['Designer · Francia', 'Designer · France'],
    foto: 'Christophe_Pillet.webp?v=1771592390',
    pezzi: ['June', 'Pine Beach', 'Loop', 'Scarlett'],
    bio: [
      "Nato nel 1959, vive e lavora a Parigi. Si diploma alle Arts Décoratifs di Nizza nel 1985 e consegue il master alla Domus Academy di Milano; lavora con Martine Bedin e poi, fino al 1993, con Philippe Starck, prima di aprire il proprio studio. La sua attività spazia fra prodotto, arredo, interni, architettura, scenografia e direzione artistica, per marchi come Cappellini, Driade, Moroso, Porro e Serralunga.",
      'Born in 1959, he lives and works in Paris. He graduated from the Arts Décoratifs in Nice in 1985 and took a master at Domus Academy in Milan; he worked with Martine Bedin and then, until 1993, with Philippe Starck, before opening his own studio. His practice spans product, furniture, interiors, architecture, scenography and art direction, for brands such as Cappellini, Driade, Moroso, Porro and Serralunga.',
    ],
  },
  {
    nome: 'Karim Rashid',
    slug: 'karim-rashid',
    ruolo: D,
    prov: ['Designer · New York', 'Designer · New York'],
    foto: 'Karim-rashid-normal.jpg?v=1676382978',
    pezzi: ['Plomb'],
    bio: [
      "Nato al Cairo e cresciuto in Canada, lavora a New York. Ha messo in produzione circa duemila oggetti e firmato interni come il ristorante Morimoto di Filadelfia e l'hotel Semiramis di Atene. Dottore honoris causa in belle arti, ha insegnato disegno industriale per dieci anni; i suoi lavori sono nelle collezioni di quattordici musei, fra cui il MoMA.",
      'Born in Cairo and raised in Canada, he works in New York. He has put some two thousand objects into production and designed interiors such as the Morimoto restaurant in Philadelphia and the Semiramis hotel in Athens. He holds an honorary doctorate in fine arts and taught industrial design for ten years; his work is in the collections of fourteen museums, including MoMA.',
    ],
  },
  {
    nome: 'Paolo Rizzatto',
    slug: 'paolo-rizzatto',
    etichette: ['Paolo Rizzato'],
    ruolo: AD,
    prov: ['Architetto e designer · Milano', 'Architect and designer · Milan'],
    foto: 'Paolo_Rizzatto.webp?v=1666096606',
    pezzi: ['New Pot', 'Giulietta', 'Romeo', 'Eufronio'],
    bio: [
      "Nato a Milano nel 1941, si laurea in architettura al Politecnico di Milano nel 1965. Da libero professionista si occupa di architettura, interni, luce e design; nel 1978 fonda Luceplan con Riccardo Sarfatti e Sandra Severi. Tra le sue architetture l'asilo nido di Segrate (1972), una casa di vacanza a Formentera e la sede Luceplan a Milano (1997). Ha disegnato per Artemide, Cassina, Kartell, Knoll e Serralunga; i suoi lavori sono presenti in collezioni di musei e fondazioni.",
      'Born in Milan in 1941, he graduated in architecture from the Politecnico di Milano in 1965. As a freelance professional he works on architecture, interiors, lighting and design; in 1978 he founded Luceplan with Riccardo Sarfatti and Sandra Severi. His buildings include the nursery in Segrate (1972), a holiday house in Formentera and the Luceplan headquarters in Milan (1997). He has designed for Artemide, Cassina, Kartell, Knoll and Serralunga; his work is held in museum and foundation collections.',
    ],
  },
  {
    nome: 'Garth Roberts',
    slug: 'garth-roberts',
    ruolo: D,
    prov: ['Designer · Milano / Berlino / New York', 'Designer · Milan / Berlin / New York'],
    foto: 'Garth_Roberts.webp?v=1666096606',
    pezzi: ['Juju', 'Ruffle'],
    bio: [
      "Inizia a Toronto e trascorre poi cinque anni a New York, dove progetta interni, prodotti e marchi. Trasferitosi in Europa nel 2005, lavora per B&B Italia e Zanotta. I suoi progetti sono stati pubblicati nell'International Design Yearbook e candidati agli Elle Decor Awards. Vive e lavora tra Milano, Berlino e New York.",
      'He started out in Toronto and then spent five years in New York designing interiors, products and brands. After moving to Europe in 2005 he worked for B&B Italia and Zanotta. His designs have been published in the International Design Yearbook and nominated for the Elle Decor Awards. He lives and works between Milan, Berlin and New York.',
    ],
  },
  {
    nome: 'Denis Santachiara',
    slug: 'denis-santachiara',
    ruolo: D,
    prov: ['Designer · Italia', 'Designer · Italy'],
    foto: 'denis-santachiara.jpg?v=1676382907',
    pezzi: ['Pisa', 'Santavase'],
    bio: [
      "Outsider originale, lavora al confine fra arte e design. Ha esposto alla Biennale di Venezia e a Documenta 8 a Kassel; nel 1984 cura la mostra «La Neomerce» alla Triennale di Milano e al Centre Pompidou di Parigi. Suoi lavori sono nelle collezioni del MoMA, del Musée des Arts Décoratifs e del Centre Pompidou. Scrive saggi, tiene seminari e collabora con aziende e musei.",
      'An original outsider working on the border between art and design. He has exhibited at the Venice Biennale and at Documenta 8 in Kassel; in 1984 he curated the exhibition "La Neomerce" at the Milan Triennale and the Centre Pompidou in Paris. His work is in the collections of MoMA, the Musée des Arts Décoratifs and the Centre Pompidou. He writes essays, gives seminars and works with companies and museums.',
    ],
  },
  {
    nome: 'Philippe Starck',
    slug: 'philippe-starck',
    ruolo: D,
    prov: ['Designer · Francia', 'Designer · France'],
    foto: 'Philippe_Starck.webp?v=1666096606',
    pezzi: ['Holly All'],
    bio: [
      "Da oltre trent'anni firma oggetti anticonvenzionali e poetici. I suoi lavori sono stati esposti nei musei di New York, Monaco, Londra, Chicago, Kyoto, Barcellona e Parigi. Ha ricevuto riconoscimenti in Francia, negli Stati Uniti e in Italia, fra cui Designer of the Year, Grand Prix du Design Industriel, Oscar du Design e Compasso d'Oro.",
      "For more than thirty years he has created unconventional, poetic objects. His work has been shown in museums in New York, Munich, London, Chicago, Kyoto, Barcelona and Paris. He has received awards in France, the United States and Italy, including Designer of the Year, the Grand Prix for Industrial Design, the Oscar du Design and the Compasso d'Oro.",
    ],
  },
  {
    nome: 'Brian Steendyk',
    slug: 'brian-steendyk',
    foto: 'Brian_Steendyk.jpg?v=1771517340',
    ruolo: AD,
    prov: ['Architetto e designer · Australia', 'Architect and designer · Australia'],
    pezzi: ['Cero'],
    bio: [
      "Designer australiano, firma lavori decisi e scultorei che sfumano il confine fra arte e prodotto. Guida lo studio Steendyk, che affronta progetti complessi con un approccio interdisciplinare, e realizza architetture e prodotti premiati, attenti a sostenibilità, funzione ed estetica.",
      'An Australian designer whose bold, sculptural work blurs the line between art and product. He leads the Steendyk studio, which takes an interdisciplinary approach to complex projects, and creates award-winning architecture and products focused on sustainability, function and aesthetics.',
    ],
  },
  {
    nome: 'Patricia Urquiola',
    slug: 'patricia-urquiola',
    foto: 'Patricia_Urquiola.jpg?v=1666096691',
    ruolo: AD,
    prov: ['Architetto e designer · Spagna / Italia', 'Architect and designer · Spain / Italy'],
    pezzi: ['Cassero'],
    bio: [
      "Nata a Oviedo nel 1961, vive e lavora a Milano. Studia architettura al Politecnico di Madrid e al Politecnico di Milano, dove si laurea nel 1989 con Achille Castiglioni. Disegna per numerose aziende italiane e internazionali; i suoi lavori sono nelle collezioni di musei come il MoMA e il Victoria & Albert Museum.",
      'Born in Oviedo in 1961, she lives and works in Milan. She studied architecture at the Polytechnic of Madrid and the Politecnico di Milano, where she graduated in 1989 under Achille Castiglioni. She designs for many Italian and international companies; her work is in the collections of museums such as MoMA and the Victoria & Albert Museum.',
    ],
  },
  {
    nome: 'Ionna Vautrin',
    slug: 'ionna-vautrin',
    ruolo: D,
    prov: ['Designer · Francia', 'Designer · France'],
    pezzi: ['Luba'],
  },
]

const S = 'https://serralunga.com/cdn/shop/files'

const elencoPezzi = (v: string[], e: string) =>
  v.length < 2 ? v.join('') : `${v.slice(0, -1).join(', ')} ${e} ${v[v.length - 1]}`

/** I testi di una voce nelle due lingue: [italiano, inglese] campo per campo. */
function testi(v: Voce) {
  const it = elencoPezzi(v.pezzi, 'e')
  const en = elencoPezzi(v.pezzi, 'and')
  const firma: Due = [
    `Per Serralunga firma ${it}.${v.nota ? ` ${v.nota[0]}` : ''}`,
    `For Serralunga: ${en}.${v.nota ? ` ${v.nota[1]}` : ''}`,
  ]
  const estratto: Due = [`Per Serralunga firma ${it}.`, `For Serralunga: ${en}.`]
  const seoTitolo: Due = [
    `${v.nome}, ${v.ruolo[0].toLowerCase()} | Serralunga`,
    `${v.nome}, ${v.ruolo[1].toLowerCase()} | Serralunga`,
  ]
  const seoDescrizione: Due = [
    `${v.nome} per Serralunga: nota biografica e pezzi firmati (${it}) per l'outdoor contract.`,
    `${v.nome} for Serralunga: biography and signature pieces (${en}) for contract outdoor projects.`,
  ]
  const alt: Due = [`Ritratto di ${v.nome}`, `Portrait of ${v.nome}`]
  return { firma, estratto, seoTitolo, seoDescrizione, alt }
}

/** Slug delle schede che esistevano già nel seed di base (dati.ts): qui si aggiunge solo la biografia. */
export const GIA_PRESENTI = ['luisa-bocchietto', 'marta-sansoni']

/** Dati in italiano, pronti per Payload. `ordine` parte da 4: i primi tre restano quelli della home. */
export const designerAltri = async (m: Media) => {
  const out: Record<string, unknown>[] = []
  let ordine = 3
  for (const v of VOCI) {
    const t = testi(v)
    const gia = GIA_PRESENTI.includes(v.slug)
    if (!gia) ordine++
    out.push({
      nome: v.nome,
      slug: v.slug,
      schedaPubblicata: true,
      ruolo: v.ruolo[0],
      ...(v.prov ? { provenienza: v.prov[0] } : {}),
      biografia: [...(v.bio ? [{ testo: v.bio[0] }] : []), { testo: t.firma[0] }],
      ...(v.premi ? { premi: v.premi.map((p) => ({ anno: p.anno, titolo: p.titolo[0] })) } : {}),
      seo: { titolo: t.seoTitolo[0], descrizione: t.seoDescrizione[0] },
      // Le schede già presenti tengono ritratto, ordine ed estratti del seed di base.
      ...(gia
        ? {}
        : {
            ordine,
            ritratto: v.foto ? await m(`${S}/${v.foto}`, t.alt[0], { min: RITRATTO_MIN }) : null,
            ritrattoProvvisorio: true,
            estratto: t.estratto[0],
            pezziSegnaposto: 0,
          }),
    })
  }
  return out
}

/** Traduzioni inglesi dei testi di queste schede (chiave = testo italiano). */
export const designerInglese = (): Record<string, string> => {
  const en: Record<string, string> = {}
  const metti = (d?: Due) => {
    if (d && d[0] !== d[1]) en[d[0]] = d[1]
  }
  for (const v of VOCI) {
    const t = testi(v)
    ;[v.ruolo, v.prov, v.bio, t.firma, t.estratto, t.seoTitolo, t.seoDescrizione, t.alt].forEach(metti)
    v.premi?.forEach((p) => metti(p.titolo))
  }
  return en
}

/** Ritratti dei tre designer del seed di base, per rifarli a risoluzione piena. */
const RITRATTI_BASE: Record<string, string> = {
  'marc-sadler': 'Marc_Sadler.webp?v=1666092471',
  'luisa-bocchietto': 'Luisa_Bocchiettto_8d7d7247-c9af-44ac-89e7-ec26bf157f3f.webp?v=1676378763',
  'marta-sansoni': 'ritrattomarta.jpg?v=1683278005',
}

/** Per ogni designer: come trovarne i pezzi nel catalogo di serralunga.com e dove sta il ritratto. */
export const designerFonti = () => {
  const separa = (nome: string) => nome.split(/\s+(?:&|e|and)\s+/).map((x) => x.trim())
  return [
    {
      slug: 'marc-sadler',
      nome: 'Marc Sadler',
      etichette: ['Marc Sadler'],
      pezzi: ['Aqua', 'Lady Jane', 'Aunt Jane', 'Grand Jane', 'Kubrick'],
      ritratto: `${S}/${RITRATTI_BASE['marc-sadler']}`,
    },
    ...VOCI.map((v) => ({
      slug: v.slug,
      nome: v.nome,
      etichette: [v.nome, ...separa(v.nome), ...(v.etichette || [])].filter((x, i, a) => a.indexOf(x) === i),
      pezzi: v.pezzi,
      ritratto: RITRATTI_BASE[v.slug] ? `${S}/${RITRATTI_BASE[v.slug]}` : v.foto ? `${S}/${v.foto}` : null,
    })),
  ]
}
