'use client'

/**
 * Version: 1.00
 * Riquadro "Pubblica su Coolify" nel cruscotto (strumenti/sincronizza.ts).
 * - Sul PC: indirizzo del sito online e sua chiave di ricezione (si inseriscono una volta),
 *   poi un clic su «Pubblica su Coolify» copia contenuti e foto. Avanzamento ogni 3 secondi.
 * - Sul sito online: la chiave di ricezione da copiare sul PC, l'ultima ricezione e
 *   «Ripristina» per tornare ai contenuti di prima dell'ultima pubblicazione.
 */
import React, { useCallback, useEffect, useState } from 'react'

interface Fase {
  stato: 'mai' | 'in-corso' | 'ok' | 'errore'
  quando?: string
  errore?: string
  verso?: string
  origine?: string
  file?: number
  daInviare?: number
  registro: string
}
interface Stato {
  chiave: string
  chiaveDaVariabile: boolean
  destinazione: { url: string; chiave: string } | null
  invio: Fase
  ricezione: Fase
  ultimaRicevuta: string
  copie: string[]
}

const quando = (iso?: string) => (iso ? new Date(iso).toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' }) : '')

function etichetta(f: Fase, cosa: string) {
  if (f.stato === 'in-corso') return f.daInviare ? `In corso: ${f.file || 0} di ${f.daInviare} file inviati` : 'In corso…'
  if (f.stato === 'ok') return `${cosa} completata il ${quando(f.quando)}`
  if (f.stato === 'errore') return `Non completata (${quando(f.quando)}): ${f.errore || 'vedi il registro'}`
  return 'Mai eseguita'
}

export default function Sincronizza() {
  const [s, setS] = useState<Stato | null>(null)
  const [url, setUrl] = useState('')
  const [chiave, setChiave] = useState('')
  const [modifica, setModifica] = useState(false)
  const [messaggio, setMessaggio] = useState('')
  const [registro, setRegistro] = useState<'invio' | 'ricezione' | null>(null)
  const [conferma, setConferma] = useState<'pubblica' | 'ripristina' | null>(null)
  const [mostraChiave, setMostraChiave] = useState(false)

  const carica = useCallback(async () => {
    try {
      const r = await fetch('/api/sincronizza/stato', { credentials: 'same-origin', cache: 'no-store' })
      if (r.ok) setS((await r.json()) as Stato)
    } catch {
      /* si riprova al giro dopo */
    }
  }, [])
  useEffect(() => {
    carica()
    const t = setInterval(carica, 3000)
    return () => clearInterval(t)
  }, [carica])

  async function chiama(azione: string, corpo: Record<string, unknown> = {}) {
    setMessaggio('')
    setConferma(null)
    const r = await fetch(`/api/sincronizza/${azione}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    })
    const d = (await r.json().catch(() => ({}))) as { errore?: string }
    if (!r.ok) setMessaggio(d.errore || `Errore ${r.status}`)
    await carica()
    return r.ok
  }

  if (!s) return null
  const invioInCorso = s.invio.stato === 'in-corso'
  const ricezioneInCorso = s.ricezione.stato === 'in-corso'
  const configurato = !!s.destinazione && !modifica

  return (
    <section id="pubblica-coolify" className="sl-strumenti" aria-label="Pubblica su Coolify">
      <h2 className="sl-strumenti__titolo">Pubblica su Coolify</h2>
      <p className="sl-strumenti__nota">
        Il codice arriva su Coolify da GitHub; contenuti e foto (testi, menu, logo, home, schede, ritratti) si copiano da qui con un clic. Il sito online
        prende tutto dal PC; restano suoi solo utenti, richieste dei clienti e registro del database. Prima di sostituire, il sito online salva una copia
        dei contenuti che aveva.
      </p>
      {messaggio && (
        <p className="sl-strumenti__errore" role="alert">
          {messaggio}
        </p>
      )}
      <div className="sl-strumenti__griglia">
        <div className={`sl-strumento sl-strumento--${s.invio.stato}`}>
          <span className="sl-strumento__titolo">Invia dal PC al sito online</span>
          {configurato ? (
            <span className="sl-strumento__testo">
              Destinazione: <strong>{s.destinazione!.url}</strong> · chiave {s.destinazione!.chiave}{' '}
              <button type="button" className="sl-strumento__registro-pulsante" onClick={() => { setUrl(s.destinazione!.url); setChiave(''); setModifica(true) }}>
                Cambia
              </button>
            </span>
          ) : (
            <form
              className="sl-strumento__modulo"
              onSubmit={async (e) => {
                e.preventDefault()
                if (await chiama('destinazione', { url, chiave })) setModifica(false)
              }}
            >
              <span className="sl-strumento__testo">Una volta sola: indirizzo del sito online e chiave di ricezione, che trovi su quel sito in Strumenti, riquadro «Ricevi dal PC».</span>
              <label className="sl-strumento__campo">
                <span>Indirizzo del sito online</span>
                <input type="url" required placeholder="https://serralunga1825.oltre.media" value={url} onChange={(e) => setUrl(e.target.value)} />
              </label>
              <label className="sl-strumento__campo">
                <span>Chiave di ricezione</span>
                <input type="password" autoComplete="off" placeholder={s.destinazione ? 'lascia vuoto per tenere quella salvata' : ''} value={chiave} onChange={(e) => setChiave(e.target.value)} />
              </label>
              <div className="sl-strumento__azioni">
                <button type="submit" className="sl-strumento__pulsante">Salva</button>
                {s.destinazione && (
                  <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setModifica(false)}>
                    Annulla
                  </button>
                )}
              </div>
            </form>
          )}
          <span className="sl-strumento__stato" aria-live="polite">
            {invioInCorso && <span className="sl-strumento__spia" aria-hidden="true" />}
            {etichetta(s.invio, 'Pubblicazione')}
          </span>
          {configurato && (
            <div className="sl-strumento__azioni">
              {invioInCorso ? (
                <button type="button" className="sl-strumento__pulsante sl-strumento__pulsante--ferma" onClick={() => chiama('ferma')}>
                  Interrompi
                </button>
              ) : conferma === 'pubblica' ? (
                <>
                  <button type="button" className="sl-strumento__pulsante sl-strumento__pulsante--rischio" onClick={() => { chiama('pubblica'); setRegistro('invio') }}>
                    Sì, sostituisci i contenuti online
                  </button>
                  <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setConferma(null)}>
                    Annulla
                  </button>
                </>
              ) : (
                <button type="button" className="sl-strumento__pulsante" onClick={() => setConferma('pubblica')}>
                  Pubblica su Coolify
                </button>
              )}
              {s.invio.registro && (
                <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setRegistro(registro === 'invio' ? null : 'invio')}>
                  {registro === 'invio' ? 'Nascondi registro' : 'Mostra registro'}
                </button>
              )}
            </div>
          )}
          {conferma === 'pubblica' && (
            <span className="sl-strumento__testo">
              I contenuti del sito online verranno sostituiti da quelli di questo PC (copia di sicurezza automatica prima). Le modifiche fatte direttamente sul sito
              online dopo l’ultima pubblicazione andranno perse.
            </span>
          )}
          {registro === 'invio' && s.invio.registro && <pre className="sl-strumento__registro">{s.invio.registro}</pre>}
        </div>

        <div className={`sl-strumento sl-strumento--${s.ricezione.stato}`}>
          <span className="sl-strumento__titolo">Ricevi dal PC</span>
          <span className="sl-strumento__testo">
            Chiave di ricezione di questo sito, da incollare nel pannello del PC:{' '}
            {s.chiaveDaVariabile ? (
              <em>impostata con la variabile SINCRONIZZA_CHIAVE</em>
            ) : (
              <>
                <code className="sl-strumento__chiave">{mostraChiave ? s.chiave : `${'•'.repeat(12)}${s.chiave.slice(-4)}`}</code>{' '}
                <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setMostraChiave(!mostraChiave)}>
                  {mostraChiave ? 'Nascondi' : 'Mostra'}
                </button>{' '}
                <button type="button" className="sl-strumento__registro-pulsante" onClick={() => navigator.clipboard?.writeText(s.chiave).then(() => setMessaggio('Chiave copiata.'))}>
                  Copia
                </button>
              </>
            )}
          </span>
          <span className="sl-strumento__stato" aria-live="polite">
            {ricezioneInCorso && <span className="sl-strumento__spia" aria-hidden="true" />}
            {etichetta(s.ricezione, s.ricezione.origine?.startsWith('ripristino') ? 'Ripristino' : 'Ricezione')}
          </span>
          {s.ultimaRicevuta && (
            <span className="sl-strumento__testo">
              Questo sito riceve i contenuti dal PC: gli aggiornamenti automatici dopo un deploy sono spenti, per non creare differenze.
            </span>
          )}
          <div className="sl-strumento__azioni">
            {!!s.copie.length && !ricezioneInCorso && (conferma === 'ripristina' ? (
              <>
                <button type="button" className="sl-strumento__pulsante sl-strumento__pulsante--rischio" onClick={() => { chiama('ripristina'); setRegistro('ricezione') }}>
                  Sì, ripristina
                </button>
                <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setConferma(null)}>
                  Annulla
                </button>
              </>
            ) : (
              <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setConferma('ripristina')}>
                Ripristina i contenuti di prima dell’ultima ricezione…
              </button>
            ))}
            {s.ricezione.registro && (
              <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setRegistro(registro === 'ricezione' ? null : 'ricezione')}>
                {registro === 'ricezione' ? 'Nascondi registro' : 'Mostra registro'}
              </button>
            )}
          </div>
          {registro === 'ricezione' && s.ricezione.registro && <pre className="sl-strumento__registro">{s.ricezione.registro}</pre>}
        </div>
      </div>
    </section>
  )
}
