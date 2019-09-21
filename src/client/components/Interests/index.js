// dependencies
import { connect } from 'react-redux';
// component
import Interests from './index.jsx';
// actions
import {
  fetchInterest, createInterest, updateInterest, deleteInterest,
} from '../../../shared/actions/interestActions';


const mapStateToProps = ({ interest }) => ({
  interest,
});

const mapDispatchToProps = {
  fetchInterest, createInterest, updateInterest, deleteInterest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Interests);
