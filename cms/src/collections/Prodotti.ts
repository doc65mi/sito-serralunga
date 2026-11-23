import type { CollectionConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblicatiOppureRedazione, soloRedazione } from '../access'
import { area, coppie, immagine, link, ordine, paragrafi, seoField, slugField, testo } from '../fields'

export const FAMIGLIE = [
  { label: 'Vasi', value: 'vasi' },
  { label: 'Arredo', value: 'arredo' },
  { label: 'Illuminazione', value: 'illuminazione' },
  { label: 'Accessori', value: 'accessori' },
]

/** Materiali e finiture usati dai filtri del Catalogo e dalle pagine Materiali. */
export const MATERIALI = [
  { label: 'Polietilene', value: 'polietilene' },
  { label: 'Moleskin', value: 'moleskin' },
  { label: 'Corten', value: 'corten' },
  { label: 'Laccato', value: 'laccato' },
  { label: 'Vellutato', value: 'vellutato' },
  { label: 'Decorato', value: 'decorato' },
]

/**
 * Version: 1.04. Template: template/Aqua Lounger - Scheda tecnica.dc.html
 * 1.04: scheda tecnica (testi delle tendine, domande frequenti, icone automatiche).
 * 1.01: campioni dalla cartella colori (quadrati 30×30) e disegno quotato generato dalle misure.
 */

/** Sagome del disegno quotato (componente web/src/components/DisegnoQuotato.astro). */
export const FORME_DISEGNO = [
  { label: 'Pianta quadrata o rettangolare (cubo, colonna, fioriera)', value: 'parallelepipedo' },
  { label: 'Cilindro (pianta tonda, fianchi dritti)', value: 'cilindro' },
  { label: 'Vaso tondo svasato (più largo in alto)', value: 'troncoConico' },
]

const cm = (name: string, label: string, condizione: (d: Record<string, unknown>) => boolean, description?: string) => ({
  name,
  type: 'number' as const,
  label,
  min: 0,
  admin: { step: 0.1, description, condition: (_: unknown, s: Record<string, unknown>) => !!s?.forma && condizione(s) },
})
export const Prodotti: CollectionConfig = {
  slug: 'prodotti',
  labels: { singular: 'Prodotto', plural: 'Prodotti' },
  admin: {
    useAsTitle: 'nome',
    group: 'Contenuti',
    defaultColumns: ['nome', 'famiglia', 'designer', 'schedaPubblicata', '_status'],
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
      name: 'schedaPubblicata',
      type: 'checkbox',
      label: 'Scheda tecnica online',
      defaultValue: true,
      admin: {
        position: 'sidebar',
        description: 'Se spento, la card mostra "In arrivo" e porta al modulo di richiesta.',
      },
    },
    {
      name: 'famiglia',
      type: 'select',
      label: 'Famiglia',
      options: FAMIGLIE,
      admin: { position: 'sidebar' },
    },
    {
      name: 'designer',
      type: 'relationship',
      relationTo: 'designer',
      label: 'Designer',
      admin: { position: 'sidebar' },
    },
    {
      name: 'categoriaPrincipale',
      type: 'relationship',
      relationTo: 'categorie',
      label: 'Categoria principale (indirizzo)',
      filterOptions: { padre: { exists: false } },
      admin: {
        position: 'sidebar',
        description: 'Dà l’indirizzo della scheda: /catalogo/{categoria}/{slug}/. Vuoto = la scheda resta su /prodotti/{slug}/.',
      },
    },
    {
      name: 'categorie',
      type: 'relationship',
      relationTo: 'categorie',
      hasMany: true,
      label: 'Categorie del catalogo',
      admin: { position: 'sidebar', description: 'Tutte le categorie e sottocategorie in cui il prodotto compare.' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Card',
          fields: [
            immagine('immagine', 'Immagine della card (4:5)'),
            testo('etichettaCard', 'Sottotitolo della card', {
              admin: { description: 'Es. Piscina — Marc Sadler' },
            }),
          ],
        },
        {
          label: 'Catalogo',
          description: 'Dati del catalogo B2B. L’importazione da serralunga.com (npm run seed:catalogo) li aggiorna; i testi scritti a mano non vengono toccati.',
          fields: [
            testo('tipologia', 'Tipologia', { admin: { description: 'Es. Poltrona, Vaso, Lampada da terra. Serve al filtro "Tipologia".' } }),
            {
              type: 'row',
              fields: [
                {
                  name: 'materiali',
                  type: 'select',
                  hasMany: true,
                  label: 'Materiale e finitura',
                  options: MATERIALI,
                },
                { name: 'luce', type: 'checkbox', label: 'Con luce', defaultValue: false },
              ],
            },
            {
              name: 'finiture',
              type: 'array',
              label: 'Colori e varianti (codici articolo)',
              labels: { singular: 'Variante', plural: 'Varianti' },
              admin: { description: 'Varianti a listino: nome della finitura o della misura e codice articolo.' },
              fields: [
                {
                  type: 'row',
                  fields: [testo('nome', 'Variante', { required: true }), { name: 'codice', type: 'text', label: 'Codice articolo' }],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'fonteShopify',
                  type: 'text',
                  label: 'Handle su serralunga.com',
                  index: true,
                  admin: { description: 'Scheda di origine: serralunga.com/products/{handle}.', readOnly: true },
                },
                {
                  name: 'dataCatalogo',
                  type: 'date',
                  label: 'In catalogo dal',
                  admin: { description: 'Ordina i "Nuovi arrivi".' },
                },
              ],
            },
          ],
        },
        {
          label: 'Intestazione',
          fields: [
            testo('categoria', 'Kicker', { admin: { description: 'Es. Piscina & spiaggia — set da 2' } }),
            testo('firma', 'Firma', { admin: { description: 'Es. Disegno di Marc Sadler' } }),
            {
              name: 'galleria',
              type: 'array',
              label: 'Galleria (fino a 6 viste)',
              maxRows: 6,
              labels: { singular: 'Vista', plural: 'Viste' },
              fields: [immagine('immagine', 'Immagine', { required: true })],
            },
            area('descrizione', 'Descrizione'),
            {
              name: 'colori',
              type: 'array',
              label: 'Cartella colori',
              labels: { singular: 'Colore', plural: 'Colori' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    testo('nome', 'Nome', { required: true }),
                    {
                      name: 'hex',
                      type: 'text',
                      label: 'Colore (#RRGGBB)',
                      required: true,
                      validate: (v: unknown) =>
                        typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v) ? true : 'Formato #RRGGBB',
                    },
                  ],
                },
              ],
            },
            area('notaColori', 'Nota sotto i colori'),
            {
              name: 'campioni',
              type: 'relationship',
              relationTo: 'colori',
              hasMany: true,
              label: 'Colori disponibili dalla cartella colori (quadrati 30×30)',
              admin: {
                description:
                  'Scegli i colori della cartella (Contenuti › Colori) in cui il prodotto è a listino: nella scheda compaiono come quadrati 30×30 con codice e nome, accanto alle dimensioni. Il colore viene dal campione della cartella.',
              },
            },
            coppie('dimensioni', 'Dimensioni'),
            testo('pulsante', 'Pulsante principale', { defaultValue: 'Richiedi scheda e campionatura' }),
          ],
        },
        {
          label: 'Specifiche e disegno',
          fields: [
            coppie('specifiche', 'Specifiche (fascia scura)'),
            {
              name: 'disegno',
              type: 'group',
              label: 'Disegno tecnico',
              fields: [
                area('titolo', 'Titolo', { defaultValue: 'Disegno\ne proporzioni' }),
                area('testo', 'Testo'),
                {
                  name: 'quote',
                  type: 'group',
                  label: 'Disegno quotato automatico',
                  admin: {
                    description:
                      'Scegli la sagoma e inserisci le misure dichiarate (in cm): la scheda disegna prospetto e pianta in scala con le quote, accanto alle dimensioni. Non inserire misure non verificate.',
                  },
                  fields: [
                    {
                      name: 'forma',
                      type: 'select',
                      label: 'Sagoma',
                      options: FORME_DISEGNO,
                      admin: { description: 'Vuoto = nessun disegno automatico.' },
                    },
                    {
                      type: 'row',
                      fields: [
                        cm('larghezza', 'Larghezza / lunghezza (cm)', (s) => s.forma === 'parallelepipedo'),
                        cm('profondita', 'Profondità (cm)', (s) => s.forma === 'parallelepipedo'),
                        cm('diametro', 'Diametro massimo Ø (cm)', (s) => s.forma !== 'parallelepipedo'),
                        cm('diametroBase', 'Diametro alla base (cm)', (s) => s.forma === 'troncoConico', 'Se non è dichiarato lascialo vuoto: la svasatura del disegno resta indicativa e senza quota.'),
                        cm('altezza', 'Altezza (cm)', () => true),
                        {
                          name: 'peso',
                          type: 'number',
                          label: 'Peso (kg)',
                          min: 0,
                          admin: { step: 0.1, condition: (_: unknown, s: Record<string, unknown>) => !!s?.forma },
                        },
                      ],
                    },
                    testo('fonte', 'Fonte delle misure', {
                      admin: { description: 'Es. Scheda serralunga.com. Compare sotto il disegno.' },
                    }),
                  ],
                },
                immagine('immagine', 'Disegno quotato (immagine)'),
                {
                  name: 'file',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Scheda PDF scaricabile (facoltativa)',
                },
              ],
            },
            {
              name: 'ambiente',
              type: 'group',
              label: 'In ambiente',
              fields: [
                area('titolo', 'Titolo', { defaultValue: 'In ambiente' }),
                area('testo', 'Testo'),
                immagine('immagineGrande', 'Immagine panoramica (21:9)'),
                {
                  name: 'immagini',
                  type: 'array',
                  label: 'Immagini (4:3)',
                  maxRows: 3,
                  fields: [immagine('immagine', 'Immagine', { required: true })],
                },
              ],
            },
          ],
        },
        {
          label: 'Scheda tecnica e FAQ',
          description:
            'Tendine della scheda (Caratteristiche, Dimensioni, Istruzioni per la cura, Informazioni sulla spedizione). Un campo vuoto mostra il testo della scheda serralunga.com, se presente. Domande e icone automatiche vengono dalla scheda tecnica Serralunga (web/src/lib/specifiche.ts) e compaiono solo dove si applicano.',
          fields: [
            {
              name: 'scheda',
              type: 'group',
              label: 'Scheda tecnica',
              fields: [
                area('caratteristiche', 'Caratteristiche', { admin: { description: 'Vuoto = testo di serralunga.com. ' + 'Un a capo resta un a capo.' } }),
                area('dimensioni', 'Dimensioni (testo)', { admin: { description: 'Una misura per riga, es. "altezza: 90 cm". Vuoto = misure di serralunga.com. Con il disegno quotato le misure compaiono nel disegno.' } }),
                area('cura', 'Istruzioni per la cura', { admin: { description: 'Vuoto = testo di serralunga.com.' } }),
                area('spedizione', 'Informazioni sulla spedizione', { admin: { description: 'Vuoto = testo di serralunga.com.' } }),
                area('illuminazione', 'Sistema di illuminazione', { admin: { description: 'Solo per i prodotti con luce. Vuoto = testo di serralunga.com.' } }),
                {
                  type: 'row',
                  fields: [
                    { name: 'iconeAutomatiche', type: 'checkbox', label: 'Icone del catalogo (uso esterno, Clean Fighter, UL94-V2…)', defaultValue: true },
                    { name: 'faqAutomatiche', type: 'checkbox', label: 'Domande frequenti dalla scheda tecnica', defaultValue: true },
                  ],
                },
                {
                  name: 'faq',
                  type: 'array',
                  label: 'Domande frequenti aggiunte a mano',
                  labels: { singular: 'Domanda', plural: 'Domande' },
                  admin: { description: 'Compaiono prima di quelle automatiche e nei dati strutturati FAQPage. Solo informazioni verificate, niente prezzi.' },
                  fields: [testo('domanda', 'Domanda', { required: true }), area('risposta', 'Risposta', { required: true })],
                },
              ],
            },
          ],
        },
        {
          label: 'Designer e collegamenti',
          fields: [
            {
              name: 'firmaProgetto',
              type: 'group',
              label: 'Sezione designer',
              admin: { description: 'Ritratto, nome e numeri arrivano dalla scheda del designer.' },
              fields: [
                testo('kicker', 'Kicker', { defaultValue: 'La firma del progetto' }),
                paragrafi('testi', 'Testi'),
              ],
            },
            {
              name: 'caseHistory',
              type: 'relationship',
              relationTo: 'case-history',
              hasMany: true,
              label: 'Case history collegate',
            },
            {
              name: 'caseSegnaposto',
              type: 'array',
              label: 'Case history in preparazione',
              admin: { description: 'Card mostrate dopo le case history pubblicate.' },
              fields: [
                testo('etichetta', 'Etichetta', { admin: { description: 'Es. Hôtellerie · da definire' } }),
                testo('titolo', 'Titolo', { required: true }),
                immagine('immagine', 'Immagine'),
                testo('nota', 'Nota', { defaultValue: 'progetto e foto da fornire' }),
              ],
            },
            area('correlatiTesto', 'Testo dei prodotti correlati'),
            {
              name: 'correlati',
              type: 'array',
              label: 'Prodotti correlati',
              maxRows: 8,
              fields: [
                {
                  name: 'prodotto',
                  type: 'relationship',
                  relationTo: 'prodotti',
                  label: 'Prodotto (facoltativo)',
                },
                testo('nome', 'Nome (se diverso dal prodotto)'),
                testo('sottotitolo', 'Sottotitolo'),
                immagine('immagine', 'Immagine (se diversa)'),
                link('link', 'Link (se non è un prodotto)'),
              ],
            },
          ],
        },
        {
          label: 'Richiesta',
          fields: [
            {
              name: 'richiesta',
              type: 'group',
              label: 'Fascia finale',
              fields: [
                testo('kicker', 'Kicker', { defaultValue: 'Documentazione contract' }),
                area('titolo', 'Titolo', { defaultValue: 'Scheda tecnica,\ndisegni e campioni' }),
                area('testo', 'Testo'),
                immagine('immagine', 'Immagine di sfondo'),
              ],
            },
          ],
        },
      ],
    },
    blocchiField,
    seoField,
  ],
}
