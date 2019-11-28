// dependencies
import { useState, useEffect } from 'react';
import { union } from 'folktale/adt/union';
import Result from 'folktale/result';


const { Ok, Error } = Result;

export const State = union('State', {
  Default() { return {}; },
  Loading() { return {}; },
  Error(error, data) { return { error, data }; },
  Success(data) { return { data }; },
});

export const useUnionType = ({ isLoading, data, error }) => {
  const [state, setState] = useState(State.Default());

  useEffect(
    () => {
      const fn = Result.of(({ values, type }) => setState(State[type](...values)));
      Result.of([isLoading, error, data])
        .chain(([x, y, z]) => (x ? Error({ values: [x], type: 'Loading' }) : Ok([y, z])))
        .chain(([x, y]) => (x ? Error({ values: [x, y], type: 'Error' }) : Ok(y)))
        .chain(x => Error({ values: [x], type: 'Success' }))
        .fold(
          x => fn.apply(Ok(x)),
          x => fn.apply(Ok(x))
        );
    },
    [isLoading, error, data]
  );
  return [state, setState];
};
