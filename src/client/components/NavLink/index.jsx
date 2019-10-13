import React from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { NavLink as Link } from 'react-router-dom';
// hooks
import useRouter from '../../hooks/useRouter';


const useStyles = makeStyles(theme => ({
  active: {
    color: theme.palette.primary.main,
  },
}));


const NavLink = ({ to, ...props }) => {
  const { location: { pathname }, history: { push } } = useRouter();
  const classes = useStyles();
  return (
    <IconButton
      component={Link}
      onClick={(e) => {
        e.preventDefault();
        if (pathname !== to) push(to);
      }}
      activeClassName={classes.active}
      to={to}
      {...props}
    />
  );
};

export default NavLink;
