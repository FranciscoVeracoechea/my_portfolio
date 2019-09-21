import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container, Grid, Paper, Typography,
} from '@material-ui/core';
// Components
import Page from '../../components/Wrappers/Page';
import SocialBar from '../../components/SocialBar';
import Placeholder from './Placeholder';
// assets
import styles from '../../assets/sass/AboutMe.scss';
import useStyles from './useStyles';
// utils
import { isFirstRender, classList } from '../../../shared/utils/functional';


const aboutMe = 'about_me';
const objective = 'objective';
const technical_description = 'technical_description';
const contact = 'contact';

const timeout = 1000;

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
      <div className={styles.container}>
        <Container fixed className={classes.container}>
          <Grid container spacing={2}>
            <Grid item md={3} sm={12} xs={12}>
              <Paper className={classList(classes.paper, styles.paper)} component="article">
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
                    {
                      data.data.filter(d => d.category === aboutMe)
                        .map(d => (
                          <Typography key={d._id}>
                            <FontAwesomeIcon icon={d.faIcon} className={styles.icon} />
                            {d.value}
                          </Typography>
                        ))
                    }
                  </figcaption>
                </figure>
              </Paper>
            </Grid>
            <Grid item md={9} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item md={12} sm={12} xs={12}>
                  <Paper className={classList(classes.paper, styles.paper)} component="article">
                    <div className={styles.titler}>
                      <Typography variant="h5" component="h3" color="primary">
                        { data.data.find(d => d.category === objective)?.key }
                      </Typography>
                    </div>
                    <div>
                      { data.data.find(d => d.category === objective)?.value }
                    </div>
                  </Paper>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <Paper className={classList(classes.paper, styles.paper)} component="article">
                    <div className={styles.titler}>
                      <Typography variant="h5" component="h3" color="primary">
                        { data.data.find(d => d.category === technical_description)?.key }
                      </Typography>
                    </div>
                    <div>
                      { data.data.find(d => d.category === technical_description)?.value }
                    </div>
                  </Paper>
                </Grid>
                <Grid item md={6} sm={12} xs={12}>
                  <Paper className={classList(classes.paper, styles.paper)} component="article">
                    <div className={styles.titler}>
                      <Typography variant="h5" component="h3" color="primary">
                        Contact
                      </Typography>
                    </div>
                    <div>
                      {
                        data.data.filter(d => d.category === contact)
                          .map(d => (
                            <Typography key={d._id}>
                              <FontAwesomeIcon icon={d.faIcon} className={styles.icon} />
                              {d.value}
                            </Typography>
                          ))
                      }
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


export default About;
