import type { GlobalConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'
import { blocchiField } from '../blocchi'
import { area, seoField, testo } from '../fields'

/** Journal (Version: 1.00): testata dell'elenco degli articoli. */
export const PaginaJournal: GlobalConfig = {
  slug: 'pagina-journal',
  label: 'Journal',
  admin: { group: 'Pagine' },
  access: { read: pubblico, update: soloRedazione },
  versions: { drafts: true },
  fields: [
    testo('kicker', 'Kicker', { defaultValue: 'Journal' }),
    area('titolo', 'Titolo (H1)'),
    area('testo', 'Testo'),
    area('notaVuota', 'Testo mostrato finché non ci sono articoli'),
    blocchiField,
    seoField,
  ],
}
