import type { CollectionConfig, Field, GlobalConfig } from 'payload'

/**
 * Version: 1.00 — Dà a tutti gli elenchi (campi "array") del pannello un'etichetta di riga
 * leggibile (componenti/EtichettaRiga.tsx), compresi quelli dentro schede, gruppi, righe e blocchi.
 * Un campo che ha già una propria RowLabel la tiene.
 */
const ETICHETTA = '/componenti/EtichettaRiga'

function campi(lista: Field[]): Field[] {
  return lista.map((f) => {
    const c = { ...f } as Record<string, any>
    if (c.type === 'array') {
      c.admin = { ...(c.admin || {}), components: { ...(c.admin?.components || {}) } }
      if (!c.admin.components.RowLabel) c.admin.components.RowLabel = ETICHETTA
    }
    if (Array.isArray(c.fields)) c.fields = campi(c.fields)
    if (Array.isArray(c.tabs)) c.tabs = c.tabs.map((t: Record<string, any>) => ({ ...t, fields: campi(t.fields || []) }))
    if (Array.isArray(c.blocks)) c.blocks = c.blocks.map((b: Record<string, any>) => ({ ...b, fields: campi(b.fields || []) }))
    return c as Field
  })
}

export const conEtichette = <T extends CollectionConfig | GlobalConfig>(cfg: T): T => ({ ...cfg, fields: campi(cfg.fields) })
