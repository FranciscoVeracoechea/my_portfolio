import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
import {
  merge, of,
} from 'rxjs';
import {
  map, catchError,
} from 'rxjs/operators';
// Component
import Skills from './index.jsx';
// actions
import {
  fetchFiles, fetchCanceled, actionTypes,
} from '../../../shared/actions/fileActions';
// actions
import {
  fetchDataSuccess, fetchRejected, fetchData,
} from '../../../shared/actions/dataActions';
// utils
import request from '../../../shared/utils/Request';


const mapStateToProps = ({
  file, data,
}) => ({
  file,
  data,
});

const mapDispatchToProps = {
  goBack, fetchFiles, fetchCanceled, fetchData,
};

Skills.initialAction = () => merge(
  request({
    url: '/api/data',
    method: 'GET',
  }).pipe(
    map(({ response }) => fetchDataSuccess(response)),
    catchError(error => of(fetchRejected(error))),
  ),
  request({
    url: '/api/file/',
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

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
