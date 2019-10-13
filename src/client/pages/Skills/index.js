import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
// Component
import Skills from './index.jsx';
// actions
import {
  fetchFiles, fetchCanceled,
} from '../../../shared/actions/fileActions';


const mapStateToProps = ({
  file,
}) => ({
  file,
});

const mapDispatchToProps = {
  goBack, fetchFiles, fetchCanceled,
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
