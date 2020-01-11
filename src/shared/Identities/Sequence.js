const Done = x => ({
  apply: b2 => b2.map(x),
  chain: _ => Done(x),
  map: _ => Done(x),
  bimap: (doneMap, _nextMap) => Done(doneMap(x)),
  finally: f => f(x),
  get: () => x,
  endWith: _ => Done(x),
  inspect: () => `Sequence.Done(${x})`,
  toString: () => `Sequence.Done(${x})`,
  isNext: false,
  isDone: true,
  type: 'Sequence.Done',
});

const Next = x => ({
  apply: b2 => b2.map(x),
  chain: f => f(x),
  map: f => Next(f(x)),
  bimap: (_doneMap, nextMap) => Next(nextMap(x)),
  get: () => x,
  endWith: f => Done(f(x)),
  finally: () => throw new Error('The Sequence is not Done'),
  inspect: () => `Sequence.Next(${x})`,
  toString: () => `Sequence.Next(${x})`,
  isNext: true,
  isDone: false,
  type: 'Sequence.Next',
});

export default {
  Next,
  Done,
  of: x => Next(x),
  ifElse: x => (x ? Next(x) : Done(null)),
};
