// Dependencies
import { combineEpics } from 'redux-observable';
// epics
import * as authEpic from './authEpic';
import * as dataEpic from './dataEpic';


export default combineEpics(
  ...Object.values(authEpic),
  ...Object.values(dataEpic),
);
