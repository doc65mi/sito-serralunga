/**
 * Version: 1.00
 * Pulsante "Modifica frontend" nella testata del pannello: resta visibile anche quando
 * la barra laterale è chiusa (schermi fino a 1440 px).
 */
import React from 'react'

const sito = (process.env.SITO_URL || '').replace(/\/$/, '')

export default function AzioneFrontend() {
  return (
    <a className="sl-frontend__pulsante sl-frontend__pulsante--testata" href={`${sito}/`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </svg>
      <span>Modifica frontend</span>
    </a>
  )
}
