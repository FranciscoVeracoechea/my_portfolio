import React from 'react';
import {
  List, ListItem, ListItemIcon, ListItemText, makeStyles,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';


const useStyles = makeStyles({
  listIcon: {
    color: '#F9F9FA',
  },
});

const SimpleList = ({ data, interest }) => {
  const classes = useStyles();
  if (interest) {
    return (
      <List dense>
        {
          data.map(d => (
            <ListItem key={d._id}>
              <ListItemIcon className={classes.listIcon}>
                <FontAwesomeIcon icon={d.faIcon} />
              </ListItemIcon>
              <ListItemText
                primary={d.name}
                secondary={d.description || undefined}
              />
            </ListItem>
          ))
        }
      </List>
    );
  }
  return (
    <List dense>
      {
        data.map(d => (
          <ListItem key={d._id}>
            <ListItemIcon className={classes.listIcon}>
              <FontAwesomeIcon icon={d.faIcon} />
            </ListItemIcon>
            <ListItemText
              primary={d.value}
            />
          </ListItem>
        ))
      }
    </List>
  );
};

SimpleList.defaultProps = {
  interest: false,
};

SimpleList.propTypes = {
  data: PropTypes.array.isRequired,
  interest: PropTypes.bool,
};


export default SimpleList;
