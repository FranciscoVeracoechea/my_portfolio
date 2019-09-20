// dependencies
import { ofType } from 'redux-observable';
import {
  mergeMap, map, catchError, takeUntil,
} from 'rxjs/operators';
import { of } from 'rxjs';
// request helper
import request from '../utils/Request';
// actions
import {
  fetchDataSuccess, fetchRejected, actionTypes,
} from '../actions/dataActions';


export const fetchDataEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchData),
  mergeMap(_ => request({
    url: '/api/data',
    method: 'GET',
  }).pipe(
    map(({ response }) => fetchDataSuccess(response)),
    catchError(error => of(fetchRejected(error))),
    takeUntil(action$.pipe(
      ofType(actionTypes.fetchDataCanceled)
    ))
  ))
);

// export const createDataEpic = action$ => action$.pipe(
//   ofType(actionTypes.fetchData),
//   mergeMap(action => request({
//     url: '/api/data',
//     method: 'POST',
//     body: action.payload,
//   }).pipe(
//     map(({ response }) => fetchDataSuccess(response)),
//     catchError(error => of(fetchRejected(error))),
//   )),
// );
