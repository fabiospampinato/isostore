
/* MAIN */

type Entry = readonly [
  key: string,
  value: string
];

type Backend = {
  read ( id: string ): readonly Entry[],
  write ( id: string, data: IterableIterator<Entry> ): void
};

type Options = {
  id: string,
  backend: Backend
};

/* EXPORT */

export type {Entry, Backend, Options};
