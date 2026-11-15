import * as migration_20261114_081408_iniziale from './20261114_081408_iniziale';
import * as migration_20261114_112936_inglese_home_fullscreen from './20261114_112936_inglese_home_fullscreen';
import * as migration_20261115_091656_installazioni_spunti_creazioni from './20261115_091656_installazioni_spunti_creazioni';
import * as migration_20261115_093539_ai_blocchi_articoli from './20261115_093539_ai_blocchi_articoli';
import * as migration_20261115_115540_home_box_catalogo from './20261115_115540_home_box_catalogo';

export const migrations = [
  {
    up: migration_20261114_081408_iniziale.up,
    down: migration_20261114_081408_iniziale.down,
    name: '20261114_081408_iniziale',
  },
  {
    up: migration_20261114_112936_inglese_home_fullscreen.up,
    down: migration_20261114_112936_inglese_home_fullscreen.down,
    name: '20261114_112936_inglese_home_fullscreen',
  },
  {
    up: migration_20261115_091656_installazioni_spunti_creazioni.up,
    down: migration_20261115_091656_installazioni_spunti_creazioni.down,
    name: '20261115_091656_installazioni_spunti_creazioni',
  },
  {
    up: migration_20261115_093539_ai_blocchi_articoli.up,
    down: migration_20261115_093539_ai_blocchi_articoli.down,
    name: '20261115_093539_ai_blocchi_articoli',
  },
  {
    up: migration_20261115_115540_home_box_catalogo.up,
    down: migration_20261115_115540_home_box_catalogo.down,
    name: '20261115_115540_home_box_catalogo'
  },
];
