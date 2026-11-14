# struttura.md — struttura del sito PcFrog

Version: 1.28
Data: 2026-11-12
Ambito: raccoglie in un solo posto le regole di struttura del sito: cartelle, pagine, schema dei file, layout e larghezze, ricetta della home, collegamento con WordPress.
Fonti: `editing.md` (sezioni 1–5, 8, 10), `design.md` (sezioni 1–3, Specifiche PcFrog), `cliente.md` (sezione 5), `README.md`.
Regola: se questo file e un altro `.md` non coincidono, valgono `editing.md` per il contratto dell'editor, `design.md` per l'aspetto e `cliente.md` per URL e fatti. Questo file va aggiornato insieme a loro.

---

## 1. Cartelle del progetto

Repository `doc65mi/sito-pcfrog` (branch `main`), copia locale `C:\laragon\www\sito-Pcfrog`.

| Cartella | Contenuto |
|---|---|
| `file-md/` | regole: `struttura.md` (questo file), `editing.md`, `design.md`, `seo.md`, `cliente.md`; storico in `file-md/storico/` |
| `pagine/` | `{slug}.html` documento completo (fonte unica) e `{slug}-wordpress.html` versione WordPress generata |
| `anteprime/` | `{slug}.html` anteprima generata: solo il body della pagina, senza header e footer del tema |
| `assets/` | `css/site.css` e `js/site.js`, **unici per tutte le pagine**; `img/` solo per file del sito (niente png di pagine) |
| `tools/` | `build.py` (genera versione WordPress e anteprima), `check.py` (controlli), `progetto.json` (origine, release, cartelle) |
| `tema/` | `functions-snippet.php` per caricare gli asset dal tema child (alternativa a "Caricali dal plugin") |
| `distribuzione/`, `oltre-editable-media-v2/` | plugin Oltre Editable Media (zip e sorgente), condiviso con altri siti |
| `template/` | template di partenza (PcFrog Home v5) e mockup |

## 2. Pagine: due versioni sempre

| File | Cosa contiene | Chi lo scrive |
|---|---|---|
| `pagine/{slug}.html` | documento completo: head (title, description, JSON-LD), `<main>`, script condiviso | a mano |
| `pagine/{slug}-wordpress.html` | solo `<main data-om-page="{slug}" data-om-spec="1.00">`, niente head né script, URL relativi alla radice | `tools/build.py` |
| `anteprime/{slug}.html` | solo il body della pagina con CSS e JS condivisi, link puntati all'origine | `tools/build.py` |

Flusso: scrivere `pagine/{slug}.html` → `python3 tools/build.py {slug}` → `python3 tools/check.py {slug}` (zero errori) → salvare in locale e su GitHub. Le versioni generate non si modificano mai a mano.

Header, footer, barra grigia e ticker sono del tema WordPress e non fanno parte delle pagine.

## 3. Schema di una pagina

- Un solo `<main class="pf-main" data-om-page="{slug}" data-om-spec="1.00">`; `data-om-spec` attiva il CSS condiviso.
- Un solo `<h1>`; ogni riquadro ha un `<h2>`.
- Sezioni: `<section data-om-section="{slug}-{sezione}" data-om-label="Nome leggibile" id="{slug}-{sezione}">`.
- Elementi modificabili: `editable-text`, `editable-photo` (un solo `img`), `editable-button` (testo in `<span class="om-label btn-label">`), `editable-video`; ID `{slug}-{sezione}-{elemento}`, mai rinominati dopo la pubblicazione.
- Ripetuti (recensioni, slide): `data-om-item` e `<template data-om-item-template>` finale.
- Nessuno stile inline, nessun `<style>` o script di pagina, nessuna libreria esterna.
- Marcatori per `build.py`: `data-preview-only` (solo anteprima) e `<!-- wp-fragment: … -->` (solo WordPress).

Dettagli completi: `editing.md` sezioni 3–8.

## 4. Larghezza e responsive

**Tutte le pagine sono larghe al massimo 1280px** (riquadri, margini esclusi; regola di `design.md`, dal 2026-11-12 al posto di 1720px). Sulle finestre più larghe i riquadri restano a 1280px e centrati (lo sfondo sfumato continua a tutta finestra); sotto la pagina è fluida, con margini laterali che si adattano.

| Token | Valore | Comportamento |
|---|---|---|
| `--pf-wrap` | 1280px | larghezza massima del contenuto di `.pf-main` (margini esclusi) |
| `--pf-gut` | `clamp(12px, 2.2vw, 48px)` | margine laterale: 12px su telefono, 28px a 1280, 42px a 1920 |
| `--pf-gap` | `clamp(14px, 1.4vw, 28px)` | spazio tra i riquadri |
| `--pf-in` | `clamp(20px, 2.6vw, 56px)` | padding interno dei riquadri |
| `--pf-banner-h` | `376px`; auto ≤900 | altezza (minima) unica dei 3 banner principali: assemblaggio, workstation, negozio |
| `--pf-slides-h` | `376px`; 480px ≤600 | altezza del banner eventi (slide) |
| Titoli e testi | font e misure solo in `design.md` "Tipografia" | H1 50px, H2 25px fissi a ogni larghezza |

I valori crescono con la finestra tra un minimo e un massimo; i breakpoint servono solo a cambiare il numero di colonne:

| Finestra | Colonne |
|---|---|
| ≥ 1600px | come desktop (pagina sempre larga 1280px) |
| ≤ 1279px | prodotti, categorie e info su 2 colonne; recensioni 2 per volta |
| ≤ 900px | banner su una colonna: foto sopra, testo sotto |
| ≤ 600px | info e footer su 1 colonna; recensioni 1 per volta |

Verifica: anteprima a 390, 1000, 1280, 1920 e 2560px, senza scorrimento orizzontale.

## 5. Ricetta della home

1. Hero con slide — `home-pronta`: slide 1 Pc pronta consegna (H1), slide 2–6 pronte da attivare; numero di slide, avvio e scadenza dal pannello (dal 2026-11-12, richiesta del cliente)
2. 4 pc pronta consegna (WooCommerce, categoria `pc-pronta-consegna`) — `home-pronti`
3. Categorie prodotto (immagine, nome, pulsante; categorie scelte dal pannello) — `home-cat` (aggiunta il 2026-11-12, richiesta del cliente)
4. Scelte del momento: riquadro con H2, testo e loghi dei pagamenti agevolati (PagoDIL, Carta del Docente, Klarna), loghi dei marchi (MSI, Mad Catz, Asus, Nvidia) e tre garanzie con icona (spedizione, garanzia, pagamento sicuro) — `home-scelte` (aggiunta il 2026-11-12, richiesta del cliente)
5. Banner Pc in pochi giorni — `home-giorni`
6. Recensioni con nome e foto — `home-recensioni` (spostate qui il 2026-11-12, richiesta del cliente)
7. Barra promo — `home-promo-barra`
8. 4 prodotti in promozione (categoria `promo-nvidia`) — `home-offerte`
9. Banner Workstation con video — `home-workstation`
10. Slide eventi/blog — `home-slide` (spostate prima del blog il 2026-11-12, richiesta del cliente)
11. Loop "Dal nostro blog": 4 articoli della categoria `blog`, oppure prodotti scelti dal pannello — `home-ws` (al posto dei riquadri categoria dal 2026-11-12, richiesta del cliente)
12. Banner Il nostro negozio — `home-negozio`
13. Info negozio (indirizzo, orari, telefono, mappa) — `home-info`

L'ordine qui sopra è quello del file: dal 2026-11-12 l'editor può cambiarlo, nascondere sezioni o attaccarle a quella sopra (senza spazio) dal pannello "Ordina sezioni" (plugin 2.12/2.14, regola in `editing.md`); con un ordine salvato da GitHub conta solo quali sezioni ci sono, non la loro posizione.

La hero (1) e i banner principali (5, 9) hanno la stessa misura e la stessa struttura; l'altezza della hero cambia solo se l'editor la imposta nel pannello.

## 6. Loop: prodotti, categorie prodotto o articoli del blog (blocchi, mai shortcode)

**Regola del cliente (2026-11-12):** ogni loop, di oggi e futuro e in qualsiasi pagina, può mostrare prodotti, categorie prodotto oppure articoli del blog, e la scelta si fa dal frontend. Nelle pagine si mette sempre il segnaposto, con un `id` `{slug}-{sezione}-prodotti`:

```html
<!-- prodotti (predefinito) -->
<div id="home-pronti-prodotti" class="oltre-wc-products" data-oltre-wc-products
     data-category="pc-pronta-consegna" data-columns="4" data-columns-mobile="2"
     data-limit="4" data-orderby="menu_order" data-order="asc"></div>

<!-- categorie prodotto (vuoto = categorie principali con prodotti) -->
<div id="home-cat-prodotti" class="oltre-wc-products" data-oltre-wc-products
     data-source="categories" data-category="" data-columns="4" data-columns-mobile="2"
     data-limit="4" data-orderby="menu_order" data-order="asc"></div>

<!-- articoli del blog -->
<div id="home-ws-prodotti" class="oltre-wc-products" data-oltre-wc-products
     data-source="posts" data-post-category="blog" data-category="workstation"
     data-columns="4" data-columns-mobile="2" data-limit="4" data-orderby="date" data-order="desc"></div>
```

| Attributo | Valori |
|---|---|
| `data-source` | `products` (predefinito), `categories` o `posts` |
| `data-category`, `data-products` | categorie prodotto (slug) e prodotti scelti a mano (id); con `categories`, `data-category` dice quali categorie mostrare (vuoto = principali con prodotti) |
| `data-post-category`, `data-posts` | categorie del blog (slug; vuoto = tutte) e articoli scelti a mano (id) |
| `data-columns`, `data-columns-mobile`, `data-limit` | per riga su desktop (1–6) e mobile (1–2), quanti (1–24) |
| `data-border-width`, `data-border-color` | bordo della sezione che contiene il loop: spessore in px (0–10, 0 o assente = nessun bordo aggiunto) e colore esadecimale (es. `#95bc3d`); dal pannello si sceglie in "Bordo della sezione" (plugin 2.10) |
| `data-orderby`, `data-order` | prodotti: catalogo, data, prezzo, più venduti, valutazione, nome; categorie: come scelte (`include`), catalogo (`menu_order`, l'ordine trascinato in Prodotti > Categorie), nome, numero di prodotti (`count`); articoli: data, titolo, casuale |

Prodotti: blocco Product Collection. Categorie: scheda con l'immagine della categoria come copertina (quella impostata in Prodotti > Categorie; senza immagine il segnaposto di WooCommerce), nome e pulsante "Vedi i prodotti" verso la pagina della categoria. Articoli: blocchi core del loop (immagine in evidenza, titolo, data, riassunto, "Leggi l'articolo") dentro `.wp-block-post-template`. Conviene indicare sempre anche le categorie dell'altro contenuto (come `data-category` nell'esempio degli articoli), così passando da uno all'altro il pannello parte già impostato. Nell'anteprima si vedono schede di esempio con `data-preview-only`.

**Dal frontend** (plugin 2.10): sul riquadro compare la matita "Scegli contenuto e colonne". Il pannello chiede prima il **Contenuto** (Prodotti WooCommerce, Categorie prodotto o Articoli del blog), poi le categorie e gli elementi scelti a mano di quel contenuto (ricerca per nome o codice per i prodotti, per titolo per gli articoli), quanti elementi, quanti per riga su desktop e su mobile, ordine e direzione, e il bordo della sezione (spessore e colore, con anteprima). Le scelte si salvano nella pagina WordPress e prevalgono sul frammento; "Ripristina valori del frammento" le cancella. Con elementi scelti a mano le categorie non filtrano. "Quanti elementi" non scende sotto quelli per riga. Con le categorie prodotto è il numero massimo anche quando si spuntano più categorie: si vedono le prime nell'ordine scelto (plugin 2.13). Il link "Vedi tutti →" del riquadro resta un `editable-button` separato.

Schede: aspetto in `design.md` "Schede dei loop" (uguale per prodotti, categorie e articoli); prezzo e pulsante sempre al piede; pulsante largo quanto il box, bordo rosso per "Aggiungi al carrello" e verde per "Prenota".

Colonne: ≤1279px al massimo 2 per riga (1 se scelto 1); ≤600px il valore "mobile".

Carrello e account sono blocchi `woocommerce/mini-cart` e `woocommerce/customer-account` del tema.

## 6 bis. Hero con slide

**Regola della hero (cliente, 2026-11-12):** la hero di una pagina è una sezione `[data-tws-hero]` con 6 slide già pronte nel markup (`.tws-hero-slide`), di cui si vedono quante ne sceglie l'editor. Dal frontend, nel pannello "Configura hero e slide" del plugin, l'editor: (1) sceglie il **numero di slide** (1–6); (2) **scorre le slide una per una** con le frecce e i punti sulla hero o con "Modifica slide"; (3) su ogni slide cambia sul posto **immagine e testi** (kicker, titolo, due paragrafi, fino a 6 punti elenco) e i pulsanti (0–3 per slide); (4) imposta **avvio e scadenza** di ogni slide (data e ora, vuoto = nessun limite). I visitatori vedono solo le slide attive in quel momento, a rotazione automatica se attiva; senza slide attive la hero non si mostra. **Tutte le slide hanno la stessa struttura dei testi della slide 1** (kicker, titolo, testo 1, testo 2 facoltativo, elenco con 6 posti, 3 pulsanti). Testi e punti lasciati vuoti non compaiono, punto verde compreso, anche se l'editor ha salvato solo spazi o un a capo (`site.js` 1.06 aggiunge `.pf-empty`); senza punti pieni sparisce l'elenco. **Punti elenco:** per aggiungerne uno si scrive nel posto tratteggiato "+ Aggiungi un punto" (nell'editor se ne vede uno alla volta), per toglierlo si cancella il testo. Il titolo della slide 1 è l'H1 della pagina, quello delle altre slide è H2.

Markup (dalla home):

```html
<section class="pf-hero" data-om-section="home-pronta" data-om-label="Hero con slide" id="home-pronta"
         data-tws-hero data-hero-layout="boxed" data-slide-count="1" data-hero-autoplay="1" data-hero-interval="6">
  <article class="tws-hero-slide pf-banner pf-dark" data-hero-slide="1"> … copy (kicker, H1, testo-1, testo-2, 6 punti, .tws-hero-actions con 3 pulsanti) + .pf-banner__media.tws-hero-media … </article>
  <article class="tws-hero-slide pf-banner pf-dark" data-hero-slide="2" hidden> … titolo H2 … </article>
  … fino alla slide 6 …
  <div class="pf-hero__nav" data-hero-nav hidden> frecce data-hero-prev / data-hero-next, data-hero-count, punti data-hero-dots </div>
</section>
```

- ID: slide 1 `{slug}-{sezione}-{elemento}` (es. `home-pronta-titolo`), slide n `{slug}-{sezione}-s{n}-{elemento}` (es. `home-pronta-s2-titolo`); elementi `kicker`, `titolo`, `testo-1`, `testo-2`, `punto-1…3`, `cta`, `cta-2`, `cta-3`, `foto`.
- `data-slide-count="1"` nel markup: le slide 2–6 restano nascoste finché l'editor non ne sceglie di più. Il terzo pulsante ha `hidden` (di base 2 pulsanti per slide).
- Comportamento in `assets/js/site.js` (`window.TWSHero`, eventi `tws-hero-show`, `tws-hero-config`, `tws-hero-changed` usati dal pannello del plugin); stile in `assets/css/site.css` sezione "Hero con slide". Nessuna modifica al plugin: il pannello hero esiste già.

## 7. Collegamento con WordPress

1. Plugin Oltre Editable Media (ultima: 2.14 in `distribuzione/`), scheda GitHub: repository `doc65mi/sito-pcfrog`, branch `main`, cartella `pagine`, suffisso `-wordpress.html`, sito vuoto, token in `wp-config.php`.
2. "CSS e JS condivisi" attivo, handle `pcfrog-site`, poi "Aggiorna CSS e JS": i file arrivano in `assets/` del tema child.
3. Caricamento: "Caricali dal plugin" **oppure** `tema/functions-snippet.php` nel `functions.php`, non entrambi.
4. "Associazioni pagine": `pagine/{slug}-wordpress.html` → pagina WordPress.
5. Title, description e dati strutturati vanno nel plugin SEO (vedi `seo.md` e `cliente.md` sezione 4).

Il plugin è condiviso con altri siti: si modifica solo se serve alla gestione delle pagine, con versione nuova (`Version:` e `OLTRE_EM_VERSION`) e zip in `distribuzione/`.

## 8. Mappa delle pagine del sito

Percorsi relativi alla radice; elenco completo e categorie prodotto in `cliente.md` sezione 5.

| Pagina | Percorso | Stato |
|---|---|---|
| Home | `/` | fatta (`pagine/home.html`) |
| Pc in pronta consegna | `/pc-in-pronta-consegna/` | da fare |
| Pc gaming | `/pc-gaming/` | da fare |
| Pc custom (pc in pochi giorni) | `/pc-custom/` [[DA VERIFICARE]] | da fare |
| Workstation | `/workstation/` | da fare |
| Assistenza tecnica | `/assistenza-tecnica/` | da fare |
| Finanziamenti | `/finanziamenti/` | da fare |
| Noleggio operativo | `/noleggio-operativo/` | da fare |
| Aziende | `/aziende/` | da fare |
| Contatti | `/contatti/` | da fare |

Lo slug di ogni pagina nuova è uguale al suo URL (kebab-case, senza accenti) e diventa il prefisso di tutti i suoi ID.

## 9. Versioni

- Pacchetto pagine: numero in `tools/progetto.json` e nel campo `Version:` dei file toccati.
- `assets/css/site.css` 1.24, `assets/js/site.js` 1.06: `Version:` in testa al file.
- Plugin: versione propria (oggi 2.14).
