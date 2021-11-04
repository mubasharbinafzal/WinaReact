import React from 'react';
import "./ModalInput.css";

const ModalInput = (props) => {
    return (
        <div className="modal-input">
            <input {...props} />
        </div>
    )
}

export default ModalInput
