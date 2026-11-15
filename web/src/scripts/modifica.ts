/**
 * Modifica dalla pagina (Version: 3.00).
 * Si carica solo se il browser ha il cookie del pannello (vedi Base.astro) e
 * verifica l'utente con /api/users/me. Sito e pannello stanno sullo stesso
 * indirizzo, quindi le chiamate usano il cookie di accesso di Payload.
 *
 * Per chi ha fatto l'accesso la modifica è sempre attiva (come nell'editor delle pagine TWS):
 * - [data-campo]: testo. Clic → si scrive sul posto; in basso compaiono Salva e Annulla.
 *   Nulla si salva da solo: il testo resta aperto finché non si sceglie.
 * - [data-campo-img]: immagine. Ogni foto ha il pulsante «Cambia foto»: si sceglie un file,
 *   si carica in Media e si collega al campo.
 *   Dal menu di ogni foto: aggiungere altre foto (lo spazio diventa uno slider), accendere la
 *   lightbox, scrivere il testo alternativo (anche con l'AI), generare un'immagine con l'AI.
 * - [data-campo-link]: pulsante. Insieme al testo si cambia l'indirizzo a cui porta.
 * - Pulsante AI nella barra del testo: istruzione → proposta → Inserisci → Salva.
 * - [data-blocco] e «Aggiungi blocco»: blocchi in fondo alla pagina, scelti a mano o descritti all'AI.
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
    // Un campo tradotto mai compilato arriva come oggetto vuoto: va lasciato fuori, non salvato come testo.
    if (chiavi.length === 0) return undefined
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

/** Valore attuale di un campo (anche annidato) nella lingua della pagina, con le relazioni come id. */
async function leggi(percorso: string): Promise<any> {
  const attuale = await richiesta(`${api}?depth=0&locale=all&draft=false`)
  let nodo: any = soloLingua(attuale[percorso.split('.')[0]], true)
  for (const k of percorso.split('.').slice(1)) nodo = nodo?.[k]
  return nodo
}

async function carica(file: File, alt: string): Promise<Json> {
  const dati = new FormData()
  dati.append('file', file)
  dati.append('_payload', JSON.stringify({ alt: alt || file.name.replace(/\.[^.]+$/, '') }))
  return (await richiesta(`/api/media?${q}`, { method: 'POST', body: dati })).doc
}

function scegliFile(multipli = false): Promise<File[]> {
  return new Promise((risolvi) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.multiple = multipli
    input.addEventListener('change', () => risolvi([...(input.files || [])]))
    input.addEventListener('cancel', () => risolvi([]))
    input.click()
  })
}

const postJson = (url: string, corpo: Json) =>
  fetch(url, { method: 'POST', credentials: 'same-origin', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corpo) }).then(async (r) => {
    const d = await r.json().catch(() => ({}))
    if (!r.ok) throw new Error(d?.errore || d?.errors?.[0]?.message || `HTTP ${r.status}`)
    return d as Json
  })

const LINK_VALIDO = /^(\/|#|https:\/\/|mailto:|tel:)/

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
    <label class="redazione-testo__url" hidden>Indirizzo del pulsante <input type="text" spellcheck="false" autocomplete="off" placeholder="/designer/ oppure https://…" /></label>
    <button type="button" class="redazione-testo__ai" hidden title="Riscrive il testo con l'intelligenza artificiale: la proposta si rivede prima di salvare">AI</button>
    <button type="button" class="redazione-testo__corsivo" title="Mette o toglie il corsivo d'accento sulla selezione"><em>Corsivo</em></button>
    <button type="button" class="redazione-testo__annulla">Annulla</button>
    <button type="button" class="redazione-testo__salva">Salva</button>`
  document.body.append(strumenti)
  const aiuto = strumenti.querySelector<HTMLElement>('.redazione-testo__aiuto')!
  const corsivo = strumenti.querySelector<HTMLButtonElement>('.redazione-testo__corsivo')!
  const campoUrl = strumenti.querySelector<HTMLLabelElement>('.redazione-testo__url')!
  const inputUrl = campoUrl.querySelector('input')!
  const bottoneAi = strumenti.querySelector<HTMLButtonElement>('.redazione-testo__ai')!

  // Che cosa può fare l'AI dipende dalle impostazioni del pannello (chiavi e interruttore).
  let ai: { testi: boolean; immagini: boolean } = { testi: false, immagini: false }
  fetch('/api/ai/stato', { credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      if (d) ai = { testi: !!d.testi, immagini: !!d.immagini }
    })
    .catch(() => {})

  /** Finestra di lavoro (AI, testo alternativo, blocchi): un <dialog> con titolo e pulsante di chiusura. */
  function finestra(titolo: string, corpo: string): HTMLDialogElement {
    const d = document.createElement('dialog')
    d.className = 'redazione-ai'
    d.innerHTML = `<form method="dialog" class="redazione-ai__testa"><strong>${esc(titolo)}</strong><button class="redazione-ai__chiudi" aria-label="Chiudi">×</button></form><div class="redazione-ai__corpo">${corpo}</div><p class="redazione-ai__stato" role="status" aria-live="polite"></p>`
    document.body.append(d)
    d.addEventListener('close', () => d.remove())
    d.showModal()
    return d
  }
  const statoDi = (d: HTMLDialogElement) => (t: string, errore = false) => {
    const el = d.querySelector<HTMLElement>('.redazione-ai__stato')!
    el.textContent = t
    el.dataset.tipo = errore ? 'errore' : ''
  }

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
    document.querySelectorAll<HTMLElement>('[data-campo-img], [data-campo-lista]').forEach((el) => {
      if (pulsantiFoto.has(el)) return
      const b = document.createElement('button')
      b.type = 'button'
      b.className = 'redazione-foto__pulsante'
      b.innerHTML = `${MATITA}<span>${el.hasAttribute('data-segnaposto') ? 'Carica foto' : 'Foto'}</span>`
      b.addEventListener('click', (e) => {
        e.stopPropagation()
        menuFoto(el, b)
      })
      livello.append(b)
      pulsantiFoto.set(el, b)
    })
    pulsantiFoto.forEach((b, el) => {
      if (!el.isConnected) {
        b.remove()
        pulsantiFoto.delete(el)
        return
      }
      // Parte della foto davvero in vista: la foto può sporgere dal suo riquadro (zoom lento, caroselli).
      const r = el.getBoundingClientRect()
      let sinistra = r.left, alto = r.top, destra = r.right, basso = r.bottom
      for (const c of contenitori(el)) {
        const cr = c.getBoundingClientRect()
        sinistra = Math.max(sinistra, cr.left)
        alto = Math.max(alto, cr.top)
        destra = Math.min(destra, cr.right)
        basso = Math.min(basso, cr.bottom)
      }
      const x = destra - 10
      const y = alto + 10
      const visibile =
        destra - sinistra > 60 &&
        basso - alto > 40 &&
        (el.checkVisibility?.({ opacityProperty: true, visibilityProperty: true }) ?? true)
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

  const riposo = () => dici(attiva ? 'Clic su un testo o un pulsante per scriverlo, «Foto» per le immagini, «Aggiungi blocco» in fondo alla pagina.' : `Anteprima: la pagina come la vede il visitatore.`)

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
      if (el.closest('.redazione, .redazione-testo, .redazione-foto, .redazione-ai, .redazione-menu, .redazione-blocco, .redazione-blocchi, .spazio__comandi')) return
      document.querySelector('.redazione-menu')?.remove()
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
    const leggiTesto = () => scritto(el).replace(/ /g, ' ').replace(/\n{3,}/g, '\n\n').trim()
    // Pulsante: insieme al testo si cambia l'indirizzo.
    const link = el.closest<HTMLElement>('[data-campo-link]')
    const urlPrima = link?.dataset.link || ''
    campoUrl.hidden = !link
    inputUrl.value = urlPrima
    bottoneAi.hidden = !ai.testi
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
      : link
        ? 'Testo e indirizzo del pulsante · Invio salva · Esc annulla'
        : 'Invio o Ctrl+Invio salva · Esc annulla'
    strumenti.hidden = false
    dici('Stai scrivendo: premi Salva per pubblicare.')

    const chiudi = async (salvare: boolean) => {
      const urlDopo = link && salvare ? inputUrl.value.trim() : urlPrima
      if (link && salvare && urlDopo !== urlPrima && urlDopo && !LINK_VALIDO.test(urlDopo)) {
        dici('Indirizzo non valido: deve iniziare con / (pagina del sito), # (ancora), https://, mailto: o tel:', 'errore')
        inputUrl.focus()
        return
      }
      el.removeEventListener('keydown', suTasto)
      inputUrl.onkeydown = null
      el.contentEditable = 'false'
      el.classList.remove('in-scrittura')
      strumenti.hidden = true
      inCorso = null
      const dopo = salvare ? leggiTesto() : prima
      if (conMarcatura) el.innerHTML = fmt(dopo)
      else el.textContent = dopo
      ridisponi()
      if (!salvare || (dopo === prima && urlDopo === urlPrima)) return riposo()
      dici('Salvataggio…')
      try {
        if (dopo !== prima) await salva(el.dataset.campo!, dopo)
        if (link && urlDopo !== urlPrima) {
          await salva(link.dataset.campoLink!, urlDopo)
          link.dataset.link = urlDopo
          link.setAttribute('href', urlDopo.startsWith('/') && lingua !== 'it' ? `/${lingua}${urlDopo}` : urlDopo || '#')
        }
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
    inputUrl.onkeydown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        void chiudi(true)
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        void chiudi(false)
      }
    }
    inCorso = { el, chiudi, cambiato: () => leggiTesto() !== prima || (!!link && inputUrl.value.trim() !== urlPrima) }
  }

  strumenti.addEventListener('mousedown', (e) => {
    if (!(e.target as HTMLElement).closest('input')) e.preventDefault() // non togliere il cursore dal testo
  })
  bottoneAi.addEventListener('click', () => inCorso && aiTesto(inCorso.el))
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

  // ---------------------------------------------------------------- AI sui testi

  const RICHIESTE = [
    ['Migliora', 'Migliora il testo: più chiaro e scorrevole, stessa lunghezza e stesso significato.'],
    ['Accorcia', 'Accorcia il testo di circa un terzo senza perdere le informazioni.'],
    ['Più tecnico', 'Rendi il tono più tecnico e professionale, adatto a progettisti e contractor.'],
    ['Correggi', 'Correggi solo ortografia, grammatica e punteggiatura, senza cambiare altro.'],
    [lingua === 'it' ? 'Traduci in italiano' : 'Traduci in inglese', lingua === 'it' ? 'Traduci in italiano mantenendo tono e lunghezza.' : 'Traduci in inglese britannico mantenendo tono e lunghezza.'],
  ]

  function tipoCampo(el: HTMLElement): string {
    const campo = (el.dataset.campo || '').toLowerCase()
    if (/pulsante|etichetta$|link\d?etichetta/.test(campo) || el.closest('[data-campo-link]')) return 'pulsante'
    if (/kicker|ambito/.test(campo)) return 'kicker'
    if (/titolo|nome|domanda/.test(campo) || /^H[1-4]$/.test(el.tagName)) return 'titolo'
    return 'paragrafo'
  }

  function aiTesto(el: HTMLElement) {
    const d = finestra('Testo con l\'AI', `
      <p class="redazione-ai__nota">Si inviano l'istruzione, il testo del campo e il testo della sezione. La proposta non viene salvata da sola.</p>
      <div class="redazione-ai__rapide">${RICHIESTE.map(([n], k) => `<button type="button" data-rapida="${k}">${n}</button>`).join('')}</div>
      <label>Che cosa deve fare<textarea class="redazione-ai__istruzione" rows="3" placeholder="Es. Riscrivi il titolo in massimo otto parole"></textarea></label>
      <button type="button" class="redazione-ai__vai">Genera proposta</button>
      <label>Proposta (si può correggere)<textarea class="redazione-ai__proposta" rows="6"></textarea></label>
      <button type="button" class="redazione-ai__usa" disabled>Inserisci nel testo</button>`)
    const dico = statoDi(d)
    const istruzione = d.querySelector<HTMLTextAreaElement>('.redazione-ai__istruzione')!
    const proposta = d.querySelector<HTMLTextAreaElement>('.redazione-ai__proposta')!
    const vai = d.querySelector<HTMLButtonElement>('.redazione-ai__vai')!
    const usa = d.querySelector<HTMLButtonElement>('.redazione-ai__usa')!
    const genera = async () => {
      if (!istruzione.value.trim()) return dico('Scrivere che cosa fare con il testo.', true)
      vai.disabled = true
      dico('Richiesta in corso…')
      try {
        const r = await postJson('/api/ai/testo', {
          istruzione: istruzione.value,
          testo: scritto(el).trim(),
          tipo: tipoCampo(el),
          lingua,
          pagina: document.title,
          contesto: (el.closest('section, article, header, main')?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 5000),
        })
        proposta.value = r.testo || ''
        usa.disabled = !proposta.value
        dico('Proposta pronta: rileggila, poi «Inserisci nel testo» e «Salva».')
      } catch (err) {
        dico((err as Error).message, true)
      }
      vai.disabled = false
    }
    d.querySelectorAll<HTMLButtonElement>('[data-rapida]').forEach((b) =>
      b.addEventListener('click', () => {
        istruzione.value = RICHIESTE[Number(b.dataset.rapida)][1]
        void genera()
      }),
    )
    vai.addEventListener('click', () => void genera())
    usa.addEventListener('click', () => {
      el.textContent = proposta.value.trim()
      d.close()
      el.focus()
      dici('Proposta inserita: premi Salva per pubblicarla o Annulla per tornare al testo di prima.')
    })
  }

  // ---------------------------------------------------------------- Foto: menu, slider, lightbox, alt, AI

  /** Foto mostrata in questo momento nello spazio (con lo slider può non essere la prima). */
  function mostrata(el: HTMLElement) {
    const cornice = el.closest('picture')?.parentElement || el.parentElement
    const foto = cornice ? [...cornice.querySelectorAll<HTMLImageElement>(':scope > .im > img')] : []
    const indice = Math.min(Number(cornice?.dataset.spazioIndice || 0), Math.max(foto.length - 1, 0))
    return { cornice, foto, indice, img: foto[indice] as HTMLImageElement | undefined }
  }

  const chiaveSpazio = (el: HTMLElement) => `${doc}:${el.dataset.campoImg}`
  async function leggiSpazio(el: HTMLElement): Promise<Json | null> {
    const r = await richiesta(`/api/spazi-foto?where[chiave][equals]=${encodeURIComponent(chiaveSpazio(el))}&depth=0&limit=1`)
    return r.docs?.[0] || null
  }
  async function scriviSpazio(el: HTMLElement, dati: Json) {
    const s = await leggiSpazio(el)
    await richiesta(s ? `/api/spazi-foto/${s.id}` : '/api/spazi-foto', {
      method: s ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chiave: chiaveSpazio(el), ...dati }),
    })
  }

  const ricarica = (messaggio: string) => {
    dici(`${messaggio} Aggiorno la pagina…`, 'ok')
    window.setTimeout(() => location.reload(), 500)
  }
  const occupato = () => {
    if (inCorso?.cambiato()) {
      dici('Premi Salva o Annulla per chiudere il testo che stai scrivendo.', 'errore')
      return true
    }
    return false
  }
  const altDi = (el: HTMLElement) => (el.getAttribute('alt') || el.getAttribute('aria-label') || '').trim()

  function menuFoto(el: HTMLElement, vicino: HTMLElement) {
    document.querySelector('.redazione-menu')?.remove()
    if (occupato()) return
    const lista = el.dataset.campoLista
    const vuota = el.hasAttribute('data-segnaposto')
    const { foto, indice, img, cornice } = mostrata(el)
    const conLightbox = !!el.closest('picture')?.hasAttribute('data-lightbox')
    const voci: [string, () => void][] = []
    if (lista) {
      voci.push([vuota ? 'Carica le foto' : 'Aggiungi foto allo slider', () => void aggiungiFoto(el)])
      if (!vuota) voci.push(['Sostituisci la foto mostrata', () => void cambiaImmagine(el, indice)])
      if (!vuota) voci.push(['Togli la foto mostrata', () => void togliFoto(el, indice)])
      if (el.dataset.campoLightbox) voci.push([conLightbox ? 'Spegni la lightbox' : 'Accendi la lightbox', () => void lightboxSu(el, !conLightbox)])
    } else {
      voci.push([vuota ? 'Carica foto' : indice > 0 ? 'Sostituisci la foto principale' : 'Cambia foto', () => void cambiaImmagine(el)])
      if (!vuota) {
        voci.push([foto.length > 1 ? 'Aggiungi un\'altra foto allo slider' : 'Aggiungi foto (diventa uno slider)', () => void aggiungiFoto(el)])
        if (indice > 0) voci.push(['Togli la foto mostrata dallo slider', () => void togliFoto(el, indice)])
        voci.push([conLightbox ? 'Spegni la lightbox' : 'Accendi la lightbox (apre a tutto schermo)', () => void lightboxSu(el, !conLightbox)])
      }
    }
    if (img?.dataset.media) voci.push(['Testo alternativo (SEO)', () => testoAlternativo(img)])
    if (ai.immagini && !lista) voci.push(['Genera un\'immagine con l\'AI', () => aiImmagine(el, cornice)])
    const menu = document.createElement('div')
    menu.className = 'redazione-menu'
    menu.setAttribute('role', 'menu')
    voci.forEach(([nome, fn]) => {
      const b = document.createElement('button')
      b.type = 'button'
      b.setAttribute('role', 'menuitem')
      b.textContent = nome
      b.addEventListener('click', () => {
        menu.remove()
        fn()
      })
      menu.append(b)
    })
    document.body.append(menu)
    const r = vicino.getBoundingClientRect()
    menu.style.top = `${Math.round(r.bottom + window.scrollY + 4)}px`
    menu.style.left = `${Math.round(Math.max(8, r.right + window.scrollX - menu.offsetWidth))}px`
    menu.querySelector('button')?.focus()
    menu.addEventListener('keydown', (e) => e.key === 'Escape' && menu.remove())
  }

  async function cambiaImmagine(el: HTMLElement, indiceLista?: number) {
    const [file] = await scegliFile()
    if (!file) return
    dici('Caricamento della foto…')
    try {
      const media = await carica(file, altDi(el))
      if (el.dataset.campoLista) {
        const ids: number[] = (await leggi(el.dataset.campoLista)) || []
        ids[indiceLista ?? 0] = media.id
        await salva(el.dataset.campoLista, ids)
        return ricarica('Foto sostituita.')
      }
      await salva(el.dataset.campoImg!, media.id)
      ricarica('Foto salvata e pubblicata.')
    } catch (err) {
      dici(`Foto non salvata: ${(err as Error).message}`, 'errore')
    }
  }

  async function aggiungiFoto(el: HTMLElement) {
    const file = await scegliFile(true)
    if (!file.length) return
    try {
      const nuovi: number[] = []
      for (const [k, f] of file.entries()) {
        dici(`Caricamento della foto ${k + 1} di ${file.length}…`)
        nuovi.push((await carica(f, altDi(el))).id)
      }
      if (el.dataset.campoLista) {
        const ids: number[] = (await leggi(el.dataset.campoLista)) || []
        await salva(el.dataset.campoLista, [...ids, ...nuovi])
      } else {
        const s = await leggiSpazio(el)
        await scriviSpazio(el, { immagini: [...(s?.immagini || []), ...nuovi] })
      }
      ricarica(file.length > 1 ? 'Foto aggiunte allo slider.' : 'Foto aggiunta allo slider.')
    } catch (err) {
      dici(`Foto non aggiunte: ${(err as Error).message}`, 'errore')
    }
  }

  async function togliFoto(el: HTMLElement, indice: number) {
    if (!confirm('Togliere la foto mostrata da questo spazio? Il file resta in Media.')) return
    try {
      if (el.dataset.campoLista) {
        const ids: number[] = (await leggi(el.dataset.campoLista)) || []
        ids.splice(indice, 1)
        await salva(el.dataset.campoLista, ids)
      } else {
        const s = await leggiSpazio(el)
        const ids: number[] = [...(s?.immagini || [])]
        ids.splice(indice - 1, 1) // la prima foto dello spazio è quella del campo, non dell'elenco
        await scriviSpazio(el, { immagini: ids })
      }
      ricarica('Foto tolta.')
    } catch (err) {
      dici(`Non riuscito: ${(err as Error).message}`, 'errore')
    }
  }

  async function lightboxSu(el: HTMLElement, accesa: boolean) {
    try {
      if (el.dataset.campoLightbox) await salva(el.dataset.campoLightbox, accesa)
      else await scriviSpazio(el, { lightbox: accesa })
      ricarica(accesa ? 'Lightbox accesa.' : 'Lightbox spenta.')
    } catch (err) {
      dici(`Non riuscito: ${(err as Error).message}`, 'errore')
    }
  }

  function testoAlternativo(img: HTMLImageElement) {
    const id = Number(img.dataset.media)
    const d = finestra('Testo alternativo della foto', `
      <p class="redazione-ai__nota">Descrive la foto a chi non la vede e ai motori di ricerca: soggetto, materiale, colore, contesto. Massimo 125 caratteri. Vale per questa foto ovunque compaia, nella lingua della pagina.</p>
      <label>Testo alternativo<textarea class="redazione-ai__proposta" rows="3" maxlength="125"></textarea></label>
      <div class="redazione-ai__riga">
        ${ai.testi ? '<button type="button" class="redazione-ai__vai">Proponi con l\'AI</button>' : ''}
        <button type="button" class="redazione-ai__usa">Salva</button>
      </div>`)
    const dico = statoDi(d)
    const campo = d.querySelector<HTMLTextAreaElement>('.redazione-ai__proposta')!
    campo.value = img.alt
    d.querySelector<HTMLButtonElement>('.redazione-ai__vai')?.addEventListener('click', async (e) => {
      const b = e.currentTarget as HTMLButtonElement
      b.disabled = true
      dico('L\'AI sta guardando la foto…')
      try {
        const vicino = (img.closest('section, article, figure, a')?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 400)
        const r = await postJson('/api/ai/alt', { media: id, lingua, contesto: `${document.title}. ${vicino}` })
        campo.value = r.alt || ''
        dico('Proposta pronta: controlla che descriva davvero la foto, poi Salva.')
      } catch (err) {
        dico((err as Error).message, true)
      }
      b.disabled = false
    })
    d.querySelector<HTMLButtonElement>('.redazione-ai__usa')!.addEventListener('click', async () => {
      const valore = campo.value.trim()
      if (!valore) return dico('Il testo alternativo non può restare vuoto.', true)
      try {
        await richiesta(`/api/media/${id}?${q}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ alt: valore }) })
        img.alt = valore
        d.close()
        dici('Testo alternativo salvato.', 'ok')
      } catch (err) {
        dico((err as Error).message, true)
      }
    })
  }

  function aiImmagine(el: HTMLElement, cornice?: Element | null) {
    const r = (cornice || el).getBoundingClientRect()
    const orientamento = r.width > r.height * 1.15 ? 'orizzontale' : r.height > r.width * 1.15 ? 'verticale' : 'quadrata'
    const d = finestra('Immagine con l\'AI', `
      <p class="redazione-ai__nota">Crea una nuova immagine da una descrizione: non ritocca la foto attuale. È un'immagine di fantasia, da non usare per mostrare prodotti o progetti reali. La generazione può richiedere fino a due minuti e consuma credito del fornitore.</p>
      <label>Descrizione dell'immagine (formato ${orientamento})<textarea class="redazione-ai__istruzione" rows="4"></textarea></label>
      <button type="button" class="redazione-ai__vai">Genera immagine</button>
      <div class="redazione-ai__anteprima" hidden><img alt="" /></div>
      <button type="button" class="redazione-ai__usa" disabled>Usa in questo spazio</button>`)
    const dico = statoDi(d)
    const vai = d.querySelector<HTMLButtonElement>('.redazione-ai__vai')!
    const usa = d.querySelector<HTMLButtonElement>('.redazione-ai__usa')!
    const anteprima = d.querySelector<HTMLElement>('.redazione-ai__anteprima')!
    let generata: Json | null = null
    vai.addEventListener('click', async () => {
      vai.disabled = true
      dico('Generazione in corso: può richiedere fino a due minuti…')
      try {
        const risposta = await postJson('/api/ai/immagine', { descrizione: d.querySelector<HTMLTextAreaElement>('.redazione-ai__istruzione')!.value, orientamento, alt: altDi(el) })
        generata = risposta.doc
        anteprima.hidden = false
        anteprima.querySelector('img')!.src = generata!.url
        usa.disabled = false
        dico('Immagine pronta e salvata in Media. «Usa in questo spazio» la mette nella pagina.')
      } catch (err) {
        dico((err as Error).message, true)
      }
      vai.disabled = false
    })
    usa.addEventListener('click', async () => {
      if (!generata) return
      try {
        await salva(el.dataset.campoImg!, generata.id)
        d.close()
        ricarica('Immagine messa nella pagina.')
      } catch (err) {
        dico((err as Error).message, true)
      }
    })
  }

  // ---------------------------------------------------------------- Blocchi

  const IT = lingua === 'it'
  const TIPI_BLOCCO: [string, string, () => Json][] = [
    ['testo', 'Testo', () => ({ titolo: IT ? 'Titolo del blocco' : 'Block title', testo: IT ? 'Testo del blocco: clic per scriverlo.' : 'Block text: click to write it.' })],
    ['immagineTesto', 'Immagine e testo', () => ({ titolo: IT ? 'Titolo del blocco' : 'Block title', testo: IT ? 'Testo del blocco: clic per scriverlo.' : 'Block text: click to write it.', lato: 'sinistra' })],
    ['slider', 'Slider di foto', () => ({ lightbox: true, formato: 'largo', immagini: [] })],
    ['prodotti', 'Elenco di prodotti', () => ({ titolo: IT ? 'I prodotti' : 'Products', voci: [] })],
    ['citazione', 'Citazione', () => ({ testo: IT ? 'Testo della citazione' : 'Quote text', autore: IT ? 'Autore' : 'Author' })],
    ['domande', 'Domande e risposte', () => ({ titolo: IT ? 'Domande frequenti' : 'Frequently asked questions', voci: [{ domanda: IT ? 'Domanda' : 'Question', risposta: IT ? 'Risposta' : 'Answer' }] })],
    ['invito', 'Invito all\'azione', () => ({ titolo: IT ? 'Titolo dell\'invito' : 'Call to action title', pulsante: IT ? 'Contattaci' : 'Contact us', link: '/#listino', sfondo: 'scuro' })],
  ]

  async function salvaBlocchi(cambia: (b: Json[]) => Json[] | void, messaggio: string) {
    const attuali: Json[] = (await leggi('blocchi')) || []
    const nuovi = cambia(attuali) || attuali
    await salva('blocchi', nuovi)
    ricarica(messaggio)
  }

  async function completaBlocco(b: Json, indirizzi: string, dico: (t: string, e?: boolean) => void): Promise<Json | null> {
    if (b.blockType === 'slider' && !(b.immagini || []).length) {
      dico('Scegli le foto dello slider…')
      const file = await scegliFile(true)
      if (!file.length) {
        dico('Nessuna foto scelta: il blocco non è stato aggiunto.', true)
        return null
      }
      b.immagini = []
      for (const [k, f] of file.entries()) {
        dico(`Caricamento della foto ${k + 1} di ${file.length}…`)
        b.immagini.push((await carica(f, b.titolo || document.title)).id)
      }
    }
    if (b.blockType === 'prodotti' && !(b.voci || []).length) {
      dico('Leggo le schede dei prodotti…')
      const r = await postJson('/api/blocchi/prodotti', { indirizzi })
      b.voci = r.voci
      if (!b.voci.length) {
        dico('Nessun indirizzo di prodotto riconosciuto: incollare gli indirizzi delle schede, uno per riga.', true)
        return null
      }
    }
    return b
  }

  function nuovoBlocco() {
    if (occupato()) return
    const d = finestra('Aggiungi un blocco', `
      <p class="redazione-ai__nota">Il blocco viene aggiunto in fondo alla pagina; poi si sposta con le frecce e i testi si scrivono con un clic.</p>
      <label>${ai.testi ? 'Descrivi il blocco all\'AI, oppure incolla qui gli indirizzi dei prodotti' : 'Indirizzi dei prodotti (per l\'elenco di prodotti), uno per riga'}<textarea class="redazione-ai__istruzione" rows="5" placeholder="${ai.testi ? 'Es. Inserisci un elenco di prodotti con questi indirizzi: https://serralunga.com/products/… oppure: uno slider di foto della terrazza, con titolo…' : 'https://serralunga.com/products/…'}"></textarea></label>
      ${ai.testi ? '<button type="button" class="redazione-ai__vai">Crea con l\'AI</button>' : '<p class="redazione-ai__nota">L\'AI non è attiva: si accende nel pannello, Impostazioni &gt; Intelligenza artificiale.</p>'}
      <p class="redazione-ai__nota">Oppure scegli il tipo:</p>
      <div class="redazione-ai__rapide">${TIPI_BLOCCO.map(([tipo, nome]) => `<button type="button" data-tipo="${tipo}">${nome}</button>`).join('')}</div>`)
    const dico = statoDi(d)
    const testo = d.querySelector<HTMLTextAreaElement>('.redazione-ai__istruzione')!
    const aggiungi = async (b: Json | null) => {
      if (!b) return
      dico('Salvataggio del blocco…')
      await salvaBlocchi((lista) => [...lista, b], 'Blocco aggiunto.')
      d.close()
    }
    d.querySelector<HTMLButtonElement>('.redazione-ai__vai')?.addEventListener('click', async (e) => {
      const b = e.currentTarget as HTMLButtonElement
      b.disabled = true
      dico('L\'AI prepara il blocco…')
      try {
        const r = await postJson('/api/ai/blocco', {
          istruzione: testo.value,
          lingua,
          pagina: document.title,
          contesto: (main?.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 4000),
        })
        if (r.scartati?.length) dici(`Indirizzi non riconosciuti: ${r.scartati.join(', ')}`, 'errore')
        await aggiungi(await completaBlocco(r.blocco, testo.value, dico))
      } catch (err) {
        dico((err as Error).message, true)
      }
      b.disabled = false
    })
    d.querySelectorAll<HTMLButtonElement>('[data-tipo]').forEach((b) =>
      b.addEventListener('click', async () => {
        const [tipo, , base] = TIPI_BLOCCO.find(([t]) => t === b.dataset.tipo)!
        try {
          await aggiungi(await completaBlocco({ blockType: tipo, sfondo: 'chiaro', ...base() }, testo.value, dico))
        } catch (err) {
          dico((err as Error).message, true)
        }
      }),
    )
  }

  const zona = document.querySelector<HTMLElement>('[data-blocchi]')
  if (zona) {
    zona.innerHTML = `<button type="button" class="redazione-blocchi__aggiungi">+ Aggiungi blocco</button><span>Testo, immagine e testo, slider di foto, elenco di prodotti, citazione, domande e risposte, invito.</span>`
    zona.querySelector('button')!.addEventListener('click', nuovoBlocco)
  }
  document.querySelectorAll<HTMLElement>('[data-blocco]').forEach((sezione) => {
    const k = Number(sezione.dataset.blocco)
    const comandi = document.createElement('div')
    comandi.className = 'redazione-blocco'
    comandi.innerHTML = `<span>Blocco ${k + 1}</span><button type="button" data-azione="su" aria-label="Sposta su">↑</button><button type="button" data-azione="giu" aria-label="Sposta giù">↓</button><button type="button" data-azione="sfondo">Sfondo</button><button type="button" data-azione="togli">Elimina</button>`
    sezione.prepend(comandi)
    comandi.addEventListener('click', async (e) => {
      const azione = (e.target as HTMLElement).closest<HTMLButtonElement>('button')?.dataset.azione
      if (!azione || occupato()) return
      if (azione === 'togli' && !confirm('Eliminare questo blocco dalla pagina?')) return
      try {
        await salvaBlocchi((lista) => {
          if (azione === 'togli') lista.splice(k, 1)
          else if (azione === 'sfondo') lista[k].sfondo = { chiaro: 'carta', carta: 'scuro', scuro: 'chiaro' }[lista[k].sfondo as string] || 'carta'
          else {
            const j = azione === 'su' ? k - 1 : k + 1
            if (j < 0 || j >= lista.length) return
            ;[lista[k], lista[j]] = [lista[j], lista[k]]
          }
        }, azione === 'togli' ? 'Blocco eliminato.' : 'Blocco aggiornato.')
      } catch (err) {
        dici(`Non riuscito: ${(err as Error).message}`, 'errore')
      }
    })
  })

  imposta(attiva)
}

if (doc) {
  fetch('/api/users/me', { credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => d?.user && avvia(d.user))
    .catch(() => {})
}
