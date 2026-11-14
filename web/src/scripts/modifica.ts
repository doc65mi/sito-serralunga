/**
 * Modifica dalla pagina (Version: 1.00).
 * Si carica solo se il browser ha il cookie del pannello (vedi Base.astro) e
 * verifica l'utente con /api/users/me. Sito e pannello stanno sullo stesso
 * indirizzo, quindi le chiamate usano il cookie di accesso di Payload.
 *
 * - [data-campo]: testo. Clic → si modifica il testo grezzo (a capo, _corsivo_), uscendo si salva.
 * - [data-campo-img]: immagine. Clic → si sceglie un file, si carica in Media e si collega al campo.
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

function avvia(utente: Json) {
  const barra = document.createElement('div')
  barra.className = 'redazione'
  barra.innerHTML = `
    <button type="button" class="redazione__attiva" aria-pressed="false">Modifica pagina</button>
    <span class="redazione__stato" role="status" aria-live="polite"></span>
    <a class="redazione__link" href="${pannello}" target="_blank" rel="noopener">Apri nel pannello</a>`
  document.body.append(barra)
  const bottone = barra.querySelector<HTMLButtonElement>('.redazione__attiva')!
  const stato = barra.querySelector<HTMLElement>('.redazione__stato')!
  const dici = (t: string, tipoStato = '') => {
    stato.textContent = t
    stato.dataset.tipo = tipoStato
  }
  dici(`${utente.email} · ${lingua.toUpperCase()}`)

  let attiva = false
  bottone.addEventListener('click', () => {
    attiva = !attiva
    document.documentElement.classList.toggle('in-modifica', attiva)
    bottone.setAttribute('aria-pressed', String(attiva))
    bottone.textContent = attiva ? 'Fine modifiche' : 'Modifica pagina'
    dici(attiva ? 'Clic su un testo o su una foto per cambiarli' : `${utente.email} · ${lingua.toUpperCase()}`)
  })

  // In modifica i link non portano altrove e il carosello non scorre da solo.
  document.addEventListener(
    'click',
    (e) => {
      if (!attiva) return
      const el = e.target as HTMLElement
      if (el.closest('.redazione')) return
      const img = el.closest<HTMLElement>('[data-campo-img]')
      const testo = el.closest<HTMLElement>('[data-campo]')
      if (el.closest('a') || img || testo) e.preventDefault()
      if (testo) return modificaTesto(testo)
      if (img) return cambiaImmagine(img)
    },
    true,
  )

  function modificaTesto(el: HTMLElement) {
    if (el.isContentEditable) return
    const conMarcatura = el.hasAttribute('data-testo')
    const prima = conMarcatura ? grezzo(el).trim() : (el.textContent || '').trim()
    el.textContent = prima
    el.classList.add('in-scrittura')
    try {
      el.contentEditable = 'plaintext-only'
    } catch {
      el.contentEditable = 'true'
    }
    el.focus()
    const fine = async (annulla: boolean) => {
      el.removeEventListener('blur', suBlur)
      el.removeEventListener('keydown', suTasto)
      el.contentEditable = 'false'
      el.classList.remove('in-scrittura')
      const dopo = annulla ? prima : scritto(el).replace(/ /g, ' ').replace(/\n{3,}/g, '\n\n').trim()
      if (conMarcatura) el.innerHTML = fmt(dopo)
      else el.textContent = dopo
      if (annulla || dopo === prima) return
      dici('Salvataggio…')
      try {
        await salva(el.dataset.campo!, dopo)
        dici('Salvato e pubblicato', 'ok')
      } catch (err) {
        if (conMarcatura) el.innerHTML = fmt(prima)
        else el.textContent = prima
        dici(`Non salvato: ${(err as Error).message}`, 'errore')
      }
    }
    const suBlur = () => void fine(false)
    const suTasto = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        void fine(true)
      }
      // I campi di una riga si chiudono con Invio; nei testi lunghi Invio va a capo.
      if (e.key === 'Enter' && !conMarcatura) {
        e.preventDefault()
        el.blur()
      }
    }
    el.addEventListener('blur', suBlur)
    el.addEventListener('keydown', suTasto)
  }

  function cambiaImmagine(el: HTMLElement) {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*,video/mp4'
    input.addEventListener('change', async () => {
      const file = input.files?.[0]
      if (!file) return
      dici('Caricamento immagine…')
      try {
        const alt = (el.getAttribute('alt') || el.getAttribute('aria-label') || file.name.replace(/\.[^.]+$/, '')).trim()
        const dati = new FormData()
        dati.append('file', file)
        dati.append('_payload', JSON.stringify({ alt: alt || file.name }))
        const caricato = await richiesta(`/api/media?${q}`, { method: 'POST', body: dati })
        const media = caricato.doc
        await salva(el.dataset.campoImg!, media.id)
        const url = media.sizes?.grande?.url || media.url
        if (el instanceof HTMLImageElement) {
          el.removeAttribute('srcset')
          el.src = url
        } else {
          const nuova = document.createElement('img')
          nuova.src = url
          nuova.alt = media.alt || ''
          nuova.className = el.className.replace('segnaposto', '').trim()
          nuova.dataset.campoImg = el.dataset.campoImg
          el.replaceWith(nuova)
        }
        dici('Immagine salvata e pubblicata', 'ok')
      } catch (err) {
        dici(`Immagine non salvata: ${(err as Error).message}`, 'errore')
      }
    })
    input.click()
  }
}

if (doc) {
  fetch('/api/users/me', { credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => d?.user && avvia(d.user))
    .catch(() => {})
}
