import type { CollectionConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblicatiOppureRedazione, soloRedazione } from '../access'
import { area, coppie, immagine, link, ordine, paragrafi, seoField, slugField, testo } from '../fields'

export const FAMIGLIE = [
  { label: 'Vasi', value: 'vasi' },
  { label: 'Arredo', value: 'arredo' },
  { label: 'Illuminazione', value: 'illuminazione' },
  { label: 'Accessori', value: 'accessori' },
]

/** Template: template/Aqua Lounger - Scheda tecnica.dc.html */
export const Prodotti: CollectionConfig = {
  slug: 'prodotti',
  labels: { singular: 'Prodotto', plural: 'Prodotti' },
  admin: {
    useAsTitle: 'nome',
    group: 'Contenuti',
    defaultColumns: ['nome', 'famiglia', 'designer', 'schedaPubblicata', '_status'],
  },
  defaultSort: 'ordine',
  versions: { drafts: true },
  access: {
    read: pubblicatiOppureRedazione,
    create: soloRedazione,
    update: soloRedazione,
    delete: soloRedazione,
  },
  fields: [
    testo('nome', 'Nome', { required: true }),
    slugField('nome'),
    ordine,
    {
      name: 'schedaPubblicata',
      type: 'checkbox',
      label: 'Scheda tecnica online',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Se spento, la card mostra "In arrivo" e porta al modulo di richiesta.',
      },
    },
    {
      name: 'famiglia',
      type: 'select',
      label: 'Famiglia',
      options: FAMIGLIE,
      admin: { position: 'sidebar' },
    },
    {
      name: 'designer',
      type: 'relationship',
      relationTo: 'designer',
      label: 'Designer',
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          fields: [
            immagine('immagine', 'Immagine della card (4:5)'),
            testo('etichettaCard', 'Sottotitolo della card', {
              admin: { description: 'Es. Piscina — Marc Sadler' },
            }),
          ],
        },
        {
          label: 'Intestazione',
          fields: [
            testo('categoria', 'Kicker', { admin: { description: 'Es. Piscina & spiaggia — set da 2' } }),
            testo('firma', 'Firma', { admin: { description: 'Es. Disegno di Marc Sadler' } }),
            {
              name: 'galleria',
              type: 'array',
              label: 'Galleria (fino a 6 viste)',
              maxRows: 6,
              labels: { singular: 'Vista', plural: 'Viste' },
              fields: [immagine('immagine', 'Immagine', { required: true })],
            },
            area('descrizione', 'Descrizione'),
            {
              name: 'colori',
              type: 'array',
              label: 'Cartella colori',
              labels: { singular: 'Colore', plural: 'Colori' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    testo('nome', 'Nome', { required: true }),
                    {
                      name: 'hex',
                      type: 'text',
                      label: 'Colore (#RRGGBB)',
                      required: true,
                      validate: (v: unknown) =>
                        typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v) ? true : 'Formato #RRGGBB',
                    },
                  ],
                },
              ],
            },
            area('notaColori', 'Nota sotto i colori'),
            coppie('dimensioni', 'Dimensioni'),
            testo('pulsante', 'Pulsante principale', { defaultValue: 'Richiedi scheda e campionatura' }),
          ],
        },
        {
          label: 'Specifiche e disegno',
          fields: [
            coppie('specifiche', 'Specifiche (fascia scura)'),
            {
              name: 'disegno',
              type: 'group',
              label: 'Disegno tecnico',
              fields: [
                area('titolo', 'Titolo', { defaultValue: 'Disegno\ne proporzioni' }),
                area('testo', 'Testo'),
                immagine('immagine', 'Disegno quotato'),
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Scheda PDF scaricabile (facoltativa)',
                },
              ],
            },
            {
              name: 'ambiente',
              type: 'group',
              label: 'In ambiente',
              fields: [
                area('titolo', 'Titolo', { defaultValue: 'In ambiente' }),
                area('testo', 'Testo'),
                immagine('immagineGrande', 'Immagine panoramica (21:9)'),
                {
                  name: 'immagini',
                  type: 'array',
                  label: 'Immagini (4:3)',
                  maxRows: 3,
                  fields: [immagine('immagine', 'Immagine', { required: true })],
                },
              ],
            },
          ],
        },
        {
          label: 'Designer e collegamenti',
          fields: [
            {
              name: 'firmaProgetto',
              type: 'group',
              label: 'Sezione designer',
              admin: { description: 'Ritratto, nome e numeri arrivano dalla scheda del designer.' },
              fields: [
                testo('kicker', 'Kicker', { defaultValue: 'La firma del progetto' }),
                paragrafi('testi', 'Testi'),
              ],
            },
            {
              name: 'caseHistory',
              type: 'relationship',
              relationTo: 'case-history',
              hasMany: true,
              label: 'Case history collegate',
            },
            {
              name: 'caseSegnaposto',
              type: 'array',
              label: 'Case history in preparazione',
              admin: { description: 'Card mostrate dopo le case history pubblicate.' },
              fields: [
                testo('etichetta', 'Etichetta', { admin: { description: 'Es. Hôtellerie · da definire' } }),
                testo('titolo', 'Titolo', { required: true }),
                immagine('immagine', 'Immagine'),
                testo('nota', 'Nota', { defaultValue: 'progetto e foto da fornire' }),
              ],
            },
            area('correlatiTesto', 'Testo dei prodotti correlati'),
            {
              name: 'correlati',
              type: 'array',
              label: 'Prodotti correlati',
              maxRows: 8,
              fields: [
                {
                  name: 'prodotto',
                  type: 'relationship',
                  relationTo: 'prodotti',
                  label: 'Prodotto (facoltativo)',
                },
                testo('nome', 'Nome (se diverso dal prodotto)'),
                testo('sottotitolo', 'Sottotitolo'),
                immagine('immagine', 'Immagine (se diversa)'),
                link('link', 'Link (se non è un prodotto)'),
              ],
            },
          ],
        },
        {
          label: 'Richiesta',
          fields: [
            {
              name: 'richiesta',
              type: 'group',
              label: 'Fascia finale',
              fields: [
                testo('kicker', 'Kicker', { defaultValue: 'Documentazione contract' }),
                area('titolo', 'Titolo', { defaultValue: 'Scheda tecnica,\ndisegni e campioni' }),
                area('testo', 'Testo'),
                immagine('immagine', 'Immagine di sfondo'),
              ],
            },
          ],
        },
      ],
    },
    blocchiField,
    seoField,
  ],
}
