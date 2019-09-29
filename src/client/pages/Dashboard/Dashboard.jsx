// dependencies
import React from 'react';
import {
  Drawer, List, ListItem,
} from '@material-ui/core';
import { Route, Link } from 'react-router-dom';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// components
import Page from '../../components/Wrappers/Page';
// assets
import useStyles from './useStyles';
import styles from '../../assets/sass/Dashboard.scss';
// utils
import { classList } from '../../../shared/utils/functional';
import sections from './sections';


const Dashboard = ({ match: { url } }) => {
  const classes = useStyles();

  return (
    <Page title="Dashboard">
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <List>
            {sections.map(({ text, Icon, route }) => (
              <li key={text}>
                <ListItem divider button component={Link} to={route} selected={route === url}>
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </li>
            ))}
          </List>
        </Drawer>
        <div className={classList(classes.content, styles.content)}>
          {
            sections.map(({ route, Component, exact }) => (
              <Route
                path={route}
                component={Component}
                key={route}
                exact={Boolean(exact)}
              />
            ))
          }
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
