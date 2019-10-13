import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar, AppBar, Toolbar, Typography,
  Tooltip, LinearProgress,
} from '@material-ui/core';
// component
import HideOnScroll from './HideOnScroll';
import NavLink from '../NavLink';
// assets
import logo from '../../assets/img/logo_blue.svg';
import useStyles from './useStyles';


const AppNavigationBar = ({ user, progress }) => {
  const classes = useStyles();

  return (
    <HideOnScroll>
      {
        style => (
          <div className={classes.grow}>
            <AppBar
              style={style}
              position="fixed"
              color="secondary"
            >
              <Toolbar>
                <NavLink
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  to="/"
                >
                  <Avatar src={logo} alt="Francisco Veracoechea" />
                </NavLink>
                <Typography className={classes.title} variant="h6" noWrap>
                  Francisco Veracoechea
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <Tooltip className={classes.tip} title="About Me">
                    <NavLink
                      aria-label="about me"
                      color="inherit"
                      to="/about-me"
                    >
                      <FontAwesomeIcon icon="drum" size="2x" />
                    </NavLink>
                  </Tooltip>
                  <Tooltip title="Repositories">
                    <NavLink aria-label="Repositories" color="inherit">
                      <FontAwesomeIcon icon="code-branch" />
                    </NavLink>
                  </Tooltip>
                  <Tooltip title="Technologies and Skills">
                    <NavLink
                      aria-label="Technologies and Skills"
                      color="inherit"
                      to="/skills"
                    >
                      <FontAwesomeIcon icon={['fab', 'react']} />
                    </NavLink>
                  </Tooltip>
                  {
                    user
                      ? (
                        <Tooltip className={classes.tip} title="Dashboard">
                          <NavLink
                            aria-label="go tpo dashboard"
                            color="inherit"
                            to="/dashboard"
                          >
                            <DashboardIcon />
                          </NavLink>
                        </Tooltip>
                      )
                      : null
                  }
                </div>
              </Toolbar>
            </AppBar>
            {
              progress.show
                ? <LinearProgress variant="determinate" value={progress.percent} style={{ zIndex: 100 }} />
                : null
            }
          </div>
        )
    }
    </HideOnScroll>
  );
};

export default AppNavigationBar;
