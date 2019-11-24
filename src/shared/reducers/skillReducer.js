// actions
import { actionTypes } from '../actions/skillsActions';
import { switchCase } from '../utils/functional';


const initialState = {
  isLoading: false,
  error: null,
  data: [],
};


export default (state = initialState, { type, payload }) => switchCase({
  [actionTypes.fetchTechnologies]: () => ({
    ...initialState,
    isLoading: true,
  }),
  [actionTypes.fetchTechnologiesSuccess]: () => ({
    ...state,
    isLoading: false,
    data: payload.data,
  }),
  [actionTypes.fetchTechnologiesCanceled]: initialState,
  [actionTypes.fetchTechnologiesRejected]: () => ({
    ...state,
    error: payload.errors || payload.message || payload.error.message,
  }),
  [actionTypes.createCategorySuccess]: () => ({
    ...state,
    error: null,
    isLoading: false,
    data: [...state.data, payload.data],
  }),
  [actionTypes.createCategoryRejected]: () => ({
    ...state,
    isLoading: false,
    error: payload,
  }),
})(state)(type);
