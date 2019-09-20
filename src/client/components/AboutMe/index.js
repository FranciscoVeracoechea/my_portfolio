// dependencies
import { connect } from 'react-redux';
// component
import AboutMe from './index.jsx';
// actions
import {
  fetchData, createData, updateData, deleteData,
} from '../../../shared/actions/dataActions';


const mapStateToProps = ({ data }) => ({
  data,
});

const mapDispatchToProps = {
  fetchData, createData, updateData, deleteData,
};

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);
