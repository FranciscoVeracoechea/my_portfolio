// dependencies
import { connect } from 'react-redux';
// component
import TechTabs from './Tabs';
// actions
import {
  createCategory, deleteCategory, updateCategory, selecteCategory,
} from '../../../shared/actions/skillsActions';


const mapStateToProps = ({ skills }) => ({
  selectedCategoryId: skills.selectedCategoryId,
});

const mapDispatchToProps = {
  createCategory,
  deleteCategory,
  updateCategory,
  selecteCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(TechTabs);
