'use client'

/**
 * Version: 2.00
 * Riquadro "Contenuti su GitHub" nel cruscotto (strumenti/sincronizza.ts).
 * GitHub è il punto di riferimento: da qualunque sito si salvano lì i contenuti, e ogni sito
 * carica da solo quelli nuovi (se non ha modifiche non salvate). Stato aggiornato ogni 3 secondi.
 */
import React, { useCallback, useEffect, useState } from 'react'

interface Stato {
  repo: string
  ramo: string
  token: string
  automatico: boolean
  occupato: string | null
  controllo: {
    quando: string
    esito: 'allineato' | 'da-salvare' | 'da-caricare' | 'conflitto' | 'vuoto' | 'codice-vecchio' | 'senza-token' | 'errore'
    errore?: string
    github?: { salvato: string; da: string; chi: string }
  } | null
  allineamento: { github?: string; locale?: string; commit?: string; quando?: string }
  registro: string
  copie: string[]
}

const quando = (iso?: string) => (iso ? new Date(iso).toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' }) : '')

const OCCUPATO: Record<string, string> = {
  salva: 'Salvataggio su GitHub in corso…',
  carica: 'Caricamento da GitHub in corso…',
  ripristina: 'Ripristino in corso…',
  controllo: 'Controllo di GitHub in corso…',
}

function descrivi(s: Stato) {
  const c = s.controllo
  const ultimo = c?.github ? `Ultimo salvataggio: ${c.github.da}, ${quando(c.github.salvato)} (${c.github.chi})` : ''
  switch (c?.esito) {
    case 'allineato':
      return { classe: 'ok', testo: `Allineato con GitHub. ${ultimo}` }
    case 'da-salvare':
      return { classe: 'avviso', testo: `Qui ci sono modifiche non ancora salvate su GitHub. ${ultimo}` }
    case 'da-caricare':
      return { classe: 'avviso', testo: `Su GitHub ci sono contenuti più recenti: si caricano da soli entro 10 minuti, oppure subito con «Carica da GitHub». ${ultimo}` }
    case 'conflitto':
      return {
        classe: 'errore',
        testo: s.allineamento.locale
          ? `Contenuti cambiati sia qui sia su GitHub. ${ultimo}. Scegli quale tenere: «Salva comunque» sostituisce GitHub con questo sito, «Carica comunque» sostituisce questo sito (copia di sicurezza prima).`
          : `Questo sito non è ancora collegato ai contenuti di GitHub. ${ultimo}. Se il sito più aggiornato è un altro, «Carica comunque»; se è questo, «Salva comunque».`,
      }
    case 'vuoto':
      return { classe: 'avviso', testo: 'Su GitHub non ci sono ancora contenuti: salvali dal sito più aggiornato.' }
    case 'codice-vecchio':
      return { classe: 'avviso', testo: 'Su GitHub ci sono contenuti salvati con una versione più nuova del codice: si caricano dopo l’aggiornamento di questo sito.' }
    case 'senza-token':
      return { classe: 'avviso', testo: 'Inserisci il token di GitHub per collegare questo sito.' }
    case 'errore':
      return { classe: 'errore', testo: `Controllo non riuscito: ${c.errore || 'vedi il registro'}` }
    default:
      return { classe: 'mai', testo: 'Controllo in attesa…' }
  }
}

export default function Sincronizza() {
  const [s, setS] = useState<Stato | null>(null)
  const [token, setToken] = useState('')
  const [modificaToken, setModificaToken] = useState(false)
  const [messaggio, setMessaggio] = useState('')
  const [registro, setRegistro] = useState(false)
  const [conferma, setConferma] = useState<string | null>(null)

  const aggiorna = useCallback(async () => {
    try {
      const r = await fetch('/api/contenuti-github/stato', { credentials: 'same-origin', cache: 'no-store' })
      if (r.ok) setS((await r.json()) as Stato)
    } catch {
      /* si riprova al giro dopo */
    }
  }, [])
  useEffect(() => {
    aggiorna()
    const t = setInterval(aggiorna, 3000)
    return () => clearInterval(t)
  }, [aggiorna])

  async function chiama(percorso: string, corpo: Record<string, unknown>) {
    setMessaggio('')
    setConferma(null)
    const r = await fetch(`/api/contenuti-github/${percorso}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    })
    const d = (await r.json().catch(() => ({}))) as { errore?: string }
    if (!r.ok) setMessaggio(d.errore || `Errore ${r.status}`)
    await aggiorna()
    return r.ok
  }
  const azione = (a: string, forza = false) => {
    setRegistro(true)
    return chiama('azione', { azione: a, forza })
  }

  if (!s) return null
  const d = descrivi(s)
  const libero = !s.occupato
  const esito = s.controllo?.esito
  const senzaToken = !s.token

  const Conferma = ({ id, testo, si, onSi }: { id: string; testo: string; si: string; onSi: () => void }) =>
    conferma === id ? (
      <>
        <span className="sl-strumento__testo">{testo}</span>
        <div className="sl-strumento__azioni">
          <button type="button" className="sl-strumento__pulsante sl-strumento__pulsante--rischio" onClick={onSi}>
            {si}
          </button>
          <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setConferma(null)}>
            Annulla
          </button>
        </div>
      </>
    ) : null

  return (
    <section id="contenuti-github" className="sl-strumenti" aria-label="Contenuti su GitHub">
      <h2 className="sl-strumenti__titolo">Contenuti su GitHub</h2>
      <p className="sl-strumenti__nota">
        GitHub è il punto di riferimento per codice e contenuti. Dopo aver modificato testi, menu, foto o schede, premi «Salva su GitHub»: gli altri
        siti (PC o Coolify) li caricano da soli entro 10 minuti. Utenti, richieste dei clienti, iscritti alla newsletter e chiavi segrete restano di
        ciascun sito.
      </p>
      {messaggio && (
        <p className="sl-strumenti__errore" role="alert">
          {messaggio}
        </p>
      )}
      <div className="sl-strumenti__griglia">
        <div className={`sl-strumento sl-strumento--${d.classe === 'ok' ? 'ok' : d.classe === 'errore' ? 'errore' : 'mai'}`}>
          <span className="sl-strumento__titolo">Stato dei contenuti</span>
          <span className="sl-strumento__stato" aria-live="polite">
            {!libero && <span className="sl-strumento__spia" aria-hidden="true" />}
            {s.occupato ? OCCUPATO[s.occupato] || 'In corso…' : d.testo}
          </span>
          {s.controllo?.quando && libero && <span className="sl-strumento__testo">Controllato il {quando(s.controllo.quando)}.</span>}

          {!senzaToken && (
            <div className="sl-strumento__azioni">
              <button type="button" className="sl-strumento__pulsante" disabled={!libero} onClick={() => (esito === 'conflitto' || esito === 'da-caricare' ? setConferma('salva') : azione('salva'))}>
                Salva su GitHub
              </button>
              <button type="button" className="sl-strumento__registro-pulsante" disabled={!libero} onClick={() => (esito === 'conflitto' || esito === 'da-salvare' ? setConferma('carica') : azione('carica'))}>
                Carica da GitHub
              </button>
              <button type="button" className="sl-strumento__registro-pulsante" disabled={!libero} onClick={() => azione('controlla')}>
                Controlla ora
              </button>
              {s.registro && (
                <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setRegistro(!registro)}>
                  {registro ? 'Nascondi registro' : 'Mostra registro'}
                </button>
              )}
            </div>
          )}
          <Conferma
            id="salva"
            testo="Su GitHub ci sono contenuti salvati da un altro sito che qui non sono ancora caricati: salvando, GitHub prende i contenuti di questo sito al loro posto (restano nella cronologia di GitHub)."
            si="Salva comunque"
            onSi={() => azione('salva', true)}
          />
          <Conferma
            id="carica"
            testo="Le modifiche fatte qui e non salvate su GitHub verranno sostituite. Prima viene salvata una copia locale, recuperabile con «Ripristina»."
            si="Carica comunque"
            onSi={() => azione('carica', true)}
          />
          {registro && s.registro && <pre className="sl-strumento__registro">{s.registro}</pre>}
        </div>

        <div className="sl-strumento">
          <span className="sl-strumento__titolo">Collegamento a GitHub</span>
          <span className="sl-strumento__testo">
            Repository <strong>{s.repo}</strong>, ramo <strong>{s.ramo}</strong> (solo contenuti: salvarli non ricompila il sito).
          </span>
          {s.token === 'variabile' ? (
            <span className="sl-strumento__testo">Token impostato con la variabile CONTENUTI_GITHUB_TOKEN.</span>
          ) : senzaToken || modificaToken ? (
            <form
              className="sl-strumento__modulo"
              onSubmit={async (e) => {
                e.preventDefault()
                if (await chiama('impostazioni', { token })) {
                  setToken('')
                  setModificaToken(false)
                }
              }}
            >
              <span className="sl-strumento__testo">
                Una volta per ogni sito. Su GitHub: Settings → Developer settings → Fine-grained tokens → Generate new token, repository {s.repo}, permesso
                «Contents: Read and write». Copia il token qui.
              </span>
              <label className="sl-strumento__campo">
                <span>Token di GitHub</span>
                <input type="password" autoComplete="off" required placeholder="github_pat_…" value={token} onChange={(e) => setToken(e.target.value)} />
              </label>
              <div className="sl-strumento__azioni">
                <button type="submit" className="sl-strumento__pulsante">Salva token</button>
                {!senzaToken && (
                  <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setModificaToken(false)}>
                    Annulla
                  </button>
                )}
              </div>
            </form>
          ) : (
            <span className="sl-strumento__testo">
              Token {s.token}{' '}
              <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setModificaToken(true)}>
                Cambia
              </button>
            </span>
          )}
          <label className="sl-strumento__campo sl-strumento__campo--riga">
            <input type="checkbox" checked={s.automatico} onChange={(e) => chiama('impostazioni', { automatico: e.target.checked })} />
            <span>Carica da solo i contenuti nuovi di GitHub (solo se qui non ci sono modifiche non salvate)</span>
          </label>
          {!!s.copie.length && libero && (
            <>
              <div className="sl-strumento__azioni">
                <button type="button" className="sl-strumento__registro-pulsante" onClick={() => setConferma('ripristina')}>
                  Ripristina i contenuti di prima dell’ultimo caricamento…
                </button>
              </div>
              <Conferma
                id="ripristina"
                testo={`Torna ai contenuti salvati nella copia ${s.copie[0].slice(0, 16).replace('T', ' ')} (UTC). Poi andranno salvati su GitHub o ricaricati.`}
                si="Sì, ripristina"
                onSi={() => azione('ripristina')}
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}
