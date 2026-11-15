/**
 * Version: 1.00
 * Le chiavi API si salvano cifrate (AES-256-GCM) con una chiave derivata da PAYLOAD_SECRET:
 * chi legge il database o un backup non vede le chiavi in chiaro.
 */
import crypto from 'crypto'

const PREFISSO = 'c1:'
const chiave = () => crypto.createHash('sha256').update(`serralunga-ai:${process.env.PAYLOAD_SECRET || ''}`).digest()

export const MASCHERA = '••••'
export const mascherata = (v: unknown) => typeof v === 'string' && v.startsWith(MASCHERA)

export function cifra(chiaro: string): string {
  const iv = crypto.randomBytes(12)
  const c = crypto.createCipheriv('aes-256-gcm', chiave(), iv)
  const corpo = Buffer.concat([c.update(chiaro, 'utf8'), c.final()])
  return PREFISSO + Buffer.concat([iv, c.getAuthTag(), corpo]).toString('base64')
}

export function decifra(valore?: string | null): string {
  if (!valore) return ''
  if (!valore.startsWith(PREFISSO)) return valore
  try {
    const dati = Buffer.from(valore.slice(PREFISSO.length), 'base64')
    const d = crypto.createDecipheriv('aes-256-gcm', chiave(), dati.subarray(0, 12))
    d.setAuthTag(dati.subarray(12, 28))
    return Buffer.concat([d.update(dati.subarray(28)), d.final()]).toString('utf8')
  } catch {
    // PAYLOAD_SECRET cambiato: la chiave va reinserita.
    return ''
  }
}

/** Confronto a tempo costante, per i token in ingresso. */
export const uguali = (a: string, b: string) => {
  const x = crypto.createHash('sha256').update(a).digest()
  const y = crypto.createHash('sha256').update(b).digest()
  return crypto.timingSafeEqual(x, y)
}
