import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Utente', plural: 'Utenti' },
  admin: { useAsTitle: 'email', group: 'Impostazioni' },
  // Accessi: dopo 6 tentativi sbagliati l'utente resta bloccato 15 minuti; la sessione dura 8 ore.
  auth: {
    maxLoginAttempts: 6,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 8 * 60 * 60,
    cookies: { sameSite: 'Lax', secure: (process.env.SITO_URL || '').startsWith('https://') },
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [{ name: 'nome', type: 'text', label: 'Nome' }],
}
