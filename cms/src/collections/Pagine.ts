import type { CollectionConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblicatiOppureRedazione, soloRedazione } from '../access'
import { area, immagine, paragrafi, seoField, slugField, testo } from '../fields'

/**
 * Pagine semplici (Version: 1.00): Contatti, Listino, FAQ, pagine legali e simili.
 * Indirizzo: /{slug}/ (inglese /en/{slug}/). Le domande frequenti si aggiungono con il blocco
 * "Domande e risposte", che produce anche i dati strutturati FAQPage.
 */
export const Pagine: CollectionConfig = {
  slug: 'pagine',
  labels: { singular: 'Pagina', plural: 'Pagine' },
  admin: {
    useAsTitle: 'titolo',
    group: 'Contenuti',
    defaultColumns: ['titolo', 'slug', '_status'],
    description: 'Pagine di servizio raggiungibili da menu e footer: Contatti, Listino, FAQ, Privacy, Cookie, Termini.',
  },
  versions: { drafts: true },
  access: {
    read: pubblicatiOppureRedazione,
    create: soloRedazione,
    update: soloRedazione,
    delete: soloRedazione,
  },
  fields: [
    testo('titolo', 'Titolo (H1)', { required: true }),
    slugField('titolo'),
    testo('kicker', 'Occhiello'),
    area('intro', 'Testo introduttivo'),
    immagine('immagine', 'Immagine'),
    paragrafi('paragrafi', 'Testo'),
    {
      name: 'modulo',
      type: 'group',
      label: 'Modulo di richiesta',
      fields: [
        { name: 'mostra', type: 'checkbox', label: 'Mostra il modulo di richiesta' },
        testo('titolo', 'Titolo del modulo'),
        testo('pulsante', 'Testo del pulsante'),
        area('grazie', 'Messaggio dopo l’invio'),
      ],
    },
    { name: 'mostraContatti', type: 'checkbox', label: 'Mostra i dati aziendali (indirizzo, telefono, email)' },
    blocchiField,
    seoField,
  ],
}
