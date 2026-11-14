import type { CollectionConfig } from 'payload'

import { pubblicatiOppureRedazione, soloRedazione } from '../access'
import { area, immagine, numeri, ordine, paragrafi, seoField, slugField, testo } from '../fields'

/** Template: template/Designer - Marc Sadler.dc.html (scheda) e Designer.dc.html (elenco). */
export const Designer: CollectionConfig = {
  slug: 'designer',
  labels: { singular: 'Designer', plural: 'Designer' },
  admin: {
    useAsTitle: 'nome',
    group: 'Contenuti',
    defaultColumns: ['nome', 'ruolo', 'schedaPubblicata', 'ordine', '_status'],
  },
  defaultSort: 'ordine',
  versions: { drafts: true },
  access: {
    read: pubblicatiOppureRedazione,
    create: soloRedazione,
    update: soloRedazione,
    delete: soloRedazione,
  },
  fields: [
    testo('nome', 'Nome', { required: true }),
    slugField('nome'),
    ordine,
    {
      name: 'schedaPubblicata',
      type: 'checkbox',
      label: 'Ha una scheda propria',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description:
          'Se spento, la card mostra "Scheda in arrivo" e porta alla richiesta contatti invece che alla scheda.',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card e ritratto',
          fields: [
            {
              type: 'row',
              fields: [
                testo('ruolo', 'Ruolo', { admin: { description: 'Es. Designer, Architetto.' } }),
                testo('provenienza', 'Kicker della scheda', {
                  admin: { description: 'Es. Designer · Francia / Italia' },
                }),
              ],
            },
            immagine('ritratto', 'Ritratto'),
            {
              name: 'ritrattoProvvisorio',
              type: 'checkbox',
              label: 'Ritratto provvisorio (piccolo e tondo, con nota "da fornire")',
              defaultValue: false,
            },
            area('estratto', 'Testo della card (pagina designer)'),
            area('estrattoHome', 'Testo della card in home', {
              admin: { description: 'Se vuoto si usa il testo della card.' },
            }),
          ],
        },
        {
          label: 'Scheda',
          fields: [
            area('citazione', 'Citazione'),
            paragrafi('biografia', 'Biografia'),
            numeri('numeri', 'Numeri'),
            {
              name: 'premi',
              type: 'array',
              label: 'Premi e mostre',
              labels: { singular: 'Premio', plural: 'Premi' },
              fields: [
                {
                  type: 'row',
                  fields: [testo('anno', 'Anno', { required: true }), testo('titolo', 'Titolo', { required: true })],
                },
              ],
            },
            {
              name: 'banner',
              type: 'group',
              label: 'Fascia fotografica',
              fields: [immagine('immagine', 'Immagine'), area('frase', 'Frase')],
            },
            testo('titoloPezzi', 'Titolo della sezione prodotti', {
              defaultValue: 'I pezzi\nper Serralunga',
            }),
            {
              name: 'pezziSegnaposto',
              type: 'number',
              label: 'Card segnaposto "altri pezzi da confermare"',
              defaultValue: 0,
              min: 0,
              max: 4,
            },
            {
              name: 'cta',
              type: 'group',
              label: 'Invito finale',
              fields: [
                testo('kicker', 'Kicker', { defaultValue: 'Progetti su misura' }),
                area('titolo', 'Titolo', { defaultValue: 'Lavoriamo con i designer,\nper il vostro luogo' }),
              ],
            },
          ],
        },
      ],
    },
    seoField,
  ],
}
