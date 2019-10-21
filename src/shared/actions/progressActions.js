export const actionTypes = {
  updateProgressValue: 'UPDATE_PROGRESS_VALUE',
  setShowProgress: 'SET_SHOW_PROGRESS',
};

export const updateProgress = (value, variant) => ({
  type: actionTypes.updateProgressValue,
  payload: { value, variant },
});

export const setShowProgress = (value, variant) => ({
  type: actionTypes.setShowProgress,
  payload: { value, variant },
});
