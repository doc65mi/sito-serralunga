import type { CollectionConfig, Where } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblicatiOppureRedazione, soloRedazione } from '../access'
import { area, immagine, ordine, seoField, slugField, testo } from '../fields'

/**
 * Categorie del Catalogo (ex Shop) — Version: 1.00.
 * Albero da progetto/Serralunga_Alberatura_B2C_2026 (sezione Shop): macrocategorie
 * (/catalogo/vasi/) e sottocategorie (/catalogo/vasi/classici/).
 * I prodotti si collegano alle categorie dalla scheda prodotto; `npm run seed:catalogo`
 * li collega da solo leggendo le collezioni Shopify indicate in "Collezioni di origine".
 */
export const Categorie: CollectionConfig = {
  slug: 'categorie',
  labels: { singular: 'Categoria catalogo', plural: 'Categorie catalogo' },
  admin: {
    useAsTitle: 'nome',
    group: 'Catalogo',
    defaultColumns: ['nome', 'padre', 'tipo', 'ordine', '_status'],
    description: 'Struttura del Catalogo: macrocategorie e sottocategorie. Una categoria senza prodotti non compare nel sito.',
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
    testo('nome', 'Nome', { required: true }),
    slugField('nome'),
    ordine,
    {
      name: 'padre',
      type: 'relationship',
      relationTo: 'categorie',
      label: 'Categoria superiore',
      filterOptions: ({ id }): Where => (id ? { and: [{ padre: { exists: false } }, { id: { not_equals: id } }] } : { padre: { exists: false } }),
      admin: { position: 'sidebar', description: 'Vuoto = macrocategoria (/catalogo/vasi/). Pieno = sottocategoria (/catalogo/vasi/classici/).' },
    },
    {
      name: 'tipo',
      type: 'select',
      label: 'Come si riempie',
      defaultValue: 'automatica',
      options: [
        { label: 'Prodotti collegati (dalla scheda o dall’importazione)', value: 'automatica' },
        { label: 'Selezione curata (elenco qui sotto, in quest’ordine)', value: 'curata' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'inEvidenza',
      type: 'checkbox',
      label: 'Riquadro grande nella pagina Catalogo',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Solo per le macrocategorie.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Pagina',
          fields: [
            testo('kicker', 'Kicker', { admin: { description: 'Riga piccola sopra il titolo. Es. Catalogo · Arredo' } }),
            area('intro', 'Introduzione'),
            immagine('immagine', 'Immagine della categoria (4:5)', {
              admin: { description: 'Se vuota si usa la foto del primo prodotto.' },
            }),
            {
              name: 'filtri',
              type: 'select',
              hasMany: true,
              label: 'Filtri mostrati',
              defaultValue: ['tipologia', 'designer', 'materiale'],
              options: [
                { label: 'Tipologia', value: 'tipologia' },
                { label: 'Designer', value: 'designer' },
                { label: 'Materiale e finitura', value: 'materiale' },
                { label: 'Con luce / senza luce', value: 'luce' },
              ],
            },
          ],
        },
        {
          label: 'Prodotti',
          fields: [
            {
              name: 'prodotti',
              type: 'relationship',
              relationTo: 'prodotti',
              hasMany: true,
              label: 'Selezione curata',
              admin: {
                description: 'Usata solo se "Come si riempie" è "Selezione curata" (es. Selezione stagionale, Vasi oversize).',
                condition: (_, d) => d?.tipo === 'curata',
              },
            },
            {
              name: 'fonti',
              type: 'array',
              label: 'Collezioni di origine su serralunga.com',
              labels: { singular: 'Collezione', plural: 'Collezioni' },
              admin: {
                description:
                  'Handle delle collezioni Shopify (es. planters, traditional-italian-pots): `npm run seed:catalogo` collega a questa categoria i prodotti che vi compaiono.',
              },
              fields: [{ name: 'handle', type: 'text', required: true, label: 'Handle' }],
            },
          ],
        },
      ],
    },
    blocchiField,
    seoField,
  ],
}
