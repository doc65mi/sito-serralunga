import type { GlobalConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'
import { area, immagine, link, testo } from '../fields'

/** Header, footer e dati del cliente (fonte: file-md/cliente.md). */
export const Impostazioni: GlobalConfig = {
  slug: 'impostazioni',
  label: 'Impostazioni del sito',
  admin: { group: 'Impostazioni' },
  access: { read: pubblico, update: soloRedazione },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Marchio',
          fields: [
            immagine('logo', 'Logo', {
              admin: { description: 'PNG o SVG su fondo trasparente. Il sito lo rende nero o bianco in automatico.' },
            }),
            testo('nomeSito', 'Nome del sito', { defaultValue: 'Serralunga' }),
            {
              name: 'accento',
              type: 'select',
              label: 'Colore d’accento',
              defaultValue: '#A08A5F',
              options: [
                { label: 'Oro (predefinito)', value: '#A08A5F' },
                { label: 'Salvia', value: '#8C8B7A' },
                { label: 'Bronzo', value: '#7C6A4E' },
                { label: 'Terracotta', value: '#B4553B' },
              ],
            },
            {
              name: 'rivelaAlloScorrimento',
              type: 'checkbox',
              label: 'Sezioni che compaiono allo scorrimento',
              defaultValue: true,
            },
            {
              name: 'mostraDidascalie',
              type: 'checkbox',
              label: 'Mostra le didascalie (designer, collezioni)',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Menu',
          fields: [
            {
              name: 'barra',
              type: 'group',
              label: 'Barra scura sopra il menu (home)',
              fields: [
                testo('testo', 'Testo a sinistra'),
                { type: 'row', fields: [testo('linkEtichetta', 'Link a destra'), link('link', 'Indirizzo')] },
              ],
            },
            {
              name: 'menu',
              type: 'array',
              label: 'Voci del menu',
              labels: { singular: 'Voce', plural: 'Voci' },
              fields: [
                {
                  type: 'row',
                  fields: [testo('etichetta', 'Etichetta', { required: true }), link('link', 'Link')],
                },
                { name: 'evidenza', type: 'checkbox', label: 'In evidenza (pulsante con bordo in home, colore d’accento nelle altre pagine)' },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            area('descrizione', 'Descrizione sotto il logo'),
            {
              name: 'colonne',
              type: 'array',
              label: 'Colonne di link',
              maxRows: 3,
              fields: [
                testo('titolo', 'Titolo', { required: true }),
                {
                  name: 'link',
                  type: 'array',
                  label: 'Link',
                  fields: [
                    {
                      type: 'row',
                      fields: [testo('etichetta', 'Etichetta', { required: true }), link('link', 'Link')],
                    },
                  ],
                },
              ],
            },
            testo('copyright', 'Copyright', { defaultValue: '© {anno} Serralunga' }),
            {
              name: 'legali',
              type: 'array',
              label: 'Link legali',
              fields: [
                {
                  type: 'row',
                  fields: [testo('etichetta', 'Etichetta', { required: true }), link('link', 'Link')],
                },
              ],
            },
          ],
        },
        {
          label: 'Dati aziendali',
          description: 'Fonte unica dei dati: file-md/cliente.md. Usati in footer e dati strutturati.',
          fields: [
            {
              name: 'azienda',
              type: 'group',
              label: 'Azienda',
              fields: [
                { type: 'row', fields: [testo('ragioneSociale', 'Ragione sociale'), testo('marchio', 'Marchio')] },
                { type: 'row', fields: [testo('indirizzo', 'Indirizzo'), testo('cap', 'CAP'), testo('citta', 'Città')] },
                { type: 'row', fields: [testo('provincia', 'Provincia'), testo('paese', 'Paese')] },
                { type: 'row', fields: [testo('telefono', 'Telefono'), { name: 'email', type: 'email', label: 'Email' }] },
                { type: 'row', fields: [testo('piva', 'P.IVA / C.F.'), testo('rea', 'REA')] },
                testo('fondazione', 'Anno di fondazione'),
                link('sitoUfficiale', 'Sito ufficiale'),
              ],
            },
          ],
        },
      ],
    },
  ],
}
