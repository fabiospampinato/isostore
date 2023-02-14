
/* IMPORT */

import whenExit from 'when-exit';
import type {Callback} from '~/types';

/* MAIN */

// It schedules functions to be called in the next microtask, or right before the process exits, providing some form of batching

class Scheduler {

  /* VARIABLES */

  private callbacks: Set<Callback> = new Set ();
  private scheduled: boolean = false;

  /* CONSTRUCTOR */

  constructor () {

    whenExit ( this.flush );

  }

  /* API */

  flush = (): void => {

    if ( !this.callbacks.size ) return;

    const callbacks = Array.from ( this.callbacks );

    this.callbacks.clear ();

    for ( const callback of callbacks ) {

      callback ();

    }

  }

  wrap = ( callback: Callback ): Callback => {

    return (): void => {

      this.callbacks.add ( callback );

      if ( this.scheduled ) return;

      this.scheduled = true;

      queueMicrotask ( () => {

        this.scheduled = false;

        this.flush ();

      });

    };

  }

}

/* EXPORT */

export default Scheduler;
