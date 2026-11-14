/** Contenuti di home, pagina designer e impostazioni copiati dai template e da file-md/cliente.md. */
type Media = (sorgente: string, alt: string) => Promise<number | null>

const S = 'https://serralunga.com/cdn/shop'

export const impostazioniDati = async (m: Media) => ({
  logo: await m(`${S}/files/Serralunga_logo_200_2.png?v=1750251076&width=500`, 'Serralunga'),
  nomeSito: 'Serralunga',
  accento: '#A08A5F',
  rivelaAlloScorrimento: true,
  mostraDidascalie: true,
  barra: {
    testo: 'Contract & Hospitality — Made in Italy dal 1825',
    linkEtichetta: 'Area riservata rivenditori',
    link: '/#listino',
  },
  menu: [
    { etichetta: 'Progetti', link: '/#progetti' },
    { etichetta: 'Installazioni', link: '/#collezioni' },
    { etichetta: 'Contract', link: '/#contract' },
    { etichetta: 'Materiali', link: '/#materiali' },
    { etichetta: 'Designer', link: '/designer/' },
    { etichetta: 'Listino B2B', link: '/#listino' },
    { etichetta: 'Richiedi il catalogo', link: '/#listino', evidenza: true },
  ],
  descrizione:
    'Mobili, illuminazione, fioriere e oggetti di design 100% made in Italy per interni ed esterni, hospitality e contract.',
  colonne: [
    {
      titolo: 'Prodotti',
      link: [
        { etichetta: 'Vasi e fioriere', link: '/#collezioni' },
        { etichetta: 'Arredo', link: '/#collezioni' },
        { etichetta: 'Illuminazione', link: '/#collezioni' },
        { etichetta: 'Accessori', link: '/#collezioni' },
        { etichetta: 'Cartella colori', link: '/#collezioni' },
      ],
    },
    {
      titolo: 'Professionisti',
      link: [
        { etichetta: 'Serralunga Contract', link: '/#contract' },
        { etichetta: 'I designer', link: '/designer/' },
        { etichetta: 'Listino riservato', link: '/#listino' },
        { etichetta: 'Condizioni di vendita', link: '/#listino' },
      ],
    },
  ],
  copyright: '© {anno} Serralunga — 1825 S.R.L.',
  // Le pagine legali non esistono ancora: voci senza link finché non vengono create.
  legali: [{ etichetta: 'Privacy' }, { etichetta: 'Cookie' }, { etichetta: 'Termini' }],
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
    kicker: 'Living outdoor — Contract & Hospitality',
    titolo: 'Il design\nprende il sole',
    testo:
      'Arredi outdoor su misura per hôtellerie, ristorazione e dimore di prestigio. Fioriere, sedute e illuminazione 100% made in Italy, dal 1825.',
    link1Etichetta: 'Vedi la collezione',
    link1: '#collezioni',
    link2Etichetta: 'Richiedi il catalogo',
    link2: '#listino',
  },
  progetti: [
    {
      titolo: 'Hôtellerie',
      testo: 'Terrazze, roof e aree piscina: fioriere e sedute in LLDPE colorate su cartella, resistenti a sole, salsedine e gelo.',
      link: '#contract',
    },
    {
      titolo: 'Ristorazione',
      testo: 'Dehors e separé vegetali: sistemi modulari per delimitare i coperti mantenendo leggerezza e identità del locale.',
      link: '#contract',
    },
    {
      titolo: 'Dimore di prestigio',
      testo: "Pezzi d'autore e finiture laccate o Moleskin, sviluppati con studi di architettura e interior designer.",
      link: '#contract',
    },
  ],
  chiSiamo: {
    sfondo: '1825',
    immagine: await m(`${S}/files/storia_5e3ef214-3e06-4c94-ad73-ac8b8d312ce6.jpg?v=1667499580&width=1200`, 'La manifattura Serralunga'),
    kicker: 'Chi siamo',
    titolo: "Una passione per la bellezza,\nuna passione per l'innovazione",
    testo:
      'Dal 1825 lo spirito di ricerca e la tradizione produttiva sono le fondamenta del marchio. Stampaggio rotazionale in LLDPE, tinto in massa e riciclabile al 100%: prodotti pensati per resistere da −35 °C a +80 °C, negli spazi più esposti e più esigenti.',
    punti: [
      { testo: '100% Made in Italy' },
      { testo: 'Materiale riciclabile al 100%' },
      { testo: 'Cartella colori dedicata' },
      { testo: 'Finitura Moleskin e laccature' },
    ],
    pulsante: 'Scopri Serralunga Contract',
    link: '#contract',
  },
  numeri: [
    { valore: '200', etichetta: 'Anni di manifattura' },
    { valore: '500+', etichetta: 'Referenze a catalogo' },
    { valore: '40', etichetta: 'Colori di cartella' },
    { valore: '60', etichetta: 'Paesi serviti' },
  ],
  installazioni: {
    sfondo: 'INSTALLAZIONI',
    testoSinistra:
      "Terrazze d'albergo, dehors, aree piscina e ville private: luoghi in cui il disegno italiano incontra la vita all'aperto.",
    testoDestra:
      "Una selezione di ambientazioni realizzate con studi di architettura e strutture ricettive in Italia e all'estero.",
    voci: [
      {
        immagine: await m(`${S}/products/bigbo-pag170_hi.jpg?v=1771514306&width=1400`, 'Big-Bo in ambientazione alberghiera'),
        titolo: 'Corte d’ingresso, hotel de charme',
        sottotitolo: 'Piemonte — Big-Bo, Luisa Bocchietto',
        categoria: 'hotel',
        formato: 'alta',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/products/Vastwo-AtmosferaandBig-Bolifestyle1.jpg?v=1771514307&width=1400`, 'Atmosfera e Big-Bo su rooftop'),
        titolo: 'Rooftop bar',
        sottotitolo: 'Milano — Atmosfera, Vas-One Family',
        categoria: 'risto',
        formato: 'bassa',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/files/Fioredilotostilllife2.jpg?v=1771515672&width=1200`, 'Fiore di Loto galleggiante'),
        titolo: 'Vasca esterna, spa',
        sottotitolo: 'Riviera Ligure — Fiore di Loto',
        categoria: 'spa',
        formato: 'bassa',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/files/RIVIERA.png?v=1760515750&width=1600`, 'Divano Riviera'),
        titolo: 'Lounge esterna',
        sottotitolo: 'Costa Smeralda — Divano Riviera',
        categoria: 'hotel',
        formato: 'media',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/files/AquafamilyFioredilottoLifestyle2square2.jpg?v=1771515674&width=1200`, 'Collezione Aqua a bordo piscina'),
        titolo: 'Bordo piscina',
        sottotitolo: 'Lago di Garda — Collezione Aqua',
        categoria: 'spa',
        formato: 'media',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/products/vastwo-pag168_hi.jpg?v=1771514310&width=1400`, 'Vas-Two in giardino privato'),
        titolo: 'Giardino privato',
        sottotitolo: 'Brianza — Vas-Two',
        categoria: 'resid',
        formato: 'media',
        link: '#progetti',
      },
      {
        immagine: await m(`${S}/files/the_vases-_The_Vases_3.jpg?v=1727867232&width=1600`, 'Vasi della tradizione italiana'),
        titolo: 'Loggiato di una dimora storica',
        sottotitolo: 'Toscana — Decorati, Festonato, Orcio',
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
      "Quattro famiglie di prodotto, un'unica grammatica formale: forme scultoree, colore tinto in massa, resistenza da esterno.",
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
      { titolo: 'Consulenza progettuale', testo: 'Affiancamento a studi e general contractor dalla fase di concept al capitolato.' },
      {
        titolo: 'Colori e finiture su misura',
        testo: "Campionature fisiche, laccature, metallizzati e finitura Moleskin coordinati all'identità della struttura.",
      },
      {
        titolo: 'Grandi volumi e logistica',
        testo: 'Produzione su commessa, spedizioni pallettizzate e consegne programmate per fasi di cantiere.',
      },
      // Nel template il testo è un segnaposto ("bla bla"): da scrivere nel pannello.
      { titolo: 'Lavoro conto terzi', testo: '' },
    ],
  },
  catalogo: {
    immagine: await m(`${S}/files/Serralunga_catalog_front.jpg?v=1750701072&width=1312`, 'Catalogo Serralunga'),
    kicker: 'Catalogo & listino B2B',
    titolo: 'Richiedi il catalogo\ne le condizioni riservate',
    testo:
      'Riservato ad alberghi, ristoranti, studi di architettura e rivenditori. Riceverai catalogo, cartella colori e listino dedicato entro 24 ore lavorative.',
    pulsante: 'Richiesta catalogo',
    grazie: 'Grazie: riceverete catalogo, cartella colori e listino entro 24 ore lavorative.',
  },
  seo: {
    titolo: 'Serralunga Contract — arredi outdoor dal 1825',
    descrizione:
      'Arredi outdoor su misura per hôtellerie, ristorazione e dimore di prestigio: fioriere, sedute e illuminazione 100% made in Italy, dal 1825.',
  },
})

export const paginaDesignerDati = async () => ({
  kicker: 'Le firme',
  titolo: 'I designer\nSerralunga',
  testo:
    "Architetti e designer italiani e internazionali che dal secondo dopoguerra a oggi hanno dato forma alla nostra materia. Ogni pezzo a catalogo porta il nome di chi lo ha pensato: è la garanzia che dietro a un oggetto d'esterno ci sia un progetto, non un profilo di produzione.",
  segnaposto: 0,
  cta: {
    kicker: 'Progetti su misura',
    titolo: 'Un pezzo disegnato\nper il vostro luogo',
    testo: 'Per i progetti contract sviluppiamo con i nostri designer dimensioni, colori e finiture dedicate.',
    pulsante: 'Parliamo del progetto',
    link: '/#listino',
  },
  seo: {
    titolo: 'I designer Serralunga',
    descrizione:
      "Marc Sadler, Luisa Bocchietto, Marta Sansoni: i designer e gli architetti che firmano vasi, arredi e luci Serralunga per l'ospitalità e il contract.",
  },
})
