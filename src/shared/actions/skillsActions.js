import {
  map,
} from 'rxjs/operators';
// request helper
import request from '../utils/Request';


export const actionTypes = {
  // READ
  fetchTechnologies: 'FETCH_TECHNOLOGIES',
  fetchTechnologiesSuccess: 'FETCH_TECHNOLOGIES_SUCCESS',
  fetchTechnologiesRejected: 'FETCH_TECHNOLOGIES_REJECTED',
  fetchTechnologiesCanceled: 'FETCH_TECHNOLOGIES_CANCELED',
  // CREATE
  createCategory: 'CREATE_CATEGORY',
  createCategorySuccess: 'CREATE_CATEGORY/FULFILLED',
  createCategoryRejected: 'CREATE_CATEGORY/REJECTED',
};
// read
export const fetchTechnologies = () => ({
  type: actionTypes.fetchTechnologies,
});

export const fetchTechnologiesRejected = ({ response }) => ({
  type: actionTypes.fetchRejected,
  payload: response,
});

// create
export const createCategory = body => ({
  type: actionTypes.createCategory,
  payload: request({
    url: '/api/technology',
    method: 'POST',
    body,
  }).pipe(map(({ response }) => response)).toPromise(),
});
