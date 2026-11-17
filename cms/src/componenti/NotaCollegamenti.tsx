'use client'

/**
 * Version: 1.00
 * Riquadro in Impostazioni > Sicurezza e tracciamento: dove stanno gli altri collegamenti
 * (ContentAIPro, chiavi AI, posta e newsletter), con l'indirizzo da copiare in ContentAIPro.
 */
import React, { useEffect, useState } from 'react'

const riquadro: React.CSSProperties = { border: '1px solid #d8d2c4', background: '#faf8f3', color: '#111', fontSize: 14, lineHeight: 1.6, padding: '18px 22px', margin: '8px 0 24px', borderRadius: 4 }
const titolo: React.CSSProperties = { fontSize: 14, fontWeight: 600, margin: '0 0 8px', color: '#111' }
const a: React.CSSProperties = { color: '#111', textDecoration: 'underline' }

export const NotaCollegamenti: React.FC = () => {
  const [origine, setOrigine] = useState('')
  useEffect(() => setOrigine(window.location.origin), [])
  return (
    <div style={riquadro}>
      <p style={titolo}>Altri collegamenti</p>
      <p style={{ margin: '0 0 8px' }}>
        <strong>ContentAIPro</strong> (articoli in arrivo nel Journal): il token si imposta in{' '}
        <a style={a} href="/admin/globals/ai">Intelligenza artificiale › ContentAIPro</a>. Indirizzo da indicare nella piattaforma:{' '}
        <code>{origine}/api/ricevi-articoli</code>
      </p>
      <p style={{ margin: '0 0 8px' }}>
        <strong>Chiavi AI</strong> (OpenAI, OpenRouter, Gemini): <a style={a} href="/admin/globals/ai">Intelligenza artificiale</a>.
      </p>
      <p style={{ margin: 0 }}>
        <strong>Privacy dei moduli, newsletter, email di conferma e server di posta</strong>:{' '}
        <a style={a} href="/admin/globals/moduli">Moduli, newsletter ed email</a>. Iscritti in{' '}
        <a style={a} href="/admin/collections/iscritti-newsletter">Contatti › Iscritti newsletter</a>.
      </p>
    </div>
  )
}
