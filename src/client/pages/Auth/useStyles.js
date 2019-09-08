import { makeStyles } from '@material-ui/core';


export default makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: '6em',
    paddingBottom: '4em',
  },
  group: {
    display: 'block',
  },
}));
