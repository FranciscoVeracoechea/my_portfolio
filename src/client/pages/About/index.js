import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import {
  merge, of,
} from 'rxjs';
import {
  map, catchError,
} from 'rxjs/operators';
// Component
import About from './About';
// actions
import {
  fetchDataSuccess, fetchRejected, fetchData,
} from '../../../shared/actions/dataActions';
import {
  fetchInterest, fetchInterestSuccess, fetchInterestRejected,
} from '../../../shared/actions/interestActions';
import { actionTypes, fetchProfilePicture, fetchFiles } from '../../../shared/actions/fileActions';
// utils
import request from '../../../shared/utils/Request';


const mapStateToProps = ({
  data, interest, file,
}) => ({
  data,
  interest,
  file,
});

const mapDispatchToProps = {
  goBack,
  fetchData,
  fetchInterest,
  fetchProfilePicture,
  fetchFiles,
};

About.initialAction = () => merge(
  request({
    url: '/api/data',
    method: 'GET',
  }).pipe(
    map(({ response }) => fetchDataSuccess(response)),
    catchError(error => of(fetchRejected(error))),
  ),
  request({
    url: '/api/interest',
    method: 'GET',
  }).pipe(
    map(({ response }) => fetchInterestSuccess(response)),
    catchError(error => of(fetchInterestRejected(error))),
  ),
  request({
    url: '/api/file',
    method: 'GET',
  }).pipe(
    map(({ response }) => ({
      type: actionTypes.fetchFilesSuccess,
      payload: response,
    })),
    catchError(error => of({
      type: actionTypes.fetchFilesRejected,
      payload: error,
    }))
  )
);

export default connect(mapStateToProps, mapDispatchToProps)(About);
