# design.md — aspetto, layout e componenti

Version: 2.05
Data: 2026-11-02
Ambito: le sezioni 1–4 valgono per qualsiasi progetto; i valori concreti (colori, misure, componenti) sono nella sezione "Specifiche TWS".

Questo file contiene solo le regole valide oggi. Le specifiche superate sono in `files MD/storico/` e nel `CHANGELOG.md`: non sono istruzioni operative.

---

## 1. Principi

- **Una sola fonte di stile**: tutto il CSS sta negli asset condivisi (`assets/css/site.css`, più il CSS del plugin per i componenti dinamici). Nessuno stile inline, nessun `<style>` di pagina, nessun tema isolato.
- **Token prima dei valori**: colori, larghezze e spaziature si usano tramite variabili CSS (`var(--cta)`, `var(--wrap-max)`, `var(--section-space)`). Un colore nuovo si aggiunge prima alla tabella dei token, poi si usa.
- **Modello prima della pagina**: si usano solo componenti presenti nel modello. Un componente nuovo si aggiunge al modello e agli asset nella stessa release.
- **Riuso dei blocchi interi**: non basta riusare le classi; si riprendono struttura, rapporti foto/testo e varianti del blocco del modello.

## 2. Composizione

- Valutare la sequenza intera della pagina: alternare fondo, densità e rapporto testo/immagine. Due sezioni consecutive non hanno lo stesso fondo (`data-om-surface` alternato `paper`/`wash`; le fasce colorate interrompono la sequenza).
- Il modello è un catalogo, non una sequenza obbligatoria: scegliere la ricetta adatta all'argomento.
- CTA solo dove servono; niente pulsante automatico su ogni scheda descrittiva. Il contatto principale sta nella sezione finale.
- Testi correnti mai sotto 16px; contrasto AA; target touch minimo 44px; focus visibile.

## 3. Regole di layout comuni

1. **Larghezza bloccata**: tutto il contenuto sta dentro `--wrap-max`. I fondi delle sezioni possono andare a tutta larghezza, testi e immagini no.
2. **Spaziatura verticale uniforme**: tra il bordo di ogni sezione e il suo contenuto c'è sempre e solo `--section-space` (80px desktop, 56px fino a 800px), sopra e sotto, qualunque sia il primo o l'ultimo elemento (intestazione, feature, passi, griglia). Il primo elemento non ha margine superiore e l'ultimo non ha margine inferiore. Tra intestazione e contenuto di un blocco c'è sempre `--block-gap`. Nessun padding o margine verticale scritto a mano nei componenti di sezione.
3. **Immagini**: riempiono il loro box con `object-fit: cover` centrato, senza deformazioni; il ritaglio dei bordi è ammesso, tranne nella hero delle pagine interne (regola 4).
4. **Hero delle pagine interne**: la foto è sempre mostrata intera, senza tagli, con le sue proporzioni originali. Sta nella colonna destra del contenitore da 1400px, allineata a destra, larga al massimo quanto la colonna e alta al massimo quanto un riquadro 3:2 della colonna: una foto quadrata si adatta all'altezza, una foto panoramica alla larghezza. Al variare della finestra si ridimensiona in proporzione; su mobile sta sopra il testo a tutta larghezza. La home è esclusa.
5. **FAQ sempre identiche**: una sola impostazione per tutto il sito (vedi componente FAQ). Nessuna variante di pagina.
6. **Hover e focus dei pulsanti sempre a contrasto**: in ogni stato (normale, hover, focus, attivo) testo e fondo del pulsante hanno contrasto almeno 4.5:1. Mai testo tono su tono (es. rosso su rosso). Gli stati si dichiarano con `!important` nel CSS condiviso, perché le regole `a:hover` del tema WordPress non devono poterli sovrascrivere.
7. **Testi bianchi sui fondi scuri** (richiesta del proprietario, 2026-11-02): quando il fondo è scuro, tutti i testi sono sempre bianchi, compresi kicker, etichette, paragrafi, liste e link testuali. Nessun testo grigio chiaro, colorato o tono su tono (es. kicker rosso su fondo rosso o navy). Fanno eccezione solo i pulsanti, che seguono i propri stati a contrasto. La regola sta nel CSS condiviso con `!important`, così i colori del tema WordPress non possono sovrascriverla.

## 4. Verifica grafica

- Controllare l'anteprima a 1920, 1440, 1000 e 390 px, senza scorrimento orizzontale.
- Distinguere la verifica del codice (`check.py`) dalla verifica visiva; dichiarare i limiti (es. immagini remote non caricate in locale).
- Dopo modifiche al CSS condiviso, ricontrollare tutte le pagine, non solo quella richiesta.

---

## Specifiche TWS

### Token (corrispondono 1:1 alle variabili in testa a `assets/css/site.css`)

| Token | Valore | Uso |
|---|---|---|
| `--brand` | #12212c | navy: fasce scure, filetti FAQ, testo forte |
| `--brand-2` | #1c303d | navy secondario |
| `--cta` | #b52800 | accento unico: pulsanti, kicker su fondo chiaro, link di accento, bordi evidenziati |
| `--accent-2` | #00316d | blu: box alternati, link della hero |
| `--ink` | #172833 | testo |
| `--muted` | #62717a | testo secondario, numeri FAQ |
| `--paper` | #ffffff | superficie `paper` |
| `--surface-wash` | #f5f5f5 | superficie `wash` delle pagine interne e pannello hero |
| `--wash` | #f6f4f2 | fondo chiaro della home |
| `--line` | #dedbd8 (interne #e6e3df) | filetti e bordi |
| `--wrap-max` | 1400px | larghezza massima del contenuto |
| `--section-space` | 80px (56px fino a 800px) | padding verticale di ogni sezione |
| `--block-gap` | 40px (32px fino a 800px) | distanza intestazione → contenuto |

Palette dei pulsanti dell'editor: CTA, brand, brand-2, ink, muted, paper, wash (classi `oltre-button-*`).

### Fondi scuri (testi bianchi)

Sono fondi scuri: le fasce `.focus`, `.consult`, `.sec-d` e `.sec-orange` senza `data-om-surface` (navy `--brand` e rosso `--cta`), il contenuto della hero della home (`.tws-hero-content`) e i box blu `--accent-2` delle coppie editoriali e dei settori della home. Le sezioni con `data-om-surface` (`paper`/`wash`) sono chiare anche se hanno la classe `sec-d`, come le hero e i contatti finali delle pagine interne.

### Stati dei pulsanti

| Pulsante | Normale | Hover / focus / attivo |
|---|---|---|
| `.btn-cta` | fondo `--cta`, testo bianco | fondo #932100, testo bianco |
| `.btn-out` | trasparente, bordo e testo del colore corrente | fondo `--cta`, testo bianco (valido su fondi chiari e scuri) |
| `.btn-small` | fondo `--brand`, testo bianco | fondo `--cta`, testo bianco |
| `.btn-text` | testo con sottolineatura `--cta` | stesso colore del testo, sottolineatura del colore del testo |
| `oltre-inline-button` | colore scelto nell'editor | stesso fondo scurito, testo bianco (ink su paper e wash) |

### Tipografia

- Roboto per testi e interfaccia; Roboto Condensed per H1–H6. Caricamento Google Fonts nel CSS condiviso (pesi 300/400/500/700, `display=swap`).
- H1: da 32 a 48px (clamp), peso 300, interlinea 1.0625, tracking -.035em.
- H2: da 28 a 37px (clamp), peso 500, tracking -.035em.
- H3: 1.4rem, peso 400, tracking -.035em.
- Paragrafi, richtext e liste (testi del body): 16px / interlinea 24px (richiesta del proprietario, 2026-11-02).
- Nessuna trasformazione maiuscola sui titoli; il kicker è maiuscolo, 11px, spaziato, `--cta` sui fondi chiari e bianco sui fondi scuri (regola 7).

### Componenti delle pagine interne

| Componente | Classi / layout | Note |
|---|---|---|
| Hero standard | `.hero.hero-overlap` + `.hero-layout`, `.hero-copy`, `.hero-image`, `.hero-service-links`, `.breadcrumb` | colonne 47% / 53% nel contenitore da 1400px; foto intera senza tagli, alta al massimo come un riquadro 3:2 della colonna; pannello `--surface-wash` sovrapposto |
| Hero editoriale | `.hero-editorial` | variante disponibile nel modello interno |
| Intestazione | `.heading-row` (`.heading-row-balanced`, `.editorial-intro-stack`) | kicker + H2 a sinistra, introduzione a destra |
| Coppie editoriali | `data-om-layout="editorial-pairs"`, `.sector-grid` / `.sector-item` | box bianco/blu alternati |
| Feature editoriale | `data-om-layout="editorial-feature"`, `.feature-row` (`.reverse`) | pannello testo con bordo `--line`; foto a destra o a sinistra |
| Passi di processo | `data-om-layout="process-steps"` | tre schede numerate |
| Settori illustrati | `.sector-stories`, `.sector-nav` | 4 colonne, 3 sotto 1100px, 2 sotto 900px, 1 sotto 580px |
| Approfondimento navy | `.focus` | fascia colorata, senza `data-om-surface` |
| Catalogo prodotti | segnaposto WooCommerce (vedi `woocommerce.md`); anteprima statica `.shop-card` con `data-preview-only` | |
| FAQ | sezione `data-om-schema="faq"` | vedi sotto |
| Contatto finale | `.consult` + `.consult-actions` | ultima sezione, superficie opposta alla FAQ |

### FAQ (impostazione unica)

- Sezione con `data-om-schema="faq"`, `data-om-layout="home-faq"` e `data-om-surface="paper"` (fondo bianco).
- A sinistra (`.faq-intro`): kicker, H2, un paragrafo di introduzione. Nessun pulsante.
- A destra (`.faq-list`): filetto superiore navy 2px, domande numerate 01, 02… in grigio, testo della domanda in grassetto 17px, simbolo + / − in `--cta`, filetti grigi tra le voci. `details`/`summary` nativi, nessun JavaScript.
- Colonne 1 : 1,5 con gap 80px; una colonna sotto 900px.
- 4–8 domande; template vuoto finale per l'editor.

### Ricette di pagina

| Ricetta | Sequenza | Esempi |
|---|---|---|
| Servizio con catalogo | hero-overlap → editorial-pairs → editorial-feature → catalogo prodotti → FAQ → consult | Accessori, Saldobrasatura, Oxigas, Arco |
| Servizio informativo | hero-overlap → editorial-pairs → editorial-feature (1–3) → process-steps → FAQ → consult | Servizi, Servizi per consumabili, Super leghe |
| Elenco illustrato | hero-overlap → sector-nav + sector-stories → focus → FAQ → consult | Settori di applicazione |
| Contatti | hero-overlap → editorial-pairs (recapiti) → FAQ → consult | Contatti |

Le superfici si assegnano partendo dalla FAQ (`paper`) e alternando all'indietro; la sezione `consult` finale è `wash`.

### Home

Struttura e grafica proprie (`modello/modello.html`): hero `.tws-hero` a tutta larghezza con slide, categorie `.prod`, fascia `.focus`, prodotti in evidenza, FAQ (stessa impostazione unica), settori a scacchiera bianco/blu, `.consult` navy, reparti `.feature-row`. Valgono comunque larghezza 1400px, spaziatura uniforme e FAQ unica. La regola "hero adattiva" non riguarda la home.

### Punti noti da semplificare

Il CSS condiviso usa ancora sette breakpoint (1100, 1000, 900, 800, 680, 580, 480px) e regole storiche con `!important`. Ridurli a tre (1100, 800, 580) richiede una verifica visiva di tutte le pagine: va pianificato come release dedicata.
