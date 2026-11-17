import type { APIRoute } from 'astro'
import { lingua, percorso, traduttore } from '../../lib/lingua'
import { aPayload, ipDi, stessoSito } from '../../lib/moduli'

/**
 * Version: 1.00
 * Iscrizione alla newsletter (finestra del footer e pagina /newsletter/): passa a Payload
 * (/api/moduli/newsletter), che controlla privacy e reCAPTCHA e invia l'email di conferma.
 */
export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  const vuole = (request.headers.get('accept') || '').includes('application/json')
  let t = traduttore('it')
  let pagina = '/newsletter/'
  const risposta = (stato: number, corpo: Record<string, unknown>) => {
    if (typeof corpo.errore === 'string') corpo.errore = t(corpo.errore)
    return vuole
      ? new Response(JSON.stringify(corpo), { status: stato, headers: { 'Content-Type': 'application/json' } })
      : redirect(`${pagina}?iscrizione=${stato < 300 ? String(corpo.stato || 'ok') : 'errore'}`, 303)
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
  pagina = percorso(L, '/newsletter/')
  if (String(dati.get('sito_web') || '')) return risposta(200, { ok: true })
  const campo = (k: string, max = 200) => String(dati.get(k) || '').trim().slice(0, max)
  const email = campo('email')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return risposta(400, { errore: 'Inserite un indirizzo email valido' })
  if (!dati.get('privacy')) return risposta(400, { errore: 'Per inviare serve il consenso privacy' })
  try {
    const { stato, dati: esito } = await aPayload('newsletter', {
      lingua: L,
      email,
      nome: campo('nome'),
      azienda: campo('azienda'),
      fonte: campo('fonte', 300) || 'Footer',
      privacy: true,
      recaptcha: campo('g-recaptcha-response', 4000) || campo('recaptcha', 4000),
      ip: ipDi(request, clientAddress),
    })
    if (stato >= 400) return risposta(stato, { errore: String(esito.errore || 'Iscrizione non riuscita') })
    return risposta(201, { ok: true, stato: esito.stato, gia: Boolean(esito.gia) })
  } catch (err) {
    console.error('Iscrizione newsletter non riuscita', err)
    return risposta(502, { errore: 'Iscrizione non riuscita' })
  }
}
