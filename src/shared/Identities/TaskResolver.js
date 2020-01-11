const TaskResolver = (x = { error: false, cancelled: false }) => ({
  map: f => TaskResolver(f(x)),
  isRejected: f => (x.error ? TaskResolver(f(x.error)) : TaskResolver(x)),
  isCancelled: f => (x.cancelled ? TaskResolver(f(x)) : TaskResolver(x)),
  isResolved: f => (!x.cancelled || !x.error ? f(x) : x),
  inspect: () => `TaskResolver(${x})`,
  toString: () => `TaskResolver(${x})`,
});


export default TaskResolver;
