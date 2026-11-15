'use client'

/**
 * Version: 1.00
 * Campo "modello" delle impostazioni AI: un campo di testo libero con accanto il pulsante
 * "Scansiona modelli disponibili", che legge l'elenco dal fornitore (OpenRouter, OpenAI,
 * Gemini) e lo mostra filtrabile. Un clic sulla voce la scrive nel campo.
 */
import { FieldDescription, FieldLabel, useField } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import React, { useMemo, useState } from 'react'

interface Voce {
  id: string
  nome: string
  nota?: string
}

type Extra = { fornitore?: string; uso?: 'testi' | 'immagini' }

export const CampoModello: TextFieldClientComponent = (props) => {
  const { field, path, readOnly } = props
  const { fornitore = 'openrouter', uso = 'testi' } = props as unknown as Extra
  const { value, setValue } = useField<string>({ path })
  const [voci, setVoci] = useState<Voce[] | null>(null)
  const [filtro, setFiltro] = useState('')
  const [stato, setStato] = useState<{ testo: string; errore?: boolean } | null>(null)
  const [attesa, setAttesa] = useState(false)
  const id = `field-${path.replace(/\./g, '__')}`

  async function scansiona() {
    setAttesa(true)
    setStato({ testo: 'Lettura dell’elenco dal fornitore…' })
    try {
      const r = await fetch(`/api/ai/modelli?fornitore=${encodeURIComponent(fornitore)}&uso=${uso}`, { credentials: 'same-origin' })
      const d = (await r.json().catch(() => ({}))) as { modelli?: Voce[]; errore?: string }
      if (!r.ok) throw new Error(d.errore || `Errore ${r.status}`)
      const elenco = d.modelli || []
      setVoci(elenco)
      setFiltro('')
      setStato({
        testo: elenco.length
          ? `${elenco.length} modelli ${uso === 'immagini' ? 'che generano immagini' : 'per i testi'}. Clicca una voce per sceglierla, poi salva.`
          : 'Il fornitore non ha restituito modelli di questo tipo.',
      })
    } catch (err) {
      setVoci(null)
      setStato({ testo: (err as Error).message, errore: true })
    } finally {
      setAttesa(false)
    }
  }

  const visibili = useMemo(() => {
    if (!voci) return []
    const q = filtro.trim().toLowerCase()
    return q ? voci.filter((v) => v.id.toLowerCase().includes(q) || v.nome.toLowerCase().includes(q)) : voci
  }, [voci, filtro])

  return (
    <div className="field-type text sl-modello">
      <FieldLabel htmlFor={id} label={field.label} required={field.required} />
      <div className="sl-modello__riga">
        <input
          id={id}
          type="text"
          name={path}
          value={value || ''}
          onChange={(e) => setValue(e.target.value)}
          disabled={readOnly}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="button" className="sl-modello__scansiona" onClick={scansiona} disabled={attesa || readOnly}>
          {attesa ? 'Scansione…' : 'Scansiona modelli disponibili'}
        </button>
      </div>
      {stato && (
        <p className={`sl-modello__stato${stato.errore ? ' sl-modello__stato--errore' : ''}`} role="status" aria-live="polite">
          {stato.testo}
        </p>
      )}
      {voci && voci.length > 0 && (
        <div className="sl-modello__elenco">
          <input
            type="search"
            className="sl-modello__filtro"
            placeholder="Filtra per nome, per esempio claude, gpt, gemini, flux…"
            aria-label="Filtra i modelli"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          <ul>
            {visibili.slice(0, 300).map((v) => (
              <li key={v.id}>
                <button type="button" className={v.id === value ? 'sl-modello__voce sl-modello__voce--scelta' : 'sl-modello__voce'} onClick={() => setValue(v.id)} aria-pressed={v.id === value}>
                  <span className="sl-modello__id">{v.id}</span>
                  <span className="sl-modello__nota">{[v.nome !== v.id ? v.nome : '', v.nota].filter(Boolean).join(' · ')}</span>
                </button>
              </li>
            ))}
          </ul>
          {visibili.length === 0 && <p className="sl-modello__stato">Nessun modello corrisponde al filtro.</p>}
          {visibili.length > 300 && <p className="sl-modello__stato">Mostrati i primi 300: usa il filtro per restringere.</p>}
        </div>
      )}
      <FieldDescription description={field.admin?.description} path={path} />
    </div>
  )
}
