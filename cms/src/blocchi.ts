import type { Block, Field } from 'payload'

import { area, immagine, link, testo } from './fields'

/**
 * Version: 1.00
 * Blocchi aggiuntivi: si aggiungono in fondo a una pagina dal pannello oppure dalla pagina
 * stessa (anche descrivendoli all'AI). Ogni blocco ha un solo scopo e un markup fisso:
 * l'AI sceglie il tipo e compila i campi, non scrive HTML.
 */
const sfondo: Field = {
  name: 'sfondo',
  type: 'select',
  label: 'Sfondo',
  defaultValue: 'chiaro',
  options: [
    { label: 'Chiaro', value: 'chiaro' },
    { label: 'Carta', value: 'carta' },
    { label: 'Scuro', value: 'scuro' },
  ],
}

export const BloccoTesto: Block = {
  slug: 'testo',
  labels: { singular: 'Testo', plural: 'Testi' },
  fields: [testo('kicker', 'Kicker'), area('titolo', 'Titolo'), area('testo', 'Testo'), sfondo],
}

export const BloccoProdotti: Block = {
  slug: 'prodotti',
  labels: { singular: 'Elenco di prodotti', plural: 'Elenchi di prodotti' },
  fields: [
    testo('kicker', 'Kicker'),
    area('titolo', 'Titolo'),
    {
      name: 'voci',
      type: 'array',
      label: 'Prodotti',
      labels: { singular: 'Prodotto', plural: 'Prodotti' },
      admin: { description: 'Un prodotto del sito oppure un indirizzo esterno con nome e foto.' },
      fields: [
        { name: 'prodotto', type: 'relationship', relationTo: 'prodotti', label: 'Prodotto del sito' },
        link('url', 'Indirizzo (se non è un prodotto del sito)'),
        testo('nome', 'Nome'),
        testo('tipo', 'Tipologia'),
        immagine('immagine', 'Foto'),
      ],
    },
    sfondo,
  ],
}

export const BloccoSlider: Block = {
  slug: 'slider',
  labels: { singular: 'Slider di foto', plural: 'Slider di foto' },
  fields: [
    testo('kicker', 'Kicker'),
    area('titolo', 'Titolo'),
    { name: 'immagini', type: 'upload', relationTo: 'media', hasMany: true, label: 'Foto' },
    { name: 'lightbox', type: 'checkbox', label: 'Apri le foto a tutto schermo al clic (lightbox)', defaultValue: true },
    {
      name: 'formato',
      type: 'select',
      label: 'Formato',
      defaultValue: 'largo',
      options: [
        { label: 'Largo (16:9)', value: 'largo' },
        { label: 'Panoramico (21:9)', value: 'panoramico' },
        { label: 'Classico (4:3)', value: 'classico' },
      ],
    },
    sfondo,
  ],
}

export const BloccoImmagineTesto: Block = {
  slug: 'immagineTesto',
  labels: { singular: 'Immagine e testo', plural: 'Immagine e testo' },
  fields: [
    immagine('immagine', 'Immagine'),
    testo('kicker', 'Kicker'),
    area('titolo', 'Titolo'),
    area('testo', 'Testo'),
    { name: 'lato', type: 'select', label: 'Immagine a', defaultValue: 'sinistra', options: [{ label: 'Sinistra', value: 'sinistra' }, { label: 'Destra', value: 'destra' }] },
    { type: 'row', fields: [testo('pulsante', 'Testo del pulsante'), link('link', 'Link')] },
    sfondo,
  ],
}

export const BloccoCitazione: Block = {
  slug: 'citazione',
  labels: { singular: 'Citazione', plural: 'Citazioni' },
  fields: [area('testo', 'Citazione', { required: true }), testo('autore', 'Autore'), sfondo],
}

export const BloccoInvito: Block = {
  slug: 'invito',
  labels: { singular: 'Invito all’azione', plural: 'Inviti all’azione' },
  fields: [testo('kicker', 'Kicker'), area('titolo', 'Titolo'), area('testo', 'Testo'), { type: 'row', fields: [testo('pulsante', 'Testo del pulsante'), link('link', 'Link')] }, sfondo],
}

export const BloccoDomande: Block = {
  slug: 'domande',
  labels: { singular: 'Domande e risposte', plural: 'Domande e risposte' },
  fields: [
    testo('kicker', 'Kicker'),
    area('titolo', 'Titolo'),
    {
      name: 'voci',
      type: 'array',
      label: 'Domande',
      labels: { singular: 'Domanda', plural: 'Domande' },
      admin: { description: 'Risposte brevi e complete: vengono segnalate ai motori di ricerca e agli assistenti come FAQ.' },
      fields: [testo('domanda', 'Domanda', { required: true }), area('risposta', 'Risposta', { required: true })],
    },
    sfondo,
  ],
}

export const BLOCCHI: Block[] = [BloccoTesto, BloccoImmagineTesto, BloccoSlider, BloccoProdotti, BloccoCitazione, BloccoDomande, BloccoInvito]

/** Campo da aggiungere a pagine e schede. */
export const blocchiField: Field = {
  name: 'blocchi',
  type: 'blocks',
  label: 'Blocchi aggiuntivi',
  labels: { singular: 'Blocco', plural: 'Blocchi' },
  admin: { description: 'Compaiono in fondo alla pagina, prima dell’invito finale. Si possono aggiungere anche dalla pagina, con il pulsante «Aggiungi blocco».' },
  blocks: BLOCCHI,
}
