/**
 * Version: 1.00
 * API dei moduli del sito. Il browser non le chiama direttamente: passano dal sito Astro
 * (/api/richiesta e /api/newsletter), che controlla l'origine e si presenta con SITO_CHIAVE.
 *  - POST /api/moduli/richiesta          richiesta (catalogo, preventivo, Contract, pagine)
 *  - POST /api/moduli/newsletter         iscrizione dal footer
 *  - POST /api/moduli/newsletter-azione  conferma o disiscrizione dal link dell'email
 *  - GET  /api/moduli/logo.png           logo in PNG per le email (i programmi di posta non leggono l'AVIF)
 *  - POST /api/moduli/prova-email        email di prova all'utente della redazione
 */
import crypto from 'crypto'
import fs from 'fs/promises'
import path from 'path'

import type { Endpoint, Payload, PayloadRequest } from 'payload'
import sharp from 'sharp'

import { uguali } from '../ai/segreto'
import { TESTI_MODULI } from '../globals/Moduli'
import { invia, leggiConfig, modello, parole, postaConfigurata, SITO, type Lingua, type Riga } from './posta'
import { verificaRecaptcha } from './recaptcha'

type Doc = Record<string, any>

const json = (dati: unknown, status = 200) => Response.json(dati, { status, headers: { 'cache-control': 'no-store' } })
const errore = (messaggio: string, status = 400) => json({ errore: messaggio }, status)
const str = (v: unknown, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '')
const lingua = (v: unknown): Lingua => (v === 'en' ? 'en' : 'it')
const emailValida = (v: string) => /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(v) && v.length <= 200

const conteggi = new Map<string, number[]>()
function troppe(chiave: string, massimo: number, finestraMs = 10 * 60_000) {
  const ora = Date.now()
  const recenti = (conteggi.get(chiave) || []).filter((t) => ora - t < finestraMs)
  recenti.push(ora)
  conteggi.set(chiave, recenti)
  if (conteggi.size > 5000) conteggi.clear()
  return recenti.length > massimo
}

const dalSito = (req: PayloadRequest) => {
  const chiave = process.env.SITO_CHIAVE || ''
  const arrivata = req.headers.get('x-sito-chiave') || ''
  return Boolean(chiave) && Boolean(arrivata) && uguali(arrivata, chiave)
}

async function corpo(req: PayloadRequest): Promise<Doc> {
  const testo = await (req as unknown as Request).text()
  if (testo.length > 50_000) return {}
  try {
    const v = JSON.parse(testo || '{}')
    return v && typeof v === 'object' && !Array.isArray(v) ? v : {}
  } catch {
    return {}
  }
}

const TESTI = {
  it: {
    privacy: 'Per inviare serve il consenso al trattamento dei dati (informativa privacy).',
    email: 'Inserite un indirizzo email valido.',
    robot: 'Verifica antispam non riuscita: ricaricate la pagina e riprovate.',
    troppe: 'Troppi invii ravvicinati: riprovate tra qualche minuto.',
    occhielloRichiesta: 'Richiesta ricevuta',
    titoloRichiesta: 'Grazie per averci scritto',
    occhielloNl: 'Newsletter',
    titoloConferma: 'Confermate l’iscrizione',
    testoConferma: 'per completare l’iscrizione alla newsletter Serralunga premete il pulsante qui sotto. Se non avete chiesto voi l’iscrizione, ignorate questa email: senza conferma non riceverete nulla.',
    pulsanteConferma: 'Confermo l’iscrizione',
    oggettoConferma: 'Confermate l’iscrizione alla newsletter Serralunga',
    titoloBenvenuto: 'Iscrizione completata',
    testoBenvenuto: 'la vostra iscrizione alla newsletter Serralunga è attiva. Riceverete novità di prodotto, progetti contract e nuovi cataloghi.',
    oggettoBenvenuto: 'Iscrizione alla newsletter Serralunga completata',
    datiIscrizione: 'I dati dell’iscrizione',
    nuova: 'Nuova richiesta dal sito',
    apri: 'Apri nel pannello',
    nuovoIscritto: 'Nuovo iscritto alla newsletter',
  },
  en: {
    privacy: 'Please accept the privacy policy to send the form.',
    email: 'Please enter a valid email address.',
    robot: 'Anti-spam check failed: please reload the page and try again.',
    troppe: 'Too many submissions in a short time: please try again in a few minutes.',
    occhielloRichiesta: 'Request received',
    titoloRichiesta: 'Thank you for contacting us',
    occhielloNl: 'Newsletter',
    titoloConferma: 'Please confirm your subscription',
    testoConferma: 'to complete your subscription to the Serralunga newsletter, please press the button below. If you did not request it, simply ignore this email: without confirmation you will receive nothing.',
    pulsanteConferma: 'Confirm my subscription',
    oggettoConferma: 'Please confirm your Serralunga newsletter subscription',
    titoloBenvenuto: 'Subscription complete',
    testoBenvenuto: 'your subscription to the Serralunga newsletter is active. You will receive product news, contract projects and new catalogues.',
    oggettoBenvenuto: 'Your Serralunga newsletter subscription is complete',
    datiIscrizione: 'Your subscription details',
    nuova: 'New request from the website',
    apri: 'Open in the admin panel',
    nuovoIscritto: 'New newsletter subscriber',
  },
} as const

/** Un campo vuoto nel pannello usa il testo predefinito della lingua dell'email (globals/Moduli.ts). */
const testoDi = (moduli: Doc, L: Lingua, k: keyof (typeof TESTI_MODULI)['it']) => String(moduli[k] || TESTI_MODULI[L][k])

const dataOra = (L: Lingua, d = new Date()) =>
  new Intl.DateTimeFormat(L === 'en' ? 'en-GB' : 'it-IT', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/Rome' }).format(d)

const destinatariRedazione = (moduli: Doc) =>
  String(moduli.notificheA || process.env.NOTIFICHE_EMAIL || '')
    .split(/[,;\s]+/)
    .map((s) => s.trim())
    .filter(emailValida)

const percorsoLingua = (L: Lingua, p: string) => (L === 'en' ? `/en${p}` : p)

/* ---------------------------------------------------------------- newsletter */

async function iscrivi(
  payload: Payload,
  o: { L: Lingua; email: string; nome?: string; azienda?: string; fonte: string; ip?: string },
): Promise<{ stato: 'attesa' | 'iscritto'; gia: boolean }> {
  const { moduli, imp } = await leggiConfig(payload, o.L)
  const doppia = moduli.doppiaConferma !== false
  const esistente = (
    await payload.find({ collection: 'iscritti-newsletter' as any, where: { email: { equals: o.email.toLowerCase() } }, limit: 1, depth: 0 })
  ).docs[0] as Doc | undefined
  if (esistente?.stato === 'iscritto') return { stato: 'iscritto', gia: true }

  const token = crypto.randomBytes(24).toString('base64url')
  const ora = new Date().toISOString()
  const dati = {
    email: o.email.toLowerCase(),
    nome: o.nome || esistente?.nome || '',
    azienda: o.azienda || esistente?.azienda || '',
    lingua: o.L,
    stato: doppia ? 'attesa' : 'iscritto',
    fonte: o.fonte,
    consensoIl: ora,
    confermatoIl: doppia ? null : ora,
    disiscrittoIl: null,
    ip: o.ip || '',
    token,
  }
  if (esistente) await payload.update({ collection: 'iscritti-newsletter' as any, id: esistente.id, data: dati, depth: 0 })
  else await payload.create({ collection: 'iscritti-newsletter' as any, data: dati, depth: 0 })

  const T = TESTI[o.L]
  const p = parole(o.L)
  const disiscrizione = `${SITO}${percorsoLingua(o.L, '/newsletter/')}?disiscrivi=${token}`
  const saluto = `${p.gentile} ${o.nome || (o.L === 'en' ? 'Sir or Madam' : 'Cliente')},`
  const righe: Riga[] = [
    { etichetta: p.campi.nome, valore: o.nome || '' },
    { etichetta: p.campi.azienda, valore: o.azienda || '' },
    { etichetta: p.campi.email, valore: o.email },
  ]
  const firma = testoDi(moduli, o.L, 'firma')
  try {
    if (doppia) {
      const m = modello({
        L: o.L,
        imp,
        anteprima: T.oggettoConferma,
        occhiello: T.occhielloNl,
        titolo: T.titoloConferma,
        paragrafi: [`${saluto}\n${T.testoConferma}`],
        pulsanti: [{ testo: T.pulsanteConferma, url: `${SITO}${percorsoLingua(o.L, '/newsletter/')}?conferma=${token}` }],
        righe,
        titoloRighe: T.datiIscrizione,
        firma,
      })
      await invia(payload, moduli, { to: o.email, subject: T.oggettoConferma, ...m })
    } else {
      await benvenuto(payload, { L: o.L, email: o.email, nome: o.nome, azienda: o.azienda, token })
    }
  } catch (err) {
    payload.logger.error({ err }, '[moduli] email newsletter non inviata')
  }
  return { stato: doppia ? 'attesa' : 'iscritto', gia: false }
}

async function benvenuto(payload: Payload, o: { L: Lingua; email: string; nome?: string; azienda?: string; token: string }) {
  const { moduli, imp } = await leggiConfig(payload, o.L)
  const T = TESTI[o.L]
  const p = parole(o.L)
  const m = modello({
    L: o.L,
    imp,
    anteprima: T.oggettoBenvenuto,
    occhiello: T.occhielloNl,
    titolo: T.titoloBenvenuto,
    paragrafi: [`${p.gentile} ${o.nome || (o.L === 'en' ? 'Sir or Madam' : 'Cliente')},\n${T.testoBenvenuto}`],
    righe: [
      { etichetta: p.campi.nome, valore: o.nome || '' },
      { etichetta: p.campi.azienda, valore: o.azienda || '' },
      { etichetta: p.campi.email, valore: o.email },
    ],
    titoloRighe: T.datiIscrizione,
    firma: testoDi(moduli, o.L, 'firma'),
    disiscrizione: `${SITO}${percorsoLingua(o.L, '/newsletter/')}?disiscrivi=${o.token}`,
  })
  await invia(payload, moduli, { to: o.email, subject: T.oggettoBenvenuto, ...m })
  const dest = destinatariRedazione(moduli)
  if (dest.length) {
    const r = modello({
      L: 'it',
      imp,
      anteprima: `${TESTI.it.nuovoIscritto}: ${o.email}`,
      occhiello: 'Newsletter',
      titolo: TESTI.it.nuovoIscritto,
      paragrafi: [],
      righe: [
        { etichetta: 'Nome e cognome', valore: o.nome || '' },
        { etichetta: 'Azienda o studio', valore: o.azienda || '' },
        { etichetta: 'Email', valore: o.email },
        { etichetta: 'Lingua', valore: o.L.toUpperCase() },
      ],
    })
    await invia(payload, moduli, { to: dest.join(', '), replyTo: o.email, subject: `${TESTI.it.nuovoIscritto}: ${o.email}`, ...r })
  }
}

/* ------------------------------------------------------------------- comuni */

/** Controlli comuni: chiave del sito, limite di invii, privacy, email, reCAPTCHA. */
async function controlla(req: PayloadRequest, d: Doc, L: Lingua, nome: string, massimo: number) {
  const T = TESTI[L]
  const ip = str(d.ip, 64)
  if (troppe(`${nome}:${ip || 'senza-ip'}`, massimo)) return errore(T.troppe, 429)
  if (d.privacy !== true) return errore(T.privacy)
  const email = str(d.email, 200)
  if (!emailValida(email)) return errore(T.email)
  const { imp } = await leggiConfig(req.payload, L)
  const esito = await verificaRecaptcha(imp, str(d.recaptcha, 4000), ip, nome)
  if (!esito.ok) {
    req.payload.logger.warn(`[moduli] reCAPTCHA respinto (${nome}): ${esito.motivo}`)
    return errore(T.robot, 400)
  }
  return null
}

/* ---------------------------------------------------------------- endpoint */

const richiesta: Endpoint = {
  path: '/moduli/richiesta',
  method: 'post',
  handler: async (req) => {
    if (!dalSito(req)) return errore('Non autorizzato', 401)
    const d = await corpo(req)
    const L = lingua(d.lingua)
    const no = await controlla(req, d, L, 'richiesta', 8)
    if (no) return no

    const payload = req.payload
    const T = TESTI[L]
    const p = parole(L)
    const email = str(d.email, 200)
    const cataloghi = (Array.isArray(d.cataloghi) ? d.cataloghi : [])
      .slice(0, 12)
      .map((c: Doc) => ({ titolo: str(c?.titolo, 120), url: str(c?.url, 600) }))
      .filter((c: { titolo: string }) => c.titolo)
    const campi = {
      struttura: str(d.struttura, 200),
      referente: str(d.referente, 200),
      citta: str(d.citta, 200),
      tipologia: str(d.tipologia, 200),
      messaggio: str(d.messaggio, 4000),
      pagina: str(d.pagina, 300),
    }
    const newsletter = d.newsletter === true

    const doc = (await payload.create({
      collection: 'richieste' as any,
      depth: 0,
      data: {
        struttura: campi.struttura,
        referente: campi.referente,
        email,
        citta: campi.citta,
        messaggio: [
          campi.tipologia && `Tipologia di struttura: ${campi.tipologia}`,
          cataloghi.length > 0 && `Cataloghi richiesti: ${cataloghi.map((c: { titolo: string }) => c.titolo).join(', ')}`,
          campi.messaggio,
        ]
          .filter(Boolean)
          .join('\n'),
        pagina: campi.pagina,
        lingua: L,
        privacyIl: new Date().toISOString(),
        newsletter,
      },
    })) as Doc

    let stato: string | undefined
    if (newsletter) {
      try {
        stato = (await iscrivi(payload, { L, email, nome: campi.referente, azienda: campi.struttura, fonte: campi.pagina || 'Modulo', ip: str(d.ip, 64) })).stato
      } catch (err) {
        payload.logger.error({ err }, '[moduli] iscrizione newsletter dal modulo non riuscita')
      }
    }

    // Email: errori registrati ma la richiesta resta valida (è già salvata).
    const { moduli, imp } = await leggiConfig(payload, L)
    const righe: Riga[] = [
      { etichetta: p.campi.struttura, valore: campi.struttura },
      { etichetta: p.campi.referente, valore: campi.referente },
      { etichetta: p.campi.email, valore: email },
      { etichetta: p.campi.citta, valore: campi.citta },
      { etichetta: p.campi.tipologia, valore: campi.tipologia },
      { etichetta: p.campi.cataloghi, valore: cataloghi.map((c: { titolo: string }) => c.titolo).join('\n') },
      { etichetta: p.campi.messaggio, valore: campi.messaggio },
      { etichetta: p.campi.pagina, valore: campi.pagina },
      { etichetta: p.campi.newsletter, valore: newsletter ? p.si : p.no },
    ]
    const assoluto = (u: string) => (u.startsWith('/') ? `${SITO}${u}` : /^https:\/\//.test(u) ? u : '')
    const pulsanti = cataloghi
      .map((c: { titolo: string; url: string }) => ({ testo: `${c.titolo} — PDF`, url: assoluto(c.url) }))
      .filter((b: { url: string }) => b.url)
    const riferimento = `${p.riferimento} n. ${doc.id} ${p.del} ${dataOra(L)}`

    if (moduli.emailCliente !== false) {
      try {
        const testo = testoDi(moduli, L, 'testoRichiesta')
        const oggetto = testoDi(moduli, L, 'oggettoRichiesta')
        const m = modello({
          L,
          imp,
          anteprima: testo.slice(0, 120),
          occhiello: T.occhielloRichiesta,
          titolo: T.titoloRichiesta,
          paragrafi: [`${p.gentile} ${campi.referente || campi.struttura || (L === 'en' ? 'Sir or Madam' : 'Cliente')},\n${testo}`, riferimento],
          righe,
          pulsanti,
          titoloPulsanti: pulsanti.length ? p.cataloghi : undefined,
          firma: testoDi(moduli, L, 'firma'),
        })
        const inviata = await invia(payload, moduli, { to: email, subject: oggetto, ...m })
        if (inviata) await payload.update({ collection: 'richieste' as any, id: doc.id, data: { emailCliente: true }, depth: 0 })
      } catch (err) {
        payload.logger.error({ err }, '[moduli] email di conferma al cliente non inviata')
      }
    }

    const dest = destinatariRedazione(moduli)
    if (dest.length) {
      try {
        const pi = parole('it')
        const r = modello({
          L: 'it',
          imp,
          anteprima: `${campi.struttura || campi.referente || email} — ${campi.pagina}`,
          occhiello: `Richiesta n. ${doc.id} · ${L.toUpperCase()}`,
          titolo: TESTI.it.nuova,
          paragrafi: [`Arrivata il ${dataOra('it')}. Con «Rispondi» si scrive direttamente al cliente.`],
          righe: [
            { etichetta: pi.campi.struttura, valore: campi.struttura },
            { etichetta: pi.campi.referente, valore: campi.referente },
            { etichetta: pi.campi.email, valore: email },
            { etichetta: pi.campi.citta, valore: campi.citta },
            { etichetta: pi.campi.tipologia, valore: campi.tipologia },
            { etichetta: pi.campi.cataloghi, valore: cataloghi.map((c: { titolo: string }) => c.titolo).join('\n') },
            { etichetta: pi.campi.messaggio, valore: campi.messaggio },
            { etichetta: pi.campi.pagina, valore: campi.pagina },
            { etichetta: pi.campi.newsletter, valore: newsletter ? `Sì (${stato === 'iscritto' ? 'iscritto' : 'in attesa di conferma'})` : 'No' },
            { etichetta: 'Lingua', valore: L === 'en' ? 'Inglese' : 'Italiano' },
          ],
          pulsanti: [{ testo: TESTI.it.apri, url: `${SITO}/admin/collections/richieste/${doc.id}` }],
        })
        await invia(payload, moduli, {
          to: dest.join(', '),
          replyTo: email,
          subject: `${TESTI.it.nuova}: ${campi.struttura || campi.referente || email}`,
          ...r,
        })
      } catch (err) {
        payload.logger.error({ err }, '[moduli] avviso alla redazione non inviato')
      }
    }

    return json({ ok: true, newsletter: stato || null }, 201)
  },
}

const newsletter: Endpoint = {
  path: '/moduli/newsletter',
  method: 'post',
  handler: async (req) => {
    if (!dalSito(req)) return errore('Non autorizzato', 401)
    const d = await corpo(req)
    const L = lingua(d.lingua)
    const no = await controlla(req, d, L, 'newsletter', 5)
    if (no) return no
    try {
      const esito = await iscrivi(req.payload, {
        L,
        email: str(d.email, 200),
        nome: str(d.nome, 200),
        azienda: str(d.azienda, 200),
        fonte: str(d.fonte, 300) || 'Footer',
        ip: str(d.ip, 64),
      })
      return json({ ok: true, ...esito }, 201)
    } catch (err) {
      req.payload.logger.error({ err }, '[moduli] iscrizione newsletter non riuscita')
      return errore(L === 'en' ? 'Subscription failed' : 'Iscrizione non riuscita', 500)
    }
  },
}

const azione: Endpoint = {
  path: '/moduli/newsletter-azione',
  method: 'post',
  handler: async (req) => {
    if (!dalSito(req)) return errore('Non autorizzato', 401)
    const d = await corpo(req)
    const token = str(d.token, 100)
    if (!/^[A-Za-z0-9_-]{20,}$/.test(token)) return errore('Link non valido', 404)
    const payload = req.payload
    const doc = (await payload.find({ collection: 'iscritti-newsletter' as any, where: { token: { equals: token } }, limit: 1, depth: 0, showHiddenFields: true }))
      .docs[0] as Doc | undefined
    if (!doc) return errore('Link non valido o scaduto', 404)
    const L = lingua(doc.lingua)
    const ora = new Date().toISOString()
    if (d.azione === 'disiscrivi') {
      if (doc.stato !== 'disiscritto') await payload.update({ collection: 'iscritti-newsletter' as any, id: doc.id, data: { stato: 'disiscritto', disiscrittoIl: ora }, depth: 0 })
      return json({ ok: true, stato: 'disiscritto', lingua: L })
    }
    if (doc.stato === 'attesa') {
      await payload.update({ collection: 'iscritti-newsletter' as any, id: doc.id, data: { stato: 'iscritto', confermatoIl: ora }, depth: 0 })
      try {
        await benvenuto(payload, { L, email: doc.email, nome: doc.nome, azienda: doc.azienda, token })
      } catch (err) {
        payload.logger.error({ err }, '[moduli] email di benvenuto non inviata')
      }
      return json({ ok: true, stato: 'iscritto', lingua: L })
    }
    return json({ ok: true, stato: doc.stato, lingua: L })
  },
}

let logoCache: { chiave: string; png: Buffer } | null = null
const logo: Endpoint = {
  path: '/moduli/logo.png',
  method: 'get',
  handler: async (req) => {
    try {
      const imp = (await req.payload.findGlobal({ slug: 'impostazioni' as any, depth: 1 })) as Doc
      const file = imp?.logo && typeof imp.logo === 'object' ? String(imp.logo.filename || '') : ''
      if (!file) return new Response('Logo non caricato', { status: 404 })
      const cartella = path.resolve(process.cwd(), process.env.MEDIA_DIR || 'media')
      const percorso = path.resolve(cartella, file)
      if (!percorso.startsWith(cartella + path.sep)) return new Response('No', { status: 400 })
      const chiave = `${file}:${imp.logo.updatedAt || ''}`
      if (logoCache?.chiave !== chiave) {
        const sorgente = await fs.readFile(percorso)
        const { hasAlpha } = await sharp(sorgente).metadata()
        let img = sharp(sorgente, { density: 300 }).resize({ width: 360, withoutEnlargement: false })
        // Come nella testata del sito: un logo su fondo trasparente diventa nero, leggibile sul bianco dell'email.
        if (hasAlpha) img = img.ensureAlpha().linear([0, 0, 0, 1], [0, 0, 0, 0])
        const png = await img.png({ compressionLevel: 9 }).toBuffer()
        logoCache = { chiave, png }
      }
      return new Response(new Uint8Array(logoCache.png), { headers: { 'content-type': 'image/png', 'cache-control': 'public, max-age=86400' } })
    } catch (err) {
      req.payload.logger.error({ err }, '[moduli] logo per le email')
      return new Response('Logo non disponibile', { status: 404 })
    }
  },
}

const prova: Endpoint = {
  path: '/moduli/prova-email',
  method: 'post',
  handler: async (req) => {
    if (!req.user) return errore('Serve l’accesso alla redazione.', 401)
    const destinatario = String((req.user as Doc).email || '')
    if (!emailValida(destinatario)) return errore('L’utente non ha un indirizzo email valido.')
    const { moduli, imp } = await leggiConfig(req.payload, 'it')
    if (!postaConfigurata(moduli)) return errore('Server di posta non configurato: compilate «Server di posta (SMTP)» e salvate.')
    const p = parole('it')
    const m = modello({
      L: 'it',
      imp,
      anteprima: 'Email di prova dal pannello',
      occhiello: TESTI.it.occhielloRichiesta,
      titolo: TESTI.it.titoloRichiesta,
      paragrafi: [`${p.gentile} Mario Rossi,\n${testoDi(moduli, 'it', 'testoRichiesta')}`, `${p.riferimento} n. 0 ${p.del} ${dataOra('it')}`],
      righe: [
        { etichetta: p.campi.struttura, valore: 'Hotel di esempio' },
        { etichetta: p.campi.referente, valore: 'Mario Rossi' },
        { etichetta: p.campi.email, valore: destinatario },
        { etichetta: p.campi.citta, valore: 'Milano' },
        { etichetta: p.campi.messaggio, valore: 'Questa è un’email di prova inviata dal pannello: i dati sono di esempio.' },
      ],
      firma: testoDi(moduli, 'it', 'firma'),
    })
    try {
      await invia(req.payload, moduli, { to: destinatario, subject: `[Prova] ${testoDi(moduli, 'it', 'oggettoRichiesta')}`, ...m })
      return json({ ok: true, a: destinatario })
    } catch (err) {
      return errore(`Invio non riuscito: ${(err as Error).message}`, 502)
    }
  },
}

export const endpointModuli: Endpoint[] = [richiesta, newsletter, azione, logo, prova]
