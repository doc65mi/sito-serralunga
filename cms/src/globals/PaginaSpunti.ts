import type { GlobalConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblico, soloRedazione } from '../access'
import { area, link, seoField, testo } from '../fields'

/** Pagina Spunti e idee (Version: 1.00): elenco degli esempi d'uso dei prodotti. */
export const PaginaSpunti: GlobalConfig = {
  slug: 'pagina-spunti',
  label: 'Spunti e idee',
  admin: { group: 'Pagine' },
  access: { read: pubblico, update: soloRedazione },
  fields: [
    testo('kicker', 'Kicker', { defaultValue: 'Spunti e idee' }),
    area('titolo', 'Titolo (H1)', { required: true }),
    area('testo', 'Introduzione'),
    area('notaVuota', 'Testo mostrato finché non ci sono spunti pubblicati'),
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
