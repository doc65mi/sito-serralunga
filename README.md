# Sito Serralunga

Version: 1.00

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
| `/` | `Serralunga Contract Home v2` (slide) / `v3` (video) | globale **Home** |
| `/prodotti/{slug}/` | `Aqua Lounger.dc.html` | collezione **Prodotti** (solo con "Scheda pubblicata") |
| `/case-history/{slug}/` | `Case History - La Loge du Massif` | collezione **Case history** |
| `/designer/` | `Designer.dc.html` | globale **Pagina designer** + collezione **Designer** |
| `/designer/{slug}/` | `Designer - Marc Sadler` | collezione **Designer** (solo con "Scheda pubblicata") |
| `/api/richiesta` | modulo "Richiedi il volume" | salva in **Richieste** |
| `/sitemap.xml`, `/robots.txt` | — | generati |
