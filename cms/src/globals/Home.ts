import type { GlobalConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'
import { area, immagine, link, numeri, seoField, testo } from '../fields'

/** Template: template/Serralunga Contract Home v2.dc.html (slider) e v3 (hero video). */
export const Home: GlobalConfig = {
  slug: 'home',
  label: 'Home',
  admin: { group: 'Pagine' },
  access: { read: pubblico, update: soloRedazione },
  versions: { drafts: true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Apertura',
          fields: [
            testo('h1', 'H1 della pagina', {
              required: true,
              admin: {
                description:
                  'Con l’apertura a slide l’H1 è nascosto alla vista ma letto da motori e assistenti. Con il video è il titolo grande.',
              },
            }),
            {
              name: 'tipoApertura',
              type: 'radio',
              label: 'Tipo di apertura',
              defaultValue: 'slide',
              options: [
                { label: 'Slide con riquadro (Home v2)', value: 'slide' },
                { label: 'Video a tutto schermo (Home v3)', value: 'video' },
              ],
            },
            {
              name: 'slide',
              type: 'array',
              label: 'Slide',
              minRows: 1,
              maxRows: 6,
              admin: { condition: (_, s) => s?.tipoApertura !== 'video' },
              labels: { singular: 'Slide', plural: 'Slide' },
              fields: [
                immagine('immagine', 'Immagine'),
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo', { required: true }),
                area('testo', 'Testo'),
                {
                  type: 'row',
                  fields: [testo('linkEtichetta', 'Testo del link'), link('link', 'Link')],
                },
              ],
            },
            {
              name: 'video',
              type: 'group',
              label: 'Video',
              admin: { condition: (_, s) => s?.tipoApertura === 'video' },
              fields: [
                immagine('file', 'File video (mp4, muto, in loop)'),
                immagine('poster', 'Immagine mostrata prima del video'),
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo grande (se vuoto si usa l’H1)'),
                area('testo', 'Testo'),
                {
                  type: 'row',
                  fields: [testo('linkEtichetta', 'Testo del pulsante'), link('link', 'Link')],
                },
              ],
            },
          ],
        },
        {
          label: 'Racconto',
          fields: [
            {
              name: 'manifesto',
              type: 'group',
              label: 'Il nostro sguardo',
              fields: [testo('kicker', 'Kicker'), area('testo', 'Testo')],
            },
            {
              name: 'luoghi',
              type: 'array',
              label: 'I luoghi (capitoli foto + testo)',
              labels: { singular: 'Capitolo', plural: 'Capitoli' },
              fields: [
                {
                  type: 'row',
                  fields: [testo('numero', 'Numero romano'), testo('kicker', 'Kicker')],
                },
                area('titolo', 'Titolo', { required: true }),
                area('testo', 'Testo'),
                testo('didascalia', 'Didascalia'),
                immagine('immagine', 'Immagine'),
              ],
            },
            {
              name: 'banner',
              type: 'group',
              label: 'Capitolo a tutto schermo',
              fields: [
                {
                  type: 'row',
                  fields: [testo('numero', 'Numero romano'), testo('kicker', 'Kicker')],
                },
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                immagine('immagine', 'Immagine'),
              ],
            },
            {
              name: 'materia',
              type: 'group',
              label: 'La materia',
              fields: [
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                {
                  name: 'schede',
                  type: 'array',
                  label: 'Schede',
                  maxRows: 3,
                  fields: [immagine('immagine', 'Immagine'), testo('titolo', 'Titolo'), area('testo', 'Testo')],
                },
                numeri('numeri', 'Numeri'),
              ],
            },
          ],
        },
        {
          label: 'Designer e prodotti',
          fields: [
            {
              name: 'designer',
              type: 'group',
              label: 'I designer',
              fields: [
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                {
                  name: 'elenco',
                  type: 'relationship',
                  relationTo: 'designer',
                  hasMany: true,
                  label: 'Designer da mostrare',
                },
                {
                  name: 'segnaposto',
                  type: 'number',
                  label: 'Card segnaposto "ritratto designer da fornire"',
                  defaultValue: 0,
                  min: 0,
                  max: 6,
                },
              ],
            },
            {
              name: 'collezioni',
              type: 'group',
              label: 'Collezioni',
              fields: [
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                {
                  name: 'tessere',
                  type: 'array',
                  label: 'Tessere',
                  maxRows: 4,
                  fields: [testo('etichetta', 'Etichetta', { required: true }), immagine('immagine', 'Immagine'), link('link', 'Link')],
                },
              ],
            },
            {
              name: 'portfolio',
              type: 'group',
              label: 'Portfolio prodotti',
              fields: [
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                {
                  name: 'prodotti',
                  type: 'relationship',
                  relationTo: 'prodotti',
                  hasMany: true,
                  label: 'Prodotti da mostrare',
                },
              ],
            },
            {
              name: 'citazione',
              type: 'group',
              label: 'Citazione',
              fields: [area('testo', 'Citazione'), testo('firma', 'Firma'), immagine('immagine', 'Immagine (quadrata)')],
            },
          ],
        },
        {
          label: 'Invito',
          fields: [
            {
              name: 'invito',
              type: 'group',
              label: 'Raccontateci il vostro luogo',
              fields: [
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                testo('pulsante', 'Testo del pulsante', { defaultValue: 'Richiedi il volume' }),
                area('grazie', 'Messaggio dopo l’invio', {
                  defaultValue: 'Grazie: vi ricontatteremo a breve con il volume Serralunga.',
                }),
                immagine('immagine', 'Immagine di sfondo'),
              ],
            },
          ],
        },
      ],
    },
    seoField,
  ],
}
