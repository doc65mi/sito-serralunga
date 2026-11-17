/**
 * Version: 1.00
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

export function proxy(req: NextRequest) {
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
