// dependencies
import React, { useEffect } from 'react';
import {
  Typography,
} from '@material-ui/core';
import Result from 'folktale/result';
// components
import Tabs from '../TechTabs';
import Loader from '../Loader';
// styles
import styles from '../../assets/sass/Files.scss';
// hooks
import { useUnionType } from '../../hooks/useUnionType';


const Table = ({ data, styles: classes }) => (
  <>
    <div className={classes.title}>
      <Typography variant="h5">Technologies</Typography>
    </div>
    <Tabs data={data} />
  </>
);

const Technologies = ({
  skills,
  fetchTechnologies,
  fetchTechnologiesRejected,
}) => {
  const [state] = useUnionType(skills);

  useEffect(
    () => Result.fromNullable(!skills.isLoading)
      .map(fetchTechnologies)
      .chain(() => fetchTechnologiesRejected),
    []
  );

  return state.matchWith({
    Loading: () => <Loader size="4em" />,
    Error: ({ data, error }) => (
      <>
        <Typography color="error"><b>{error.message || 'Ups! An Error have occur'}</b></Typography>
        <Typography color="error">{error.message}</Typography>
        <Typography color="error">{error.response.message}</Typography>
        <Typography color="error">{error.response.errmsg}</Typography>
        <Table data={data} styles={styles} />
      </>
    ),
    Success: ({ data }) => <Table data={data} styles={styles} />,
    Default: () => null,
  });
};

export default Technologies;
