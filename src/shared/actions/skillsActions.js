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
  //  ----------
  updateSkill: 'UPDATE_SKILL',
  updateSkillPending: 'UPDATE_SKILL/PENDING',
  updateSkillFulFilled: 'UPDATE_SKILL/FULFILLED',
  updateSkillRejected: 'UPDATE_SKILL/REJECTED',
  // DELETE
  deleteCategory: 'DELETE_CATEGORY',
  deleteCategoriPending: 'DELETE_CATEGORY/PENDING',
  deleteCategorySuccess: 'DELETE_CATEGORY/FULFILLED',
  deleteCategoryRejected: 'DELETE_CATEGORY/REJECTED',
  //  ----------------
  deleteSkill: 'DELETE_SKILL',
  deleteSkillPending: 'DELETE_SKILL/PENDING',
  deleteSkillSuccess: 'DELETE_SKILL/FULFILLED',
  deleteSkillRejected: 'DELETE_SKILL/REJECTED',
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
export const fetchTechnologies = (populate = false) => ({
  type: actionTypes.fetchTechnologies,
  payload: { populate },
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

export const updateSkill = (categoryId, categoryIndex, skillId, skillIndex, newData) => ({
  type: actionTypes.updateSkill,
  payload: {
    promise: request({
      url: `/api/technology/category/${categoryId}/tech/${skillId}`,
      method: 'PUT',
      body: newData,
    }).pipe(map(({ response }) => response)).toPromise(),
    data: {
      categoryId, categoryIndex, skillId, skillIndex, newData,
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

export const deleteSkill = (categoryId, categoryIndex, skillId, skillIndex) => ({
  type: actionTypes.deleteSkill,
  payload: {
    promise: request({
      url: `/api/technology/category/${categoryId}/tech/${skillId}`,
      method: 'DELETE',
    }).pipe(map(({ response }) => response)).toPromise(),
    data: {
      categoryId, categoryIndex, skillId, skillIndex,
    },
  },
});
