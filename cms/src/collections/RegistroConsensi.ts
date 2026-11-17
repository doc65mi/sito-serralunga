import type { CollectionConfig } from 'payload'

import { soloRedazione } from '../access'

/**
 * Version: 1.00
 * Registro dei consensi ai cookie (consent ledger, art. 7 GDPR: onere della prova).
 * Una riga per ogni scelta: accetta tutti, rifiuta tutti, chiusura con la X, scelta per
 * categoria, revoca. Le righe arrivano solo dall'endpoint /api/moduli/consenso (chiave del sito)
 * e non si possono creare, modificare o cancellare dal pannello. L'IP non si salva in chiaro:
 * solo l'impronta SHA-256 con un sale che cambia ogni giorno (minimizzazione dei dati).
 * Resta su ciascun sito: non va nei contenuti su GitHub (strumenti/sincronizza.ts).
 */
export const RegistroConsensi: CollectionConfig = {
  slug: 'registro-consensi',
  labels: { singular: 'Consenso cookie', plural: 'Registro consensi' },
  admin: {
    useAsTitle: 'consentUuid',
    group: 'Contatti',
    defaultColumns: ['createdAt', 'azione', 'consentUuid', 'policyVersione', 'fonteUrl'],
    description: 'Prova dei consensi ai cookie. Per cercare la scelta di un visitatore usare l’identificativo del consenso (lo trova nel cookie cmp_consent del suo browser). Sola lettura.',
  },
  defaultSort: '-createdAt',
  access: { read: soloRedazione, create: () => false, update: () => false, delete: () => false },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'consentUuid', type: 'text', label: 'Identificativo del consenso', required: true, index: true, admin: { readOnly: true } },
        {
          name: 'azione',
          type: 'select',
          label: 'Azione',
          required: true,
          index: true,
          options: [
            { label: 'Accetta tutti', value: 'accept_all' },
            { label: 'Rifiuta tutti', value: 'reject_all' },
            { label: 'Chiusura con la X (rifiuto)', value: 'close_x' },
            { label: 'Scelta per categoria', value: 'custom' },
            { label: 'Revoca', value: 'revoke' },
          ],
          admin: { readOnly: true },
        },
        { name: 'policyVersione', type: 'text', label: 'Versione informativa', admin: { readOnly: true } },
      ],
    },
    { name: 'stato', type: 'json', label: 'Categorie', admin: { readOnly: true } },
    {
      type: 'row',
      fields: [
        { name: 'fonteUrl', type: 'text', label: 'Pagina', admin: { readOnly: true } },
        { name: 'lingua', type: 'text', label: 'Lingua', admin: { readOnly: true } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'ipHash', type: 'text', label: 'Impronta IP (SHA-256)', admin: { readOnly: true } },
        { name: 'userAgent', type: 'text', label: 'Browser', admin: { readOnly: true } },
      ],
    },
  ],
}
