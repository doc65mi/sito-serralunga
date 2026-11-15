import type { CollectionConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'
import { formatSlug } from '../fields'

/**
 * Version: 1.01
 * Ogni foto caricata (dal pannello, dalla pagina o dall'importazione) viene servita in AVIF
 * in quattro larghezze; il file caricato resta come copia di riserva per i browser senza AVIF.
 * Il nome del file diventa leggibile (minuscolo, trattini): se arriva un nome da fotocamera
 * (IMG_1234, DSC0001...) si usa il testo alternativo. Regole in file-md/seo.md.
 */
const avif = (quality: number) => ({ format: 'avif' as const, options: { quality, effort: 3, chromaSubsampling: '4:2:0' } })
const ANONIMO = /^(img|dsc|dscn|dscf|pxl|image|immagine|foto|photo|screenshot|whatsapp|untitled|senza[-_ ]?titolo)?[-_ .()\d]*$/i

/** Nome del file adatto ai motori di ricerca: parole separate da trattini, senza sigle da fotocamera. */
export function nomeFile(originale: string, alt?: unknown): string {
  const punto = originale.lastIndexOf('.')
  const est = punto > 0 ? originale.slice(punto).toLowerCase() : ''
  const base = punto > 0 ? originale.slice(0, punto) : originale
  const daAlt = typeof alt === 'string' ? alt : alt && typeof alt === 'object' ? String(Object.values(alt)[0] || '') : ''
  const scelto = ANONIMO.test(base) && daAlt.trim() ? daAlt : base
  return `${formatSlug(scelto).slice(0, 80).replace(/-+$/, '') || 'immagine'}${est}`
}

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Immagine o video', plural: 'Media' },
  admin: { group: 'Contenuti', defaultColumns: ['filename', 'alt', 'updatedAt'] },
  access: { read: pubblico, create: soloRedazione, update: soloRedazione, delete: soloRedazione },
  hooks: {
    beforeOperation: [
      ({ args, operation, req }) => {
        if (operation === 'create' && req.file?.name) req.file.name = nomeFile(req.file.name, args?.data?.alt)
        return args
      },
    ],
  },
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
      { name: 'mini', width: 400, withoutEnlargement: true, formatOptions: avif(55) },
      { name: 'scheda', width: 1000, withoutEnlargement: true, formatOptions: avif(55) },
      { name: 'grande', width: 1800, withoutEnlargement: true, formatOptions: avif(52) },
      { name: 'pieno', width: 2600, withoutEnlargement: true, formatOptions: avif(50) },
    ],
  },
}
