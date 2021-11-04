import React from "react";
import { Modal, Button } from "react-bootstrap";

/**
 * @author
 * @function Modal
 **/

const NewModal = (props) => {
  return (
    <Modal
      size={props.size}
      show={props.show}
      onHide={props.handleClose}
      className={props.className}
      dialogClassName="schoolDiplomaModal"
      aria-labelledby="example-custom-modal-styling-title"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        {props.buttons
          ? props.buttons.map((btn, index) => (
              <Button key={index} variant={btn.color} onClick={btn.onClick}>
                {btn.label}
              </Button>
            ))
          : ""}
      </Modal.Footer>
    </Modal>
  );
};

export default NewModal;
