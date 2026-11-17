import type { Field, GlobalConfig } from 'payload'

import { pubblico, soloRedazione } from '../access'
import { area, immagine, link, testo } from '../fields'
import { campoSegreto } from '../fields/segreto'

/** Header, footer, dati del cliente (fonte: file-md/cliente.md), social e barra mobile, sicurezza e tracciamento. Version: 2.02 */
export const Impostazioni: GlobalConfig = {
  slug: 'impostazioni',
  label: 'Impostazioni del sito',
  admin: { group: 'Impostazioni' },
  access: { read: pubblico, update: soloRedazione },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Marchio',
          fields: [
            immagine('logo', 'Logo', {
              admin: { description: 'PNG o SVG su fondo trasparente. Il sito lo rende nero o bianco in automatico.' },
            }),
            testo('nomeSito', 'Nome del sito', { defaultValue: 'Serralunga' }),
            immagine('immagineCondivisione', 'Immagine di condivisione predefinita', {
              admin: { description: 'Compare quando una pagina senza foto propria viene condivisa (LinkedIn, WhatsApp, motori di ricerca). Formato orizzontale, almeno 1200 × 630 px.' },
            }),
            {
              name: 'accento',
              type: 'select',
              label: 'Colore d’accento',
              defaultValue: '#A08A5F',
              options: [
                { label: 'Oro (predefinito)', value: '#A08A5F' },
                { label: 'Salvia', value: '#8C8B7A' },
                { label: 'Bronzo', value: '#7C6A4E' },
                { label: 'Terracotta', value: '#B4553B' },
              ],
            },
            {
              name: 'rivelaAlloScorrimento',
              type: 'checkbox',
              label: 'Sezioni che compaiono allo scorrimento',
              defaultValue: true,
            },
            {
              name: 'mostraDidascalie',
              type: 'checkbox',
              label: 'Mostra le didascalie (designer, collezioni)',
              defaultValue: true,
            },
          ],
        },
        {
          label: 'Menu',
          fields: [
            {
              name: 'menuSuperiore',
              type: 'array',
              label: 'Menu superiore (servizio)',
              labels: { singular: 'Voce', plural: 'Voci' },
              admin: { description: 'Riga in alto a destra, prima della scelta della lingua: Contatti, Richiedi catalogo, Listino, Account, Faq.' },
              fields: [
                {
                  type: 'row',
                  fields: [testo('etichetta', 'Etichetta', { required: true }), link('link', 'Link')],
                },
              ],
            },
            {
              name: 'menu',
              type: 'array',
              label: 'Menu inferiore (principale)',
              labels: { singular: 'Voce', plural: 'Voci' },
              admin: { description: 'Riga principale a destra sotto il menu di servizio. Le sottovoci compaiono in una tendina.' },
              fields: [
                {
                  type: 'row',
                  fields: [testo('etichetta', 'Etichetta', { required: true }), link('link', 'Link')],
                },
                {
                  name: 'voci',
                  type: 'array',
                  label: 'Sottovoci (tendina)',
                  labels: { singular: 'Sottovoce', plural: 'Sottovoci' },
                  fields: [
                    {
                      type: 'row',
                      fields: [testo('etichetta', 'Etichetta', { required: true }), link('link', 'Link')],
                    },
                  ],
                },
                { name: 'evidenza', type: 'checkbox', label: 'In evidenza (colore d’accento)' },
              ],
            },
            {
              name: 'barra',
              type: 'group',
              label: 'Barra scura (non più usata dalla testata)',
              admin: { condition: () => false },
              fields: [
                testo('testo', 'Testo a sinistra'),
                { type: 'row', fields: [testo('linkEtichetta', 'Link a destra'), link('link', 'Indirizzo')] },
              ],
            },
          ],
        },
        {
          label: 'Social e barra mobile',
          description:
            'Profili social del marchio e barra rapida in basso sui telefoni. Si scrive l’indirizzo completo del profilo (https://...). Un profilo compare sul sito solo se è attivo e ha un indirizzo.',
          fields: [
            {
              name: 'social',
              type: 'array',
              label: 'Profili social',
              labels: { singular: 'Profilo', plural: 'Profili' },
              admin: { description: 'L’ordine qui è l’ordine delle icone sul sito (trascinare per cambiarlo). Gli stessi indirizzi entrano nei dati strutturati (sameAs) per motori di ricerca e assistenti AI.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'rete',
                      type: 'select',
                      label: 'Social',
                      required: true,
                      options: [
                        { label: 'Instagram', value: 'instagram' },
                        { label: 'Facebook', value: 'facebook' },
                        { label: 'TikTok', value: 'tiktok' },
                        { label: 'Pinterest', value: 'pinterest' },
                        { label: 'YouTube', value: 'youtube' },
                        { label: 'LinkedIn', value: 'linkedin' },
                      ],
                    },
                    {
                      name: 'indirizzo',
                      type: 'text',
                      label: 'Indirizzo del profilo',
                      admin: { placeholder: 'https://www.instagram.com/...' },
                      validate: (v: unknown) =>
                        !v || /^https:\/\/[^\s]+\.[^\s]+$/.test(String(v)) || 'Serve un indirizzo completo che inizi con https://',
                    },
                    { name: 'attivo', type: 'checkbox', label: 'Attivo', defaultValue: true },
                  ],
                },
              ],
            },
            {
              name: 'socialPosizione',
              type: 'radio',
              label: 'Dove mostrare le icone social (computer)',
              defaultValue: 'barra',
              options: [
                { label: 'Barra laterale nera a destra, a metà pagina', value: 'barra' },
                { label: 'Nel menu in alto, prima di Contatti', value: 'menu' },
                { label: 'In entrambi', value: 'entrambi' },
                { label: 'Da nessuna parte (restano solo nei dati strutturati)', value: 'nessuno' },
              ],
              admin: { description: 'Sui telefoni le icone stanno sempre nel pulsante «Social» della barra in basso.' },
            },
            {
              name: 'barraMobile',
              type: 'group',
              label: 'Barra in basso sui telefoni',
              admin: { description: 'Cinque pulsanti fissi in basso: Social, Contatti, Catalogo, Cerca, Account. Email e telefono di «Contatti» vengono da Dati aziendali.' },
              fields: [
                { name: 'attiva', type: 'checkbox', label: 'Mostra la barra sui telefoni', defaultValue: true },
                {
                  type: 'row',
                  fields: [
                    { ...link('catalogo', 'Link di «Catalogo»'), defaultValue: '/catalogo/' } as Field,
                    { ...link('account', 'Link di «Account»'), defaultValue: '/contract/area-riservata/' } as Field,
                  ],
                },
                {
                  name: 'whatsapp',
                  type: 'text',
                  label: 'Numero WhatsApp (facoltativo)',
                  admin: { placeholder: '+39 ...', description: 'Se compilato, «Contatti» propone anche WhatsApp accanto a email e telefono.' },
                },
              ],
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            area('descrizione', 'Descrizione sotto il logo'),
            {
              name: 'colonne',
              type: 'array',
              label: 'Colonne di link',
              maxRows: 3,
              fields: [
                testo('titolo', 'Titolo', { required: true }),
                {
                  name: 'link',
                  type: 'array',
                  label: 'Link',
                  fields: [
                    {
                      type: 'row',
                      fields: [testo('etichetta', 'Etichetta', { required: true }), link('link', 'Link')],
                    },
                  ],
                },
              ],
            },
            testo('copyright', 'Copyright', { defaultValue: '© {anno} Serralunga' }),
            {
              name: 'legali',
              type: 'array',
              label: 'Link legali',
              fields: [
                {
                  type: 'row',
                  fields: [testo('etichetta', 'Etichetta', { required: true }), link('link', 'Link')],
                },
              ],
            },
          ],
        },
        {
          label: 'Dati aziendali',
          description: 'Fonte unica dei dati: file-md/cliente.md. Usati in footer e dati strutturati.',
          fields: [
            {
              name: 'azienda',
              type: 'group',
              label: 'Azienda',
              fields: [
                { type: 'row', fields: [testo('ragioneSociale', 'Ragione sociale'), testo('marchio', 'Marchio')] },
                { type: 'row', fields: [testo('indirizzo', 'Indirizzo'), testo('cap', 'CAP'), testo('citta', 'Città')] },
                { type: 'row', fields: [testo('provincia', 'Provincia'), testo('paese', 'Paese')] },
                { type: 'row', fields: [testo('telefono', 'Telefono'), { name: 'email', type: 'email', label: 'Email' }] },
                { type: 'row', fields: [testo('piva', 'P.IVA / C.F.'), testo('rea', 'REA')] },
                testo('fondazione', 'Anno di fondazione'),
                link('sitoUfficiale', 'Sito ufficiale'),
              ],
            },
          ],
        },
        {
          label: 'Sicurezza e tracciamento',
          description:
            'Codici di Google, Microsoft, Meta e LinkedIn. Si scrive solo l’identificativo (es. G-XXXXXXXXXX), mai il codice completo: il sito inserisce da sé gli script giusti. Statistiche e marketing partono solo dopo il consenso del visitatore nel banner dei cookie (Google Consent Mode v2).',
          fields: [
            {
              type: 'collapsible',
              label: 'reCAPTCHA (protezione dei moduli)',
              admin: { description: 'Chiavi da https://www.google.com/recaptcha/admin con i domini del sito (prova e definitivo). Il tipo scelto qui deve essere quello scelto su Google. Vale per tutti i moduli e per l’iscrizione alla newsletter.' },
              fields: [
                { name: 'recaptchaAttivo', type: 'checkbox', label: 'Proteggi tutti i moduli con reCAPTCHA', defaultValue: false },
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'recaptchaTipo',
                      type: 'select',
                      label: 'Tipo',
                      defaultValue: 'v3',
                      options: [
                        { label: 'v3 invisibile (consigliato)', value: 'v3' },
                        { label: 'v2 casella «Non sono un robot»', value: 'v2' },
                      ],
                    },
                    {
                      name: 'recaptchaSoglia',
                      type: 'number',
                      label: 'Soglia v3 (0–1)',
                      defaultValue: 0.5,
                      min: 0,
                      max: 1,
                      admin: { step: 0.1, description: 'Sotto questo punteggio l’invio è respinto. 0,5 è il valore suggerito da Google.' },
                    },
                  ],
                },
                { name: 'recaptchaChiaveSito', type: 'text', label: 'Chiave del sito (pubblica)', admin: { autoComplete: 'off' } },
                campoSegreto('impostazioni', 'recaptchaChiaveSegreta', 'Chiave segreta', 'Resta cifrata sul server. Senza chiave segreta i moduli funzionano senza reCAPTCHA.'),
              ],
            },
            {
              type: 'collapsible',
              label: 'Verifica dei motori di ricerca',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'googleSearchConsole', type: 'text', label: 'Google Search Console', admin: { description: 'Solo il valore content del meta tag google-site-verification (oppure verifica via DNS e lasciare vuoto).' } },
                    { name: 'bingWebmaster', type: 'text', label: 'Bing Webmaster Tools', admin: { description: 'Solo il valore content del meta tag msvalidate.01. Bing può anche importare il sito da Search Console.' } },
                  ],
                },
                {
                  name: 'altreVerifiche',
                  type: 'array',
                  label: 'Altre verifiche (meta tag)',
                  labels: { singular: 'Verifica', plural: 'Verifiche' },
                  admin: { description: 'Es. Pinterest (p:domain_verify), Yandex (yandex-verification), Meta (facebook-domain-verification).' },
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'nome', type: 'text', label: 'name del meta tag', required: true },
                        { name: 'valore', type: 'text', label: 'content', required: true },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Statistiche',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'googleAnalytics', type: 'text', label: 'Google Analytics 4 (ID misurazione)', admin: { placeholder: 'G-XXXXXXXXXX' } },
                    { name: 'googleTagManager', type: 'text', label: 'Google Tag Manager (contenitore)', admin: { placeholder: 'GTM-XXXXXXX', description: 'Facoltativo. Se Analytics e Ads sono già dentro GTM, lasciare vuoti gli altri campi Google per non contare due volte.' } },
                    { name: 'microsoftClarity', type: 'text', label: 'Microsoft Clarity (ID progetto)' },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Marketing e conversioni',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'googleAds', type: 'text', label: 'Google Ads (ID)', admin: { placeholder: 'AW-XXXXXXXXX' } },
                    { name: 'googleAdsConversione', type: 'text', label: 'Etichetta conversione «modulo inviato»', admin: { description: 'La parte dopo la barra (AW-123/etichetta). Parte a ogni modulo inviato con successo.' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'metaPixel', type: 'text', label: 'Meta Pixel (Facebook/Instagram)', admin: { description: 'Solo il numero. A ogni modulo inviato parte l’evento Lead.' } },
                    { name: 'linkedinInsight', type: 'text', label: 'LinkedIn Insight Tag (partner ID)', admin: { description: 'Utile per il pubblico B2B. Solo il numero.' } },
                  ],
                },
              ],
            },
            {
              type: 'collapsible',
              label: 'Banner dei cookie',
              admin: { description: 'Compare solo se è attivo almeno un codice di statistiche o marketing. Il visitatore sceglie: solo necessari, accetta tutti, o per categoria; la scelta si riapre dal link «Preferenze cookie» nel footer.' },
              fields: [
                testo('cookieTesto', 'Testo del banner', {
                  admin: { description: 'Vuoto = testo predefinito nella lingua della pagina: «Usiamo cookie tecnici necessari al sito e, solo con il vostro consenso, cookie di statistica e di marketing…»' },
                }),
                link('cookieLink', 'Pagina della cookie policy'),
              ],
            },
            {
              name: 'collegamenti',
              type: 'ui',
              admin: { components: { Field: '/componenti/NotaCollegamenti#NotaCollegamenti' } },
            },
          ],
        },
      ],
    },
  ],
}
