import React, { useState, useEffect } from "react"
import { Row, Col, Nav, Tab, Tabs, Image, NavItem } from "react-bootstrap"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import OfferCardItem from "../../../../../components/UI/CardWithImage/OfferCardItem"
import CardWithImage from "../../../../../components/UI/CardWithImage/CardWithImage"
import CompanyCardDetail from "./CompanyCardDetail/CompanyCardDetail"
import { useDispatch, useSelector } from "react-redux"
import { baseUri } from "../../../../../urlConfig"
import { DEFAULT_IMAGE } from "../../../../../Globals/index"
import InfoCard from "../../../../../components/UI/InfoCard/InfoCard"
import SubmitButton from "../../../../../components/UI/Button"
import BookingModal from "../../../../../components/UI/Modal"
import Calendar from "../../../../../components/UI/DateTimePicker"
import Chip from "../../../../../components/UI/Chip"

import CVEngine from "../../../Student/DashbordView/ProfessionalProfile/CVEngine"
import {
  Get_Company_Jobs,
  Offer_Decion_By_Company,
  Get_Applied_Jobs,
  RecievedOffer_Decion_By_Company,
  Get_Company_Applied_Jobs,
  Cancel_Offer_Decion_By_Company,
  Booking_Decion_By_Company,
} from "../../../../../Redux/actions"
const OverviewOfOffers = () => {
  const store = useSelector((state) => state.company)
  const dispatch = useDispatch()
  let JOBS = store.jobs && store.jobs
  let STUDENT = store.studentBySearch && store.studentBySearch
  let ACCEPTED_OFFERS =
    JOBS && JOBS.filter((jb) => jb.offer_status === "accepted")
  let RECIEVED_OFFERS = store.student_appliedJobs && store.student_appliedJobs
  let SENT_OFFERS = store.company_appliedJobs && store.company_appliedJobs

  const [key, setKey] = useState("Offres")
  const [key2, setKey2] = useState("first")

  const [show, setShow] = useState(false)
  const classes = useStyles()
  const [matchSentDetail, setMatchSentDetail] = useState(false)
  const [matchReceiveDetail, setMatchReceiveDetail] = useState(false)
  const [userDetail, setUserDetail] = useState(false)
  const [isDetail, setisDetail] = useState(false)
  const [offerID, setofferID] = useState("")
  

  const [RecievofferID, setRecievofferID] = useState("")
  const [bookingSlot, setbookingSlot] = useState()
  const [AppointmentsArray, setAppointmentsArray] = useState("")

  const [SentfferID, setSentfferID] = useState("")
  const [jobID, setjobID] = useState("")

  const [booking, setBooking] = useState(false)
  const [bookingError, setBookingError] = useState("")

  const [studentDetail, setstudentDetail] = useState(false)
  const [studentID, setstudentID] = useState("")
  const [bookingstudentID, setbookingstudentID] = useState("")

  const [studentFormData, setstudentFormData] = useState("")
  // offers functions
  const handleOfferAccepted = (id, offerID, decision) => {
    setjobID(offerID)
    dispatch(
      Offer_Decion_By_Company(
        id,
        offerID,
        decision,
        setKey,
        "Offres",
        setisDetail,
        setstudentDetail,
        handleBooking
      )
    )
    

  }
  const handlerRecievedOfferAccepted = (id, jobID, decision) => {
    setjobID(jobID)
    
    dispatch(
      RecievedOffer_Decion_By_Company(
        id,
        RecievofferID,
        decision,
        setKey,
        "Offres",
        setstudentDetail,
        setMatchReceiveDetail,
        handleBooking
      )
    )
  }
  const handlerRecievedOfferRejected = (id, decision) => {
    dispatch(
      RecievedOffer_Decion_By_Company(
        id,
        RecievofferID,
        decision,
        setKey,
        "Offres",
        setstudentDetail,
        setMatchReceiveDetail
      )
    )
  }

  //

  const handleOfferRejected = (id, offerID, decision) => {
    dispatch(
      Offer_Decion_By_Company(id, offerID, decision, setKey, "MatchReceived")
    )
  }

  const handleStudentDetail = (id) => {
    setstudentID(id)
    setstudentDetail(!studentDetail)
  }
  const handleRecievedStudentDetail = (id) => {
    if (RECIEVED_OFFERS && RECIEVED_OFFERS.length > 0) {
      let fill = RECIEVED_OFFERS.find((dt) => dt.student._id === id)
      setstudentDetail(!studentDetail)
      setstudentFormData(fill.student)
    }
  }
  const handleSentStudentDetail = (id) => {
    if (SENT_OFFERS && SENT_OFFERS.length > 0) {
      let fill = SENT_OFFERS.find((dt) => dt.student._id === id)
      setstudentDetail(!studentDetail)
      setstudentFormData(fill.student)
    }
  }
  const handleCancelOffer = (id, decision) => {
    dispatch(
      Cancel_Offer_Decion_By_Company(
        id,
        SentfferID,
        setKey,
        "Offres",
        setstudentDetail,
        setMatchSentDetail,
        setisDetail
      )
    )
  }
  useEffect(() => {
    if (studentID && STUDENT) {
      let fill = STUDENT.find((dt) => dt._id === studentID)
      setstudentFormData(fill)
    }
  }, [studentID])

  useEffect(() => {
    dispatch(Get_Company_Jobs())
    if (SentfferID) {
      dispatch(Get_Company_Applied_Jobs(SentfferID))
    } else if (RecievofferID) {
      dispatch(Get_Applied_Jobs(RecievofferID))
    }
  }, [key, setKey, setSentfferID, setRecievofferID])

  const handleDetail = (id) => {
    setofferID(id)
    setisDetail(!isDetail)
  }

  const matchSentDetailHandler = (id) => {
    dispatch(Get_Company_Applied_Jobs(id))
    setSentfferID(id)
    setMatchSentDetail(!matchSentDetail)
  }

  const matchReceiveDetailHandler = (id) => {
    setRecievofferID(id)
    dispatch(Get_Applied_Jobs(id))

    setMatchReceiveDetail(!matchReceiveDetail)
  }

  const userDetailHandler = (btn) => {
    setUserDetail(btn)
  }
  const handleBooking = (id) => {
    if (booking === false && id) {
      setbookingstudentID(id)
    }
    setAppointmentsArray([])
    setBooking(!booking)
  }
  const handleSubmitBooking = () => {
    if (AppointmentsArray ) {
      dispatch(
        Booking_Decion_By_Company(AppointmentsArray, bookingstudentID, jobID)
      )
      setBooking(!booking)
    } else {
      setBookingError("Please add atleast one appointment")
    }
  }
  
  const handleMultipleAppointments = () => {
    if (bookingSlot !== undefined) {
      if (AppointmentsArray && AppointmentsArray.length > 0) {
        let fill = AppointmentsArray.some((ft) => ft == bookingSlot)
        if (fill == true) {
          setBookingError("Appointment already existed")
        } else {
          setAppointmentsArray([...AppointmentsArray, bookingSlot])
          setbookingSlot("")
          setBookingError("")
        }
      } else {
        setAppointmentsArray([...AppointmentsArray, bookingSlot])
        setbookingSlot("")
        setBookingError("")
      }
    } else {
      setBookingError("Required")
    }
  }
  if (studentDetail === false) {
    return (
      <>
        <BookingModal
          modalTitle="Booking Slot"
          show={booking}
          className="custom-modal"
          handleClose={() => setBooking(false)}
          children={
            <div class="container">
              <div className="row">
                <div className="col-lg-12 ">
                  <div className="card-with-image-calender-container">
                    <div className="card-with-image-calender-wrapper">
                      <div className="card-with-image-calender-heading">
                        Book a time slot
                      </div>
                    </div>

                    <div className="card-with-image-calender-wrapper">
                      <div className="card-with-image-calender">
                        <Calendar
                          value={bookingSlot}
                          onChange={(e) => setbookingSlot(e.target.value)}
                        />
                        <div>
                          {bookingError ? (
                            <div className="formikErrorAuto">
                              {bookingError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <SubmitButton
                          className="Enregistrer"
                          onClick={handleMultipleAppointments}
                          variant="primary"
                          value="Add"
                        />
                      </div>
                    </div>
                    <div style={{ height: "200px", overflow: "auto" }}>
                      <Chip data={AppointmentsArray} />
                    </div>

                    <div className="text-right">
                      <SubmitButton
                        className="Enregistrer"
                        onClick={handleSubmitBooking}
                        variant="primary"
                        value="Enregistrer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        {isDetail === false ? (
          ""
        ) : (
          <CompanyCardDetail
            isPerc
            offerID={offerID}
            handleStudentDetail={handleStudentDetail}
            handleOfferAccepted={handleOfferAccepted}
            handleOfferRejected={handleOfferRejected}
          />
        )}
        <Tabs
          activeKey={key}
          id="OverviewOfOffers"
          className="OverviewOfOffers upper-nav custom-tabs"
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="Offres" title="Offres" className="h-100">
            <div className="AnnoncesViewOffersBox">
              <div className="offers custom-box">
                {JOBS && JOBS.length > 0 ? (
                  JOBS.map((item, index) => (
                    <CardWithImage
                      item={item}
                      key={index}
                      type="company"
                      eventKey={key}
                      handleDetail={handleDetail}
                    />
                  ))
                ) : (
                  <h1 className="text-center">No offers found</h1>
                )}
              </div>
            </div>
          </Tab>
          <Tab eventKey="SentMatches" title="Match envoyé" className="h-100">
            <div className="AnnoncesViewOffersBox">
              <div className="offers custom-box">
                {matchSentDetail === false ? (
                  JOBS && JOBS.length > 0 ? (
                    JOBS.map((item, index) => (
                      <CardWithImage
                        key={index}
                        item={item}
                        type="company"
                        eventKey={key}
                        handleDetail={handleDetail}
                        matchSentDetailHandler={matchSentDetailHandler}
                      />
                    ))
                  ) : (
                    <h1 className="text-center">No offers found</h1>
                  )
                ) : SENT_OFFERS && SENT_OFFERS.length > 0 ? (
                  SENT_OFFERS.map((item, index) => (
                    <CardWithImage
                      key={index}
                      item={item.student}
                      status={item.status}
                      eventKey={key}
                      type="student_offers"
                      handleDetail={handleSentStudentDetail}
                      handleOfferRejected={handleCancelOffer}
                      offerID={offerID}
                    />
                  ))
                ) : (
                  <h1 className="text-center">No offers found</h1>
                )}
              </div>
            </div>
          </Tab>
          <Tab eventKey="MatchReceived" title="Match reçu" className="h-100">
            <div className="AnnoncesViewOffersBox">
              <div className="offers custom-box">
                {matchReceiveDetail === false ? (
                  JOBS && JOBS.length > 0 ? (
                    JOBS.map((item, index) => (
                      <CardWithImage
                        key={index}
                        item={item}
                        eventKey={key}
                        type="company"
                        handleDetail={handleDetail}
                        matchReceiveDetailHandler={matchReceiveDetailHandler}
                        offerID={offerID}
                      />
                    ))
                  ) : (
                    <h1 className="text-center">No offers found</h1>
                  )
                ) : RECIEVED_OFFERS && RECIEVED_OFFERS.length > 0 ? (
                  RECIEVED_OFFERS.map((item, index) => (
                    <CardWithImage
                      key={index}
                      item={item.student}
                      eventKey={key}
                      jobID={item.jobID}
                      status={item.status}
                      type="student_offers"
                      handleBooking={handleBooking}
                      handleDetail={handleRecievedStudentDetail}
                      handleOfferAccepted={handlerRecievedOfferAccepted}
                      handleOfferRejected={handlerRecievedOfferRejected}
                      offerID={offerID}
                    />
                  ))
                ) : (
                  <h1 className="text-center">No offers found</h1>
                )}
              </div>
            </div>
          </Tab>
        </Tabs>
      </>
    )
  } else {
    return (
      <>
        {studentFormData && studentFormData.user ? (
          <Tabs
            activeKey={key2}
            id="first"
            className="OverviewOfOffers upper-nav custom-tabs"
            onSelect={(k) => setKey2(k)}
          >
            <Tab
              eventKey="first"
              title="Présentation Générales"
              className="h-100"
            >
              <div className="AnnoncesViewOffersBox">
                <div className="genProfileBox">
                  <div className="genProfile">
                    <Row className="p-3 w-100">
                      <Col lg={3} md={4}>
                        <div className="profileImage">
                          <Image
                            alt="iamge2"
                            src={
                              studentFormData.professional_Picture.image
                                ? `${baseUri}/views/uploads/${studentFormData.professional_Picture.image}`
                                : DEFAULT_IMAGE
                            }
                            hidden={
                              studentFormData.professional_Picture.image
                                ? false
                                : true
                            }
                          />
                        </div>
                        <div className="profileImage">
                          <div class="embed-responsive embed-responsive-16by9">
                            <iframe
                              hidden={
                                studentFormData.presentation_Video.video
                                  ? false
                                  : true
                              }
                              className="embed-responsive-item"
                              // src={`../images/video.mp4`}
                              src={
                                `${baseUri}/views/uploads/${studentFormData.presentation_Video.video}`
                                  ? `${baseUri}/views/uploads/${studentFormData.presentation_Video.video}`
                                  : `../images/video.mp4`
                              }
                              allowFullScreen
                            ></iframe>
                          </div>
                        </div>
                      </Col>
                      <Col lg={9} md={8}>
                        <div className="profilename">
                          {studentFormData.user.firstName}{" "}
                          {studentFormData.user.lastName}
                        </div>
                        <div className="profileProfession">
                          {studentFormData.user.type}
                        </div>
                        <div className="generalDescription">
                          Description générale
                        </div>
                        <div className="description">
                          {studentFormData.general_Presentation
                            ? studentFormData.general_Presentation
                            : ""}
                        </div>
                        <div className="professionalNetwork">Réseau pro</div>
                        <ul className="PLinks">
                          <li>
                            <Image src="../images/linkedIn.png" />
                          </li>
                          <li>Linkedin &nbsp;&nbsp;: </li>
                          <li>
                            <a
                              href={`${studentFormData.professional_networks.linkedIn}`}
                              target="_blank"
                            >
                              {studentFormData.professional_networks.linkedIn
                                ? studentFormData.professional_networks.linkedIn
                                : ""}
                            </a>
                          </li>
                        </ul>
                        <ul className="PLinks">
                          <li>
                            <Image src="../images/behance.png" />
                          </li>
                          <li>Behance &nbsp;&nbsp;: </li>
                          <li>
                            <a
                              href={`${studentFormData.professional_networks.Behance}`}
                              target="_blank"
                            >
                              {studentFormData.professional_networks.Behance
                                ? studentFormData.professional_networks.Behance
                                : ""}
                            </a>
                          </li>
                        </ul>
                        <ul className="PLinks">
                          <li>
                            <Image src="../images/dribble.png" />
                          </li>
                          <li>Dribble &nbsp;&nbsp;: </li>
                          <li>
                            <a
                              href={`${studentFormData.professional_networks.Dribble}`}
                              target="_blank"
                            >
                              {studentFormData.professional_networks.Dribble
                                ? studentFormData.professional_networks.Dribble
                                : ""}
                            </a>
                          </li>
                        </ul>
                        <ul className="PLinks">
                          <li>
                            <Image src="../images/github.png" />
                          </li>
                          <li>Github &nbsp;&nbsp;: </li>
                          <li>
                            <a
                              href={`${studentFormData.professional_networks.Github}`}
                              target="_blank"
                            >
                              {studentFormData.professional_networks.Github
                                ? studentFormData.professional_networks.Github
                                : ""}
                            </a>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            </Tab>
            <Tab eventKey="second" title="Formation / École" className="h-100">
              <div className="AnnoncesViewOffersBox">
                <div className="offers custom-box">
                  {studentFormData.education &&
                  studentFormData.education.length > 0 ? (
                    studentFormData.education.map((card, index) => (
                      <InfoCard
                        item={card}
                        key={index}
                        cindex={index}
                        type="EDUCATION"
                        EditPermission={false}
                      />
                    ))
                  ) : (
                    <h1 className="text-center">No school found</h1>
                  )}
                </div>
              </div>
            </Tab>
            <Tab eventKey="third" title="CV en ligne" className="h-100">
              <div className="AnnoncesViewOffersBox">
                {studentFormData.professional_profile &&
                studentFormData.professional_profile.length > 0 ? (
                  <CVEngine
                    USER={studentFormData}
                    type="student_professional_info"
                  />
                ) : (
                  <h1 className="text-center">No professional profile found</h1>
                )}
              </div>
            </Tab>
          </Tabs>
        ) : (
          <h1 className="text-center">No data found</h1>
        )}
      </>
    )
  }
}
export default OverviewOfOffers

const overviewOffers = [
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "Voir",
    matches: "+ de 10 Match",
  },
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "Voir",
    matches: "+ de 10 Match",
  },
]

const matchSent = [
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "Voir",
    matches: "Match (12)",
  },
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "Voir",
    matches: "Match (12)",
  },
]

const matchReceive = [
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "Voir",
    matches: "Match (12)",
  },
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "Voir",
    matches: "Match (12)",
  },
]

const matchsentItems = [
  {
    image: "user1",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "En savoir plus",
    btn3: "Refuser",
    matches: "90%",
    cdate: "04/10/2020",
  },
  {
    image: "user1",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "En savoir plus",
    btn3: "Refuser",
    matches: "90%",
    cdate: "04/10/2020",
  },
]

const matchUsers = [
  {
    image: "user1",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "En savoir plus",
    btn2: "Accepter",
    btn3: "Refuser",
    matches: "90%",
    cdate: "04/10/2020",
  },
  {
    image: "user1",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "En savoir plus",
    btn2: "Accepter",
    btn3: "Refuser",
    matches: "40%",
    cdate: "04/10/2020",
  },
]

const matchReceive2 = [
  {
    image: "user1",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "En savoir plus",
    btn2: "Accepter",
    btn3: "Refuser",
    calender: true,
  },
]

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}))
