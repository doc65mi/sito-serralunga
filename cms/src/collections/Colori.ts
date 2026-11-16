import type { CollectionConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'
import { immagine, ordine, testo } from '../fields'

/**
 * Colori (Version: 1.00): la gamma colori di serralunga.com/pages/colors.
 * La usano la pagina /materiali/colori/ e Heritage › I colori (componente MappaColori.astro).
 * Lo stesso codice può comparire due volte (GG: design e vasi della tradizione), come sul sito dell'azienda.
 */
export const Colori: CollectionConfig = {
  slug: 'colori',
  labels: { singular: 'Colore', plural: 'Colori' },
  admin: {
    useAsTitle: 'nome',
    group: 'Contenuti',
    defaultColumns: ['codice', 'nome', 'famiglia', 'finitura', 'ordine'],
    description: 'Cartella colori mostrata in /materiali/colori/ e in Heritage › I colori.',
  },
  defaultSort: 'ordine',
  access: { read: pubblico, create: soloRedazione, update: soloRedazione, delete: soloRedazione },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'codice', type: 'text', label: 'Codice', required: true, index: true, admin: { width: '30%' } },
        testo('nome', 'Nome', { required: true }),
      ],
    },
    testo('descrizione', 'Tono', { admin: { description: 'Es. “bianco ghiaccio”, “grigio chiaro · design”.' } }),
    {
      type: 'row',
      fields: [
        {
          name: 'famiglia',
          type: 'select',
          label: 'Famiglia',
          required: true,
          defaultValue: 'standard',
          options: [
            { label: 'Colori standard', value: 'standard' },
            { label: 'Laccati', value: 'laccato' },
          ],
        },
        {
          name: 'finitura',
          type: 'select',
          label: 'Finitura del laccato',
          options: [
            { label: 'Lucido', value: 'lucido' },
            { label: 'Opaco', value: 'opaco' },
          ],
          admin: { condition: (_, d) => d?.famiglia === 'laccato' },
        },
        {
          name: 'metallizzato',
          type: 'checkbox',
          label: 'Metallizzato',
          defaultValue: false,
          admin: { condition: (_, d) => d?.famiglia === 'laccato' },
        },
      ],
    },
    immagine('campione', 'Campione', { admin: { description: 'Foto del campione di colore.' } }),
    ordine,
  ],
}
