import React, { useRef, useEffect } from 'react';
import {
  Container, Grid, Paper, Hidden,
} from '@material-ui/core';
// Components
import Page from '../../components/Wrappers/Page';
import Slider from '../../components/Slider';
import Article from '../../components/SkillArticle';
// styles
import useStyles from './useStyles';
// utils
import { isFirstRender } from '../../../shared/utils/functional';


// helpers
// const findByCategory = (data, category) => data.data.find(d => d.category === category);
// const technical_description = 'technical_description';
const arrayRange = number => Array(number).fill(1).map((x, i) => x * i);
const picture = 'slider_image';
const title = 'Skills';
const timeout = 1000;

const Skills = ({
  file, fetchFiles, fetchCanceled, data, fetchData, skills,
  fetchTechnologies, fetchTechnologiesCanceled,
}) => {
  const classes = useStyles();
  const sliderWrapper = useRef(null);
  useEffect(() => {
    if (!skills.isPopulated || isFirstRender(skills.data)) setTimeout(() => fetchTechnologies(true), timeout);
    if (!file.data.find(x => x.kind === picture)) setTimeout(fetchFiles, timeout);
    if (isFirstRender(data.data)) setTimeout(fetchData, timeout);
    return () => {
      fetchCanceled();
      fetchTechnologiesCanceled();
    };
  }, []);

  const isLoading = skills.isLoading || file.loading || data.loading;

  return (
    <Page title={title}>
      <Container fixed className={classes.container}>
        <Grid container spacing={4}>
          <Hidden only="xs">
            <Grid
              item
              md={6}
              xs={12}
              sm={12}
            >
              <Paper className={classes.paper} ref={sliderWrapper}>
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
          </Hidden>
          <Article skill={skills.data[0]} classes={classes} isFirst isLoading={isLoading} />
          {
            isLoading && arrayRange(3).map(n => (
              <Article key={n} classes={classes} isLoading={isLoading} />
            ))
          }
          {
            !isLoading && skills.data.slice(1).map(skill => (
              <Article skill={skill} key={skill._id} classes={classes} />
            ))
          }
        </Grid>
      </Container>
      <br />
    </Page>
  );
};

export default Skills;
