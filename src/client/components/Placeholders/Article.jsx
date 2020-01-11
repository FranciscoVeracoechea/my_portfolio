import React from 'react';
import {
  Grid, Paper, withStyles,
} from '@material-ui/core';
import Loader from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';


const Skeleton = withStyles({
  root: {
    backgroundColor: '#4b4b4b',
  },
})(Loader);

const arrayRange = number => Array(number).fill(1).map((x, i) => x * i);

const SkillArticle = ({ classes, isFirst }) => (
  <Grid item md={isFirst ? 6 : 12} xs={12} sm={12}>
    <Paper className={classes.paper}>
      <div>
        <Skeleton width="90%" />
      </div>
      <Grid container spacing={4} style={{ paddingBottom: '1em', paddingTop: '1em' }}>
        {
          arrayRange(isFirst ? 3 : 6).map(n => (
            <Grid key={n} item md={isFirst ? 4 : 2} xs={4} sm={4}>
              <Skeleton variant="rect" width="100%" height={80} />
              <Skeleton width="90%" />
              <Skeleton width="75%" />
            </Grid>
          ))
        }
      </Grid>
    </Paper>
  </Grid>
);

SkillArticle.propTypes = {
  classes: PropTypes.object.isRequired,
  isFirst: PropTypes.bool,
};

SkillArticle.defaultProps = {
  isFirst: false,
};

export default SkillArticle;
