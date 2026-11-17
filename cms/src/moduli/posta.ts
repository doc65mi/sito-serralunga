/**
 * Version: 1.00
 * Email dei moduli: invio (SMTP dal pannello, altrimenti variabili SMTP_* del server) e modelli
 * HTML con il marchio Serralunga. Le email usano tabelle e stili in linea perché Outlook e Gmail
 * ignorano i fogli di stile; testo nero su fondo chiaro, oro solo come filetto decorativo.
 */
import nodemailer from 'nodemailer'
import type { Payload } from 'payload'

export type Lingua = 'it' | 'en'
type Doc = Record<string, any>

export const SITO = (process.env.SITO_URL || 'http://localhost:4321').trim().replace(/\/+$/, '')

/** Impostazioni lette con le chiavi in chiaro (solo lato server). */
export async function leggiConfig(payload: Payload, L: Lingua = 'it') {
  const [moduli, imp] = await Promise.all([
    // In inglese niente ripiego sull'italiano: un testo vuoto usa il predefinito inglese del codice.
    payload.findGlobal({ slug: 'moduli' as any, locale: L, fallbackLocale: L === 'en' ? false : 'it', depth: 0, context: { chiavi: true } }) as Promise<Doc>,
    payload.findGlobal({ slug: 'impostazioni' as any, locale: L, fallbackLocale: 'it', depth: 1, context: { chiavi: true } }) as Promise<Doc>,
  ])
  return { moduli: moduli || {}, imp: imp || {} }
}

let cache: { chiave: string; t: ReturnType<typeof nodemailer.createTransport> } | null = null
function trasporto(moduli: Doc) {
  const host = String(moduli.smtpHost || process.env.SMTP_HOST || '').trim()
  if (!host) return null
  const daPannello = Boolean(String(moduli.smtpHost || '').trim())
  const porta = Number(daPannello ? moduli.smtpPorta || 587 : process.env.SMTP_PORT || 587)
  const utente = daPannello ? String(moduli.smtpUtente || '') : process.env.SMTP_USER || ''
  const password = daPannello ? String(moduli.smtpPassword || '') : process.env.SMTP_PASS || ''
  const chiave = [host, porta, utente, password].join('|')
  if (cache?.chiave !== chiave) {
    cache = {
      chiave,
      t: nodemailer.createTransport({
        host,
        port: porta,
        secure: porta === 465,
        auth: utente ? { user: utente, pass: password } : undefined,
        connectionTimeout: 15_000,
        greetingTimeout: 15_000,
        socketTimeout: 30_000,
      }),
    }
  }
  return cache.t
}

export const postaConfigurata = (moduli: Doc) => Boolean(String(moduli.smtpHost || process.env.SMTP_HOST || '').trim())

export async function invia(
  payload: Payload,
  moduli: Doc,
  messaggio: { to: string; subject: string; html: string; text: string; replyTo?: string },
): Promise<boolean> {
  const t = trasporto(moduli)
  if (!t) {
    payload.logger.warn(`[moduli] email non inviata (server di posta non configurato): ${messaggio.subject}`)
    return false
  }
  const indirizzo = String(moduli.mittenteEmail || process.env.SMTP_FROM || moduli.smtpUtente || 'sito@serralunga.com')
  const nome = String(moduli.mittenteNome || 'Serralunga').replace(/["<>]/g, '')
  await t.sendMail({ from: { name: nome, address: indirizzo }, ...messaggio })
  return true
}

/* ------------------------------------------------------------------ modelli */

const PAROLE = {
  it: {
    gentile: 'Gentile',
    riepilogo: 'Riepilogo della richiesta',
    riferimento: 'Riferimento',
    del: 'del',
    cataloghi: 'I cataloghi richiesti',
    scarica: 'Scarica il PDF',
    contatti: 'Per qualsiasi necessità rispondete a questa email o scriveteci a',
    perche: 'Ricevete questa email perché avete compilato un modulo sul sito',
    disiscrivi: 'Annulla l’iscrizione alla newsletter',
    sito: 'Visita il sito',
    piva: 'P.IVA',
    si: 'Sì',
    no: 'No',
    campi: {
      struttura: 'Azienda, struttura o studio',
      referente: 'Referente',
      email: 'Email',
      citta: 'Città del progetto',
      tipologia: 'Tipologia di struttura',
      messaggio: 'Messaggio',
      cataloghi: 'Cataloghi',
      pagina: 'Pagina',
      newsletter: 'Iscrizione alla newsletter',
      nome: 'Nome e cognome',
      azienda: 'Azienda o studio',
    },
  },
  en: {
    gentile: 'Dear',
    riepilogo: 'Summary of your request',
    riferimento: 'Reference',
    del: 'of',
    cataloghi: 'The catalogues you requested',
    scarica: 'Download the PDF',
    contatti: 'For any further need, reply to this email or write to',
    perche: 'You are receiving this email because you filled in a form on',
    disiscrivi: 'Unsubscribe from the newsletter',
    sito: 'Visit the website',
    piva: 'VAT',
    si: 'Yes',
    no: 'No',
    campi: {
      struttura: 'Company, property or studio',
      referente: 'Contact person',
      email: 'Email',
      citta: 'Project city',
      tipologia: 'Type of property',
      messaggio: 'Message',
      cataloghi: 'Catalogues',
      pagina: 'Page',
      newsletter: 'Newsletter subscription',
      nome: 'Full name',
      azienda: 'Company or studio',
    },
  },
} as const

export const parole = (L: Lingua) => PAROLE[L]

const esc = (v: unknown) =>
  String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
const conAcapo = (v: unknown) => esc(v).replace(/\n/g, '<br>')
const FONT = "font-family:'Helvetica Neue',Helvetica,Arial,sans-serif"
const SERIF = "font-family:Georgia,'Times New Roman',serif"
const NERO = '#111111'

export type Riga = { etichetta: string; valore: string }
export type Pulsante = { testo: string; url: string }

/**
 * Corpo comune: logo, filetto oro, titolo, paragrafi, riepilogo, pulsanti, firma e piede aziendale.
 * `paragrafi` sono già testo semplice (si convertono qui), `righe` diventano la tabella del riepilogo.
 */
export function modello(o: {
  L: Lingua
  imp: Doc
  anteprima: string
  occhiello: string
  titolo: string
  paragrafi: string[]
  righe?: Riga[]
  titoloRighe?: string
  pulsanti?: Pulsante[]
  titoloPulsanti?: string
  dopo?: string[]
  firma?: string
  disiscrizione?: string
}): { html: string; text: string } {
  const p = parole(o.L)
  const a = o.imp.azienda || {}
  const nome = a.marchio || o.imp.nomeSito || 'Serralunga'
  const dominio = SITO.replace(/^https?:\/\//, '')
  const sitoLingua = o.L === 'en' ? `${SITO}/en/` : `${SITO}/`
  const email = a.email || 'info@serralunga.com'
  const indirizzo = [a.ragioneSociale, a.indirizzo, [a.cap, a.citta].filter(Boolean).join(' '), a.paese].filter(Boolean).join(' · ')

  const righe = (o.righe || []).filter((r) => r.valore && r.valore.trim())
  const tabella = righe.length
    ? `<tr><td style="padding:34px 48px 0;${FONT}">
        <p style="margin:0 0 14px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${NERO};">${esc(o.titoloRighe || p.riepilogo)}</p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-top:1px solid #e3ddd0;">
          ${righe
            .map(
              (r) => `<tr>
            <td valign="top" style="padding:12px 16px 12px 0;border-bottom:1px solid #e3ddd0;width:38%;font-size:14px;color:${NERO};${FONT}">${esc(r.etichetta)}</td>
            <td valign="top" style="padding:12px 0;border-bottom:1px solid #e3ddd0;font-size:15px;color:${NERO};${FONT}">${conAcapo(r.valore)}</td>
          </tr>`,
            )
            .join('')}
        </table>
      </td></tr>`
    : ''
  const pulsanti = (o.pulsanti || []).length
    ? `<tr><td style="padding:30px 48px 0;${FONT}">
        ${o.titoloPulsanti ? `<p style="margin:0 0 14px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${NERO};">${esc(o.titoloPulsanti)}</p>` : ''}
        ${(o.pulsanti || [])
          .map(
            (b) => `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 10px;"><tr><td style="background:${NERO};">
              <a href="${esc(b.url)}" style="display:inline-block;padding:14px 28px;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#ffffff;text-decoration:none;${FONT}">${esc(b.testo)}</a>
            </td></tr></table>`,
          )
          .join('')}
      </td></tr>`
    : ''
  const blocchi = (testi: string[]) =>
    testi.map((t) => `<p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${NERO};${FONT}">${conAcapo(t)}</p>`).join('')

  const html = `<!doctype html>
<html lang="${o.L}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>${esc(o.titolo)}</title></head>
<body style="margin:0;padding:0;background:#f4f1ea;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(o.anteprima)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;">
<tr><td align="center" style="padding:32px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;">
    <tr><td align="center" style="padding:40px 48px 28px;">
      <a href="${esc(sitoLingua)}" style="text-decoration:none;color:${NERO};">
        <img src="${esc(SITO)}/api/moduli/logo.png" width="180" alt="${esc(nome)}" style="display:block;width:180px;max-width:180px;height:auto;border:0;${SERIF};font-size:26px;letter-spacing:6px;color:${NERO};">
      </a>
    </td></tr>
    <tr><td style="padding:0 48px;"><div style="height:1px;line-height:1px;background:#A08A5F;">&nbsp;</div></td></tr>
    <tr><td style="padding:34px 48px 0;${FONT}">
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${NERO};">${esc(o.occhiello)}</p>
      <h1 style="margin:0 0 22px;font-size:28px;line-height:1.25;font-weight:normal;color:${NERO};${SERIF}">${esc(o.titolo)}</h1>
      ${blocchi(o.paragrafi)}
    </td></tr>
    ${tabella}
    ${pulsanti}
    <tr><td style="padding:30px 48px 0;${FONT}">
      ${blocchi(o.dopo || [])}
      <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${NERO};">${esc(p.contatti)} <a href="mailto:${esc(email)}" style="color:${NERO};">${esc(email)}</a>${a.telefono ? ` · ${esc(a.telefono)}` : ''}.</p>
      ${o.firma ? `<p style="margin:8px 0 0;font-size:15px;line-height:1.65;color:${NERO};">${conAcapo(o.firma)}</p>` : ''}
    </td></tr>
    <tr><td style="padding:40px 48px 0;"><div style="height:1px;line-height:1px;background:#e3ddd0;">&nbsp;</div></td></tr>
    <tr><td style="padding:22px 48px 36px;${FONT}">
      <p style="margin:0 0 6px;font-size:14px;line-height:1.6;color:${NERO};">${esc(indirizzo)}</p>
      <p style="margin:0 0 6px;font-size:14px;line-height:1.6;color:${NERO};">${a.piva ? `${esc(p.piva)} ${esc(a.piva)} · ` : ''}<a href="${esc(sitoLingua)}" style="color:${NERO};">${esc(dominio)}</a></p>
      <p style="margin:12px 0 0;font-size:14px;line-height:1.6;color:${NERO};">${esc(p.perche)} ${esc(dominio)}.${o.disiscrizione ? ` <a href="${esc(o.disiscrizione)}" style="color:${NERO};">${esc(p.disiscrivi)}</a>.` : ''}</p>
    </td></tr>
  </table>
</td></tr>
</table>
</body></html>`

  const text = [
    nome.toUpperCase(),
    '',
    o.occhiello.toUpperCase(),
    o.titolo,
    '',
    ...o.paragrafi.flatMap((t) => [t, '']),
    ...(righe.length ? [(o.titoloRighe || p.riepilogo).toUpperCase(), ...righe.map((r) => `${r.etichetta}: ${r.valore}`), ''] : []),
    ...(o.pulsanti || []).flatMap((b) => [`${b.testo}: ${b.url}`]),
    ...(o.pulsanti?.length ? [''] : []),
    ...(o.dopo || []).flatMap((t) => [t, '']),
    `${p.contatti} ${email}${a.telefono ? ` · ${a.telefono}` : ''}.`,
    ...(o.firma ? ['', o.firma] : []),
    '',
    '—',
    indirizzo,
    `${a.piva ? `${p.piva} ${a.piva} · ` : ''}${sitoLingua}`,
    `${p.perche} ${dominio}.`,
    ...(o.disiscrizione ? [`${p.disiscrivi}: ${o.disiscrizione}`] : []),
  ].join('\n')

  return { html, text }
}
