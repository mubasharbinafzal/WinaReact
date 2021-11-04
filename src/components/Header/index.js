import React, { useState, useEffect } from "react";
import MainModal from "./Modals/mainModal";
import StudentRegister from "./Modals/studentRegisterModal";
import CompanyRegister from "./Modals/companyRegisterModal";
import RequestForgotPasswordModal from "./Modals/requestModal";
import ResetPasswordModal from "./Modals/resetModal";
import EmailVerificationModal from "./Modals/emailVerificationModal";

import HomeHeader from "./header";

/**
 * @author
 * @function Header
 **/

const Header = (props) => {
  const [studentModal, setstudentModal] = useState(false);
  const [companyModal, setcompanyModal] = useState(false);
  const [mainModal, setmainModal] = useState(false);
  const [requestModal, setrequestModal] = useState(false);
  const [resetModal, setresetModal] = useState(false);
  const [emailVerifyModal, setemailVerifyModal] = useState(false);

  const handleModal = (name) => {
    if (name === "student") {
      setstudentModal(!studentModal);
      setmainModal(false);
      setcompanyModal(false);
    } else if (name === "company") {
      setcompanyModal(!companyModal);
      setstudentModal(false);
      setmainModal(false);
    } else if (name === "main") {
      setmainModal(!mainModal);
      setcompanyModal(false);
      setstudentModal(false);
    } else if (name === "reqforgotPassword") {
      setrequestModal(!requestModal);
      setmainModal(false);
      setcompanyModal(false);
      setstudentModal(false);
    } else if (name === "emailVerify") {
      setemailVerifyModal(!emailVerifyModal);
      setresetModal(false);
      setrequestModal(false);
      setmainModal(false);
      setcompanyModal(false);
      setstudentModal(false);
    } else {
      setresetModal(!resetModal);
      setrequestModal(false);
      setmainModal(false);
      setcompanyModal(false);
      setstudentModal(false);
    }
  };
  useEffect(() => {
    if (props.id) {
      setresetModal(!resetModal);
    } else if (props.token) {
      setemailVerifyModal(!emailVerifyModal);
    }
  }, []);
  return (
    <>
      <MainModal show={mainModal} handleModal={handleModal} />
      <StudentRegister show={studentModal} handleModal={handleModal} />
      <CompanyRegister show={companyModal} handleModal={handleModal} />
      <RequestForgotPasswordModal
        show={requestModal}
        handleModal={handleModal}
      />
      <ResetPasswordModal
        show={resetModal}
        handleModal={handleModal}
        id={props.id}
      />
      <EmailVerificationModal
        show={emailVerifyModal}
        handleModal={handleModal}
        id={props.token}
      />

      <HomeHeader handleModal={handleModal} />
      <div className="homeBackground">
        <div className="homebackground-text">
          <h1>
            BOOSTER DE <br />
            L’APPRENTISSAGE
          </h1>
          <p>Faire de l’alternance, la voix de l’excellence</p>
        </div>
      </div>
    </>
  );
};

export default Header;
