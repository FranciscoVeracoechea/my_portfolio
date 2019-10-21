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


// helpers
const findByCategory = (data, category) => data.data.find(d => d.category === category);
const technical_description = 'technical_description';

const Skills = ({
  file, fetchFiles, fetchCanceled, data, fetchData,
}) => {
  const classes = useStyles();
  const sliderWrapper = useRef(null);
  useEffect(() => {
    if (isFirstRender(file.data)) fetchFiles();
    if (isFirstRender(data.data)) fetchData();
    return () => fetchCanceled();
  }, []);
  return (
    <Page title="Skills">
      <Container fixed className={classes.container}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12} sm={12}>
            <Paper className={classes.paper} ref={sliderWrapper}>
              <div>
                <Typography variant="h5" component="h3" color="primary">
                  { findByCategory(data, technical_description)?.key }
                </Typography>
              </div>
              <div style={{ paddingBottom: '1em' }}>
                <Typography variant="body2">
                  { findByCategory(data, technical_description)?.value }
                </Typography>
              </div>
              <div ref={sliderWrapper} className={classes.sliderWrapper}>
                {
                  sliderWrapper.current
                    ? (
                      <Slider
                        wrapper={sliderWrapper.current}
                        file={file}
                      />
                    )
                    : null
                }
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Skills;
