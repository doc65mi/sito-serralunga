# struttura.md — struttura del sito Serralunga

Version: 2.01
Data: 2026-11-14
Ambito: cartelle, stack, schema dei contenuti, regole di costruzione delle pagine. Sostituisce la versione PcFrog/WordPress (archiviata in `storico/struttura-pcfrog-1.28.md`).
Regola: se questo file e un altro `.md` non coincidono, valgono `design.md` per l'aspetto e `cliente.md` per fatti e URL.

---

## 1. Cartelle

Repository `doc65mi/sito-serralunga`, copia locale `C:\laragon\www\sito-serralunga`.

| Cartella | Contenuto |
|---|---|
| `web/` | sito Astro: `src/pages` (route), `src/components`, `src/layouts/Base.astro`, `src/lib` (CMS, testo, media), `src/styles/site.css` (**unico**), `src/scripts/site.ts` (**unico**) |
| `cms/` | Payload CMS: `src/collections`, `src/globals`, `src/fields` (campi riusabili), `src/migrations`, `src/seed` |
| `template/` | template HTML e foto originali: riferimento di ogni pagina, non si modificano |
| `file-md/` | regole; storico in `file-md/storico/` |

## 2. Stack

- **Astro 7** in SSR (`@astrojs/node`): legge i contenuti da Payload via REST ad ogni richiesta, così le modifiche nel pannello sono subito online.
- **Payload CMS 3** su Next.js con **PostgreSQL**: bozze e versioni, anteprima, ruoli, foto ridimensionate in WebP (400/1000/1800/2600 px).
- Docker Compose per locale e per Coolify (vedi `DEPLOY.md`).

## 3. Contenuti nel CMS

| Tipo | Nome | Pagina |
|---|---|---|
| Globale | Impostazioni | logo, menu, footer, dati azienda, colore accento, didascalie |
| Globale | Home | tutte le sezioni della home (template "Hero fullscreen": apertura, tre ambiti, chi siamo, numeri, installazioni, collezioni, contract, catalogo) |
| Globale | Pagina designer | intro e CTA di `/designer/` |
| Collezione | Prodotti | `/prodotti/{slug}/` e card |
| Collezione | Designer | `/designer/{slug}/` e card |
| Collezione | Case history | `/case-history/{slug}/` e card |
| Collezione | Richieste | moduli inviati dal sito (sola lettura per la redazione) |
| Collezione | Media | foto, video, PDF (testo alternativo obbligatorio) |

"Scheda pubblicata" spento = il prodotto o il designer compare solo come card, senza pagina propria.

## 4. Regole di costruzione

1. Ogni pagina nasce da un template in `template/`: stessa struttura di sezioni, stessi testi di partenza (caricati dal seed), stesso aspetto.
2. Nessuno stile inline e nessun `<style>` nelle pagine: solo classi di `site.css` (eccezioni in `design.md` §1).
3. Un solo H1 per pagina; dati strutturati JSON-LD in `Base.astro` (Organization, BreadcrumbList, Product/Person/Article).
4. Foto mancanti = segnaposto a strisce con nota, mai immagini inventate.
5. Nuovi campi nel CMS → migrazione (`npx payload migrate:create`) e aggiornamento di questo file.
6. Lingue: italiano senza prefisso, inglese sotto `/en/` (stesse pagine, lingua scelta in `web/src/middleware.ts`); testi fissi in `web/src/lib/lingua.ts`.
7. Modifica dalla pagina: gli elementi con `data-campo` (testi) e `data-campo-img` (foto) sono modificabili da chi è collegato al pannello (`web/src/scripts/modifica.ts`). Ogni nuovo testo o foto di pagina va marcato con il percorso del campo.
8. La home ha testata e footer propri (classi `hf-*` in `site.css`), identici al template; le altre pagine usano `Header.astro` e `Footer.astro`.
