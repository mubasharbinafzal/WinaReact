import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
export default function AutoComplete({
  formik,
  placeholder,
  onChange,
  items,
  loading,
  onSubmit,
  name,
  value,
  renderOption,
}) {
  const [address, setAddress] = useState("");
  const getAddress = (event, value, reason) => {
    setAddress(value);
    onChange(value);
  };
  // useEffect(() => {
  //   if (value) {
  //     setAddress(value);
  //   }
  // }, [value]);
  return (
    <>
      <Autocomplete
        freeSolo
        id={name}
        name={name}
        clearOnEscape={true}
        disableClearable
        inputValue={address}
        onInputChange={getAddress}
        noOptionsText={placeholder}
        onOpen={formik.handleBlur}
        loading={loading}
        onChange={(event, value) => {
          onSubmit(value);
        }}
        options={items}
        getOptionLabel={(option) => {
          return option.name;
        }}
        getOptionSelected={(option, value) => {
          return option.name === value.name;
        }}
        renderOption={
          renderOption
            ? renderOption
            : (option) => {
                return option.name;
              }
        }
        renderInput={(params) => (
          <TextField
            {...params}
            // label="Search input"
            name={name}
            margin="normal"
            // onBlur={onBlur}
            variant="outlined"
            InputProps={{ ...params.InputProps, type: "text" }}
            label={placeholder}
          />
        )}
      />
    </>
  );
}
