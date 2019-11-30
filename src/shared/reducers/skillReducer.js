// actions
import { actionTypes } from '../actions/skillsActions';
import { switchCase } from '../utils/functional';


const initialState = {
  isLoading: false,
  error: null,
  data: [],
  selectedCategoryId: '',
};

const setError = (state, error) => () => ({
  ...state,
  isLoading: false,
  error,
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
  [actionTypes.fetchTechnologiesRejected]: setError(state, payload),
  [actionTypes.createCategorySuccess]: () => ({
    ...state,
    error: null,
    isLoading: false,
    data: [...state.data, payload.data],
  }),
  [actionTypes.createCategoryRejected]: setError(state, payload),
  [actionTypes.deleteCategoriPending]: () => ({
    ...state,
    data: [
      ...state.data.slice(0, payload.index),
      ...state.data.slice(payload.index + 1),
    ],
  }),
  [actionTypes.updateCategoryPending]: () => ({
    ...state,
    data: [
      ...state.data.slice(0, payload.index),
      payload.data,
      ...state.data.slice(payload.index + 1),
    ],
  }),
  [actionTypes.updateCategoryRejected]: setError(state, payload),
  [actionTypes.deleteCategoryRejected]: setError(state, payload),
  [actionTypes.setSelectedCategory]: () => ({
    ...state,
    selectedCategoryId: payload.id,
  }),
})(state)(type);
