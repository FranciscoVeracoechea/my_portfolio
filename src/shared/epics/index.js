// Dependencies
import { combineEpics } from 'redux-observable';
// epics
import * as authEpic from './authEpic';
import dataEpic from './dataEpic';
import interestEpic from './interestEpic';


export default combineEpics(
  ...Object.values(authEpic),
  dataEpic,
  interestEpic
);
