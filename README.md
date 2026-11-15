# Sito Serralunga

Version: 1.05

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

## Modifica dalla pagina, versione 3

Chi ha fatto l'accesso al pannello trova gli strumenti direttamente nel sito (pulsante **Modifica frontend** nel pannello, in alto e nella barra laterale).

- **Testi**: clic sul testo, poi Salva o Annulla.
- **Pulsanti**: clic sul pulsante; nella barra in basso compaiono il testo e l'indirizzo a cui porta. L'indirizzo deve iniziare con `/`, `#`, `https://`, `mailto:` o `tel:`.
- **Foto**: il pulsante «Foto» apre il menu: cambia foto, aggiungi foto (con più di una foto lo spazio diventa uno slider, senza altre impostazioni), accendi o spegni la lightbox per quello spazio, testo alternativo, immagine generata con l'AI.
- **AI sui testi**: pulsante «AI» nella barra del testo. Si scrive l'istruzione (o si sceglie Migliora, Accorcia, Più tecnico, Correggi, Traduci), si rilegge la proposta, «Inserisci nel testo», poi Salva. Niente viene salvato da solo.
- **Blocchi**: in fondo a ogni pagina «Aggiungi blocco». Si sceglie il tipo (testo, immagine e testo, slider di foto, elenco di prodotti, citazione, domande e risposte, invito) oppure lo si descrive all'AI. Per l'elenco di prodotti si incollano gli indirizzi delle schede, del sito o di serralunga.com: nome, tipologia e foto vengono letti dalla scheda, non inventati. Ogni blocco si sposta, cambia sfondo o si elimina dalla sua barretta.

## Intelligenza artificiale

Pannello > Impostazioni > Intelligenza artificiale.

- Si sceglie il fornitore per i testi e quello per le immagini: OpenAI (ChatGPT), OpenRouter o Google Gemini. Ognuno ha la sua scheda con chiave API e nomi dei modelli (modificabili: se un modello viene ritirato basta cambiarne il nome).
- Le chiavi sono cifrate nel database con una chiave derivata da `PAYLOAD_SECRET`, il pannello ne mostra solo le ultime quattro lettere e non escono mai dalle API. Se si cambia `PAYLOAD_SECRET` vanno reinserite.
- Le «Direttive generali» (tono, pubblico, regole) accompagnano ogni richiesta.
- Le chiamate ai fornitori partono dal server: il server deve poter uscire su internet verso api.openai.com, openrouter.ai o generativelanguage.googleapis.com.

## Articoli da una piattaforma esterna (ContentAIPro)

Il Journal (`/journal/`, collezione Articoli) accetta articoli da una piattaforma esterna come **bozze**: si pubblicano dopo la revisione.

- Si attiva in Impostazioni > Intelligenza artificiale > ContentAIPro, dove si scrive un token di almeno 32 caratteri.
- La piattaforma invia `POST /api/ricevi-articoli` con intestazione `Authorization: Bearer <token>` e un JSON: `title`, `content` (Markdown o HTML) obbligatori; facoltativi `excerpt`, `slug`, `language` (`it` o `en`), `category` (`storie`, `guide`, `designer`, `progetti`), `author`, `meta_title`, `meta_description`, `faq` (elenco di `question` e `answer`).
- Il testo viene ripulito prima di essere mostrato: restano titoli, paragrafi, elenchi, tabelle, link e immagini https; script e attributi di evento vengono tolti.

## SEO, GEO, AEO e sicurezza

- Dati strutturati in un solo JSON-LD per pagina: Organization, WebSite, WebPage, BreadcrumbList, più Product, Article, FAQPage dove servono. Le domande e risposte (blocco o articolo) generano la FAQPage.
- `/robots.txt` apre il sito a motori di ricerca e assistenti (GPTBot, ClaudeBot, PerplexityBot, Google-Extended e altri) e chiude pannello e API. `BLOCCA_INDICIZZAZIONE=1` chiude tutto finché il sito è in prova.
- `/llms.txt` riassume azienda e pagine principali con i contenuti pubblicati. `/sitemap.xml` dichiara lingue e foto principali.
- Il proxy aggiunge le intestazioni di sicurezza (CSP, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy, HSTS in HTTPS). Gli accessi al pannello si bloccano per 15 minuti dopo 6 tentativi sbagliati; la sessione dura 8 ore.
