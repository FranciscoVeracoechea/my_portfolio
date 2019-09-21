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
  fetchInterestSuccess, fetchInterestRejected, actionTypes,
} from '../actions/interestActions';


const fetchInterestEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchInterest),
  mergeMap(_ => request({
    url: '/api/interest',
    method: 'GET',
  }).pipe(
    map(({ response }) => fetchInterestSuccess(response)),
    catchError(error => of(fetchInterestRejected(error))),
    takeUntil(action$.pipe(
      ofType(actionTypes.fetchInterestCanceled)
    ))
  ))
);

export default fetchInterestEpic;
