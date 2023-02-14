
/* IMPORT */

import type {Backend} from '~/types';

/* MAIN */

const LocalBackend: Backend = {
  read: id => {
    return JSON.parse ( localStorage.getItem ( id ) || '[]' );
  },
  write: ( id, data ) => {
    return localStorage.setItem ( id, JSON.stringify ( Array.from ( data ) ) );
  }
};

/* EXPORT */

export default LocalBackend;
