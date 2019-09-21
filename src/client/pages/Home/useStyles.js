import { makeStyles } from '@material-ui/core';


export default makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: '100vh',
    paddingTop: '6em',
  },
  titler: {
    [theme.breakpoints.up('md')]: {
      transform: 'translateY(-1em)',
    },
  },
  code: {
    fontSize: '5rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '10rem',
    },
    [theme.breakpoints.down('md')]: {
      fontSize: '8rem',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '5rem',
    },
  },
}));
