'use client'
/**
 * Version: 1.00 — Nome delle righe chiuse negli elenchi del pannello (menu, sottovoci, footer,
 * paragrafi, gallerie…): al posto di "Voce 01" si legge l'etichetta, il titolo o il nome della riga.
 */
import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

const CAMPI = ['etichetta', 'titolo', 'nome', 'domanda', 'label', 'testo', 'didascalia', 'valore', 'anno', 'link', 'url', 'email']

const breve = (v: string) => {
  const t = v.replace(/\s+/g, ' ').replace(/_/g, '').trim()
  return t.length > 70 ? `${t.slice(0, 70)}…` : t
}

export default function EtichettaRiga() {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const numero = String((rowNumber ?? 0) + 1).padStart(2, '0')
  let nome = ''
  for (const k of CAMPI) {
    const v = data?.[k]
    if (typeof v === 'string' && v.trim()) {
      nome = breve(v)
      break
    }
    if (typeof v === 'number') {
      nome = String(v)
      break
    }
  }
  const voci = Array.isArray(data?.voci) ? (data.voci as unknown[]).length : 0
  return (
    <span>
      {numero} · {nome || 'Nuova riga'}
      {voci > 0 ? ` (${voci} sottovoci)` : ''}
    </span>
  )
}
