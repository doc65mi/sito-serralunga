# Avvio e pubblicazione

Version: 1.03

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

Su Coolify si usa il file **`docker-compose.coolify.yml`**: è uguale a quello locale, ma non apre porte sul server (il dominio lo collega Coolify), controlla lo stato di ogni servizio e si fa generare le password da Coolify.

Requisiti del server: almeno 2 GB di RAM liberi durante la compilazione (meglio 4 GB in tutto) e circa 5 GB di disco. Il dominio deve già puntare all'indirizzo IP del server (record DNS A).

### Passi

1. **Sorgente.** In Coolify: progetto → **+ New** → repository GitHub `doc65mi/sito-serralunga`. Il repository è privato, quindi va scelto con la **GitHub App** di Coolify (o con una deploy key). Ramo: `claude/project-thread-cs7x7p` (oppure `main` dopo l'unione).
2. **Compilazione.** Build Pack (Build strategy): **Docker Compose**. Base Directory: `/`. Docker Compose Location: `/docker-compose.coolify.yml`. Salvare: Coolify legge il file e mostra i quattro servizi.
3. **Dominio.** In **Domains** aggiungere il dominio **solo al servizio `proxy`**, porta 80: per esempio `https://www.serralunga.com` (durante le prove va bene un sottodominio, per esempio `https://serralunga.oltremedia.it`). Gli altri servizi restano senza dominio. Il certificato HTTPS lo crea Coolify.
4. **Variabili.** In **Environment Variables** compilare:

   | Variabile | Valore |
   |---|---|
   | `SITO_URL` | lo stesso indirizzo del punto 3, con `https://` e senza barra finale |
   | `SEED_EMAIL` | email del primo utente del pannello |
   | `SEED_PASSWORD` | password del primo utente (lunga, da cambiare poi dal pannello) |
   | `BLOCCA_INDICIZZAZIONE` | `1` finché il sito è in prova, `0` al lancio |
   | `NOTIFICHE_EMAIL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` | facoltative: servono per ricevere un'email a ogni richiesta del modulo |

   `SERVICE_PASSWORD_POSTGRES`, `SERVICE_PASSWORD_64_PAYLOAD` e `SERVICE_PASSWORD_64_SITOCHIAVE` le genera Coolify: **non vanno toccate** (cambiare la prima dopo il primo avvio blocca l'accesso al database).
5. **Deploy.** Premere **Deploy**. La prima compilazione richiede 5–10 minuti. Al primo avvio il CMS crea da solo le tabelle del database; quando i quattro servizi sono "healthy" il sito risponde.
6. **Contenuti di partenza.** In **Terminal** scegliere il servizio `cms` e lanciare una sola volta:

   ```sh
   npm run seed
   ```

   Crea l'utente del pannello e carica testi (italiano e inglese) e foto. Poi: sito su `SITO_URL`, pannello su `SITO_URL/admin`.
7. **Backup.** I dati stanno in due volumi (in **Persistent Storage**): `db-dati` (database) e `media` (foto e video caricati). Vanno inclusi nei backup del server; in più conviene un salvataggio periodico del database, dal terminale del server:

   ```sh
   docker exec $(docker ps -qf name=db-) pg_dump -U serralunga serralunga | gzip > serralunga-$(date +%F).sql.gz
   ```

### Aggiornamenti

A ogni invio su GitHub nel ramo scelto Coolify ricompila e ripubblica da solo (se è attivo l'Auto Deploy), altrimenti si preme **Redeploy**. I dati restano nei volumi. Le modifiche allo schema del CMS arrivano come migrazioni e si applicano all'avvio.
Il seed **non** va rilanciato dopo aver modificato i testi: riporta quelli italiani ai valori di partenza.

### Cambio di dominio (dalla prova al lancio)

Cambiare il dominio del servizio `proxy`, mettere lo stesso indirizzo in `SITO_URL`, `BLOCCA_INDICIZZAZIONE=0` e fare **Redeploy**. Se servono sia `serralunga.com` sia `www.serralunga.com`, inserirli entrambi nel dominio del `proxy` separati da virgola e attivare in Coolify il reindirizzamento verso quello scelto per `SITO_URL`.

### Se qualcosa non va

- **"No Available Server" o 502**: un servizio non è ancora "healthy". Guardare i log di `cms` (di solito sta ancora applicando le migrazioni o manca una variabile).
- **Il modulo risponde "Invio non consentito"** o **non si riesce a entrare nel pannello**: `SITO_URL` non coincide con il dominio usato nel browser.
- **La compilazione si ferma senza errore**: memoria del server insufficiente; aggiungere swap o RAM.

Quando si cambia lo schema del CMS (campi nuovi): `cd cms && npx payload migrate:create nome-modifica`, commit della migrazione, nuovo deploy.

## 3. Plesk (alternativa)

Con l'estensione **Docker** di Plesk si può usare `docker-compose.yml` (quello con la porta pubblicata) e un dominio con proxy inverso verso la porta del servizio `proxy`. Coolify resta consigliato perché gestisce build, certificati e rideploy da GitHub.
