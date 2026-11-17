/**
 * Version: 1.00
 * Verifica reCAPTCHA (v2 casella o v3 invisibile) con la chiave segreta delle Impostazioni.
 * Se la protezione è spenta o le chiavi mancano, l'invio passa (resta il campo trappola).
 */
type Doc = Record<string, any>

export async function verificaRecaptcha(
  imp: Doc,
  token: string,
  ip: string,
  azione: string,
): Promise<{ ok: boolean; motivo?: string }> {
  const segreta = String(imp.recaptchaChiaveSegreta || '')
  if (!imp.recaptchaAttivo || !segreta || !imp.recaptchaChiaveSito) return { ok: true }
  if (!token) return { ok: false, motivo: 'token mancante' }
  try {
    const corpo = new URLSearchParams({ secret: segreta, response: token })
    if (ip) corpo.set('remoteip', ip)
    const r = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      body: corpo,
      signal: AbortSignal.timeout(8000),
    })
    const d = (await r.json()) as { success?: boolean; score?: number; action?: string; 'error-codes'?: string[] }
    if (!d.success) return { ok: false, motivo: (d['error-codes'] || []).join(', ') || 'non valido' }
    if (imp.recaptchaTipo !== 'v2') {
      const soglia = typeof imp.recaptchaSoglia === 'number' ? imp.recaptchaSoglia : 0.5
      if (typeof d.score === 'number' && d.score < soglia) return { ok: false, motivo: `punteggio ${d.score}` }
      if (d.action && d.action !== azione) return { ok: false, motivo: `azione ${d.action}` }
    }
    return { ok: true }
  } catch (err) {
    // Google non raggiungibile: meglio far passare la richiesta che perdere un cliente.
    console.error('[moduli] verifica reCAPTCHA non riuscita', err)
    return { ok: true, motivo: 'verifica non disponibile' }
  }
}
