/** Contenuti di prodotti, designer e case history copiati dai template. */
type Media = (sorgente: string, alt: string, opz?: { min?: number }) => Promise<number | null>

const S = 'https://serralunga.com/cdn/shop'

export const designerDati = async (m: Media) => [
  {
    nome: 'Marc Sadler',
    slug: 'marc-sadler',
    ordine: 1,
    schedaPubblicata: true,
    ruolo: 'Designer',
    provenienza: 'Designer · Francia / Italia',
    ritratto: await m(`${S}/files/Marc_Sadler.webp?v=1666092471`, 'Ritratto di Marc Sadler', { min: 1400 }),
    ritrattoProvvisorio: true,
    estratto: "Quattro volte Compasso d'Oro. Per Serralunga firma l'Aqua Lounger e la famiglia Aqua.",
    citazione: '«Il materiale non è un vincolo: è il primo interlocutore del progetto.»',
    biografia: [
      {
        testo:
          "Nato in Austria e cresciuto tra Francia e Italia, si forma all'ENSAD di Parigi con una tesi sulle materie plastiche. Negli anni Settanta mette a punto il primo scarpone da sci termoplastico interamente riciclabile: da lì in avanti la sua ricerca vive sulle contaminazioni fra tecnologie sportive, industria e arredo.",
      },
      {
        testo:
          'Il suo lavoro attraversa illuminazione, attrezzatura sportiva, imbottiti e outdoor. Per Serralunga porta nel mondo della piscina la logica dello stampaggio rotazionale: un guscio unico, nessun assemblaggio, il comfort ottenuto dalla sola geometria.',
      },
    ],
    numeri: [
      { valore: '4', etichetta: "Compassi d'Oro" },
      { valore: '1994', etichetta: 'Primo riconoscimento ADI' },
      { valore: 'ENSAD', etichetta: 'Parigi' },
    ],
    premi: [
      { anno: '1994', titolo: "Compasso d'Oro" },
      { anno: '2001', titolo: "Compasso d'Oro" },
      { anno: '2008', titolo: "Compasso d'Oro" },
      { anno: '2014', titolo: "Compasso d'Oro" },
    ],
    banner: {
      immagine: await m(`${S}/files/aqua-11-1.jpg?v=1771512678&width=2400`, 'Aqua Lounger a bordo piscina'),
      frase: 'Un guscio unico, nessun assemblaggio.',
    },
    titoloPezzi: 'I pezzi\nper Serralunga',
    pezziSegnaposto: 0,
    cta: { kicker: 'Progetti su misura', titolo: 'Lavoriamo con i designer,\nper il vostro luogo' },
    seo: {
      titolo: 'Marc Sadler, designer | Serralunga',
      descrizione:
        "Marc Sadler, quattro Compassi d'Oro, firma per Serralunga l'Aqua Lounger e la famiglia Aqua: biografia, premi e pezzi disegnati per l'outdoor contract.",
    },
  },
  {
    nome: 'Luisa Bocchietto',
    slug: 'luisa-bocchietto',
    ordine: 2,
    schedaPubblicata: false,
    ruolo: 'Architetto',
    ritratto: await m(
      `${S}/files/Luisa_Bocchiettto_8d7d7247-c9af-44ac-89e7-ec26bf157f3f.webp?v=1676378763`,
      'Ritratto di Luisa Bocchietto',
      { min: 1400 },
    ),
    ritrattoProvvisorio: true,
    estratto: 'Vas-One Family e Big-Bo: i volumi monumentali che segnano gli ingressi e le corti.',
    estrattoHome:
      'Direzione artistica della collezione e disegno della Vas-One Family, da Big-Bo ai volumi fuori scala.',
  },
  {
    nome: 'Marta Sansoni',
    slug: 'marta-sansoni',
    ordine: 3,
    schedaPubblicata: false,
    ruolo: 'Designer',
    ritratto: await m(`${S}/files/ritrattomarta.jpg?v=1683278005`, 'Ritratto di Marta Sansoni', { min: 1400 }),
    ritrattoProvvisorio: false,
    estratto: 'Fiore di Loto: geometria, monocromia e un rapporto armonioso fra luce, oggetto e acqua.',
    estrattoHome:
      'Autrice del Fiore di Loto: geometria, monocromia e un rapporto armonioso fra luce, oggetto e spazio.',
  },
]

export const caseLoge = async (m: Media) => ({
  nome: 'La Loge du Massif',
  slug: 'la-loge-du-massif',
  ordine: 1,
  kicker: "Case history — Courmayeur, Valle d'Aosta",
  titolo: 'La Loge\ndu Massif',
  introduzione:
    'Una terrazza a quota 1.700 sul Monte Bianco: arredarla significa resistere a due metri di neve e restare eleganti quando il sole torna a batterci sopra.',
  etichetta: 'Poltrone Canisse',
  immagine: await m('assets/loge-02.jpg', 'La Loge du Massif, terrazza sulle piste di Courmayeur'),
  card: {
    etichetta: 'Ristorazione · Courmayeur',
    titolo: 'La Loge du Massif: sedersi davanti al Monte Bianco',
    immagine: await m('assets/loge-04.jpg', 'La terrazza al crepuscolo con il braciere acceso'),
  },
  progetto: {
    kicker: 'Il progetto',
    titolo: 'Sedersi\ndavanti al Massiccio',
    paragrafi: [
      {
        testo:
          "Chalet in legno affacciato sulle piste, cucina d'altura e un dehors che d'inverno diventa il salotto più ambìto della valle. La committenza chiedeva sedute che non temessero gelo, sale antineve e sbalzi termici, ma che al tramonto avessero la morbidezza di un divano da interni.",
      },
      {
        testo:
          'La risposta è Canisse: la poltrona a canne verticali in polietilene tinto in massa, disposta a corona intorno al braciere. Un disegno che cita le stuoie di canne dei rifugi, ma nasce dallo stesso stampaggio rotazionale dei nostri vasi monumentali.',
      },
    ],
    scheda: [
      { etichetta: 'Luogo', valore: 'Courmayeur, Plan Chécrouit' },
      { etichetta: 'Quota', valore: '1.700 m s.l.m.' },
      { etichetta: 'Tipologia', valore: 'Ristorante & lounge sulle piste' },
      { etichetta: 'Prodotti', valore: 'Poltrone Canisse' },
      { etichetta: 'Uso', valore: "Dehors, tutto l'anno" },
      { etichetta: 'Escursione termica', valore: "Da −20 °C al sole d'agosto" },
    ],
  },
  citazione: {
    testo: '«Alle cinque del pomeriggio la terrazza è il posto più caldo della montagna.»',
    immagine: await m('assets/loge-04.jpg', 'La terrazza al crepuscolo con il braciere acceso'),
  },
  passi: [
    {
      titolo: 'La sfida',
      testo:
        "Sedute lasciate fuori tutto l'inverno, sepolte dalla neve e scoperte al primo sole: nessun tessuto, nessuna verniciatura che possa sfogliarsi.",
    },
    {
      titolo: 'La scelta',
      testo:
        "Polietilene tinto in massa, resistente da −35 °C a +80 °C: il colore è il corpo dell'oggetto, i graffi della stagione non lo scoprono mai.",
    },
    {
      titolo: 'Il risultato',
      testo:
        'Una corona di poltrone intorno al fuoco, spostabili in pochi secondi e impilabili a fine stagione: il dehors cambia scena con il servizio.',
    },
  ],
  coppiaImmagini: [
    { immagine: await m('assets/loge-08.jpg', 'Lo chalet illuminato di notte'), allineamento: 'basso' },
    { immagine: await m('assets/loge-01.jpg', 'La terrazza nel sole del mattino'), allineamento: 'centro' },
  ],
  protagonista: {
    kicker: 'Il pezzo protagonista',
    titolo: 'Canisse,\nuna stuoia che accoglie',
    testo:
      "Canne verticali che avvolgono la seduta come una recinzione domestica: leggerezza visiva, massa sufficiente a non muoversi col vento di cresta. In antracite si legge come un elemento d'arredo e non come un complemento tecnico.",
    dati: [
      { etichetta: 'Materiale', valore: 'LLDPE tinto in massa' },
      { etichetta: 'Produzione', valore: 'Stampaggio rotazionale, Biella' },
      { etichetta: 'Manutenzione', valore: 'Panno umido e detergente neutro' },
      { etichetta: 'Stoccaggio', valore: 'Impilabile a fine stagione' },
    ],
    immagine: await m('assets/loge-10.jpg', 'Le poltrone Canisse in corona attorno al braciere'),
  },
  diario: {
    titolo: 'Il diario\ndella stagione',
    testo: "Scatti di servizio dal cantiere e dalle prime aperture: la stessa terrazza dall'alba alla notte.",
    immagini: [
      { immagine: await m('assets/loge-06.jpg', "La terrazza vista dall'alto") },
      { immagine: await m('assets/loge-03.jpg', 'Tavoli e poltrone al crepuscolo') },
      { immagine: await m('assets/loge-07.jpg', 'Il dehors nel pomeriggio') },
      { immagine: await m('assets/loge-05.jpg', 'Lo chalet illuminato') },
      { immagine: await m('assets/loge-09.jpg', 'La facciata di notte') },
    ].filter((i) => i.immagine),
    segnaposto: 'altri scatti\nin alta risoluzione',
  },
  prodottiUsati: {
    kicker: 'Prodotti utilizzati',
    titolo: "Cosa c'è\nsu questa terrazza",
    testo:
      'La fornitura per La Loge du Massif: le poltrone Canisse in antracite, disposte a corona intorno al braciere e sui tavoli del dehors.',
    voci: [
      {
        nome: 'Poltrona Canisse',
        sottotitolo: 'Arredo outdoor · LLDPE tinto in massa · antracite',
        nota: 'quantità in opera da confermare',
        immagine: await m('assets/loge-10.jpg', 'Le poltrone Canisse in corona attorno al braciere'),
      },
      {
        nome: 'Cuscini di seduta',
        sottotitolo: 'Complemento · tessuto outdoor sfoderabile',
        nota: 'codice e quantità da confermare',
        segnapostoImmagine: 'immagine prodotto\ncuscino di seduta — da fornire',
      },
    ],
  },
  contatto: {
    kicker: 'Il prossimo progetto',
    titolo: 'Dove lo apriamo,\nla prossima stagione?',
    testo: 'Sopralluogo, selezione dei pezzi, colori dedicati e consegne programmate per fasi di cantiere.',
  },
  seo: {
    titolo: 'La Loge du Massif, Courmayeur | Serralunga',
    descrizione:
      'Case history: le poltrone Canisse in polietilene tinto in massa sulla terrazza della Loge du Massif a 1.700 metri, tra neve, gelo e sole del Monte Bianco.',
  },
})

export const aquaLounger = async (m: Media, designer: Record<string, number>, caseHistory: number[]) => ({
  nome: 'Aqua Lounger',
  slug: 'aqua-lounger',
  ordine: 1,
  schedaPubblicata: true,
  famiglia: 'arredo',
  designer: designer['marc-sadler'],
  immagine: await m(`${S}/products/Aquasunloungersquare1.jpg?v=1771512693&width=1800`, 'Aqua Lounger'),
  etichettaCard: 'Piscina — Marc Sadler',
  categoria: 'Piscina & spiaggia — set da 2',
  firma: 'Disegno di Marc Sadler',
  galleria: [
    { immagine: await m(`${S}/products/Aqua_AQUA-WH.jpg?v=1771512662&width=1800`, 'Lettino Aqua bianco') },
    { immagine: await m(`${S}/products/Aqua_AQUA-AZP.jpg?v=1771512664&width=1800`, 'Lettino Aqua azzurro di Provenza') },
    { immagine: await m(`${S}/products/Aqua_AQUA-SAV.jpg?v=1771512667&width=1800`, 'Lettino Aqua salvia di Sardegna') },
    { immagine: await m(`${S}/files/aqua-2-zoom.jpg?v=1771512675&width=1800`, 'Dettaglio della superficie') },
    {
      immagine: await m(
        `${S}/products/AQUALOUNGER-OLIVIATABLE-DOLCEVITALOUNGECHAIR.jpg?v=1771512680&width=1800`,
        'Aqua Lounger con tavolo Olivia e poltrona Dolce Vita',
      ),
    },
    { immagine: await m(`${S}/files/aqua-31-1.jpg?v=1771512691&width=1800`, 'Aqua Lounger in acqua') },
  ].filter((g) => g.immagine),
  descrizione:
    "Un lettino pensato per stare _dentro_ l'acqua: profilo rigoroso e solidità ergonomica in equilibrio, posato come una conchiglia sulla battigia. Utilizzabile a bordo piscina o immerso fino a 15 cm d'acqua — 20 cm con l'Aqua Riser opzionale, agganciabile in quattro punti.",
  colori: [
    { nome: 'Bianco', hex: '#F2F0EA' },
    { nome: 'Azzurro di Provenza', hex: '#9DB4C6' },
    { nome: 'Salvia di Sardegna', hex: '#A7AD95' },
    { nome: 'Acqua della Maddalena', hex: '#8ABAB4' },
    { nome: 'Pietra di Matera', hex: '#C9C0AF' },
    { nome: 'Tortora di Torino', hex: '#A99E93' },
    { nome: 'Origano di Sardegna', hex: '#6E7355' },
    { nome: 'More di rovo / Nero', hex: '#2A2A2C' },
  ],
  notaColori:
    'Otto tonalità tinte in massa. Su progetto contract sviluppiamo colori dedicati con campionatura preventiva.',
  dimensioni: [
    { etichetta: 'Lunghezza', valore: '157 cm' },
    { etichetta: 'Larghezza', valore: '70 cm' },
    { etichetta: 'Altezza', valore: '51,5 cm' },
    { etichetta: 'Peso', valore: '13 kg' },
  ],
  pulsante: 'Richiedi scheda e campionatura',
  specifiche: [
    { etichetta: 'Materiale', valore: 'LLDPE tinto in massa, stampaggio rotazionale' },
    { etichetta: 'Resistenza', valore: 'Da −35 °C a +80 °C, protezione UV, alta resistenza agli urti' },
    { etichetta: 'Impiego', valore: 'Indoor e outdoor, in acqua fino a 15 cm (20 cm con Riser)' },
    { etichetta: 'Sostenibilità', valore: 'Riciclabile al 100%, produzione su commessa in 10 giorni lavorativi' },
  ],
  disegno: {
    titolo: 'Disegno\ne proporzioni',
    testo: "Ingombri e scala d'uso del set da due elementi, impilabili per lo stoccaggio a fine stagione.",
    immagine: await m(
      `${S}/files/Aqua_scaling_c2c63d90-a092-46fd-a18d-9b206df56f03.jpg?v=1771517189&width=1800`,
      'Disegno quotato del lettino Aqua',
    ),
  },
  ambiente: {
    titolo: 'In ambiente',
    testo: "Dentro e fuori dall'acqua, in coppia o in fila: la stessa seduta cambia ruolo con la posa.",
    immagineGrande: await m(`${S}/files/aqua-11-1.jpg?v=1771512678&width=2400`, 'Aqua Lounger a bordo piscina'),
    immagini: [
      { immagine: await m(`${S}/products/Aqualoungersquare2.jpg?v=1771512682&width=1400`, "Aqua Lounger, vista d'insieme") },
      { immagine: await m(`${S}/files/aqua-2-11-1.jpg?v=1771512689&width=1400`, 'Aqua Lounger, coppia in acqua') },
      {
        immagine: await m(
          `${S}/files/5_1ac0408a-c2a0-47c6-a769-83f17375c224.jpg?v=1771512672&width=1400`,
          'Cuscino per Aqua Lounger',
        ),
      },
    ].filter((i) => i.immagine),
  },
  firmaProgetto: {
    kicker: 'La firma del progetto',
    testi: [
      {
        testo:
          "Francese nato in Austria, formato all'ENSAD di Parigi con una tesi sulle materie plastiche: da allora la sua ricerca vive sulle contaminazioni fra materiali e tecnologie. Negli anni Settanta mette a punto il primo scarpone da sci termoplastico interamente riciclabile; oggi il suo segno attraversa illuminazione, sport e arredo d'esterno.",
      },
      {
        testo:
          "Per Serralunga disegna l'Aqua Lounger portando nel mondo della piscina la logica dello stampaggio rotazionale: un guscio unico, nessun assemblaggio, il comfort ottenuto dalla sola geometria.",
      },
    ],
  },
  caseHistory,
  caseSegnaposto: [
    {
      etichetta: 'Hôtellerie · da definire',
      titolo: "Solarium d'albergo: venti lettini in acqua",
      immagine: await m(`${S}/files/aqua-11-1.jpg?v=1771512678&width=2400`, 'Aqua Lounger a bordo piscina'),
      nota: 'progetto e foto da fornire',
    },
    {
      etichetta: 'Spa · da definire',
      titolo: "Area relax indoor: Aqua fuori dall'acqua",
      immagine: await m(
        `${S}/products/AQUALOUNGER-OLIVIATABLE-DOLCEVITALOUNGECHAIR.jpg?v=1771512680&width=1800`,
        'Aqua Lounger con tavolo Olivia e poltrona Dolce Vita',
      ),
      nota: 'progetto e foto da fornire',
    },
  ],
  correlatiTesto: "Elementi della stessa famiglia Aqua e complementi che completano l'area piscina.",
  correlati: [
    {
      nome: 'Cuscino Aqua',
      sottotitolo: 'Complemento · tessuto outdoor',
      immagine: await m(
        `${S}/files/5_1ac0408a-c2a0-47c6-a769-83f17375c224.jpg?v=1771512672&width=1400`,
        'Cuscino per Aqua Lounger',
      ),
    },
    {
      nome: 'Collezione Aqua',
      sottotitolo: 'Famiglia · Marc Sadler',
      immagine: await m(
        `${S}/files/AquafamilyFioredilottoLifestyle2square2.jpg?v=1771515674&width=1400`,
        'Fiore di Loto a bordo piscina',
      ),
    },
    {
      nome: 'Fiore di Loto',
      sottotitolo: 'Illuminazione · Marta Sansoni',
      immagine: await m(`${S}/files/Fioredilotowhite.jpg?v=1771515630&width=1400`, 'Fiore di Loto'),
    },
    {
      nome: 'Riviera',
      sottotitolo: 'Divani · modulare outdoor',
      immagine: await m(`${S}/files/RIVIERA.png?v=1760515750&width=1600`, 'Divano Riviera'),
    },
  ],
  richiesta: {
    kicker: 'Documentazione contract',
    titolo: 'Scheda tecnica,\ndisegni e campioni',
    testo:
      'Inviamo scheda tecnica in PDF, file CAD e cartella colori fisica per progetti alberghieri, di ristorazione e residenziali.',
    immagine: await m(`${S}/products/Aquasunloungersquare1.jpg?v=1771512693&width=1800`, 'Aqua Lounger'),
  },
  seo: {
    titolo: 'Aqua Lounger, lettino per piscina | Serralunga',
    descrizione:
      "Aqua Lounger di Marc Sadler: lettino in polietilene tinto in massa da usare a bordo piscina o in acqua fino a 15 cm. Dimensioni, colori e scheda tecnica contract.",
  },
})

/** Prodotti presenti solo come card in home (scheda "In arrivo"). */
export const prodottiCard = async (m: Media, designer: Record<string, number>) => [
  {
    nome: 'Big-Bo',
    slug: 'big-bo',
    ordine: 2,
    schedaPubblicata: false,
    famiglia: 'vasi',
    designer: designer['luisa-bocchietto'],
    immagine: await m(`${S}/products/Big_Bo_Planter_BIGBO-WH.jpg?v=1771514300&width=1400`, 'Vaso Big-Bo'),
    etichettaCard: 'Vasi — Luisa Bocchietto',
  },
  {
    nome: 'Fiore di Loto',
    slug: 'fiore-di-loto',
    ordine: 3,
    schedaPubblicata: false,
    famiglia: 'illuminazione',
    designer: designer['marta-sansoni'],
    immagine: await m(`${S}/files/Fioredilotowhite.jpg?v=1771515630&width=1400`, 'Fiore di Loto'),
    etichettaCard: 'Illuminazione — Marta Sansoni',
  },
  {
    nome: 'Riviera',
    slug: 'riviera',
    ordine: 4,
    schedaPubblicata: false,
    famiglia: 'arredo',
    immagine: await m(`${S}/files/RIVIERA.png?v=1760515750&width=1600`, 'Divano Riviera'),
    etichettaCard: 'Divani — modulare',
  },
  {
    nome: 'Vas-Two',
    slug: 'vas-two',
    ordine: 5,
    schedaPubblicata: false,
    famiglia: 'vasi',
    designer: designer['luisa-bocchietto'],
    immagine: await m(`${S}/products/vastwo-copertina_hi_1.jpg?v=1771514311&width=1400`, 'Vas-Two, dettaglio di forma'),
    etichettaCard: 'Vasi — Vas-One Family',
  },
  {
    nome: 'Tradizione Italiana',
    slug: 'tradizione-italiana',
    ordine: 6,
    schedaPubblicata: false,
    famiglia: 'vasi',
    immagine: await m(`${S}/files/the_vases-_The_Vases_3.jpg?v=1727867232&width=1600`, 'Vasi della tradizione italiana'),
    etichettaCard: 'Vasi — Decorati',
  },
]
