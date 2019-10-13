export const actionTypes = {
  updateProgressValue: 'UPDATE_PROGRESS_VALUE',
  setShowProgress: 'SET_SHOW_PROGRESS',
};

export const updateProgress = value => ({
  type: actionTypes.updateProgressValue,
  payload: { value },
});

export const setShowProgress = value => ({
  type: actionTypes.setShowProgress,
  payload: { value },
});
