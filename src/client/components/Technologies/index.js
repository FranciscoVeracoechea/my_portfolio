// dependencies
import { connect } from 'react-redux';
// component
import Technologies from './index.jsx';
// actions
import {
  fetchTechnologies, fetchTechnologiesCanceled,
} from '../../../shared/actions/skillsActions';


const mapStateToProps = ({ skills }) => ({
  skills,
});

const mapDispatchToProps = {
  fetchTechnologies,
  fetchTechnologiesCanceled,
};

export default connect(mapStateToProps, mapDispatchToProps)(Technologies);
