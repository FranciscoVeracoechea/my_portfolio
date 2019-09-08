import React from 'react';
import { CircularProgress } from '@material-ui/core';


const styles = {
  padding: '1em',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Loader = props => (
  <div style={styles}>
    <CircularProgress {...props} />
  </div>
);

export default Loader;
