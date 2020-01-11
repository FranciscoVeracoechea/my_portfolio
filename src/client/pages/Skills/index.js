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
import {
  fetchDataSuccess, fetchRejected, fetchData,
} from '../../../shared/actions/dataActions';
import {
  actionTypes as skillActionTypes, fetchTechnologiesRejected,
  fetchTechnologies, fetchTechnologiesCanceled,
} from '../../../shared/actions/skillsActions';
// utils
import request from '../../../shared/utils/Request';


const mapStateToProps = ({
  file, data, skills,
}) => ({
  file,
  data,
  skills: {
    ...skills,
    data: skills.data
      .map(d => Object.assign({}, d))
      .sort((a, b) => (a.order > b.order ? 1 : -1)),
  },
});

const mapDispatchToProps = {
  goBack, fetchFiles, fetchCanceled, fetchData, fetchTechnologies, fetchTechnologiesCanceled,
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
  ),
  request({
    url: '/api/technology?populate=true',
    method: 'GET',
  }).pipe(
    map(({ response }) => ({
      type: skillActionTypes.fetchTechnologiesSuccess,
      payload: { ...response, populate: true },
    })),
    catchError(error => of(fetchTechnologiesRejected(error)))
  )
);

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
