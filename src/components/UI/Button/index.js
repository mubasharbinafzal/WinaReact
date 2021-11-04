import React from "react";
import { Button } from "react-bootstrap";

export default function index(props) {
  return (
    <Button
      className={props.className ? props.className : "Enregistrer"}
      type={props.type}
      variant={props.variant}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.value}
    </Button>
  );
}
