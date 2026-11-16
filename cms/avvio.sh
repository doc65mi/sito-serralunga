#!/bin/sh
# Avvio del CMS — Version: 1.02
# 1. Avvia Payload (che applica le migrazioni del database alla prima richiesta).
# 2. Con SEED_AUTOMATICO=1, quando il CMS risponde, carica i contenuti di partenza
#    una sola volta: se nel database c'è già un utente non fa nulla.
# 3. Con AGGIORNAMENTO_AUTOMATICO=1, se il deploy ha portato contenuti nuovi
#    (versione in .versione-seed, calcolata alla build), lancia da solo
#    seed:aggiorna e poi seed:catalogo. Entrambi aggiungono solo ciò che manca:
#    i testi e le foto modificati dal pannello o dalla pagina restano come sono.
#    Il sito resta raggiungibile mentre i contenuti si caricano.
set -e

DIR="${MEDIA_DIR:-./media}/.compiti"
mkdir -p "$DIR"
# Il contenitore è appena partito: un lucchetto rimasto da un avvio precedente è vecchio.
rmdir "$DIR/lucchetto" 2>/dev/null || true

npm run start &
SERVER=$!

if [ "${SEED_AUTOMATICO:-0}" = "1" ] || [ "${AGGIORNAMENTO_AUTOMATICO:-0}" = "1" ]; then
  (
    n=0
    until wget -q --spider http://127.0.0.1:3000/api/users/me 2>/dev/null; do
      n=$((n + 1))
      [ "$n" -gt 120 ] && echo "[avvio] il CMS non risponde: contenuti non caricati" && exit 0
      sleep 5
    done
    if [ "${SEED_AUTOMATICO:-0}" = "1" ]; then
      nice -n 19 env VIPS_CONCURRENCY=1 UV_THREADPOOL_SIZE=2 npm run seed:primo || echo "[avvio] contenuti di partenza non completati: si rilanciano dal pannello, Strumenti"
    fi
    if [ "${AGGIORNAMENTO_AUTOMATICO:-0}" = "1" ]; then
      VERSIONE="$(cat .versione-seed 2>/dev/null || echo sconosciuta)"
      for c in aggiorna catalogo; do
        if [ "$(cat "$DIR/$c.versione" 2>/dev/null)" != "$VERSIONE" ]; then
          echo "[avvio] contenuti nuovi in questo deploy: seed:$c in corso (avanzamento nel pannello, Strumenti)"
          sh ./compito.sh "$c" "$VERSIONE" || true
        fi
      done
    fi
  ) &
fi

trap 'kill -TERM $SERVER 2>/dev/null' TERM INT
wait $SERVER
