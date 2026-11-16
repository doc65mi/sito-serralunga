import type { CollectionConfig, Field } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblicatiOppureRedazione, soloRedazione } from '../access'
import { CATEGORIE_INSTALLAZIONI } from '../globals/PaginaInstallazioni'
import { area, immagine, link, ordine, seoField, testo } from '../fields'

/**
 * Sezione Contract (Version: 1.00): /contract/ e le sue sottopagine, una scheda per pagina.
 * Indirizzo fisso per sezione (alberatura: progetto/Serralunga_Alberatura_B2C_2026.docx.pdf).
 * Ogni parte della scheda compare solo se compilata: la stessa struttura serve alla pagina
 * principale, agli ambiti (hospitality, residenziale, urbano), ai cataloghi e all'area riservata.
 */
export const SEZIONI_CONTRACT = [
  { label: 'Contract (pagina principale)', value: 'principale' },
  { label: 'Hospitality', value: 'hospitality' },
  { label: 'Residenziale', value: 'residenziale' },
  { label: 'Urbano', value: 'urbano' },
  { label: 'Cataloghi', value: 'cataloghi' },
  { label: 'Area riservata', value: 'area-riservata' },
] as const

/** Indirizzo pubblico di una sezione. */
export const percorsoContract = (sezione?: string | null) =>
  !sezione || sezione === 'principale' ? '/contract/' : `/contract/${sezione}/`

const intestazione: Field[] = [testo('kicker', 'Kicker'), area('titolo', 'Titolo')]

export const Contract: CollectionConfig = {
  slug: 'contract',
  labels: { singular: 'Pagina Contract', plural: 'Contract' },
  admin: {
    useAsTitle: 'nome',
    group: 'Pagine',
    defaultColumns: ['nome', 'sezione', '_status'],
    description: 'La sezione B2B del sito: pagina principale e sottopagine, una scheda per indirizzo.',
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
    testo('nome', 'Nome (menu e percorso)', { required: true }),
    {
      name: 'sezione',
      type: 'select',
      label: 'Indirizzo',
      required: true,
      unique: true,
      index: true,
      options: [...SEZIONI_CONTRACT],
      admin: { position: 'sidebar', description: 'Pagina principale: /contract/. Le altre: /contract/{sezione}/.' },
    },
    ordine,
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Apertura',
          fields: [
            testo('kicker', 'Kicker'),
            area('titolo', 'Titolo (H1)', { required: true }),
            area('testo', 'Introduzione'),
            immagine('immagine', 'Immagine di apertura'),
            area('estratto', 'Testo della card', {
              admin: { description: 'Compare nella pagina principale, nella card che porta a questa sottopagina.' },
            }),
          ],
        },
        {
          label: 'Punti di forza',
          fields: [
            {
              name: 'punti',
              type: 'group',
              label: 'Punti di forza numerati',
              fields: [
                ...intestazione,
                {
                  name: 'voci',
                  type: 'array',
                  label: 'Voci',
                  maxRows: 6,
                  labels: { singular: 'Voce', plural: 'Voci' },
                  fields: [testo('titolo', 'Titolo', { required: true }), area('testo', 'Testo')],
                },
              ],
            },
          ],
        },
        {
          label: 'Galleria',
          fields: [
            {
              name: 'galleria',
              type: 'group',
              label: 'Galleria di progetti',
              fields: [
                ...intestazione,
                {
                  name: 'voci',
                  type: 'array',
                  label: 'Foto',
                  labels: { singular: 'Foto', plural: 'Foto' },
                  fields: [immagine('immagine', 'Immagine', { required: true }), testo('didascalia', 'Didascalia')],
                },
              ],
            },
          ],
        },
        {
          label: 'Case history',
          fields: [
            {
              name: 'casi',
              type: 'group',
              label: 'Case history collegate',
              admin: { description: 'Le case history delle categorie scelte compaiono da sole, nell’ordine del pannello.' },
              fields: [
                ...intestazione,
                { name: 'categorie', type: 'select', hasMany: true, label: 'Categorie', options: CATEGORIE_INSTALLAZIONI },
              ],
            },
          ],
        },
        {
          label: 'Prodotti',
          fields: [
            {
              name: 'prodotti',
              type: 'group',
              label: 'Prodotti consigliati',
              fields: [
                ...intestazione,
                area('testo', 'Testo'),
                {
                  name: 'voci',
                  type: 'array',
                  label: 'Prodotti',
                  labels: { singular: 'Prodotto', plural: 'Prodotti' },
                  admin: { description: 'Un prodotto del sito oppure una scheda di serralunga.com con nome e foto.' },
                  fields: [
                    { name: 'prodotto', type: 'relationship', relationTo: 'prodotti', label: 'Prodotto del sito' },
                    link('url', 'Indirizzo (se non è un prodotto del sito)'),
                    testo('nome', 'Nome'),
                    testo('tipo', 'Tipologia'),
                    immagine('immagine', 'Foto'),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Cataloghi',
          fields: [
            {
              name: 'cataloghi',
              type: 'group',
              label: 'Cataloghi da scaricare',
              admin: {
                description:
                  'Con «Mostra i cataloghi» la pagina elenca i PDF e li consegna dopo il modulo (raccolta contatti). Senza voci si usano i quattro box della home.',
              },
              fields: [
                { name: 'mostra', type: 'checkbox', label: 'Mostra i cataloghi', defaultValue: false },
                ...intestazione,
                area('testo', 'Testo'),
                {
                  name: 'voci',
                  type: 'array',
                  label: 'Cataloghi',
                  labels: { singular: 'Catalogo', plural: 'Cataloghi' },
                  fields: [testo('titolo', 'Titolo', { required: true }), immagine('immagine', 'Copertina'), link('file', 'Indirizzo del PDF')],
                },
                area('dopoInvio', 'Testo sopra i link dopo l’invio'),
              ],
            },
          ],
        },
        {
          label: 'Accesso',
          fields: [
            {
              name: 'accesso',
              type: 'group',
              label: 'Accesso all’area riservata',
              fields: [
                ...intestazione,
                area('testo', 'Testo'),
                { type: 'row', fields: [testo('pulsante', 'Testo del pulsante'), link('link', 'Indirizzo dell’area riservata')] },
                area('nota', 'Nota sotto il pulsante'),
              ],
            },
          ],
        },
        {
          label: 'Invito finale',
          fields: [
            {
              name: 'cta',
              type: 'group',
              label: 'Invito finale con modulo',
              fields: [
                ...intestazione,
                area('testo', 'Testo'),
                testo('pulsante', 'Testo del pulsante del modulo'),
                area('grazie', 'Messaggio dopo l’invio'),
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
