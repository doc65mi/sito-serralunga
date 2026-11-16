import type { Field, GlobalConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblico, soloRedazione } from '../access'
import { area, immagine, link, numeri, seoField, testo } from '../fields'

/** Pulsanti con testo e indirizzo, modificabili anche dalla pagina. */
export const pulsanti = (name = 'pulsanti', label = 'Pulsanti'): Field => ({
  name,
  label,
  type: 'array',
  maxRows: 3,
  labels: { singular: 'Pulsante', plural: 'Pulsanti' },
  fields: [{ type: 'row', fields: [testo('testo', 'Testo', { required: true }), link('link', 'Link')] }],
})

/** Voci con titolo e testo (primati, qualità, caratteristiche). */
export const voci = (name = 'voci', label = 'Voci'): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular: 'Voce', plural: 'Voci' },
  fields: [testo('titolo', 'Titolo', { required: true }), area('testo', 'Testo')],
})

/**
 * Pagina Heritage (Version: 1.00), ex "Mondo Serralunga".
 * Contenuti da serralunga.com/pages/loriginale-vaso-italiano-in-polietilene:
 * apertura, numeri, timeline "200 anni in evoluzione", primati, qualità, citazione,
 * Made in Italy, collezioni, invito finale. Le sottopagine stanno nella collezione "Heritage, sottopagine".
 */
export const PaginaHeritage: GlobalConfig = {
  slug: 'pagina-heritage',
  label: 'Heritage',
  admin: { group: 'Pagine' },
  access: { read: pubblico, update: soloRedazione },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Apertura',
          fields: [
            testo('kicker', 'Kicker'),
            area('titolo', 'Titolo (H1)', { required: true }),
            area('sottotitolo', 'Sottotitolo'),
            area('testo', 'Introduzione'),
            immagine('immagine', 'Immagine di apertura'),
            pulsanti(),
            numeri('numeri', 'Dati chiave'),
          ],
        },
        {
          label: 'Timeline',
          fields: [
            {
              name: 'timeline',
              type: 'group',
              label: '200 anni in evoluzione',
              fields: [
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo'),
                area('testo', 'Introduzione'),
                {
                  name: 'tappe',
                  type: 'array',
                  label: 'Tappe',
                  labels: { singular: 'Tappa', plural: 'Tappe' },
                  admin: { description: 'In ordine cronologico. L’anno è il testo grande (1825, Anni ’90, Verso il 2027…).' },
                  fields: [
                    { type: 'row', fields: [testo('anno', 'Anno', { required: true }), testo('titolo', 'Titolo', { required: true })] },
                    area('testo', 'Testo'),
                    immagine('immagine', 'Immagine'),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Primati e qualità',
          fields: [
            {
              name: 'primati',
              type: 'group',
              label: 'Primati',
              fields: [testo('kicker', 'Kicker'), area('titolo', 'Titolo'), voci()],
            },
            {
              name: 'designer',
              type: 'group',
              label: 'Designer',
              admin: { description: 'L’elenco dei designer si compone da solo dalle schede pubblicate.' },
              fields: [testo('kicker', 'Kicker'), area('titolo', 'Titolo'), area('testo', 'Testo'), testo('pulsante', 'Pulsante')],
            },
            {
              name: 'qualita',
              type: 'group',
              label: 'Qualità',
              fields: [testo('kicker', 'Kicker'), area('titolo', 'Titolo'), area('testo', 'Testo'), immagine('immagine', 'Immagine'), voci()],
            },
            {
              name: 'citazione',
              type: 'group',
              label: 'Citazione',
              fields: [area('testo', 'Citazione'), testo('autore', 'Autore'), immagine('immagine', 'Immagine')],
            },
          ],
        },
        {
          label: 'Made in Italy e collezioni',
          fields: [
            {
              name: 'produzione',
              type: 'group',
              label: 'Made in Italy',
              fields: [
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                immagine('immagine', 'Immagine'),
                {
                  name: 'punti',
                  type: 'array',
                  label: 'Punti',
                  labels: { singular: 'Punto', plural: 'Punti' },
                  fields: [testo('testo', 'Testo', { required: true })],
                },
                { type: 'row', fields: [testo('pulsante', 'Pulsante'), link('link', 'Link')] },
              ],
            },
            {
              name: 'sottopagine',
              type: 'group',
              label: 'Le sottopagine',
              admin: { description: 'Le card si compongono da sole dalla collezione "Heritage, sottopagine".' },
              fields: [testo('kicker', 'Kicker'), area('titolo', 'Titolo')],
            },
            {
              name: 'collezioni',
              type: 'group',
              label: 'Collezioni',
              fields: [
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo'),
                {
                  name: 'voci',
                  type: 'array',
                  label: 'Collezioni',
                  maxRows: 6,
                  labels: { singular: 'Collezione', plural: 'Collezioni' },
                  fields: [
                    { type: 'row', fields: [testo('titolo', 'Titolo', { required: true }), testo('sottotitolo', 'Sottotitolo')] },
                    immagine('immagine', 'Immagine'),
                    link('link', 'Link'),
                  ],
                },
              ],
            },
            {
              name: 'cta',
              type: 'group',
              label: 'Invito finale',
              fields: [testo('kicker', 'Kicker'), area('titolo', 'Titolo'), area('testo', 'Testo'), pulsanti()],
            },
          ],
        },
      ],
    },
    blocchiField,
    seoField,
  ],
}
