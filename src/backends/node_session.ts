
/* IMPORT */

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import type {Backend} from '~/types';

/* HELPERS */

const TEMP_PATH = os.tmpdir ();

/* MAIN */

const SessionBackend: Backend = {
  read: id => {
    const filePath = path.join ( TEMP_PATH, `isostore_${id}.json` );
    const content = fs.readFileSync ( filePath, 'utf8' );
    return JSON.parse ( content );
  },
  write: ( id, data ) => {
    const filePath = path.join ( TEMP_PATH, `isostore_${id}.json` );
    const content = JSON.stringify ( Array.from ( data ) );
    return fs.writeFileSync ( filePath, content );
  }
};

/* EXPORT */

export default SessionBackend;
