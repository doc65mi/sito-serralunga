/**
 * Modifica dalla pagina (Version: 2.00).
 * Si carica solo se il browser ha il cookie del pannello (vedi Base.astro) e
 * verifica l'utente con /api/users/me. Sito e pannello stanno sullo stesso
 * indirizzo, quindi le chiamate usano il cookie di accesso di Payload.
 *
 * Per chi ha fatto l'accesso la modifica è sempre attiva (come nell'editor delle pagine TWS):
 * - [data-campo]: testo. Clic → si scrive sul posto; in basso compaiono Salva e Annulla.
 *   Nulla si salva da solo: il testo resta aperto finché non si sceglie.
 * - [data-campo-img]: immagine. Ogni foto ha il pulsante «Cambia foto»: si sceglie un file,
 *   si carica in Media e si collega al campo.
 * - Barra in basso: stato, Anteprima (nasconde gli strumenti), Pannello, Esci.
 * Ogni salvataggio pubblica subito nella lingua della pagina.
 */

const main = document.querySelector<HTMLElement>('main[data-doc]')
const doc = main?.dataset.doc || ''
const lingua = main?.dataset.lingua || 'it'

type Json = Record<string, any>

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const fmt = (s: string) =>
  esc(s.trim())
    .replace(/_([^_\n]+)_/g, '<em class="acc">$1</em>')
    .replace(/\r?\n/g, '<br />')

/** Dal testo mostrato al testo da salvare: <br> → a capo, <em class="acc"> → _parola_. */
function grezzo(n: Node): string {
  let out = ''
  n.childNodes.forEach((c) => {
    if (c.nodeType === Node.TEXT_NODE) out += c.textContent || ''
    else if (c instanceof HTMLBRElement) out += '\n'
    else if (c instanceof HTMLElement && c.tagName === 'EM' && c.classList.contains('acc')) out += `_${grezzo(c)}_`
    else out += grezzo(c)
  })
  return out
}

const LINGUE = ['it', 'en']
/** Da un valore letto con locale=all ({ it: …, en: … }) tiene solo la lingua della pagina. */
function soloLingua(v: any, riserva = false): any {
  if (Array.isArray(v)) return v.map((x) => soloLingua(x, riserva))
  if (v && typeof v === 'object') {
    const chiavi = Object.keys(v)
    if (chiavi.length > 0 && chiavi.every((k) => LINGUE.includes(k))) return v[lingua] ?? (riserva ? v.it ?? null : null)
    return Object.fromEntries(chiavi.map((k) => [k, soloLingua(v[k], riserva)]))
  }
  return v
}

/** Testo scritto nell'elemento in modifica, senza le trasformazioni del CSS (maiuscole). */
function scritto(n: Node): string {
  let out = ''
  n.childNodes.forEach((c) => {
    if (c.nodeType === Node.TEXT_NODE) out += c.textContent || ''
    else if (c instanceof HTMLBRElement) out += '\n'
    else if (c instanceof HTMLDivElement || c instanceof HTMLParagraphElement) out += `\n${scritto(c)}`
    else out += scritto(c)
  })
  return out
}

const [tipo, slug, id] = doc.split('/')
const api = tipo === 'globals' ? `/api/globals/${slug}` : `/api/${slug}/${id}`
const pannello = tipo === 'globals' ? `/admin/globals/${slug}` : `/admin/collections/${slug}/${id}`
const q = `locale=${lingua}`

async function richiesta(url: string, init: RequestInit = {}): Promise<Json> {
  const res = await fetch(url, { credentials: 'same-origin', ...init })
  const dati = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(dati?.errors?.[0]?.message || `HTTP ${res.status}`)
  return dati
}

/** Salva un campo: per i percorsi annidati si rimanda l'intero gruppo o elenco di primo livello. */
async function salva(percorso: string, valore: unknown, riserva = false): Promise<void> {
  const parti = percorso.split('.')
  const primo = parti[0]
  let corpo: Json
  if (parti.length === 1) {
    corpo = { [primo]: valore }
  } else {
    // Si legge il documento con tutte le lingue e si tiene solo quella della pagina:
    // così i campi non ancora tradotti restano vuoti e non si copia l'italiano nell'inglese.
    const attuale = await richiesta(`${api}?depth=0&locale=all&draft=false`)
    const radice = soloLingua(attuale[primo], riserva) ?? (/^\d+$/.test(parti[1]) ? [] : {})
    let nodo: any = radice
    for (let i = 1; i < parti.length - 1; i++) {
      const k = parti[i]
      if (nodo[k] == null) nodo[k] = /^\d+$/.test(parti[i + 1]) ? [] : {}
      nodo = nodo[k]
    }
    nodo[parti[parti.length - 1]] = valore
    corpo = { [primo]: radice }
  }
  corpo._status = 'published'
  try {
    await richiesta(`${api}?${q}&depth=0`, {
      method: tipo === 'globals' ? 'POST' : 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(corpo),
    })
  } catch (err) {
    // Un campo obbligatorio non ancora tradotto blocca il salvataggio: si riprova usando l'italiano per i vuoti.
    if (riserva || lingua === 'it' || parti.length === 1) throw err
    return salva(percorso, valore, true)
  }
}

const MATITA = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zm17.7-10.2a1 1 0 0 0 0-1.42l-2.33-2.33a1 1 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>'

function avvia(utente: Json) {
  const radice = document.documentElement
  const barra = document.createElement('div')
  barra.className = 'redazione'
  barra.innerHTML = `
    <span class="redazione__titolo">${MATITA} Modifica della pagina</span>
    <span class="redazione__stato" role="status" aria-live="polite"></span>
    <span class="redazione__azioni">
      <button type="button" class="redazione__attiva" aria-pressed="true"></button>
      <a class="redazione__link" href="${pannello}" target="_blank" rel="noopener">Pannello</a>
      <button type="button" class="redazione__esci">Esci</button>
    </span>`
  document.body.append(barra)
  const bottone = barra.querySelector<HTMLButtonElement>('.redazione__attiva')!
  const stato = barra.querySelector<HTMLElement>('.redazione__stato')!
  const dici = (t: string, tipoStato = '') => {
    stato.textContent = t
    stato.dataset.tipo = tipoStato
  }

  // Barra degli strumenti del testo: compare mentre si scrive, con Salva e Annulla espliciti.
  const strumenti = document.createElement('div')
  strumenti.className = 'redazione-testo'
  strumenti.hidden = true
  strumenti.innerHTML = `
    <span class="redazione-testo__aiuto"></span>
    <button type="button" class="redazione-testo__corsivo" title="Mette o toglie il corsivo d'accento sulla selezione"><em>Corsivo</em></button>
    <button type="button" class="redazione-testo__annulla">Annulla</button>
    <button type="button" class="redazione-testo__salva">Salva</button>`
  document.body.append(strumenti)
  const aiuto = strumenti.querySelector<HTMLElement>('.redazione-testo__aiuto')!
  const corsivo = strumenti.querySelector<HTMLButtonElement>('.redazione-testo__corsivo')!

  // Livello dei pulsanti "Cambia foto": stanno sopra a tutto, così si raggiungono anche le foto coperte da testi.
  const livello = document.createElement('div')
  livello.className = 'redazione-foto'
  document.body.append(livello)
  const pulsantiFoto = new Map<HTMLElement, HTMLButtonElement>()

  /** Antenati che possono tagliare l'elemento (caroselli, slide): fuori da lì il pulsante si nasconde. */
  const ritagli = new WeakMap<HTMLElement, HTMLElement[]>()
  function contenitori(el: HTMLElement): HTMLElement[] {
    let lista = ritagli.get(el)
    if (!lista) {
      lista = []
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const o = getComputedStyle(p)
        if (o.overflowX !== 'visible' || o.overflowY !== 'visible') lista.push(p)
      }
      ritagli.set(el, lista)
    }
    return lista
  }

  function disponiFoto() {
    document.querySelectorAll<HTMLElement>('[data-campo-img]').forEach((el) => {
      if (pulsantiFoto.has(el)) return
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'redazione-foto__pulsante'
      b.innerHTML = `${MATITA}<span>${el.hasAttribute('data-segnaposto') ? 'Carica foto' : 'Cambia foto'}</span>`
      b.addEventListener('click', () => cambiaImmagine(el))
      livello.append(b)
      pulsantiFoto.set(el, b)
    })
    pulsantiFoto.forEach((b, el) => {
      if (!el.isConnected) {
        b.remove()
        pulsantiFoto.delete(el)
        return
      }
      const r = el.getBoundingClientRect()
      const x = r.right - 10
      const y = r.top + 10
      const visibile =
        r.width > 60 &&
        r.height > 40 &&
        (el.checkVisibility?.({ opacityProperty: true, visibilityProperty: true }) ?? true) &&
        contenitori(el).every((c) => {
          const cr = c.getBoundingClientRect()
          return x > cr.left + 20 && x <= cr.right + 1 && y >= cr.top - 1 && y < cr.bottom - 20
        })
      b.hidden = !visibile
      if (visibile) b.style.transform = `translate(${Math.round(x + window.scrollX)}px, ${Math.round(y + window.scrollY)}px) translateX(-100%)`
    })
  }
  let inAttesa = false
  const ridisponi = () => {
    if (inAttesa || !attiva) return
    inAttesa = true
    requestAnimationFrame(() => {
      inAttesa = false
      disponiFoto()
    })
  }
  window.addEventListener('resize', ridisponi)
  window.addEventListener('load', ridisponi)
  document.addEventListener('scroll', ridisponi, true)
  document.addEventListener('transitionend', ridisponi, true)
  new ResizeObserver(ridisponi).observe(document.body)
  window.setInterval(ridisponi, 1500)

  const riposo = () => dici(attiva ? 'Clic su un testo per scriverlo, «Cambia foto» per sostituire un\'immagine.' : `Anteprima: la pagina come la vede il visitatore.`)

  let attiva = true
  try {
    attiva = localStorage.getItem('redazione') !== 'off'
  } catch {}
  function imposta(v: boolean) {
    attiva = v
    radice.classList.toggle('in-modifica', v)
    radice.classList.add('con-redazione')
    bottone.setAttribute('aria-pressed', String(v))
    bottone.textContent = v ? 'Anteprima' : 'Torna a modificare'
    livello.hidden = !v
    try {
      localStorage.setItem('redazione', v ? 'on' : 'off')
    } catch {}
    riposo()
    if (v) disponiFoto()
  }
  bottone.addEventListener('click', () => {
    if (inCorso) return
    imposta(!attiva)
  })
  barra.querySelector('.redazione__esci')!.addEventListener('click', async () => {
    if (inCorso && !confirm('Ci sono modifiche non salvate. Uscire lo stesso?')) return
    inCorso = null
    await fetch('/api/users/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {})
    location.reload()
  })
  barra.title = `${utente.email} · ${lingua.toUpperCase()}`

  /** Testo in corso di scrittura: finché non si preme Salva o Annulla resta aperto. */
  let inCorso: { el: HTMLElement; chiudi: (salva: boolean) => Promise<void>; cambiato: () => boolean } | null = null
  window.addEventListener('beforeunload', (e) => {
    if (inCorso?.cambiato()) e.preventDefault()
  })

  // In modifica i link non portano altrove: il clic su un testo lo apre in scrittura.
  document.addEventListener(
    'click',
    (e) => {
      if (!attiva) return
      const el = e.target as HTMLElement
      if (el.closest('.redazione, .redazione-testo, .redazione-foto')) return
      const testo = el.closest<HTMLElement>('[data-campo]')
      if (inCorso) {
        // Mentre si scrive, un clic fuori non fa perdere nulla: si resta sul testo aperto.
        if (testo !== inCorso.el) {
          if (el.closest('a, button')) e.preventDefault()
          if (inCorso.cambiato()) {
            dici('Premi Salva o Annulla per chiudere il testo che stai scrivendo.', 'errore')
            strumenti.classList.add('redazione-testo--richiamo')
            window.setTimeout(() => strumenti.classList.remove('redazione-testo--richiamo'), 900)
            return
          }
          void inCorso.chiudi(false)
        } else if (el.closest('a')) e.preventDefault()
        if (testo === inCorso?.el) return
      }
      if (testo) {
        e.preventDefault()
        e.stopPropagation()
        modificaTesto(testo)
      } else if (el.closest('a') && el.closest('main')) {
        // I link dentro la pagina restano fermi solo se contengono un testo modificabile.
        if (el.closest('a')!.querySelector('[data-campo]')) e.preventDefault()
      }
    },
    true,
  )

  function modificaTesto(el: HTMLElement) {
    if (el.isContentEditable) return
    const conMarcatura = el.hasAttribute('data-testo')
    const prima = conMarcatura ? grezzo(el).trim() : (el.textContent || '').trim()
    const leggi = () => scritto(el).replace(/ /g, ' ').replace(/\n{3,}/g, '\n\n').trim()
    el.textContent = prima
    el.classList.add('in-scrittura')
    try {
      el.contentEditable = 'plaintext-only'
    } catch {
      el.contentEditable = 'true'
    }
    el.focus()
    // Il testo aperto va al centro, così la barra in basso non lo copre.
    el.scrollIntoView({ block: 'center', behavior: 'smooth' })
    corsivo.hidden = !conMarcatura
    aiuto.textContent = conMarcatura
      ? 'Invio va a capo · _parola_ = corsivo d\'accento · Ctrl+Invio salva · Esc annulla'
      : 'Invio o Ctrl+Invio salva · Esc annulla'
    strumenti.hidden = false
    dici('Stai scrivendo: premi Salva per pubblicare.')

    const chiudi = async (salvare: boolean) => {
      el.removeEventListener('keydown', suTasto)
      el.contentEditable = 'false'
      el.classList.remove('in-scrittura')
      strumenti.hidden = true
      inCorso = null
      const dopo = salvare ? leggi() : prima
      if (conMarcatura) el.innerHTML = fmt(dopo)
      else el.textContent = dopo
      ridisponi()
      if (!salvare || dopo === prima) return riposo()
      dici('Salvataggio…')
      try {
        await salva(el.dataset.campo!, dopo)
        dici('Salvato e pubblicato.', 'ok')
      } catch (err) {
        if (conMarcatura) el.innerHTML = fmt(prima)
        else el.textContent = prima
        dici(`Non salvato: ${(err as Error).message}`, 'errore')
      }
    }
    const suTasto = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        void chiudi(false)
      }
      // I campi di una riga si salvano con Invio; nei testi lunghi Invio va a capo e si salva con Ctrl+Invio.
      if (e.key === 'Enter' && (!conMarcatura || e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        void chiudi(true)
      }
    }
    el.addEventListener('keydown', suTasto)
    inCorso = { el, chiudi, cambiato: () => leggi() !== prima }
  }

  strumenti.addEventListener('mousedown', (e) => e.preventDefault()) // non togliere il cursore dal testo
  strumenti.querySelector('.redazione-testo__salva')!.addEventListener('click', () => void inCorso?.chiudi(true))
  strumenti.querySelector('.redazione-testo__annulla')!.addEventListener('click', () => void inCorso?.chiudi(false))
  corsivo.addEventListener('click', () => {
    const sel = window.getSelection()
    if (!inCorso || !sel || sel.rangeCount === 0 || !inCorso.el.contains(sel.anchorNode)) return
    const scelta = sel.toString()
    if (!scelta.trim()) return dici('Seleziona prima le parole da mettere in corsivo.', 'errore')
    const dentro = /^_[^_]+_$/.test(scelta.trim())
    const nuovo = dentro ? scelta.replace(/_/g, '') : `_${scelta.trim().replace(/_/g, '')}_${/\s$/.test(scelta) ? ' ' : ''}`
    const r = sel.getRangeAt(0)
    r.deleteContents()
    r.insertNode(document.createTextNode(nuovo))
    sel.collapseToEnd()
  })

  function cambiaImmagine(el: HTMLElement) {
    if (inCorso?.cambiato()) return dici('Premi Salva o Annulla per chiudere il testo che stai scrivendo.', 'errore')
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.addEventListener('change', async () => {
      const file = input.files?.[0]
      if (!file) return
      dici('Caricamento della foto…')
      try {
        const alt = (el.getAttribute('alt') || el.getAttribute('aria-label') || file.name.replace(/\.[^.]+$/, '')).trim()
        const dati = new FormData()
        dati.append('file', file)
        dati.append('_payload', JSON.stringify({ alt: alt || file.name }))
        const caricato = await richiesta(`/api/media?${q}`, { method: 'POST', body: dati })
        const media = caricato.doc
        await salva(el.dataset.campoImg!, media.id)
        const url = media.url
        if (el instanceof HTMLImageElement) {
          el.parentElement?.querySelectorAll('source').forEach((f) => f.remove())
          el.removeAttribute('srcset')
          el.src = url
        } else {
          const nuova = document.createElement('img')
          nuova.src = url
          nuova.alt = media.alt || ''
          nuova.className = el.className.replace('segnaposto', '').trim()
          nuova.dataset.campoImg = el.dataset.campoImg
          const cornice = document.createElement('picture')
          cornice.className = 'im'
          el.replaceWith(cornice)
          cornice.append(nuova)
        }
        dici('Foto salvata e pubblicata.', 'ok')
        ridisponi()
      } catch (err) {
        dici(`Foto non salvata: ${(err as Error).message}`, 'errore')
      }
    })
    input.click()
  }

  imposta(attiva)
}

if (doc) {
  fetch('/api/users/me', { credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => d?.user && avvia(d.user))
    .catch(() => {})
}
