/**
 * site.ts — comportamenti condivisi (Version: 1.00)
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
  header?.querySelectorAll('.nav a').forEach((a) =>
    a.addEventListener('click', () => {
      header.classList.remove('aperto')
      btn.setAttribute('aria-expanded', 'false')
    }),
  )
}

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
  ? { prima: 'Foto precedente', dopo: 'Foto successiva', chiudi: 'Chiudi', apri: 'Apri la foto a tutto schermo', di: 'di' }
  : { prima: 'Previous photo', dopo: 'Next photo', chiudi: 'Close', apri: 'Open the photo full screen', di: 'of' }

/** Indirizzo della versione più grande dichiarata nel srcset della foto. */
function piuGrande(img: HTMLImageElement): string {
  const fonte = img.parentElement?.querySelector('source')?.getAttribute('srcset') || img.getAttribute('srcset') || ''
  const ultima = fonte.split(',').map((v) => v.trim().split(/\s+/)[0]).filter(Boolean).pop()
  return ultima || img.currentSrc || img.src
}

let lightbox: HTMLDialogElement | null = null
function apriLightbox(foto: HTMLImageElement[], da: number) {
  if (!lightbox) {
    lightbox = document.createElement('dialog')
    lightbox.className = 'lightbox'
    lightbox.innerHTML = `
      <button type="button" class="lightbox__chiudi" aria-label="${PAROLE.chiudi}">×</button>
      <button type="button" class="lightbox__freccia lightbox__freccia--prima" aria-label="${PAROLE.prima}">${FRECCIA(-1)}</button>
      <figure class="lightbox__figura"><img alt="" /><figcaption></figcaption></figure>
      <button type="button" class="lightbox__freccia lightbox__freccia--dopo" aria-label="${PAROLE.dopo}">${FRECCIA(1)}</button>`
    document.body.append(lightbox)
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || (e.target as HTMLElement).closest('.lightbox__chiudi')) lightbox!.close()
    })
  }
  const box = lightbox
  const img = box.querySelector('img')!
  const nota = box.querySelector('figcaption')!
  const frecce = $$<HTMLButtonElement>('.lightbox__freccia', box)
  let k = da
  const mostra = (n: number) => {
    k = (n + foto.length) % foto.length
    img.src = piuGrande(foto[k])
    img.alt = foto[k].alt
    nota.textContent = foto.length > 1 ? `${foto[k].alt}${foto[k].alt ? ' · ' : ''}${k + 1} ${PAROLE.di} ${foto.length}` : foto[k].alt
  }
  frecce.forEach((f) => (f.hidden = foto.length < 2))
  frecce[0].onclick = () => mostra(k - 1)
  frecce[1].onclick = () => mostra(k + 1)
  box.onkeydown = (e) => {
    if (e.key === 'ArrowLeft') mostra(k - 1)
    if (e.key === 'ArrowRight') mostra(k + 1)
  }
  mostra(da)
  box.showModal()
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

/* Galleria della scheda prodotto */
for (const gal of $$('[data-galleria]')) {
  const foto = $$('[data-vista]', gal)
  const mini = $$<HTMLButtonElement>('[data-mini]', gal)
  mini.forEach((m, k) =>
    m.addEventListener('click', () => {
      foto.forEach((f, j) => f.classList.toggle('attiva', j === k))
      mini.forEach((b, j) => b.setAttribute('aria-current', String(j === k)))
    }),
  )
}

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

/* Modulo richieste */
for (const form of $$<HTMLFormElement>('form[data-richiesta]')) {
  const esito = form.querySelector<HTMLElement>('[data-esito]')
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]')
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!form.reportValidity()) return
    if (btn) btn.disabled = true
    if (esito) {
      esito.dataset.tipo = ''
      esito.textContent = form.dataset.invio || 'Invio in corso…'
    }
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
      const dati = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(dati.errore || form.dataset.errore || 'Invio non riuscito')
      form.reset()
      if (esito) esito.textContent = form.dataset.grazie || 'Grazie, vi ricontatteremo a breve.'
    } catch (err) {
      if (esito) {
        esito.dataset.tipo = 'errore'
        esito.textContent = `${(err as Error).message}. ${form.dataset.anche || 'Potete scriverci anche a'} ${form.dataset.email || 'info@serralunga.com'}.`
      }
    } finally {
      if (btn) btn.disabled = false
    }
  })
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
