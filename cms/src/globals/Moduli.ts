import type { Field, GlobalConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'
import { link } from '../fields'
import { campoSegreto } from '../fields/segreto'

/**
 * Version: 1.00
 * Moduli del sito, newsletter ed email: consenso privacy,
 * iscrizione alla newsletter dal footer e dai moduli, email di conferma al cliente
 * e di avviso alla redazione, server di posta (SMTP).
 * Lo leggono anche i visitatori (i testi dei moduli); la password SMTP resta cifrata e non
 * esce mai dal server. Le chiavi reCAPTCHA stanno in Impostazioni del sito > Sicurezza e tracciamento.
 */
const SLUG = 'moduli'

/**
 * Testi predefiniti dei moduli in italiano e inglese. Nel pannello i campi restano vuoti:
 * un campo vuoto usa il testo della propria lingua (un valore predefinito nel campo finirebbe
 * in italiano anche nella versione inglese).
 */
export const TESTI_MODULI = {
  it: {
    privacyEtichetta: 'Ho letto l’informativa privacy e acconsento al trattamento dei dati per ricevere una risposta alla richiesta.',
    newsletterEtichetta: 'Desidero ricevere la newsletter Serralunga con novità di prodotto, progetti contract e cataloghi.',
    privacyNewsletter: 'Ho letto l’informativa privacy e acconsento al trattamento dei dati per ricevere la newsletter Serralunga.',
    newsletterLink: 'Iscriviti alla newsletter',
    newsletterTitolo: 'La newsletter Serralunga',
    newsletterTesto: 'Novità di prodotto, progetti contract realizzati e nuovi cataloghi, per architetti, interior designer e strutture dell’ospitalità.',
    newsletterPulsante: 'Iscriviti',
    newsletterGrazie: 'Grazie. Vi abbiamo inviato un’email: per completare l’iscrizione aprite il link di conferma.',
    oggettoRichiesta: 'Abbiamo ricevuto la vostra richiesta — Serralunga',
    testoRichiesta: 'grazie per aver contattato Serralunga. Abbiamo ricevuto la vostra richiesta: il nostro ufficio contract la esaminerà e vi risponderà al più presto.',
    firma: 'Cordiali saluti,\nUfficio Contract Serralunga',
  },
  en: {
    privacyEtichetta: 'I have read the privacy policy and consent to the processing of my data in order to receive a reply to my request.',
    newsletterEtichetta: 'I would like to receive the Serralunga newsletter with product news, contract projects and catalogues.',
    privacyNewsletter: 'I have read the privacy policy and consent to the processing of my data in order to receive the Serralunga newsletter.',
    newsletterLink: 'Subscribe to the newsletter',
    newsletterTitolo: 'The Serralunga newsletter',
    newsletterTesto: 'Product news, completed contract projects and new catalogues, for architects, interior designers and hospitality venues.',
    newsletterPulsante: 'Subscribe',
    newsletterGrazie: 'Thank you. We have sent you an email: please open the confirmation link to complete your subscription.',
    oggettoRichiesta: 'We have received your request — Serralunga',
    testoRichiesta: 'thank you for contacting Serralunga. We have received your request: our contract team will review it and get back to you as soon as possible.',
    firma: 'Kind regards,\nSerralunga Contract Team',
  },
}

/** Indirizzi e server di posta: solo la redazione li vede (le API pubbliche li omettono). */
const riservato = { read: ({ req }: { req: { user?: unknown } }) => Boolean(req.user) }

const vuoto = (name: string, label: string, predefinito: string, nota = '', type: 'text' | 'textarea' = 'text'): Field => ({
  name,
  label,
  type,
  localized: true,
  admin: {
    placeholder: predefinito.replace(/\n/g, ' / '),
    description: `Vuoto = testo predefinito nella lingua della pagina (quello in grigio).${nota ? ` ${nota}` : ''}`,
  },
}) as Field

export const Moduli: GlobalConfig = {
  slug: SLUG,
  label: 'Moduli, newsletter ed email',
  admin: {
    group: 'Impostazioni',
    description:
      'Vale per tutti i moduli del sito: richiesta catalogo della home, richieste di preventivo, cataloghi Contract, pagine con modulo e iscrizione alla newsletter dal footer.',
  },
  access: { read: pubblico, update: soloRedazione },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Privacy e consensi',
          fields: [
            { ...link('privacyLink', 'Pagina dell’informativa privacy (vecchio)'), admin: { hidden: true } } as Field, // ora in Impostazioni › Privacy e cookies
            vuoto('privacyEtichetta', 'Testo della casella privacy (obbligatoria)', TESTI_MODULI.it.privacyEtichetta, 'Le parole «informativa privacy» diventano il link alla Privacy Policy scelta in Impostazioni › Privacy e cookies; sotto la casella compaiono sempre i link a Privacy Policy e Cookie Policy.'),
            { name: 'newsletterNeiModuli', type: 'checkbox', label: 'Mostra nei moduli la casella facoltativa per la newsletter', defaultValue: true },
            vuoto('newsletterEtichetta', 'Testo della casella newsletter (facoltativa)', TESTI_MODULI.it.newsletterEtichetta),
            vuoto('privacyNewsletter', 'Testo della casella privacy nell’iscrizione alla newsletter', TESTI_MODULI.it.privacyNewsletter),
          ],
        },
        {
          label: 'Newsletter',
          fields: [
            { name: 'newsletterAttiva', type: 'checkbox', label: 'Mostra «Iscriviti alla newsletter» nel footer', defaultValue: true },
            vuoto('newsletterLink', 'Testo del link nel footer', TESTI_MODULI.it.newsletterLink),
            vuoto('newsletterTitolo', 'Titolo della finestra', TESTI_MODULI.it.newsletterTitolo),
            vuoto('newsletterTesto', 'Testo della finestra', TESTI_MODULI.it.newsletterTesto, '', 'textarea'),
            vuoto('newsletterPulsante', 'Testo del pulsante', TESTI_MODULI.it.newsletterPulsante),
            {
              name: 'doppiaConferma',
              type: 'checkbox',
              label: 'Doppia conferma (consigliata)',
              defaultValue: true,
              admin: {
                description:
                  'L’iscritto riceve un’email con il pulsante «Confermo l’iscrizione»: è la prova del consenso richiesta dal GDPR e tiene fuori gli indirizzi scritti da altri.',
              },
            },
            vuoto('newsletterGrazie', 'Messaggio dopo l’invio', TESTI_MODULI.it.newsletterGrazie, 'Con la doppia conferma spenta il sito mostra «Iscrizione completata».', 'textarea'),
          ],
        },
        {
          label: 'Email',
          description:
            'Dopo ogni invio il cliente riceve un’email con il riepilogo dei dati inviati; la redazione riceve l’avviso con «Rispondi» diretto al cliente.',
          fields: [
            { name: 'emailCliente', type: 'checkbox', label: 'Invia al cliente l’email di conferma con il riepilogo', defaultValue: true },
            {
              type: 'row',
              fields: [
                { name: 'notificheA', type: 'text', label: 'Avvisi della redazione a', access: riservato, admin: { description: 'Uno o più indirizzi separati da virgola. Se vuoto si usa NOTIFICHE_EMAIL del server.' } },
                { name: 'mittenteNome', type: 'text', label: 'Nome del mittente', defaultValue: 'Serralunga' },
                { name: 'mittenteEmail', type: 'email', label: 'Indirizzo del mittente', access: riservato, admin: { description: 'Deve essere autorizzato dal server di posta. Se vuoto si usa SMTP_FROM.' } },
              ],
            },
            vuoto('oggettoRichiesta', 'Oggetto dell’email al cliente', TESTI_MODULI.it.oggettoRichiesta),
            vuoto('testoRichiesta', 'Testo di apertura', TESTI_MODULI.it.testoRichiesta, 'Segue «Gentile Nome,»; sotto compare il riepilogo dei dati inviati.', 'textarea'),
            vuoto('firma', 'Firma', TESTI_MODULI.it.firma, '', 'textarea'),
            {
              type: 'collapsible',
              label: 'Server di posta (SMTP)',
              admin: { initCollapsed: false, description: 'Se il server non è indicato qui si usano le variabili SMTP_* di Coolify. Senza nessuno dei due le richieste si salvano comunque, ma non parte alcuna email.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'smtpHost', type: 'text', label: 'Server', access: riservato, admin: { placeholder: 'smtp.esempio.it' } },
                    { name: 'smtpPorta', type: 'number', label: 'Porta', access: riservato, defaultValue: 587, admin: { description: '587 (STARTTLS) o 465 (SSL).' } },
                    { name: 'smtpUtente', type: 'text', label: 'Utente', access: riservato, admin: { autoComplete: 'off' } },
                  ],
                },
                campoSegreto(SLUG, 'smtpPassword', 'Password', 'Resta cifrata sul server.'),
              ],
            },
            {
              name: 'provaEmail',
              type: 'ui',
              admin: { components: { Field: '/componenti/ProvaEmail#ProvaEmail' } },
            },
          ],
        },
      ],
    },
  ],
}

