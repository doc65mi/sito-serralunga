/**
 * Catalogo B2B (ex Shop) importato da serralunga.com — Version: 1.00.
 *
 * - Crea l'albero delle categorie (progetto/Serralunga_Alberatura_B2C_2026, sezione Shop) se manca.
 * - Legge l'elenco pubblico dei prodotti (products.json di Shopify, italiano e inglese) e le
 *   collezioni Shopify indicate in ogni categoria ("Collezioni di origine").
 * - Crea una scheda per ogni prodotto che compare in almeno una categoria: nome, descrizione,
 *   tipologia, varianti con codice articolo, designer, foto. Tutto come pubblicato sul sito:
 *   non si inventa né si ritocca nulla. I prezzi al pubblico non si importano (catalogo B2B).
 * - Rilanciabile: le schede esistenti si completano (categorie, varianti, campi vuoti) ma i testi
 *   e le foto già modificati dal pannello o dalla pagina restano come sono.
 *
 * Uso: npm run seed:catalogo  (in Docker: docker compose exec cms npm run seed:catalogo)
 * CATALOGO_FOTO=6 numero massimo di foto per scheda (predefinito 6).
 */
import type { Payload } from 'payload'

import { catalogo, json, type ProdottoShop } from './creazioni'
import { fatto, segna } from './punto'

const SITO = 'https://serralunga.com'

type Media = (sorgente: string, alt: string) => Promise<number | null>

export interface CategoriaSeed {
  slug: string
  nome: string
  nomeEn: string
  padre?: string
  ordine: number
  fonti?: string[]
  tipo?: 'automatica' | 'curata'
  filtri?: string[]
  kicker?: string
  kickerEn?: string
  intro?: string
  introEn?: string
  seo?: { titolo: string; descrizione: string; titoloEn: string; descrizioneEn: string }
  /** Non decide l'indirizzo delle schede (Nuovi arrivi, Selezione). */
  trasversale?: boolean
}

/** Albero del Catalogo. Gli handle sono le collezioni pubblicate su serralunga.com/collections. */
export const CATEGORIE: CategoriaSeed[] = [
  {
    slug: 'vasi',
    nome: 'Vasi e fioriere',
    nomeEn: 'Planters',
    ordine: 10,
    fonti: ['planters', 'planter'],
    filtri: ['tipologia', 'designer', 'materiale', 'luce'],
    kicker: 'Catalogo · Vasi e fioriere',
    kickerEn: 'Catalogue · Planters',
    intro: 'Vasi e fioriere in polietilene per hôtellerie, ristorazione, residenze e spazi pubblici: forme classiche, versioni con luce e grandi formati, con varianti e codici articolo.',
    introEn: 'Polyethylene planters for hotels, restaurants, residences and public spaces: classic shapes, light-up versions and large formats, with variants and item codes.',
    seo: {
      titolo: 'Vasi e fioriere per contract e hospitality | Serralunga',
      descrizione: 'Vasi e fioriere Serralunga in polietilene per hotel, ristoranti e progetti contract: forme classiche, con luce e grandi formati, con varianti, misure e codici.',
      titoloEn: 'Planters for contract and hospitality | Serralunga',
      descrizioneEn: 'Serralunga polyethylene planters for hotels, restaurants and contract projects: classic shapes, light-up and oversize, with variants, dimensions and codes.',
    },
  },
  {
    slug: 'classici',
    padre: 'vasi',
    nome: 'Vasi classici',
    nomeEn: 'Classic planters',
    ordine: 11,
    fonti: ['traditional-italian-pots'],
    seo: {
      titolo: 'Vasi classici della tradizione italiana | Serralunga',
      descrizione: 'I vasi della tradizione italiana firmati Serralunga, in polietilene per esterni e interni: modelli, varianti di colore e codici articolo per progetti contract.',
      titoloEn: 'Classic Italian planters | Serralunga',
      descrizioneEn: 'Serralunga planters from the Italian tradition, in polyethylene for outdoors and indoors: models, colour variants and item codes for contract projects.',
    },
  },
  {
    slug: 'con-luce',
    padre: 'vasi',
    nome: 'Vasi con luce',
    nomeEn: 'Planters with light',
    ordine: 12,
    fonti: ['planter-with-light'],
    seo: {
      titolo: 'Vasi luminosi per esterni e interni | Serralunga',
      descrizione: 'Vasi e fioriere Serralunga con luce integrata per terrazze, giardini, hotel e locali: modelli, varianti e codici articolo del catalogo Serralunga.',
      titoloEn: 'Light-up planters for outdoors and indoors | Serralunga',
      descrizioneEn: 'Serralunga planters with built-in light for terraces, gardens, hotels and venues: models, variants and item codes from the Serralunga catalogue.',
    },
  },
  {
    slug: 'oversize',
    padre: 'vasi',
    nome: 'Vasi oversize',
    nomeEn: 'Oversize planters',
    ordine: 13,
    tipo: 'curata',
    seo: {
      titolo: 'Vasi oversize per spazi pubblici e hotel | Serralunga',
      descrizione: 'Vasi e fioriere Serralunga di grande formato per hall, piazze, terrazze e spazi pubblici: modelli e codici articolo selezionati per i progetti contract.',
      titoloEn: 'Oversize planters for public spaces and hotels | Serralunga',
      descrizioneEn: 'Large-format Serralunga planters for lobbies, squares, terraces and public spaces: models and item codes selected for contract projects and installations.',
    },
  },
  {
    slug: 'sedute',
    nome: 'Sedute',
    nomeEn: 'Seating',
    ordine: 20,
    fonti: ['armchairs', 'sofas', 'chairs', 'benches', 'stool', 'stools'],
    kicker: 'Catalogo · Arredo',
    kickerEn: 'Catalogue · Furniture',
    intro: 'Poltrone, divani, sedie, panche e sgabelli Serralunga per lounge, terrazze, bordo piscina e spazi comuni, con varianti di colore e codici articolo.',
    introEn: 'Serralunga armchairs, sofas, chairs, benches and stools for lounges, terraces, poolsides and common areas, with colour variants and item codes.',
    seo: {
      titolo: 'Sedute da esterno e interno per contract | Serralunga',
      descrizione: 'Poltrone, divani, sedie, panche e sgabelli Serralunga per hotel, ristoranti e spazi contract: modelli di design con varianti, misure e codici articolo.',
      titoloEn: 'Outdoor and indoor seating for contract | Serralunga',
      descrizioneEn: 'Serralunga armchairs, sofas, chairs, benches and stools for hotels, restaurants and contract spaces: design models with variants, dimensions and item codes.',
    },
  },
  { slug: 'poltrone', padre: 'sedute', nome: 'Poltrone', nomeEn: 'Armchairs', ordine: 21, fonti: ['armchairs'] },
  { slug: 'divani', padre: 'sedute', nome: 'Divani', nomeEn: 'Sofas', ordine: 22, fonti: ['sofas'] },
  { slug: 'sedie', padre: 'sedute', nome: 'Sedie', nomeEn: 'Chairs', ordine: 23, fonti: ['chairs'] },
  { slug: 'panche', padre: 'sedute', nome: 'Panche', nomeEn: 'Benches', ordine: 24, fonti: ['benches'] },
  { slug: 'sgabelli', padre: 'sedute', nome: 'Sgabelli', nomeEn: 'Stools', ordine: 25, fonti: ['stool', 'stools'] },
  {
    slug: 'tavoli',
    nome: 'Tavoli',
    nomeEn: 'Tables',
    ordine: 30,
    fonti: ['tables'],
    kicker: 'Catalogo · Arredo',
    kickerEn: 'Catalogue · Furniture',
    intro: 'Tavoli e tavolini Serralunga per dehors, lounge e camere: modelli, varianti di colore e codici articolo.',
    introEn: 'Serralunga tables and side tables for outdoor dining areas, lounges and rooms: models, colour variants and item codes.',
    seo: {
      titolo: 'Tavoli e tavolini per hotel e dehors | Serralunga',
      descrizione: 'Tavoli e tavolini Serralunga per dehors, lounge, camere d’hotel e progetti contract: modelli di design, varianti di colore, misure e codici articolo.',
      titoloEn: 'Tables and side tables for hotels and terraces | Serralunga',
      descrizioneEn: 'Serralunga tables and side tables for terraces, lounges, hotel rooms and contract projects: design models, colour variants, dimensions and item codes.',
    },
  },
  {
    slug: 'pool',
    nome: 'Pool & lettini',
    nomeEn: 'Pool & loungers',
    ordine: 40,
    fonti: ['pool-beach', 'sunloungers'],
    kicker: 'Catalogo · Piscina e spiaggia',
    kickerEn: 'Catalogue · Pool and beach',
    intro: 'Lettini, sdraio e arredi per piscine, spa e stabilimenti balneari, con varianti e codici articolo.',
    introEn: 'Sun loungers, deckchairs and furniture for pools, spas and beach clubs, with variants and item codes.',
    seo: {
      titolo: 'Lettini e arredi per piscina e spiaggia | Serralunga',
      descrizione: 'Lettini, sdraio e arredi Serralunga per piscine, spa, resort e stabilimenti balneari: modelli di design con varianti, misure e codici articolo.',
      titoloEn: 'Sun loungers and pool furniture | Serralunga',
      descrizioneEn: 'Serralunga sun loungers, deckchairs and furniture for pools, spas, resorts and beach clubs: design models with variants, dimensions and item codes.',
    },
  },
  {
    slug: 'illuminazione',
    nome: 'Illuminazione',
    nomeEn: 'Lighting',
    ordine: 50,
    fonti: ['lighting', 'pendants', 'floorlamps', 'floor-lamps', 'portable-lamps', 'table-lamp'],
    kicker: 'Catalogo · Luce',
    kickerEn: 'Catalogue · Light',
    intro: 'Lampade a sospensione, da terra e portatili Serralunga per interni ed esterni, con varianti e codici articolo.',
    introEn: 'Serralunga pendant, floor and portable lamps for indoors and outdoors, with variants and item codes.',
    seo: {
      titolo: 'Lampade da esterno e interno per contract | Serralunga',
      descrizione: 'Lampade Serralunga a sospensione, da terra e portatili per hotel, ristoranti, giardini e progetti contract: modelli, varianti, misure e codici articolo.',
      titoloEn: 'Outdoor and indoor lamps for contract | Serralunga',
      descrizioneEn: 'Serralunga pendant, floor and portable lamps for hotels, restaurants, gardens and contract projects: models, variants, dimensions and item codes.',
    },
  },
  { slug: 'sospensioni', padre: 'illuminazione', nome: 'Sospensioni', nomeEn: 'Pendant lamps', ordine: 51, fonti: ['pendants'] },
  { slug: 'da-terra', padre: 'illuminazione', nome: 'Lampade da terra', nomeEn: 'Floor lamps', ordine: 52, fonti: ['floorlamps', 'floor-lamps'] },
  { slug: 'portatili', padre: 'illuminazione', nome: 'Lampade portatili', nomeEn: 'Portable lamps', ordine: 53, fonti: ['portable-lamps'] },
  {
    slug: 'accessori',
    nome: 'Accessori',
    nomeEn: 'Accessories',
    ordine: 60,
    fonti: ['accessories'],
    kicker: 'Catalogo · Accessori',
    kickerEn: 'Catalogue · Accessories',
    intro: 'Accessori e complementi Serralunga: sottovasi, cuscini, portaombrelli e oggetti, con codici articolo.',
    introEn: 'Serralunga accessories and complements: saucers, cushions, umbrella stands and objects, with item codes.',
    seo: {
      titolo: 'Accessori e complementi d’arredo | Serralunga',
      descrizione: 'Accessori e complementi Serralunga per completare vasi, sedute e arredi nei progetti contract e hospitality: modelli, varianti, misure e codici articolo.',
      titoloEn: 'Accessories and furnishing complements | Serralunga',
      descrizioneEn: 'Serralunga accessories and complements for planters, seating and furniture in contract and hospitality projects: models, variants, dimensions and item codes.',
    },
  },
  {
    slug: 'nuovi-arrivi',
    nome: 'Nuovi arrivi',
    nomeEn: 'New arrivals',
    ordine: 70,
    fonti: ['new-arrivals'],
    trasversale: true,
    kicker: 'Catalogo · Novità',
    kickerEn: 'Catalogue · New',
    intro: 'Le ultime novità del catalogo Serralunga.',
    introEn: 'The latest additions to the Serralunga catalogue.',
    seo: {
      titolo: 'Nuovi arrivi del catalogo | Serralunga',
      descrizione: 'Le novità del catalogo Serralunga: vasi, sedute, tavoli e lampade di design per hotel, ristoranti e progetti contract, con varianti, misure e codici.',
      titoloEn: 'New arrivals in the catalogue | Serralunga',
      descrizioneEn: 'New in the Serralunga catalogue: design planters, seating, tables and lamps for hotels, restaurants and contract projects, with variants, dimensions and codes.',
    },
  },
  {
    slug: 'selezione',
    nome: 'Selezione',
    nomeEn: 'Selection',
    ordine: 80,
    tipo: 'curata',
    trasversale: true,
    kicker: 'Catalogo · Selezione stagionale',
    kickerEn: 'Catalogue · Seasonal selection',
    seo: {
      titolo: 'Selezione stagionale | Serralunga',
      descrizione: 'La selezione stagionale del catalogo Serralunga: pezzi scelti per i progetti del momento in hôtellerie, ristorazione e contract, con varianti e codici.',
      titoloEn: 'Seasonal selection | Serralunga',
      descrizioneEn: 'The seasonal selection from the Serralunga catalogue: pieces chosen for current hospitality, restaurant and contract projects, with variants and item codes.',
    },
  },
]

const PAGINA = {
  it: {
    kicker: 'Catalogo',
    titolo: 'Il catalogo\n_Serralunga_',
    testo: 'Vasi e fioriere, sedute, tavoli, arredi per piscina, illuminazione e accessori: le schede della produzione Serralunga con varianti, misure e codici articolo, per architetti, interior designer, hôtellerie e ristorazione.',
    cta: {
      kicker: 'Documentazione tecnica',
      titolo: 'Schede tecniche,\ncolori e campioni',
      testo: 'Indicateci prodotti e progetto: vi inviamo schede tecniche, cartella colori e informazioni su varianti e finiture.',
      pulsante: 'Richiedi la documentazione',
      link: '/contatti/',
    },
    seo: {
      titolo: 'Catalogo: arredi, vasi e luci di design | Serralunga',
      descrizione: 'Catalogo Serralunga per architetti e interior designer: vasi, sedute, tavoli, arredi piscina, lampade e accessori con varianti, misure e codici articolo.',
    },
  },
  en: {
    kicker: 'Catalogue',
    titolo: 'The Serralunga\n_catalogue_',
    testo: 'Planters, seating, tables, pool furniture, lighting and accessories: Serralunga product sheets with variants, dimensions and item codes, for architects, interior designers, hotels and restaurants.',
    cta: {
      kicker: 'Technical documentation',
      titolo: 'Technical sheets,\ncolours and samples',
      testo: 'Tell us the products and the project: we will send technical sheets, the colour chart and information on variants and finishes.',
      pulsante: 'Request the documentation',
      link: '/contatti/',
    },
    seo: {
      titolo: 'Catalogue: design furniture and planters | Serralunga',
      descrizione: 'Serralunga catalogue for architects and interior designers: planters, seating, tables, pool furniture, lamps and accessories with variants, dimensions and item codes.',
    },
  },
}

const norm = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const ENTITA: Record<string, string> = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', egrave: 'è', eacute: 'é', agrave: 'à', aacute: 'á',
  igrave: 'ì', ograve: 'ò', ugrave: 'ù', Egrave: 'È', Eacute: 'É', Agrave: 'À', deg: '°', times: '×', ndash: '–',
  mdash: '—', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“', hellip: '…', euro: '€', copy: '©', reg: '®', trade: '™',
}

/** Testo semplice dall'HTML della descrizione Shopify: paragrafi e righe restano a capo. */
export function testoDaHtml(html?: string | null): string {
  if (!html) return ''
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr)>/gi, '\n')
    .replace(/<li[^>]*>/gi, '• ')
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITA[n] ?? m)
    .split('\n')
    .map((r) => r.replace(/[ \t ]+/g, ' ').trim())
    .filter((r, k, a) => r || (k > 0 && a[k - 1]))
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

/** "VERDE PAVONE" → "Verde pavone": solo maiuscole/minuscole, le parole restano quelle del sito. */
const frase = (s: string) => {
  const t = s.trim()
  if (t === t.toLowerCase()) return t.charAt(0).toUpperCase() + t.slice(1)
  if (t !== t.toUpperCase()) return t
  const m = t.toLowerCase()
  return m.charAt(0).toUpperCase() + m.slice(1)
}

const MISURA = /misur|dimension|size|altezz|height|formato|taglia|diametro|diameter/i

function materialiDi(p: ProdottoShop, inCollezione: (h: string) => boolean): string[] {
  const testo = norm(`${p.title} ${p.handle} ${p.tags.join(' ')}`)
  const m = new Set<string>(['polietilene'])
  if (/moleskin/.test(testo) || inCollezione('moleskin')) m.add('moleskin')
  if (/corten/.test(testo) || inCollezione('corten')) m.add('corten')
  if (/laccat|laquer|lacquer/.test(testo) || inCollezione('laquered')) m.add('laccato')
  if (/vellutat|velvet/.test(testo) || inCollezione('velvety')) m.add('vellutato')
  if (/decorat/.test(testo) || inCollezione('decorati')) m.add('decorato')
  // Corten e oggetti non in plastica: il polietilene si toglie solo se il sito non lo nomina.
  if (m.has('corten') && !/polietilen|polyethylen/.test(norm(p.body_html || ''))) m.delete('polietilene')
  return [...m]
}

function varianti(p: ProdottoShop, lingua: 'it' | 'en') {
  const lista = (lingua === 'en' ? p.variantiEn : p.variants) || []
  return lista
    .filter((v) => v.title && !/default title/i.test(v.title))
    .slice(0, 80)
    .map((v) => ({ nome: v.title.split(' / ').map(frase).join(' / '), codice: v.sku || undefined, sku: v.sku || String(v.id) }))
}

function misure(p: ProdottoShop, lingua: 'it' | 'en') {
  const opz = (lingua === 'en' ? p.opzioniEn : p.options) || []
  return opz
    .filter((o) => MISURA.test(o.name) && o.values?.length)
    .map((o) => ({ etichetta: frase(o.name), valore: o.values.map(frase).join(' · ') }))
}

const ritaglia = (s: string, n: number) => (s.length <= n ? s : `${s.slice(0, n - 1).replace(/\s+\S*$/, '')}…`)

export async function importaCatalogo(payload: Payload, media: Media, log: (m: string) => void) {
  const maxFoto = Math.max(1, Math.min(6, Number(process.env.CATALOGO_FOTO) || 6))

  // 0. Pagina Catalogo: testi di partenza solo se la pagina è ancora vuota.
  const pagina = (await payload.findGlobal({ slug: 'pagina-catalogo', depth: 0 })) as unknown as { titolo?: string }
  if (!pagina.titolo) {
    await payload.updateGlobal({ slug: 'pagina-catalogo', data: PAGINA.it as never })
    await payload.updateGlobal({ slug: 'pagina-catalogo', locale: 'en', data: PAGINA.en as never })
    log('creata la pagina Catalogo')
  }

  // 1. Categorie: si creano quelle che mancano, quelle esistenti non si toccano.
  const idCat: Record<string, number> = {}
  const fontiCat: Record<string, string[]> = {}
  for (const c of CATEGORIE) {
    const trovata = await payload.find({ collection: 'categorie', where: { slug: { equals: c.slug } }, limit: 1, depth: 0, draft: true })
    const doc = trovata.docs[0] as unknown as { id: number; fonti?: { handle: string }[] } | undefined
    if (doc) {
      idCat[c.slug] = doc.id
      fontiCat[c.slug] = (doc.fonti || []).map((f) => f.handle)
      continue
    }
    const creata = await payload.create({
      collection: 'categorie',
      draft: false,
      data: {
        nome: c.nome,
        slug: c.slug,
        ordine: c.ordine,
        padre: c.padre ? idCat[c.padre] : undefined,
        tipo: c.tipo || 'automatica',
        filtri: c.filtri || ['tipologia', 'designer', 'materiale'],
        kicker: c.kicker,
        intro: c.intro,
        fonti: (c.fonti || []).map((handle) => ({ handle })),
        seo: c.seo ? { titolo: c.seo.titolo, descrizione: c.seo.descrizione } : undefined,
        _status: 'published',
      } as never,
    })
    idCat[c.slug] = creata.id as number
    fontiCat[c.slug] = c.fonti || []
    await payload.update({
      collection: 'categorie',
      id: creata.id,
      locale: 'en',
      data: {
        nome: c.nomeEn,
        kicker: c.kickerEn,
        intro: c.introEn,
        seo: c.seo ? { titolo: c.seo.titoloEn, descrizione: c.seo.descrizioneEn } : undefined,
        _status: 'published',
      } as never,
    })
    log(`creata la categoria ${c.padre ? `${c.padre}/` : ''}${c.slug}`)
  }
  // Categorie aggiunte dal pannello (con collezioni di origine) entrano anche loro nell'importazione.
  const tutte = await payload.find({ collection: 'categorie', limit: 200, depth: 0, draft: true })
  for (const d of tutte.docs as unknown as { id: number; slug: string; padre?: number | null; fonti?: { handle: string }[] }[]) {
    idCat[d.slug] = d.id
    fontiCat[d.slug] = (d.fonti || []).map((f) => f.handle)
  }
  const padreDi = new Map((tutte.docs as unknown as { id: number; padre?: number | null }[]).map((d) => [d.id, d.padre || null]))
  const ordineCat = new Map((tutte.docs as unknown as { id: number; ordine?: number }[]).map((d) => [d.id, d.ordine ?? 999]))
  const trasversali = new Set(CATEGORIE.filter((c) => c.trasversale).map((c) => idCat[c.slug]))

  // 2. Prodotti di serralunga.com e collezioni di appartenenza.
  let prodotti: ProdottoShop[]
  try {
    prodotti = await catalogo()
  } catch (err) {
    log(`catalogo non letto da serralunga.com: ${(err as Error).message}. Riprovare dove la rete lo consente.`)
    return
  }
  const perHandle = new Map(prodotti.map((p) => [p.handle, p]))
  const collezioni = new Map<string, Set<string>>()
  const leggiCollezione = async (h: string) => {
    if (collezioni.has(h)) return collezioni.get(h)!
    const set = new Set<string>()
    try {
      for (let pg = 1; pg <= 10; pg++) {
        const lista = (await json(`${SITO}/collections/${h}/products.json?limit=250&page=${pg}`)).products || []
        lista.forEach((p) => set.add(p.handle))
        if (lista.length < 250) break
      }
    } catch (err) {
      log(`collezione ${h} non letta: ${(err as Error).message}`)
    }
    collezioni.set(h, set)
    return set
  }
  for (const h of ['moleskin', 'corten', 'laquered', 'velvety', 'decorati', 'planter-with-light']) await leggiCollezione(h)

  const catDi = new Map<string, Set<number>>()
  for (const [slug, fonti] of Object.entries(fontiCat)) {
    for (const h of fonti) {
      for (const handle of await leggiCollezione(h)) {
        if (!perHandle.has(handle)) continue
        if (!catDi.has(handle)) catDi.set(handle, new Set())
        const set = catDi.get(handle)!
        set.add(idCat[slug])
        // Una sottocategoria porta con sé la sua macrocategoria.
        const padre = padreDi.get(idCat[slug])
        if (padre) set.add(padre)
      }
    }
  }

  const designer = await payload.find({ collection: 'designer', limit: 300, depth: 0, draft: true })
  const designerPer = new Map((designer.docs as unknown as { id: number; nome: string }[]).map((d) => [norm(d.nome), d]))

  let creati = 0
  let aggiornati = 0
  for (const [handle, cats] of catDi) {
    // Ripresa dopo un'interruzione: i prodotti già lavorati si saltano.
    if (fatto(`prodotto:${handle}`)) continue
    const p = perHandle.get(handle)!
    const inCollezione = (h: string) => collezioni.get(h)?.has(handle) ?? false
    const categorie = [...cats]
    const principale = categorie
      .filter((id) => !padreDi.get(id) && !trasversali.has(id))
      .sort((a, b) => (ordineCat.get(a) ?? 999) - (ordineCat.get(b) ?? 999))[0]
    const dis = p.tags.map((t) => designerPer.get(norm(t))).find(Boolean)
    const tipologia = frase(p.product_type || '')
    const finitureIt = varianti(p, 'it')
    const dati = {
      categorie,
      fonteShopify: handle,
      materiali: materialiDi(p, inCollezione),
      luce: inCollezione('planter-with-light') || /with-light|con-luce|light\b|luce\b/.test(`${handle} ${norm(p.title)}`),
      dataCatalogo: p.published_at || undefined,
    }

    const trovato = await payload.find({
      collection: 'prodotti',
      where: { or: [{ fonteShopify: { equals: handle } }, { slug: { equals: handle } }] },
      limit: 1,
      depth: 0,
      draft: true,
    })
    const esistente = trovato.docs[0] as unknown as Record<string, any> | undefined

    let id: number
    let righeFiniture: { id?: string; codice?: string; nome?: string }[] | undefined
    if (esistente) {
      const agg: Record<string, unknown> = {
        ...dati,
        categorie: [...new Set([...(esistente.categorie || []), ...categorie])],
      }
      if (!esistente.categoriaPrincipale && principale) agg.categoriaPrincipale = principale
      if (!esistente.tipologia && tipologia) agg.tipologia = tipologia
      if (!esistente.designer && dis) agg.designer = dis.id
      if (!esistente.descrizione) agg.descrizione = testoDaHtml(p.body_html)
      if (!(esistente.finiture || []).length && finitureIt.length) agg.finiture = finitureIt.map(({ nome, codice }) => ({ nome, codice }))
      if (!(esistente.dimensioni || []).length) {
        const mis = misure(p, 'it')
        if (mis.length) agg.dimensioni = mis
      }
      if (!esistente.immagine || !(esistente.galleria || []).length) {
        const foto = await scarica(p, maxFoto, media)
        if (!esistente.immagine && foto[0]) agg.immagine = foto[0]
        if (!(esistente.galleria || []).length && foto.length) agg.galleria = foto.map((immagine) => ({ immagine }))
      }
      const salvato = (await payload.update({ collection: 'prodotti', id: esistente.id, data: agg as never, depth: 0, draft: false })) as unknown as Record<string, any>
      id = salvato.id
      if (agg.finiture) righeFiniture = salvato.finiture
      aggiornati++
    } else {
      const foto = await scarica(p, maxFoto, media)
      const descrizione = testoDaHtml(p.body_html)
      const salvato = (await payload.create({
        collection: 'prodotti',
        draft: false,
        depth: 0,
        data: {
          ...dati,
          nome: p.title,
          slug: handle,
          schedaPubblicata: true,
          categoriaPrincipale: principale,
          designer: dis?.id,
          tipologia,
          categoria: tipologia,
          etichettaCard: [tipologia, dis?.nome].filter(Boolean).join(' — '),
          firma: dis ? `Disegno di ${dis.nome}` : undefined,
          immagine: foto[0] ?? undefined,
          galleria: foto.map((immagine) => ({ immagine })),
          descrizione,
          finiture: finitureIt.map(({ nome, codice }) => ({ nome, codice })),
          dimensioni: misure(p, 'it'),
          pulsante: 'Richiedi informazioni',
          richiesta: {
            kicker: 'Documentazione tecnica',
            titolo: 'Schede tecniche,\ndisegni e campioni',
            testo: 'Per architetti, interior designer e strutture dell’ospitalità: indicateci il progetto e vi inviamo scheda tecnica, disegni, cartella colori e informazioni su varianti e finiture.',
          },
          seo: { titolo: ritaglia(`${p.title} | Serralunga`, 60), descrizione: ritaglia(descrizione.replace(/\s+/g, ' '), 160) || undefined },
          _status: 'published',
        } as never,
      })) as unknown as Record<string, any>
      id = salvato.id
      righeFiniture = salvato.finiture
      creati++
    }

    // Inglese sulle stesse righe: nome, tipologia, descrizione e varianti come su serralunga.com/en.
    const enDoc = (await payload.findByID({ collection: 'prodotti', id, locale: 'en', fallbackLocale: false, depth: 0, draft: true })) as unknown as Record<string, any>
    const en: Record<string, unknown> = {}
    const tipEn = frase(p.tipoEn || '')
    if (!esistente || !enDoc.nome) en.nome = p.titoloEn || p.title
    if (!enDoc.tipologia && tipEn) en.tipologia = tipEn
    if (!esistente && tipEn) {
      en.categoria = tipEn
      en.etichettaCard = [tipEn, dis?.nome].filter(Boolean).join(' — ')
      en.firma = dis ? `Designed by ${dis.nome}` : undefined
      en.pulsante = 'Request information'
      en.richiesta = {
        kicker: 'Technical documentation',
        titolo: 'Data sheets,\ndrawings and samples',
        testo: 'For architects, interior designers and hospitality venues: tell us about your project and we will send the data sheet, drawings, colour chart and information on variants and finishes.',
      }
    }
    if (!enDoc.descrizione && p.bodyEn) {
      en.descrizione = testoDaHtml(p.bodyEn)
      if (!esistente) en.seo = { titolo: ritaglia(`${p.titoloEn || p.title} | Serralunga`, 60), descrizione: ritaglia(testoDaHtml(p.bodyEn).replace(/\s+/g, ' '), 160) }
    }
    if (righeFiniture?.length) {
      const perSku = new Map(varianti(p, 'en').map((v) => [v.codice || v.sku, v.nome]))
      en.finiture = righeFiniture.map((r) => ({ id: r.id, codice: r.codice, nome: (r.codice && perSku.get(r.codice)) || r.nome }))
    }
    const misEn = misure(p, 'en')
    if (!esistente && misEn.length) {
      const it = (await payload.findByID({ collection: 'prodotti', id, depth: 0, draft: true })) as unknown as Record<string, any>
      if ((it.dimensioni || []).length === misEn.length) en.dimensioni = it.dimensioni.map((r: { id: string }, k: number) => ({ id: r.id, ...misEn[k] }))
    }
    if (Object.keys(en).length) {
      try {
        await payload.update({ collection: 'prodotti', id, locale: 'en', data: { ...en, _status: 'published' } as never, depth: 0 })
      } catch (err) {
        // Scheda già presente con campi inglesi obbligatori ancora vuoti: si completa con npm run seed:aggiorna o dal pannello.
        payload.logger.warn(`[seed] ${handle}: testi inglesi non aggiornati (${(err as Error).message.slice(0, 120)})`)
      }
    }
    segna(`prodotto:${handle}`)
  }
  log(`catalogo: ${creati} schede create, ${aggiornati} completate, ${catDi.size} prodotti in ${Object.keys(fontiCat).length} categorie`)
}

/** Foto di prodotto e ambientate nell'ordine di serralunga.com, senza doppioni. */
async function scarica(p: ProdottoShop, n: number, media: Media): Promise<number[]> {
  const ids: number[] = []
  const viste = new Set<string>()
  for (const img of p.images || []) {
    if (ids.length >= n) break
    const chiave = decodeURIComponent(new URL(img.src).pathname.split('/').pop() || '').replace(/_[0-9a-f-]{36}(?=\.)/i, '')
    if (viste.has(chiave)) continue
    viste.add(chiave)
    const id = await media(img.src, `${p.title}, Serralunga`.slice(0, 125))
    if (id) ids.push(id)
  }
  return ids
}
