// dependencies
import { connect } from 'react-redux';
// component
import Interests from './index.jsx';
// actions
import {
  sendFile, fetchFiles, fetchCanceled, deleteFile,
} from '../../../shared/actions/fileActions';


const mapStateToProps = ({ file }) => ({
  file,
});

const mapDispatchToProps = {
  sendFile, fetchFiles, fetchCanceled, deleteFile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
