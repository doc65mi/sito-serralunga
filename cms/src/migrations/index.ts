import * as migration_20261114_081408_iniziale from './20261114_081408_iniziale';
import * as migration_20261114_112936_inglese_home_fullscreen from './20261114_112936_inglese_home_fullscreen';
import * as migration_20261115_091656_installazioni_spunti_creazioni from './20261115_091656_installazioni_spunti_creazioni';

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
    name: '20261115_091656_installazioni_spunti_creazioni'
  },
];
