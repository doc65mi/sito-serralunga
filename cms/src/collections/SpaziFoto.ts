import type { CollectionConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'

/**
 * Version: 1.00
 * Foto in più per uno spazio fotografico del sito. Con almeno una foto in più lo spazio
 * diventa uno slider; la lightbox si accende per ogni spazio. Si gestisce dalla pagina
 * (pulsanti «Aggiungi foto» e «Lightbox» su ogni foto): la chiave indica documento e campo.
 */
export const SpaziFoto: CollectionConfig = {
  slug: 'spazi-foto',
  labels: { singular: 'Spazio foto', plural: 'Spazi foto (slider e lightbox)' },
  admin: { useAsTitle: 'chiave', group: 'Contenuti', defaultColumns: ['chiave', 'lightbox', 'updatedAt'] },
  access: { read: pubblico, create: soloRedazione, update: soloRedazione, delete: soloRedazione },
  fields: [
    {
      name: 'chiave',
      type: 'text',
      label: 'Spazio (documento e campo)',
      required: true,
      unique: true,
      index: true,
      admin: { readOnly: true, description: 'Scritta dal sito: es. globals/home:chiSiamo.immagine' },
    },
    { name: 'documento', type: 'text', index: true, admin: { hidden: true } },
    { name: 'immagini', type: 'upload', relationTo: 'media', hasMany: true, label: 'Foto in più (dopo la principale)' },
    { name: 'lightbox', type: 'checkbox', label: 'Apri a tutto schermo al clic (lightbox)', defaultValue: false },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.chiave) data.documento = String(data.chiave).split(':')[0]
        return data
      },
    ],
  },
}
