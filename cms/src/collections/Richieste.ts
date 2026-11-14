import type { Access, CollectionAfterChangeHook, CollectionConfig } from 'payload'

import { soloRedazione } from '../access'

/** Le richieste arrivano dal sito Astro, che si presenta con la chiave condivisa SITO_CHIAVE. */
const dalSitoOppureRedazione: Access = ({ req }) => {
  if (req.user) return true
  const chiave = process.env.SITO_CHIAVE
  return Boolean(chiave) && req.headers.get('x-sito-chiave') === chiave
}

const avvisaRedazione: CollectionAfterChangeHook = async ({ doc, operation, req }) => {
  const destinatario = process.env.NOTIFICHE_EMAIL
  if (operation !== 'create' || !destinatario || !process.env.SMTP_HOST) return doc
  try {
    await req.payload.sendEmail({
      to: destinatario,
      replyTo: doc.email,
      subject: `Nuova richiesta dal sito: ${doc.struttura || doc.referente || doc.email}`,
      text: [
        `Struttura o studio: ${doc.struttura || '-'}`,
        `Referente: ${doc.referente || '-'}`,
        `Email: ${doc.email}`,
        `Città del progetto: ${doc.citta || '-'}`,
        `Messaggio: ${doc.messaggio || '-'}`,
        `Pagina: ${doc.pagina || '-'}`,
      ].join('\n'),
    })
  } catch (err) {
    req.payload.logger.error({ err, msg: 'Invio email richiesta non riuscito' })
  }
  return doc
}

/** Richieste arrivate dai moduli del sito (Home "Raccontateci il vostro luogo"). */
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
  hooks: { afterChange: [avvisaRedazione] },
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
  ],
}
