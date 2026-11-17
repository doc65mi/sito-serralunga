'use client'

/**
 * Version: 1.00
 * Pulsante «Invia un'email di prova» in Moduli, newsletter ed email: manda all'utente collegato
 * l'email di conferma con dati di esempio, per controllare server di posta e aspetto.
 */
import React, { useState } from 'react'

export const ProvaEmail: React.FC = () => {
  const [stato, setStato] = useState<{ testo: string; errore?: boolean } | null>(null)
  const [attesa, setAttesa] = useState(false)
  async function prova() {
    setAttesa(true)
    setStato({ testo: 'Invio in corso…' })
    try {
      const r = await fetch('/api/moduli/prova-email', { method: 'POST', credentials: 'same-origin' })
      const d = (await r.json().catch(() => ({}))) as { a?: string; errore?: string }
      if (!r.ok) throw new Error(d.errore || `Errore ${r.status}`)
      setStato({ testo: `Email di prova inviata a ${d.a}. Controllate anche la cartella spam.` })
    } catch (err) {
      setStato({ testo: (err as Error).message, errore: true })
    } finally {
      setAttesa(false)
    }
  }
  return (
    <div style={{ margin: '8px 0 28px', color: '#111', fontSize: 14 }}>
      <button type="button" className="btn btn--style-secondary btn--size-medium" onClick={prova} disabled={attesa}>
        Invia un’email di prova
      </button>
      <p style={{ margin: '8px 0 0', color: stato?.errore ? '#a3402c' : '#111' }}>
        {stato?.testo || 'Prima salvate le impostazioni: la prova usa i valori salvati e arriva al vostro indirizzo di accesso.'}
      </p>
    </div>
  )
}
