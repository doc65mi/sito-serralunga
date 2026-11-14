/** Contenuti di home, pagina designer e impostazioni copiati dai template e da file-md/cliente.md. */
type Media = (sorgente: string, alt: string) => Promise<number | null>

const S = 'https://serralunga.com/cdn/shop'

export const impostazioniDati = async (m: Media) => ({
  logo: await m(`${S}/files/Serralunga_logo_200_2.png?v=1750251076&width=500`, 'Serralunga'),
  nomeSito: 'Serralunga',
  accento: '#A08A5F',
  rivelaAlloScorrimento: true,
  mostraDidascalie: true,
  menu: [
    { etichetta: 'Il nostro sguardo', link: '/#manifesto' },
    { etichetta: 'I luoghi', link: '/#luoghi' },
    { etichetta: 'Case history', link: '/case-history/la-loge-du-massif/' },
    { etichetta: 'La materia', link: '/#materia' },
    { etichetta: 'I designer', link: '/designer/' },
    { etichetta: 'Collezioni', link: '/#collezioni' },
    { etichetta: 'Prodotti', link: '/#portfolio' },
    { etichetta: 'Contract', link: '/#invito' },
  ],
  descrizione: "Arredi, illuminazione e fioriere di design, 100% made in Italy, per l'ospitalità e il contract.",
  colonne: [
    {
      titolo: 'Racconto',
      link: [
        { etichetta: 'Il nostro sguardo', link: '/#manifesto' },
        { etichetta: 'I luoghi', link: '/#luoghi' },
        { etichetta: 'Case history', link: '/case-history/la-loge-du-massif/' },
        { etichetta: 'I designer', link: '/designer/' },
      ],
    },
    {
      titolo: 'Professionisti',
      link: [
        { etichetta: 'Prodotti', link: '/#portfolio' },
        { etichetta: 'Serralunga Contract', link: '/#invito' },
        { etichetta: 'Campionature', link: '/#invito' },
      ],
    },
  ],
  copyright: '© {anno} Serralunga — 1825 S.R.L.',
  legali: [
    { etichetta: 'Privacy', link: '/privacy/' },
    { etichetta: 'Cookie', link: '/cookie/' },
  ],
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

export const homeDati = async (
  m: Media,
  designer: Record<string, number>,
  prodotti: Record<string, number>,
) => {
  const fioreOrizzontale = await m(
    `${S}/files/Aqua_family_Fiore_di_lotto_Lifestyle_2_landscape_cea80197-cf2b-4040-bdd8-73a894da482e.jpg?width=2600`,
    "Fiore di Loto sull'acqua della piscina",
  )
  const atmosfera = await m(
    `${S}/products/Vastwo-AtmosferaandBig-Bolifestyle1.jpg?v=1771514307&width=2400`,
    'Atmosfera e Big-Bo su una terrazza serale',
  )
  const estate = await m(`${S}/files/summer_serralunga.webp?v=1782985471&width=2400`, 'Arredi Serralunga in giardino al sole')

  return {
    h1: "Serralunga — arredi di design per l'ospitalità dal 1825",
    tipoApertura: 'slide',
    slide: [
      {
        immagine: estate,
        kicker: 'Biella, Italia — dal 1825',
        titolo: 'Il tempo passa.\n_La bellezza_ resta.',
        testo: 'Duecento anni di manifattura italiana per i luoghi che ospitano le persone.',
        linkEtichetta: 'Il nostro sguardo',
        link: '#luoghi',
      },
      {
        immagine: fioreOrizzontale,
        kicker: 'Spa & piscine',
        titolo: 'Una luce\nche _galleggia_',
        testo: "Al tramonto la vasca smette di essere un impianto e diventa paesaggio.",
        linkEtichetta: 'Vedi il capitolo',
        link: '#luoghi',
      },
      {
        immagine: atmosfera,
        kicker: 'Hôtellerie',
        titolo: "L'accoglienza\ncomincia _fuori_",
        testo: "Volumi generosi che segnano l'arrivo e restituiscono scala all'architettura.",
        linkEtichetta: 'Vedi il capitolo',
        link: '#luoghi',
      },
    ],
    video: {
      poster: estate,
      kicker: 'Biella, Italia — dal 1825',
      titolo: 'Il tempo passa.\n_La bellezza_ resta.',
      testo:
        'Duecento anni di manifattura italiana al servizio dei luoghi che ospitano le persone: alberghi, tavole, giardini e dimore dove ogni dettaglio è chiamato a durare.',
      linkEtichetta: 'Il nostro sguardo',
      link: '#luoghi',
    },
    manifesto: {
      kicker: 'Il nostro sguardo',
      testo:
        "Non disegniamo oggetti da guardare: disegniamo _soglie, ombre e attese_. Un vaso all'ingresso di un albergo è la prima frase di un racconto che l'ospite ricorderà.",
    },
    luoghi: [
      {
        numero: 'I',
        kicker: 'Hôtellerie',
        titolo: "L'accoglienza\ncomincia fuori",
        testo:
          "Prima della hall c'è una corte, un viale, una terrazza. Volumi generosi — fino a due metri di diametro — segnano l'arrivo e restituiscono scala all'architettura, resistendo al sole, alla salsedine e al gelo senza perdere colore.",
        didascalia: 'Big-Bo — disegno di Luisa Bocchietto',
        immagine: await m(`${S}/products/bigbo-pag170_hi.jpg?v=1771514306&width=2000`, "Big-Bo nella corte di un albergo"),
      },
      {
        numero: 'II',
        kicker: 'Ristorazione',
        titolo: 'Il verde\ncome architettura',
        testo:
          'Dehors che diventano sale, tavoli protetti senza pareti. Le fioriere modulari disegnano percorsi e intimità, e la sera la luce diffusa dai vasi opalini sostituisce le candele.',
        didascalia: 'Atmosfera, Vas-One Family',
        immagine: atmosfera,
      },
    ],
    banner: {
      numero: 'III',
      kicker: 'Spa & piscine',
      titolo: 'Una luce che galleggia',
      testo:
        "Fiore di Loto nasce da un simbolo di rinascita e si posa sull'acqua senza peso: al tramonto la vasca smette di essere un impianto e diventa paesaggio.",
      immagine: fioreOrizzontale,
    },
    materia: {
      kicker: 'La materia',
      titolo: 'Fatto per\nrestare bello',
      testo:
        "Stampaggio rotazionale, polietilene tinto in massa, spessori pieni: il colore non è una vernice, è il corpo stesso dell'oggetto. Da −35 °C a +80 °C, riciclabile al 100%, con la stessa presenza dopo dieci stagioni all'aperto.",
      schede: [
        {
          immagine: await m(
            `${S}/files/storia_5e3ef214-3e06-4c94-ad73-ac8b8d312ce6.jpg?v=1667499580&width=1200`,
            'La manifattura di Biella',
          ),
          titolo: 'La mano di Biella',
          testo: "Dal cuoio all'attuale polimero: due secoli di lavorazioni nello stesso luogo.",
        },
        {
          immagine: await m(`${S}/files/Fioredilotostilllife2.jpg?v=1771515672&width=1400`, 'Dettaglio luminoso del Fiore di Loto'),
          titolo: 'Il colore, in profondità',
          testo: 'Quaranta tonalità di cartella, laccature e la finitura Moleskin da accarezzare.',
        },
        {
          immagine: await m(`${S}/products/vastwo-copertina_hi_1.jpg?v=1771514311&width=1400`, 'Vas-Two, dettaglio di forma'),
          titolo: "Forme d'autore",
          testo: 'Progetti firmati da designer e architetti italiani, in produzione da decenni.',
        },
      ],
      numeri: [
        { valore: '200', etichetta: 'Anni di manifattura' },
        { valore: '500+', etichetta: 'Progetti a catalogo' },
        { valore: '40', etichetta: 'Colori di cartella' },
        { valore: '60', etichetta: 'Paesi nel mondo' },
      ],
    },
    designer: {
      kicker: 'Le firme',
      titolo: 'I designer\nche ci hanno dato forma',
      testo:
        'Architetti e designer italiani che da decenni interpretano la materia Serralunga: ogni pezzo porta il nome di chi lo ha pensato.',
      elenco: [designer['luisa-bocchietto'], designer['marta-sansoni']],
      segnaposto: 3,
    },
    collezioni: {
      titolo: 'Quattro famiglie,\nuna sola grammatica',
      testo: 'Vasi, arredo, illuminazione e oggetti: pezzi che convivono nello stesso spazio senza mai alzare la voce.',
      tessere: [
        {
          etichetta: 'Vasi',
          immagine: await m(`${S}/collections/cce7fa6d7ecfc83a8378e2587c3fd0dc.webp?v=1771580637&width=1400`, 'Vasi e fioriere'),
          link: '#invito',
        },
        {
          etichetta: 'Arredo',
          immagine: await m(`${S}/files/RIVIERA.png?v=1760515750&width=1600`, 'Divano Riviera'),
          link: '#invito',
        },
        {
          etichetta: 'Illuminazione',
          immagine: await m(
            `${S}/files/AquafamilyFioredilottoLifestyle2square2.jpg?v=1771515674&width=1400`,
            'Fiore di Loto a bordo piscina',
          ),
          link: '#invito',
        },
        {
          etichetta: 'Tradizione',
          immagine: await m(`${S}/files/the_vases-_The_Vases_3.jpg?v=1727867232&width=1600`, 'Vasi della tradizione italiana'),
          link: '#invito',
        },
      ],
    },
    portfolio: {
      kicker: 'Portfolio prodotti',
      titolo: 'Pezzi da specificare\na capitolato',
      testo:
        'Ogni prodotto ha la sua scheda tecnica: dimensioni, materiali, cartella colori, disegni quotati e documentazione per il progetto.',
      prodotti: ['aqua-lounger', 'big-bo', 'fiore-di-loto', 'riviera', 'vas-two', 'tradizione-italiana']
        .map((s) => prodotti[s])
        .filter(Boolean),
    },
    citazione: {
      testo:
        "«Chiediamo a un oggetto d'esterno la stessa cura che chiederemmo a un mobile di casa: è lì che si misura la qualità di un luogo.»",
      firma: 'Serralunga Contract',
      immagine: await m(`${S}/products/vastwo-pag168_hi.jpg?v=1771514310&width=1600`, 'Vas-Two in un giardino privato'),
    },
    invito: {
      kicker: 'Un invito',
      titolo: 'Raccontateci\nil vostro luogo',
      testo:
        'Lavoriamo al fianco di studi di architettura, general contractor e strutture ricettive: sopralluogo del progetto, campionature fisiche, colori e dimensioni dedicate. Vi inviamo il volume Serralunga e la cartella colori.',
      pulsante: 'Richiedi il volume',
      grazie: 'Grazie: vi ricontatteremo a breve con il volume Serralunga e la cartella colori.',
      immagine: await m(
        `${S}/files/ResidentialContractFurniture.jpg?v=1663588678&width=2400`,
        'Ambientazione contract Serralunga',
      ),
    },
    seo: {
      titolo: 'Serralunga Contract, arredi outdoor dal 1825',
      descrizione:
        "Vasi, arredi e luci di design made in Italy per hotel, ristoranti e spa: scopri i progetti Serralunga e richiedi il volume e la cartella colori per il tuo luogo.",
    },
  }
}

export const paginaDesignerDati = async () => ({
  kicker: 'Le firme',
  titolo: 'I designer\nSerralunga',
  testo:
    "Architetti e designer italiani e internazionali che dal secondo dopoguerra a oggi hanno dato forma alla nostra materia. Ogni pezzo a catalogo porta il nome di chi lo ha pensato: è la garanzia che dietro a un oggetto d'esterno ci sia un progetto, non un profilo di produzione.",
  segnaposto: 3,
  cta: {
    kicker: 'Progetti su misura',
    titolo: 'Un pezzo disegnato\nper il vostro luogo',
    testo: 'Per i progetti contract sviluppiamo con i nostri designer dimensioni, colori e finiture dedicate.',
    pulsante: 'Parliamo del progetto',
    link: '/#invito',
  },
  seo: {
    titolo: 'I designer Serralunga',
    descrizione:
      "Marc Sadler, Luisa Bocchietto, Marta Sansoni: i designer e gli architetti che firmano vasi, arredi e luci Serralunga per l'ospitalità e il contract.",
  },
})
