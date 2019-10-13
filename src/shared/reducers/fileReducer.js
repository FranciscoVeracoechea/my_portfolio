import { actionTypes } from '../actions/fileActions';
import { getErrors } from '../utils/functional';


const initialState = {
  data: [],
  loading: false,
  error: null,
};


export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.sendFileSuccess:
      return {
        ...state,
        loading: false,
        data: [
          ...state.data,
          payload.data,
        ],
        error: null,
      };

    case actionTypes.fetchFiles:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.fetchFilesSuccess:
      return {
        error: null,
        loading: false,
        data: payload.data,
      };

    case actionTypes.deleteFilePending:
      return {
        ...state,
        error: null,
        data: [
          ...state.data.slice(0, payload.index),
          ...state.data.slice(payload.index + 1),
        ],
      };

    case actionTypes.sendFileError:
    case actionTypes.deleteFileError:
      return getErrors(initialState)(payload);

    case actionTypes.sendFileCanceled:
      return initialState;

    default:
      return state;
  }
};
