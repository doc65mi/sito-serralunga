import type { APIRoute } from 'astro'
import { CMS_INTERNAL, env } from '../../lib/cms'

/**
 * Riceve il modulo del sito e lo salva nella collezione "richieste" di Payload.
 * La chiave SITO_CHIAVE (uguale in Astro e in Payload) autorizza la scrittura.
 */
export const POST: APIRoute = async ({ request, redirect }) => {
  const dati = await request.formData()
  const vuole = (request.headers.get('accept') || '').includes('application/json')
  const risposta = (stato: number, corpo: Record<string, unknown>) =>
    vuole ? new Response(JSON.stringify(corpo), { status: stato, headers: { 'Content-Type': 'application/json' } }) : redirect(stato < 300 ? '/?richiesta=ok#invito' : '/?richiesta=errore#invito', 303)

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
        messaggio: campo('messaggio'),
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
