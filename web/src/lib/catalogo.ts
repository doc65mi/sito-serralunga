/**
 * Catalogo B2B (ex Shop) — Version: 1.00.
 * Categorie e prodotti letti da Payload; indirizzi:
 *   /catalogo/                       elenco delle macrocategorie
 *   /catalogo/vasi/                  macrocategoria
 *   /catalogo/vasi/classici/         sottocategoria
 *   /catalogo/vasi/{slug-prodotto}/  scheda prodotto (indirizzo canonico)
 *   /prodotti/{slug}/                vecchio indirizzo: redirect 301 alla scheda canonica
 */
import { elenco, type Doc } from './cms'
import type { Lingua } from './lingua'

const cache = new Map<Lingua, { t: number; v: Doc[] }>()

/** Tutte le categorie pubblicate, in ordine (lette una volta al minuto). */
export async function categorie(lingua: Lingua = 'it'): Promise<Doc[]> {
  const c = cache.get(lingua)
  if (c && Date.now() - c.t < 60_000) return c.v
  const v = await elenco('categorie', { depth: 1, limit: 200, sort: 'ordine' }, lingua).catch(() => [])
  cache.set(lingua, { t: Date.now(), v })
  return v
}

const idDi = (x: unknown): number | string | null =>
  x && typeof x === 'object' ? ((x as Doc).id ?? null) : ((x as number | string | null) ?? null)

export const padreDi = (c: Doc, tutte: Doc[]): Doc | null => {
  const id = idDi(c.padre)
  return id == null ? null : tutte.find((x) => x.id === id) || null
}

export const figlieDi = (c: Doc, tutte: Doc[]) => tutte.filter((x) => idDi(x.padre) === c.id)

export const macro = (tutte: Doc[]) => tutte.filter((x) => idDi(x.padre) == null)

/** Indirizzo (senza lingua) di una categoria. */
export function urlCategoria(c: Doc, tutte: Doc[]): string {
  const p = padreDi(c, tutte)
  return p ? `/catalogo/${p.slug}/${c.slug}/` : `/catalogo/${c.slug}/`
}

/** Indirizzo canonico (senza lingua) di una scheda prodotto. */
export function urlProdotto(p: Doc, tutte?: Doc[]): string {
  let cat: Doc | null = p.categoriaPrincipale && typeof p.categoriaPrincipale === 'object' ? p.categoriaPrincipale : null
  if (!cat && p.categoriaPrincipale != null && tutte) cat = tutte.find((x) => x.id === p.categoriaPrincipale) || null
  return cat?.slug ? `/catalogo/${cat.slug}/${p.slug}/` : `/prodotti/${p.slug}/`
}

/** Campi che servono alle card e ai filtri: le liste restano leggere anche con centinaia di schede. */
const CAMPI_CARD = ['nome', 'slug', 'immagine', 'etichettaCard', 'tipologia', 'materiali', 'luce', 'designer', 'categoriaPrincipale', 'categorie', 'schedaPubblicata', 'dataCatalogo', 'updatedAt', 'ordine']
const select = Object.fromEntries(CAMPI_CARD.map((k) => [`select[${k}]`, 'true']))

/** Prodotti di una categoria (e delle sue sottocategorie). Le selezioni curate seguono il loro ordine. */
export async function prodottiDi(c: Doc, tutte: Doc[], lingua: Lingua = 'it'): Promise<Doc[]> {
  if (c.tipo === 'curata') {
    const ids = (c.prodotti || []).map(idDi).filter((x: unknown) => x != null)
    if (!ids.length) return []
    const lista = await elenco('prodotti', { ...select, depth: 1, limit: 500, 'where[id][in]': ids.join(','), 'where[schedaPubblicata][equals]': 'true' }, lingua)
    const pos = new Map(ids.map((id: unknown, k: number) => [id, k]))
    return lista.sort((a, b) => (pos.get(a.id) ?? 0) - (pos.get(b.id) ?? 0))
  }
  const ids = [c.id, ...figlieDi(c, tutte).map((x) => x.id)]
  const nuovi = c.slug === 'nuovi-arrivi'
  return elenco(
    'prodotti',
    { ...select, depth: 1, limit: 500, sort: nuovi ? '-dataCatalogo' : 'nome', 'where[categorie][in]': ids.join(','), 'where[schedaPubblicata][equals]': 'true' },
    lingua,
  )
}

/** Quante schede pubblicate ha ogni categoria (per nascondere quelle vuote e mostrare i numeri). */
export async function conteggi(tutte: Doc[], lingua: Lingua = 'it'): Promise<Map<number | string, number>> {
  const lista = await elenco('prodotti', { 'select[categorie]': 'true', depth: 0, limit: 2000, 'where[schedaPubblicata][equals]': 'true' }, lingua).catch(() => [])
  const n = new Map<number | string, number>()
  for (const p of lista) for (const id of (p.categorie || []).map(idDi)) if (id != null) n.set(id, (n.get(id) || 0) + 1)
  for (const c of tutte) if (c.tipo === 'curata') n.set(c.id, (c.prodotti || []).length)
  return n
}
