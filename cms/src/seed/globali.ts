/** Contenuti di home, pagina designer e impostazioni copiati dai template e da file-md/cliente.md. */
type Media = (sorgente: string, alt: string) => Promise<number | null>

const S = 'https://serralunga.com/cdn/shop'

/**
 * Navigazione (Version: 2.03, alberatura del 2026-11-16): menu superiore di servizio e menu
 * inferiore principale, entrambi allineati a destra; footer con tre colonne.
 */
/** Profili social ufficiali forniti dal cliente (2026-11-17). Gli altri si aggiungono dal pannello. */
export const SOCIAL = [
  { rete: 'instagram', indirizzo: 'https://www.instagram.com/serralunga.official/', attivo: true },
  { rete: 'facebook', indirizzo: 'https://www.facebook.com/SerralungaOfficial', attivo: true },
]

export const MENU_SUPERIORE = [
  { etichetta: 'Contatti', link: '/contatti/' },
  { etichetta: 'Richiedi catalogo', link: '/contract/cataloghi/' },
  { etichetta: 'Listino', link: '/listino/' },
  { etichetta: 'Account', link: '/contract/area-riservata/' },
  { etichetta: 'Faq', link: '/faq/' },
]

export const MENU = [
  {
    etichetta: 'Progetti',
    link: '/installazioni/',
    voci: [
      { etichetta: 'Installazioni', link: '/installazioni/' },
      { etichetta: 'Spunti e idee', link: '/spunti-e-idee/' },
    ],
  },
  {
    etichetta: 'Materiali',
    link: '/materiali/',
    voci: [
      { etichetta: 'Polietilene e Clean Fighter', link: '/materiali/polietilene/' },
      { etichetta: 'Moleskin', link: '/materiali/moleskin/' },
      { etichetta: 'Corten', link: '/materiali/corten/' },
      { etichetta: 'Colori', link: '/materiali/colori/' },
      { etichetta: 'Sostenibilità', link: '/materiali/sostenibilita/' },
    ],
  },
  {
    etichetta: 'Catalogo',
    link: '/catalogo/',
    voci: [
      { etichetta: 'Vasi e fioriere', link: '/catalogo/vasi/' },
      { etichetta: 'Sedute', link: '/catalogo/sedute/' },
      { etichetta: 'Tavoli', link: '/catalogo/tavoli/' },
      { etichetta: 'Pool & lettini', link: '/catalogo/pool/' },
      { etichetta: 'Illuminazione', link: '/catalogo/illuminazione/' },
      { etichetta: 'Accessori', link: '/catalogo/accessori/' },
    ],
  },
  { etichetta: 'Designer', link: '/designer/' },
  {
    etichetta: 'Heritage',
    link: '/heritage/',
    voci: [
      { etichetta: 'La nostra storia', link: '/heritage/la-nostra-storia/' },
      { etichetta: 'Living different', link: '/heritage/living-different/' },
      { etichetta: 'Produzione', link: '/heritage/produzione/' },
      { etichetta: 'I colori', link: '/heritage/i-colori/' },
    ],
  },
  {
    etichetta: 'Contract',
    link: '/contract/',
    voci: [
      { etichetta: 'Hospitality', link: '/contract/hospitality/' },
      { etichetta: 'Residenziale', link: '/contract/residenziale/' },
      { etichetta: 'Urbano', link: '/contract/urbano/' },
      { etichetta: 'Su misura', link: '/contract/su-misura/' },
      { etichetta: 'Cataloghi', link: '/contract/cataloghi/' },
      { etichetta: 'Area riservata', link: '/contract/area-riservata/' },
    ],
  },
]

export const COLONNE = [
  {
    titolo: 'Catalogo',
    link: [
      { etichetta: 'Vasi e fioriere', link: '/catalogo/vasi/' },
      { etichetta: 'Sedute', link: '/catalogo/sedute/' },
      { etichetta: 'Tavoli', link: '/catalogo/tavoli/' },
      { etichetta: 'Pool & lettini', link: '/catalogo/pool/' },
      { etichetta: 'Illuminazione', link: '/catalogo/illuminazione/' },
      { etichetta: 'Accessori', link: '/catalogo/accessori/' },
    ],
  },
  {
    titolo: 'Professionisti',
    link: [
      { etichetta: 'Contract', link: '/contract/' },
      { etichetta: 'Progetti', link: '/installazioni/' },
      { etichetta: 'Spunti e idee', link: '/spunti-e-idee/' },
      { etichetta: 'Listino riservato', link: '/listino/' },
      { etichetta: 'Cataloghi', link: '/contract/cataloghi/' },
      { etichetta: 'Area riservata', link: '/contract/area-riservata/' },
    ],
  },
  {
    titolo: 'Serralunga',
    link: [
      { etichetta: 'Heritage', link: '/heritage/' },
      { etichetta: 'Designer', link: '/designer/' },
      { etichetta: 'Materiali', link: '/materiali/' },
      { etichetta: 'Journal', link: '/journal/' },
      { etichetta: 'Contatti', link: '/contatti/' },
      { etichetta: 'Faq', link: '/faq/' },
    ],
  },
]

/** Pagine di servizio (collezione "pagine"): si creano solo se mancano. La FAQ resta in bozza finché non ha domande. */
export const PAGINE = [
  {
    titolo: 'Contatti',
    slug: 'contatti',
    kicker: 'Serralunga, Biella dal 1825',
    intro: 'Per informazioni su prodotti, materiali, colori e documentazione tecnica, o per parlarci di un progetto, scriveteci o chiamateci: vi risponde l’ufficio contract.',
    modulo: { mostra: true, titolo: 'Raccontateci il vostro progetto', pulsante: 'Invia la richiesta', grazie: 'Grazie: il nostro ufficio contract vi ricontatterà a breve.' },
    mostraContatti: true,
    seo: {
      titolo: 'Contatti | Serralunga Contract',
      descrizione: 'Contatti Serralunga, Biella: l’ufficio contract risponde ad architetti, interior designer e strutture dell’ospitalità su prodotti, colori, campioni e documentazione.',
    },
    _status: 'published',
  },
  {
    titolo: 'Listino riservato',
    slug: 'listino',
    kicker: 'Contract e rivenditori',
    intro: 'Per architetti, interior designer, strutture dell’ospitalità e rivenditori: indicateci il progetto e vi inviamo catalogo, cartella colori e schede tecniche.',
    modulo: { mostra: true, titolo: 'Richiedi il listino', pulsante: 'Richiedi il listino', grazie: 'Grazie: vi invieremo catalogo, cartella colori e schede tecniche.' },
    mostraContatti: false,
    seo: {
      titolo: 'Listino riservato B2B | Serralunga Contract',
      descrizione: 'Listino Serralunga riservato a hotel, ristoranti, studi di architettura e rivenditori: richiedete catalogo, cartella colori e condizioni dedicate.',
    },
    _status: 'published',
  },
  {
    titolo: 'Domande frequenti',
    slug: 'faq',
    seo: { titolo: 'Domande frequenti | Serralunga' },
    _status: 'draft',
  },
]

export const impostazioniDati = async (m: Media) => ({
  logo: await m(`${S}/files/Serralunga_logo_200_2.png?v=1750251076&width=500`, 'Serralunga'),
  nomeSito: 'Serralunga',
  accento: '#A08A5F',
  rivelaAlloScorrimento: true,
  mostraDidascalie: true,
  barra: {
    testo: 'Arredi, vasi e luci di design — prodotti a Biella dal 1825',
    linkEtichetta: 'Richiedi il catalogo',
    link: '/#listino',
  },
  menuSuperiore: MENU_SUPERIORE,
  menu: MENU,
  social: SOCIAL,
  descrizione:
    'Arredi, vasi e luci di design per interni ed esterni, prodotti a Biella dal 1825 per progetti di hôtellerie, residenziali e contract.',
  colonne: COLONNE,
  copyright: '© {anno} Serralunga — 1825 S.R.L.',
  // Pagine legali create da seed/legali.ts (CMP 1.00); «Termini» resta senza pagina finché il cliente non la fornisce.
  legali: [{ etichetta: 'Privacy Policy', link: '/privacy-policy/' }, { etichetta: 'Cookie Policy', link: '/cookie-policy/' }, { etichetta: 'Termini' }],
  azienda: {
    ragioneSociale: '1825 S.R.L.',
    marchio: 'Serralunga',
    indirizzo: 'Via Serralunga 9',
    cap: '13900',
    citta: 'Biella',
    provincia: 'BI',
    paese: 'Italia',
    telefono: '+39 015 2435711',
    email: 'info@serralunga.com',
    piva: '02711740023',
    rea: 'BI-207657',
    fondazione: '1825',
    sitoUfficiale: 'https://www.serralunga.com',
  },
})

export const homeDati = async (m: Media) => ({
  hero: {
    immagine: await m(`${S}/files/summer_serralunga.webp?v=1782985471&width=2400`, 'Arredi Serralunga in un giardino al sole'),
    notaVideo: false,
    kicker: 'Serralunga — Biella, dal 1825',
    titolo: 'Design italiano\nper gli spazi _aperti_',
    testo:
      'Vasi, sedute, tavoli e luci in polietilene, disegnati da architetti e designer e prodotti a Biella. Per progetti di hôtellerie, ristorazione, residenze e spazi pubblici.',
    link1Etichetta: 'Le collezioni',
    link1: '#collezioni',
    link2Etichetta: 'Richiedi il catalogo',
    link2: '#listino',
  },
  progetti: [
    {
      titolo: 'Hôtellerie',
      testo: 'Terrazze, roof e aree piscina: fioriere, sedute e luci in polietilene tinto in massa, che restano all’aperto tutto l’anno e resistono a sole, salsedine e gelo.',
      link: '#contract',
    },
    {
      titolo: 'Ristorazione',
      testo: 'Dehors e sale: sedute, tavoli e fioriere per organizzare gli spazi, in colori e finiture coordinati con l’identità del locale.',
      link: '#contract',
    },
    {
      titolo: 'Residenze',
      testo: "Pezzi firmati, finiture laccate o Moleskin e vasi della tradizione italiana per ville, giardini e terrazze.",
      link: '#contract',
    },
  ],
  chiSiamo: {
    sfondo: '1825',
    immagine: await m(`${S}/files/storia_5e3ef214-3e06-4c94-ad73-ac8b8d312ce6.jpg?v=1667499580&width=1200`, 'La manifattura Serralunga'),
    kicker: 'Chi siamo',
    titolo: "Ricerca sui materiali\ndal 1825",
    testo:
      'Serralunga nasce a Biella nel 1825 ed è stata la prima azienda in Europa a sviluppare lo stampaggio rotazionale. Nello stabilimento di Biella produce arredi e vasi in polietilene lineare (LLDPE) tinto in massa e riciclabile al 100%, stabili da −35 °C a +80 °C e resistenti a raggi UV, urti e salsedine.',
    punti: [
      { testo: 'Prodotto a Biella' },
      { testo: 'Materiale riciclabile al 100%' },
      { testo: '38 colori in cartella' },
      { testo: 'Finiture laccate, Moleskin e Corten' },
    ],
    pulsante: 'Serralunga Contract',
    link: '#contract',
  },
  numeri: [
    { valore: '200', etichetta: 'Anni di storia industriale' },
    { valore: '38', etichetta: 'Colori in cartella' },
    { valore: '100%', etichetta: 'Polietilene riciclabile' },
    { valore: '−35/+80 °C', etichetta: 'Intervallo di utilizzo' },
  ],
  installazioni: {
    sfondo: 'INSTALLAZIONI',
    testoSinistra:
      "Terrazze d’albergo, dehors, aree piscina e giardini privati: ambientazioni con vasi, sedute e luci Serralunga.",
    testoDestra:
      "Una selezione per tipo di spazio: hotel, ristorazione, spa e residenze.",
    voci: [
      {
        immagine: await m(`${S}/products/bigbo-pag170_hi.jpg?v=1771514306&width=1400`, 'Big-Bo in ambientazione alberghiera'),
        titolo: 'Corte d’ingresso',
        sottotitolo: 'Big-Bo, Luisa Bocchietto',
        categoria: 'hotel',
        formato: 'alta',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/products/Vastwo-AtmosferaandBig-Bolifestyle1.jpg?v=1771514307&width=1400`, 'Atmosfera e Big-Bo su rooftop'),
        titolo: 'Rooftop bar',
        sottotitolo: 'Atmosfera e Vas-One Family',
        categoria: 'risto',
        formato: 'bassa',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/files/Fioredilotostilllife2.jpg?v=1771515672&width=1200`, 'Fiore di Loto galleggiante'),
        titolo: 'Vasca esterna, spa',
        sottotitolo: 'Fiore di Loto, Marta Sansoni',
        categoria: 'spa',
        formato: 'bassa',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/files/RIVIERA.png?v=1760515750&width=1600`, 'Divano Riviera'),
        titolo: 'Lounge esterna',
        sottotitolo: 'Divano Riviera',
        categoria: 'hotel',
        formato: 'media',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/files/AquafamilyFioredilottoLifestyle2square2.jpg?v=1771515674&width=1200`, 'Collezione Aqua a bordo piscina'),
        titolo: 'Bordo piscina',
        sottotitolo: 'Collezione Aqua, Marc Sadler',
        categoria: 'spa',
        formato: 'media',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/products/vastwo-pag168_hi.jpg?v=1771514310&width=1400`, 'Vas-Two in giardino privato'),
        titolo: 'Giardino privato',
        sottotitolo: 'Vas-Two',
        categoria: 'resid',
        formato: 'media',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/files/the_vases-_The_Vases_3.jpg?v=1727867232&width=1600`, 'Vasi della tradizione italiana'),
        titolo: 'Loggiato di una dimora storica',
        sottotitolo: 'Decorati, Festonato, Orcio',
        categoria: 'resid',
        formato: 'larga',
        link: '#progetti',
      },
    ],
    pulsante: 'Vedi tutte le installazioni',
    link: '#listino',
  },
  collezioni: {
    titolo: 'Le collezioni',
    testo:
      "Vasi, arredi, illuminazione e accessori: forme disegnate da architetti e designer, in polietilene tinto in massa per interni ed esterni.",
    tessere: [
      {
        etichetta: 'Vasi',
        scritta: 'chiara',
        immagine: await m(`${S}/collections/cce7fa6d7ecfc83a8378e2587c3fd0dc.webp?v=1771580637&width=1200`, 'Vasi'),
        link: '#collezioni',
      },
      { etichetta: 'Arredo', scritta: 'scura', immagine: await m(`${S}/files/RIVIERA.png?v=1760515750&width=1600`, 'Arredo'), link: '#collezioni' },
      {
        etichetta: 'Illuminazione',
        scritta: 'scura',
        immagine: await m(`${S}/files/Fioredilotowhite.jpg?v=1771515630&width=1200`, 'Illuminazione'),
        link: '#collezioni',
      },
      {
        etichetta: 'Accessori',
        scritta: 'scura',
        immagine: await m(`${S}/files/Fioredilotogreen.jpg?v=1771515669&width=1200`, 'Accessori'),
        link: '#collezioni',
      },
    ],
  },
  contract: {
    immagine: await m(`${S}/files/ResidentialContractFurniture.jpg?v=1663588678&width=1600`, 'Serralunga Contract'),
    kicker: 'Serralunga Contract',
    titolo: 'Al servizio\ndel progetto',
    servizi: [
      { titolo: 'Supporto alla progettazione', testo: 'Schede tecniche, disegni quotati e campioni colore per la scelta dei pezzi e la stesura del capitolato.' },
      {
        titolo: 'Colori e finiture su misura',
        testo: "38 colori in cartella, laccati lucidi e metallizzati, finiture Moleskin e Corten. Per i progetti contract si valutano colori dedicati.",
      },
      {
        titolo: 'Produzione a Biella',
        testo: 'Stampaggio rotazionale nello stabilimento di Biella: la maggior parte dei prodotti si realizza su richiesta, nel colore scelto.',
      },
      // Nel template il testo è un segnaposto ("bla bla"): da scrivere nel pannello.
      { titolo: 'Lavoro conto terzi', testo: '' },
    ],
  },
  catalogo: {
    immagine: await m(`${S}/files/Serralunga_catalog_front.jpg?v=1750701072&width=1312`, 'Catalogo Serralunga'),
    kicker: 'Cataloghi e documentazione',
    titolo: 'Richiedi il catalogo\ne la cartella colori',
    testo:
      'Per architetti, interior designer, strutture dell’ospitalità e rivenditori: indicateci il progetto e vi inviamo catalogo, cartella colori e schede tecniche.',
    pulsante: 'Richiedi il catalogo',
    grazie: 'Grazie: vi invieremo catalogo, cartella colori e schede tecniche.',
  },
  seo: {
    titolo: 'Serralunga: arredi, vasi e luci di design dal 1825',
    descrizione:
      'Vasi, sedute, tavoli e luci in polietilene firmati da architetti e designer, prodotti a Biella dal 1825 per hôtellerie, ristorazione, residenze e spazi pubblici.',
  },
})

export const paginaDesignerDati = async () => ({
  kicker: 'Le firme',
  titolo: 'I designer\nSerralunga',
  testo:
    "Architetti e designer italiani e internazionali che dagli anni Novanta disegnano per Serralunga. Ogni pezzo a catalogo porta il nome di chi lo ha progettato: forma, proporzioni e uso nascono da un progetto d’autore.",
  segnaposto: 0,
  cta: {
    kicker: 'Progetti su misura',
    titolo: 'Colori e finiture\nper il vostro progetto',
    testo: 'Per i progetti contract valutiamo colori, finiture e varianti dedicate: scriveteci prodotti, quantità e contesto.',
    pulsante: 'Parliamo del progetto',
    link: '/#listino',
  },
  seo: {
    titolo: 'I designer Serralunga',
    descrizione:
      "Marc Sadler, Luisa Bocchietto, Marta Sansoni: i designer e gli architetti che firmano vasi, arredi e luci Serralunga per l'ospitalità e il contract.",
  },
})

/** Pagina Installazioni: i testi presentano gli ambiti, le case history arrivano dalla collezione. */
export const paginaInstallazioniDati = async () => ({
  kicker: 'Installazioni',
  titolo: 'Dove i nostri pezzi\nsono già di casa',
  testo:
    'Hotel, ristoranti, spa e residenze: gli ambiti in cui lavoriamo con architetti e committenti. Ogni sezione raccoglie le installazioni e le case history che la raccontano.',
  sezioni: [
    {
      categoria: 'hotel',
      kicker: 'Hôtellerie',
      titolo: 'Hotel e resort',
      testo:
        "Ingressi, corti, terrazze e bordi piscina: fioriere di grande formato, sedute e luci che restano all'aperto tutto l'anno, coordinate nei colori e nelle finiture del progetto.",
    },
    {
      categoria: 'risto',
      kicker: 'Ristorazione',
      titolo: 'Ristoranti e dehors',
      testo:
        'Sedute, tavoli e illuminazione per sale e dehors: arredi in polietilene tinto in massa, pensati per un uso quotidiano e intenso.',
    },
    {
      categoria: 'spa',
      kicker: 'Spa & Piscine',
      titolo: 'Spa, piscine e wellness',
      testo:
        "Lettini, sedute e oggetti luminosi per l'acqua e il bordo vasca, in materiali che non temono umidità, sole e sbalzi di temperatura.",
    },
    {
      categoria: 'resid',
      kicker: 'Residenze',
      titolo: 'Residenze e giardini privati',
      testo:
        'Vasi della tradizione italiana e pezzi di design per giardini, terrazze e interni, scelti insieme a paesaggisti e interior designer.',
    },
  ],
  notaVuota: 'Case history in preparazione.',
  cta: {
    kicker: 'Progetti su misura',
    titolo: 'Raccontateci\nil vostro progetto',
    testo: 'Dimensioni, colori e finiture dedicate, con il supporto del nostro ufficio contract.',
    pulsante: 'Parliamo del progetto',
    link: '/#listino',
  },
  seo: {
    titolo: 'Installazioni e case history | Serralunga Contract',
    descrizione:
      'Le installazioni Serralunga per hotel, ristoranti, spa e residenze: gli ambiti di lavoro e le case history dei progetti realizzati.',
  },
})

/** Pagina Spunti e idee: gli spunti si pubblicano dal pannello (collezione "Spunti e idee"). */
export const paginaSpuntiDati = async () => ({
  kicker: 'Spunti e idee',
  titolo: 'Idee per usare\ni nostri pezzi',
  testo:
    'Esempi di cosa si può fare con i prodotti Serralunga: accostamenti, ambienti e soluzioni da cui partire per il vostro progetto.',
  notaVuota: 'I primi spunti sono in preparazione.',
  cta: {
    kicker: 'Progetti su misura',
    titolo: 'Avete in mente\nuno spazio preciso?',
    testo: 'Partiamo dal luogo e costruiamo insieme la selezione di pezzi, colori e finiture.',
    pulsante: 'Parliamo del progetto',
    link: '/#listino',
  },
  seo: {
    titolo: 'Spunti e idee | Serralunga',
    descrizione:
      'Spunti e idee per arredare terrazze, giardini, dehors e bordi piscina con vasi, sedute e luci Serralunga.',
  },
})
