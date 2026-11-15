/**
 * Version: 1.00
 * Un solo punto di accesso ai tre fornitori (OpenAI, OpenRouter, Gemini).
 * Le chiavi si leggono dal globale "ai" solo qui, sul server.
 */
import type { Payload } from 'payload'

export type Fornitore = 'openai' | 'openrouter' | 'gemini'

export interface ConfigAi {
  attiva: boolean
  fornitoreTesti: Fornitore
  fornitoreImmagini: Fornitore
  direttive: string
  chiavi: Record<Fornitore, string>
  testi: Record<Fornitore, string>
  immagini: Record<Fornitore, string>
  articoliAttivi: boolean
  tokenArticoli: string
  linguaArticoli: 'it' | 'en'
}

export async function configAi(payload: Payload): Promise<ConfigAi> {
  const g = (await payload.findGlobal({ slug: 'ai', overrideAccess: true, context: { chiavi: true }, depth: 0 })) as unknown as Record<string, string | boolean | undefined>
  const s = (k: string) => String(g[k] || '').trim()
  return {
    attiva: g.attiva === true,
    fornitoreTesti: (s('fornitoreTesti') || 'openai') as Fornitore,
    fornitoreImmagini: (s('fornitoreImmagini') || 'openai') as Fornitore,
    direttive: s('direttive'),
    chiavi: { openai: s('chiaveOpenai'), openrouter: s('chiaveOpenrouter'), gemini: s('chiaveGemini') },
    testi: { openai: s('modelloOpenai'), openrouter: s('modelloOpenrouter'), gemini: s('modelloGemini') },
    immagini: { openai: s('modelloImmaginiOpenai'), openrouter: s('modelloImmaginiOpenrouter'), gemini: s('modelloImmaginiGemini') },
    articoliAttivi: g.articoliAttivi === true,
    tokenArticoli: s('tokenArticoli'),
    linguaArticoli: s('lingueArticoli') === 'en' ? 'en' : 'it',
  }
}

export class ErroreAi extends Error {
  constructor(messaggio: string, public stato = 502) {
    super(messaggio)
  }
}

const NOMI: Record<Fornitore, string> = { openai: 'OpenAI', openrouter: 'OpenRouter', gemini: 'Gemini' }

async function chiama(f: Fornitore, url: string, init: RequestInit, attesa = 90_000): Promise<Record<string, unknown>> {
  let res: Response
  try {
    res = await fetch(url, { ...init, signal: AbortSignal.timeout(attesa) })
  } catch (err) {
    const scaduto = (err as Error).name === 'TimeoutError'
    throw new ErroreAi(scaduto ? `${NOMI[f]} non ha risposto in tempo: riprovare.` : `${NOMI[f]} non è raggiungibile dal server: controllare che il server possa uscire su internet.`, 504)
  }
  const corpo = (await res.json().catch(() => ({}))) as Record<string, unknown>
  if (!res.ok) {
    const e = corpo.error as { message?: string } | string | undefined
    const dettaglio = typeof e === 'string' ? e : e?.message || ''
    const nota =
      res.status === 401 || res.status === 403
        ? 'chiave API non valida o senza permessi'
        : res.status === 429
          ? 'limite di richieste o credito esaurito: attendere o scegliere un altro modello'
          : res.status === 404
            ? 'modello non trovato: controllare il nome nelle impostazioni'
            : 'errore del fornitore'
    throw new ErroreAi(`${NOMI[f]}: ${nota} (HTTP ${res.status}). ${dettaglio}`.trim().slice(0, 400))
  }
  return corpo
}

function serve(c: ConfigAi, f: Fornitore, modello: string) {
  if (!c.chiavi[f]) throw new ErroreAi(`Manca la chiave API di ${NOMI[f]}: si inserisce nel pannello, Impostazioni > Intelligenza artificiale.`, 400)
  if (!modello) throw new ErroreAi(`Manca il nome del modello di ${NOMI[f]} nelle impostazioni.`, 400)
}

export interface Domanda {
  sistema: string
  utente: string
  /** Immagine da guardare (per il testo alternativo). */
  immagine?: { mime: string; base64: string }
  json?: boolean
  maxToken?: number
}

/** Chiede un testo al fornitore scelto per i testi. */
export async function chiediTesto(c: ConfigAi, d: Domanda): Promise<string> {
  const f = c.fornitoreTesti
  const modello = c.testi[f]
  serve(c, f, modello)
  if (f === 'gemini') {
    const parti: unknown[] = [{ text: d.utente }]
    if (d.immagine) parti.push({ inlineData: { mimeType: d.immagine.mime, data: d.immagine.base64 } })
    const r = await chiama(f, `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modello)}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': c.chiavi.gemini },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: d.sistema }] },
        contents: [{ role: 'user', parts: parti }],
        generationConfig: { maxOutputTokens: d.maxToken || 2000, ...(d.json ? { responseMimeType: 'application/json' } : {}) },
      }),
    })
    const cand = (r.candidates as { content?: { parts?: { text?: string }[] } }[] | undefined)?.[0]
    const testo = (cand?.content?.parts || []).map((p) => p.text || '').join('')
    if (!testo.trim()) throw new ErroreAi('Gemini ha restituito una risposta vuota.')
    return testo.trim()
  }
  const contenuto = d.immagine
    ? [{ type: 'text', text: d.utente }, { type: 'image_url', image_url: { url: `data:${d.immagine.mime};base64,${d.immagine.base64}` } }]
    : d.utente
  const r = await chiama(f, f === 'openai' ? 'https://api.openai.com/v1/chat/completions' : 'https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${c.chiavi[f]}` },
    body: JSON.stringify({
      model: modello,
      messages: [{ role: 'system', content: d.sistema }, { role: 'user', content: contenuto }],
      ...(d.json ? { response_format: { type: 'json_object' } } : {}),
    }),
  })
  const testo = (r.choices as { message?: { content?: string } }[] | undefined)?.[0]?.message?.content || ''
  if (!testo.trim()) throw new ErroreAi(`${NOMI[f]} ha restituito una risposta vuota.`)
  return testo.trim()
}

/** Genera un'immagine da una descrizione. Restituisce i byte e il tipo. */
export async function generaImmagine(c: ConfigAi, descrizione: string, orientamento: 'orizzontale' | 'verticale' | 'quadrata'): Promise<{ dati: Buffer; mime: string }> {
  const f = c.fornitoreImmagini
  const modello = c.immagini[f]
  serve(c, f, modello)
  const daUrl = (u?: string) => {
    const m = /^data:(image\/[a-z+]+);base64,(.+)$/s.exec(u || '')
    if (!m) throw new ErroreAi(`${NOMI[f]} non ha restituito un'immagine: il modello scelto potrebbe non generarne.`)
    return { dati: Buffer.from(m[2], 'base64'), mime: m[1] }
  }
  if (f === 'openai') {
    const size = orientamento === 'verticale' ? '1024x1536' : orientamento === 'quadrata' ? '1024x1024' : '1536x1024'
    const r = await chiama(f, 'https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${c.chiavi.openai}` },
      body: JSON.stringify({ model: modello, prompt: descrizione, size, n: 1 }),
    }, 180_000)
    const b64 = (r.data as { b64_json?: string }[] | undefined)?.[0]?.b64_json
    if (!b64) throw new ErroreAi('OpenAI non ha restituito un\'immagine.')
    return { dati: Buffer.from(b64, 'base64'), mime: 'image/png' }
  }
  const richiesta = `${descrizione}\nFormato ${orientamento}.`
  if (f === 'openrouter') {
    const r = await chiama(f, 'https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${c.chiavi.openrouter}` },
      body: JSON.stringify({ model: modello, messages: [{ role: 'user', content: richiesta }], modalities: ['image', 'text'] }),
    }, 180_000)
    const img = (r.choices as { message?: { images?: { image_url?: { url?: string } }[] } }[] | undefined)?.[0]?.message?.images?.[0]
    return daUrl(img?.image_url?.url)
  }
  const r = await chiama(f, `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modello)}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': c.chiavi.gemini },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: richiesta }] }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'] } }),
  }, 180_000)
  const parti = (r.candidates as { content?: { parts?: { inlineData?: { mimeType?: string; data?: string } }[] } }[] | undefined)?.[0]?.content?.parts || []
  const p = parti.find((x) => x.inlineData?.data)?.inlineData
  if (!p?.data) throw new ErroreAi('Gemini non ha restituito un\'immagine: il modello scelto potrebbe non generarne.')
  return { dati: Buffer.from(p.data, 'base64'), mime: p.mimeType || 'image/png' }
}
