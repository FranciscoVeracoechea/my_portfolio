import {
  map,
} from 'rxjs/operators';
// request helper
import request from '../utils/Request';


export const actionTypes = {
  // create
  createData: 'CREATE_DATA',
  createDataPending: 'CREATE_DATA/PENDING',
  createSuccess: 'CREATE_DATA/FULFILLED',
  createRejected: 'CREATE_DATA/REJECTED',
  // read
  fetchData: 'FETCH_DATA',
  fetchRejected: 'FETCH_DATA_REJECTED',
  fetchDataSuccess: 'FETCH_DATA_SUCCESS',
  fetchDataCanceled: 'FETCH_DATA_CANCELED',
  // update
  updateData: 'UPDATE_DATA',
  updateDataPending: 'UPDATE_DATA/PENDING',
  updateDataSuccess: 'UPDATE_DATA/FULFILLED',
  updateDataRejected: 'UPDATE_DATA/REJECTED',
  // delete
  deleteData: 'DELETE_DATA',
  deleteDataPending: 'DELETE_DATA/PENDING',
  deleteDataSuccess: 'DELETE_DATA/FULFILLED',
  deleteDataRejected: 'DELETE_DATA/REJECTED',
};

// show
export const fetchData = (category = null, id = null) => ({
  type: actionTypes.fetchData,
  payload: { category, id },
});

export const fetchRejected = payload => ({
  type: actionTypes.fetchRejected,
  payload,
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
export const deleteData = (id, index) => ({
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
});
