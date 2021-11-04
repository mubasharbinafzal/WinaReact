import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function AutoComplete({
  formik,
  placeholder,
  onChange,
  items,
  loading,
  onSubmit,
  name,
}) {
  return (
    <>
      <Autocomplete
        id={name}
        name={name}
        disableCloseOnSelect
        multiple
        noOptionsText={placeholder}
        onOpen={formik.handleBlur}
        loading={loading}
        onChange={(event, value) => {
          onSubmit(value);
        }}
        options={items}
        getOptionLabel={(option) => {
          return option.skillField;
        }}
        getOptionSelected={(option, value) => {
          return option.skillField === value.skillField;
        }}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.skillField}
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            // label="Search input"
            name={name}
            margin="normal"
            // onBlur={onBlur}
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "search" }}
            label={placeholder}
          />
        )}
      />
    </>
  );
}
