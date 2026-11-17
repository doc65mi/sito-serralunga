import type { GlobalConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'
import { link } from '../fields'

/**
 * Version: 1.00
 * Impostazioni > Privacy e cookies: la piattaforma di gestione del consenso (CMP) del sito.
 * GDPR (UE 2016/679), art. 122 Codice privacy, Linee guida del Garante (provv. 231/2021),
 * Google Consent Mode v2. I codici di Google, Microsoft, Meta e LinkedIn restano in
 * Impostazioni del sito > Sicurezza e tracciamento: qui si decide come e quando partono.
 *
 * I testi vuoti usano quelli predefiniti nella lingua della pagina (web/src/lib/cmp.ts).
 * Cambiare la «Versione dell’informativa» richiede di nuovo il consenso a tutti i visitatori.
 */
const testoLungo = (name: string, label: string, description: string) => ({ name, label, type: 'textarea' as const, localized: true, admin: { description, rows: 3 } })

const CATEGORIE = [
  { label: 'Preferenze', value: 'preferenze' },
  { label: 'Statistiche', value: 'statistiche' },
  { label: 'Marketing', value: 'marketing' },
]

export const PrivacyCookies: GlobalConfig = {
  slug: 'privacy-cookies',
  label: 'Privacy e cookies',
  admin: {
    group: 'Impostazioni',
    description:
      'Banner dei cookie, preferenze per categoria, registro dei consensi e pagine Privacy Policy e Cookie Policy. Version 1.00. I codici di tracciamento si inseriscono in Impostazioni del sito > Sicurezza e tracciamento: partono solo dopo il consenso.',
  },
  access: { read: pubblico, update: soloRedazione },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Banner',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'quandoBanner',
                  type: 'select',
                  label: 'Quando mostrare il banner',
                  defaultValue: 'auto',
                  options: [
                    { label: 'Solo se servono consensi (codici di statistica o marketing, script, fornitori aggiunti)', value: 'auto' },
                    { label: 'Sempre', value: 'sempre' },
                  ],
                  admin: { description: 'Con soli cookie tecnici il Garante non richiede il banner: resta il link «Gestisci preferenze cookie» nel footer.' },
                },
                {
                  name: 'versionePolicy',
                  type: 'text',
                  label: 'Versione dell’informativa',
                  defaultValue: '1.00',
                  admin: { description: 'Es. 1.00, 1.01. Cambiandola, il banner ricompare a tutti e il nuovo consenso si registra con la nuova versione.' },
                },
                {
                  name: 'durataGiorni',
                  type: 'number',
                  label: 'Durata della scelta (giorni)',
                  defaultValue: 180,
                  min: 1,
                  max: 180,
                  admin: { description: 'Massimo 180 giorni (6 mesi), sia per l’accettazione sia per il rifiuto.' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                link('privacyLink', 'Pagina Privacy Policy'),
                link('cookieLink', 'Pagina Cookie Policy'),
              ],
            },
            {
              name: 'testi',
              type: 'group',
              label: 'Testi del banner e del pannello delle preferenze',
              admin: { description: 'Vuoto = testo predefinito nella lingua della pagina. Testo sempre nero, almeno 14px.' },
              fields: [
                { name: 'titolo', type: 'text', label: 'Titolo del banner', localized: true, admin: { placeholder: 'Rispettiamo la vostra privacy' } },
                testoLungo('testo', 'Testo del banner', 'Predefinito: «Usiamo cookie tecnici necessari al funzionamento del sito. Con il vostro consenso…». I link a Privacy e Cookie Policy si aggiungono da soli.'),
                testoLungo('pannello', 'Introduzione del pannello delle preferenze', 'Predefinito: «Scegliete quali categorie di cookie consentire…»'),
                testoLungo('necessari', 'Descrizione: Necessari', ''),
                testoLungo('preferenze', 'Descrizione: Preferenze', ''),
                testoLungo('statistiche', 'Descrizione: Statistiche', ''),
                testoLungo('marketing', 'Descrizione: Marketing', ''),
              ],
            },
          ],
        },
        {
          label: 'Google, Meta e contenuti',
          fields: [
            {
              name: 'googleAvanzata',
              type: 'checkbox',
              label: 'Google Consent Mode v2 avanzata',
              defaultValue: false,
              admin: {
                description:
                  'Spenta (base, consigliata dal Garante): i tag Google non si caricano finché il visitatore non accetta. Accesa: i tag Google si caricano subito con consenso «negato» e inviano solo segnali senza cookie, che Google usa per stimare le conversioni.',
              },
            },
            {
              name: 'metaLdu',
              type: 'checkbox',
              label: 'Meta Pixel: Limited Data Use (LDU)',
              defaultValue: false,
              admin: { description: 'Invia a Meta il segnale di uso limitato dei dati. Il Pixel parte comunque solo con il consenso Marketing.' },
            },
            {
              name: 'incorporati',
              type: 'select',
              hasMany: true,
              label: 'Video e mappe incorporati nel sito',
              options: [
                { label: 'YouTube', value: 'youtube' },
                { label: 'Vimeo', value: 'vimeo' },
                { label: 'Google Maps', value: 'maps' },
              ],
              admin: {
                description:
                  'Servizi usati con il blocco «Video o mappa»: compaiono nella cookie policy e nel banner. Nelle pagine il contenuto resta bloccato con un riquadro «Accetta e mostra» finché il visitatore non dà il consenso.',
              },
            },
          ],
        },
        {
          label: 'Fornitori e script',
          description:
            'I fornitori dei codici di Sicurezza e tracciamento (Google Analytics, Tag Manager, Ads, Clarity, Meta, LinkedIn, reCAPTCHA) sono già elencati con i loro cookie. Qui si aggiungono gli altri.',
          fields: [
            {
              name: 'fornitori',
              type: 'array',
              label: 'Altri fornitori',
              labels: { singular: 'Fornitore', plural: 'Fornitori' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'nome', type: 'text', label: 'Servizio', required: true },
                    { name: 'societa', type: 'text', label: 'Società' },
                    { name: 'categoria', type: 'select', label: 'Categoria', defaultValue: 'marketing', required: true, options: [{ label: 'Necessari', value: 'necessari' }, ...CATEGORIE] },
                  ],
                },
                { name: 'finalita', type: 'textarea', label: 'Finalità', localized: true },
                { name: 'privacy', type: 'text', label: 'Link alla privacy policy del fornitore (https://)' },
                {
                  name: 'cookie',
                  type: 'array',
                  label: 'Cookie',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'nome', type: 'text', label: 'Nome', required: true },
                        { name: 'dominio', type: 'text', label: 'Dominio', admin: { placeholder: 'sito' } },
                        { name: 'durata', type: 'text', label: 'Durata', localized: true, admin: { placeholder: '3 mesi' } },
                      ],
                    },
                    { name: 'finalita', type: 'text', label: 'Finalità', localized: true },
                  ],
                },
              ],
            },
            {
              name: 'script',
              type: 'array',
              label: 'Script di terze parti bloccati fino al consenso',
              labels: { singular: 'Script', plural: 'Script' },
              admin: {
                description:
                  'Si inseriscono nella pagina come type="text/plain" e partono solo dopo il consenso alla categoria. Il dominio di uno script esterno va aggiunto anche alla Content-Security-Policy (proxy/Caddyfile), altrimenti il browser lo blocca.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'nome', type: 'text', label: 'Nome', required: true },
                    { name: 'categoria', type: 'select', label: 'Categoria', defaultValue: 'marketing', required: true, options: CATEGORIE },
                    { name: 'attivo', type: 'checkbox', label: 'Attivo', defaultValue: true },
                  ],
                },
                { name: 'src', type: 'text', label: 'Indirizzo dello script (https://…)', admin: { description: 'Oppure lasciare vuoto e scrivere il codice qui sotto.' } },
                { name: 'codice', type: 'code', label: 'Codice JavaScript (senza <script>)', admin: { language: 'javascript' } },
              ],
            },
          ],
        },
        {
          label: 'Registro dei consensi',
          description:
            'Ogni scelta del visitatore (accetta, rifiuta, chiusura con la X, scelta per categoria, revoca) si registra in Contatti > Registro consensi: identificativo del consenso, data UTC, versione dell’informativa, categorie, pagina, impronta SHA-256 dell’IP con sale che cambia ogni giorno (l’IP in chiaro non si salva) e browser. Le righe non si possono modificare né cancellare dal pannello (prova del consenso, art. 7 GDPR).',
          fields: [
            {
              name: 'conservaMesi',
              type: 'number',
              label: 'Conservazione del registro (mesi)',
              min: 6,
              admin: { description: 'Vuoto = il registro non si cancella. Con un numero, le righe più vecchie si eliminano da sole. Da stabilire con il consulente privacy.' },
            },
          ],
        },
      ],
    },
  ],
}
