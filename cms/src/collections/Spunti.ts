import type { CollectionConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblicatiOppureRedazione, soloRedazione } from '../access'
import { area, immagine, ordine, paragrafi, seoField, slugField, testo } from '../fields'

/** Spunti e idee (Version: 1.00): esempi di cosa si può fare con i prodotti Serralunga. */
export const Spunti: CollectionConfig = {
  slug: 'spunti',
  labels: { singular: 'Spunto', plural: 'Spunti e idee' },
  admin: { useAsTitle: 'titolo', group: 'Contenuti', defaultColumns: ['titolo', 'ambito', '_status'] },
  defaultSort: 'ordine',
  versions: { drafts: true },
  access: {
    read: pubblicatiOppureRedazione,
    create: soloRedazione,
    update: soloRedazione,
    delete: soloRedazione,
  },
  fields: [
    testo('titolo', 'Titolo', { required: true }),
    slugField('titolo'),
    ordine,
    testo('ambito', 'Ambito', { admin: { description: 'Es. Terrazza di un hotel, Bordo piscina, Dehors.' } }),
    area('estratto', 'Testo della card'),
    immagine('immagine', 'Immagine principale'),
    paragrafi('paragrafi', 'Racconto'),
    {
      name: 'galleria',
      type: 'array',
      label: 'Galleria',
      labels: { singular: 'Foto', plural: 'Foto' },
      fields: [immagine('immagine', 'Immagine', { required: true }), testo('didascalia', 'Didascalia')],
    },
    {
      name: 'prodotti',
      type: 'relationship',
      relationTo: 'prodotti',
      hasMany: true,
      label: 'Prodotti usati',
    },
    {
      name: 'designer',
      type: 'relationship',
      relationTo: 'designer',
      hasMany: true,
      label: 'Designer dei pezzi',
    },
    blocchiField,
    seoField,
  ],
}
