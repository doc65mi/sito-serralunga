import type { CollectionConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'
import { immagine, ordine, testo } from '../fields'
import { coloreMedio } from '../fields/coloreMedio'

/**
 * Colori (Version: 1.01): la gamma colori di serralunga.com/pages/colors.
 * La usano la pagina /materiali/colori/ e Heritage › I colori (componente MappaColori.astro).
 * Il campo "Colore pieno" (hex) si calcola dalla foto del campione e colora i quadrati 30×30 delle schede prodotto.
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
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, req }) => {
        // Colore pieno dal campione: se manca, o se è cambiata la foto e il colore non è stato corretto a mano.
        const campione = data.campione ?? originalDoc?.campione
        const idDi = (v: unknown) => (v && typeof v === 'object' ? (v as { id?: unknown }).id : v)
        const fotoCambiata = data.campione !== undefined && idDi(data.campione) !== idDi(originalDoc?.campione)
        const hexToccato = data.hex !== undefined && data.hex !== originalDoc?.hex
        if (campione && (!(data.hex ?? originalDoc?.hex) || (fotoCambiata && !hexToccato))) {
          const hex = await coloreMedio(req.payload, campione)
          if (hex) data.hex = hex
        }
        return data
      },
    ],
  },
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
    {
      type: 'row',
      fields: [
        immagine('campione', 'Campione', { admin: { description: 'Foto del campione di colore.' } }),
        {
          name: 'hex',
          type: 'text',
          label: 'Colore pieno (#RRGGBB)',
          admin: {
            width: '30%',
            description: 'Si calcola da solo dalla foto del campione; si può correggere a mano. Colora i quadrati 30×30 delle schede prodotto.',
          },
          validate: (v: unknown) => (v === null || v === undefined || v === '' || (typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v)) ? true : 'Formato #RRGGBB'),
        },
      ],
    },
    ordine,
  ],
}
