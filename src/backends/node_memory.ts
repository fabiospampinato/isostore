
/* IMPORT */

import type {Backend} from '~/types';

/* MAIN */

const MemoryBackend: Backend = {
  read: () => {
    return [];
  },
  write: () => {
    return;
  }
};

/* EXPORT */

export default MemoryBackend;
