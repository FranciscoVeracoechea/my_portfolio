// dependencies
import { connect } from 'react-redux';
// component
import TechTabs from './Tabs';
// actions
import {
  createCategory, deleteCategory, updateCategory, selecteCategory, createSkill, deleteSkill,
  updateSkill,
} from '../../../shared/actions/skillsActions';
import {
  fetchFiles, fetchCanceled,
} from '../../../shared/actions/fileActions';


const mapStateToProps = ({ skills, file }) => ({
  selectedCategoryId: skills.selectedCategoryId,
  file,
});

const mapDispatchToProps = {
  createCategory,
  deleteCategory,
  updateCategory,
  selecteCategory,
  createSkill,
  fetchFiles,
  fetchFilesCancel: fetchCanceled,
  deleteSkill,
  updateSkill,
};

export default connect(mapStateToProps, mapDispatchToProps)(TechTabs);
