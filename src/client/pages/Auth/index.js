// dependencies
import { connect } from 'react-redux';
// component
import Auth from './Authentication';
// actions
import {
  fetchRegister, fetchLogin, clearErrors, clearAuth,
} from '../../../shared/actions/authActions';


const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = {
  fetchRegister,
  fetchLogin,
  clearErrors,
  clearAuth,
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
