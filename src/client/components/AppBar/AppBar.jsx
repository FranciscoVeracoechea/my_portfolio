import React, { useEffect, useState } from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar, AppBar, Toolbar, Typography,
  LinearProgress, CircularProgress,
} from '@material-ui/core';
import {
  pluck, delay,
} from 'rxjs/operators';
// component
import HideOnScroll from './HideOnScroll';
import NavLink from '../NavigationLink';
// assets
import logo from '../../assets/img/logo_blue.svg';
import useStyles from './useStyles';
// helpers
import request from '../../../shared/utils/Request';


const AppNavigationBar = ({ user, progress }) => {
  const classes = useStyles();
  const [url, setUrl] = useState('');
  useEffect(() => {
    request({
      url: '/api/file/kind/curriculum_vitae',
      method: 'GET',
    }).pipe(
      delay(2000),
      pluck('response'),
    ).subscribe(
      res => setUrl(res?.data[0]?.url),
      console.error
    );
  }, []);

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
                <ul className={classes.sectionDesktop}>
                  <NavLink
                    title="About Me"
                    color="inherit"
                    to="/about-me"
                  >
                    <FontAwesomeIcon icon="info-circle" />
                  </NavLink>
                  <NavLink title="Repositories" aria-label="Repositories" color="inherit">
                    <FontAwesomeIcon icon="code-branch" />
                  </NavLink>
                  <NavLink
                    color="inherit"
                    to="/skills"
                    title="Technologies and Skills"
                  >
                    <FontAwesomeIcon icon={['fab', 'react']} />
                  </NavLink>
                  <NavLink
                    title="Resume"
                    color="inherit"
                    to={url}
                    pdf
                  >
                    {
                      url
                        ? <FontAwesomeIcon icon="file-pdf" />
                        : <CircularProgress size={25} />
                    }
                  </NavLink>
                  {
                    user
                      ? (
                        <NavLink
                          aria-label="Dashboard"
                          color="inherit"
                          to="/dashboard"
                          className={classes.tip}
                          title="Dashboard"
                        >
                          <DashboardIcon />
                        </NavLink>
                      )
                      : null
                  }
                </ul>
              </Toolbar>
            </AppBar>
            {
              progress.show
                ? <LinearProgress variant={progress.variant} value={progress.percent} style={{ zIndex: 100 }} />
                : null
            }
          </div>
        )
    }
    </HideOnScroll>
  );
};

export default AppNavigationBar;
