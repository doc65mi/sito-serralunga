import type { CollectionConfig } from 'payload'

import { pubblicatiOppureRedazione, soloRedazione } from '../access'
import { CATEGORIE_INSTALLAZIONI } from '../globals/PaginaInstallazioni'
import { area, coppie, immagine, ordine, paragrafi, seoField, slugField, testo } from '../fields'

/** Template: template/Case History - La Loge du Massif.dc.html */
export const CaseHistory: CollectionConfig = {
  slug: 'case-history',
  labels: { singular: 'Case history', plural: 'Case history' },
  admin: {
    useAsTitle: 'nome',
    group: 'Contenuti',
    defaultColumns: ['nome', 'card.etichetta', '_status'],
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
    testo('nome', 'Nome del progetto', { required: true }),
    slugField('nome'),
    ordine,
    {
      name: 'categoria',
      type: 'select',
      label: 'Categoria (pagina Installazioni)',
      options: CATEGORIE_INSTALLAZIONI,
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Apertura',
          fields: [
            testo('kicker', 'Kicker', { admin: { description: 'Es. Case history — Courmayeur, Valle d’Aosta' } }),
            area('titolo', 'Titolo (H1)', { admin: { description: 'Se vuoto si usa il nome.' } }),
            area('introduzione', 'Introduzione'),
            testo('etichetta', 'Etichetta a destra', { admin: { description: 'Es. Poltrone Canisse' } }),
            immagine('immagine', 'Immagine a tutto schermo'),
          ],
        },
        {
          label: 'Card',
          fields: [
            {
              name: 'card',
              type: 'group',
              label: 'Card negli elenchi',
              fields: [
                testo('etichetta', 'Etichetta', { admin: { description: 'Es. Ristorazione · Courmayeur' } }),
                testo('titolo', 'Titolo'),
                immagine('immagine', 'Immagine (4:3)', {
                  admin: { description: 'Se vuota si usa l’immagine di apertura.' },
                }),
              ],
            },
          ],
        },
        {
          label: 'Racconto',
          fields: [
            {
              name: 'progetto',
              type: 'group',
              label: 'Il progetto',
              fields: [
                testo('kicker', 'Kicker', { defaultValue: 'Il progetto' }),
                area('titolo', 'Titolo'),
                paragrafi('paragrafi', 'Paragrafi'),
                coppie('scheda', 'Scheda del progetto'),
              ],
            },
            {
              name: 'citazione',
              type: 'group',
              label: 'Citazione su foto',
              fields: [area('testo', 'Citazione'), immagine('immagine', 'Immagine')],
            },
            {
              name: 'passi',
              type: 'array',
              label: 'Sfida, scelta, risultato',
              maxRows: 3,
              labels: { singular: 'Passo', plural: 'Passi' },
              fields: [testo('titolo', 'Titolo', { required: true }), area('testo', 'Testo')],
            },
            {
              name: 'coppiaImmagini',
              type: 'array',
              label: 'Coppia di immagini',
              maxRows: 2,
              fields: [
                immagine('immagine', 'Immagine', { required: true }),
                {
                  name: 'allineamento',
                  type: 'select',
                  label: 'Punto da mantenere',
                  defaultValue: 'centro',
                  options: [
                    { label: 'Centro', value: 'centro' },
                    { label: 'Alto', value: 'alto' },
                    { label: 'Basso', value: 'basso' },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Prodotto e diario',
          fields: [
            {
              name: 'protagonista',
              type: 'group',
              label: 'Il pezzo protagonista',
              fields: [
                testo('kicker', 'Kicker', { defaultValue: 'Il pezzo protagonista' }),
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                coppie('dati', 'Dati'),
                immagine('immagine', 'Immagine (16:9)'),
              ],
            },
            {
              name: 'diario',
              type: 'group',
              label: 'Diario della stagione',
              fields: [
                area('titolo', 'Titolo', { defaultValue: 'Il diario\ndella stagione' }),
                area('testo', 'Testo'),
                {
                  name: 'immagini',
                  type: 'array',
                  label: 'Scatti',
                  fields: [immagine('immagine', 'Immagine', { required: true })],
                },
                testo('segnaposto', 'Testo della card finale (vuoto = nessuna card)', {
                  defaultValue: 'altri scatti\nin alta risoluzione',
                }),
              ],
            },
            {
              name: 'prodottiUsati',
              type: 'group',
              label: 'Prodotti utilizzati',
              fields: [
                testo('kicker', 'Kicker', { defaultValue: 'Prodotti utilizzati' }),
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
                {
                  name: 'voci',
                  type: 'array',
                  label: 'Prodotti',
                  fields: [
                    { name: 'prodotto', type: 'relationship', relationTo: 'prodotti', label: 'Prodotto (facoltativo)' },
                    testo('nome', 'Nome', { required: true }),
                    testo('sottotitolo', 'Sottotitolo'),
                    testo('nota', 'Nota', { admin: { description: 'Es. quantità in opera da confermare' } }),
                    immagine('immagine', 'Immagine (4:3)'),
                    testo('segnapostoImmagine', 'Testo al posto dell’immagine mancante'),
                  ],
                },
              ],
            },
            {
              name: 'contatto',
              type: 'group',
              label: 'Invito finale',
              fields: [
                testo('kicker', 'Kicker', { defaultValue: 'Il prossimo progetto' }),
                area('titolo', 'Titolo'),
                area('testo', 'Testo'),
              ],
            },
          ],
        },
      ],
    },
    seoField,
  ],
}
