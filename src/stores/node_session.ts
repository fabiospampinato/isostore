
/* IMPORT */

import backend from '~/backends/node_session';
import AbstractStore from '~/stores/abstract';

/* MAIN */

class SessionStore extends AbstractStore {

  /* CONSTRUCTOR */

  constructor ( id: string ) {

    super ({ id, backend });

  }

}

/* EXPORT */

export default SessionStore;
