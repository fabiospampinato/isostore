
/* IMPORT */

import backend from '~/backends/browser_memory';
import AbstractStore from '~/stores/abstract';

/* MAIN */

class MemoryStore extends AbstractStore {

  /* CONSTRUCTOR */

  constructor ( id: string ) {

    super ({ id, backend });

  }

}

/* EXPORT */

export default MemoryStore;
