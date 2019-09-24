import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container, Grid, Paper, Typography,
} from '@material-ui/core';
// Components
import Page from '../../components/Wrappers/Page';
import SocialBar from '../../components/SocialBar';
import Placeholder from './Placeholder';
import SimpleList from '../../components/SimpleList';
// assets
import styles from '../../assets/sass/AboutMe.scss';
import useStyles from './useStyles';
// utils
import { isFirstRender } from '../../../shared/utils/functional';


const aboutMe = 'about_me';
const objective = 'objective';
const contact = 'contact';
const timeout = 1000;
// helpers
const filterByCategpory = (data, category) => data.data.filter(d => d.category === category);
const findByCategory = (data, category) => data.data.find(d => d.category === category);

const About = ({
  data,
  interest,
  fetchData,
  fetchInterest,
}) => {
  const classes = useStyles();
  useEffect(() => {
    if (isFirstRender(data.data)) setTimeout(fetchData, timeout);
    if (isFirstRender(interest.data)) setTimeout(fetchInterest, timeout);
  }, []);
  if (data.loading && interest.loading) return <Placeholder />;
  return (
    <Page title="About me">
      <Container fixed className={classes.container}>
        <Grid container spacing={2}>
          <Grid item md={3} sm={12} xs={12}>
            <Paper className={classes.paper} component="article">
              <div className={styles.titler}>
                <Typography variant="h5" component="h3" color="primary">
                  About Me
                </Typography>
              </div>
              <figure>
                <img
                  className={styles.profileImage}
                  src="https://avatars0.githubusercontent.com/u/26258895?v=4"
                  alt="francisco veracoechea"
                />
                <figcaption className={styles.caption}>
                  <SimpleList data={filterByCategpory(data, aboutMe)} />
                </figcaption>
              </figure>
            </Paper>
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <Grid container spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.paper} component="article">
                  <div className={styles.titler}>
                    <Typography variant="h5" component="h3" color="primary">
                      { findByCategory(data, objective)?.key }
                    </Typography>
                  </div>
                  <div>
                    { findByCategory(data, objective)?.value }
                  </div>
                </Paper>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <Paper className={classes.paper} component="article">
                  <div className={styles.titler}>
                    <Typography variant="h5" component="h3" color="primary">
                      Interests
                    </Typography>
                  </div>
                  <div>
                    <SimpleList interest data={interest.data} />
                  </div>
                </Paper>
              </Grid>
              <Grid item md={6} sm={12} xs={12}>
                <Paper className={classes.paper} component="article">
                  <div className={styles.titler}>
                    <Typography variant="h5" component="h3" color="primary">
                      Contact
                    </Typography>
                  </div>
                  <div>
                    <SimpleList data={filterByCategpory(data, contact)} />
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
    </Page>
  );
};


export default About;
