import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Tab, Tabs, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import CardWithImage from "../../../../../components/UI/CardWithImage/CardWithImage";
import SubmitButton from "../../../../../components/UI/Button";
import Select from "../../../../../components/UI/Select";

import { useDispatch, useSelector } from "react-redux";
import OfferCardDetail from "../OfferCardDetail";
import BookingModal from "../../../../../components/UI/Modal";
import { levelOfEducation } from "../../../../../Globals";
import {
  Offer_Decion_By_Students,
  Get_Student_Jobs,
  Get_Student_Applied_Jobs,
  Get_Student_Rejected_Jobs,
  GetCompanyAppliedJobs,
  RecievedOffer_Decion_By_Students,
  GetStudentAppliedSuccessJobs,
  validateAppointment_By_Students,
} from "../../../../../Redux/actions";
export default function ViewOffers() {
  // store
  const dispatch = useDispatch();
  const [bookingstudentID, setbookingstudentID] = useState("");
  const [booking, setBooking] = useState(false);
  const [bookingSlot, setbookingSlot] = useState();
  const [jobID, setjobID] = useState("");

  const [Appointments, setAppointments] = useState("");
  const [Timmings, setTimmings] = useState("");
  const [bookingError, setBookingError] = useState("");

  const store = useSelector((state) => state.student);
  const store2 = useSelector((state) => state.auth);
  let student_ID = store2.user.student._id;

  let JOBS = store.jobs && store.jobs;
  let APPLIED_JOBS = store.appliedJobs && store.appliedJobs;
  let ACCEPTED_JOBS = store.student_Jobs && store.student_Jobs;

  let COMPANY_APPLIED_JOBS =
    store.company_appliedJobs && store.company_appliedJobs;

  let REJECTED_OFFERS = store.rejectedJobs && store.rejectedJobs;
  // state
  const [key, setKey] = useState("PreSelectedOffers");
  const [isDetail, setisDetail] = useState(false);
  const [offerID, setofferID] = useState("");

  const handleDetail = (id) => {
    setofferID(id);
    setisDetail(!isDetail);
  };

  // offers functions
  const handleOfferAccepted = (id, decision) => {
    dispatch(
      Offer_Decion_By_Students(id, decision, setKey, "PreSelectedOffers")
    );
  };
  const handlerRecievedOfferAccepted = (id, appointments, decision) => {
    alert(id)

    setAppointments(appointments);
    setjobID(id);
    dispatch(
      RecievedOffer_Decion_By_Students(
        id,
        decision,
        setKey,
        "PreSelectedOffers",
        handleBooking
      )
    );
  };
  const handlerRecievedOfferRejected = (id, decision) => {
    dispatch(
      RecievedOffer_Decion_By_Students(id, decision, setKey, "RefusedOffers")
    );
  };
  const handleOfferRejected = (id, decision) => {
    dispatch(Offer_Decion_By_Students(id, decision, setKey, "RefusedOffers"));
  };
  useEffect(() => {
    dispatch(Get_Student_Jobs());
    dispatch(Get_Student_Applied_Jobs());
    dispatch(Get_Student_Rejected_Jobs());
    dispatch(GetCompanyAppliedJobs());
    dispatch(GetStudentAppliedSuccessJobs());
  }, [key, setKey, isDetail]);

  const handleBooking = () => {
    setBooking(!booking);
  };
  const handleSubmitBooking = () => {

    if (bookingSlot) {
      dispatch(validateAppointment_By_Students(bookingSlot, jobID, setBooking));
      setjobID("")
    } else {
      setBookingError("Required");
    }
  };
  useEffect(() => {
    if (Appointments && Appointments.length > 0) {
      let fill = Appointments.find(
        (fl) =>
          fl.student === `${student_ID}` &&
          fl.jobID === `${jobID}`  &&
          fl.status === "Pending"
      );
      if (fill && fill.timmings) {
        setTimmings(fill.timmings);
      } else {
        setTimmings([]);
        
      }
    }
  }, [Appointments, booking, setBooking]);
  const handleChange = (e) => {
    const { value } = e.target;
    if (value === "I am not available at the proposed time") {
      setbookingSlot("I am not available at the proposed time");
    } else {
      setbookingSlot(e.target.value);
    }
  };
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
                      Validate a Time Slot{" "}
                    </div>
                  </div>
                  {Timmings && Timmings.length > 0 ? (
                    <div className="card-with-image-calender-wrapper">
                      <div className="card-with-image-calender">
                        <Select
                          name="bookingSlot"
                          value={bookingSlot}
                          onChange={handleChange}
                          options={Timmings}
                          type="appointment"
                          label="Niveau d’étude"
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
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
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
        <Tabs
          activeKey={key}
          defaultActiveKey="PreSelectedOffers"
          id="controlled-tab-example"
          className="Profile upper-nav custom-tabs"
          onSelect={(k) => setKey(k)}
        >
          <Tab
            eventKey="PreSelectedOffers"
            title="Offres pré-sélectionnés"
            className="h-100"
            onSelect={(k) => setKey(k)}
          >
            <div className="ViewOffersBox">
              <div className="offers custom-box">
                {APPLIED_JOBS && APPLIED_JOBS.length > 0 ? (
                  APPLIED_JOBS.map((item, index) => (
                    <CardWithImage
                      item={item}
                      key={index}
                      type="student"
                      eventKey={key}
                      handleDetail={handleDetail}
                    />
                  ))
                ) : (
                  <h1 className="text-center">No Offers Found</h1>
                )}
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="RefusedOffers"
            title="Offres refusées"
            onSelect={(k) => setKey(k)}
            className="h-100"
          >
            <div className="ViewOffersBox">
              <div className="offers custom-box">
                {REJECTED_OFFERS && REJECTED_OFFERS.length > 0 ? (
                  REJECTED_OFFERS.map((item, index) => (
                    <CardWithImage
                      item={item}
                      key={index}
                      type="student"
                      eventKey={key}
                      handleDetail={handleDetail}
                    />
                  ))
                ) : (
                  <h1 className="text-center">No Offers Found</h1>
                )}
              </div>
            </div>
          </Tab>
          <Tab
            eventKey="OffersRecieved"
            title="Propositions"
            onSelect={(k) => setKey(k)}
            className="h-100"
          >
            <div className="ViewOffersBox">
              <div className="offers custom-box">
                {COMPANY_APPLIED_JOBS && COMPANY_APPLIED_JOBS.length > 0 ? (
                  COMPANY_APPLIED_JOBS.map((item, index) =>
                    item.company.contactPerson.person.appointments &&
                    item.company.contactPerson.person.appointments.length >
                      0 ? (
                      item.company.contactPerson.person.appointments &&
                      item.company.contactPerson.person.appointments.map(
                        (app) => (
                          <CardWithImage
                            item={item}
                            key={index}
                            app={app}
                            appointments={
                              item.company.contactPerson.person.appointments
                            }
                            type="student"
                            handleOfferAccepted={handlerRecievedOfferAccepted}
                            handleOfferRejected={handlerRecievedOfferRejected}
                            eventKey={key}
                            handleDetail={handleDetail}
                          />
                        )
                      )
                    ) : (
                      <CardWithImage
                        item={item}
                        key={index}
                        appointments={
                          item.company.contactPerson.person.appointments
                        }
                        type="student"
                        handleOfferAccepted={handlerRecievedOfferAccepted}
                        handleOfferRejected={handlerRecievedOfferRejected}
                        eventKey={key}
                        handleDetail={handleDetail}
                      />
                    )
                  )
                ) : (
                  <h1 className="text-center">No Offers Found</h1>
                )}
              </div>
            </div>
          </Tab>
        </Tabs>
      ) : (
        <OfferCardDetail
          type="student"
          offerID={offerID}
          setisDetail={setisDetail}
        />
      )}
    </>
  );
}
