import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Container,
} from '@material-ui/core';
// Components
import Page from '../../components/Wrappers/Page';
// assets
import styles from '../../assets/sass/AboutMe.scss';
import useStyles from './useStyles';


const About = () => {
  const classes = useStyles();

  return (
    <Page title="About me">
      <div className={styles.container}>
        <Container fixed className={classes.container}>
          <h3>About me</h3>
        </Container>
      </div>
    </Page>
  );
};


export default About;
