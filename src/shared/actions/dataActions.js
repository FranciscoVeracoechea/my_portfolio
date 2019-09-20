import {
  map,
} from 'rxjs/operators';
// request helper
import request from '../utils/Request';


export const actionTypes = {
  fetchData: 'FETCH_DATA',
  fetchRejected: 'FETCH_DATA_REJECTED',
  fetchDataSuccess: 'FETCH_DATA_SUCCESS',
  fetchDataCanceled: 'FETCH_DATA_CANCELED',
  createData: 'CREATE_DATA',
  createDataPending: 'CREATE_DATA/PENDING',
  createSuccess: 'CREATE_DATA/FULFILLED',
  createRejected: 'CREATE_DATA/REJECTED',
  updateData: 'UPDATE_DATA',
  updateDataPending: 'UPDATE_DATA/PENDING',
  updateDataSuccess: 'UPDATE_DATA/SUCCESS',
  updateDataRejected: 'UPDATE_DATA/REJECTED',
  deleteData: 'DELETE_DATA',
  deleteDataPending: 'DELETE_DATA/PENDING',
  deleteDataSuccess: 'DELETE_DATA/SUCCESS',
  deleteDataRejected: 'DELETE_DATA/REJECTED',
};

// show
export const fetchData = (category = null, id = null) => ({
  type: actionTypes.fetchData,
  payload: { category, id },
});

export const fetchRejected = ({ response }) => ({
  type: actionTypes.fetchRejected,
  payload: response,
});

export const fetchDataSuccess = ({ data }) => ({
  type: actionTypes.fetchDataSuccess,
  payload: { data },
});

export const fetchDataCanceled = () => ({
  type: actionTypes.fetchDataCanceled,
});
// create
export const createData = body => ({
  type: actionTypes.createData,
  payload: request({
    url: '/api/data',
    method: 'POST',
    body,
  }).pipe(map(({ response }) => response)).toPromise(),
});


// update
export const updateData = ({
  _id, createdAt, updatedAt, ...body
}, index) => ({
  type: actionTypes.updateData,
  payload: {
    promise: request({
      url: `/api/data/${_id}`,
      method: 'PUT',
      body,
    }).pipe(
      map(({ response }) => response)
    ).toPromise(),
    data: {
      data: {
        _id, createdAt, updatedAt, ...body,
      },
      index,
    },
  },
});

// delete
export const deleteData = (id, index) => {
  console.log(id, index);
  return {
    type: actionTypes.deleteData,
    payload: {
      promise: request({
        url: `/api/data/${id}`,
        method: 'DELETE',
      }).pipe(
        map(({ response }) => response)
      ).toPromise(),
      data: {
        index,
      },
    },
  };
};
