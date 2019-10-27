export const actionTypes = {
  setUADevice: 'SET_DEVICE_BY_USER_AGENT',
  resolutionKind: 'SET_DEVICE_BY_RESOLUTION',
};

export const setUADevice = payload => ({
  type: actionTypes.setUADevice,
  payload,
});


export const resolutionKind = payload => ({
  type: actionTypes.resolutionKind,
  payload,
});
