import { makeStyles } from '@material-ui/core';


export default makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: '6em',
    height: '100%',
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
; 5
