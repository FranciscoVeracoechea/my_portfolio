// dependencies
import { connect } from 'react-redux';
// component
import Technologies from './index.jsx';
// actions
import {
  fetchTechnologies, fetchTechnologiesRejected, createCategory,
} from '../../../shared/actions/skillsActions';


const mapStateToProps = ({ skills }) => ({
  skills,
});

const mapDispatchToProps = {
  fetchTechnologies,
  fetchTechnologiesRejected,
  createCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Technologies);
