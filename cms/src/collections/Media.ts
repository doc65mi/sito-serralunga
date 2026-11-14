import type { CollectionConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Immagine o video', plural: 'Media' },
  admin: { group: 'Contenuti', defaultColumns: ['filename', 'alt', 'updatedAt'] },
  access: { read: pubblico, create: soloRedazione, update: soloRedazione, delete: soloRedazione },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Testo alternativo',
      required: true,
      localized: true,
      admin: {
        description:
          'Descrive soggetto, materiale, colore e contesto, massimo 125 caratteri (file-md/seo.md, sezione 8).',
      },
    },
    { name: 'credito', type: 'text', label: 'Credito fotografico' },
  ],
  upload: {
    staticDir: process.env.MEDIA_DIR || 'media',
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'application/pdf'],
    focalPoint: true,
    imageSizes: [
      { name: 'mini', width: 400, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'scheda', width: 1000, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'grande', width: 1800, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'pieno', width: 2600, formatOptions: { format: 'webp', options: { quality: 78 } } },
    ],
  },
}
