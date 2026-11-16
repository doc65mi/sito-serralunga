# Avvio e pubblicazione

Version: 1.08

Quattro servizi Docker: `db` (PostgreSQL 16), `cms` (Payload), `web` (Astro) e `proxy` (Caddy). Solo il proxy è aperto verso l'esterno: **sito e pannello stanno sulla stessa porta**, il pannello su `/admin`.
Il database e le foto caricate stanno in due volumi: `db-dati` e `media`. **Sono gli unici da salvare nei backup.**

## 1. Prova in locale su Windows

Serve [Docker Desktop](https://www.docker.com/products/docker-desktop/) avviato.

```bat
cd C:\laragon\www\sito-serralunga
copy .env.example .env
rem apri .env e cambia almeno le password
docker compose up -d --build
docker compose exec cms npm run seed
```

Il primo avvio richiede alcuni minuti (scarica le immagini e compila). Poi:

- Sito: http://localhost:8080
- Pannello: http://localhost:8080/admin (utente e password = `SEED_EMAIL` / `SEED_PASSWORD` del `.env`)

La porta si cambia con `PORTA` nel `.env` (8080 per non scontrarsi con Laragon sulla 80).

### Se localhost non si apre

1. Docker Desktop deve essere aperto (icona della balena ferma, non animata).
2. `docker compose ps`: i servizi `db`, `cms`, `web`, `proxy` devono essere "running". Se manca qualcosa: `docker compose logs cms` (o `web`, `proxy`) e leggere l'ultimo errore.
3. "port is already allocated": la porta 8080 è occupata, mettere per esempio `PORTA=8090` nel `.env` e rilanciare `docker compose up -d`.
4. Il seed (`docker compose exec cms npm run seed`) va lanciato solo dopo che `cms` è partito.

Il seed carica i contenuti dei template in italiano e in inglese e le foto (da `template/assets` e da serralunga.com). **Attenzione:** rilanciarlo riporta i testi italiani a quelli di partenza, quindi va usato solo all'inizio o per ripristinare; le traduzioni inglesi già scritte dal pannello restano.

Comandi utili:

```bat
docker compose logs -f cms      rem log del pannello
docker compose down             rem ferma (i dati restano)
docker compose up -d --build    rem dopo un aggiornamento del codice
```

### Senza Docker (sviluppo)

Serve Node 22 e un PostgreSQL locale (anche quello di Laragon).

```bat
cd cms && copy ..\.env.example .env && npm install && npm run dev
cd web && npm install && npm run dev
```

In `cms/.env` impostare `DATABASE_URL=postgres://utente:password@localhost:5432/serralunga`; in `web/.env` `CMS_INTERNAL_URL=http://localhost:3000`, `CMS_PUBLIC_URL=http://localhost:3000`, `SITO_CHIAVE` uguale al CMS. Senza Docker sito (4321) e pannello (3000) restano su due porte.
In sviluppo lo schema del database si aggiorna da solo; in produzione si usano le migrazioni in `cms/src/migrations`.

## 2. Pubblicazione su Coolify

Il sito si installa con due risorse nello stesso progetto di Coolify:

1. un **database PostgreSQL creato da Coolify** (risorsa a sé, con i backup programmati dal suo pannello);
2. l'**applicazione** dal repository GitHub, con il file **`docker-compose.coolify.yml`** (sito Astro, pannello Payload e proxy).

Perché il database separato: un nuovo deploy del sito non lo tocca mai, i backup e il ripristino si fanno dal pannello di Coolify, e si può spostare o aggiornare senza ricompilare il sito. Chi preferisce un solo blocco può usare `docker-compose.coolify-tutto.yml`, che contiene anche il database (vedi in fondo a questa sezione).

Requisiti del server: almeno 2 GB di RAM liberi durante la compilazione (meglio 4 GB in tutto) e circa 6 GB di disco. Il dominio deve già puntare all'indirizzo IP del server (record DNS A).

Le variabili sono già pronte nel file **`coolify.env.example`**: si copia il contenuto nella vista Developer delle variabili e si compilano i valori.

### A. Creare il database PostgreSQL

1. In Coolify aprire il progetto e l'ambiente (per esempio `production`) → **+ New** → **Database** → **PostgreSQL** (versione 16).
2. Compilare: nome della risorsa `serralunga-db`, **Initial Database** `serralunga`, **Username** `serralunga`. La password la propone Coolify: lasciarla.
3. **Non** attivare "Make it publicly available": il database deve restare raggiungibile solo dall'interno.
4. Premere **Start** e attendere lo stato "Running".
5. Copiare il valore del campo **Postgres URL (internal)**: ha la forma `postgres://serralunga:PASSWORD@NOME:5432/serralunga`. Serve al punto C.
6. Scheda **Backups** → **+ Add**: frequenza `daily`, tenere per esempio 14 copie. Se è configurato uno spazio S3 conviene attivarlo, così le copie stanno fuori dal server.

### B. Creare l'applicazione

1. Nello stesso progetto e ambiente, sullo **stesso server** del database: **+ New** → repository GitHub `doc65mi/sito-serralunga`. Il repository è privato: va scelto con la **GitHub App** di Coolify (o con una deploy key). Ramo: `claude/project-thread-cs7x7p` (oppure `main` dopo l'unione).
2. Build Pack: **Docker Compose**. Base Directory: `/`. Docker Compose Location: `/docker-compose.coolify.yml`. Salvare: Coolify legge il file e mostra i tre servizi `cms`, `web` e `proxy`.
3. **Advanced** → sezione Docker Compose → spuntare **Connect To Predefined Network**. Senza questa spunta il sito non vede il database.
4. **Domains**: aggiungere il dominio **solo al servizio `proxy`**, porta 80, per esempio `https://www.serralunga.com` (per le prove va bene un sottodominio). Gli altri servizi restano senza dominio. Il certificato HTTPS lo crea Coolify.

### C. Variabili

In **Environment Variables** → **Developer view** incollare il contenuto di `coolify.env.example` e compilare:

| Variabile | Valore |
|---|---|
| `DATABASE_URL` | il **Postgres URL (internal)** copiato al punto A5 |
| `SITO_URL` | lo stesso indirizzo messo in Domains, con `https://` e senza barra finale |
| `SEED_EMAIL` | email del primo utente del pannello |
| `SEED_PASSWORD` | password del primo utente (lunga, da cambiare poi dal pannello) |
| `SEED_AUTOMATICO` | `1`: al primo avvio, con il database vuoto, carica da solo utente, testi e foto |
| `BLOCCA_INDICIZZAZIONE` | `1` finché il sito è in prova, `0` al lancio |
| `NOTIFICHE_EMAIL`, `SMTP_*` | facoltative: email di avviso a ogni richiesta dei moduli |

`SERVICE_PASSWORD_64_PAYLOAD` e `SERVICE_PASSWORD_64_SITOCHIAVE` le genera Coolify: **non vanno toccate**. La prima cifra anche le chiavi API dell'AI salvate nel pannello: se cambia, le chiavi vanno reinserite.

### D. Deploy e primo avvio

1. Premere **Deploy**. La prima compilazione richiede 5–10 minuti.
2. All'avvio il CMS crea da solo le tabelle del database (migrazioni). Quando `cms`, `web` e `proxy` sono "healthy" il sito risponde.
3. Con `SEED_AUTOMATICO=1` e il database vuoto partono da soli i contenuti di partenza: utente del pannello, testi in italiano e inglese, foto scaricate da serralunga.com e convertite in AVIF. Servono 10–20 minuti; il sito è già raggiungibile e si riempie man mano. L'avanzamento si legge nei log del servizio `cms` (righe `[seed]`, fino a `[seed] fatto`). Agli avvii successivi non succede nulla: se esiste già un utente i contenuti non si toccano.
4. Entrare in `SITO_URL/admin` con `SEED_EMAIL` e `SEED_PASSWORD` e cambiare la password. Per l'AI: Impostazioni > Intelligenza artificiale, inserire la chiave del fornitore e spuntare «Abilita i pulsanti AI».

Se il caricamento automatico si interrompe (per esempio il server non raggiunge serralunga.com), si rilancia dal pannello, cruscotto → **Strumenti** → «Aggiorna contenuti». Solo se l'utente del pannello non è stato creato serve il **Terminal** del servizio `cms`: `npm run seed:primo`.

### E. Dati e backup

- **Database**: backup programmati della risorsa PostgreSQL (punto A6). Il ripristino si fa dalla stessa scheda.
- **Foto e video caricati**: volume `media` dell'applicazione (in **Persistent Storage**). Contiene i file caricati e le versioni AVIF. Va incluso nei backup del server: non sta nel database.
- Le due cose vanno salvate insieme: un database senza i file mostra le foto mancanti.

### Variante con il database nello stesso file

Docker Compose Location: `/docker-compose.coolify-tutto.yml`. Non serve il punto A, non serve "Connect To Predefined Network" e non c'è `DATABASE_URL`: la password la genera Coolify (`SERVICE_PASSWORD_POSTGRES`, da non cambiare dopo il primo avvio). Il database sta nel volume `db-dati`; per il salvataggio periodico, dal terminale del server:

```sh
docker exec $(docker ps -qf name=db-) pg_dump -U serralunga serralunga | gzip > serralunga-$(date +%F).sql.gz
```

### Aggiornamenti

A ogni invio su GitHub nel ramo scelto Coolify ricompila e ripubblica da solo (se è attivo l'Auto Deploy), altrimenti si preme **Redeploy**. I dati restano nei volumi. Le modifiche allo schema del CMS arrivano come migrazioni e si applicano all'avvio.

**Contenuti nuovi senza terminale.** Con `AGGIORNAMENTO_AUTOMATICO=1` (predefinito su Coolify), dopo un deploy che porta contenuti nuovi il CMS lancia da solo `seed:aggiorna` e poi `seed:catalogo`, in background. Avanzamento e registro si leggono nel pannello, cruscotto → **Strumenti**, dove i due compiti si possono anche rilanciare a mano («Aggiorna contenuti», «Importa catalogo da serralunga.com»).

**Le modifiche fatte sul sito non si perdono mai.** Testi, foto e menu cambiati dal pannello o dalla pagina stanno solo nel database, non in GitHub. Per questo i due compiti, di norma, *aggiungono soltanto* ciò che manca (designer, pagine, prodotti, foto, versioni AVIF) e **non modificano nessun contenuto già presente**. Se il codice nuovo vorrebbe cambiare qualcosa che esiste già (per esempio una voce di menu), la modifica non viene fatta: compare in Strumenti come «aggiornamenti disponibili», con l'elenco di pagine e campi. Si applica solo premendo «Applica questi aggiornamenti…» e confermando: prima di ogni modifica viene salvata una copia completa (italiano e inglese) del contenuto in `media/.compiti/copie/<data>/`, e le pagine con le versioni si possono ripristinare anche dalla scheda **Versioni**. Dal terminale lo stesso si ottiene con `SEED_APPLICA=1 npm run seed:aggiorna`.
Il seed **non** va rilanciato dopo aver modificato i testi: riporta quelli italiani ai valori di partenza.
Per aggiornare un sito già avviato senza toccare i testi modificati c'è `npm run seed:aggiorna` (dal terminale del servizio `cms`, in locale `docker compose exec cms npm run seed:aggiorna`). Aggiunge le schede dei designer mancanti, scarica da serralunga.com i ritratti a risoluzione piena e le foto delle creazioni di ogni designer (solo se la scheda non ne ha già), crea le pagine Installazioni e Spunti e idee con le loro voci di menu, rigenera in AVIF le versioni ridotte di tutte le foto e scrive nel registro l'elenco delle foto più strette di 1200 px. Si può rilanciare quando si vuole.

### Cambio di dominio (dalla prova al lancio)

Cambiare il dominio del servizio `proxy`, mettere lo stesso indirizzo in `SITO_URL`, `BLOCCA_INDICIZZAZIONE=0` e fare **Redeploy**. Se servono sia `serralunga.com` sia `www.serralunga.com`, inserirli entrambi nel dominio del `proxy` separati da virgola e attivare in Coolify il reindirizzamento verso quello scelto per `SITO_URL`.

### Se qualcosa non va

- **Il servizio `cms` si riavvia di continuo e nei log c'è un errore di connessione al database**: manca la spunta "Connect To Predefined Network", oppure `DATABASE_URL` non è l'indirizzo *internal*, oppure database e applicazione sono su server diversi.
- **"No Available Server" o 502**: un servizio non è ancora "healthy". Guardare i log di `cms` (di solito sta ancora applicando le migrazioni o manca una variabile).
- **Il pannello si apre ma «Modifica frontend» non porta al sito**: il dominio è sul servizio `cms` invece che sul `proxy`. Domains vuoto su `cms` e `web`, dominio solo sul `proxy` (porta 80).
- **Salvando appare "You are not allowed to perform this action"** (pannello o pagina): succedeva quando `SITO_URL` era diverso dal dominio. Dalla versione 1.04 i salvataggi dallo stesso dominio sono sempre accettati; `SITO_URL` va comunque messo uguale al dominio (serve a canonical, sitemap e condivisioni).
- **Il modulo risponde "Invio non consentito"** o **non si riesce a entrare nel pannello**: `SITO_URL` non coincide con il dominio usato nel browser.
- **La compilazione si ferma senza errore**: memoria del server insufficiente; aggiungere swap o RAM.

Quando si cambia lo schema del CMS (campi nuovi): `cd cms && npx payload migrate:create nome-modifica`, commit della migrazione, nuovo deploy.

## 3. Plesk (alternativa)

Con l'estensione **Docker** di Plesk si può usare `docker-compose.yml` (quello con la porta pubblicata) e un dominio con proxy inverso verso la porta del servizio `proxy`. Coolify resta consigliato perché gestisce build, certificati e rideploy da GitHub.

## Dopo l'aggiornamento alla versione con AI, blocchi e Journal

1. Le migrazioni partono da sole all'avvio del servizio `cms`.
2. `seed:aggiorna` parte da solo dopo il deploy (vedi «Aggiornamenti»); si può rilanciare dal pannello, Strumenti.
3. Entrare nel pannello, Impostazioni > Intelligenza artificiale, inserire la chiave API del fornitore scelto e spuntare «Abilita i pulsanti AI».
4. Quando il sito va in linea, impostare `BLOCCA_INDICIZZAZIONE=0`: finché vale 1 il file robots.txt chiude il sito a motori di ricerca e assistenti.

## Indirizzi relativi

Sito e pannello condividono l'indirizzo: foto, pannello e pulsante «Modifica frontend» usano percorsi relativi e funzionano da qualunque nome si apra il sito (localhost, 127.0.0.1, dominio). `SITO_URL` serve solo per canonical, sitemap, dati strutturati e immagini di condivisione: in produzione va impostato sul dominio definitivo. Per l'accesso al pannello valgono `SITO_URL` e, in locale, il suo equivalente tra localhost e 127.0.0.1.
