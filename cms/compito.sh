#!/bin/sh
# Compiti di manutenzione dei contenuti — Version: 1.01
# Uso: sh ./compito.sh aggiorna|catalogo [versione]
# Di norma aggiunge solo ciò che manca (seed/prudenza.ts). Con SEED_APPLICA=1 applica anche
# le modifiche proposte ai contenuti esistenti, salvando prima una copia di ognuno.
# Lanciato da avvio.sh (aggiornamento automatico dopo un deploy) e dal pannello
# (Strumenti). Uno solo alla volta: un secondo compito parte quando il primo finisce.
# Registro e stato in $MEDIA_DIR/.compiti/ (volume media, sopravvive ai deploy):
#   <compito>.log      uscita dell'ultima esecuzione
#   <compito>.stato    in-corso | ok | errore, con data
#   <compito>.versione versione dei contenuti già applicata (per avvio.sh)
COMPITO="$1"
VERSIONE="$2"
case "$COMPITO" in
  aggiorna|catalogo) ;;
  *) echo "compito sconosciuto: $COMPITO" >&2; exit 2 ;;
esac

DIR="${MEDIA_DIR:-./media}/.compiti"
mkdir -p "$DIR"
cd "$(dirname "$0")" || exit 1

# Attende il proprio turno (mkdir è atomico: fa da lucchetto).
until mkdir "$DIR/lucchetto" 2>/dev/null; do sleep 5; done
trap 'rmdir "$DIR/lucchetto" 2>/dev/null' EXIT

echo "in-corso $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$DIR/$COMPITO.stato"
MODO="aggiunge solo ciò che manca"; [ "$SEED_APPLICA" = "1" ] && MODO="applica le modifiche proposte"
echo "[compito] $COMPITO ($MODO) avviato $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$DIR/$COMPITO.log"
# Priorità bassa e un solo thread per la conversione delle foto (AVIF è pesante): il sito
# e il pannello restano veloci mentre il compito lavora, anche su un server piccolo.
if nice -n 19 env VIPS_CONCURRENCY=1 UV_THREADPOOL_SIZE=2 \
  npm run "seed:$COMPITO" >> "$DIR/$COMPITO.log" 2>&1; then
  echo "ok $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$DIR/$COMPITO.stato"
  [ -n "$VERSIONE" ] && echo "$VERSIONE" > "$DIR/$COMPITO.versione"
  echo "[compito] $COMPITO completato" | tee -a "$DIR/$COMPITO.log"
else
  echo "errore $(date -u +%Y-%m-%dT%H:%M:%SZ)" > "$DIR/$COMPITO.stato"
  echo "[compito] $COMPITO non completato: dettagli in $DIR/$COMPITO.log" | tee -a "$DIR/$COMPITO.log"
  exit 1
fi
