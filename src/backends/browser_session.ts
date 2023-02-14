
/* IMPORT */

import type {Backend} from '~/types';

/* MAIN */

const SessionBackend: Backend = {
  read: id => {
    return JSON.parse ( sessionStorage.getItem ( id ) || '[]' );
  },
  write: ( id, data ) => {
    return sessionStorage.setItem ( id, JSON.stringify ( Array.from ( data ) ) );
  }
};

/* EXPORT */

export default SessionBackend;
