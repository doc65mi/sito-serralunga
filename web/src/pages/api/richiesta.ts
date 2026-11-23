import type { APIRoute } from 'astro'
import { lingua, traduttore } from '../../lib/lingua'
import { aPayload, ipDi, stessoSito } from '../../lib/moduli'

/**
 * Version: 1.02 (colori scelti nella scheda prodotto: vanno in testa al messaggio)
 * Riceve i moduli di richiesta del sito e li passa a Payload (/api/moduli/richiesta), che
 * controlla privacy e reCAPTCHA, salva la richiesta, iscrive alla newsletter se richiesto
 * e invia l'email di conferma al cliente e l'avviso alla redazione.
 *
 * Accetta solo invii dal sito stesso. Il controllo è qui e non in astro.config
 * (security.checkOrigin) perché l'indirizzo pubblico arriva a runtime da SITO_URL
 * e dietro il proxy di Coolify l'host visto da Node non è quello pubblico.
 */
export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  const vuole = (request.headers.get('accept') || '').includes('application/json')
  let t = traduttore('it')
  let home = '/'
  let ritorno = ''
  const risposta = (stato: number, corpo: Record<string, unknown>) => {
    if (typeof corpo.errore === 'string') corpo.errore = t(corpo.errore)
    return vuole
      ? new Response(JSON.stringify(corpo), { status: stato, headers: { 'Content-Type': 'application/json' } })
      : redirect(`${ritorno || home}?richiesta=${stato < 300 ? 'ok' : 'errore'}${ritorno && ritorno !== home ? '' : '#listino'}`, 303)
  }

  if (!stessoSito(request)) return risposta(403, { errore: 'Invio non consentito' })
  let dati: FormData
  try {
    dati = await request.formData()
  } catch {
    return risposta(400, { errore: 'Modulo non valido' })
  }
  const L = lingua(dati.get('lingua'))
  t = traduttore(L)
  home = L === 'en' ? '/en/' : '/'
  // Senza JavaScript si torna alla pagina del modulo (solo percorsi interni).
  const r = String(dati.get('ritorno') || '')
  if (/^\/[a-z0-9/_-]*$/i.test(r) && !r.startsWith('//')) ritorno = r

  // Campo trappola per i bot: se è compilato fingiamo che sia andata bene.
  if (String(dati.get('sito_web') || '')) return risposta(200, { ok: true })

  const campo = (k: string, max = 500) => String(dati.get(k) || '').trim().slice(0, max)
  const email = campo('email')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return risposta(400, { errore: 'Inserite un indirizzo email valido' })
  if (!dati.get('privacy')) return risposta(400, { errore: 'Per inviare serve il consenso privacy' })

  // Cataloghi scelti: «Titolo||/percorso/del.pdf».
  const cataloghi = dati
    .getAll('catalogo')
    .slice(0, 12)
    .map((v) => {
      const [titolo, url = ''] = String(v).split('||')
      return { titolo: titolo.trim().slice(0, 120), url: url.trim().slice(0, 600) }
    })
    .filter((c) => c.titolo)

  // Colori scelti nel modulo della scheda prodotto: in testa al messaggio, così arrivano
  // nella richiesta salvata e nelle email senza campi nuovi nel CMS.
  const colori = dati.getAll('colore').slice(0, 60).map((v) => String(v).trim().slice(0, 120)).filter(Boolean)
  const messaggio = () => {
    const testo = campo('messaggio', 4000)
    if (!colori.length) return testo
    return `${t('Colori di interesse')}: ${colori.join(', ')}${testo ? `\n\n${testo}` : ''}`.slice(0, 4000)
  }

  try {
    const { stato, dati: esito } = await aPayload('richiesta', {
      lingua: L,
      struttura: campo('struttura', 200),
      referente: campo('referente', 200),
      email,
      citta: campo('citta', 200),
      tipologia: campo('tipologia', 200),
      messaggio: messaggio(),
      pagina: campo('pagina', 300),
      cataloghi,
      privacy: true,
      newsletter: Boolean(dati.get('newsletter')),
      recaptcha: campo('g-recaptcha-response', 4000) || campo('recaptcha', 4000),
      ip: ipDi(request, clientAddress),
    })
    if (stato >= 400) return risposta(stato, { errore: String(esito.errore || 'Invio non riuscito') })
    return risposta(201, { ok: true, newsletter: esito.newsletter ?? null })
  } catch (err) {
    console.error('Richiesta non salvata', err)
    return risposta(502, { errore: 'Invio non riuscito' })
  }
}
