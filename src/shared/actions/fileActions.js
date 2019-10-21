import {
  map,
} from 'rxjs/operators';
import request from '../utils/Request';


export const actionTypes = {
  fetchFiles: 'FETCH_FILES',
  fetchFilesSuccess: 'FETCH_FILES_SUCCESS',
  fetchFilesRejected: 'FETCH_FILES_REJECTED',
  fetchFilesCanceled: 'FETCH_FILES_CANCELED',
  sendFile: 'SEND_FILE',
  sendFileSuccess: 'SEND_FILE_SUCCESS',
  sendFileRejected: 'SEND_FILE_REJECTED',
  sendFileError: 'SEND_FILE_ERROR',
  sendFileCanceled: 'SEND_FILE_CANCELED',
  updateFile: 'UPDATE_FILE',
  deleteFile: 'DELETE_FILE',
  deleteFilePending: 'DELETE_FILE/PENDING',
  deleteFileError: 'DELETE_FILE/REJECTED',
  fetchProfile: 'FETCH_PROFILE_PICTURE',
};

export const sendFile = payload => ({
  type: actionTypes.sendFile,
  payload,
});

export const fetchFiles = () => ({
  type: actionTypes.fetchFiles,
});

export const fetchCanceled = () => ({
  type: actionTypes.fetchFilesCanceled,
});

export const fetchProfilePicture = () => ({
  type: actionTypes.fetchProfile,
});

// delete
export const deleteFile = (id, index) => ({
  type: actionTypes.deleteFile,
  payload: {
    promise: request({
      url: `/api/file/${id}`,
      method: 'DELETE',
    }).pipe(
      map(({ response }) => response)
    ).toPromise(),
    data: {
      index,
    },
  },
});
