/**
 * Version: 1.01
 * 1.01 (Indicizzazione e sicurezza 1.00): limite di tentativi per indirizzo IP su accesso al pannello,
 *      password dimenticata, reimpostazione e sblocco (oltre al blocco dell'utente dopo 6 errori).
 * Salvataggi dal pannello e dalla pagina con qualunque nome del sito.
 *
 * Payload accetta il cookie di accesso solo se l'intestazione Origin è nell'elenco `csrf`
 * (costruito da SITO_URL). Se SITO_URL non coincide col dominio aperto nel browser, le pagine
 * si vedono ma ogni salvataggio risponde "You are not allowed to perform this action".
 * Una richiesta che arriva dallo stesso indirizzo che sta chiamando (Origin = host della
 * richiesta) è dello stesso sito per definizione: qui le si toglie l'Origin e la si segna
 * Sec-Fetch-Site: same-origin (come fa già il browser), così Payload accetta il cookie.
 * Le richieste da altri siti restano controllate come prima.
 */
import { NextResponse, type NextRequest } from 'next/server'

const hostDi = (u: string | null) => {
  try {
    return u ? new URL(u).host.toLowerCase() : ''
  } catch {
    return ''
  }
}

/* ---------- Limite di tentativi di accesso, per indirizzo IP ---------- */

/** Percorsi di accesso protetti (POST): accesso, password dimenticata, reimpostazione, sblocco, primo utente. */
const ACCESSO = /^\/api\/users\/(login|forgot-password|reset-password|unlock|first-register)\/?$/
const MASSIMO = 10
const FINESTRA = 15 * 60_000
const tentativi = new Map<string, number[]>()

const privato = (ip: string) =>
  /^(10\.|127\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|169\.254\.|::1$|f[cd][0-9a-f]{2}:|fe80:)/i.test(ip) || ip === ''

/**
 * IP del visitatore: il primo indirizzo pubblico partendo da destra in X-Forwarded-For.
 * Gli indirizzi a destra li aggiungono i nostri proxy (Coolify/Traefik, Caddy); quelli a sinistra
 * li può scrivere chiunque, quindi non si usano.
 */
function ipDi(req: NextRequest): string {
  const catena = (req.headers.get('x-forwarded-for') || '').split(',').map((x) => x.trim().replace(/^::ffff:/, '')).filter(Boolean)
  for (let i = catena.length - 1; i >= 0; i--) if (!privato(catena[i])) return catena[i]
  return catena[0] || req.headers.get('x-real-ip') || 'sconosciuto'
}

function troppiTentativi(req: NextRequest): number {
  const ip = ipDi(req)
  const ora = Date.now()
  const recenti = (tentativi.get(ip) || []).filter((t) => ora - t < FINESTRA)
  if (recenti.length >= MASSIMO) {
    tentativi.set(ip, recenti)
    return Math.ceil((recenti[0] + FINESTRA - ora) / 1000)
  }
  recenti.push(ora)
  tentativi.set(ip, recenti)
  // Pulizia: la mappa non cresce senza limiti.
  if (tentativi.size > 5000) for (const [k, v] of tentativi) if (!v.some((t) => ora - t < FINESTRA)) tentativi.delete(k)
  return 0
}

export function proxy(req: NextRequest) {
  if (req.method === 'POST' && ACCESSO.test(req.nextUrl.pathname)) {
    const attesa = troppiTentativi(req)
    if (attesa) {
      return NextResponse.json(
        { errors: [{ message: `Troppi tentativi di accesso da questo indirizzo. Riprovare tra ${Math.ceil(attesa / 60)} minuti.` }] },
        { status: 429, headers: { 'Retry-After': String(attesa), 'Cache-Control': 'no-store' } },
      )
    }
  }
  const origine = hostDi(req.headers.get('origin'))
  if (!origine) return NextResponse.next()
  const chiamato = (req.headers.get('x-forwarded-host')?.split(',')[0] || req.headers.get('host') || '').trim().toLowerCase()
  if (!chiamato || origine !== chiamato) return NextResponse.next()
  const intestazioni = new Headers(req.headers)
  intestazioni.delete('origin')
  intestazioni.set('sec-fetch-site', 'same-origin')
  return NextResponse.next({ request: { headers: intestazioni } })
}

export const config = { matcher: ['/api/:path*', '/admin/:path*'] }
