import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ModalInput from "../../UI/Input";
import LeftSidebar from "./Components/leftSideBar";
import { useFormik } from "formik";
import {
  SIGNUP_STATE,
  LOGIN_STATE,
} from "../../../Globals/InitialValues/Student";
import { SIGNUP_YUP, LOGIN_YUP } from "../../Formik/Student/yupValidation";
import { Student_Signup, login, getApiAdress } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import AutoComplete from "../../UI/AutoComplete";
import Texts from "../../../Globals/Texts";

export default function StudentRegister(props) {
  // Dispatch
  const dispatch = useDispatch();
  const store = useSelector((state) => state.student);
  const store2 = useSelector((state) => state.globals);

  //states
  const [items, setItems] = useState([]);

  // end

  // formik
  const formik = useFormik({
    initialValues: SIGNUP_STATE,
    validationSchema: SIGNUP_YUP,
    onSubmit: (values) => {
      dispatch(Student_Signup(values, formik));

      // console.log(values, "values");
    },
  });
  // onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value.length <= 10) {
        formik.setFieldValue(name, value.replace(/\D/g, ""));
      }
    } else {
      formik.setFieldValue(name, value);
    }
  };

  const handleAddressChange = (value) => {
    dispatch(getApiAdress(value));
    if (store2.items.length > 0) {
      setItems(
        store2.items.map((item) => {
          return {
            id: item.properties.id,
            name: item.properties.label,
            city: item.properties.city,
            postalCode: item.properties.postcode,
            lat: item.geometry.coordinates[1],
            lng: item.geometry.coordinates[0],
          };
        })
      );
    }
  };
  const onSubmitAddress = (value) => {
    formik.setFieldValue("address", {
      city: value.city,
      street: "Street",
      zip: value.PostalCode,
      longitude: value.lng,
      latitude: value.lat,
    });
  };
  return (
    <Modal
      className="student-modal"
      show={props.show}
      centered
      onHide={() => props.handleModal("student")}
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-between p-3">
          <LeftSidebar
            ModalInput={ModalInput}
            dispatch={dispatch}
            useFormik={useFormik}
            LOGIN_STATE={LOGIN_STATE}
            LOGIN_YUP={LOGIN_YUP}
            login={login}
            useSelector={useSelector}
            handleModal={props.handleModal}
          />
          <div className="modal-right-side">
            <div className="Register">
              <div className="heading pb-4">S’inscrire</div>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <ModalInput
                    name="firstName"
                    placeholder="Prénom"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    type="text"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="formikError">{formik.errors.firstName}</div>
                  ) : null}
                </div>
                <div className="my-4">
                  <ModalInput
                    placeholder="Nom"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    type="text"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="formikError">{formik.errors.lastName}</div>
                  ) : null}
                </div>
                <div className="my-4">
                  <ModalInput
                    placeholder="Adresse mail"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="formikError">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="my-4">
                  <ModalInput
                    placeholder="enter password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="formikError">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="my-4">
                  <ModalInput
                    placeholder="enter confirm_password"
                    type="password"
                    name="confirm_password"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm_password}
                  />
                  {formik.touched.confirm_password &&
                  formik.errors.confirm_password ? (
                    <div className="formikError">
                      {formik.errors.confirm_password}
                    </div>
                  ) : null}
                </div>
                <div className="my-4">
                  <ModalInput
                    placeholder="Numéro de téléphone"
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phone}
                  />
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="formikError">{formik.errors.phone}</div>
                  ) : null}
                </div>
                <div className="my-4">
                  <AutoComplete
                    formik={formik}
                    onChange={handleAddressChange}
                    placeholder={Texts.userProfile}
                    items={items}
                    name={"address"}
                    loading={store2.loading}
                    onSubmit={onSubmitAddress}
                  />
                  {formik.touched.address && formik.errors.address ? (
                    <div className="formikErrorAuto">
                      {" "}
                      {formik.errors.address.city}
                    </div>
                  ) : null}
                </div>
                <button
                  className="modal-button modal-register-btn"
                  type="submit"
                  disabled={store.loading}
                >
                  {store.loading ? "Loading..." : "S’inscrire"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
