import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ModalInput from "../../UI/Input";
import LeftSidebar from "./Components/leftSideBar";
import { useFormik } from "formik";
import { VERIFY_STATE } from "../../../Globals/InitialValues/Student";
import { VERIFY_YUP } from "../../Formik/Student/yupValidation";
import { Verify_email } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
import * as Yup from "yup";
import { useHistory, useParams } from "react-router-dom";
export default function StudentRegister(props) {
  // Dispatch
  const dispatch = useDispatch();
  const history = useHistory();
  let params = useParams();
  const store = useSelector((state) => state.auth);

  // formik
  const formik = useFormik({
    initialValues: VERIFY_STATE,
    validationSchema: VERIFY_YUP,
    onSubmit: (values) => {
      dispatch(Verify_email(params.token, formik, props, history));
    },
    handleChange: (e) => {
      const { name, value } = e.target;
      formik.setFieldValue(name, value);
    },
  });

  useEffect(() => {
    formik.setFieldValue("token", params.token);
  }, [params.token]);
  return (
    <Modal
      className="student-modal"
      show={props.show}
      centered
      onHide={() => props.handleModal("emailVerify")}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between p-3">
          <div className="modal-left-side">
            <div className="Login">
              <div className="heading pb-4">Connexion</div>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <p>Click below to verify your email</p>
                </div>

                {store.loading ? (
                  <Button
                    className="Enregistrer"
                    type="submit"
                    variant="primary"
                    value="Loading...."
                    disabled={store.loading}
                  />
                ) : (
                  <Button
                    className="Enregistrer"
                    type="submit"
                    variant="primary"
                    value="Enregistrer"
                    disabled={false}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
