/**
 * site.ts — comportamenti condivisi (Version: 1.05: colore e codice della foto nella galleria prodotto;
 * 1.04: lightbox con miniature e swipe, slider a dissolvenza
 * nella scheda prodotto; 1.03: barra rapida su telefono; 1.02: reCAPTCHA, newsletter, conversioni)
 * Ricavati dai template (classe Component di ogni .dc.html): slide della home,
 * caroselli, galleria prodotto, comparsa allo scorrimento, video, modulo richieste.
 */

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel) as NodeListOf<T>)

const riduciMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Menu su schermi stretti */
for (const btn of $$<HTMLButtonElement>('[data-menu]')) {
  const header = btn.closest('[data-header]')
  btn.addEventListener('click', () => {
    const aperto = header?.classList.toggle('aperto') ?? false
    btn.setAttribute('aria-expanded', String(aperto))
  })
  header?.querySelectorAll('.testa__menu a').forEach((a) =>
    a.addEventListener('click', () => {
      header.classList.remove('aperto')
      btn.setAttribute('aria-expanded', 'false')
    }),
  )
}

/* Tendine del menu principale: su schermi stretti si aprono con la freccia accanto alla voce */
for (const btn of $$<HTMLButtonElement>('[data-tendina-apri]')) {
  btn.addEventListener('click', () => {
    const voce = btn.closest('[data-tendina]')
    const aperta = voce?.classList.toggle('aperta') ?? false
    btn.setAttribute('aria-expanded', String(aperta))
  })
}
/* Barra rapida su telefono (1.03): «Social» e «Contatti» aprono un pannello sopra la barra, uno alla volta */
const pulsantiFoglio = $$<HTMLButtonElement>('[data-foglio-apri]')
const chiudiFogli = (tranne?: HTMLButtonElement) => {
  for (const b of pulsantiFoglio) {
    if (b === tranne) continue
    b.setAttribute('aria-expanded', 'false')
    const f = document.getElementById(b.getAttribute('aria-controls') || '')
    if (f) f.hidden = true
  }
}
for (const btn of pulsantiFoglio) {
  btn.addEventListener('click', () => {
    const foglio = document.getElementById(btn.getAttribute('aria-controls') || '')
    if (!foglio) return
    const apri = foglio.hidden
    chiudiFogli(btn)
    foglio.hidden = !apri
    btn.setAttribute('aria-expanded', String(apri))
    if (!apri) return
    // Un pannello alla volta: si chiude anche il menu a panino
    for (const testa of $$('[data-header].aperto')) {
      testa.classList.remove('aperto')
      testa.querySelector('[data-menu]')?.setAttribute('aria-expanded', 'false')
    }
    foglio.querySelector<HTMLElement>('a')?.focus({ preventScroll: true })
  })
}
document.addEventListener('click', (e) => {
  if (pulsantiFoglio.length && !(e.target as Element)?.closest?.('[data-barra-mobile]')) chiudiFogli()
})
for (const a of $$('[data-barra-mobile] [data-cerca-apri]')) a.addEventListener('click', () => chiudiFogli())

/* Esc chiude menu e tendine */
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return
  for (const voce of $$('[data-tendina].aperta')) {
    voce.classList.remove('aperta')
    voce.querySelector('[data-tendina-apri]')?.setAttribute('aria-expanded', 'false')
  }
  for (const b of pulsantiFoglio) {
    if (b.getAttribute('aria-expanded') === 'true') { chiudiFogli(); b.focus() }
  }
  for (const testa of $$('[data-header].aperto')) {
    testa.classList.remove('aperto')
    testa.querySelector('[data-menu]')?.setAttribute('aria-expanded', 'false')
  }
})

/* Slide della home: cambio ogni 7 secondi, punti, frecce */
for (const hero of $$('[data-hero]')) {
  const slide = $$('[data-slide]', hero)
  const punti = $$<HTMLButtonElement>('[data-vai]', hero)
  const conta = hero.querySelector('[data-conta]')
  let i = 0
  let timer: number | undefined
  const mostra = (n: number) => {
    i = (n + slide.length) % slide.length
    slide.forEach((s, k) => {
      s.classList.toggle('attiva', k === i)
      s.setAttribute('aria-hidden', String(k !== i))
    })
    punti.forEach((p, k) => p.setAttribute('aria-current', String(k === i)))
    if (conta) conta.textContent = String(i + 1).padStart(2, '0')
  }
  const ferma = () => window.clearInterval(timer)
  punti.forEach((p, k) => p.addEventListener('click', () => (ferma(), mostra(k))))
  hero.querySelector('[data-prec]')?.addEventListener('click', () => (ferma(), mostra(i - 1)))
  hero.querySelector('[data-succ]')?.addEventListener('click', () => (ferma(), mostra(i + 1)))
  if (slide.length > 1 && !riduciMovimento) timer = window.setInterval(() => !document.documentElement.classList.contains('in-modifica') && mostra(i + 1), 7000)
}

/* Caroselli orizzontali */
for (const frecce of $$('[data-frecce]')) {
  const rail = document.getElementById(frecce.dataset.frecce || '')
  if (!rail) continue
  $$<HTMLButtonElement>('button', frecce).forEach((b) =>
    b.addEventListener('click', () => {
      const dir = Number(b.dataset.dir || 1)
      rail.scrollBy({ left: dir * Math.min(rail.clientWidth * 0.8, 900), behavior: riduciMovimento ? 'auto' : 'smooth' })
    }),
  )
}

/*
 * Spazi fotografici: con più foto diventano uno slider (frecce, tastiera, trascinamento);
 * con data-lightbox le foto si aprono a tutto schermo. Markup in components/Img.astro.
 */
const FRECCIA = (dir: number) =>
  `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.4" d="${dir < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}"/></svg>`
const it = document.documentElement.lang.startsWith('it')
const PAROLE = it
  ? { prima: 'Foto precedente', dopo: 'Foto successiva', chiudi: 'Chiudi', apri: 'Apri la foto a tutto schermo', di: 'di', foto: 'Foto', galleria: 'Galleria a tutto schermo', pausa: 'Ferma lo scorrimento delle foto', avvia: 'Riprendi lo scorrimento delle foto' }
  : { prima: 'Previous photo', dopo: 'Next photo', chiudi: 'Close', apri: 'Open the photo full screen', di: 'of', foto: 'Photo', galleria: 'Full-screen gallery', pausa: 'Pause the photo slideshow', avvia: 'Resume the photo slideshow' }

/** Indirizzo della versione più grande dichiarata nel srcset della foto. */
function piuGrande(img: HTMLImageElement): string {
  const fonte = img.parentElement?.querySelector('source')?.getAttribute('srcset') || img.getAttribute('srcset') || ''
  const ultima = fonte.split(',').map((v) => v.trim().split(/\s+/)[0]).filter(Boolean).pop()
  return ultima || img.currentSrc || img.src
}

/*
 * Lightbox a tutto schermo: frecce, tastiera (← → Home Fine Esc), swipe col dito, dissolvenza
 * fra le foto, striscia di miniature che scorre e segue la foto aperta. La foto è la versione
 * più grande del srcset (AVIF). `alCambio` avvisa chi l'ha aperta (es. la galleria prodotto).
 */
let lightbox: HTMLDialogElement | null = null
let lbChiusura: (() => void) | null = null
function apriLightbox(foto: HTMLImageElement[], da: number, alCambio?: (k: number) => void) {
  if (!lightbox) {
    lightbox = document.createElement('dialog')
    lightbox.className = 'lightbox'
    lightbox.setAttribute('aria-label', PAROLE.galleria)
    lightbox.innerHTML = `
      <button type="button" class="lightbox__chiudi" aria-label="${PAROLE.chiudi}">×</button>
      <button type="button" class="lightbox__freccia lightbox__freccia--prima" aria-label="${PAROLE.prima}">${FRECCIA(-1)}</button>
      <figure class="lightbox__figura"><img alt="" decoding="async" /><figcaption aria-live="polite"></figcaption></figure>
      <button type="button" class="lightbox__freccia lightbox__freccia--dopo" aria-label="${PAROLE.dopo}">${FRECCIA(1)}</button>
      <div class="lightbox__miniature"></div>`
    document.body.append(lightbox)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || (e.target as HTMLElement).closest('.lightbox__chiudi')) lightbox!.close()
    })
    lightbox.addEventListener('close', () => {
      document.documentElement.classList.remove('lightbox-aperta')
      lbChiusura?.()
      lbChiusura = null
    })
  }
  const box = lightbox
  const figura = box.querySelector<HTMLElement>('.lightbox__figura')!
  const img = figura.querySelector('img')!
  const nota = box.querySelector('figcaption')!
  const frecce = $$<HTMLButtonElement>('.lightbox__freccia', box)
  const strip = box.querySelector<HTMLElement>('.lightbox__miniature')!
  const n = foto.length
  // Miniature: solo con più di una foto
  strip.hidden = n < 2
  strip.innerHTML = ''
  const mini = n < 2 ? [] : foto.map((f, j) => {
    const b = document.createElement('button')
    b.type = 'button'
    b.setAttribute('aria-label', `${PAROLE.foto} ${j + 1} ${PAROLE.di} ${n}`)
    const t = document.createElement('img')
    t.src = f.currentSrc || f.src
    t.alt = ''
    t.loading = 'lazy'
    t.decoding = 'async'
    b.append(t)
    b.onclick = () => mostra(j)
    strip.append(b)
    return b
  })
  let k = da
  const carica = (j: number) => {
    const x = new Image()
    x.decoding = 'async'
    x.src = piuGrande(foto[(j + n) % n])
  }
  function mostra(j: number) {
    const nuovo = (j + n) % n
    const cambia = nuovo !== k || !img.getAttribute('src')
    k = nuovo
    const vai = () => {
      img.src = piuGrande(foto[k])
      img.alt = foto[k].alt
      nota.textContent = n > 1 ? `${foto[k].alt}${foto[k].alt ? ' · ' : ''}${k + 1} ${PAROLE.di} ${n}` : foto[k].alt
      const vedi = () => img.classList.remove('lightbox__img--via')
      if (img.complete) requestAnimationFrame(vedi)
      else {
        img.addEventListener('load', vedi, { once: true })
        img.addEventListener('error', vedi, { once: true })
      }
    }
    if (cambia && !riduciMovimento && box.open) {
      img.classList.add('lightbox__img--via')
      window.setTimeout(vai, 160)
    } else vai()
    mini.forEach((b, i) => b.setAttribute('aria-current', String(i === k)))
    mini[k]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: riduciMovimento || !box.open ? 'auto' : 'smooth' })
    if (n > 1) { carica(k + 1); carica(k - 1) }
    alCambio?.(k)
  }
  frecce.forEach((f) => (f.hidden = n < 2))
  frecce[0].onclick = () => mostra(k - 1)
  frecce[1].onclick = () => mostra(k + 1)
  box.onkeydown = (e) => {
    if (e.key === 'ArrowLeft') mostra(k - 1)
    else if (e.key === 'ArrowRight') mostra(k + 1)
    else if (e.key === 'Home') mostra(0)
    else if (e.key === 'End') mostra(n - 1)
    else return
    e.preventDefault()
  }
  // Swipe col dito sulla foto
  let x0: number | null = null
  let y0 = 0
  figura.onpointerdown = (e) => {
    x0 = e.pointerType === 'mouse' ? null : e.clientX
    y0 = e.clientY
  }
  figura.onpointerup = (e) => {
    if (x0 !== null && n > 1 && Math.abs(e.clientX - x0) > 44 && Math.abs(e.clientX - x0) > Math.abs(e.clientY - y0)) mostra(k + (e.clientX < x0 ? 1 : -1))
    x0 = null
  }
  figura.onpointercancel = () => (x0 = null)
  img.removeAttribute('src')
  k = -1
  mostra(da)
  document.documentElement.classList.add('lightbox-aperta')
  box.showModal()
  return (fn: () => void) => (lbChiusura = fn)
}

for (const prima of $$<HTMLElement>('picture[data-spazio]')) {
  const cornice = prima.parentElement
  const principale = prima.querySelector('img')
  if (!cornice || !principale) continue
  const foto = [principale, ...$$<HTMLImageElement>(':scope > .im--altra > img', cornice)]
  let k = 0
  if (foto.length > 1) {
    cornice.classList.add('spazio')
    if (getComputedStyle(cornice).position === 'static') cornice.classList.add('spazio--relativo')
    const comandi = document.createElement('div')
    comandi.className = 'spazio__comandi'
    comandi.innerHTML = `
      <button type="button" data-verso="-1" aria-label="${PAROLE.prima}">${FRECCIA(-1)}</button>
      <span class="spazio__conto" aria-live="polite"></span>
      <button type="button" data-verso="1" aria-label="${PAROLE.dopo}">${FRECCIA(1)}</button>`
    cornice.append(comandi)
    const conto = comandi.querySelector('.spazio__conto')!
    const mostra = (n: number) => {
      k = (n + foto.length) % foto.length
      foto.forEach((f, j) => f.classList.toggle('spazio-attiva', j === k))
      principale.classList.toggle('spazio-sotto', k !== 0)
      conto.textContent = `${k + 1} / ${foto.length}`
      cornice.dataset.spazioIndice = String(k)
    }
    comandi.addEventListener('click', (e) => {
      const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-verso]')
      if (!b) return
      e.preventDefault()
      e.stopPropagation()
      mostra(k + Number(b.dataset.verso))
    })
    // Trascinamento col dito
    let x0: number | null = null
    cornice.addEventListener('pointerdown', (e) => (x0 = e.pointerType === 'touch' ? e.clientX : null))
    cornice.addEventListener('pointerup', (e) => {
      if (x0 !== null && Math.abs(e.clientX - x0) > 44) mostra(k + (e.clientX < x0 ? 1 : -1))
      x0 = null
    })
    mostra(0)
  }
  if (prima.hasAttribute('data-lightbox')) {
    cornice.classList.add('spazio--lightbox')
    cornice.addEventListener('click', (e) => {
      const el = e.target as HTMLElement
      if (document.documentElement.classList.contains('in-modifica') || el.closest('.spazio__comandi')) return
      if (!(el instanceof HTMLImageElement) || !foto.includes(el)) return
      e.preventDefault()
      apriLightbox(foto, k)
    })
  }
}

/*
 * Galleria della scheda prodotto (SchedaProdotto.astro 1.02): foto in evidenza a dissolvenza,
 * cambio automatico ogni data-intervallo ms (fermo con «riduci movimento», mentre il puntatore
 * o il fuoco sono sulla galleria, a pagina nascosta, in modifica o col pulsante pausa),
 * frecce, miniature che scorrono, swipe, tastiera; clic sulla foto o sulla lente = lightbox.
 */
for (const gal of $$('[data-galleria]')) {
  const palco = gal.querySelector<HTMLElement>('[data-palco]')
  const foto = $$<HTMLImageElement>('img[data-vista]', gal)
  const mini = $$<HTMLButtonElement>('[data-mini]', gal)
  const conto = gal.querySelector('[data-conto]')
  const pausa = gal.querySelector<HTMLButtonElement>('[data-pausa]')
  const colore = gal.querySelector<HTMLElement>('[data-colore-attivo]')
  const n = foto.length
  if (!palco || !n) continue
  let k = 0
  let timer = 0
  let fermo = riduciMovimento // fermato da chi visita (pulsante) o dalle preferenze
  let sopra = false
  let inLightbox = false
  const mostra = (j: number) => {
    k = (j + n) % n
    foto.forEach((f, i) => {
      f.classList.toggle('attiva', i === k)
      if (i === k) f.removeAttribute('aria-hidden')
      else f.setAttribute('aria-hidden', 'true')
    })
    mini.forEach((b, i) => b.setAttribute('aria-current', String(i === k)))
    const m = mini[k]
    const riga = m?.parentElement
    if (m && riga && riga.scrollWidth > riga.clientWidth) {
      riga.scrollTo({ left: m.offsetLeft - (riga.clientWidth - m.offsetWidth) / 2, behavior: riduciMovimento ? 'auto' : 'smooth' })
    }
    if (conto) conto.textContent = `${k + 1} / ${n}`
    // Nome del colore e codice della foto visibile (Scheda prodotto 1.03)
    if (colore) {
      const [nome = '', codice = ''] = (foto[k].dataset.colore || '').split(' · ')
      colore.hidden = !nome
      colore.innerHTML = ''
      if (nome) {
        const a = document.createElement('span')
        a.className = 'galleria__colore-nome'
        a.textContent = nome
        const b = document.createElement('span')
        b.className = 'galleria__colore-codice'
        b.textContent = codice
        colore.append(a, ' ', b)
      }
    }
  }
  const ferma = () => window.clearInterval(timer)
  const avvia = () => {
    ferma()
    if (n < 2 || fermo || sopra || inLightbox || document.hidden) return
    timer = window.setInterval(() => {
      if (!document.documentElement.classList.contains('in-modifica')) mostra(k + 1)
    }, Number(gal.dataset.intervallo) || 5000)
  }
  const vai = (j: number) => {
    mostra(j)
    avvia() // riparte il conto dopo un cambio a mano
  }
  mini.forEach((m, j) => m.addEventListener('click', () => vai(j)))
  gal.addEventListener('click', (e) => {
    const b = (e.target as HTMLElement).closest<HTMLButtonElement>('button[data-verso]')
    if (b) vai(k + Number(b.dataset.verso))
  })
  if (pausa && n > 1 && !riduciMovimento) {
    pausa.hidden = false
    const aggiorna = () => {
      pausa.setAttribute('aria-pressed', String(fermo))
      pausa.setAttribute('aria-label', fermo ? PAROLE.avvia : PAROLE.pausa)
      pausa.classList.toggle('ferma', fermo)
    }
    pausa.addEventListener('click', () => {
      fermo = !fermo
      aggiorna()
      avvia()
    })
    aggiorna()
  }
  // Tastiera: frecce quando il fuoco è dentro la galleria
  gal.addEventListener('keydown', (e) => {
    if (n < 2 || (e.target as HTMLElement).closest('dialog')) return
    if (e.key === 'ArrowLeft') vai(k - 1)
    else if (e.key === 'ArrowRight') vai(k + 1)
    else return
    e.preventDefault()
  })
  // Pausa mentre il visitatore guarda o usa la galleria
  gal.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { sopra = true; ferma() } })
  gal.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') { sopra = false; avvia() } })
  gal.addEventListener('focusin', () => { sopra = true; ferma() })
  gal.addEventListener('focusout', (e) => {
    if (!gal.contains(e.relatedTarget as Node)) { sopra = false; avvia() }
  })
  document.addEventListener('visibilitychange', avvia)
  // Swipe col dito sulla foto in evidenza
  let x0: number | null = null
  let y0 = 0
  palco.addEventListener('pointerdown', (e) => {
    x0 = e.pointerType === 'mouse' ? null : e.clientX
    y0 = e.clientY
  })
  palco.addEventListener('pointerup', (e) => {
    if (x0 === null || n < 2) return
    const dx = e.clientX - x0
    if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(e.clientY - y0)) {
      palco.dataset.swipe = String(Date.now()) // l'eventuale clic subito dopo non apre la lightbox
      vai(k + (dx < 0 ? 1 : -1))
    }
    x0 = null
  })
  palco.addEventListener('pointercancel', () => (x0 = null))
  // Lightbox: tutte le foto della scheda (viste, disegno, ambientazioni) a partire da quella visibile
  const apri = () => {
    if (document.documentElement.classList.contains('in-modifica')) return
    const tutte = gruppoLightbox('prodotto')
    const i = Math.max(0, tutte.indexOf(foto[k]))
    inLightbox = true
    ferma()
    const chiusa = apriLightbox(tutte, i, (j) => {
      const q = foto.indexOf(tutte[j])
      if (q >= 0 && q !== k) mostra(q)
    })
    chiusa(() => {
      inLightbox = false
      avvia()
    })
  }
  palco.addEventListener('click', (e) => {
    const el = e.target as HTMLElement
    const sw = Number(palco.dataset.swipe || 0)
    delete palco.dataset.swipe
    if (Date.now() - sw < 400) return
    if (el.closest('.galleria__comandi')) return
    if (el.closest('[data-zoom]') || el instanceof HTMLImageElement) apri()
  })
  mostra(0)
  avvia()
}

/** Foto di un gruppo lightbox (attributo data-lb), nell'ordine della pagina; senza segnaposto. */
function gruppoLightbox(nome: string): HTMLImageElement[] {
  return $$<HTMLImageElement>(`img[data-lb="${CSS.escape(nome)}"]`)
}

/* Altre foto di un gruppo (disegno, ambientazioni): clic = lightbox con tutto il gruppo.
   Se la foto è già uno spazio con la sua lightbox (pannello), decide lo spazio. */
document.addEventListener('click', (e) => {
  const el = e.target
  if (!(el instanceof HTMLImageElement) || !el.dataset.lb || el.hasAttribute('data-vista')) return
  if (document.documentElement.classList.contains('in-modifica') || el.closest('.spazio--lightbox')) return
  const tutte = gruppoLightbox(el.dataset.lb)
  e.preventDefault()
  apriLightbox(tutte, Math.max(0, tutte.indexOf(el)))
})

/* Video della home v3: play / pausa */
for (const btn of $$<HTMLButtonElement>('[data-play]')) {
  const video = document.getElementById(btn.dataset.play || '') as HTMLVideoElement | null
  if (!video) continue
  if (riduciMovimento) video.pause()
  const aggiorna = () => {
    btn.textContent = video.paused ? '▶' : '❙❙'
    btn.setAttribute('aria-pressed', String(!video.paused))
  }
  btn.addEventListener('click', () => (video.paused ? video.play() : video.pause()))
  video.addEventListener('play', aggiorna)
  video.addEventListener('pause', aggiorna)
  aggiorna()
}

/* Comparsa allo scorrimento */
if (document.documentElement.classList.contains('js-rivela')) {
  const els = $$('[data-reveal]')
  const vedi = (el: Element) => el.classList.add('visto')
  if (!('IntersectionObserver' in window)) els.forEach(vedi)
  else {
    const io = new IntersectionObserver(
      (voci) =>
        voci.forEach((v) => {
          if (v.isIntersecting || v.boundingClientRect.bottom < 0) {
            vedi(v.target)
            io.unobserve(v.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.9) vedi(el)
      else io.observe(el)
    })
    // Salto con ancora (#luoghi): mostra subito ciò che è già sopra
    window.addEventListener('hashchange', () =>
      els.forEach((el) => el.getBoundingClientRect().top < window.innerHeight && vedi(el)),
    )
  }
}

/* reCAPTCHA (Impostazioni > Sicurezza e tracciamento): lo script di Google si carica solo
   quando il visitatore inizia a usare un modulo, non a ogni pagina. */
type Grecaptcha = {
  ready(fn: () => void): void
  execute(chiave: string, o: { action: string }): Promise<string>
  render(el: HTMLElement, o: { sitekey: string }): number
  getResponse(id?: number): string
  reset(id?: number): void
}
const metaRc = document.querySelector<HTMLMetaElement>('meta[name="recaptcha"]')
const rc = metaRc ? { chiave: metaRc.content, tipo: metaRc.dataset.tipo === 'v2' ? 'v2' : 'v3', lingua: metaRc.dataset.lingua || 'it' } : null
let rcPronto: Promise<Grecaptcha> | null = null
const caricaRecaptcha = (): Promise<Grecaptcha> | null => {
  if (!rc) return null
  if (!rcPronto) {
    rcPronto = new Promise((ok, ko) => {
      const nome = `rcPronto${Date.now()}`
      ;(window as unknown as Record<string, () => void>)[nome] = () => {
        const g = (window as unknown as { grecaptcha: Grecaptcha }).grecaptcha
        g.ready(() => ok(g))
      }
      const s = document.createElement('script')
      const render = rc.tipo === 'v3' ? encodeURIComponent(rc.chiave) : 'explicit'
      s.src = `https://www.google.com/recaptcha/api.js?render=${render}&onload=${nome}&hl=${rc.lingua}`
      s.async = true
      s.onerror = () => ko(new Error('reCAPTCHA non raggiungibile'))
      document.head.appendChild(s)
    })
  }
  return rcPronto
}
const widget = new WeakMap<HTMLElement, number>()
async function preparaRecaptcha(form: HTMLFormElement) {
  const p = caricaRecaptcha()
  if (!p || rc?.tipo !== 'v2') return
  const box = form.querySelector<HTMLElement>('[data-recaptcha-v2]')
  if (!box || widget.has(box)) return
  const g = await p
  if (!widget.has(box)) widget.set(box, g.render(box, { sitekey: rc.chiave }))
}
/** Token da allegare all'invio: v3 si chiede ora, v2 è la casella spuntata. */
async function tokenRecaptcha(form: HTMLFormElement, azione: string): Promise<string> {
  const p = caricaRecaptcha()
  if (!p || !rc) return ''
  const g = await p
  if (rc.tipo === 'v3') return g.execute(rc.chiave, { action: azione })
  const box = form.querySelector<HTMLElement>('[data-recaptcha-v2]')
  const id = box ? widget.get(box) : undefined
  return id === undefined ? '' : g.getResponse(id)
}
const azzeraRecaptcha = (form: HTMLFormElement) => {
  const box = form.querySelector<HTMLElement>('[data-recaptcha-v2]')
  const id = box ? widget.get(box) : undefined
  if (id !== undefined) rcPronto?.then((g) => g.reset(id))
}
const testoRc = document.documentElement.lang === 'en'
  ? 'Please tick the “I’m not a robot” box'
  : 'Spuntate la casella «Non sono un robot»'

/** Invio dei moduli (richieste e newsletter): JSON, messaggi in pagina, conversione. */
function gestisci(form: HTMLFormElement, esito: HTMLElement | null, dopo: (dati: Record<string, unknown>) => void) {
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  const azione = form.dataset.azione || 'richiesta'
  const prepara = () => void preparaRecaptcha(form).catch(() => {})
  form.addEventListener('focusin', prepara, { once: true })
  form.addEventListener('pointerenter', prepara, { once: true })
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!form.reportValidity()) return
    if (btn) btn.disabled = true
    if (esito) {
      esito.dataset.tipo = ''
      esito.textContent = form.dataset.invio || 'Invio in corso…'
    }
    try {
      const corpo = new FormData(form)
      const token = await tokenRecaptcha(form, azione).catch(() => '')
      if (rc?.tipo === 'v2' && !token) throw new Error(testoRc)
      if (token) corpo.set('recaptcha', token)
      corpo.delete('g-recaptcha-response')
      const res = await fetch(form.action, { method: 'POST', body: corpo, headers: { Accept: 'application/json' } })
      const dati = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(dati.errore || form.dataset.errore || 'Invio non riuscito')
      window.dispatchEvent(new CustomEvent('serralunga:lead', { detail: { tipo: azione } }))
      dopo(dati)
      form.reset()
      azzeraRecaptcha(form)
    } catch (err) {
      azzeraRecaptcha(form)
      if (esito) {
        esito.dataset.tipo = 'errore'
        const messaggio = (err as Error).message.replace(/\.$/, '')
        esito.textContent = form.dataset.email
          ? `${messaggio}. ${form.dataset.anche || 'Potete scriverci anche a'} ${form.dataset.email}.`
          : `${messaggio}.`
      }
    } finally {
      if (btn) btn.disabled = false
    }
  })
}

/* Modulo richieste */
for (const form of $$<HTMLFormElement>('form[data-richiesta]')) {
  const esito = form.querySelector<HTMLElement>('[data-esito]')
  gestisci(form, esito, () => {
    // Cataloghi (Contract > Cataloghi): dopo l'invio compaiono i link dei PDF scelti.
    const scaricamenti = form.querySelector<HTMLElement>('[data-scaricamenti]')
    if (scaricamenti) {
      const scelti = new Set($$<HTMLInputElement>('input[data-catalogo]', form).filter((i) => i.checked).map((i) => i.dataset.catalogo))
      for (const li of $$<HTMLElement>('[data-scarica]', scaricamenti)) li.hidden = !scelti.has(li.dataset.scarica)
      scaricamenti.hidden = false
    }
    if (esito) esito.textContent = form.dataset.grazie || 'Grazie, vi ricontatteremo a breve.'
  })
}

/* Newsletter: finestra aperta dal footer e pagina /newsletter/ */
for (const form of $$<HTMLFormElement>('form[data-newsletter]')) {
  const box = form.closest<HTMLElement>('[data-nl]')
  const esito = box?.querySelector<HTMLElement>('[data-esito]') || null
  gestisci(form, esito, (dati) => {
    if (esito) esito.textContent = dati.gia ? form.dataset.gia || '' : form.dataset.grazie || ''
    box?.classList.add('nl--fatto')
  })
}
const finestraNl = document.querySelector<HTMLDialogElement>('[data-finestra-newsletter]')
if (finestraNl && typeof finestraNl.showModal === 'function') {
  let origine: HTMLElement | null = null
  for (const a of $$<HTMLAnchorElement>('[data-apri-newsletter]')) {
    a.addEventListener('click', (e) => {
      e.preventDefault()
      origine = a
      finestraNl.querySelector('[data-nl]')?.classList.remove('nl--fatto')
      const esito = finestraNl.querySelector<HTMLElement>('[data-esito]')
      if (esito) esito.textContent = ''
      finestraNl.showModal()
      finestraNl.querySelector<HTMLInputElement>('input[name="nome"]')?.focus()
      void preparaRecaptcha(finestraNl.querySelector('form')!).catch(() => {})
    })
  }
  finestraNl.querySelector('[data-chiudi]')?.addEventListener('click', () => finestraNl.close())
  // Clic fuori dal riquadro: chiude.
  finestraNl.addEventListener('click', (e) => {
    if (e.target === finestraNl) finestraNl.close()
  })
  finestraNl.addEventListener('close', () => origine?.focus())
}

/* Modifica dalla pagina: lo strumento si carica solo per chi ha fatto l'accesso al pannello. */
if (document.documentElement.hasAttribute('data-redazione')) void import('./modifica')

/* Home: filtro delle installazioni per categoria */
for (const gruppo of $$<HTMLElement>('[data-filtri]')) {
  const bottoni = Array.from(gruppo.querySelectorAll<HTMLButtonElement>('[data-filtro]'))
  const voci = $$<HTMLElement>('[data-cat]')
  for (const b of bottoni) {
    b.addEventListener('click', () => {
      const cat = b.dataset.filtro || 'all'
      bottoni.forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
      voci.forEach((v) => (v.hidden = cat !== 'all' && v.dataset.cat !== cat))
    })
  }
}
