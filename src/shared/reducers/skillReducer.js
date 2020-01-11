// actions
import { actionTypes } from '../actions/skillsActions';
import { switchCase } from '../utils/functional';


const initialState = {
  isLoading: false,
  isPopulated: false,
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
    isPopulated: payload.populate,
  }),
  [actionTypes.fetchTechnologiesSuccess]: () => ({
    ...state,
    isLoading: false,
    data: payload.data,
    isPopulated: Boolean(payload.populate),
  }),
  [actionTypes.fetchTechnologiesCanceled]: () => ({
    ...state,
    isLoading: false,
  }),
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
  [actionTypes.deleteSkillPending]: () => ({
    ...state,
    data: [
      ...state.data.slice(0, payload.categoryIndex),
      {
        ...state.data[payload.categoryIndex],
        technologies: [
          ...state.data[payload.categoryIndex].technologies.slice(0, payload.skillIndex),
          ...state.data[payload.categoryIndex].technologies.slice(payload.skillIndex + 1),
        ],
      },
      ...state.data.slice(payload.categoryIndex + 1),
    ],
  }),
  [actionTypes.updateSkillPending]: () => ({
    ...state,
    data: [
      ...state.data.slice(0, payload.categoryIndex),
      {
        ...state.data[payload.categoryIndex],
        technologies: [
          ...state.data[payload.categoryIndex].technologies.slice(0, payload.skillIndex),
          payload.newData,
          ...state.data[payload.categoryIndex].technologies.slice(payload.skillIndex + 1),
        ],
      },
      ...state.data.slice(payload.categoryIndex + 1),
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
  [actionTypes.createSkillFulfilled]: () => ({
    ...state,
    isLoading: false,
    error: null,
    data: state.data.map(category => (
      category._id === payload.categoryId
        ? {
          ...category,
          technologies: [...category.technologies, payload.data],
          skillCount: category.skillCount + 1,
          categoryName: category.name,
        }
        : category
    )),
  }),
})(state)(type);
