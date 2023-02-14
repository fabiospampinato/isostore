
/* IMPORT */

import {readFileSync, writeFileSync} from 'atomically';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import type {WriteOptions} from 'atomically/dist/types';
import type {Backend} from '~/types';

/* HELPERS */

const DATA_PATH = ((): string => {

  //URL: https://github.com/sindresorhus/env-paths
  //LICENSE: https://github.com/sindresorhus/env-paths/blob/main/license

  const homePath = os.homedir ();

  if ( process.platform === 'darwin' ) { // macOS

    const appSupportPath = path.join ( homePath, 'Library', 'Application Support' );
    const dataPath = path.join ( appSupportPath, 'IsoStore' );

    return dataPath;

  } else if ( process.platform === 'win32' ) { // Windows

    const localAppPath = process.env['LOCALAPPDATA'] || path.join ( homePath, 'AppData', 'Local' );
    const dataPath = path.join ( localAppPath, 'IsoStore', 'Data' );

    return dataPath;

  } else { // Linux

    const basePath = process.env['XDG_DATA_HOME'] || path.join ( homePath, '.local', 'share' );
    const dataPath = path.join ( basePath, 'IsoStore' );

    return dataPath;

  }

})();

const WRITE_OPTIONS: WriteOptions = {
  encoding: 'utf8',
  chown: false,
  fsyncWait: false,
  mode: false
};

/* MAIN */

const LocalBackend: Backend = {
  read: id => {
    const filePath = path.join ( DATA_PATH, `${id}.json` );
    const content = readFileSync ( filePath, 'utf8' );
    return JSON.parse ( content );
  },
  write: ( id, data ) => {
    const filePath = path.join ( DATA_PATH, `${id}.json` );
    const content = JSON.stringify ( Array.from ( data ) );
    return writeFileSync ( filePath, content, WRITE_OPTIONS );
  }
};

/* EXPORT */

export default LocalBackend;
