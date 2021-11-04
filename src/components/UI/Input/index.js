import React from "react";
import { Form } from "react-bootstrap";
import "./ModalInput.css";

/**
 * @author
 * @function Input
 **/

const Input = (props) => {
  let input = null;
  switch (props.type) {
    case "select":
      input = (
        <div className="modal-select">
          {props.label && <label>{props.label}</label>}

          <select
            name={props.name}
            value={props.value}
            onChange={props.onChange}
          >
            <option value="">{props.placeholder}</option>
            {props.options.length > 0
              ? props.options.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.name}
                  </option>
                ))
              : null}
          </select>
        </div>
      );
      break;
    case "file":
      input = (
        <div className="modal-input">
          {props.label && <label>{props.label}</label>}
          <input
            type={props.type}
            accept={props.accept}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
          <label className="text-muted">{props.errorMessage}</label>
        </div>
      );
      break;
    case "text":
    default:
      input = (
        <div className="modal-input">
          {props.label && <label>{props.label}</label>}
          <input
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            {...props}
          />
          <label className="text-muted">{props.errorMessage}</label>
        </div>
      );
  }

  return input;
};

export default Input;
