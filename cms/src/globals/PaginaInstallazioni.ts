import type { GlobalConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblico, soloRedazione } from '../access'
import { area, immagine, link, seoField, testo } from '../fields'

export const CATEGORIE_INSTALLAZIONI = [
  { label: 'Hotel', value: 'hotel' },
  { label: 'Ristorazione', value: 'risto' },
  { label: 'Spa & Piscine', value: 'spa' },
  { label: 'Residenze', value: 'resid' },
  { label: 'Spazi urbani', value: 'urbano' },
]

/** Pagina Installazioni (Version: 1.00): macro sezioni che raccontano gli ambiti e mostrano le case history. */
export const PaginaInstallazioni: GlobalConfig = {
  slug: 'pagina-installazioni',
  label: 'Installazioni',
  admin: { group: 'Pagine' },
  access: { read: pubblico, update: soloRedazione },
  fields: [
    testo('kicker', 'Kicker', { defaultValue: 'Installazioni' }),
    area('titolo', 'Titolo (H1)', { required: true }),
    area('testo', 'Introduzione'),
    immagine('immagine', 'Immagine di apertura'),
    {
      name: 'sezioni',
      type: 'array',
      label: 'Macro sezioni',
      labels: { singular: 'Sezione', plural: 'Sezioni' },
      admin: {
        description:
          'Ogni sezione racconta un ambito e mostra da sola le case history e le installazioni della home con la stessa categoria.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'categoria', type: 'select', label: 'Categoria', required: true, options: CATEGORIE_INSTALLAZIONI },
            testo('kicker', 'Kicker'),
          ],
        },
        area('titolo', 'Titolo', { required: true }),
        area('testo', 'Testo'),
        immagine('immagine', 'Immagine della sezione'),
      ],
    },
    testo('notaVuota', 'Testo se una sezione non ha ancora case history', {
      defaultValue: 'Case history in preparazione.',
    }),
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
