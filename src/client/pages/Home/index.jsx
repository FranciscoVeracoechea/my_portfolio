import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Components
import { Container, Typography } from '@material-ui/core';
import Page from '../../components/Wrappers/Page';
import SocialBar from '../../components/SocialBar';
// assets
import styles from '../../assets/sass/Home.scss';
import useStyles from './useStyles';
import SvgLeft from './SvgLeft';
import SvgRight from './SvgRight';


const Home = () => {
  const classes = useStyles();
  return (
    <Page>
      <Container fixed className={classes.container}>
        <section className={styles.mainSection}>
          <SvgLeft />
          <div className={styles.titler}>
            <Typography variant="h2" component="h1">
              Francisco Veracoechea
            </Typography>
            <Typography variant="h4" component="h2">
              Fullstack Developer
            </Typography>
          </div>
          <SvgRight />
        </section>
        <section>
          <div className={styles.citeContainer}>
            <code>(</code>
            <Typography variant="overline">
              Ralph Johnson
            </Typography>
            <code>{') => { '}</code>
            <br />
            <cite className={styles.quot}>&quot;Before a software can be reusable, it must first be usable.&quot;</cite>
            <br />
            <code>{' };'}</code>
          </div>
        </section>
        <section>
          <SocialBar />
        </section>
      </Container>
    </Page>
  );
};

export default Home;
