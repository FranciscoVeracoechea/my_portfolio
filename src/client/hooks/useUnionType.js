// dependencies
import { useState, useEffect } from 'react';
import { union } from 'folktale/adt/union';
import Sequence from '../../shared/Identities/Sequence';


const { Next, Done } = Sequence;


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
      Sequence.of([isLoading, error, data])
        .chain(([x, y, z]) => (x ? Done(State.Loading(x)) : Next([y, z])))
        .chain(([x, y]) => (x ? Done(State.Error(x, y)) : Next(y)))
        .chain(x => Done(State.Success(x)))
        .finally(setState);
    },
    [isLoading, error, data]
  );
  return [state, setState];
};
