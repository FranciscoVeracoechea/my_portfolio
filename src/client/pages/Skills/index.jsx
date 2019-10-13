import React, { useRef, useEffect } from 'react';
import {
  Container, Grid, Paper, Typography,
} from '@material-ui/core';
// Components
import Page from '../../components/Wrappers/Page';
import Slider from '../../components/Slider';
// styles
import useStyles from './useStyles';
// utils
import { isFirstRender } from '../../../shared/utils/functional';


const Skills = ({
  file, fetchFiles, fetchCanceled,
}) => {
  const classes = useStyles();
  const sliderWrapper = useRef(null);
  useEffect(() => {
    if (isFirstRender(file.data)) fetchFiles();
    return () => fetchCanceled();
  }, [file.data, fetchCanceled, fetchFiles]);
  return (
    <Page title="Skills">
      <Container fixed className={classes.container}>
        <Grid container>
          <Grid item md={9} xs={12} sm={12} className={classes.sliderGrid} ref={sliderWrapper}>
            {
              sliderWrapper.current
                ? <Slider wrapper={sliderWrapper.current} file={file} />
                : null
            }
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Skills;
