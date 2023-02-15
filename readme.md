# IsoStore

A simple isomorphic key-value store with a Map-like API for persisting data.

## Features

- All stores run everywhere, they just have different backends under the hood.
- All stores are not intended for performance-critical use cases, since the entire store is saved when a change is made in it.
- Store saves are batched automatically within a microtask, so performance is not as bad as it could be.
- When instantiating multiple stores of the same type and with the same id you'll actually always receive the same instance back.
- Only alphanumeric store ids are allowed, the library will throw on invalid ids.

## Stores

The following stores are provided:

- `AbstractStore`: A generic store with no backend, for using a custom persistence mechanism.
- `MemoryStore`: An in-memory store, useful if you don't need persistence, but you want to use the same API.
- `LocalStore`: A store for persisting data reliably and indefinitely.
  - Node: it will atomically write a file to disk, in a non-temporary path that depends on your OS.
  - Browser: it will use the `localStorage` API.
- `SessionStore`: A store per persisting data somewhat unreliably and/or not indefinitely.
  - Node: it will non-atomically write a temporary file to disk, which could be deleted at any time.
  - Browser: it will use the `sessionStorage` API.

## Install

```sh
npm install --save isostore
```

## Usage

```ts
import {AbstractStore, LocalStore, MemoryStore, SessionStore} from 'isostore';

// Creating a local store, for indefinite persistence

const store = new LocalStore ( 'my-store' ); // The id of the store decides the name of the file on disk

store.has ( 'foo' ); // => false
store.set ( 'foo', 'some_string' ); // => store
store.get ( 'foo' ); // => 'some_string'
store.delete ( 'foo' ); // => true

// Creating another local store, with the same id

const store2 = new LocalStore ( 'my-store' );

console.log ( store === store2 ); // => true, with 🌈 magic 🌈

// Creating a session store, for temporary persistence

const store3 = new SessionStore ( 'my-store' );

// Creating an in-memory store, for no persistence

const store4 = new MemoryStore ();

// Creating a custom store, with a custom backend

const MY_BACKEND = { // It's important to define this outside of the store class
  read ( id ) {
    // Return a [string, string][]
  },
  write ( id, entries ) {
    // Write the entries somewhere
  }
};

class MyStore extends AbstractStore {
  constructor ( id ) {
    super ({
      id,
      backend: MY_BACKEND
    });
  }
}

const store5 = new MyStore ( 'my-store' );
```

## License

MIT © Fabio Spampinato
