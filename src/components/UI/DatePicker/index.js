import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "nowrap",
    flexDirection: "column",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers(props) {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <label>{props.label}</label>

        <TextField
          id="date"
          name={props.name}
          // label="Birthday"
          type="date"
          value={props.value}
          onChange={props.onChange}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </>
  );
}
