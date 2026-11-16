'use client'

/**
 * Version: 1.01
 * Riquadro "Strumenti" nel cruscotto: aggiorna i contenuti e importa il catalogo da
 * serralunga.com senza terminale. Mostra stato e avanzamento, aggiornati ogni 5 secondi.
 * Aggiunge solo ciò che manca; le modifiche a contenuti già presenti compaiono come
 * "aggiornamenti disponibili" e si applicano solo con un clic esplicito (copia di sicurezza prima).
 */
import React, { useCallback, useEffect, useState } from 'react'

interface Stato {
  compito: 'aggiorna' | 'catalogo'
  stato: 'mai' | 'in-corso' | 'ok' | 'errore'
  quando: string
  inAttesa: boolean
  registro: string
  proposte: { dove: string; titolo: string; lingua: string; campi: string[] }[]
}

const VOCI = {
  aggiorna: {
    titolo: 'Aggiorna contenuti',
    testo: 'Aggiunge ciò che manca: schede designer, ritratti, pagine nuove, versioni AVIF delle foto. Non modifica nulla di ciò che esiste già. Circa 5–15 minuti.',
  },
  catalogo: {
    titolo: 'Importa catalogo da serralunga.com',
    testo: 'Aggiunge categorie e schede prodotto che mancano, con varianti e foto pubblicate su serralunga.com. Le schede esistenti non si toccano. Scarica centinaia di foto: 15–40 minuti.',
  },
} as const

const quando = (iso: string) => (iso ? new Date(iso).toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' }) : '')

function etichetta(s: Stato) {
  if (s.stato === 'in-corso') return s.inAttesa ? 'In coda: parte appena finisce l’altro compito' : `In corso dalle ${quando(s.quando)}`
  if (s.stato === 'ok') return `Completato il ${quando(s.quando)}`
  if (s.stato === 'errore') return `Interrotto il ${quando(s.quando)}: vedi il registro`
  return 'Mai eseguito da questo pannello'
}

export default function Strumenti() {
  const [compiti, setCompiti] = useState<Stato[]>([])
  const [aperto, setAperto] = useState<string | null>(null)
  const [messaggio, setMessaggio] = useState<string>('')
  const [conferma, setConferma] = useState<string | null>(null)

  const carica = useCallback(async () => {
    try {
      const r = await fetch('/api/strumenti/stato', { credentials: 'same-origin', cache: 'no-store' })
      if (r.ok) setCompiti(((await r.json()) as { compiti: Stato[] }).compiti)
    } catch {
      /* rete assente: si riprova al giro dopo */
    }
  }, [])

  useEffect(() => {
    carica()
    const t = setInterval(carica, 5000)
    return () => clearInterval(t)
  }, [carica])

  async function avvia(compito: string, applica = false) {
    setMessaggio('')
    setConferma(null)
    const r = await fetch('/api/strumenti/avvia', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ compito, applica }),
    })
    const d = (await r.json().catch(() => ({}))) as { errore?: string }
    if (!r.ok) setMessaggio(d.errore || `Errore ${r.status}`)
    setAperto(compito)
    carica()
  }

  return (
    <section id="strumenti" className="sl-strumenti" aria-label="Strumenti">
      <h2 className="sl-strumenti__titolo">Strumenti</h2>
      <p className="sl-strumenti__nota">Dopo ogni pubblicazione con contenuti nuovi partono da soli e aggiungono solo ciò che manca: quello che hai modificato sul sito non viene mai sovrascritto. Qui si possono rilanciare; continuano anche chiudendo il pannello.</p>
      {messaggio && <p className="sl-strumenti__errore" role="alert">{messaggio}</p>}
      <div className="sl-strumenti__griglia">
        {(Object.keys(VOCI) as Array<keyof typeof VOCI>).map((c) => {
          const s = compiti.find((x) => x.compito === c)
          const inCorso = s?.stato === 'in-corso'
          return (
            <div key={c} className={`sl-strumento sl-strumento--${s?.stato || 'mai'}`}>
              <span className="sl-strumento__titolo">{VOCI[c].titolo}</span>
              <span className="sl-strumento__testo">{VOCI[c].testo}</span>
              <span className="sl-strumento__stato" aria-live="polite">
                {inCorso && <span className="sl-strumento__spia" aria-hidden="true" />}
                {s ? etichetta(s) : '…'}
              </span>
              <div className="sl-strumento__azioni">
                <button type="button" className="sl-strumento__pulsante" disabled={inCorso} onClick={() => avvia(c)}>
                  {inCorso ? 'In corso…' : 'Avvia'}
                </button>
                {s?.registro && (
                  <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setAperto(aperto === c ? null : c)}>
                    {aperto === c ? 'Nascondi registro' : 'Mostra registro'}
                  </button>
                )}
              </div>
              {aperto === c && s?.registro && <pre className="sl-strumento__registro">{s.registro}</pre>}
              {!inCorso && !!s?.proposte?.length && (
                <div className="sl-strumento__proposte">
                  <p className="sl-strumento__proposte-titolo">
                    {s.proposte.length === 1 ? '1 aggiornamento disponibile' : `${s.proposte.length} aggiornamenti disponibili`} su contenuti già presenti
                  </p>
                  <p className="sl-strumento__testo">
                    Non sono stati applicati per non perdere le modifiche fatte sul sito. Controlla l’elenco: se li applichi, prima viene salvata una copia di ogni contenuto toccato (e le pagine con le versioni si possono ripristinare dalla scheda Versioni).
                  </p>
                  <ul className="sl-strumento__elenco">
                    {s.proposte.map((p, i) => (
                      <li key={i}>
                        <strong>{p.titolo || p.dove}</strong>
                        {p.lingua !== 'it' ? ` (${p.lingua})` : ''} · <span>{p.dove}</span> · campi: {p.campi.join(', ')}
                      </li>
                    ))}
                  </ul>
                  {conferma === c ? (
                    <div className="sl-strumento__azioni">
                      <button type="button" className="sl-strumento__pulsante sl-strumento__pulsante--rischio" onClick={() => avvia(c, true)}>
                        Sì, applica e sovrascrivi
                      </button>
                      <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setConferma(null)}>
                        Annulla
                      </button>
                    </div>
                  ) : (
                    <div className="sl-strumento__azioni">
                      <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setConferma(c)}>
                        Applica questi aggiornamenti…
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
