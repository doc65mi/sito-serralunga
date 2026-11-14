# seo.md — scrittura SEO, AEO e GEO

Version: 2.06
Data: 2026-11-14
Ambito: universale. Il tono di voce e i fatti sono in `cliente.md` e `fonti/{slug}.md`; le regole del cliente sono nella sezione finale "Specifiche PcFrog".

---

## 1. Prima di scrivere

1. Individuare l'argomento reale della pagina dalla richiesta o dalla fonte indicata.
2. Definire una query principale (ciò che una persona cercherebbe o chiederebbe a un assistente AI) e 3–5 domande correlate.
3. Verificare nomi di prodotti, materiali, servizi e zone in `cliente.md` e nella fonte. Dato mancante: `[[DA VERIFICARE]]`.

## 2. Title e meta description

- `title`: massimo 60 caratteri, query principale all'inizio, chiusura con `| Brand`.
- `meta description`: 140–160 caratteri, cosa offre la pagina e un invito all'azione concreto, senza elenchi di parole chiave.
- Title e H1 trattano lo stesso argomento ma non sono identici.
- In WordPress title, description, canonical e JSON-LD sono gestiti dal plugin SEO: i valori del documento completo sono la proposta da riportare lì.

## 3. Titoli

- Un solo H1 con la query principale in forma naturale.
- H2 per le sezioni, H3 per le sottosezioni, senza salti di livello.
- Dove è naturale, H2 formulati come domanda o come risposta.
- Kicker ed etichette non sono titoli: niente `h*`.

## 4. AEO (risposte per assistenti AI e snippet)

- Risposta prima, dettagli dopo: sotto ogni H2 un paragrafo di 40–60 parole che risponde alla domanda implicita del titolo.
- Paragrafi autonomi, comprensibili anche estratti da soli.
- Termini tecnici definiti alla prima occorrenza.
- Elenchi per passaggi e caratteristiche, tabelle per confronti.
- Numeri sempre con unità di misura e, se rilevante, con fonte e data.

## 5. GEO (coerenza di entità)

- Brand, prodotti, marchi, materiali e zone scritti sempre allo stesso modo, come in `cliente.md`.
- Stessa attività descritta in modo coerente in tutte le pagine.
- Norme, certificazioni e prestazioni citate solo se verificabili nella fonte; nessun superlativo non dimostrabile.

## 6. FAQ

- 4–8 domande reali e specifiche della pagina (costi, tempi, differenze, procedura, documenti).
- Risposta di 40–80 parole che inizia rispondendo direttamente.
- Sezione con `data-om-schema="faq"`; il JSON-LD `FAQPage` riporta domande e risposte identiche a quelle visibili.

## 7. Collegamenti interni

- Solo verso pagine elencate in `cliente.md`; mai URL inventati.
- Percorsi relativi alla radice (`/contatti/`), così restano validi al cambio di dominio.
- Testo del link descrittivo; indicativamente 2–5 link interni per pagina.

## 8. Immagini

- `alt` in italiano, massimo 125 caratteri, descrive soggetto, materiale, colore e contesto.
- Il testo vicino a una foto non descrive un prodotto diverso da quello fotografato.

## 9. Dati strutturati

Un solo blocco `<script type="application/ld+json" data-om-generated>` con `@graph` nel documento completo:
- `LocalBusiness` (o sottotipo) con i dati di `cliente.md`, campi mancanti omessi;
- `BreadcrumbList` Home → pagina;
- `FAQPage` solo se c'è la sezione FAQ;
- `Service` o `Product` solo per la sezione marcata `data-om-schema="service"` o `"product"`, senza prezzi o valutazioni non presenti nella fonte.

I rich result delle FAQ su Google sono limitati: il markup resta utile per altri motori e assistenti, ma non va promesso come garanzia.

## 10. Stile

- Frasi brevi, una idea per paragrafo, concretezza (materiali, misure, tempi) invece di aggettivi.
- Forma (tu, voi, impersonale) secondo `cliente.md`.
- CTA chiare e specifiche.

## 11. Checklist SEO

- [ ] Query principale definita; title ≤ 60 e description 140–160 caratteri.
- [ ] Un H1, gerarchia H2/H3 corretta, paragrafo di risposta sotto ogni H2.
- [ ] Nomi e fatti identici a `cliente.md` / `fonti/{slug}.md`.
- [ ] FAQ specifiche, 4–8 voci, JSON-LD identico al testo visibile.
- [ ] Link interni relativi verso pagine elencate.
- [ ] `alt` descrittivi e coerenti con il testo.

---

## Specifiche PcFrog

- Brand nei title: `| PcFrog`. Title, description, H1 e dati strutturati della home: `cliente.md` sezione 4.
- Tono di voce: `cliente.md` sezione 3 (seconda persona singolare, dati concreti).
- Prezzi WooCommerce: non si scrivono nei testi; li mostrano i loop dei prodotti.
- Le specifiche del sito TWS non valgono qui: sono in `file-md/storico/seo-TWS-specifiche.md`.

---

## Specifiche Serralunga

- Titolo SEO (max 60 caratteri), descrizione e immagine di condivisione in ogni pagina del CMS (scheda "SEO"); se vuoti si usano nome ed estratto.
- JSON-LD generato dal sito: Organization (dati da Impostazioni → Azienda), BreadcrumbList, Product, Person, Article.
- `sitemap.xml` automatica (solo schede pubblicate); `robots.txt` blocca tutto finché `BLOCCA_INDICIZZAZIONE=1`.
- Tono e fatti: `cliente.md`.
