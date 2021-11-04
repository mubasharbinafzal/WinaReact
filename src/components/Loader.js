import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  center: {
    height: '100vh',
    width: '100wh',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: '#fff',
  },
  progress: {
    height: '100%',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
  },
  pageProgress: {
    height: 'calc(100vh - 90px)',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
  },
}));

const Progress = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.progress}>
      <CircularProgress
        color={props.color || 'inherit'}
        size={props.size || 25}
      />
    </div>
  );
};

const CenterProgress = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.center} style={props.style}>
      <CircularProgress
        color={props.color || 'inherit'}
        size={props.size || 40}
      />
    </div>
  );
};
const PageProgress = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.pageProgress}>
      <CircularProgress
        color={props.color || 'inherit'}
        size={props.size || 40}
      />
    </div>
  );
};

let obj = {
  Progress,
  CenterProgress,
  PageProgress,
};

export default obj;
