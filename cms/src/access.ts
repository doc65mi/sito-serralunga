import type { Access } from 'payload'

export const pubblico: Access = () => true

export const soloRedazione: Access = ({ req }) => Boolean(req.user)

/** Visitatori: solo documenti pubblicati. Redazione: anche le bozze. */
export const pubblicatiOppureRedazione: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}
