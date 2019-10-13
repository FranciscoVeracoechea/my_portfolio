// Dependencies
import { combineEpics } from 'redux-observable';
// epics
import * as authEpic from './authEpic';
import dataEpic from './dataEpic';
import interestEpic from './interestEpic';
import * as fileEpics from './fileEpics';


export default combineEpics(
  ...Object.values(authEpic),
  dataEpic,
  interestEpic,
  ...Object.values(fileEpics),
);
