import { connect } from 'react-redux';
import { goBack } from 'connected-react-router';
// Component
import About from './About';
// actions
import { fetchData } from '../../../shared/actions/dataActions';
import { fetchInterest } from '../../../shared/actions/interestActions';


const mapStateToProps = ({
  data, interest,
}) => ({
  data,
  interest,
});

const mapDispatchToProps = {
  goBack,
  fetchData,
  fetchInterest,
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
