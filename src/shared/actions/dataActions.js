export const actionTypes = {
  fetchData: 'FETCH_DATA',
  fetchRejected: 'FETCH_DATA_REJECTED',
  fetchDataSucess: 'FETCH_DATA_SUCCESS',
  fetchDataCanceled: 'FETCH_DATA_CANCELED',
};

export const fetchData = ({ category = null, id = null }) => ({
  type: actionTypes.fetchData,
  payload: { category, id },
});

export const fetchRejected = ({ response }) => ({
  type: actionTypes.fetchRejected,
  payload: response,
});

export const fetchDataSucess = ({ data }) => ({
  type: actionTypes.fetchDataSucess,
  payload: { data },
});

export const fetchDataCanceled = () => ({
  type: actionTypes.fetchDataCanceled,
});
