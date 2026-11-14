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
