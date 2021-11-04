import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ModalInput from "../../UI/Input";
import LeftSidebar from "./Components/leftSideBar";
import { useFormik } from "formik";
import { FORGOT_PASSWORD_STATE } from "../../../Globals/InitialValues/Student";
import { FORGOT_PASSWORD_YUP } from "../../Formik/Student/yupValidation";
import { Request_ForgotPassword } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button";
export default function StudentRegister(props) {
  // Dispatch
  const dispatch = useDispatch();
  const store = useSelector((state) => state.globals);

  // formik
  const formik = useFormik({
    initialValues: FORGOT_PASSWORD_STATE,
    validationSchema: FORGOT_PASSWORD_YUP,
    onSubmit: (values) => {
      dispatch(Request_ForgotPassword(values, formik, props));
    },
    handleChange: (e) => {
      const { name, value } = e.target;
      formik.setFieldValue(name, value);
    },
  });
  return (
    <Modal
      className="student-modal"
      show={props.show}
      centered
      onHide={() => props.handleModal("reqforgotPassword")}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between p-3">
          <div className="modal-left-side">
            <div className="Login">
              <div className="heading pb-4">Connexion</div>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <ModalInput
                    placeholder="Adresse mail"
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="formikError">{formik.errors.email}</div>
                  ) : null}
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
