/**
 * ricerca.ts — anteprima dei risultati mentre si scrive (Version: 1.00).
 * Ogni <form data-cerca> (finestra di ricerca e campo del catalogo) chiede i risultati a /api/cerca
 * dopo una breve pausa di digitazione e li mostra raggruppati, con frecce, Invio ed Esc.
 * La finestra si apre con:
 *  - un clic su qualunque elemento [data-cerca-apri] (lente in testata, «Cerca» della barra mobile);
 *  - l'evento document 'serralunga:cerca' (detail facoltativo: { q: 'testo iniziale' });
 *  - i tasti «/» oppure Ctrl+K / Cmd+K.
 * Senza JavaScript i moduli portano alla pagina /cerca/?q=.
 */

type Risultato = { id: string; tipo: string; titolo: string; url: string; sotto: string; img: string; evid: [number, number][] }
type Esito = { q: string; totale: number; risultati: Risultato[]; suggerimento?: string; approssimata?: boolean; scorciatoie?: { titolo: string; url: string }[]; errore?: boolean }
type Testi = Record<string, string>

const TIPI = ['prodotto', 'categoria', 'designer', 'progetto', 'spunto', 'articolo', 'pagina']
const CHIAVE_RECENTI = 'serralunga-ricerche'

const recenti = (): string[] => {
  try { return JSON.parse(localStorage.getItem(CHIAVE_RECENTI) || '[]').filter((x: unknown) => typeof x === 'string').slice(0, 5) } catch { return [] }
}
const ricorda = (q: string) => {
  q = q.trim()
  if (q.length < 2) return
  try { localStorage.setItem(CHIAVE_RECENTI, JSON.stringify([q, ...recenti().filter((x) => x.toLowerCase() !== q.toLowerCase())].slice(0, 5))) } catch { /* archivio non disponibile */ }
}
/** Ricerca per le statistiche (GA4/GTM, se attivi e col consenso gestito da loro). */
const misura = (q: string) => {
  const w = window as unknown as { dataLayer?: unknown[] }
  if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: 'search', search_term: q })
}

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, attr: Record<string, string> = {}, ...figli: (Node | string)[]) => {
  const e = document.createElement(tag)
  for (const [k, v] of Object.entries(attr)) e.setAttribute(k, v)
  e.append(...figli)
  return e
}

/** Titolo con le parole trovate in <mark>. */
function titoloEvidenziato(r: Risultato): DocumentFragment {
  const f = document.createDocumentFragment()
  const car = [...r.titolo]
  let da = 0
  for (const [a, b] of r.evid || []) {
    if (a < da) continue
    f.append(car.slice(da, a).join(''), el('mark', {}, car.slice(a, b).join('')))
    da = b
  }
  f.append(car.slice(da).join(''))
  return f
}

let conta = 0

function collega(form: HTMLFormElement) {
  const input = form.querySelector<HTMLInputElement>('input[name="q"]')
  const lista = form.querySelector<HTMLElement>('[data-cerca-lista]')
  const stato = form.querySelector<HTMLElement>('[data-cerca-stato]')
  if (!input || !lista) return
  const testi: Testi = JSON.parse(form.dataset.testi || '{}')
  const L = form.dataset.lingua || 'it'
  const ambito = form.dataset.ambito || ''
  const inLinea = form.hasAttribute('data-cerca-campo')
  const perGruppo = Number(form.dataset.perGruppo || 4)
  const pagina = form.getAttribute('action') || '/cerca/'
  const n = ++conta
  const cache = new Map<string, Esito>()
  let timer = 0
  let richiesta: AbortController | null = null
  let opzioni: HTMLAnchorElement[] = []
  let attiva = -1

  const t = (k: string) => testi[k] || k
  const urlPagina = (q: string) => `${pagina}?q=${encodeURIComponent(q)}${ambito ? `&ambito=${ambito}` : ''}`

  const apri = (si: boolean) => {
    input.setAttribute('aria-expanded', String(si))
    if (inLinea) form.classList.toggle('aperto', si)
  }
  const evidenziaOpzione = (k: number) => {
    opzioni.forEach((o, i) => o.setAttribute('aria-selected', String(i === k)))
    attiva = k
    if (k >= 0 && opzioni[k]) {
      input.setAttribute('aria-activedescendant', opzioni[k].id)
      opzioni[k].scrollIntoView({ block: 'nearest' })
    } else input.removeAttribute('aria-activedescendant')
  }
  const opzione = (href: string, contenuto: Node[], onclick?: () => void) => {
    const a = el('a', { href, role: 'option', id: `cerca-${n}-${opzioni.length}`, 'aria-selected': 'false', class: 'cerca__voce', tabindex: '-1' }, ...contenuto)
    a.addEventListener('click', () => { ricorda(input.value); misura(input.value); onclick?.() })
    opzioni.push(a)
    return a
  }
  const gruppo = (titolo: string, voci: HTMLElement[]) => {
    const id = `cerca-${n}-g${lista.children.length}`
    return el('div', { role: 'group', 'aria-labelledby': id, class: 'cerca__gruppo' }, el('p', { id, class: 'cerca__gruppo-titolo' }, titolo), ...voci)
  }

  function mostra(e: Esito) {
    opzioni = []
    attiva = -1
    input.removeAttribute('aria-activedescendant')
    lista.replaceChildren()
    const q = input.value.trim()
    if (!q) {
      const r = recenti()
      if (r.length) lista.append(gruppo(t('Ricerche recenti'), r.map((x) => opzione(urlPagina(x), [el('span', { class: 'cerca__testo' }, el('span', { class: 'cerca__titolo' }, x))]))))
      if (e.scorciatoie?.length) lista.append(gruppo(t('Categorie del catalogo'), e.scorciatoie.map((s) => opzione(s.url, [el('span', { class: 'cerca__testo' }, el('span', { class: 'cerca__titolo' }, s.titolo))]))))
      if (stato) stato.textContent = ''
      apri(lista.children.length > 0)
      return
    }
    if (e.errore) {
      lista.append(el('p', { class: 'cerca__vuoto' }, t('La ricerca non è disponibile in questo momento.')))
      apri(true)
      return
    }
    if (e.suggerimento) {
      const b = el('button', { type: 'button', class: 'cerca__forse' }, `${t('Forse cercavi')}: `, el('strong', {}, e.suggerimento))
      b.addEventListener('click', () => { input.value = e.suggerimento || ''; input.focus(); aggiorna(true) })
      lista.append(b)
    }
    if (!e.risultati.length) {
      lista.append(el('p', { class: 'cerca__vuoto' }, `${t('Nessun risultato per')} «${q}».`))
    } else {
      if (e.approssimata) lista.append(el('p', { class: 'cerca__nota' }, t('Nessun contenuto ha tutte le parole: ecco i più vicini.')))
      for (const tipo of TIPI) {
        const voci = e.risultati.filter((r) => r.tipo === tipo).slice(0, tipo === 'prodotto' ? perGruppo + 2 : perGruppo)
        if (!voci.length) continue
        lista.append(gruppo(t(tipo), voci.map((r) => opzione(r.url, [
          r.img
            ? el('img', { src: r.img, alt: '', width: '56', height: '56', loading: 'lazy', decoding: 'async', class: 'cerca__foto' })
            : el('span', { class: 'cerca__foto cerca__foto--vuota', 'aria-hidden': 'true' }),
          el('span', { class: 'cerca__testo' },
            el('span', { class: 'cerca__titolo' }, titoloEvidenziato(r)),
            ...(r.sotto ? [el('span', { class: 'cerca__sotto' }, r.sotto)] : [])),
        ]))))
      }
    }
    const tutti = opzione(urlPagina(q), [el('span', { class: 'cerca__tutti' }, e.totale > 0 ? `${t('Vedi tutti i risultati')} (${e.totale}) →` : `${t('Cerca in tutto il sito')} →`)])
    lista.append(el('div', { class: 'cerca__piede' }, tutti))
    if (stato) stato.textContent = e.totale === 1 ? `1 ${t('risultato')}` : `${e.totale} ${t('risultati')}`
    apri(true)
  }

  async function aggiorna(subito = false) {
    window.clearTimeout(timer)
    const q = input.value.trim()
    const chiave = q.toLowerCase()
    if (cache.has(chiave)) return mostra(cache.get(chiave)!)
    timer = window.setTimeout(async () => {
      richiesta?.abort()
      richiesta = new AbortController()
      form.setAttribute('aria-busy', 'true')
      try {
        const qs = new URLSearchParams({ q, l: L, limite: '30', ...(ambito ? { ambito } : {}) })
        const r = await fetch(`/api/cerca?${qs}`, { signal: richiesta.signal, headers: { Accept: 'application/json' } })
        const e: Esito = await r.json()
        cache.set(chiave, e)
        if (input.value.trim().toLowerCase() === chiave) mostra(e)
      } catch (err) {
        if ((err as Error).name !== 'AbortError') mostra({ q, totale: 0, risultati: [], errore: true })
      } finally {
        form.removeAttribute('aria-busy')
      }
    }, subito || !q ? 0 : 160)
  }

  input.addEventListener('input', () => aggiorna())
  input.addEventListener('focus', () => { if (!lista.children.length || !input.value.trim()) aggiorna(true); else apri(true) })
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      if (!opzioni.length) return
      e.preventDefault()
      const d = e.key === 'ArrowDown' ? 1 : -1
      evidenziaOpzione((attiva + d + opzioni.length + (attiva < 0 && d < 0 ? 1 : 0)) % opzioni.length)
    } else if (e.key === 'Enter' && attiva >= 0 && opzioni[attiva]) {
      e.preventDefault()
      opzioni[attiva].click()
    } else if (e.key === 'Escape' && inLinea && input.getAttribute('aria-expanded') === 'true') {
      e.stopPropagation()
      apri(false)
    }
  })
  form.addEventListener('submit', (e) => {
    const q = input.value.trim()
    if (!q) { e.preventDefault(); input.focus(); return }
    ricorda(q)
    misura(q)
  })
  form.querySelector('[data-cerca-cancella]')?.addEventListener('click', () => { input.value = ''; input.focus(); aggiorna(true) })
  if (inLinea) {
    document.addEventListener('click', (e) => { if (!form.contains(e.target as Node)) apri(false) })
    form.addEventListener('focusout', (e) => { if (!form.contains(e.relatedTarget as Node | null) && e.relatedTarget) apri(false) })
  }
  return { input, aggiorna }
}

/* ---------- Moduli ---------- */
const moduli = new Map<HTMLFormElement, ReturnType<typeof collega>>()
for (const f of Array.from(document.querySelectorAll<HTMLFormElement>('form[data-cerca]'))) moduli.set(f, collega(f))

/* ---------- Finestra di ricerca ---------- */
const finestra = document.querySelector<HTMLDialogElement>('dialog[data-cerca-finestra]')
const moduloFinestra = finestra?.querySelector<HTMLFormElement>('form[data-cerca]')
const ctrl = moduloFinestra ? moduli.get(moduloFinestra) : undefined

function apriFinestra(q?: string) {
  if (!finestra || !ctrl) {
    location.href = `${document.documentElement.lang === 'en' ? '/en' : ''}/cerca/${q ? `?q=${encodeURIComponent(q)}` : ''}`
    return
  }
  if (!finestra.open) {
    finestra.showModal()
    document.documentElement.classList.add('cerca-aperta')
  }
  if (q != null) ctrl.input.value = q
  ctrl.input.focus()
  ctrl.input.select()
  ctrl.aggiorna(true)
}
finestra?.addEventListener('close', () => document.documentElement.classList.remove('cerca-aperta'))
// Clic sul fondo scuro: chiude.
finestra?.addEventListener('click', (e) => { if (e.target === finestra) finestra.close() })
finestra?.querySelector('[data-cerca-chiudi]')?.addEventListener('click', () => finestra.close())
// Esc chiude subito la finestra (senza, il campo di ricerca prima si svuota e solo al secondo Esc si chiude).
ctrl?.input.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); finestra?.close() } })

document.addEventListener('click', (e) => {
  const a = (e.target as Element | null)?.closest?.('[data-cerca-apri]')
  if (!a) return
  e.preventDefault()
  apriFinestra((a as HTMLElement).dataset.q)
})
document.addEventListener('serralunga:cerca', (e) => apriFinestra((e as CustomEvent<{ q?: string } | undefined>).detail?.q))
document.addEventListener('keydown', (e) => {
  const dentro = (e.target as HTMLElement | null)?.closest?.('input, textarea, select, [contenteditable=""], [contenteditable="true"]')
  if (dentro || document.documentElement.classList.contains('in-modifica')) return
  if ((e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) || (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey))) {
    e.preventDefault()
    apriFinestra()
  }
})

/* Pagina dei risultati: la ricerca conta nelle statistiche e resta tra le recenti. */
const qPagina = document.querySelector<HTMLElement>('[data-cerca-pagina]')?.dataset.q
if (qPagina) { ricorda(qPagina); misura(qPagina) }

;(window as unknown as { serralungaCerca: { apri: typeof apriFinestra } }).serralungaCerca = { apri: apriFinestra }
