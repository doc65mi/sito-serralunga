/**
 * Version: 1.00
 * Pulsante in testa alla barra laterale del pannello: porta al sito, dove chi ha fatto
 * l'accesso modifica testi, pulsanti e foto direttamente nella pagina.
 */
import React from 'react'

const sito = (process.env.SITO_URL || '').replace(/\/$/, '')

export default function ModificaFrontend() {
  return (
    <div className="sl-frontend">
      <a className="sl-frontend__pulsante" href={`${sito}/`}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
        <span>Modifica frontend</span>
      </a>
      <p className="sl-frontend__nota">Testi, pulsanti e foto si cambiano direttamente nella pagina.</p>
    </div>
  )
}
