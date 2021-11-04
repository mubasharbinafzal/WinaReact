import React from "react";
import { Form } from "react-bootstrap";
export default function index(props) {
  return (
    <Form.Check
      type="checkbox"
      label={props.label}
      name={props.name}
      onChange={props.onChange}
    />
  );
}
