
/* IMPORT */

import backend from '~/backends/browser_local';
import AbstractStore from '~/stores/abstract';

/* MAIN */

class LocalStore extends AbstractStore {

  /* CONSTRUCTOR */

  constructor ( id: string ) {

    super ({ id, backend });

  }

}

/* EXPORT */

export default LocalStore;
