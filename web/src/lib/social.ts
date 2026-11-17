/**
 * Profili social attivi dalle Impostazioni (Version: 1.00).
 * Un profilo vale solo se è attivo e ha un indirizzo https completo.
 */
import type { Doc } from './cms'

export const RETI: Record<string, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  pinterest: 'Pinterest',
  youtube: 'YouTube',
  linkedin: 'LinkedIn',
}

export interface Social { rete: string; nome: string; url: string }

export const socialAttivi = (imp: Doc): Social[] =>
  ((imp?.social || []) as Doc[])
    .filter((s) => s && s.attivo !== false && RETI[s.rete] && /^https:\/\/\S+\.\S+$/.test(String(s.indirizzo || '').trim()))
    .map((s) => ({ rete: s.rete, nome: RETI[s.rete], url: String(s.indirizzo).trim() }))

/** Dove stanno le icone sul computer: 'barra' (laterale), 'menu', 'entrambi', 'nessuno'. */
export const posizioneSocial = (imp: Doc): string => imp?.socialPosizione || 'barra'
