// dependencies
import { connect } from 'react-redux';
// component
import TechTabs from './Tabs';
// actions
import {
  createCategory,
} from '../../../shared/actions/skillsActions';


const mapStateToProps = () => ({});

const mapDispatchToProps = {
  createCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(TechTabs);
