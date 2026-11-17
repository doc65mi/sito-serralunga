import type { CollectionConfig } from 'payload'

import { soloRedazione } from '../access'

/**
 * Version: 1.00
 * Iscritti alla newsletter: dal footer («Iscriviti alla newsletter») e dalla casella facoltativa
 * dei moduli. Si registrano data, pagina e IP del consenso (prova richiesta dal GDPR).
 * Con la doppia conferma lo stato resta «In attesa» finché l'iscritto non apre il link dell'email.
 * Le iscrizioni arrivano solo dall'endpoint /api/moduli/newsletter (chiave del sito).
 */
export const IscrittiNewsletter: CollectionConfig = {
  slug: 'iscritti-newsletter',
  labels: { singular: 'Iscritto newsletter', plural: 'Iscritti newsletter' },
  admin: {
    useAsTitle: 'email',
    group: 'Contatti',
    defaultColumns: ['email', 'nome', 'azienda', 'stato', 'lingua', 'createdAt'],
    description: 'Per esportare: selezionare le righe e usare l’elenco, oppure filtrare per stato «Iscritto».',
  },
  defaultSort: '-createdAt',
  access: { create: soloRedazione, read: soloRedazione, update: soloRedazione, delete: soloRedazione },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', label: 'Email', required: true, unique: true, index: true },
        { name: 'nome', type: 'text', label: 'Nome e cognome' },
        { name: 'azienda', type: 'text', label: 'Azienda o studio' },
      ],
    },
    {
      name: 'stato',
      type: 'select',
      label: 'Stato',
      defaultValue: 'attesa',
      options: [
        { label: 'In attesa di conferma', value: 'attesa' },
        { label: 'Iscritto', value: 'iscritto' },
        { label: 'Disiscritto', value: 'disiscritto' },
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
      admin: { position: 'sidebar' },
    },
    {
      type: 'collapsible',
      label: 'Prova del consenso',
      admin: { initCollapsed: true },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'fonte', type: 'text', label: 'Dove si è iscritto', admin: { readOnly: true } },
            { name: 'consensoIl', type: 'date', label: 'Consenso dato il', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
            { name: 'confermatoIl', type: 'date', label: 'Confermato il', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
          ],
        },
        {
          type: 'row',
          fields: [
            { name: 'ip', type: 'text', label: 'IP', admin: { readOnly: true } },
            { name: 'disiscrittoIl', type: 'date', label: 'Disiscritto il', admin: { readOnly: true, date: { pickerAppearance: 'dayAndTime' } } },
          ],
        },
      ],
    },
    // Chiave per i link «conferma» e «disiscriviti» delle email: mai mostrata né restituita.
    { name: 'token', type: 'text', index: true, access: { read: () => false, update: () => false }, admin: { hidden: true } },
  ],
}
