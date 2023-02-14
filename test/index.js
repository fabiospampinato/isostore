
/* IMPORT */

import {describe} from 'fava';
import {LocalStore, MemoryStore, SessionStore} from '../dist/node.js';

/* MAIN */

//TODO: Write these tests better, it's kinda tricky to test everything with the exposed API

describe ( 'IsoStore', it => {

  for ( const Store of [LocalStore, MemoryStore, SessionStore] ) {

    it ( Store.name, t => {

      // Instantiation

      const id = `isostore-${Math.random ().toString ( 36 ).slice ( 2 )}`;
      const store = new Store ( id );

      t.true ( store instanceof Map );
      t.is ( store.size, 0 );

      // Get

      t.is ( store.has ( 'foo' ), false );
      t.is ( store.get ( 'foo' ), undefined );

      // Set

      store.set ( 'foo', 'foo_value' );
      store.set ( 'bar', 'bar_value' );

      t.is ( store.size, 2 );
      t.is ( store.has ( 'foo' ), true );
      t.is ( store.get ( 'foo' ), 'foo_value' );

      // Keys

      t.deepEqual ( Array.from ( store.keys () ), ['foo', 'bar'] );

      // Values

      t.deepEqual ( Array.from ( store.values () ), ['foo_value', 'bar_value'] );

      // Delete

      store.delete ( 'foo' );

      t.is ( store.size, 1 );
      t.is ( store.has ( 'foo' ), false );
      t.is ( store.get ( 'foo' ), undefined );

      // Clear

      store.clear ();

      t.is ( store.size, 0 );
      t.is ( store.has ( 'bar' ), false );
      t.is ( store.get ( 'bar' ), undefined );

      // Shared instance

      store.set ( 'foo', 'foo_value' );
      store.set ( 'bar', 'bar_value' );

      const store2 = new Store ( id );

      t.is ( store2.size, 2 );
      t.is ( store2.has ( 'foo' ), true );
      t.is ( store2.get ( 'foo' ), 'foo_value' );
      t.is ( store, store2 );

      store2.set ( 'baz', 'baz_value' );

      t.is ( store.size, 3 );
      t.is ( store.has ( 'baz' ), true );
      t.is ( store.get ( 'baz' ), 'baz_value' );

      t.is ( store2.size, 3 );
      t.is ( store2.has ( 'baz' ), true );
      t.is ( store2.get ( 'baz' ), 'baz_value' );

      // Invalid name

      try {

        new Store ( '👍' );

        t.fail ();

      } catch {

        t.pass ();

      }

    });

  }

});
