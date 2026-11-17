import * as migration_20261114_081408_iniziale from './20261114_081408_iniziale';
import * as migration_20261114_112936_inglese_home_fullscreen from './20261114_112936_inglese_home_fullscreen';
import * as migration_20261115_091656_installazioni_spunti_creazioni from './20261115_091656_installazioni_spunti_creazioni';
import * as migration_20261115_093539_ai_blocchi_articoli from './20261115_093539_ai_blocchi_articoli';
import * as migration_20261115_115540_home_box_catalogo from './20261115_115540_home_box_catalogo';
import * as migration_20261116_074854_immagine_condivisione from './20261116_074854_immagine_condivisione';
import * as migration_20261116_081143_menu_pagine from './20261116_081143_menu_pagine';
import * as migration_20261116_082127_sezione_contract from './20261116_082127_sezione_contract';
import * as migration_20261116_083258_materiali_colori from './20261116_083258_materiali_colori';
import * as migration_20261116_083653_catalogo_categorie from './20261116_083653_catalogo_categorie';
import * as migration_20261116_084128_heritage from './20261116_084128_heritage';
import * as migration_20261116_174732_disegno_quotato_campioni from './20261116_174732_disegno_quotato_campioni';
import * as migration_20261117_082017_moduli_newsletter_tracciamento from './20261117_082017_moduli_newsletter_tracciamento';

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
    name: '20261115_115540_home_box_catalogo',
  },
  {
    up: migration_20261116_074854_immagine_condivisione.up,
    down: migration_20261116_074854_immagine_condivisione.down,
    name: '20261116_074854_immagine_condivisione',
  },
  {
    up: migration_20261116_081143_menu_pagine.up,
    down: migration_20261116_081143_menu_pagine.down,
    name: '20261116_081143_menu_pagine',
  },
  {
    up: migration_20261116_082127_sezione_contract.up,
    down: migration_20261116_082127_sezione_contract.down,
    name: '20261116_082127_sezione_contract',
  },
  {
    up: migration_20261116_083258_materiali_colori.up,
    down: migration_20261116_083258_materiali_colori.down,
    name: '20261116_083258_materiali_colori',
  },
  {
    up: migration_20261116_083653_catalogo_categorie.up,
    down: migration_20261116_083653_catalogo_categorie.down,
    name: '20261116_083653_catalogo_categorie',
  },
  {
    up: migration_20261116_084128_heritage.up,
    down: migration_20261116_084128_heritage.down,
    name: '20261116_084128_heritage',
  },
  {
    up: migration_20261116_174732_disegno_quotato_campioni.up,
    down: migration_20261116_174732_disegno_quotato_campioni.down,
    name: '20261116_174732_disegno_quotato_campioni',
  },
  {
    up: migration_20261117_082017_moduli_newsletter_tracciamento.up,
    down: migration_20261117_082017_moduli_newsletter_tracciamento.down,
    name: '20261117_082017_moduli_newsletter_tracciamento'
  },
];
