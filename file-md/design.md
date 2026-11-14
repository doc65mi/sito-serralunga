# design.md — aspetto del sito Serralunga

Version: 1.01
Data: 2026-11-14
Ambito: token, tipografia, componenti e ricette di pagina. Fonte grafica: i template in `template/` (Home v2 è il riferimento; v3 per l'apertura video). Codice: `web/src/styles/site.css` (unico foglio di stile).
Regola: se questo file e `site.css` non coincidono, vale il template; poi si aggiornano entrambi.

---

## 1. Principi

- Editoriale, sobrio, molto spazio bianco: le foto dei luoghi parlano, il testo accompagna.
- Due fondi alternati: carta chiara (`--paper`) e notte (`--ink` / `--night`). L'oro (`--accent`) solo per accenti: kicker, parole in corsivo, linee sottili.
- **Nessuno stile nelle pagine.** Ogni valore passa da un token o da una classe di `site.css`. Unica eccezione: proprietà CSS personalizzate inline quando il valore viene dal CMS (`--accent` dalle impostazioni, `--fuoco` punto di fuoco della foto, colore campione `--c`).

## 2. Token

| Token | Valore | Uso |
|---|---|---|
| `--accent` | #A08A5F | oro: kicker, `_corsivo_`, linee (modificabile in Impostazioni) |
| `--ink` | #16150F | testo e fasce scure |
| `--night` | #0E0D0A | banner, invito, footer |
| `--paper` | #F3F0EA | fondo base |
| `--paper-2` | #FBFAF8 | portfolio, prodotti correlati |
| `--sand` / `--sand-2` / `--sand-3` | #E4DFD5 / #E7E2D8 / #EEEAE2 | fondo dietro le foto, strisce dei segnaposto |
| `--text-strong` / `--text` / `--muted` | #3E3B34 / #5F5B52 / #8A8478 | paragrafi forti, paragrafi, didascalie |
| `--on-dark` / `--on-dark-muted` | #F3F0EA / #9A9488 | testo su scuro |
| `--wrap` | 1560px | larghezza massima del contenuto |
| `--gut` | 48px (20px sotto 800px) | margine laterale |
| `--sec` / `--sec-int` | clamp(110–180px) / clamp(90–150px) | spazio verticale sezioni home / interne |

Breakpoint: 1100, 900, 800, 560px. `prefers-reduced-motion` spegne Ken Burns, slider automatico e comparsa allo scorrimento.

## 3. Tipografia

- **Cormorant Garamond** (300/400, corsivo) per titoli e citazioni; **Jost** (300/400/500) per testo, kicker, pulsanti. Caricati in locale con `@fontsource` (niente Google Fonts esterni, per il GDPR).
- Classi titolo: `titolo--display` (H1 pagine interne), `titolo--xl`, `titolo--l`, `titolo--m`, `titolo--cta`, `titolo--contatto`.
- `kicker`: Jost maiuscolo, spaziato, oro; `kicker--largo` più spaziato, `kicker--chiaro` su foto.
- Testo dal CMS: a capo = `<br>`, `_parola_` = corsivo oro (`em.acc`). Componente `Testo.astro`.

## 4. Componenti

| Componente | Classi | Note |
|---|---|---|
| Header | `.header`, `.nav`, `.menu-apri` | trasparente sulla foto, pieno allo scorrimento; voce "evidenza" come pulsante |
| Apertura a slide | `.hero`, `.hero__slide`, `.hero__box` (424px), `.hero__punti` | 7 s per slide, H1 nascosto alla vista |
| Apertura video | `.hero-video`, `.btn-play` | mp4 muto in loop + poster |
| Capitolo foto+testo | `.capitolo`, `.capitolo--inverso`, `.numero-romano` | alterna i lati |
| Banner a tutto schermo | `.banner`, `.banner-frase`, `.velo--*` | foto con velo scuro |
| Card prodotto | `.card`, `.card__piede`, `.card__nome`, `.card__sotto` | in `.rail` con `.frecce` |
| Card designer / case | `.card-designer`, `.card-case` | `--vuota` = segnaposto |
| Foto | `.foto` + rapporto `.r-11 .r-34 .r-43 .r-45 .r-169 .r-219` | `.zoom` al passaggio, `.kb` Ken Burns |
| Segnaposto | `.segnaposto`, `.nota-mono` | strisce sand + nota "da fornire": mai foto inventate |
| Pulsanti | `.btn--scuro .btn--chiaro .btn--bordo .btn--bordo-chiaro .btn--bordo-pieno`, `.link-freccia` | |
| Dati | `.cifre`, `.numeri-riga`, `.scheda-righe`, `.dati`, `.specifiche` | |
| Modulo | `.modulo`, `.modulo__trappola` (honeypot), `.modulo__esito` | |
| Footer | `.footer`, `.footer--breve` | breve nelle case history |

## 5. Ricette di pagina

- **Home** (template "Hero fullscreen"): barra scura + testata → immagine a tutto schermo con video facoltativo → tre ambiti (01–03) → Chi siamo → numeri → Installazioni con filtri → Le collezioni (4 tessere) → Serralunga Contract (servizi) → Catalogo e listino con modulo → footer a quattro colonne. Classi `hf-*`, fondo #F5F3EF, margine 40px.
- **Prodotto** (Aqua Lounger): galleria + info (colori, misure, pulsante) → specifiche → disegno tecnico → ambiente → firma del progetto → case history → correlati → richiesta.
- **Case history** (La Loge): apertura Ken Burns → progetto + scheda → citazione su foto → tre passi → coppia di immagini → protagonista (scuro) → diario (rail mini) → prodotti usati → contatto (notte).
- **Designer**: intro → griglia card. **Scheda designer**: bio con ritratto → banner frase → pezzi (rail) → CTA scura.

## 6. Accessibilità

Un solo H1 per pagina; `alt` obbligatorio nelle foto del CMS; link "salta al contenuto"; rail scorrevoli da tastiera (`tabindex="0"`); contrasto testo su foto garantito dai veli; nessuno scorrimento orizzontale a 390px.
