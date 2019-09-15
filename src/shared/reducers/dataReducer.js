import { actionTypes } from '../actions/dataActions';
import { getErrors } from '../utils/functional';


const initialState = {
  loading: false,
  error: null,
  data: null,
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.fetchData:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.loginRejected:
      return getErrors(initialState)(payload);

    case actionTypes.fetchDataSucess:
      return {
        errors: null,
        loading: false,
        data: payload.data,
      };

    case actionTypes.fetchDataCanceled:
      return {
        ...state,
        error: null,
        loading: false,
      };

    default:
      return state;
  }
};
