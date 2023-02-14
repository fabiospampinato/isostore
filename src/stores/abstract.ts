
/* IMPORT */

import MemoizationRegistry from 'memoization-registry';
import Scheduler from '~/scheduler';
import {attempt, noop} from '~/utils';
import type {Backend, Options} from '~/types';

/* HELPERS */

const registry = new MemoizationRegistry<[Function, string, Backend], AbstractStore> ();
const scheduler = new Scheduler ();

/* MAIN */

//TODO: Have better error handling than this, perhaps pass the error to a user-provided handler instead
//TODO: Maybe support key-level saving, rather than store-level saving, for much better performance
//TODO: Maybe explore using something like leveldb, for serious-level performance

class AbstractStore extends Map<string, string> {

  /* VARIABLES */

  #save: () => void = noop;

  /* CONSTRUCTOR */

  constructor ( options: Options ) {

    super ();

    return registry.register ( [new.target, options.id, options.backend], () => {

      const {id, backend} = options;

      if ( !/^[a-zA-Z0-9_-]+$/.test ( id ) ) throw new Error ( `Invalid store name: "${id}"` );

      const read = () => attempt ( () => backend.read ( id ), [] );
      const write = scheduler.wrap ( () => attempt ( () => backend.write ( id, this.entries () ), null ) );

      for ( const [key, value] of read () ) {
        super.set ( key, value );
      }

      this.#save = write;

      return this;

    });

  }

  /* API */

  clear (): void {

    if ( !this.size ) return;

    super.clear ();

    this.#save ();

  }

  delete ( key: string ): boolean {

    const deleted = super.delete ( key );

    if ( !deleted ) return false;

    this.#save ();

    return true;

  }

  set ( key: string, value: string ): this {

    const valuePrev = this.get ( key );

    if ( value === valuePrev ) return this;

    super.set ( key, value );

    this.#save ();

    return this;

  }

}

/* EXPORT */

export default AbstractStore;
