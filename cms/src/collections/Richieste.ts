import type { Access, CollectionConfig } from 'payload'

import { soloRedazione } from '../access'

/** Le richieste arrivano dal sito Astro, che si presenta con la chiave condivisa SITO_CHIAVE. */
const dalSitoOppureRedazione: Access = ({ req }) => {
  if (req.user) return true
  const chiave = process.env.SITO_CHIAVE
  return Boolean(chiave) && req.headers.get('x-sito-chiave') === chiave
}

/**
 * Version: 1.01
 * Richieste arrivate dai moduli del sito (home, preventivi, cataloghi Contract, pagine con modulo).
 * Avviso alla redazione ed email di conferma al cliente partono da /api/moduli/richiesta (moduli/endpoints.ts).
 */
export const Richieste: CollectionConfig = {
  slug: 'richieste',
  labels: { singular: 'Richiesta', plural: 'Richieste' },
  admin: {
    useAsTitle: 'struttura',
    group: 'Contatti',
    defaultColumns: ['struttura', 'referente', 'email', 'citta', 'stato', 'createdAt'],
  },
  defaultSort: '-createdAt',
  access: {
    create: dalSitoOppureRedazione,
    read: soloRedazione,
    update: soloRedazione,
    delete: soloRedazione,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'struttura', type: 'text', label: 'Struttura o studio' },
        { name: 'referente', type: 'text', label: 'Referente' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'citta', type: 'text', label: 'Città del progetto' },
      ],
    },
    { name: 'messaggio', type: 'textarea', label: 'Messaggio' },
    { name: 'pagina', type: 'text', label: 'Pagina di provenienza', admin: { readOnly: true } },
    {
      name: 'stato',
      type: 'select',
      label: 'Stato',
      defaultValue: 'nuova',
      options: [
        { label: 'Nuova', value: 'nuova' },
        { label: 'In lavorazione', value: 'lavorazione' },
        { label: 'Gestita', value: 'gestita' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'lingua',
      type: 'select',
      label: 'Lingua',
      defaultValue: 'it',
      options: [
        { label: 'Italiano', value: 'it' },
        { label: 'English', value: 'en' },
      ],
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      type: 'collapsible',
      label: 'Consensi',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'privacyIl', type: 'date', label: 'Privacy accettata il', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'newsletter', type: 'checkbox', label: 'Ha chiesto la newsletter', admin: { readOnly: true } },
        { name: 'emailCliente', type: 'checkbox', label: 'Email di conferma inviata al cliente', admin: { readOnly: true } },
      ],
    },
  ],
}
