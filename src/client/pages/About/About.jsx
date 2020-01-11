import React, { useEffect } from 'react';
import {
  Container, Grid, Paper, Typography,
} from '@material-ui/core';
// Components
import Page from '../../components/Wrappers/Page';
import Placeholder from '../../components/Placeholders/View';
import SimpleList from '../../components/SimpleList';
// assets
import styles from '../../assets/sass/AboutMe.scss';
import useStyles from './useStyles';
// utils
import { isFirstRender } from '../../../shared/utils/functional';


const aboutMe = 'about_me';
const objective = 'objective';
const technicalDescription = 'technical_description';
const contact = 'contact';
const timeout = 1000;
const spacing = 4;
// helpers
const filterData = category => data => data.data.filter(d => d.category === category);
const findData = category => data => data.data.find(d => d.category === category);
const findProfilePicture = data => data.data.find(d => d.kind === 'profile');

const About = ({
  data,
  file,
  fetchProfilePicture,
  interest,
  fetchData,
  fetchInterest,
}) => {
  const title = 'About me';
  const classes = useStyles();
  useEffect(() => {
    if (isFirstRender(data.data)) setTimeout(fetchData, timeout);
    if (isFirstRender(interest.data)) setTimeout(fetchInterest, timeout);
    if (isFirstRender(file.data)) setTimeout(fetchProfilePicture, timeout);
  }, []);
  if (data.loading || interest.loading || file.loading) return <Placeholder title={title} />;
  return (
    <Page title={title}>
      <Container fixed className={classes.container}>
        <Grid container spacing={spacing}>
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
                  src={findProfilePicture(file)?.url}
                  alt="francisco veracoechea"
                />
                <figcaption className={styles.caption}>
                  <SimpleList data={filterData(aboutMe)(data)} />
                </figcaption>
              </figure>
            </Paper>
          </Grid>
          <Grid item md={9} sm={12} xs={12}>
            <Grid container spacing={spacing}>
              <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.paper} component="article">
                  <div className={styles.titler}>
                    <Typography variant="h5" component="h3" color="primary">
                      { findData(objective)(data)?.key }
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{ __html: findData(objective)(data)?.value }}
                    />
                  </div>
                </Paper>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <Paper className={classes.paper} component="article">
                  <div className={styles.titler}>
                    <Typography variant="h5" component="h3" color="primary">
                      { findData(technicalDescription)(data)?.key }
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{ __html: findData(technicalDescription)(data)?.value }}
                    />
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
                    <SimpleList data={filterData(contact)(data)} />
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};


export default About;
