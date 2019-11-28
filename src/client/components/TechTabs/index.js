// dependencies
import { connect } from 'react-redux';
// component
import TechTabs from './Tabs';
// actions
import {
  createCategory, deleteCategory,
} from '../../../shared/actions/skillsActions';


const mapStateToProps = () => ({});

const mapDispatchToProps = {
  createCategory,
  deleteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(TechTabs);
