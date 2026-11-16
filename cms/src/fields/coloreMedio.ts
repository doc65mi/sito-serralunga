import path from 'path'

import type { Payload } from 'payload'
import sharp from 'sharp'

/**
 * Version: 1.00
 * Colore di un campione della cartella colori, ricavato dalla foto del campione (serralunga.com/pages/colors).
 * Si legge la parte centrale della foto (i bordi possono avere sfondo o ombre) e se ne prende il colore
 * dominante: è il colore pieno usato dai quadrati 30×30 delle schede prodotto.
 */
export async function coloreMedio(payload: Payload, media: unknown): Promise<string | null> {
  const id = media && typeof media === 'object' ? (media as { id?: number | string }).id : media
  if (id === null || id === undefined || id === '') return null
  try {
    const doc = (await payload.findByID({ collection: 'media', id: id as number, depth: 0 })) as unknown as { filename?: string; mimeType?: string }
    if (!doc?.filename || !String(doc.mimeType || '').startsWith('image/')) return null
    const file = path.resolve(process.env.MEDIA_DIR || 'media', doc.filename)
    const img = sharp(file)
    const { width = 0, height = 0 } = await img.metadata()
    if (!width || !height) return null
    const centro = await img
      .extract({ left: Math.round(width * 0.25), top: Math.round(height * 0.25), width: Math.max(1, Math.round(width * 0.5)), height: Math.max(1, Math.round(height * 0.5)) })
      .removeAlpha()
      .resize(64, 64, { fit: 'fill' })
      .raw()
      .toBuffer({ resolveWithObject: true })
    // Media dei pixel del centro: per un campione uniforme coincide col colore, senza i salti del "dominante".
    let r = 0, g = 0, b = 0
    const n = centro.info.width * centro.info.height
    for (let i = 0; i < centro.data.length; i += centro.info.channels) {
      r += centro.data[i]
      g += centro.data[i + 1]
      b += centro.data[i + 2]
    }
    const h = (v: number) => Math.round(v / n).toString(16).padStart(2, '0')
    return `#${h(r)}${h(g)}${h(b)}`.toUpperCase()
  } catch {
    return null
  }
}
