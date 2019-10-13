import { actionTypes } from '../actions/progressActions';


const initialState = {
  percent: 0,
  show: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.updateProgressValue:
      return {
        ...state,
        percent: payload.value,
      };

    case actionTypes.setShowProgress:
      return {
        ...state,
        show: payload.value,
      };

    default:
      return state;
  }
}
