import React, { useState, useEffect } from "react"
import { Modal } from "react-bootstrap"
import ModalInput from "../../UI/Input"
import LeftSidebar from "./Components/leftSideBar"
import { useFormik } from "formik"
import { RESET_PASSWORD_STATE } from "../../../Globals/InitialValues/Student"
import { RESET_PASSWORD_YUP } from "../../Formik/Student/yupValidation"
import { Reset_ForgotPassword } from "../../../Redux/actions"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"

import Button from "../../UI/Button"
export default function StudentRegister(props) {
  let history = useHistory()

  // Dispatch
  const dispatch = useDispatch()
  const store = useSelector((state) => state.auth)

  // formik
  const formik = useFormik({
    initialValues: RESET_PASSWORD_STATE,
    validationSchema: RESET_PASSWORD_YUP,
    onSubmit: (values) => {
      dispatch(Reset_ForgotPassword(values, formik, props, history))
    },
    handleChange: (e) => {
      const { name, value } = e.target
      formik.setFieldValue(name, value)
    },
  })
  return (
    <Modal
      className="student-modal"
      show={props.show}
      centered
      onHide={() => props.handleModal("resetPassword")}
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
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="formikError">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <ModalInput
                    placeholder="Confirm Passsword"
                    type="password"
                    name="confirm"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm}
                  />
                  {formik.touched.confirm && formik.errors.confirm ? (
                    <div className="formikError">{formik.errors.confirm}</div>
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
  )
}
