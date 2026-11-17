import type { GlobalConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblico, soloRedazione } from '../access'
import { area, immagine, link, numeri, seoField, testo } from '../fields'

/** Template: template/Serralunga Contract Home - Hero fullscreen.dc.html */
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
            {
              name: 'hero',
              type: 'group',
              label: 'Immagine a tutto schermo',
              admin: {
                description:
                  'L’immagine è sempre visibile. Se carichi un video (mp4, muto) parte in loop sopra l’immagine e compare il pulsante play/pausa.',
              },
              fields: [
                immagine('immagine', 'Immagine a tutto schermo'),
                immagine('video', 'Video facoltativo (mp4, muto, in loop)'),
                {
                  name: 'notaVideo',
                  type: 'checkbox',
                  label: 'Mostra la nota "video da fornire" finché manca il video',
                  defaultValue: false,
                },
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo grande (H1)', { required: true }),
                area('testo', 'Testo'),
                { type: 'row', fields: [testo('link1Etichetta', 'Primo pulsante'), link('link1', 'Link')] },
                { type: 'row', fields: [testo('link2Etichetta', 'Secondo pulsante (pieno)'), link('link2', 'Link')] },
              ],
            },
          ],
        },
        {
          label: 'Progetti e chi siamo',
          fields: [
            {
              name: 'progetti',
              type: 'array',
              label: 'Tre ambiti (01, 02, 03)',
              maxRows: 3,
              labels: { singular: 'Ambito', plural: 'Ambiti' },
              fields: [testo('titolo', 'Titolo', { required: true }), area('testo', 'Testo'), link('link', 'Link della freccia')],
            },
            {
              name: 'chiSiamo',
              type: 'group',
              label: 'Chi siamo',
              fields: [
                testo('sfondo', 'Numero grande sullo sfondo', { localized: false, defaultValue: '1825' }),
                immagine('immagine', 'Immagine (verticale 3:4)'),
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                {
                  name: 'punti',
                  type: 'array',
                  label: 'Punti numerati',
                  maxRows: 6,
                  fields: [testo('testo', 'Testo', { required: true })],
                },
                { type: 'row', fields: [testo('pulsante', 'Testo del pulsante'), link('link', 'Link')] },
              ],
            },
            numeri('numeri', 'Numeri (fascia scura)'),
          ],
        },
        {
          label: 'Installazioni',
          fields: [
            {
              name: 'installazioni',
              type: 'group',
              label: 'Installazioni',
              fields: [
                testo('sfondo', 'Parola grande sullo sfondo'),
                area('testoSinistra', 'Testo a sinistra'),
                area('testoDestra', 'Testo a destra'),
                {
                  name: 'voci',
                  type: 'array',
                  label: 'Ambientazioni',
                  labels: { singular: 'Ambientazione', plural: 'Ambientazioni' },
                  fields: [
                    immagine('immagine', 'Immagine'),
                    testo('titolo', 'Titolo', { required: true }),
                    testo('sottotitolo', 'Luogo e prodotti'),
                    {
                      type: 'row',
                      fields: [
                        {
                          name: 'categoria',
                          type: 'select',
                          label: 'Categoria (filtro)',
                          defaultValue: 'hotel',
                          options: [
                            { label: 'Hotel', value: 'hotel' },
                            { label: 'Ristorazione', value: 'risto' },
                            { label: 'Spa & Piscine', value: 'spa' },
                            { label: 'Residenze', value: 'resid' },
                          ],
                        },
                        {
                          name: 'formato',
                          type: 'select',
                          label: 'Formato nella griglia',
                          defaultValue: 'media',
                          options: [
                            { label: 'Alta (due righe)', value: 'alta' },
                            { label: 'Bassa', value: 'bassa' },
                            { label: 'Media', value: 'media' },
                            { label: 'Larga (due colonne)', value: 'larga' },
                          ],
                        },
                      ],
                    },
                    link('link', 'Link'),
                  ],
                },
                { type: 'row', fields: [testo('pulsante', 'Testo del pulsante'), link('link', 'Link')] },
              ],
            },
          ],
        },
        {
          label: 'Collezioni e contract',
          fields: [
            {
              name: 'collezioni',
              type: 'group',
              label: 'Le collezioni',
              fields: [
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                {
                  name: 'tessere',
                  type: 'array',
                  label: 'Tessere',
                  maxRows: 4,
                  fields: [
                    testo('etichetta', 'Etichetta', { required: true }),
                    immagine('immagine', 'Immagine'),
                    { name: 'scritta', type: 'select', label: 'Colore della scritta', defaultValue: 'scura', options: [{ label: 'Scura', value: 'scura' }, { label: 'Chiara (su foto scure)', value: 'chiara' }] },
                    link('link', 'Link'),
                  ],
                },
              ],
            },
            {
              name: 'contract',
              type: 'group',
              label: 'Serralunga Contract',
              fields: [
                immagine('immagine', 'Immagine'),
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo'),
                {
                  name: 'servizi',
                  type: 'array',
                  label: 'Servizi numerati',
                  maxRows: 6,
                  fields: [testo('titolo', 'Titolo', { required: true }), area('testo', 'Testo')],
                },
              ],
            },
          ],
        },
        {
          label: 'Catalogo',
          fields: [
            {
              name: 'catalogo',
              type: 'group',
              label: 'Richiesta catalogo e listino',
              fields: [
                {
                  name: 'box',
                  type: 'array',
                  label: 'Quattro box (immagine, titolo, link)',
                  maxRows: 4,
                  labels: { singular: 'Box', plural: 'Box' },
                  fields: [immagine('immagine', 'Immagine'), testo('titolo', 'Titolo', { required: true }), link('link', 'Link')],
                },
                immagine('immagine', 'Immagine del catalogo'),
                testo('kicker', 'Kicker'),
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                testo('pulsante', 'Testo del pulsante', { defaultValue: 'Richiedi il catalogo' }),
                area('grazie', 'Messaggio dopo l’invio', {
                  defaultValue: 'Grazie: vi invieremo catalogo, cartella colori e schede tecniche.',
                }),
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
