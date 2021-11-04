import * as React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function ControlledRadioButtonsGroup(props) {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{props.label}</FormLabel>
      <RadioGroup
        row
        aria-label="gender"
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      >
        {props.options.length > 0
          ? props.options.map((rod) => (
              <FormControlLabel
                value={rod.title}
                control={<Radio />}
                label={rod.title}
              />
            ))
          : ""}
      </RadioGroup>
    </FormControl>
  );
}
