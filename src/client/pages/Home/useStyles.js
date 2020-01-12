import { makeStyles } from '@material-ui/core';


const paddingTop = '6em';

export default makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop,
    minHeight: `calc(100vh - ${paddingTop})`,
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
