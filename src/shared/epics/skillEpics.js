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
  fetchTechnologiesRejected, actionTypes,
} from '../actions/skillsActions';


const fetchDataEpic = action$ => action$.pipe(
  ofType(actionTypes.fetchTechnologies),
  mergeMap(() => request({
    url: '/api/technology',
    method: 'GET',
  }).pipe(
    map(({ response }) => ({
      type: actionTypes.fetchTechnologiesSuccess,
      payload: response,
    })),
    catchError(error => of(fetchTechnologiesRejected(error))),
    takeUntil(action$.pipe(
      ofType(actionTypes.fetchTechnologiesCanceled)
    ))
  ))
);

export default fetchDataEpic;
