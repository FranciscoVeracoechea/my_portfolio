import { actionTypes } from '../actions/interestActions';
import { geterror } from '../utils/functional';
import humanize from '../utils/humanize';


const initialState = {
  loading: true,
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
        error: null,
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
        error: null,
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
        error: null,
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
        error: null,
        loading: false,
      };

    case actionTypes.fetchInterestRejected:
    case actionTypes.createInterestRejected:
    case actionTypes.updateInterestRejected:
    case actionTypes.deleteInterestRejected:
      return {
        ...state,
        loading: false,
        errors: payload?.error || payload?.message || payload?.error?.message,
      };

    default:
      return state;
  }
};
