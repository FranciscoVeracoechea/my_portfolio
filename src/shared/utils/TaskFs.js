import fs from 'fs';
import { task } from 'folktale/concurrency/task';
// Identity
import TaskResolver from '../Identities/TaskResolver';

// helper
const cancellFn = s => () => s.map(x => ({ ...x, cancelled: true }));

/**
 * @category File System
 * @param {string} path path to the file.
 * @param {any} data information that will be written in the file.
 * @returns Task<string>.
 */
export const writeFile = (path, data) => task((resolver) => {
  const state = TaskResolver().map(x => ({ ...x, path, data }));

  resolver.cleanup(() => {});
  resolver.onCancelled(cancellFn(state));

  return fs.writeFile(
    path, data, { encoding: 'utf8', flag: 'w+' },
    error => state
      .map(x => ({ ...x, error }))
      .isRejected(resolver.reject)
      .isResolved(x => resolver.resolve(x))
  );
});

/**
 * @category File System
 * @param {string} path path to the file.
 * @returns Task<string>.
 */
export const readFile = path => task((resolver) => {
  const state = TaskResolver();
  resolver.cleanup(() => {});
  resolver.onCancelled(cancellFn(state));

  return fs.readFile(
    path, { encoding: 'utf8' },
    (error, data) => state
      .map(x => ({ ...x, error, data }))
      .isRejected(resolver.reject)
      .isResolved(x => resolver.resolve(x.data))
  );
});

/**
 * @category File System
 * @param {string} path path to the file.
 * @returns Task<string>.
 */
export const deleteFile = path => task((resolver) => {
  const state = TaskResolver();
  resolver.cleanup(() => {});
  resolver.onCancelled(cancellFn(state));

  return fs.unlink(
    path,
    error => state
      .map(x => ({ ...x, error }))
      .isRejected(resolver.reject)
      .isResolved(x => resolver.resolve(x))
  );
});
