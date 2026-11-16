import type { CollectionConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblico, soloRedazione } from '../access'
import { area, immagine, link, numeri, ordine, seoField, slugField, testo } from '../fields'
import { voci } from '../globals/PaginaHeritage'

/**
 * Sottopagine di Heritage (Version: 1.00): La nostra storia, Living different, Produzione, I colori.
 * Indirizzo: /heritage/{slug}/. Stessa struttura per tutte: apertura, capitoli foto + testo,
 * punti, citazione, invito finale. Sulla pagina "i-colori" sotto i capitoli compare la mappa dei colori.
 */
export const PagineHeritage: CollectionConfig = {
  slug: 'pagine-heritage',
  labels: { singular: 'Sottopagina Heritage', plural: 'Heritage, sottopagine' },
  admin: { useAsTitle: 'titolo', group: 'Pagine', defaultColumns: ['titolo', 'slug', 'ordine'] },
  defaultSort: 'ordine',
  access: { read: pubblico, create: soloRedazione, update: soloRedazione, delete: soloRedazione },
  fields: [
    testo('titolo', 'Titolo (H1)', { required: true }),
    slugField('titolo'),
    ordine,
    testo('nomeMenu', 'Nome breve', { admin: { description: 'Nel percorso e nelle card (es. "Produzione"). Se vuoto si usa il titolo.' } }),
    testo('kicker', 'Kicker'),
    area('testo', 'Introduzione', { admin: { description: 'Anche testo della card nella pagina Heritage.' } }),
    immagine('immagine', 'Immagine di apertura'),
    numeri('numeri', 'Numeri'),
    {
      name: 'capitoli',
      type: 'array',
      label: 'Capitoli',
      labels: { singular: 'Capitolo', plural: 'Capitoli' },
      admin: { description: 'Foto e testo alternati: il primo capitolo ha la foto a destra.' },
      fields: [
        testo('kicker', 'Kicker'),
        area('titolo', 'Titolo', { required: true }),
        area('testo', 'Testo'),
        immagine('immagine', 'Immagine'),
        { type: 'row', fields: [testo('pulsante', 'Pulsante'), link('link', 'Link')] },
      ],
    },
    {
      name: 'punti',
      type: 'group',
      label: 'Punti',
      fields: [testo('kicker', 'Kicker'), area('titolo', 'Titolo'), voci()],
    },
    {
      name: 'citazione',
      type: 'group',
      label: 'Citazione',
      fields: [area('testo', 'Citazione'), testo('autore', 'Autore'), immagine('immagine', 'Immagine')],
    },
    {
      name: 'cta',
      type: 'group',
      label: 'Invito finale',
      fields: [
        testo('kicker', 'Kicker'),
        area('titolo', 'Titolo'),
        area('testo', 'Testo'),
        { type: 'row', fields: [testo('pulsante', 'Pulsante'), link('link', 'Link')] },
      ],
    },
    blocchiField,
    seoField,
  ],
}
