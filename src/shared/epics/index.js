// Dependencies
import { combineEpics } from 'redux-observable';
// epics
import * as authEpic from './authEpic';
import dataEpic from './dataEpic';
import interestEpic from './interestEpic';
import * as fileEpics from './fileEpics';
import skillEpics from './skillEpics';


export default combineEpics(
  ...Object.values(authEpic),
  dataEpic,
  interestEpic,
  skillEpics,
  ...Object.values(fileEpics),
);
