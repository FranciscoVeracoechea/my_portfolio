import React, { forwardRef } from 'react';
import { IconButton, makeStyles, Tooltip } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
// hooks
import useRouter from '../../hooks/useRouter';


const useStyles = makeStyles(theme => ({
  active: {
    color: theme.palette.primary.main,
  },
}));

const ForwardNavLink = forwardRef(({ children, ...props }, ref) => (
  <NavLink {...props} innerRef={ref}>
    {children}
  </NavLink>
));

const NavigationLink = ({
  to, title, pdf, ...props
}) => {
  const { location: { pathname }, history: { push } } = useRouter();
  const classes = useStyles();
  if (pdf) {
    return (
      <Tooltip title={title}>
        <li>
          <IconButton
            {...props}
            component="a"
            aria-label={title}
            href={to}
          />
        </li>
      </Tooltip>
    );
  }
  if (!title) {
    return (
      <IconButton
        {...props}
        component={ForwardNavLink}
        onClick={(e) => {
          e.preventDefault();
          if (pathname !== to) push(to);
        }}
        activeClassName={classes.active}
        to={to}
        aria-label={title}
      />
    );
  }
  return (
    <Tooltip title={title}>
      <li>
        <IconButton
          {...props}
          component={ForwardNavLink}
          onClick={(e) => {
            e.preventDefault();
            if (pathname !== to) push(to);
          }}
          activeClassName={classes.active}
          to={to}
          aria-label={title}
        />
      </li>
    </Tooltip>
  );
};

export default NavigationLink;
