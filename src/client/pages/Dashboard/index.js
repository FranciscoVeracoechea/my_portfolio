// dependencies
import { connect } from 'react-redux';
import { of, iif } from 'rxjs';
import { tap } from 'rxjs/operators';
import { push } from 'connected-react-router';
// component
import Dashboard from './Dashboard';


const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = {
  push,
};

// Sever Side Render
Dashboard.initialAction = (store, match, req, res) => iif(
  () => req?.session?.isAuthenticated,
  of(null),
  of('Unauthenticated').pipe(tap(() => res.redirect('/')))
);


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
