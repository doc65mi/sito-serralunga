import type { Field, FieldHook } from 'payload'

/**
 * Campi condivisi tra collezioni e pagine.
 * Convenzione dei testi (vedi file-md/editing.md, Specifiche Serralunga):
 * - un a capo nel testo diventa un a capo nella pagina;
 * - una parola tra _trattini bassi_ viene mostrata in corsivo con il colore d'accento.
 */
export const NOTA_TESTO =
  'Un a capo resta un a capo. Le parole tra _trattini bassi_ diventano corsivo color oro.'

export const formatSlug = (val: string): string =>
  val
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const slugHook =
  (fallback: string): FieldHook =>
  ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return formatSlug(value)
    const source = data?.[fallback] ?? originalDoc?.[fallback]
    return typeof source === 'string' ? formatSlug(source) : value
  }

export const slugField = (fallback = 'nome'): Field => ({
  name: 'slug',
  type: 'text',
  label: 'Slug (indirizzo)',
  required: true,
  unique: true,
  index: true,
  admin: {
    position: 'sidebar',
    description:
      'Parte finale dell’indirizzo, in minuscolo senza accenti. Se vuoto si genera dal nome. Non cambiarlo dopo la pubblicazione: i link esistenti smetterebbero di funzionare.',
  },
  hooks: { beforeValidate: [slugHook(fallback)] },
})

export const seoField: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: { description: 'Regole in file-md/seo.md: title fino a 60 caratteri, description 140–160.' },
  fields: [
    {
      name: 'titolo',
      type: 'text',
      label: 'Title',
      localized: true,
      maxLength: 60,
    },
    {
      name: 'descrizione',
      type: 'textarea',
      label: 'Meta description',
      localized: true,
      maxLength: 170,
    },
    { name: 'immagine', type: 'upload', relationTo: 'media', label: 'Immagine per la condivisione' },
  ],
}

export const testo = (name: string, label: string, extra: Partial<Field> = {}): Field =>
  ({
    name,
    label,
    type: 'text',
    localized: true,
    ...extra,
  }) as Field

export const area = (name: string, label: string, extra: Partial<Field> = {}): Field =>
  ({
    name,
    label,
    type: 'textarea',
    localized: true,
    admin: { description: NOTA_TESTO },
    ...extra,
  }) as Field

export const immagine = (name: string, label: string, extra: Partial<Field> = {}): Field =>
  ({
    name,
    label,
    type: 'upload',
    relationTo: 'media',
    ...extra,
  }) as Field

/** Coppia etichetta / valore (dimensioni, scheda progetto, specifiche). */
export const coppie = (name: string, label: string, extra: Partial<Field> = {}): Field =>
  ({
    name,
    label,
    type: 'array',
    labels: { singular: 'Voce', plural: 'Voci' },
    fields: [
      { type: 'row', fields: [testo('etichetta', 'Etichetta', { required: true }), testo('valore', 'Valore', { required: true })] },
    ],
    ...extra,
  }) as Field

/** Numeri grandi con didascalia (200 anni, 4 Compassi d'Oro...). */
export const numeri = (name = 'numeri', label = 'Numeri'): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular: 'Numero', plural: 'Numeri' },
  fields: [
    {
      type: 'row',
      fields: [
        testo('valore', 'Valore', { required: true }),
        testo('etichetta', 'Didascalia', { required: true }),
      ],
    },
  ],
})

export const paragrafi = (name = 'paragrafi', label = 'Paragrafi'): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular: 'Paragrafo', plural: 'Paragrafi' },
  fields: [area('testo', 'Testo', { required: true })],
})

/** Link: percorso interno (/designer/marc-sadler), ancora (#invito) o URL completo. */
export const link = (name = 'link', label = 'Link'): Field => ({
  name,
  label,
  type: 'text',
  admin: { description: 'Percorso relativo (/designer/), ancora (/#invito) o indirizzo completo.' },
})

export const ordine: Field = {
  name: 'ordine',
  type: 'number',
  label: 'Ordine',
  defaultValue: 10,
  admin: { position: 'sidebar', description: 'Numeri più bassi compaiono prima.' },
}
