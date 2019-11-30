import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles, AppBar, Tabs, Tab, Typography, Box,
} from '@material-ui/core';
// component
import CategoryTable from './CategoryTable';
import SkillTable from './SkillTable';


const TabPanel = (props) => {
  const {
    children, value, index, ...other
  } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = index => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TabView = ({
  data,
  createCategory,
  deleteCategory,
  updateCategory,
  selecteCategory,
  selectedCategoryId,
}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Categories" {...a11yProps(0)} />
          <Tab label="Skills" {...a11yProps(1)} disabled={!selectedCategoryId} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <CategoryTable
          create={createCategory}
          remove={deleteCategory}
          update={updateCategory}
          onChangeTab={(index, id) => {
            selecteCategory(id);
            handleChange(null, index);
          }}
          data={data}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SkillTable
          data={data}
          selectedCategoryId={selectedCategoryId}
        />
      </TabPanel>
    </div>
  );
};

export default TabView;
