import type { CollectionConfig } from 'payload'

import { pubblicatiOppureRedazione, soloRedazione } from '../access'
import { blocchiField } from '../blocchi'
import { area, immagine, seoField, slugField, testo } from '../fields'

/**
 * Version: 1.00
 * Journal: storie, guide, designer e progetti (progetto/Serralunga_Alberatura_B2C_2026).
 * Gli articoli possono arrivare anche da una piattaforma esterna (ContentAIPro) come bozze:
 * vedi Impostazioni > Intelligenza artificiale e /api/ricevi-articoli.
 */
export const CATEGORIE_ARTICOLI = [
  { label: 'Storie', value: 'storie' },
  { label: 'Guide', value: 'guide' },
  { label: 'Designer', value: 'designer' },
  { label: 'Progetti', value: 'progetti' },
] as const

export const Articoli: CollectionConfig = {
  slug: 'articoli',
  labels: { singular: 'Articolo', plural: 'Articoli (Journal)' },
  admin: { useAsTitle: 'titolo', group: 'Contenuti', defaultColumns: ['titolo', 'categoria', 'data', 'origine', '_status'] },
  defaultSort: '-data',
  versions: { drafts: true },
  access: { read: pubblicatiOppureRedazione, create: soloRedazione, update: soloRedazione, delete: soloRedazione },
  fields: [
    testo('titolo', 'Titolo', { required: true }),
    slugField('titolo'),
    { name: 'categoria', type: 'select', label: 'Categoria', defaultValue: 'storie', options: [...CATEGORIE_ARTICOLI], admin: { position: 'sidebar' } },
    { name: 'data', type: 'date', label: 'Data', admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'dd/MM/yyyy' } } },
    testo('autore', 'Autore', { localized: false, admin: { position: 'sidebar' } }),
    {
      name: 'origine',
      type: 'select',
      label: 'Origine',
      defaultValue: 'redazione',
      options: [{ label: 'Redazione', value: 'redazione' }, { label: 'Piattaforma esterna', value: 'esterna' }],
      admin: { position: 'sidebar', readOnly: true },
    },
    area('estratto', 'Sommario', { admin: { description: 'Due o tre righe: compaiono nell’elenco e in testa all’articolo. Devono rispondere da sole alla domanda del titolo.' } }),
    immagine('immagine', 'Immagine principale'),
    {
      name: 'corpo',
      type: 'textarea',
      label: 'Testo',
      localized: true,
      admin: {
        rows: 24,
        description: 'Si scrive in Markdown: ## per i titoli di sezione, ### per i sottotitoli, righe che iniziano con - per gli elenchi, [testo](indirizzo) per i link. Si accetta anche HTML semplice.',
      },
    },
    {
      name: 'domande',
      type: 'array',
      label: 'Domande e risposte',
      labels: { singular: 'Domanda', plural: 'Domande' },
      admin: { description: 'Facoltative: vengono mostrate in fondo e segnalate come FAQ.' },
      fields: [testo('domanda', 'Domanda', { required: true }), area('risposta', 'Risposta', { required: true })],
    },
    { name: 'prodotti', type: 'relationship', relationTo: 'prodotti', hasMany: true, label: 'Prodotti citati' },
    { name: 'designer', type: 'relationship', relationTo: 'designer', hasMany: true, label: 'Designer citati' },
    blocchiField,
    seoField,
  ],
}
