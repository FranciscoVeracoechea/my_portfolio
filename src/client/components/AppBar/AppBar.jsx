import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar, IconButton, AppBar, Toolbar, Typography,
  Tooltip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
// component
import HideOnScroll from './HideOnScroll';
// assets
import logo from '../../assets/img/logo_blue.svg';
import useStyles from './useStyles';


const AppNavigationBar = ({ user }) => {
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
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                  to="/"
                  component={Link}
                >
                  <Avatar src={logo} alt="Francisco Veracoechea" />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                  Francisco Veracoechea
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                  <Tooltip className={classes.tip} title="About Me">
                    <IconButton
                      aria-label="about me"
                      color="inherit"
                      to="/about-me"
                      component={Link}
                    >
                      <FontAwesomeIcon icon="drum" size="2x" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Repositories">
                    <IconButton aria-label="Repositories" color="inherit">
                      <FontAwesomeIcon icon="code-branch" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Technologies and Skills">
                    <IconButton
                      aria-label="Technologies and Skills"
                      color="inherit"
                    >
                      <FontAwesomeIcon icon={['fab', 'react']} />
                    </IconButton>
                  </Tooltip>
                  {
                    user
                      ? (
                        <Tooltip className={classes.tip} title="Dashboard">
                          <IconButton
                            aria-label="go tpo dashboard"
                            color="inherit"
                            to="/dashboard"
                            component={Link}
                          >
                            <DashboardIcon />
                          </IconButton>
                        </Tooltip>
                      )
                      : null
                  }
                </div>
              </Toolbar>
            </AppBar>
          </div>
        )
    }
    </HideOnScroll>
  );
};

export default AppNavigationBar;
