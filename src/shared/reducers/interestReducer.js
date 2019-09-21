import { actionTypes } from '../actions/interestActions';
import { getErrors } from '../utils/functional';
import humanize from '../utils/humanize';


const initialState = {
  loading: false,
  error: null,
  data: [],
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.fetchInterest:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.fetchInterestSuccess:
      return {
        errors: null,
        loading: false,
        data: payload.data.map(({ createdAt, ...rest }) => ({
          ...rest,
          createdAt: humanize(createdAt),
        })),
      };

    case actionTypes.fetchInterestCanceled:
      return {
        ...state,
        error: null,
        loading: false,
      };

    case actionTypes.createInterestPending:
      return {
        ...state,
        loading: true,
      };

    case actionTypes.createInterestSuccess:
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

    case actionTypes.updateInterestPending:
      return {
        ...state,
        loading: true,
        data: [
          ...state.data.slice(0, payload.index),
          payload.data,
          ...state.data.slice(payload.index + 1),
        ],
      };

    case actionTypes.updateInterestSuccess:
      return {
        ...state,
        errors: null,
        loading: false,
      };

    case actionTypes.deleteInterestPending:
      return {
        ...state,
        loading: true,
        data: [
          ...state.data.slice(0, payload.index),
          ...state.data.slice(payload.index + 1),
        ],
      };

    case actionTypes.deleteInterestSuccess:
      return {
        ...state,
        errors: null,
        loading: false,
      };

    case actionTypes.fetchInterestRejected:
    case actionTypes.createInterestRejected:
    case actionTypes.updateInterestRejected:
    case actionTypes.deleteInterestRejected:
      return getErrors(initialState)(payload);

    default:
      return state;
  }
};
