/**
 * Lingue del sito e testi fissi dell'interfaccia (Version: 1.00).
 * I contenuti stanno nel CMS (un campo per lingua); qui solo le parole scritte nel codice.
 * La chiave è il testo italiano: se manca la traduzione resta l'italiano.
 */
export const LINGUE = ['it', 'en'] as const
export type Lingua = (typeof LINGUE)[number]

export const INFO: Record<Lingua, { nome: string; sigla: string; og: string; html: string }> = {
  it: { nome: 'Italiano', sigla: 'IT', og: 'it_IT', html: 'it' },
  en: { nome: 'English', sigla: 'EN', og: 'en_GB', html: 'en' },
}

const EN: Record<string, string> = {
  // struttura
  'Vai al contenuto': 'Skip to content',
  Percorso: 'Breadcrumb',
  'Accesso redazione': 'Editor login',
  Installazioni: 'Installations',
  Ambiti: 'Settings',
  'Case history': 'Case histories',
  'Altre case history': 'More case histories',
  'foto da fornire': 'photo to be supplied',
  'Spunti e idee': 'Ideas',
  'Elenco degli spunti': 'List of ideas',
  'Leggi lo spunto →': 'Read the idea →',
  'I primi spunti sono in preparazione.': 'The first ideas are on their way.',
  Design: 'Design',
  Galleria: 'Gallery',
  'I pezzi di questo spunto': 'The pieces in this idea',
  'Avete in mente uno spazio preciso?': 'Do you have a specific space in mind?',
  'Tutti gli spunti': 'All ideas',
  'Le creazioni per Serralunga': 'Creations for Serralunga',
  'Foto di prodotto e ambientate dal catalogo Serralunga.': 'Product and lifestyle photos from the Serralunga catalogue.',
  Menu: 'Menu',
  'Menu principale': 'Main menu',
  'Cambia lingua': 'Change language',
  Contatti: 'Contacts',
  'P.IVA': 'VAT',
  // modulo
  'Richiedi il volume': 'Request the book',
  'Struttura o studio': 'Property or studio',
  Referente: 'Contact person',
  'Email (obbligatoria)': 'Email (required)',
  Email: 'Email',
  'Città del progetto': 'Project city',
  'Non compilare': 'Leave empty',
  'Usiamo questi dati solo per rispondere alla richiesta. Scrivici a': 'We use these details only to reply to your request. Write to',
  'per cancellarli.': 'to have them deleted.',
  'Invio in corso…': 'Sending…',
  'Invio non riuscito': 'Sending failed',
  'Invio non consentito': 'Submission not allowed',
  'Modulo non valido': 'Invalid form',
  'Inserite un indirizzo email valido': 'Please enter a valid email address',
  'Grazie, vi ricontatteremo a breve.': 'Thank you, we will be in touch shortly.',
  'Potete scriverci anche a': 'You can also write to us at',
  // card e segnaposto
  'Nota biografica e collezione firmata.': 'Biography and signature collection.',
  'ritratto in alta risoluzione\nda fornire': 'high-resolution portrait\nto be supplied',
  'ritratto hi-res da fornire': 'hi-res portrait to be supplied',
  'ritratto designer\nda fornire': 'designer portrait\nto be supplied',
  'Nome designer': 'Designer name',
  Ruolo: 'Role',
  'Scheda designer →': 'Designer profile →',
  'Scheda in arrivo': 'Profile coming soon',
  'Leggi il progetto →': 'Read the project →',
  'prossima case history': 'next case history',
  'Scheda →': 'Details →',
  'In arrivo': 'Coming soon',
  'Immagine da fornire': 'Image to be supplied',
  'Scorri indietro': 'Scroll back',
  'Scorri avanti': 'Scroll forward',
  // home
  Apertura: 'Opening',
  'Play o pausa del video': 'Play or pause the video',
  carosello: 'carousel',
  di: 'of',
  Immagine: 'Image',
  Precedente: 'Previous',
  Successiva: 'Next',
  'Il nostro sguardo': 'Our view',
  'I luoghi': 'The places',
  Designer: 'Designers',
  Citazione: 'Quote',
  'video da fornire — fermo immagine attivo': 'video to be supplied — still image active',
  Numeri: 'Figures',
  'Filtra le installazioni': 'Filter the installations',
  Tutte: 'All',
  Hotel: 'Hotels',
  Ristorazione: 'Restaurants',
  'Spa & Piscine': 'Spas & Pools',
  Residenze: 'Residences',
  'Ragione sociale': 'Company name',
  'Email aziendale': 'Business email',
  'Tipologia di struttura': 'Type of property',
  'Richiesta catalogo': 'Request the catalogue',
  // prodotto
  Prodotti: 'Products',
  Vista: 'View',
  'Disegno di': 'Design by',
  'Cartella colori': 'Colour chart',
  'Richiedi scheda e campionatura': 'Request data sheet and samples',
  'Disegno tecnico': 'Technical drawing',
  Specifiche: 'Specifications',
  'La firma del progetto': 'The designer behind it',
  'Scheda di': 'Profile of',
  'Tutti i designer Serralunga': 'All Serralunga designers',
  'Dove questo\ndisegno è già di casa': 'Where this design\nis already at home',
  'Prodotti correlati': 'Related products',
  'Documentazione contract': 'Contract documentation',
  'Scheda tecnica,\ndisegni e campioni': 'Data sheet,\ndrawings and samples',
  'Richiedi la documentazione': 'Request the documentation',
  'Torna al portfolio': 'Back to the portfolio',
  // case history
  'Sfida, scelta, risultato': 'Challenge, choice, result',
  'Immagini del progetto': 'Project images',
  'Diario della stagione': 'Diary of the season',
  'Vedi tutto il portfolio': 'See the whole portfolio',
  'Il prossimo progetto': 'The next project',
  'Parliamo del progetto': 'Let’s talk about the project',
  'Torna alla home': 'Back to home',
  // designer
  'I designer': 'The designers',
  'Elenco dei designer': 'List of designers',
  Fotografia: 'Photograph',
  'Premi e riconoscimenti': 'Awards and honours',
  'I pezzi\nper Serralunga': 'The pieces\nfor Serralunga',
  'Pezzi di': 'Pieces by',
  'altri pezzi\nda confermare': 'more pieces\nto be confirmed',
  'Nome prodotto': 'Product name',
  Collezione: 'Collection',
  'Progetti su misura': 'Bespoke projects',
  'Lavoriamo con i designer,\nper il vostro luogo': 'We work with designers,\nfor your place',
  'Tutti i designer': 'All designers',
  // 404
  'Pagina non trovata | Serralunga': 'Page not found | Serralunga',
  'La pagina cercata non esiste o è stata spostata.': 'The page you are looking for does not exist or has been moved.',
  'Errore 404': 'Error 404',
  'Questa pagina\nnon c’è più': 'This page\nis no longer here',
  'Forse è stata spostata. Riparti dalla home o scopri i nostri designer.': 'It may have been moved. Start again from the home page or discover our designers.',
  Storie: 'Stories',
  Guide: 'Guides',
  Progetti: 'Projects',
  'Elenco degli articoli': 'List of articles',
  'Leggi l’articolo →': 'Read the article →',
  'I primi articoli sono in preparazione.': 'The first articles are being prepared.',
  Testo: 'Text',
  'Domande frequenti': 'Frequently asked questions',
  'I prodotti citati': 'Products mentioned',
}

const DIZIONARI: Record<Lingua, Record<string, string>> = { it: {}, en: EN }

export const lingua = (v: unknown): Lingua => (v === 'en' ? 'en' : 'it')

/** Traduttore dei testi fissi: t('Scheda →') */
export const traduttore = (l: Lingua) => (s: string) => DIZIONARI[l][s] ?? s

/** Percorso interno nella lingua: '/designer/' → '/en/designer/'. Ancore e link esterni restano uguali. */
export function percorso(l: Lingua, p?: string | null): string {
  if (!p) return l === 'en' ? '/en/' : '/'
  if (l === 'it' || !p.startsWith('/') || p.startsWith('//') || p.startsWith('/en/') || p.startsWith('/api/')) return p
  return `/en${p}`
}

/** Percorso senza prefisso di lingua (per hreflang e selettore). */
export const senzaLingua = (p: string) => (p === '/en' || p.startsWith('/en/') ? p.slice(3) || '/' : p)
