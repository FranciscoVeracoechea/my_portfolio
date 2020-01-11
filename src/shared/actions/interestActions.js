import {
  map,
} from 'rxjs/operators';
// request helper
import request from '../utils/Request';


export const actionTypes = {
  // create
  createInterest: 'CREATE_INTEREST',
  createInterestPending: 'CREATE_INTEREST/PENDING',
  createInterestSuccess: 'CREATE_INTEREST/FULFILLED',
  createInterestRejected: 'CREATE_INTEREST/REJECTED',
  // read
  fetchInterest: 'FETCH_INTEREST',
  fetchInterestRejected: 'FETCH_INTEREST_REJECTED',
  fetchInterestSuccess: 'FETCH_INTEREST_SUCCESS',
  fetchInterestCanceled: 'FETCH_INTEREST_CANCELED',
  // update
  updateInterest: 'UPDATE_INTEREST',
  updateInterestPending: 'UPDATE_INTEREST/PENDING',
  updateInterestSuccess: 'UPDATE_INTEREST/FULFILLED',
  updateInterestRejected: 'UPDATE_INTEREST/REJECTED',
  // delete
  deleteInterest: 'DELETE_INTEREST',
  deleteInterestPending: 'DELETE_INTEREST/PENDING',
  deleteInterestSuccess: 'DELETE_INTEREST/FULFILLED',
  deleteInterestRejected: 'DELETE_INTEREST/REJECTED',
};

// create
export const createInterest = body => ({
  type: actionTypes.createInterest,
  payload: request({
    url: '/api/interest',
    method: 'POST',
    body,
  }).pipe(map(({ response }) => response)).toPromise(),
});

// read
export const fetchInterest = (category = null, id = null) => ({
  type: actionTypes.fetchInterest,
  payload: { category, id },
});

export const fetchInterestRejected = payload => ({
  type: actionTypes.fetchInterestRejected,
  payload,
});

export const fetchInterestSuccess = ({ data }) => ({
  type: actionTypes.fetchInterestSuccess,
  payload: { data },
});

export const fetchInterestCanceled = () => ({
  type: actionTypes.fetchInterestCanceled,
});

// update
export const updateInterest = ({
  _id, createdAt, updatedAt, ...body
}, index) => ({
  type: actionTypes.updateInterest,
  payload: {
    promise: request({
      url: `/api/interest/${_id}`,
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
export const deleteInterest = (id, index) => ({
  type: actionTypes.deleteInterest,
  payload: {
    promise: request({
      url: `/api/interest/${id}`,
      method: 'DELETE',
    }).pipe(
      map(({ response }) => response)
    ).toPromise(),
    data: {
      index,
    },
  },
});
