import React from "react";
import { FaFacebookF, GrGooglePlus } from "react-icons/all";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar({
  ModalInput,
  dispatch,
  useFormik,
  LOGIN_STATE,
  LOGIN_YUP,
  login,
  handleModal,
}) {
  const store = useSelector((state) => state.auth);
  const formik = useFormik({
    initialValues: LOGIN_STATE,
    validationSchema: LOGIN_YUP,
    onSubmit: (values) => {
      dispatch(login(values, formik));
    },
    handleChange: (e) => {
      const { name, value } = e.target;
      formik.setFieldValue(name, value);
    },
  });
  return (
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

          <div className="my-4 pb-5">
            <ModalInput
              placeholder="Mot de passe"
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
          <button
            className="modal-button "
            type="submit"
            disabled={store.loading}
          >
            {store.loading ? "LOADING...." : "Se connecter"}
          </button>
        </form>
        <div className="mt-5">
          <div className="forgetpassword">
            <a onClick={() => handleModal("reqforgotPassword")}>
              {" "}
              Mot de passe oublié ?
            </a>
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
  );
}
