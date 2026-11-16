import type { GlobalConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblico, soloRedazione } from '../access'
import { area, link, seoField, testo } from '../fields'

/** Pagina Catalogo (ex Shop) — Version: 1.00: apertura, riquadri delle macrocategorie, invito al listino B2B. */
export const PaginaCatalogo: GlobalConfig = {
  slug: 'pagina-catalogo',
  label: 'Catalogo',
  admin: { group: 'Pagine' },
  access: { read: pubblico, update: soloRedazione },
  fields: [
    testo('kicker', 'Kicker'),
    area('titolo', 'Titolo (H1)'),
    area('testo', 'Introduzione'),
    {
      name: 'cta',
      type: 'group',
      label: 'Invito finale (listino B2B)',
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
