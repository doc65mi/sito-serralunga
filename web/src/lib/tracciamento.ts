/**
 * Version: 1.00
 * Codici di tracciamento letti da Impostazioni del sito > Sicurezza e tracciamento.
 * Solo identificativi ripuliti (lettere, numeri, trattini): niente codice libero nella pagina.
 */
import type { Doc } from './cms'

const pulito = (v: unknown, forma: RegExp) => {
  const s = typeof v === 'string' ? v.trim() : ''
  return forma.test(s) ? s : ''
}

export function codiciTracciamento(imp: Doc) {
  return {
    ga4: pulito(imp.googleAnalytics, /^G-[A-Z0-9]{4,20}$/i),
    gtm: pulito(imp.googleTagManager, /^GTM-[A-Z0-9]{4,12}$/i),
    ads: pulito(imp.googleAds, /^AW-\d{5,15}$/i),
    adsConversione: pulito(imp.googleAdsConversione, /^[A-Za-z0-9_-]{4,64}$/),
    clarity: pulito(imp.microsoftClarity, /^[a-z0-9]{6,20}$/i),
    meta: pulito(imp.metaPixel, /^\d{8,20}$/),
    linkedin: pulito(imp.linkedinInsight, /^\d{4,15}$/),
  }
}

export type Codici = ReturnType<typeof codiciTracciamento>

/** Il banner dei cookie serve solo se c'è almeno un codice di statistica o marketing. */
export const tracciamentoAttivo = (imp: Doc) => Object.entries(codiciTracciamento(imp)).some(([k, v]) => k !== 'adsConversione' && v)
