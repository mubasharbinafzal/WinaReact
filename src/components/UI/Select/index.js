import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"

const useStyles = makeStyles((theme) => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 220,
    border: "none",
  },
}))

export default function ControlledOpenSelect(props) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }
  if (props.type && props.type === "skills") {
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            {props.label}
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
          >
            <MenuItem value="">{props.label}</MenuItem>
            {props.options.length > 0
              ? props.options.map((op) => (
                  <MenuItem key={op._id} value={op._id}>
                    {op.skillField}
                  </MenuItem>
                ))
              : "No data found"}
            <MenuItem value="other">{props.other ? "other" : ""}</MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  } else if (props.type && props.type === "appointment") {
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            {props.label}
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
          >
            <MenuItem value="">{props.label}</MenuItem>
            {props.options && props.options.length > 0
              ? props.options &&
                props.options.map((op, i) => (
                  <MenuItem key={i} value={op}>
                    {op}
                  </MenuItem>
                ))
              : ""}
            <MenuItem value="I am not available at the proposed time">
              I am not available at the proposed time
            </MenuItem>
          </Select>
        </FormControl>
      </div>
    )
  } else
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-controlled-open-select-label">
            {props.label}
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
          >
            <MenuItem value="">{props.label}</MenuItem>
            {props.options.length > 0
              ? props.options.map((op, index) => (
                  <MenuItem key={index} value={op.title}>
                    {op.title}
                  </MenuItem>
                ))
              : "No data found"}
          </Select>
        </FormControl>
      </div>
    )
}
