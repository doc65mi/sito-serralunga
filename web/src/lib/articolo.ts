/**
 * Version: 1.00
 * Dal testo di un articolo (Markdown o HTML semplice) all'HTML della pagina.
 * Tutto passa da una pulizia severa: restano solo titoli, paragrafi, elenchi, citazioni,
 * tabelle, link e immagini https. Niente script, stili o attributi di evento, anche se
 * l'articolo arriva da una piattaforma esterna.
 */
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

const sembraHtml = (s: string) => /<\/(p|h[1-6]|ul|ol|div|article|section|table)>/i.test(s)

export function corpoArticolo(testo?: string | null): string {
  if (!testo?.trim()) return ''
  const grezzo = sembraHtml(testo) ? testo : (marked.parse(testo, { async: false, gfm: true }) as string)
  return sanitizeHtml(grezzo, {
    allowedTags: ['h2', 'h3', 'h4', 'p', 'br', 'strong', 'em', 'b', 'i', 'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'figure', 'figcaption', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr'],
    allowedAttributes: { a: ['href', 'title', 'rel', 'target'], img: ['src', 'alt', 'width', 'height', 'loading', 'decoding'], th: ['scope'] },
    allowedSchemes: ['https', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['https'] },
    allowProtocolRelative: false,
    // Le immagini senza indirizzo https vengono tolte del tutto.
    exclusiveFilter: (f) => f.tag === 'img' && !/^https:\/\//.test(f.attribs.src || ''),
    // Un solo H1 per pagina: i titoli di primo livello dell'articolo scendono di un grado.
    transformTags: {
      h1: 'h2',
      a: (tagName, attribs) => {
        const fuori = /^https:\/\//.test(attribs.href || '')
        return { tagName, attribs: fuori ? { ...attribs, rel: 'noopener', target: '_blank' } : attribs }
      },
      img: (tagName, attribs) => ({ tagName, attribs: { ...attribs, loading: 'lazy', decoding: 'async' } }),
    },
  } as sanitizeHtml.IOptions)
}

/** Parole dell'articolo, per i dati strutturati. */
export const parole = (html: string) => html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length
