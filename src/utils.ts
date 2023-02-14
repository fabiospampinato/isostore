
/* MAIN */

const attempt = <T, U> ( fn: () => T, fallback: U ): T | U => {

  try {

    return fn ();

  } catch {

    return fallback;

  }

};

const noop = (): void => {

  return;

};

/* EXPORT */

export {attempt, noop};
