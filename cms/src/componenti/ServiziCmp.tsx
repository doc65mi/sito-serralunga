'use client'

/**
 * Version: 1.01 (mostra le pagine Privacy e Cookie Policy collegate)
 * Riquadro «Servizi rilevati» in Impostazioni > Privacy e cookies: la CMP legge da sola i codici
 * di Impostazioni del sito > Sicurezza e tracciamento (Google Analytics 4, Tag Manager, Ads, Clarity,
 * Meta Pixel, LinkedIn, reCAPTCHA) e i servizi di questa pagina, li mette nella categoria giusta e
 * li riporta nel banner, nel pannello delle preferenze e nella Cookie Policy. Qui si vede l'elenco
 * così come lo vedono i visitatori (letto dal sito: /api/cmp/servizi).
 */
import React, { useCallback, useEffect, useState } from 'react'

type Servizio = { id: string; nome: string; societa: string; categoria: string; origine: string; codice: string; cookie: string[] }
type Dati = { privacyLink: string; cookieLink: string; versione: string; giorni: number; mostraBanner: boolean; googleAvanzata: boolean; categorie: string[]; fornitori: Servizio[]; script: { nome: string; categoria: string }[] }

const NOMI: Record<string, string> = { necessari: 'Necessari (sempre attivi)', preferenze: 'Preferenze', statistiche: 'Statistiche', marketing: 'Marketing' }
const riquadro: React.CSSProperties = { border: '1px solid #d8d2c4', background: '#faf8f3', color: '#111', fontSize: 14, lineHeight: 1.6, padding: '18px 22px', margin: '8px 0 24px', borderRadius: 4 }
const cella: React.CSSProperties = { textAlign: 'left', verticalAlign: 'top', padding: '6px 12px 6px 0', borderBottom: '1px solid #e4dfd5', color: '#111', fontSize: 14 }
const a: React.CSSProperties = { color: '#111', textDecoration: 'underline' }

export const ServiziCmp: React.FC = () => {
  const [dati, setDati] = useState<Dati | null>(null)
  const [errore, setErrore] = useState('')
  const carica = useCallback(async () => {
    setErrore('')
    try {
      const r = await fetch('/api/cmp/servizi', { cache: 'no-store' })
      if (!r.ok) throw new Error(String(r.status))
      setDati(await r.json())
    } catch {
      setErrore('Elenco non disponibile da questo indirizzo: si vede aprendo il pannello dall’indirizzo del sito (es. https://dominio/admin).')
    }
  }, [])
  useEffect(() => void carica(), [carica])

  return (
    <div style={riquadro}>
      <p style={{ fontWeight: 600, margin: '0 0 6px' }}>Servizi rilevati dalla CMP</p>
      <p style={{ margin: '0 0 12px' }}>
        La CMP riconosce da sola i servizi attivati in{' '}
        <a style={a} href="/admin/globals/impostazioni">Impostazioni del sito › Sicurezza e tracciamento</a> e li mette nella categoria giusta del banner, del
        pannello delle preferenze e della <a style={a} href="/cookie-policy/" target="_blank" rel="noopener">Cookie Policy</a>. Per aggiungere o togliere un servizio basta
        inserire o cancellare il suo codice e salvare: l’elenco si aggiorna sul sito entro un minuto.
      </p>
      {errore && <p style={{ margin: 0 }}>{errore}</p>}
      {dati && (
        <>
          <p style={{ margin: '0 0 12px' }}>
            Versione dell’informativa <strong>{dati.versione}</strong> · scelta valida {dati.giorni} giorni · banner{' '}
            <strong>{dati.mostraBanner ? 'attivo' : 'non necessario (solo cookie tecnici)'}</strong> · Consent Mode {dati.googleAvanzata ? 'avanzata' : 'base'}
          </p>
          <p style={{ margin: '0 0 12px' }}>
            Pagine collegate a banner, pannello delle preferenze, footer e a tutti i moduli: Privacy Policy{' '}
            <a style={a} href={dati.privacyLink} target="_blank" rel="noopener">{dati.privacyLink}</a> (<a style={a} href={`/en${dati.privacyLink}`} target="_blank" rel="noopener">EN</a>) · Cookie Policy{' '}
            <a style={a} href={dati.cookieLink} target="_blank" rel="noopener">{dati.cookieLink}</a> (<a style={a} href={`/en${dati.cookieLink}`} target="_blank" rel="noopener">EN</a>). Si cambiano nella scheda «Banner».
          </p>
          {dati.categorie.map((c) => {
            const elenco = dati.fornitori.filter((f) => f.categoria === c)
            const script = dati.script.filter((s) => s.categoria === c)
            return (
              <div key={c} style={{ margin: '0 0 14px' }}>
                <p style={{ fontWeight: 600, margin: '0 0 4px' }}>{NOMI[c] || c}</p>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={cella}>Servizio</th>
                      <th style={cella}>Codice</th>
                      <th style={cella}>Attivato da</th>
                      <th style={cella}>Cookie (durata)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {elenco.map((f) => (
                      <tr key={f.id}>
                        <td style={cella}>{f.nome}{f.societa ? ` — ${f.societa}` : ''}</td>
                        <td style={cella}><code>{f.codice || '—'}</code></td>
                        <td style={cella}>{f.origine}</td>
                        <td style={cella}>{f.cookie.length ? f.cookie.join(', ') : 'nessuno proprio'}</td>
                      </tr>
                    ))}
                    {script.map((s) => (
                      <tr key={`s-${s.nome}`}>
                        <td style={cella}>{s.nome}</td>
                        <td style={cella}>—</td>
                        <td style={cella}>Privacy e cookies › Script di terze parti</td>
                        <td style={cella}>da indicare in «Altri fornitori»</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          })}
          <button type="button" onClick={() => void carica()} style={{ font: 'inherit', fontSize: 14, padding: '6px 14px', cursor: 'pointer', border: '1px solid #111', background: '#fff', color: '#111' }}>
            Aggiorna l’elenco
          </button>
        </>
      )}
    </div>
  )
}
