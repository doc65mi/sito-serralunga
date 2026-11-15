#!/bin/sh
# Avvio del CMS — Version: 1.00
# 1. Avvia Payload (che applica le migrazioni del database alla prima richiesta).
# 2. Con SEED_AUTOMATICO=1, quando il CMS risponde, carica i contenuti di partenza
#    una sola volta: se nel database c'è già un utente non fa nulla.
#    Il sito resta raggiungibile mentre i contenuti si caricano.
set -e

npm run start &
SERVER=$!

if [ "${SEED_AUTOMATICO:-0}" = "1" ]; then
  (
    n=0
    until wget -q --spider http://127.0.0.1:3000/api/users/me 2>/dev/null; do
      n=$((n + 1))
      [ "$n" -gt 120 ] && echo "[avvio] il CMS non risponde: contenuti di partenza non caricati" && exit 0
      sleep 5
    done
    npm run seed:primo || echo "[avvio] contenuti di partenza non completati: si può rilanciare npm run seed:primo dal terminale del servizio cms"
  ) &
fi

trap 'kill -TERM $SERVER 2>/dev/null' TERM INT
wait $SERVER
