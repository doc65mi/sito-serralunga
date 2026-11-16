/**
 * Creazioni dei designer prese dal catalogo di serralunga.com (Version: 1.00).
 * Si legge l'elenco pubblico dei prodotti (products.json di Shopify): ogni prodotto porta
 * tra le etichette il nome del designer. Per ogni designer si scelgono le foto di prodotto
 * e quelle ambientate dei suoi pezzi. Non si genera né si ritocca nulla: nomi, tipologie
 * e immagini sono quelli pubblicati sul sito.
 */
import sharp from 'sharp'

const SITO = 'https://serralunga.com'

export interface ProdottoShop {
  title: string
  handle: string
  product_type: string
  tags: string[]
  images: { src: string; width: number; height: number }[]
  body_html?: string
  published_at?: string
  options?: { name: string; position: number; values: string[] }[]
  variants?: { id: number; title: string; sku?: string | null; option1?: string | null; option2?: string | null; option3?: string | null }[]
  titoloEn?: string
  tipoEn?: string
  bodyEn?: string
  variantiEn?: ProdottoShop['variants']
  opzioniEn?: ProdottoShop['options']
}

export interface Creazione {
  url: string
  nome: string
  nomeEn: string
  tipo: string
  tipoEn: string
  ambientata: boolean
  fonte: string
}

const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

export async function json(url: string): Promise<{ products?: ProdottoShop[] }> {
  const res = await fetch(url, { signal: AbortSignal.timeout(40_000), headers: { Accept: 'application/json' } })
  if (!res.ok) throw new Error(`HTTP ${res.status} su ${url}`)
  return (await res.json()) as { products?: ProdottoShop[] }
}

async function pagine(prefisso: string): Promise<ProdottoShop[]> {
  const tutti: ProdottoShop[] = []
  for (let p = 1; p <= 20; p++) {
    const dati = await json(`${SITO}${prefisso}/products.json?limit=250&page=${p}`)
    const lista = dati.products || []
    tutti.push(...lista)
    if (lista.length < 250) break
  }
  return tutti
}

let catalogoCache: ProdottoShop[] | null = null
/** Tutti i prodotti pubblicati, con titolo e tipologia anche in inglese quando disponibili. */
export async function catalogo(): Promise<ProdottoShop[]> {
  if (catalogoCache) return catalogoCache
  const it = await pagine('')
  let en: ProdottoShop[] = []
  try {
    en = await pagine('/en')
  } catch {
    // senza la versione inglese restano i nomi italiani
  }
  const perHandle = new Map(en.map((p) => [p.handle, p]))
  catalogoCache = it.map((p) => ({
    ...p,
    tags: Array.isArray(p.tags) ? p.tags : String(p.tags || '').split(',').map((x) => x.trim()),
    titoloEn: perHandle.get(p.handle)?.title,
    tipoEn: perHandle.get(p.handle)?.product_type,
    bodyEn: perHandle.get(p.handle)?.body_html,
    variantiEn: perHandle.get(p.handle)?.variants,
    opzioniEn: perHandle.get(p.handle)?.options,
  }))
  return catalogoCache
}

const RICAMBI = /ricambio|spare|cuscino|cushion|tappo|plug|telecomando|remote|lampadina|bulb|kit\b|cavo|cable/i

/** Nome del file senza il codice che Shopify aggiunge alle copie: serve a non ripetere la stessa foto. */
const chiaveFoto = (src: string) =>
  decodeURIComponent(new URL(src).pathname.split('/').pop() || '')
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/_[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, '')
    .toLowerCase()

const conLarghezza = (src: string, w: number) => {
  const u = new URL(src)
  u.searchParams.set('width', String(w))
  return u.toString()
}

const scontornoCache = new Map<string, boolean>()
/**
 * true se la foto è uno scontorno su fondo bianco (foto di prodotto), false se è ambientata.
 * Si guarda una miniatura: bordo quasi tutto bianco = scontorno.
 */
async function scontorno(src: string): Promise<boolean> {
  if (scontornoCache.has(src)) return scontornoCache.get(src)!
  let esito = true
  try {
    const res = await fetch(conLarghezza(src, 48), { signal: AbortSignal.timeout(20_000) })
    if (!res.ok) throw new Error(String(res.status))
    const { data, info } = await sharp(Buffer.from(await res.arrayBuffer()))
      .flatten({ background: '#ffffff' })
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
    let bordo = 0
    let chiari = 0
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        if (x > 1 && x < info.width - 2 && y > 1 && y < info.height - 2) continue
        const i = (y * info.width + x) * info.channels
        bordo++
        if (data[i] > 236 && data[i + 1] > 236 && data[i + 2] > 236) chiari++
      }
    }
    esito = chiari / bordo > 0.82
  } catch {
    esito = true
  }
  scontornoCache.set(src, esito)
  return esito
}

/**
 * Le foto dei pezzi di un designer.
 * etichette: nomi con cui il designer compare tra le etichette dei prodotti.
 * pezzi: nomi delle collezioni firmate, usati se un prodotto non ha l'etichetta del designer.
 */
export async function creazioniDi(etichette: string[], pezzi: string[], massimo = 12): Promise<Creazione[]> {
  const prodotti = await catalogo()
  const nomi = etichette.map(norm).filter(Boolean)
  const inizi = pezzi.map((p) => norm(p).replace(/ /g, '-')).filter((p) => p.length > 2)
  const suoi = prodotti.filter((p) => {
    if (RICAMBI.test(`${p.product_type} ${p.title} ${p.handle}`)) return false
    const tag = p.tags.map(norm)
    if (nomi.some((n) => tag.includes(n))) return true
    return inizi.some((s) => p.handle === s || p.handle.startsWith(`${s}-`))
  })
  // Prima i modelli base: le varianti Moleskin e con luce ripetono le stesse forme.
  const variante = (p: ProdottoShop) => (/moleskin|with-light|con-luce|laccat/i.test(p.handle) ? 1 : 0)
  suoi.sort((a, b) => variante(a) - variante(b))

  const viste = new Set<string>()
  const fuori: Creazione[] = []
  const voce = (p: ProdottoShop, src: string, ambientata: boolean): Creazione => ({
    url: conLarghezza(src, 2000),
    nome: p.title,
    nomeEn: p.titoloEn || p.title,
    tipo: p.product_type || '',
    tipoEn: p.tipoEn || p.product_type || '',
    ambientata,
    fonte: `${SITO}/products/${p.handle}`,
  })
  // Primo giro: una foto di prodotto per ogni pezzo. Secondo giro: le ambientate.
  const scelti = suoi.slice(0, 14)
  for (const p of scelti) {
    if (fuori.length >= massimo) break
    if (variante(p) && scelti.some((b) => !variante(b) && p.handle.startsWith(b.handle.replace(/-(planter|armchair|sofa|table|bench|stool|lamp|floorlamp).*$/, '')))) continue
    const prima = p.images[0]
    if (!prima || viste.has(chiaveFoto(prima.src))) continue
    viste.add(chiaveFoto(prima.src))
    fuori.push(voce(p, prima.src, !(await scontorno(prima.src))))
    if (fuori.filter((c) => !c.ambientata).length >= Math.ceil(massimo / 2)) break
  }
  for (const p of scelti) {
    let aggiunte = 0
    for (const img of p.images.slice(1, 12)) {
      if (fuori.length >= massimo || aggiunte >= 2) break
      if (img.width < 900 || viste.has(chiaveFoto(img.src))) continue
      if (await scontorno(img.src)) continue
      viste.add(chiaveFoto(img.src))
      fuori.push(voce(p, img.src, true))
      aggiunte++
    }
    if (fuori.length >= massimo) break
  }
  return fuori
}
