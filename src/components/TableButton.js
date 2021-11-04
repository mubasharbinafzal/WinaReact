import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ButtonComponent = (props) => {
  let color;
  switch (props.color) {
    case 'error':
      color = '#c21d12';
      break;
    case 'success':
      color = 'green';
      break;
    case 'black':
      color = '#000';
      break;
    default:
      color = '#4DA1FF';
      break;
  }

  const useStyles = makeStyles((theme) => ({
    button: {
      color: '#FFF',
      borderRadius: 6,
      backgroundColor: color,
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: color,
      },
    },
  }));
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      fullWidth={props.fullWidth}
      className={classes.button}
      onClick={props.onClick}
      disabled={props.disabled}
      type={props.type}
      style={props.style}
    >
      {props.children}
      {props.text}
    </Button>
  );
};

export default ButtonComponent;
