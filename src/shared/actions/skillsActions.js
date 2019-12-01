import {
  map,
} from 'rxjs/operators';
// request helper
import request from '../utils/Request';


export const actionTypes = {
  // CREATE
  createCategory: 'CREATE_CATEGORY',
  createCategorySuccess: 'CREATE_CATEGORY/FULFILLED',
  createCategoryRejected: 'CREATE_CATEGORY/REJECTED',
  createSkill: 'CREATE_NEW_SKILL',
  createSkillFulfilled: 'CREATE_NEW_SKILL/FULFILLED',
  createSkillRejected: 'CREATE_NEW_SKILL/REJECTED',
  // READ
  fetchTechnologies: 'FETCH_TECHNOLOGIES',
  fetchTechnologiesSuccess: 'FETCH_TECHNOLOGIES_SUCCESS',
  fetchTechnologiesRejected: 'FETCH_TECHNOLOGIES_REJECTED',
  fetchTechnologiesCanceled: 'FETCH_TECHNOLOGIES_CANCELED',
  // UPDATE
  updateCategory: 'UPDATE_CATEGORY',
  updateCategoryPending: 'UPDATE_CATEGORY/PENDING',
  updateCategoryFulFilled: 'UPDATE_CATEGORY/FULFILLED',
  updateCategoryRejected: 'UPDATE_CATEGORY/REJECTED',
  // DELETE
  deleteCategory: 'DELETE_CATEGORY',
  deleteCategoriPending: 'DELETE_CATEGORY/PENDING',
  deleteCategorySuccess: 'DELETE_CATEGORY/FULFILLED',
  deleteCategoryRejected: 'DELETE_CATEGORY/REJECTED',
  // set selected category
  setSelectedCategory: 'SET_SELECTED_CATEGORY_ID',
};
// create
export const createCategory = body => ({
  type: actionTypes.createCategory,
  payload: request({
    url: '/api/technology',
    method: 'POST',
    body,
  }).pipe(map(({ response }) => response)).toPromise(),
});

export const createSkill = (categoryId, body) => ({
  type: actionTypes.createSkill,
  payload: request({
    url: `/api/technology/${categoryId}`,
    method: 'POST',
    body,
  }).pipe(map(({ response }) => response)).toPromise(),
});
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
// update
export const updateCategory = (index, { _id, technologies: _, ...data }) => ({
  type: actionTypes.updateCategory,
  payload: {
    promise: request({
      url: `/api/technology/${_id}`,
      method: 'PUT',
      body: { _id, ...data },
    }).pipe(map(({ response }) => response)).toPromise(),
    data: {
      index,
      data: {
        _id,
        ...data,
      },
    },
  },
});

export const selecteCategory = id => ({
  type: actionTypes.setSelectedCategory,
  payload: { id },
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
