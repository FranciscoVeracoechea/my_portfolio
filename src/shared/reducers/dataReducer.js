import { actionTypes } from '../actions/dataActions';
import { getErrors } from '../utils/functional';
import humanize from '../utils/humanize';


const initialState = {
  loading: true,
  error: null,
  data: [],
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.fetchData:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.fetchDataSuccess:
      return {
        errors: null,
        loading: false,
        data: payload.data.map(({ createdAt, ...rest }) => ({
          ...rest,
          createdAt: humanize(createdAt),
        })),
      };

    case actionTypes.fetchDataCanceled:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case actionTypes.createDataPending:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.createSuccess:
      return {
        ...state,
        errors: null,
        loading: false,
        data: [
          ...state.data,
          {
            ...payload.data,
            createdAt: humanize(payload.data.createdAt),
          },
        ],
      };

    case actionTypes.updateDataPending:
      return {
        ...state,
        loading: true,
        data: [
          ...state.data.slice(0, payload.index),
          payload.data,
          ...state.data.slice(payload.index + 1),
        ],
      };

    case actionTypes.updateDataSuccess:
      return {
        ...state,
        errors: null,
        loading: false,
      };

    case actionTypes.deleteDataPending:
      return {
        ...state,
        loading: true,
        data: [
          ...state.data.slice(0, payload.index),
          ...state.data.slice(payload.index + 1),
        ],
      };

    case actionTypes.deleteDataSuccess:
      return {
        ...state,
        errors: null,
        loading: false,
      };

    case actionTypes.loginRejected:
    case actionTypes.createRejected:
    case actionTypes.updateDataRejected:
    case actionTypes.deleteDataRejected:
      return getErrors(initialState)(payload);

    default:
      return state;
  }
};
