import type { CollectionConfig } from 'payload'

import { blocchiField } from '../blocchi'
import { pubblicatiOppureRedazione, soloRedazione } from '../access'
import { area, immagine, link, ordine, seoField, slugField, testo } from '../fields'

/**
 * Materiali (Version: 1.00): le pagine di /materiali/ (Polietilene e Clean Fighter, Moleskin,
 * Corten, Colori, Sostenibilità). Ogni pagina racconta il materiale in capitoli con foto;
 * la pagina Colori mostra anche la cartella colori (collezione "colori").
 * Testi e foto vengono da serralunga.com: non si aggiungono dati tecnici non pubblicati dall'azienda.
 */
export const Materiali: CollectionConfig = {
  slug: 'materiali',
  labels: { singular: 'Materiale', plural: 'Materiali' },
  admin: {
    useAsTitle: 'titolo',
    group: 'Contenuti',
    defaultColumns: ['titolo', 'slug', 'ordine', '_status'],
    description: 'Pagine della sezione Materiali (/materiali/...).',
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
    testo('titolo', 'Nome del materiale', {
      required: true,
      admin: { description: 'Nome breve: compare nelle card, nel percorso e nel menu.' },
    }),
    area('titoloPagina', 'Titolo della pagina (H1)', {
      admin: { description: 'Se vuoto si usa il nome. Le parole tra _trattini bassi_ diventano corsivo color oro.' },
    }),
    slugField('titolo'),
    ordine,
    testo('kicker', 'Kicker'),
    testo('sottotitolo', 'Sottotitolo', { admin: { description: 'Una riga: compare sotto il titolo e nella card della pagina Materiali.' } }),
    immagine('immagine', 'Immagine di apertura'),
    area('intro', 'Introduzione'),
    {
      name: 'cifre',
      type: 'array',
      label: 'Dati in evidenza',
      labels: { singular: 'Dato', plural: 'Dati' },
      admin: { description: 'Solo dati pubblicati dall’azienda (es. “-35 / +80 °C”).' },
      fields: [{ type: 'row', fields: [testo('valore', 'Valore', { required: true }), testo('etichetta', 'Didascalia', { required: true })] }],
    },
    {
      name: 'capitoli',
      type: 'array',
      label: 'Capitoli',
      labels: { singular: 'Capitolo', plural: 'Capitoli' },
      fields: [testo('titolo', 'Titolo (H2)', { required: true }), area('testo', 'Testo'), immagine('immagine', 'Foto')],
    },
    {
      name: 'galleria',
      type: 'array',
      label: 'Galleria',
      labels: { singular: 'Foto', plural: 'Foto' },
      fields: [immagine('immagine', 'Immagine', { required: true }), testo('didascalia', 'Didascalia')],
    },
    testo('pezziTitolo', 'Titolo della sezione pezzi'),
    {
      name: 'pezzi',
      type: 'array',
      label: 'Pezzi in questo materiale',
      labels: { singular: 'Pezzo', plural: 'Pezzi' },
      admin: { description: 'Prodotti realizzati con il materiale o la finitura. Link: di norma /prodotti/{handle}/.' },
      fields: [
        { type: 'row', fields: [testo('nome', 'Nome', { required: true }), testo('tipo', 'Tipologia')] },
        immagine('immagine', 'Foto'),
        { type: 'row', fields: [link('link', 'Link'), { name: 'fonte', type: 'text', label: 'Handle su serralunga.com', admin: { readOnly: true } }] },
      ],
    },
    {
      name: 'mostraColori',
      type: 'checkbox',
      label: 'Mostra la cartella colori',
      defaultValue: false,
      admin: { description: 'Aggiunge la mappa dei colori (Contenuti → Colori) dopo i capitoli.' },
    },
    testo('coloriTitolo', 'Titolo della cartella colori', { admin: { condition: (_, d) => !!d?.mostraColori } }),
    area('coloriNota', 'Nota sotto la cartella colori', { admin: { condition: (_, d) => !!d?.mostraColori } }),
    blocchiField,
    seoField,
  ],
}
