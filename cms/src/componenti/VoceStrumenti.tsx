/**
 * Version: 1.00
 * Voce "Strumenti" in fondo alla barra laterale del pannello: porta al riquadro Strumenti
 * del cruscotto (aggiornamento contenuti, import catalogo, aggiornamenti disponibili).
 */
import React from 'react'

export default function VoceStrumenti() {
  return (
    <div className="sl-voce-strumenti">
      <p className="sl-voce-strumenti__gruppo">Manutenzione</p>
      <a className="sl-voce-strumenti__link" href="/admin#strumenti">
        Strumenti: aggiorna contenuti e catalogo
      </a>
    </div>
  )
}
