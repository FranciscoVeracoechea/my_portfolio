import React, { forwardRef, useCallback } from 'react';
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
  to, type, ...props
}) => {
  const { location: { pathname }, history: { push } } = useRouter();
  const classes = useStyles();
  const handleOnClick = useCallback((e) => {
    e.preventDefault();
    if (pathname !== to) push(to);
  }, [pathname, push, to]);

  return type.matchWith({
    PdfLink: ({ title }) => (
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
    ),
    TooltipLink: ({ title }) => (
      <Tooltip title={title}>
        <li>
          <IconButton
            {...props}
            component={ForwardNavLink}
            onClick={handleOnClick}
            activeClassName={classes.active}
            to={to}
            aria-label={title}
          />
        </li>
      </Tooltip>
    ),
    ImageLink: () => (
      <IconButton
        {...props}
        component={ForwardNavLink}
        onClick={handleOnClick}
        activeClassName={classes.active}
        to={to}
      />
    ),
  });
};

export default NavigationLink;
