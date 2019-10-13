// dependencies
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// reducers
import data from './dataReducer';
import device from './deviceReducer';
import auth from './authReducer';
import interest from './interestReducer';
import file from './fileReducer';
import progress from './progressReducer';


export default history => combineReducers({
  router: connectRouter(history),
  device,
  auth,
  data,
  interest,
  file,
  progress,
});
