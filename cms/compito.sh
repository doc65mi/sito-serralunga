#!/bin/sh
# Compiti di manutenzione dei contenuti — Version: 1.02
# Uso: sh ./compito.sh aggiorna|catalogo [versione]
# Di norma aggiunge solo ciò che manca (seed/prudenza.ts). Con SEED_APPLICA=1 applica anche
# le modifiche proposte ai contenuti esistenti, salvando prima una copia di ognuno.
# Lanciato da avvio.sh (aggiornamento automatico dopo un deploy) e dal pannello
# (Strumenti). Uno solo alla volta: un secondo compito parte quando il primo finisce.
# Si può interrompere dal pannello: il punto raggiunto resta salvato (seed/punto.ts) e
# l'esecuzione successiva riparte da lì; SEED_DA_CAPO=1 ricomincia dall'inizio.
# Registro e stato in $MEDIA_DIR/.compiti/ (volume media, sopravvive ai deploy):
#   <compito>.log      uscita dell'ultima esecuzione
#   <compito>.stato    in-corso | ok | errore | fermato, con data
#   <compito>.pid      gruppo di processi in corso (per "Interrompi")
#   <compito>.ferma    richiesta di interruzione dal pannello
#   <compito>.versione versione dei contenuti già applicata (per avvio.sh)
# Uscita: 0 completato, 1 errore, 3 interrotto.
COMPITO="$1"
VERSIONE="$2"
case "$COMPITO" in
  aggiorna|catalogo) ;;
  *) echo "compito sconosciuto: $COMPITO" >&2; exit 2 ;;
esac

DIR="${MEDIA_DIR:-./media}/.compiti"
mkdir -p "$DIR"
cd "$(dirname "$0")" || exit 1
ora() { date -u +%Y-%m-%dT%H:%M:%SZ; }
fermato() {
  rm -f "$DIR/$COMPITO.ferma" "$DIR/$COMPITO.pid"
  echo "fermato $(ora)" > "$DIR/$COMPITO.stato"
  echo "[compito] $COMPITO interrotto: il punto raggiunto è salvato, «Riprendi» riparte da lì" | tee -a "$DIR/$COMPITO.log"
  exit 3
}

# Attende il proprio turno (mkdir è atomico: fa da lucchetto). Si può interrompere anche in coda.
until mkdir "$DIR/lucchetto" 2>/dev/null; do
  [ -f "$DIR/$COMPITO.ferma" ] && fermato
  sleep 5
done
trap 'rmdir "$DIR/lucchetto" 2>/dev/null' EXIT
[ -f "$DIR/$COMPITO.ferma" ] && fermato

MODO="aggiunge solo ciò che manca"; [ "$SEED_APPLICA" = "1" ] && MODO="applica le modifiche proposte"
echo "in-corso $(ora)" > "$DIR/$COMPITO.stato"
echo "[compito] $COMPITO ($MODO) avviato $(ora)" > "$DIR/$COMPITO.log"
# Gruppo di processi proprio (setsid): "Interrompi" lo ferma tutto insieme.
# Priorità bassa e un solo thread per la conversione delle foto (AVIF è pesante): il sito
# e il pannello restano veloci mentre il compito lavora, anche su un server piccolo.
setsid nice -n 19 env VIPS_CONCURRENCY=1 UV_THREADPOOL_SIZE=2 \
  npm run "seed:$COMPITO" >> "$DIR/$COMPITO.log" 2>&1 &
FIGLIO=$!
echo "$FIGLIO" > "$DIR/$COMPITO.pid"
wait "$FIGLIO"
ESITO=$?
rm -f "$DIR/$COMPITO.pid"
[ -f "$DIR/$COMPITO.ferma" ] && fermato

if [ "$ESITO" -eq 0 ]; then
  echo "ok $(ora)" > "$DIR/$COMPITO.stato"
  [ -n "$VERSIONE" ] && echo "$VERSIONE" > "$DIR/$COMPITO.versione"
  echo "[compito] $COMPITO completato" | tee -a "$DIR/$COMPITO.log"
else
  echo "errore $(ora)" > "$DIR/$COMPITO.stato"
  echo "[compito] $COMPITO non completato: «Riprendi» riparte dal punto raggiunto" | tee -a "$DIR/$COMPITO.log"
  exit 1
fi
