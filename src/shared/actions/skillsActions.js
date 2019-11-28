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
  // DELETE
  deleteCategory: 'DELETE_CATEGORY',
  deleteCategoriPending: 'DELETE_CATEGORY/PENDING',
  deleteCategorySuccess: 'DELETE_CATEGORY/FULFILLED',
  deleteCategoryRejected: 'DELETE_CATEGORY/REJECTED',
};
// read
export const fetchTechnologies = () => ({
  type: actionTypes.fetchTechnologies,
});

export const fetchTechnologiesCanceled = () => ({
  type: actionTypes.fetchTechnologiesCanceled,
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

// delete
export const deleteCategory = (id, index) => ({
  type: actionTypes.deleteCategory,
  payload: {
    promise: request({
      url: `/api/technology/${id}`,
      method: 'DELETE',
    }).pipe(map(({ response }) => response)).toPromise(),
    data: {
      index,
      id,
    },
  },
});
