// actions
import { actionTypes } from '../actions/skillsActions';
import { switchCase } from '../utils/functional';


const initialState = {
  isLoading: false,
  error: null,
  data: [],
};

const setErrors = (state, payload) => () => ({
  ...state,
  error: payload.errors || payload.message || payload.error.message,
});


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
  [actionTypes.fetchTechnologiesRejected]: setErrors(state, payload),
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
  [actionTypes.deleteCategoriPending]: () => ({
    ...state,
    data: [
      ...state.data.slice(0, payload.index),
      ...state.data.slice(payload.index + 1),
    ],
  }),
  [actionTypes.deleteCategoryRejected]: setErrors(state, payload),
})(state)(type);
