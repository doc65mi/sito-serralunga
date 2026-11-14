import type { APIRoute } from 'astro'
import { CMS_INTERNAL, env } from '../../lib/cms'
import { lingua, traduttore } from '../../lib/lingua'

/**
 * Riceve il modulo del sito e lo salva nella collezione "richieste" di Payload.
 * La chiave SITO_CHIAVE (uguale in Astro e in Payload) autorizza la scrittura.
 *
 * Accetta solo invii dal sito stesso. Il controllo è qui e non in astro.config
 * (security.checkOrigin) perché l'indirizzo pubblico arriva a runtime da SITO_URL
 * e dietro il proxy di Coolify l'host visto da Node non è quello pubblico.
 */
const host = (u: string | null) => {
  try { return u ? new URL(u).host : '' } catch { return '' }
}
const stessoSito = (request: Request) => {
  const origine = host(request.headers.get('origin')) || host(request.headers.get('referer'))
  if (!origine) return false
  const ammessi = [
    host(env('SITO_URL')),
    request.headers.get('x-forwarded-host')?.split(',')[0].trim(),
    request.headers.get('host'),
  ].filter(Boolean)
  return ammessi.includes(origine)
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const vuole = (request.headers.get('accept') || '').includes('application/json')
  let t = traduttore('it')
  let home = '/'
  const risposta = (stato: number, corpo: Record<string, unknown>) => {
    if (typeof corpo.errore === 'string') corpo.errore = t(corpo.errore)
    return vuole
      ? new Response(JSON.stringify(corpo), { status: stato, headers: { 'Content-Type': 'application/json' } })
      : redirect(`${home}?richiesta=${stato < 300 ? 'ok' : 'errore'}#listino`, 303)
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

  // Campo trappola per i bot: se è compilato fingiamo che sia andata bene.
  if (String(dati.get('sito_web') || '')) return risposta(200, { ok: true })

  const campo = (k: string) => String(dati.get(k) || '').trim().slice(0, 500)
  const email = campo('email')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return risposta(400, { errore: 'Inserite un indirizzo email valido' })

  try {
    const res = await fetch(`${CMS_INTERNAL}/api/richieste`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-sito-chiave': env('SITO_CHIAVE') },
      body: JSON.stringify({
        struttura: campo('struttura'),
        referente: campo('referente'),
        email,
        citta: campo('citta'),
        messaggio: [campo('tipologia') && `Tipologia di struttura: ${campo('tipologia')}`, campo('messaggio')].filter(Boolean).join('\n'),
        pagina: campo('pagina'),
      }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return risposta(201, { ok: true })
  } catch (err) {
    console.error('Richiesta non salvata', err)
    return risposta(502, { errore: 'Invio non riuscito' })
  }
}
