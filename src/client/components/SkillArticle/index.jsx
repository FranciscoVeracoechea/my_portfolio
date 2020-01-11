import React from 'react';
import {
  Grid, Paper, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
// components
import Placeholder from '../Placeholders/Article';
// styles
import styles from '../../assets/sass/Skills.scss';


const SkillArticle = ({
  skill, classes, isFirst, isLoading,
}) => {
  if (isLoading || !skill) return <Placeholder classes={classes} isFirst={isFirst} />;

  return (
    <Grid item md={isFirst ? 6 : 12} xs={12} sm={12}>
      {
        isFirst
          ? (
            <Typography variant="h4" component="h2" style={{ paddingBottom: '.8em' }}>
              Skills
            </Typography>
          )
          : null
      }
      <Paper className={classes.paper}>
        <div>
          <Typography variant="h5" component="h3" color="primary">
            { skill.name }
          </Typography>
        </div>
        <Grid container spacing={2} style={{ paddingBottom: '1em', paddingTop: '1em' }}>
          {
            skill.technologies.map(tech => (
              <Grid key={tech._id} item md={isFirst ? 4 : 2} xs={4} sm={4}>
                <figure>
                  {
                    tech.link
                      ? (
                        <a href={tech.link} target="_blank" rel="noopener noreferrer">
                          <img className={styles.responsiveImage} src={tech.image.url} alt={tech.image.name} />
                        </a>
                      )
                      : <img className={styles.responsiveImage} src={tech.image.url} alt={tech.image.name} />
                  }
                  <figcaption className={styles.figcaption}>
                    <Typography variant="body2">
                      { tech.name }
                    </Typography>
                  </figcaption>
                </figure>
              </Grid>
            ))
          }
        </Grid>
      </Paper>
    </Grid>
  );
};

SkillArticle.propTypes = {
  skill: PropTypes.object,
  classes: PropTypes.object.isRequired,
  isFirst: PropTypes.bool,
  isLoading: PropTypes.bool,
};

SkillArticle.defaultProps = {
  isFirst: false,
  skill: null,
  isLoading: false,
};

export default SkillArticle;
