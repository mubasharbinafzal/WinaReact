import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalInput from "../../UI/ModalInput/ModalInput";
import { FaFacebookF, GrGooglePlus } from "react-icons/all";

const StudentLogin = (props) => {
  // const classes = useStyles();
  const { show, handleModal } = props;
  return (
    <Modal
      className="student-modal"
      show={show}
      centered
      onHide={() => handleModal("main")}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between p-3">
          <div className="modal-left-side">
            <div className="Login">
              <div className="heading pb-4">Connexion</div>
              <div>
                <ModalInput placeholder="Adresse mail" type="email" />
              </div>

              <div className="my-4 pb-5">
                <ModalInput placeholder="Mot de passe" type="password" />
              </div>

              <div className="mt-5">
                <div className="modal-button" color="primary">
                  Se connecter
                </div>
                <div className="forgetpassword">
                  <Link to="/">Mot de passe oublié ?</Link>
                </div>
                <div className="faceBookGoogleGroup">
                  <div color="primary" className="w-100 modal-social-buttons">
                    <div className="modal-social-btn modal-facebook-btn">
                      <span>
                        <FaFacebookF className="modal-social-icon" />
                      </span>
                      &nbsp;&nbsp; Facebook
                    </div>
                    <div className="modal-social-btn modal-google-btn">
                      <span>
                        <GrGooglePlus className="modal-social-icon-google mr-2" />
                      </span>
                      Google +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-right-side">
            <div className="Register">
              <div className="heading">S’inscrire</div>
              <div className="modal-sub-heading ">ÉTUDIANT</div>
              <div className="studentRegisterbtn">
                <div
                  className="modal-button"
                  onClick={() => handleModal("student")}
                >
                  S’inscrire
                </div>
              </div>
              <div className="modal-sub-heading">ENTREPRISE</div>
              <div className="BUSINESSRegisterbtn">
                <div
                  className="modal-button mt-4"
                  onClick={() => handleModal("company")}
                >
                  Société
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default StudentLogin;
