import type { Field, FieldHook } from 'payload'

import { cifra, decifra, MASCHERA, mascherata } from '../ai/segreto'

/**
 * Version: 1.00
 * Campo per chiavi e password di un global (reCAPTCHA, SMTP): cifrato nel database,
 * mai restituito intero dalle API e invisibile ai visitatori. Nel pannello si vedono solo
 * le ultime quattro lettere; per cambiarlo si scrive sopra, per toglierlo si svuota.
 * Il server lo legge in chiaro con `context: { chiavi: true }`.
 */
export const campoSegreto = (slug: string, name: string, label: string, description: string): Field => {
  const salva: FieldHook = async ({ value, req }) => {
    if (value === '' || value === null) return ''
    if (value === undefined || mascherata(value)) {
      const grezzo = (await req.payload.db.findGlobal({ slug, req })) as Record<string, unknown> | null
      const salvato = grezzo?.[name]
      return typeof salvato === 'string' && !mascherata(salvato) ? salvato : ''
    }
    return cifra(String(value).trim())
  }
  const leggi: FieldHook = ({ value, req }) => {
    const chiaro = decifra(value as string)
    if (req?.context?.chiavi === true) return chiaro
    return chiaro ? `${MASCHERA}${chiaro.slice(-4)}` : ''
  }
  return {
    name,
    type: 'text',
    label,
    access: { read: ({ req }) => Boolean(req.user) || req.context?.chiavi === true },
    admin: { description, autoComplete: 'off' },
    hooks: { beforeChange: [salva], afterRead: [leggi] },
  }
}
