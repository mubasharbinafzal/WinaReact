import React from "react";
import { Image, Form, InputGroup, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { baseUri } from "../../../../urlConfig";
import { DEFAULT_IMAGE } from "../../../../Globals";

const Header = () => {
  const store = useSelector((state) => state.student);
  const STUDENT_IMAGE =
    store.user.student &&
    store.user.student.professional_picture &&
    store.user.student.professional_picture.image;
  return (
    <>
      <div className="generalInformation d-flex justify-content-between align-items-center">
        <div className="search_bar">
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <i className="fa fa-search" aria-hidden="true"></i>
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroupUsername2"
              placeholder="Recherche"
            />
          </InputGroup>
        </div>

        <div className="header-profile">
          <Image className="notification" src="../images/bell_icon.png" />
          <Image
            className="profilePic"
            src={STUDENT_IMAGE ? `${baseUri}/${STUDENT_IMAGE}` : DEFAULT_IMAGE}
          />
        </div>
      </div>
    </>
  );
};
export default Header;
