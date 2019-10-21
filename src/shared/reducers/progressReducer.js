import { actionTypes } from '../actions/progressActions';


const initialState = {
  percent: 0,
  show: false,
  variant: 'determinate',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.updateProgressValue:
      return {
        ...state,
        percent: payload.value,
        variant: payload?.variant || 'determinate',
      };

    case actionTypes.setShowProgress:
      return {
        ...state,
        show: payload.value,
        variant: payload?.variant || 'determinate',
      };

    default:
      return state;
  }
}
