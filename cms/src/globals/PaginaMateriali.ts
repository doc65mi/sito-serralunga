import type { GlobalConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblico, soloRedazione } from '../access'
import { area, immagine, link, seoField, testo } from '../fields'

/** Pagina Materiali (Version: 1.00): ingresso della sezione con i blocchi dei materiali. */
export const PaginaMateriali: GlobalConfig = {
  slug: 'pagina-materiali',
  label: 'Materiali',
  admin: { group: 'Pagine' },
  access: { read: pubblico, update: soloRedazione },
  fields: [
    testo('kicker', 'Kicker', { defaultValue: 'Materiali' }),
    area('titolo', 'Titolo (H1)', { required: true }),
    area('testo', 'Introduzione'),
    immagine('immagine', 'Immagine di apertura'),
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
