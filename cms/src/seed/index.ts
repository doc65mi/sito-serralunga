/**
 * Contenuti iniziali presi dai template (template/*.dc.html).
 * Uso: npm run seed  (oppure, in Docker: docker compose exec cms npm run seed)
 *
 * - Crea l'utente amministratore da SEED_EMAIL / SEED_PASSWORD se non ci sono utenti.
 * - Carica le foto: quelle in template/ dal disco, quelle di serralunga.com scaricandole.
 *   Se una foto non si scarica, il campo resta vuoto e il sito mostra il segnaposto.
 * - `npm run seed:aggiorna` aggiunge solo ciò che manca (schede designer, ritratti a risoluzione
 *   piena, creazioni, pagine nuove, voci di menu) senza toccare i testi già modificati.
 * - Si può rilanciare: i documenti esistenti con lo stesso slug vengono aggiornati, non duplicati.
 */
import fs from 'fs'
import path from 'path'

import { getPayload } from 'payload'
import sharp from 'sharp'
import config from '@payload-config'

import { aquaLounger, caseLoge, designerDati, prodottiCard } from './dati'
import { creazioniDi, type Creazione } from './creazioni'
import { contractDati, conIdRighe } from './contract'
import { SEZIONI_CONTRACT } from '../collections/Contract'
import { designerAltri, designerFonti, GIA_PRESENTI, RITRATTO_MIN } from './designer-altri'
import { COLONNE, homeDati, impostazioniDati, MENU, MENU_SUPERIORE, PAGINE, paginaDesignerDati, paginaInstallazioniDati, paginaSpuntiDati } from './globali'
import { rigeneraFormati } from './immagini'
import { applicaInglese } from './inglese'
import { nomeFile } from '../collections/Media'

const payload = await getPayload({ config })
const log = (msg: string) => payload.logger.info(`[seed] ${msg}`)

// Primo avvio automatico (npm run seed:primo, lanciato da avvio.sh su Coolify):
// se esiste già un utente il sito è stato avviato e non si tocca nulla.
if (process.env.SEED_SOLO === 'primo') {
  const utenti = await payload.count({ collection: 'users' })
  if (utenti.totalDocs > 0) {
    log('primo avvio: contenuti già presenti, nessuna modifica')
    process.exit(0)
  }
  log('primo avvio: database vuoto, carico i contenuti di partenza')
}

const TEMPLATE_DIR = path.resolve(process.cwd(), process.env.SEED_TEMPLATE_DIR || '../template')

const mediaCache = new Map<string, number | null>()

const tipo = (nome: string) => {
  const ext = path.extname(nome).toLowerCase()
  return (
    { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }[ext] ||
    'application/octet-stream'
  )
}

export interface OpzioniMedia {
  /** Larghezza minima: sotto questa soglia la foto viene ingrandita (interpolazione, nessun ritocco). */
  min?: number
}

/**
 * Restituisce l'id del media; sorgente = percorso in template/ oppure URL https.
 * Le foto si salvano in WebP alla risoluzione originale. Se la foto è più stretta di `min`
 * viene ingrandita con interpolazione Lanczos e una leggera nitidezza: non si aggiunge nulla
 * che nell'originale non ci sia.
 */
export async function media(sorgente: string, alt: string, opz: OpzioniMedia = {}): Promise<number | null> {
  const chiave = `${sorgente}|${opz.min || 0}`
  if (mediaCache.has(chiave)) return mediaCache.get(chiave) ?? null
  let id: number | null = null
  try {
    let data: Buffer
    let nome: string
    if (/^https?:\/\//.test(sorgente)) {
      const url = new URL(sorgente)
      nome = decodeURIComponent(path.basename(url.pathname))
      // Dalle foto di serralunga.com si chiede sempre l'originale: il parametro width le rimpicciolisce.
      if (opz.min) url.searchParams.delete('width')
      const res = await fetch(url, { signal: AbortSignal.timeout(60_000) })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data = Buffer.from(await res.arrayBuffer())
    } else {
      const file = path.join(TEMPLATE_DIR, sorgente)
      nome = path.basename(file)
      data = fs.readFileSync(file)
    }
    if (/\.(jpe?g|png|webp|avif|tiff?)$/i.test(nome)) {
      const info = await sharp(data).metadata()
      const larga = info.width || 0
      const ingrandire = !!opz.min && larga > 0 && larga < opz.min
      let img = sharp(data).rotate()
      if (ingrandire) img = img.resize({ width: opz.min, kernel: 'lanczos3' }).sharpen({ sigma: 0.6 })
      data = await img.webp({ quality: 90, effort: 5 }).toBuffer()
      // Le foto chieste a risoluzione piena hanno un nome proprio, per non confondersi con le copie ridotte già caricate.
      nome = `${nome.replace(/\.[^.]+$/, '')}${opz.min ? '-hd' : ''}.webp`
    }
    nome = nome.replace(/[^A-Za-z0-9._-]+/g, '-')
    const esistente = await payload.find({
      collection: 'media',
      where: { filename: { in: [nome, nomeFile(nome)] } },
      limit: 1,
      depth: 0,
    })
    if (esistente.docs[0]) {
      id = esistente.docs[0].id as number
    } else {
      const doc = await payload.create({
        collection: 'media',
        data: { alt },
        file: { data, mimetype: tipo(nome), name: nome, size: data.length },
      })
      id = doc.id as number
    }
  } catch (err) {
    payload.logger.warn(`[seed] foto non caricata (${sorgente}): ${(err as Error).message}`)
  }
  mediaCache.set(chiave, id)
  return id
}

type Slugged = 'prodotti' | 'designer' | 'case-history'

async function salva(collection: Slugged, data: Record<string, unknown>): Promise<number> {
  const slug = data.slug as string
  const trovato = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1, depth: 0, draft: true })
  const dati = { ...data, _status: 'published' } as never
  if (trovato.docs[0]) {
    const doc = await payload.update({ collection, id: trovato.docs[0].id, data: dati })
    log(`aggiornato ${collection}/${slug}`)
    return doc.id as number
  }
  const doc = await payload.create({ collection, data: dati })
  log(`creato ${collection}/${slug}`)
  return doc.id as number
}

const radice = (nomeFile?: string | null) =>
  (nomeFile || '')
    .replace(/\.[^.]+$/, '')
    .replace(/-hd$/, '')
    .replace(/-\d+$/, '')
    .toLowerCase()

/**
 * Per ogni designer: ritratto a risoluzione piena e foto delle creazioni da serralunga.com.
 * Non sovrascrive un ritratto caricato a mano né creazioni già presenti.
 */
async function completaDesigner() {
  for (const f of designerFonti()) {
    const trovato = await payload.find({ collection: 'designer', where: { slug: { equals: f.slug } }, limit: 1, depth: 1, draft: true })
    const doc = trovato.docs[0] as unknown as
      | { id: number; ritratto?: { id: number; filename?: string } | null; creazioni?: unknown[] | null }
      | undefined
    if (!doc) continue
    const dati: Record<string, unknown> = {}

    if (f.ritratto) {
      const attesa = radice(decodeURIComponent(path.basename(new URL(f.ritratto).pathname)).replace(/[^A-Za-z0-9._-]+/g, '-'))
      const attuale = doc.ritratto?.filename
      // Si sostituisce solo il ritratto messo dal seed (stesso file di origine), mai uno caricato a mano.
      if (!attuale || (radice(attuale) === attesa && !/-hd\.webp$/.test(attuale))) {
        const hd = await media(f.ritratto, `Ritratto di ${f.nome}`, { min: RITRATTO_MIN })
        if (hd && hd !== doc.ritratto?.id) dati.ritratto = hd
      }
    }

    let lista: Creazione[] = []
    if (!doc.creazioni?.length) {
      try {
        lista = await creazioniDi(f.etichette, f.pezzi)
      } catch (err) {
        payload.logger.warn(`[seed] creazioni di ${f.nome} non lette da serralunga.com: ${(err as Error).message}`)
      }
      const righe: Record<string, unknown>[] = []
      for (const c of lista) {
        const id = await media(c.url, `${c.nome}, design ${f.nome}${c.ambientata ? ', foto ambientata' : ''}`.slice(0, 125))
        if (id) righe.push({ immagine: id, nome: c.nome, tipo: c.tipo, ambientata: c.ambientata, fonte: c.fonte })
      }
      if (righe.length) dati.creazioni = righe
      else if (!lista.length) log(`designer/${f.slug}: nessun prodotto trovato su serralunga.com`)
    }

    if (!Object.keys(dati).length) continue
    const salvato = (await payload.update({ collection: 'designer', id: doc.id, data: dati as never, depth: 0 })) as unknown as {
      creazioni?: { id: string; immagine: number; ambientata?: boolean; fonte?: string }[]
    }
    // Nomi e tipologie in inglese, sulle stesse righe.
    if (dati.creazioni && salvato.creazioni?.length) {
      const perFonte = new Map(lista.map((c) => [c.fonte, c]))
      await payload.update({
        collection: 'designer',
        id: doc.id,
        locale: 'en',
        data: {
          creazioni: salvato.creazioni.map((r) => ({
            id: r.id,
            immagine: r.immagine,
            ambientata: r.ambientata,
            fonte: r.fonte,
            nome: perFonte.get(r.fonte || '')?.nomeEn,
            tipo: perFonte.get(r.fonte || '')?.tipoEn,
          })),
        } as never,
      })
    }
    log(`designer/${f.slug}: ${dati.ritratto ? 'ritratto aggiornato' : ''}${dati.ritratto && dati.creazioni ? ', ' : ''}${dati.creazioni ? `${(dati.creazioni as unknown[]).length} creazioni` : ''}`)
  }
}

/** Pagine nuove e voci di menu: si aggiungono solo se mancano. */
async function completaPagine() {
  const inst = (await payload.findGlobal({ slug: 'pagina-installazioni', depth: 0 })) as { titolo?: string }
  if (!inst.titolo) {
    await payload.updateGlobal({ slug: 'pagina-installazioni', data: (await paginaInstallazioniDati()) as never })
    log('creata la pagina Installazioni')
  }
  const spunti = (await payload.findGlobal({ slug: 'pagina-spunti', depth: 0 })) as { titolo?: string }
  if (!spunti.titolo) {
    await payload.updateGlobal({ slug: 'pagina-spunti', data: (await paginaSpuntiDati()) as never })
    log('creata la pagina Spunti e idee')
  }
  const imp = (await payload.findGlobal({ slug: 'impostazioni', depth: 0 })) as unknown as {
    menu?: { etichetta?: string; link?: string; evidenza?: boolean }[]
  }
  const menu = [...(imp.menu || [])]
  let cambiato = false
  for (const v of menu) {
    if (v.link === '/#collezioni' && /installazioni/i.test(v.etichetta || '')) {
      v.link = '/installazioni/'
      cambiato = true
    }
  }
  if (!menu.some((v) => v.link === '/spunti-e-idee/')) {
    const dopo = menu.findIndex((v) => v.link === '/designer/')
    menu.splice(dopo >= 0 ? dopo + 1 : menu.filter((v) => !v.evidenza).length, 0, { etichetta: 'Spunti e idee', link: '/spunti-e-idee/' })
    cambiato = true
  }
  if (cambiato) {
    await payload.updateGlobal({ slug: 'impostazioni', data: { menu } as never })
    log('aggiornato il menu: Installazioni e Spunti e idee')
  }
  // Navigazione 2026-11: menu superiore + menu inferiore con tendine e footer a tre colonne.
  // Si applica una volta sola, finché il menu superiore è vuoto: dopo si cambia dal pannello.
  const nav = (await payload.findGlobal({ slug: 'impostazioni', depth: 0 })) as unknown as { menuSuperiore?: unknown[] }
  if (!nav.menuSuperiore?.length) {
    await payload.updateGlobal({ slug: 'impostazioni', data: { menuSuperiore: MENU_SUPERIORE, menu: MENU, colonne: COLONNE } as never })
    log('navigazione: menu superiore, menu inferiore con tendine e colonne del footer')
  }
  // Pagine di servizio (Contatti, Listino, FAQ): si creano solo se mancano.
  for (const pg of PAGINE) {
    const c = await payload.find({ collection: 'pagine', where: { slug: { equals: pg.slug } }, limit: 1, depth: 0, draft: true })
    if (c.docs.length) continue
    await payload.create({ collection: 'pagine', data: pg as never, draft: pg._status === 'draft' })
    log(`creata la pagina /${pg.slug}/ (${pg._status === 'draft' ? 'bozza' : 'pubblicata'})`)
  }
  // Condivisione: senza un'immagine predefinita si usa la foto di apertura della home (si cambia dal pannello).
  const impo = (await payload.findGlobal({ slug: 'impostazioni', depth: 0 })) as unknown as { immagineCondivisione?: number | null }
  const homeFoto = (await payload.findGlobal({ slug: 'home', depth: 0 })) as unknown as { hero?: { immagine?: number | null } }
  if (!impo.immagineCondivisione && homeFoto.hero?.immagine) {
    await payload.updateGlobal({ slug: 'impostazioni', data: { immagineCondivisione: homeFoto.hero.immagine } as never })
    log('impostazioni: immagine di condivisione predefinita = foto di apertura della home')
  }
  // Title inglese di "Spunti e idee": quello di partenza era troppo corto per i motori di ricerca.
  const spuntiEn = (await payload.findGlobal({ slug: 'pagina-spunti', locale: 'en', fallbackLocale: false, depth: 0 })) as unknown as { seo?: { titolo?: string } }
  if (spuntiEn.seo?.titolo === 'Ideas | Serralunga') {
    await payload.updateGlobal({ slug: 'pagina-spunti', locale: 'en', data: { seo: { ...spuntiEn.seo, titolo: 'Ideas and inspiration | Serralunga Contract' } } as never })
    log('spunti e idee: title inglese più descrittivo')
  }
  // Sezione catalogo della home: i quattro cataloghi pubblicati su serralunga.com/pages/serralunga-catalogs
  // (titolo, copertina e PDF sono quelli della pagina). Si scrivono solo se i box mancano o sono ancora
  // quelli provvisori senza foto: ciò che la redazione ha già cambiato resta com'è.
  type Box = { id?: string; titolo?: string; link?: string; immagine?: number | null }
  const home = (await payload.findGlobal({ slug: 'home', depth: 0 })) as unknown as { catalogo?: { box?: Box[] } }
  const attuali = home.catalogo?.box || []
  const PROVVISORI = ['Vasi e fioriere', 'Arredo', 'Illuminazione', 'Accessori']
  const provvisori = attuali.length > 0 && attuali.every((x, k) => x.titolo === PROVVISORI[k] && !x.immagine && x.link === '/#collezioni')
  const F = 'https://cdn.shopify.com/s/files/1/0587/3775/4249/files'
  const I = 'https://serralunga.com/cdn/shop/files'
  const cataloghi = [
    { titolo: 'Catalogo Mobili', en: 'Furniture catalogue', link: `${F}/CATALOGUE_FURNITURE.pdf?v=1750319983`, foto: `${I}/KENTIA_lifestyle_1_c1c42453-e8c9-4995-b558-c03223f34f2b.jpg?v=1752219053` },
    { titolo: 'Catalogo Piscina / Spa e spiaggia', en: 'Pool / Spa and beach catalogue', link: `${F}/CATALOGUE_POOL.pdf?v=1750319914`, foto: `${I}/aqua-2-11-1_1574518a-3458-4b77-b41e-6cb24848c2eb.jpg?v=1771517193` },
    { titolo: 'Catalogo Fioriere', en: 'Planters catalogue', link: `${F}/CATALOGUE_POTS_83eb6906-b27d-4ed4-b5eb-f3ce24b72d5c.pdf?v=1752221415`, foto: `${I}/June_02.jpg?v=1750324586` },
    { titolo: 'Catalogo Regali', en: 'Gifts catalogue', link: `${F}/CATALOGUE_GIFTS_fe656b2b-2111-490b-bfe2-048a5239a2aa.pdf?v=1752221319`, foto: `${I}/Doggy_Otto_Gatt-One_05_f8a7633e-0f03-4c5f-bb9d-96064221825d.jpg?v=1750324587` },
  ]
  if (!attuali.length || provvisori) {
    const box: Box[] = []
    for (const c of cataloghi) box.push({ titolo: c.titolo, link: c.link, immagine: await media(c.foto, `Copertina del ${c.titolo} Serralunga`) })
    const salvata = (await payload.updateGlobal({ slug: 'home', depth: 0, data: { catalogo: { ...(home.catalogo || {}), box } } as never })) as unknown as { catalogo?: { box?: Box[] } }
    // Titoli inglesi sulle stesse righe (stesso id), così /en/ non mostra il titolo italiano.
    const righe = (salvata.catalogo?.box || []).map((x, k) => ({ id: x.id, titolo: cataloghi[k]?.en || x.titolo, link: x.link, immagine: x.immagine }))
    if (righe.length === cataloghi.length) await payload.updateGlobal({ slug: 'home', locale: 'en', data: { catalogo: { box: righe } } as never })
    log(`home: nei quattro box i cataloghi di serralunga.com (${box.filter((x) => x.immagine).length} copertine su 4)`)
  } else if (attuali.some((x) => !x.immagine && cataloghi.some((c) => c.titolo === x.titolo))) {
    // Copertine non scaricate la volta precedente (sito irraggiungibile): si riprova solo su quelle.
    let aggiunte = 0
    const box: Box[] = []
    for (const x of attuali) {
      const c = cataloghi.find((v) => v.titolo === x.titolo)
      const immagine = !x.immagine && c ? await media(c.foto, `Copertina del ${c.titolo} Serralunga`) : x.immagine
      if (immagine && !x.immagine) aggiunte++
      box.push({ ...x, immagine })
    }
    if (aggiunte) {
      await payload.updateGlobal({ slug: 'home', depth: 0, data: { catalogo: { ...(home.catalogo || {}), box } } as never })
      log(`home: aggiunte ${aggiunte} copertine dei cataloghi`)
    }
  }
  const loge = await payload.find({ collection: 'case-history', where: { slug: { equals: 'la-loge-du-massif' } }, limit: 1, depth: 0, draft: true })
  const caso = loge.docs[0] as unknown as { id: number; categoria?: string } | undefined
  if (caso && !caso.categoria) await payload.update({ collection: 'case-history', id: caso.id, data: { categoria: 'risto' } as never })
}

/** Sezione Contract: crea solo le pagine che mancano (per indirizzo); quelle esistenti non si toccano. */
async function completaContract() {
  const esistenti = await payload.find({ collection: 'contract', depth: 0, limit: 50, draft: true })
  const presenti = new Set((esistenti.docs as unknown as { sezione?: string }[]).map((d) => d.sezione))
  if (SEZIONI_CONTRACT.every((x) => presenti.has(x.value))) return
  const dati = await contractDati(media)
  for (const d of dati.filter((x) => !presenti.has(x.sezione))) {
    const doc = await payload.create({ collection: 'contract', depth: 0, data: { ...d.it, sezione: d.sezione, ordine: d.ordine, _status: 'published' } as never })
    await payload.update({ collection: 'contract', id: doc.id, locale: 'en', depth: 0, data: { ...(conIdRighe(d.en, doc) as object), _status: 'published' } as never })
    log(`creata la pagina Contract: ${d.sezione}`)
  }
}

// Aggiornamento di un sito già avviato (npm run seed:aggiorna): aggiunge ciò che manca
// senza toccare i testi e le foto già modificati dal pannello o dalla pagina.
if (process.env.SEED_SOLO === 'aggiorna' || process.env.SEED_SOLO === 'designer') {
  for (const d of await designerAltri(media)) {
    const trovato = await payload.find({ collection: 'designer', where: { slug: { equals: d.slug } }, limit: 1, depth: 0, draft: true })
    const doc = trovato.docs[0] as { id: number; schedaPubblicata?: boolean } | undefined
    if (!doc?.schedaPubblicata) await salva('designer', d)
  }
  await completaDesigner()
  await completaPagine()
  await completaContract()
  // Con tutte le schede presenti non servono più le card vuote in fondo all'elenco.
  await payload.updateGlobal({ slug: 'pagina-designer', data: { segnaposto: 0 } as never })
  await applicaInglese(payload, log, { globali: ['impostazioni', 'pagina-installazioni', 'pagina-spunti'], collezioni: ['designer', 'pagine'] })
  await rigeneraFormati(payload, log)
  const saltate = [...mediaCache.entries()].filter(([, id]) => id === null).map(([s]) => s)
  if (saltate.length) {
    log(`${saltate.length} foto non caricate:`)
    saltate.forEach((m) => log(`  - ${m.split('|')[0]}`))
  }
  log('fatto (aggiornamento)')
  process.exit(0)
}

// 1. Utente amministratore
const utenti = await payload.count({ collection: 'users' })
if (utenti.totalDocs === 0 && process.env.SEED_EMAIL && process.env.SEED_PASSWORD) {
  await payload.create({
    collection: 'users',
    data: { email: process.env.SEED_EMAIL, password: process.env.SEED_PASSWORD, nome: 'Amministratore' },
  })
  log(`creato l'utente ${process.env.SEED_EMAIL}`)
}

// 2. Designer
const designerId: Record<string, number> = {}
const altri = await designerAltri(media)
for (const d of await designerDati(media)) {
  // Bocchietto e Sansoni: ai dati di base si aggiungono biografia e scheda pubblicata.
  const extra = GIA_PRESENTI.includes(d.slug) ? altri.find((x) => x.slug === d.slug) : undefined
  designerId[d.slug as string] = await salva('designer', { ...d, ...extra })
}
for (const d of altri.filter((x) => !GIA_PRESENTI.includes(x.slug as string))) {
  designerId[d.slug as string] = await salva('designer', d)
}

// 3. Case history (prima dei prodotti, che la collegano)
const caseId = await salva('case-history', await caseLoge(media))

// 4. Prodotti
const prodottoId: Record<string, number> = {}
prodottoId['aqua-lounger'] = await salva('prodotti', await aquaLounger(media, designerId, [caseId]))
for (const p of await prodottiCard(media, designerId)) {
  prodottoId[p.slug as string] = await salva('prodotti', p)
}

// 5. Pagine e impostazioni
await payload.updateGlobal({ slug: 'impostazioni', data: (await impostazioniDati(media)) as never })
log('aggiornate le impostazioni')
await payload.updateGlobal({
  slug: 'home',
  data: { ...(await homeDati(media)), _status: 'published' } as never,
})
log('aggiornata la home')
await payload.updateGlobal({ slug: 'pagina-designer', data: (await paginaDesignerDati()) as never })
log('aggiornata la pagina designer')
await completaPagine()
await completaContract()

// 5b. Ritratti a risoluzione piena e creazioni dei designer da serralunga.com
await completaDesigner()

// 6. Inglese: riempie i campi ancora vuoti con le traduzioni di partenza
await applicaInglese(payload, log)
await rigeneraFormati(payload, log)

const mancanti = [...mediaCache.entries()].filter(([, id]) => id === null).map(([s]) => s)
if (mancanti.length) {
  log(`${mancanti.length} foto non caricate: si possono aggiungere dal pannello Media.`)
  mancanti.forEach((m) => log(`  - ${m.split('|')[0]}`))
}
log('fatto')
process.exit(0)
