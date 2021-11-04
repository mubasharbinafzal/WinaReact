import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import ModalInput from "../../UI/Input";
import { Company_Types } from "../../Data";
import LeftSidebar from "./Components/leftSideBar";
import {
  FIRST_SIGNUP_STATE,
  SECOND_SIGNUP_STATE,
  LOGIN_STATE,
} from "../../../Globals/InitialValues/Company";
import {
  FIRST_SIGNUP_YUP,
  SECOND_SIGNUP_YUP,
  LOGIN_YUP,
} from "../../Formik/Company/yupValidation";
import { login, getApiAdress, Company_Signup } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import AutoComplete from "../../UI/AutoComplete";
import Button from "../../UI//Button";
import _ from "lodash";

const StudentRegister = (props) => {
  // Dispatch
  const dispatch = useDispatch();
  const store = useSelector((state) => state.company);
  const store2 = useSelector((state) => state.globals);

  //states
  const [items, setItems] = useState([]);
  const [Show, setShow] = useState(false);
  // end

  // formik
  const formik = useFormik({
    initialValues: FIRST_SIGNUP_STATE,
    validationSchema: FIRST_SIGNUP_YUP,
    onSubmit: (values) => {
      handleNextChange();
    },
  });
  const formik2 = useFormik({
    initialValues: SECOND_SIGNUP_STATE,
    validationSchema: SECOND_SIGNUP_YUP,
    onSubmit: (values) => {
      let tempEducation = _.cloneDeep(values);
      tempEducation.contactPerson = {
        firstName: formik.values.firstName,
        lastName: formik.values.lastName,
        email: formik.values.email,
        password: formik.values.password,
        confirm_password: formik.values.confirm_password,
        phone: formik.values.phone,
        positionHeld: formik.values.positionHeld,
      };
      [
        "firstName",
        "lastName",
        "email",
        "password",
        "confirm_password",
        "phone",
        "positionHeld",
      ].forEach((e) => delete tempEducation[e]);
      dispatch(Company_Signup(tempEducation, formik,props.handleModal));
      formik2.setSubmitting(false);
      formik.setSubmitting(false);
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
  const handleChange2 = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (value.length <= 10) {
        formik2.setFieldValue(name, value.replace(/\D/g, ""));
      }
    } else {
      formik2.setFieldValue(name, value);
    }
  };
  const handleAddressChange = (value) => {
    formik2.setFieldValue("address", {
      city: "",
      street: "",
      zip: "",
      longitude: "",
      latitude: "",
    });
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
    formik2.setFieldValue("address", {
      city: value.city,
      street: "Street",
      zip: value.PostalCode ? value.postalCode : "76520",
      longitude: value.lng,
      latitude: value.lat,
    });
  };
  useEffect(() => {
    setShow(!Show);
  }, [props.show]);
  const handleNextChange = () => {
    setShow(!Show);
  };

  return (
    <Modal
      className="student-modal"
      show={props.show}
      centered
      onHide={() => props.handleModal("company")}
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
              <div className="heading pb-4">S’inscrire - Société</div>

              {Show === false ? (
                <>
                  <form onSubmit={formik.handleSubmit}>
                    {/* back button */}

                    {/* ** */}
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
                        <div className="formikError">
                          {formik.errors.firstName}
                        </div>
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
                        <div className="formikError">
                          {formik.errors.lastName}
                        </div>
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
                        placeholder="Enter Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                      />
                      {formik.touched.password && formik.errors.password ? (
                        <div className="formikError">
                          {formik.errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="my-4">
                      <ModalInput
                        placeholder="Enter Confirm_Password"
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
                      <ModalInput
                        placeholder="Poste occupé"
                        type="text"
                        name="positionHeld"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.positionHeld}
                      />
                      {formik.touched.positionHeld &&
                      formik.errors.positionHeld ? (
                        <div className="formikError">
                          {formik.errors.positionHeld}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Button
                        value="Next"
                        variant="primary"
                        className="Enregistrer"
                        type="submit"
                        // onClick={handleNextChange}
                      />
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <form onSubmit={formik2.handleSubmit}>
                    <div>
                      <ModalInput
                        value="Back"
                        variant="primary"
                        className="Enregistrer"
                        type="button"
                        onClick={handleNextChange}
                      />
                    </div>
                    <div>
                      <ModalInput
                        placeholder="Nom de l’entreprise"
                        name="name"
                        onChange={handleChange2}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.name}
                        type="text"
                      />
                      {formik2.touched.name && formik2.errors.name ? (
                        <div className="formikError">{formik2.errors.name}</div>
                      ) : null}
                    </div>
                    <div className="my-4">
                      <AutoComplete
                        formik={formik2}
                        onChange={handleAddressChange}
                        placeholder="Adresse"
                        items={items}
                        loading={store2.loading}
                        name={"address"}
                        onSubmit={onSubmitAddress}
                      />
                      {formik2.touched.address && formik2.errors.address ? (
                        <div className="formikErrorAuto">
                          {" "}
                          {formik2.errors.address.city}
                        </div>
                      ) : null}
                    </div>
                    <div className="my-4">
                      <ModalInput
                        placeholder="Type d Entreprise"
                        type="select"
                        options={Company_Types}
                        name="company_type"
                        onChange={handleChange2}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.company_type}
                      />
                      {formik2.touched.company_type &&
                      formik2.errors.company_type ? (
                        <div className="formikError">
                          {formik2.errors.company_type}
                        </div>
                      ) : null}
                    </div>
                    <div className="my-4">
                      <ModalInput
                        placeholder="Numéro SIRET"
                        type="text"
                        name="siretNumber"
                        onChange={handleChange2}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.siretNumber}
                      />
                      {formik2.touched.siretNumber &&
                      formik2.errors.siretNumber ? (
                        <div className="formikError">
                          {formik2.errors.siretNumber}
                        </div>
                      ) : null}
                    </div>
                    <div className="my-4">
                      <ModalInput
                        placeholder="Site internet"
                        type="text"
                        name="website"
                        onChange={handleChange2}
                        onBlur={formik2.handleBlur}
                        value={formik2.values.website}
                      />
                    </div>

                    <div className="my-4">
                      <ModalInput
                        placeholder="Profil Linkedin"
                        type="text"
                        name="linkedIn"
                        onChange={handleChange2}
                        value={formik2.values.linkedIn}
                      />
                    </div>

                    <div className="my-4">
                      <ModalInput
                        placeholder="L’entreprise fait-elle partie d’un groupement ? Si oui, préciser le nom"
                        type="text"
                        name="groupName"
                        onChange={handleChange2}
                        value={formik2.values.groupName}
                      />
                    </div>
                    <button
                      className="modal-button modal-register-btn"
                      type="submit"
                      disabled={store.loading}
                    >
                      {store.loading ? "Loading..." : "S’inscrire"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default StudentRegister;
