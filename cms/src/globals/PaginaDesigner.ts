import type { GlobalConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblico, soloRedazione } from '../access'
import { area, link, seoField, testo } from '../fields'

/** Template: template/Designer.dc.html (elenco dei designer). */
export const PaginaDesigner: GlobalConfig = {
  slug: 'pagina-designer',
  label: 'I designer',
  admin: { group: 'Pagine' },
  access: { read: pubblico, update: soloRedazione },
  fields: [
    testo('kicker', 'Kicker', { defaultValue: 'Le firme' }),
    area('titolo', 'Titolo (H1)', { required: true }),
    area('testo', 'Introduzione'),
    {
      name: 'segnaposto',
      type: 'number',
      label: 'Card segnaposto "ritratto designer da fornire"',
      defaultValue: 0,
      min: 0,
      max: 6,
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
