import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Components
import { Container, Typography } from '@material-ui/core';
import Page from '../../components/Wrappers/Page';
import SocialBar from '../../components/SocialBar';
// assets
import styles from '../../assets/sass/Home.scss';
import useStyles from './useStyles';
// utils
import { classList } from '../../../shared/utils/functional';


const Home = () => {
  const classes = useStyles();
  return (
    <Page>
      <div className={styles.homeContainer}>
        <Container fixed className={classes.container}>
          <section className={styles.mainSection}>
            <Typography className={classes.code} color="primary" variant="h1" component="span">
              {'<'}
            </Typography>
            <div className={classList(styles.titler, classes.titler)}>
              <Typography variant="h2" component="h1">
                Francisco Veracoechea
              </Typography>
              <Typography variant="h4" component="h2">
                Fullstack Developer
              </Typography>
            </div>
            <Typography className={classes.code} color="primary" variant="h1" component="span">
              <span>{'/>'}</span>
            </Typography>
          </section>
          <section>
            <p className={styles.code}>
              <code>{'() => { '}</code>
              <cite>"Before a software can be reusable, it must first be usable."</cite>
              <code>{' }'}</code>
            </p>
          </section>
          <section>
            <SocialBar />
          </section>
        </Container>
      </div>
    </Page>
  );
};

export default Home;
