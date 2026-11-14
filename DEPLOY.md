# Avvio e pubblicazione

Version: 1.00

Tre servizi Docker: `db` (PostgreSQL 16), `cms` (Payload, porta 3000), `web` (Astro, porta 4321).
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

- Sito: http://localhost:4321
- Pannello: http://localhost:3000/admin (utente e password = `SEED_EMAIL` / `SEED_PASSWORD` del `.env`)

Il seed carica i contenuti dei template e le foto (da `template/assets` e da serralunga.com). Si può rilanciare: aggiorna i contenuti con lo stesso slug, non duplica.

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

In `cms/.env` impostare `DATABASE_URL=postgres://utente:password@localhost:5432/serralunga`; in `web/.env` `CMS_INTERNAL_URL=http://localhost:3000`, `CMS_PUBLIC_URL=http://localhost:3000`, `SITO_CHIAVE` uguale al CMS.
In sviluppo lo schema del database si aggiorna da solo; in produzione si usano le migrazioni in `cms/src/migrations`.

## 2. Pubblicazione su Coolify

1. **New Resource → Docker Compose**, sorgente GitHub `doc65mi/sito-serralunga`, file `docker-compose.yml`.
2. Domini: servizio `web` → `https://www.serralunga.com` (porta 4321); servizio `cms` → per esempio `https://cms.serralunga.com` (porta 3000).
3. Variabili d'ambiente (le stesse di `.env.example`):
   - `POSTGRES_PASSWORD`, `PAYLOAD_SECRET` (`openssl rand -hex 32`), `SITO_CHIAVE`: valori lunghi e casuali
   - `SITO_URL=https://www.serralunga.com`, `CMS_PUBLIC_URL=https://cms.serralunga.com`
   - `BLOCCA_INDICIZZAZIONE=1` finché il sito è in prova, `0` al lancio
   - `NOTIFICHE_EMAIL` e `SMTP_*` per ricevere un'email a ogni richiesta
4. Deploy. Al primo avvio il CMS crea le tabelle (migrazioni). Poi dal terminale del servizio `cms` in Coolify: `npm run seed`.
5. Backup: attivare il backup del volume `db-dati` (o del database) e di `media`.

Quando si cambia lo schema del CMS (campi nuovi): `cd cms && npx payload migrate:create nome-modifica`, commit della migrazione, nuovo deploy.

## 3. Plesk (alternativa)

Con l'estensione **Docker** di Plesk si può usare lo stesso `docker-compose.yml` e due domini con proxy inverso verso le porte 4321 e 3000. Coolify resta consigliato perché gestisce build, certificati e rideploy da GitHub.
