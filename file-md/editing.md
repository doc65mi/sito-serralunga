# editing.md — struttura delle pagine e contratto dell'editor

Version: 2.14
Data: 2026-11-12
Ambito: universale (qualsiasi pagina o sito con l'editor Oltre Editable Media). Le regole del singolo cliente sono solo nella sezione finale "Specifiche PcFrog".
Plugin di riferimento: Oltre Editable Media 2.14 (versione propria del plugin, condiviso tra più siti).

Questo file contiene solo le regole valide oggi. Lo storico delle decisioni è nella cronologia di GitHub; le versioni precedenti dei file sono in `file-md/storico/`.

---

## 1. I file del progetto e chi decide cosa

| File | Decide | Riuso |
|---|---|---|
| `editing.md` | struttura della pagina, contratto dell'editor, consegna, versioni | universale |
| `design.md` | aspetto: token, layout, componenti, composizione | regole generali + specifiche cliente |
| `seo.md` | scrittura SEO, AEO, GEO, dati strutturati | universale + specifiche cliente |
| `struttura.md` | cartelle, schema delle pagine, larghezze, loop (prodotti e articoli), collegamento con WordPress | uno per sito |
| `cliente.md` | anagrafica, contatti, URL verificati, tono di voce | uno per cliente |
| `file-md/fonti/{slug}.md` | fatti e fonti della singola pagina (quando servono) | uno per pagina |

In caso di conflitto: un fatto vale solo se è in `cliente.md` o in `fonti/{slug}.md`; un aspetto grafico vale solo in `design.md`; struttura e attributi valgono solo qui; la scrittura segue `seo.md` con il tono di `cliente.md`. Dentro ogni file la sezione "Specifiche {cliente}" prevale sulle regole generali.

Se un'informazione necessaria non c'è, **non inventarla**: scrivi `[[DA VERIFICARE: cosa manca]]` e segnalalo nella consegna.

---

## 2. Flusso per ogni pagina

1. Leggere `editing.md`, `design.md`, `seo.md`, `cliente.md` e `struttura.md` (per i loop di prodotti o articoli la sezione 6).
2. Raccogliere i contenuti dalla fonte indicata (pagina del sito, brief) e registrarli in `file-md/fonti/{slug}.md` con data e URL.
3. Scegliere la ricetta di pagina in `design.md` e copiare i blocchi effettivi dalla home (`pagine/home.html`) o dal template (`template/`), riscrivendo testi e ID con il nuovo slug. Mai copiare i contenuti.
4. Scrivere **solo il documento completo** `pagine/{slug}.html`.
5. Eseguire `python3 tools/build.py {slug}`: genera `pagine/{slug}-wordpress.html` e `anteprime/{slug}.html`. I frammenti non si modificano mai a mano.
6. Eseguire `python3 tools/check.py {slug}`: zero errori prima della consegna; gli avvisi vanno elencati nella consegna.
7. Aggiornare `Version:` dei file toccati e i file md interessati; salvare in locale e su GitHub.

Un componente nuovo si aggiunge prima agli asset condivisi (`assets/css/site.css`, `assets/js/site.js`), poi si usa nella pagina. Mai CSS o JS dentro una singola pagina.

---

## 3. Documento completo

```html
<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title data-om-meta="title">Titolo della pagina | Brand</title>
  <meta name="description" data-om-meta="description" content="...">
  <link rel="stylesheet" href="../assets/css/site.css">
  <script type="application/ld+json" data-om-generated>{ "@context": "https://schema.org", "@graph": [] }</script>
</head>
<body>
  <main class="{wrapper da design.md}" data-om-page="{slug}" data-om-spec="1.00">
    <!-- sezioni -->
  </main>
  <script src="../assets/js/site.js" defer></script>
</body>
</html>
```

- Header e footer appartengono al tema: dentro `<body>` c'è solo `<main>` e lo script condiviso.
- Un solo `<main>`, un solo `<h1>`, nessuno `style="..."`, nessuna libreria esterna.
- `data-om-spec` è il selettore che attiva il CSS condiviso: va sempre presente, il valore resta `1.00` (il numero di release è in `tools/progetto.json`).
- `{slug}`: kebab-case, minuscolo, senza accenti, uguale all'URL della pagina.
- Title, description e JSON-LD servono all'anteprima: in WordPress li gestisce il plugin SEO, per questo `build.py` non li copia nel frammento.

---

## 4. Sezioni

```html
<section class="sec" data-om-section="{slug}-{sezione}" data-om-label="Nome leggibile"
         data-om-surface="paper" data-om-layout="editorial-feature" id="{slug}-{sezione}">
  <div class="wrap">...</div>
</section>
```

| Attributo | Regola |
|---|---|
| `data-om-section` | obbligatorio, `{slug}-{sezione}` |
| `data-om-label` | obbligatorio (tranne hero), nome mostrato nell'editor |
| `data-om-surface` | obbligatorio nelle pagine interne: `paper` o `wash`; due sezioni consecutive non hanno lo stesso valore; le fasce colorate (navy, accento) non lo usano |
| `data-om-layout` | variante del componente, valori elencati in `design.md` |
| `data-om-schema` | `faq` sulla sezione FAQ; `service` o `product` solo sulla sezione che descrive il servizio o il prodotto principale (una per pagina) |
| `id` | ancora stabile; preferibilmente uguale a `data-om-section` |

---

## 5. Contratto dell'editor Oltre Editable Media

L'editor è universale: funziona su qualsiasi HTML che rispetta queste classi, in un blocco HTML WordPress, in un template o in un widget.

| Contenuto | Markup obbligatorio |
|---|---|
| Testo breve (kicker, titolo, etichetta) | classe `editable-text` + `id` sul tag stesso |
| Paragrafi e liste | `editable-text` + `id` su **ogni** `p` o `li`, mai sul contenitore con più paragrafi |
| Foto | `editable-photo` + `id` sul contenitore (`figure` o `div`) che contiene un solo `img` |
| Pulsante o link | `editable-button` + `id` su `a`, testo dentro `<span class="om-label btn-label">` |
| Video | `editable-video` + `id` sul contenitore |
| Elementi ripetuti (FAQ, card) | repeater: voci con `data-om-item`, ogni campo con ID proprio, `<template data-om-item-template>` finale lasciato vuoto e inerte |

Regole sugli ID:
- Schema `{slug}-{sezione}-{elemento}` (es. `servizi-faq-lista-item-2-domanda`), solo `a-z`, `0-9`, `-`, univoci nella pagina.
- **Un ID già pubblicato non si rinomina mai**: i contenuti salvati dal cliente sono legati all'ID. Se un elemento viene rimosso, segnalarlo nella consegna (il contenuto salvato resta orfano).
- `check.py --baseline {cartella backup}` elenca gli ID spariti rispetto alla versione precedente.

Gli attributi `data-om-slot`, `data-om-type`, `data-om-field` restano come metadati descrittivi (tipo di contenuto e nome nell'editor) e seguono lo stesso schema di ID. Non sostituiscono le classi `editable-*`.

I dati del cliente (telefono, email, indirizzo, URL preventivo) usano `data-om-ref="phone|email|address|name|preventivo_url|whatsapp"` e non sono modificabili con l'editor generico.

---

## 6. Immagini

- Ogni `img` ha `alt` descrittivo, `width` e `height`.
- Prima immagine della hero: `fetchpriority="high"`, mai `loading="lazy"`. Tutte le altre `loading="lazy"` (anche quelle delle slide 2–6 della hero).
- Nel documento completo le immagini possono puntare all'origine del sito (serve all'anteprima). Nel frammento WordPress `build.py` converte automaticamente l'origine configurata in percorsi relativi alla radice (`/wp-content/uploads/...`), così le pagine funzionano su qualunque dominio.
- Senza foto definitiva si usa un segnaposto esplicito e si segnala nella consegna; l'`alt` descrive la foto che servirà.
- Editing delle foto: il selettore deve offrire **Scatta una foto**, **Foto del dispositivo**, **Archivio del sito**, con conferma esplicita **Salva immagine**. Il caricamento passa da `wp/v2/media` autenticato.

---

## 7. Contenuti non editabili

- Testo riscritto da JavaScript: contenitore con `data-om-lock` e nessuno slot all'interno.
- Nessun testo nascosto per i motori di ricerca: niente `hidden` o `display:none` su testi destinati solo ai crawler.

---

## 8. Marcatori per `build.py`

| Marcatore | Effetto |
|---|---|
| `data-preview-only` su un elemento | l'elemento esiste solo nel documento completo e nell'anteprima (es. catalogo statico di esempio) |
| `<!-- wp-fragment: HTML -->` | l'HTML viene inserito solo nel frammento WordPress |

Uso tipico: loop di prodotti o di articoli. Il documento completo mostra schede di esempio con `data-preview-only`; il frammento riceve il segnaposto reale (vedi sotto e `struttura.md` sezione 6).

**Regola dei loop (cliente, 2026-11-12):** ogni loop di oggi e di domani, in qualsiasi pagina, è un segnaposto `oltre-wc-products` con `id` `{slug}-{sezione}-prodotti` e può mostrare **prodotti WooCommerce** (`data-source="products"`, predefinito), **categorie prodotto** (`data-source="categories"`: immagine della categoria, nome e pulsante) oppure **articoli del blog** (`data-source="posts"`). Dal frontend la matita "Scegli contenuto e colonne" apre il pannello in cui l'editor sceglie il contenuto, le categorie (del negozio o del blog; per le categorie prodotto: quali mostrare), gli elementi scelti a mano, quanti, per riga e ordine, e il **bordo della sezione** (spessore 0–10 px, 0 = nessuno, e colore; anteprima dal vivo nel pannello, plugin 2.10). Il bordo va sulla sezione `[data-om-section]` che contiene il loop e prende il posto del bordo grigio del riquadro; si può anche impostare nel frammento con `data-border-width` e `data-border-color`. Mai shortcode, mai un loop scritto a mano nella pagina.

---

## 9. Consegna

Ogni consegna elenca:
- pagine create o modificate (documento completo, frammento, anteprima);
- file condivisi da aggiornare sul sito: `assets/css/site.css`, `assets/js/site.js`, plugin (con versione, zip in `distribuzione/` e pubblicazione su GitHub, vedi sezione 10), eventuale `functions.php` del tema child (dire esplicitamente se non serve);
- esito di `check.py` (errori zero, avvisi elencati);
- verifiche fatte e non fatte, distinguendo anteprima locale da sito WordPress autenticato;
- `[[DA VERIFICARE]]` rimasti e ID rimossi.

## 10. Versioni

- **Pacchetto pagine**: un solo numero (es. 2.04) in `tools/progetto.json`, e nel campo `Version:` di ogni file `.md` modificato nella release.
- **Plugin Oltre Editable Media**: versione propria nel campo `Version:` dell'intestazione del plugin e in `OLTRE_EM_VERSION`, perché il plugin è condiviso con altri siti. Ogni modifica al plugin incrementa la versione e produce `distribuzione/oltre-editable-media-{versione}.zip`.
- **Ogni nuova versione del plugin si pubblica sempre su GitHub**, nel repository del progetto e sul branch letto dai siti (`main`): zip `distribuzione/oltre-editable-media-{versione}.zip` e sorgente `oltre-editable-media-v2/` con la stessa versione nell'intestazione. Senza questo l'aggiornamento automatico del plugin non la trova. Una versione rimasta solo in locale o in un branch non conta come consegnata: la consegna indica il link della pubblicazione su `main` o, se l'unione aspetta l'approvazione, la PR da unire.

## 11. Checklist di consegna

Automatica (`tools/check.py`): un H1, nessuno stile inline, frammento aggiornato e senza script, sezioni con `data-om-section` e superfici alternate, FAQ con schema unico, ID univoci, `editable-*` con ID, pulsanti con `btn-label`, immagini con alt e dimensioni, nessun URL assoluto nel frammento, title ≤ 60 caratteri, JSON-LD valido.

Manuale:
- [ ] Fatti presenti in `cliente.md` o `fonti/{slug}.md`, nessun dato inventato.
- [ ] Testo e foto descrivono lo stesso prodotto o materiale.
- [ ] Composizione verificata nell'anteprima a 390, 1000, 1280, 1920 e 2560 px (`struttura.md` sezione 4).
- [ ] Nessun ID esistente rinominato.
- [ ] `Version:` e file md interessati aggiornati; pubblicato su GitHub e nella cartella locale.

---

## Specifiche PcFrog

- Wrapper di tutte le pagine: `<main class="pf-main" data-om-page="{slug}" data-om-spec="1.00">`; header, footer, barra grigia e ticker sono del tema WordPress.
- Riferimenti: `struttura.md` (cartelle, schema, larghezza 1280px, loop, collegamento con WordPress) e `design.md` "Specifiche PcFrog" (aspetto).
- Origine delle immagini in anteprima: `tools/progetto.json`; i frammenti usano solo percorsi relativi.
- Loop: segnaposto `oltre-wc-products` con scelta prodotti o articoli (regola della sezione 8). Prodotti WooCommerce sempre a blocchi.
- Hero: sezione `[data-tws-hero]` con slide, avvio e scadenza (regola sotto; markup e ID in `struttura.md` sezione 6 bis).

**Regola dell'ordine delle sezioni (cliente, 2026-11-12, plugin 2.12):** le sezioni di una pagina (`[data-om-section]` fratelli dentro `<main data-om-page>`) si riordinano dal frontend con il pulsante **"Ordina sezioni"** (in basso a sinistra, solo per gli editor): elenco con trascinamento e frecce su/giù, anteprima dal vivo sulla pagina, casella **"Nascondi"** per togliere una sezione ai visitatori senza cancellarla (gli editor la vedono tratteggiata in rosso), casella **"Attacca"** (plugin 2.14) per togliere lo spazio tra la sezione e quella sopra: il server aggiunge `data-om-attached="1"` e il CSS del sito toglie spazio e doppio bordo (in PcFrog: `site.css` 1.24; la sezione subito dopo la hero è già sempre attaccata). "Salva" registra ordine, sezioni nascoste e sezioni attaccate nella pagina WordPress (meta `_oltre_section_order`), "Ripristina ordine del file" torna all'ordine di GitHub. Il riordino lo fa il server: visitatori e motori di ricerca ricevono già l'HTML nell'ordine scelto. La prima sezione resta sempre in cima se è la hero o contiene l'H1. Una sezione aggiunta dopo da GitHub compare subito dopo la sezione che la precede nel file. **Con un ordine salvato, da GitHub conta solo quali sezioni ci sono, non dove stanno:** l'aggiornamento da GitHub porta testi, sezioni nuove e sezioni tolte, ma non cambia l'ordine scelto nel pannello (una sezione nuova si inserisce dopo quella che la precede nel file, una sezione tolta dal file sparisce anche dall'ordine). Per spostare una sezione si usa il pannello, non il file; "Ripristina ordine del file" riporta l'ordine di GitHub. Per questo ogni sezione deve avere `data-om-section` univoco e `data-om-label` leggibile (è il nome nell'elenco).

**Regola della hero (cliente, 2026-11-12):** la hero di una pagina è una sezione `[data-tws-hero]` con 6 slide già pronte nel markup (`.tws-hero-slide`), di cui si vedono quante ne sceglie l'editor. Dal frontend, nel pannello "Configura hero e slide" del plugin, l'editor: (1) sceglie il **numero di slide** (1–6); (2) **scorre le slide una per una** con le frecce e i punti sulla hero o con "Modifica slide"; (3) su ogni slide cambia sul posto **immagine e testi** (kicker, titolo, due paragrafi, fino a 6 punti elenco) e i pulsanti (0–3 per slide); (4) imposta **avvio e scadenza** di ogni slide (data e ora, vuoto = nessun limite). I visitatori vedono solo le slide attive in quel momento, a rotazione automatica se attiva; senza slide attive la hero non si mostra. **Tutte le slide hanno la stessa struttura dei testi della slide 1** (kicker, titolo, testo 1, testo 2 facoltativo, elenco con 6 posti, 3 pulsanti). Testi e punti lasciati vuoti non compaiono, punto verde compreso, anche se l'editor ha salvato solo spazi o un a capo (`site.js` 1.06 aggiunge `.pf-empty`); senza punti pieni sparisce l'elenco. **Punti elenco:** per aggiungerne uno si scrive nel posto tratteggiato "+ Aggiungi un punto" (nell'editor se ne vede uno alla volta), per toglierlo si cancella il testo. Il titolo della slide 1 è l'H1 della pagina, quello delle altre slide è H2.
- Progetto sul PC: `C:\laragon\www\sito-Pcfrog`; repository `doc65mi/sito-pcfrog`, branch `main`.

Le specifiche del sito TWS (altro progetto con lo stesso plugin) non valgono qui: sono in `file-md/storico/editing-TWS-specifiche.md`.
