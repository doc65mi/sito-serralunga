import type { Field, FieldHook, GlobalConfig } from 'payload'

import { soloRedazione } from '../access'
import { cifra, decifra, MASCHERA, mascherata } from '../ai/segreto'

/**
 * Version: 1.00
 * Intelligenza artificiale: fornitore, chiavi API, modelli e direttive.
 * Le chiavi sono cifrate nel database e non escono mai intere dalle API: il pannello
 * mostra solo le ultime quattro lettere. Per sostituirne una basta scriverla sopra,
 * per toglierla si svuota il campo.
 */
const salvaChiave: FieldHook = async ({ value, req, field }) => {
  if (value === '' || value === null) return ''
  if (value === undefined || mascherata(value)) {
    // Campo non toccato: si rilegge il valore cifrato direttamente dal database,
    // perché quello che arriva dal pannello è solo la versione mascherata.
    const grezzo = (await req.payload.db.findGlobal({ slug: 'ai', req })) as Record<string, unknown> | null
    const salvato = grezzo?.[(field as { name: string }).name]
    return typeof salvato === 'string' && !mascherata(salvato) ? salvato : ''
  }
  return cifra(String(value).trim())
}
const leggiChiave: FieldHook = ({ value, req }) => {
  const chiaro = decifra(value as string)
  if (req?.context?.chiavi === true) return chiaro
  return chiaro ? `${MASCHERA}${chiaro.slice(-4)}` : ''
}

const chiave = (name: string, label: string, description: string): Field => ({
  name,
  type: 'text',
  label,
  admin: { description, autoComplete: 'off' },
  hooks: { beforeChange: [salvaChiave], afterRead: [leggiChiave] },
})

const modello = (name: string, label: string, defaultValue: string): Field => ({
  name,
  type: 'text',
  label,
  defaultValue,
  admin: { description: 'Identificativo esatto del modello, come compare nell’elenco del fornitore. Se un modello viene ritirato basta cambiarlo qui.' },
})

export const FORNITORI = [
  { label: 'OpenAI (ChatGPT)', value: 'openai' },
  { label: 'OpenRouter', value: 'openrouter' },
  { label: 'Google Gemini', value: 'gemini' },
] as const

export const Ai: GlobalConfig = {
  slug: 'ai',
  label: 'Intelligenza artificiale',
  admin: { group: 'Impostazioni' },
  access: { read: soloRedazione, update: soloRedazione },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Uso',
          fields: [
            {
              name: 'attiva',
              type: 'checkbox',
              label: 'Abilita i pulsanti AI nella modifica dalla pagina',
              defaultValue: false,
            },
            {
              type: 'row',
              fields: [
                { name: 'fornitoreTesti', type: 'select', label: 'Fornitore per i testi', defaultValue: 'openai', options: [...FORNITORI] },
                { name: 'fornitoreImmagini', type: 'select', label: 'Fornitore per le immagini', defaultValue: 'openai', options: [...FORNITORI] },
              ],
            },
            {
              name: 'direttive',
              type: 'textarea',
              label: 'Direttive generali',
              admin: {
                rows: 8,
                description:
                  'Valgono per ogni richiesta: tono, pubblico, termini da preferire o evitare. Vengono inviate al fornitore scelto insieme al testo da lavorare.',
              },
              defaultValue:
                'Pubblico: architetti, progettisti, contractor e buyer del settore hospitality (B2B).\nTono professionale e competente, frasi concrete. Niente punti esclamativi, niente maiuscole per enfasi.\nI designer si citano sempre con nome e cognome.\nNon inventare dati, misure, premi, clienti, prezzi o tempi di consegna: usa solo ciò che è nel testo fornito.',
            },
          ],
        },
        {
          label: 'OpenAI',
          fields: [
            chiave('chiaveOpenai', 'Chiave API OpenAI', 'Si crea su platform.openai.com, sezione API keys.'),
            { type: 'row', fields: [modello('modelloOpenai', 'Modello per i testi', 'gpt-4o-mini'), modello('modelloImmaginiOpenai', 'Modello per le immagini', 'gpt-image-1')] },
          ],
        },
        {
          label: 'OpenRouter',
          fields: [
            chiave('chiaveOpenrouter', 'Chiave API OpenRouter', 'Si crea su openrouter.ai, sezione Keys.'),
            { type: 'row', fields: [modello('modelloOpenrouter', 'Modello per i testi', 'openai/gpt-4o-mini'), modello('modelloImmaginiOpenrouter', 'Modello per le immagini', 'google/gemini-2.5-flash-image')] },
          ],
        },
        {
          label: 'Gemini',
          fields: [
            chiave('chiaveGemini', 'Chiave API Google Gemini', 'Si crea su aistudio.google.com, sezione API keys.'),
            { type: 'row', fields: [modello('modelloGemini', 'Modello per i testi', 'gemini-2.5-flash'), modello('modelloImmaginiGemini', 'Modello per le immagini', 'gemini-2.5-flash-image')] },
          ],
        },
        {
          label: 'ContentAIPro',
          description:
            'Collegamento con la piattaforma che genera gli articoli. Gli articoli ricevuti entrano come bozze nella collezione Articoli: si pubblicano solo dopo la revisione.',
          fields: [
            { name: 'articoliAttivi', type: 'checkbox', label: 'Accetta articoli dalla piattaforma esterna', defaultValue: false },
            chiave(
              'tokenArticoli',
              'Token per l’invio degli articoli',
              'Parola segreta lunga (almeno 32 caratteri) da copiare anche nella piattaforma: la invierà nell’intestazione Authorization: Bearer. Indirizzo a cui inviare: /api/ricevi-articoli',
            ),
            {
              name: 'lingueArticoli',
              type: 'select',
              label: 'Lingua degli articoli in arrivo, se non indicata',
              defaultValue: 'it',
              options: [{ label: 'Italiano', value: 'it' }, { label: 'English', value: 'en' }],
            },
          ],
        },
      ],
    },
  ],
}
