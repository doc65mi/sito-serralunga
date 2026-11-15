# Sito Serralunga

Version: 1.03

Sito istituzionale Serralunga (1825 S.R.L.) costruito dai template in `template/`.

| Cartella | Contenuto |
|---|---|
| `web/` | sito pubblico in **Astro** (SSR, Node) |
| `cms/` | pannello **Payload CMS** (Next.js + PostgreSQL) per modificare testi, foto, prodotti, designer, case history e leggere le richieste |
| `template/` | template HTML originali (Claude Design) e foto: sono il riferimento grafico di ogni pagina |
| `file-md/` | regole del progetto: `struttura.md`, `design.md`, `cliente.md`, `editing.md`, `seo.md` |

Avvio in locale e pubblicazione su Coolify: vedi [DEPLOY.md](DEPLOY.md).

## Pagine

| URL | Template | Contenuti dal CMS |
|---|---|---|
| `/` | `Serralunga Contract Home - Hero fullscreen` (immagine a tutto schermo, video facoltativo) | globale **Home** |
| `/prodotti/{slug}/` | `Aqua Lounger.dc.html` | collezione **Prodotti** (solo con "Scheda pubblicata") |
| `/case-history/{slug}/` | `Case History - La Loge du Massif` | collezione **Case history** |
| `/designer/` | `Designer.dc.html` | globale **Pagina designer** + collezione **Designer** |
| `/designer/{slug}/` | `Designer - Marc Sadler` | collezione **Designer** (solo con "Scheda pubblicata") |
| `/api/richiesta` | modulo "Richiedi il volume" | salva in **Richieste** |
| `/sitemap.xml`, `/robots.txt` | — | generati |

## Lingue

Italiano senza prefisso (`/designer/`), inglese con `/en/` (`/en/designer/`). I contenuti si traducono nel pannello scegliendo la lingua in alto; un campo inglese vuoto mostra il testo italiano. I testi fissi dell'interfaccia sono in `web/src/lib/lingua.ts`.

## Modifica dalla pagina

In fondo a ogni pagina c'è il link **Accesso redazione**: dopo l'accesso si torna sulla stessa pagina con la modifica già attiva (stesso funzionamento dell'editor delle pagine TWS).

- I testi modificabili hanno un bordo tratteggiato: clic, si scrive sul posto, poi **Salva** o **Annulla** nella barra in basso. Nulla si salva da solo.
- Ogni foto ha il pulsante **Cambia foto** (o **Carica foto** se manca).
- **Anteprima** nasconde gli strumenti, **Pannello** apre il documento in Payload, **Esci** chiude la sessione.

Il salvataggio pubblica subito, nella lingua della pagina. Funziona perché sito e pannello stanno sullo stesso indirizzo (servizio `proxy`).

## Foto

Ogni foto caricata (dal pannello, dalla pagina o dall'importazione) viene servita in AVIF in quattro larghezze dentro `<picture>`; il file caricato resta come riserva per i browser senza AVIF e come immagine per la condivisione. Il nome del file viene reso leggibile (minuscolo, trattini) e, se arriva un nome da fotocamera, si usa il testo alternativo, che è obbligatorio. Le foto prese da serralunga.com si scaricano all'originale; un ritratto più stretto di 1400 px viene ingrandito per interpolazione, senza aggiungere dettagli che nell'originale non ci sono.

## Pagine nuove

- `/installazioni/`: macro sezioni per ambito (hotel, ristorazione, spa e piscine, residenze, spazi urbani) con le case history della stessa categoria. Testi in Pagine > Installazioni; la categoria si sceglie in ogni case history.
- `/spunti-e-idee/`: elenco e scheda degli spunti (collezione Spunti e idee), con galleria e prodotti collegati.
- Scheda designer: sezione "Le creazioni per Serralunga" con foto di prodotto e ambientate dal catalogo Serralunga.
