import React, { useState, useEffect } from "react"
import { Row, Col, Nav, Tab, Tabs, Image } from "react-bootstrap"
import AddSchool from "./Modals/add_School"
import EditSchool from "./Modals/edit_School"
import General_Info from "./Modals/general_Info"
import _ from "lodash"
import { Link } from "react-router-dom"
import InfoCard from "../../../../../components/UI/InfoCard/InfoCard"
import { DEFAULT_IMAGE } from "../../../../../Globals/index"
import { useDispatch, useSelector } from "react-redux"
import {
  Delete_School_Info,
  Add_Image_info_Student,
} from "../../../../../Redux/actions"
import { useFormik } from "formik"
import { baseUri } from "../../../../../urlConfig"
const GeneralInformations = () => {
  const store = useSelector((state) => state.student)
  const dispatch = useDispatch()
  const Loggin_User = store.user.firstName + " " + store.user.lastName
  const Education = store.user.student && store.user.student.education
  const STUDENT_IMAGE =
    store.user.student && store.user.student.professional_Picture
      ? store.user.student.professional_Picture.image
      : ""
  const [show, setShow] = useState(false)
  const [edit_school_show, setedit_school_show] = useState(false)
  const [edit_school_id, setedit_school_id] = useState("")
  const [general_info, setgeneral_info] = useState(false)
  const [schoolsArray, setschoolsArray] = useState([])

  const formik = useFormik({})
  // useEffect
  useEffect(() => {
    let tempEducation = _.cloneDeep(Education)
    tempEducation.forEach(function (v) {
      delete v._id
    })
    setschoolsArray(tempEducation)
  }, [Education])
  const SchoolModalShow = () => {
    setShow(!show)
  }
  const GeneralInfoModalShow = () => {
    setgeneral_info(!general_info)
  }
  const handleDeleteSchool = (id) => {
    if (id) {
      dispatch(Delete_School_Info(id))
    }
  }
  const EditSchoolModalShow = (id) => {
    if (!edit_school_id) {
      setedit_school_id(id)
    }
    setedit_school_show(!edit_school_show)
  }

  return (
    <>
      <AddSchool show={show} setShow={setShow} schoolsArray={schoolsArray} />
      <General_Info show={general_info} setShow={setgeneral_info} />
      <EditSchool
        id={edit_school_id}
        show={edit_school_show}
        setShow={setedit_school_show}
        data={Education}
        schoolsArray={schoolsArray}
        setedit_school_id={setedit_school_id}
      />

      <Tabs
        defaultActiveKey="generalPresentation"
        id="Profile"
        className="Profile upper-nav custom-tabs"
      >
        <Tab
          eventKey="generalPresentation"
          title="Présentation Générales"
          className="h-100"
        >
          <div className="genProfileBox">
            <div className="genProfile">
              <Row className="p-3 w-100">
                <Col lg={3} md={4}>
                  <div className="profileImage">
                    <Image
                      alt="iamge2"
                      src={
                        store.user.student.professional_Picture.image
                          ? `${baseUri}/views/uploads/${store.user.student.professional_Picture.image}`
                          : DEFAULT_IMAGE
                      }
                      hidden={
                        store.user.student.professional_Picture.image
                          ? false
                          : true
                      }
                    />
                  </div>
                  <div className="profileImage">
                    <div className="embed-responsive embed-responsive-16by9">
                      <iframe
                        hidden={
                          store.user.student.presentation_Video.video
                            ? false
                            : true
                        }
                        className="embed-responsive-item"
                        // src={`../images/video.mp4`}
                        src={
                          `${baseUri}/views/uploads/${store.user.student.presentation_Video.video}`
                            ? `${baseUri}/views/uploads/${store.user.student.presentation_Video.video}`
                            : `../images/video.mp4`
                        }
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </Col>
                <Col lg={9} md={8}>
                  <div className="profilename">{Loggin_User}</div>
                  <div className="profileProfession">{store.user.type}</div>
                  <div className="generalDescription">Description générale</div>
                  <div className="description">
                    {store.user.student.general_Presentation
                      ? store.user.student.general_Presentation
                      : ""}
                  </div>
                  <div className="professionalNetwork">Réseau pro</div>
                  <ul className="PLinks">
                    <li>
                      <Image src="../images/linkedIn.png" />
                    </li>
                    <li>Linkedin &nbsp;&nbsp;: </li>
                    {store.user.student.professional_networks &&
                    Object.keys(store.user.student.professional_networks)
                      .length > 0 ? (
                      <li>
                        <a
                          href={`${store.user.student.professional_networks.linkedIn}`}
                          target="_blank"
                        >
                          {store.user.student.professional_networks.linkedIn
                            ? store.user.student.professional_networks.linkedIn
                            : ""}
                        </a>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                  <ul className="PLinks">
                    <li>
                      <Image src="../images/behance.png" />
                    </li>
                    <li>Behance &nbsp;&nbsp;: </li>
                    {store.user.student.professional_networks &&
                    Object.keys(store.user.student.professional_networks)
                      .length > 0 ? (
                      <li>
                        <a
                          href={`${store.user.student.professional_networks.Behance}`}
                          target="_blank"
                        >
                          {store.user.student.professional_networks.Behance
                            ? store.user.student.professional_networks.Behance
                            : ""}
                        </a>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                  <ul className="PLinks">
                    <li>
                      <Image src="../images/dribble.png" />
                    </li>
                    <li>Dribble &nbsp;&nbsp;: </li>
                    {store.user.student.professional_networks &&
                    Object.keys(store.user.student.professional_networks)
                      .length > 0 ? (
                      <li>
                        <a
                          href={`${store.user.student.professional_networks.Dribble}`}
                          target="_blank"
                        >
                          {store.user.student.professional_networks.Dribble
                            ? store.user.student.professional_networks.Dribble
                            : ""}
                        </a>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                  <ul className="PLinks">
                    <li>
                      <Image src="../images/github.png" />
                    </li>
                    <li>Github &nbsp;&nbsp;: </li>
                    {store.user.student.professional_networks &&
                    Object.keys(store.user.student.professional_networks)
                      .length > 0 ? (
                      <li>
                        <a
                          href={`${store.user.student.professional_networks.Github}`}
                          target="_blank"
                        >
                          {store.user.student.professional_networks.Github
                            ? store.user.student.professional_networks.Github
                            : ""}
                        </a>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </Col>
                <Link to="#" className="edit_icons">
                  <Image
                    src="../images/edit_icon.png"
                    onClick={GeneralInfoModalShow}
                  />
                </Link>
              </Row>
            </div>
          </div>
        </Tab>

        {/* DiplomaSchool Tab*/}

        <Tab
          eventKey="diplomaSchool"
          title="Formation / École"
          className="h-100"
        >
          <div className="diplomaSchoolBox">
            <div className="diplomaSchool">
              <Image
                className="modal-icon"
                src="../images/add_icons.png"
                onClick={SchoolModalShow}
              />

              {Education && Education.length > 0 ? (
                Education.map((card, index) => (
                  <InfoCard
                    EditSchoolModalShow={EditSchoolModalShow}
                    onDelete={() => handleDeleteSchool(card._id)}
                    item={card}
                    key={index}
                    cindex={index}
                    type="EDUCATION"
                  />
                ))
              ) : (
                <h1 className="text-center">No school found</h1>
              )}
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  )
}
export default GeneralInformations
