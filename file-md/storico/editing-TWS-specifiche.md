# Specifiche TWS (storico, non operative per PcFrog)

Copiate da `editing.md` 2.05 il 2026-11-12.

## Specifiche TWS

- Wrapper delle pagine interne: `<main class="tws-internal" ...>`. La home usa `<main>` senza classe (struttura e grafica proprie, stesso contratto di editing).
- Modelli: `modello/modello-interno.html` (pagine interne) e `modello/modello.html` (home). Riferimenti strutturali: Servizi e Super leghe antiusura.
- Origine attuale delle immagini: `https://tws.piuper.site` (configurata in `tools/progetto.json`); il sito definitivo sarà su un altro dominio, quindi i frammenti usano solo percorsi relativi.
- Hero della home: componente `.tws-hero` con `data-tws-hero`, da 1 a 6 slide; impostazioni (layout, altezza, durata, CTA 0–3 per slide, calendario, versione mobile) salvate dal pannello Hero del plugin. Istruzioni in `files MD/integrazione-oltre-hero.md`.
- Cataloghi già pubblicati con shortcode (legacy, funzionanti): home 23691, accessori 23700, arco 23703, saldobrasatura 23704, oxigas 23707. Le nuove richieste usano il metodo a blocchi di `woocommerce.md`.
- Requisito permanente del proprietario: a ogni release aggiornare `files MD/todolist.md` (o la todolist della release) e `files MD/struttura.md`, distinguendo implementazione, verifiche e limiti.
- Il progetto sul PC è in `C:/laragon/www/TWS-page`; il WordPress locale di prova è `tws.test`.
