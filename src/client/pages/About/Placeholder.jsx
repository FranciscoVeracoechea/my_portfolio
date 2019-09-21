import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container, Grid, Paper, withStyles,
} from '@material-ui/core';
import Loader from '@material-ui/lab/Skeleton';
// Components
import Page from '../../components/Wrappers/Page';
import SocialBar from '../../components/SocialBar';
// assets
import styles from '../../assets/sass/AboutMe.scss';
import useStyles from './useStyles';
// utils
import { classList } from '../../../shared/utils/functional';


const Skeleton = withStyles({
  root: {
    backgroundColor: '#4b4b4b',
  },
})(Loader);

const Placeholder = () => {
  const classes = useStyles();
  return (
    <Page title="About me">
      <div className={styles.container}>
        <Container fixed className={classes.container}>
          <Grid container spacing={2}>
            <Grid item md={3} sm={12} xs={12}>
              <Paper className={classList(classes.paper, styles.paper)} component="article">
                <div className={styles.titler}>
                  <Skeleton width="100%" />
                </div>
                <figure>
                  <Skeleton variant="rect" width="100%" height={118} />
                  <figcaption className={styles.caption}>
                    <Skeleton width="100%" />
                    <Skeleton width="100%" />
                  </figcaption>
                </figure>
              </Paper>
            </Grid>
            <Grid item md={9} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                  <Paper className={classList(classes.paper, styles.paper)} component="article">
                    <div>
                      <Skeleton width="100%" />
                      <Skeleton width="100%" />
                    </div>
                  </Paper>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <Paper className={classList(classes.paper, styles.paper)} component="article">
                    <div>
                      <Skeleton width="100%" />
                      <Skeleton width="100%" />
                    </div>
                  </Paper>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <Paper className={classList(classes.paper, styles.paper)} component="article">
                    <div className={styles.titler}>
                      <Skeleton width="100%" />
                    </div>
                    <div>
                      <Skeleton width="100%" />
                      <Skeleton width="100%" />
                    </div>
                  </Paper>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                  <SocialBar />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </Page>
  );
};


export default Placeholder;
