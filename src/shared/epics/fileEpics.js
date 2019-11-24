// dependencies
import { ofType } from 'redux-observable';
import {
  mergeMap, map, catchError, takeUntil, switchMap, delay,
} from 'rxjs/operators';
import {
  of, iif,
} from 'rxjs';
// request helper
import request from '../utils/Request';
// actions
import {
  actionTypes,
} from '../actions/fileActions';

import {
  updateProgress, setShowProgress,
} from '../actions/progressActions';

// Math.ceil((loaded * 100) / total);
// const progress$ = new Subject()
//   .subscribe(({ loaded, total }) => console.info(Math.ceil((loaded * 100) / total)));

export const fetchFileEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchFiles),
  mergeMap(() => request({
    url: '/api/file',
    method: 'GET',
  }).pipe(
    map(({ response }) => ({
      type: actionTypes.fetchFilesSuccess,
      payload: response,
    })),
    catchError(error => of({
      type: actionTypes.fetchFilesRejected,
      payload: error,
    })),
    takeUntil(action$.pipe(
      ofType(actionTypes.fetchFilesCanceled)
    ))
  )),
);

export const sendFileEpic = action$ => action$.pipe(
  ofType(actionTypes.sendFile),
  mergeMap(action => request({
    url: '/api/file',
    method: 'POST',
    body: action.payload,
    withProgress: true,
  }).pipe(
    switchMap(data => data.matchWith({
      ProgressEvent: ({ progressEvent }) => of(progressEvent).pipe(
        map(({ loaded, total }) => Math.ceil((loaded * 100) / total)),
        mergeMap(value => iif(
          () => value >= 1 && value <= 100,
          of(updateProgress(value), setShowProgress(true)),
          of(updateProgress(value))
        )),
      ),
      Response: ({ response }) => of({
        type: actionTypes.sendFileSuccess,
        payload: response,
      }).pipe(
        delay(1000),
        mergeMap(a => of(a, setShowProgress(false)))
      ),
    })),
    catchError(error => of({
      type: actionTypes.sendFileError,
      payload: error,
    })),
  ))
);

export const getProfilePicture = action$ => action$.pipe(
  ofType(actionTypes.fetchProfile),
  mergeMap(() => request({
    url: '/api/file/kind/profile',
    method: 'GET',
  }).pipe(
    map(({ response }) => ({
      type: actionTypes.fetchFilesSuccess,
      payload: response,
    })),
    catchError(error => of({
      type: actionTypes.fetchFilesRejected,
      payload: error,
    })),
    takeUntil(action$.pipe(
      ofType(actionTypes.fetchFilesCanceled)
    )),
  ))
);
