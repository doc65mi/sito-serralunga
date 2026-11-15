/**
 * Version: 1.00
 * Rigenera le versioni ridotte delle foto già caricate nel formato corrente (AVIF)
 * e segnala le foto troppo piccole per essere mostrate grandi.
 * Non tocca il file caricato, il testo alternativo né il punto focale.
 */
import fs from 'fs'
import path from 'path'

import type { Payload } from 'payload'

const CARTELLA = path.resolve(process.cwd(), process.env.MEDIA_DIR || 'media')
/** Sotto questa larghezza una foto a tutta pagina appare sgranata. */
export const LARGHEZZA_MINIMA = 1200

type Voce = {
  id: number
  filename?: string | null
  mimeType?: string | null
  width?: number | null
  sizes?: Record<string, { filename?: string | null; mimeType?: string | null } | undefined>
}

export async function rigeneraFormati(payload: Payload, log: (m: string) => void) {
  let rifatte = 0
  let saltate = 0
  const piccole: string[] = []
  for (let page = 1; ; page++) {
    const r = await payload.find({ collection: 'media', limit: 50, page, depth: 0, sort: 'id' })
    for (const doc of r.docs as unknown as Voce[]) {
      if (!doc.filename || !doc.mimeType?.startsWith('image/') || doc.mimeType === 'image/svg+xml') continue
      if (doc.width && doc.width < LARGHEZZA_MINIMA) piccole.push(`${doc.filename} (${doc.width}px)`)
      const ridotte = Object.values(doc.sizes || {}).filter((s) => s?.filename)
      if (ridotte.length && ridotte.every((s) => s?.mimeType === 'image/avif')) continue
      const file = path.join(CARTELLA, doc.filename)
      if (!fs.existsSync(file)) {
        saltate++
        continue
      }
      try {
        await payload.update({ collection: 'media', id: doc.id, data: {}, filePath: file, overwriteExistingFiles: true })
        rifatte++
      } catch (err) {
        saltate++
        payload.logger.warn(`[seed] versioni AVIF non rigenerate per ${doc.filename}: ${(err as Error).message}`)
      }
    }
    if (!r.hasNextPage) break
  }
  log(`foto portate in AVIF: ${rifatte}; saltate: ${saltate}`)
  if (piccole.length) log(`foto sotto ${LARGHEZZA_MINIMA}px di larghezza (${piccole.length}): ${piccole.join(', ')}`)
  return { rifatte, saltate, piccole }
}
