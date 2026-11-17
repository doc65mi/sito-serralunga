# cliente.md — fatti sul cliente Serralunga

Version: 1.02
Data: 2026-11-17
Ambito: dati aziendali, marchio, tono, URL di riferimento. I dati sono anche nel CMS (Impostazioni → Azienda), che fa fede per il sito.
Fonte: www.serralunga.com, template in `template/`.

---

## 1. Azienda

| Voce | Valore |
|---|---|
| Ragione sociale | 1825 S.R.L. |
| Marchio | Serralunga |
| Indirizzo | Via Serralunga 9, 13900 Biella (BI), Italia |
| Telefono | +39 015 2435711 |
| Email | info@serralunga.com |
| P.IVA | 02711740023 |
| REA | BI-207657 |
| Fondazione | 1825 |
| Sito ufficiale | https://www.serralunga.com |

## 2. Cosa fa

Arredi e vasi in polietilene rotostampato per esterni e interni, firmati da designer (Marc Sadler, Luisa Bocchietto, Marta Sansoni, altri). Il sito nuovo è rivolto ai **professionisti del progetto** (contract / B2B): architetti, interior designer, hotel, resort, spa, ristoranti, residenze, spazi pubblici. È un sito informativo: obiettivo è dare a chi progetta le informazioni e la documentazione per scegliere e specificare i prodotti Serralunga.

## 3. Pubblico e tono (revisione testi 2.00, 2026-11-17)

**Pubblico.** Architetti, interior designer, progettisti, paesaggisti e professionisti dell'hôtellerie e della ristorazione (direttori, F&B, uffici tecnici), general contractor e rivenditori. Persone che specificano un prodotto in un capitolato e devono poterlo motivare al committente.

**Tono.** Diretto, informativo, professionale. Il sito informa, non vende: deve trasmettere competenza e mettere in evidenza la qualità e la cura del progetto dei prodotti.

Regole:
- Si parla di **fatti verificabili**: materiale (LLDPE tinto in massa, riciclabile al 100%), prestazioni (−35 °C / +80 °C, UV, urti, salsedine), finiture (laccati, metallizzati, Moleskin, Corten), 38 colori in cartella, misure, produzione a Biella, nome del designer.
- **Mai** prezzi, sconti, listini, offerte, promozioni, «condizioni riservate», «agevolazioni», «listino B2B», preventivi come leva commerciale.
- **Mai** promesse non verificate (tempi di consegna, «entro 24 ore», numero di paesi serviti, quantità di referenze) né luoghi o clienti di progetti non confermati dal cliente.
- Niente superlativi e formule pubblicitarie («i più importanti», «eccellenza», «scopri», «non perdere»), niente punti esclamativi, niente maiuscole per enfasi.
- Seconda persona plurale («scriveteci», «il vostro progetto»), mai il «tu».
- Gli inviti all'azione offrono **documentazione e supporto**: catalogo, cartella colori, schede tecniche, disegni, campioni, ufficio contract. Etichette brevi e descrittive («Richiedi la documentazione», «Richiedi informazioni», «Parliamo del progetto»).
- Frasi brevi; parole chiave in corsivo oro con `_parola_` solo nei titoli. Testo sempre nero per leggibilità.
- Inglese: stesso registro, inglese britannico (colour, catalogue), nessuna traduzione letterale delle formule italiane.
- Ogni testo nuovo segue queste regole anche quando lo scrive l'AI (le regole sono nel prompt di `cms/src/ai/endpoints.ts`).

Dove sono i testi: contenuti nel CMS (pannello o modifica dalla pagina); testi di partenza in `cms/src/seed/`; testi fissi dell'interfaccia in `web/src/lib/lingua.ts`. La revisione 2.00 è in `cms/src/seed/testi-2026-11.ts` e si applica ai siti avviati con Strumenti → «Aggiorna i testi» (cambia solo i testi rimasti identici a quelli di partenza).

## 4. Contenuti da fornire

- Ritratti in alta risoluzione dei designer (Marc Sadler è provvisorio).
- Altri pezzi per designer, altre case history, conferma dei prodotti in portfolio.
- Testi e pagine legali (privacy, cookie): i link nel footer puntano a `/privacy/` e `/cookie/`, pagine ancora da creare.
- Indirizzo email che riceve le richieste del modulo.

## 5. URL

| Pagina | URL |
|---|---|
| Home | `/` |
| Designer | `/designer/`, `/designer/{slug}/` |
| Prodotto | `/prodotti/{slug}/` |
| Case history | `/case-history/{slug}/` |
| Contract | `/contract/`, `/contract/{hospitality,residenziale,urbano,su-misura,cataloghi,area-riservata}/` |

Su misura (`/contract/su-misura/`, 1.02): solo fatti di serralunga.com (varianti colore, personalizzazione, prodotti su misura, primo vaso luminoso, stabilimento di Biella) più gli stampi su misura indicati dal committente. Loghi, tempi, quantità minime e costi non sono confermati: non scriverli finché il cliente non li fornisce.
