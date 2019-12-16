const Done = x => ({
  apply: b2 => b2.map(x),
  chain: _ => Done(x),
  map: _ => Done(x),
  finally: f => f(x),
  get: () => x,
  endWith: _ => Done(x),
  inspect: () => `Sequence.Done(${x})`,
  toString: () => `Sequence.Done(${x})`,
});

const Next = x => ({
  apply: b2 => b2.map(x),
  chain: f => f(x),
  map: f => Next(f(x)),
  get: () => throw new Error('The Sequence is not Done'),
  endWith: f => Done(f(x)),
  finally: () => throw new Error('The Sequence is not Done'),
  inspect: () => `Sequence.Next(${x})`,
  toString: () => `Sequence.Next(${x})`,
});

export default {
  Next,
  Done,
  of: x => Next(x),
  fromNullable: x => (x ? Next(x) : Done(null)),
};
