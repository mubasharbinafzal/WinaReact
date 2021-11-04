import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}))
export default function DateAndTimePickers(props) {
  const classes = useStyles()
  // "2017-05-24T10:30"

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        name={props.name}
        label={props.label}
        type="datetime-local"
        value={props.value}
        onChange={props.onChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  )
}
