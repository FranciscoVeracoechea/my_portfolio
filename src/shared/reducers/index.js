// dependencies
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// reducers
import data from './dataReducer';
import device from './deviceReducer';
import auth from './authReducer';


export default history => combineReducers({
  router: connectRouter(history),
  device,
  auth,
  data,
});
