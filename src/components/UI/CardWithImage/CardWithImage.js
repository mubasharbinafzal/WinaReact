import React, { useState, useEffect } from "react";
import "./CardWithImage.css";
import { Button, makeStyles } from "@material-ui/core";
import CardItem from "./OfferCardItem";
import DoneIcon from "@material-ui/icons/Done";
import Calendar from "react-calendar";
import { ImLocation } from "react-icons/all";
import { DEFAULT_IMAGE } from "../../../Globals";
import { baseUri } from "../../../urlConfig";
import moment from "moment";
const CardWithImage = (props) => {
  const classes = useStyles();
  const {
    item,
    eventKey,
    handleDetail,
    handleOfferRejected,
    handleOfferAccepted,
  } = props;
  const [date, setdate] = useState("");
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // useEffect(() => {
  //   if (props.app) {
  //     var check = moment(props.app.timmings[0], "YYYY/MM/DD");

  //     var month = check.format("M");
  //     var day = check.format("D");
  //     var year = check.format("YYYY");
  //     let checkDate = days[day]
  //       // + " " + month + "th" + monthNames[month] + year;
  //     // setDate(checkDate);
  //     console.log(checkDate, "month");
  //   }
  // }, [props.app]);

  const recievedStudentMatchedFunc = (item) => {
    let matchLength = item.student_requests.filter(
      (dt) => dt.status === "requested" || dt.status === "accepted"
    ).length;

    if (item.student_requests && item.student_requests.length > 0) {
      return (
        <div>
          {matchLength > 0 ? (
            <div
              className="matches"
              onClick={() => props.matchReceiveDetailHandler(item._id)}
            >
              Match ({matchLength})
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return;
    }
  };
  const sendStudentMatchedFunc = (item) => {
    let matchLength = item.company_requests.filter(
      (dt) => dt.status === "requested" || dt.status === "accepted"
    ).length;
    if (item.company_requests && item.company_requests.length > 0) {
      return (
        <div>
          {matchLength > 0 ? (
            <div
              className="matches"
              onClick={() => props.matchSentDetailHandler(item._id)}
            >
              Match ({matchLength})
            </div>
          ) : (
            ""
          )}
        </div>
      );
    } else {
      return;
    }
  };
  const [value, onChange] = useState(new Date());
  if (props.type && props.type === "student") {
    return (
      <div className="card-with-image">
        <div className="card-with-image-wrapper">
          <div className="card-with-image-image">
            {/* {item.image && <img src={`../images/${item.image}.png`} />} */}
            <img
              src={
                item.photo.image
                  ? `${baseUri}/${item.photo.image}`
                  : DEFAULT_IMAGE
              }
            />
          </div>
          <div className="card-with-image-container">
            <div className="card-with-image-title">
              <div className="flex">
                <h3>
                  <b>{item.company && item.company.name}</b>
                </h3>
                {props.app && props.app.status === "Approved" ? (
                  <>
                    <h3 className="text-success">
                      Matched
                    </h3>
                    <p>
                      Interview is on {new Date(props.app.timmings[0]).getDay()}
                      th May
                      {new Date(props.app.timmings[0]).getYear()} at{" "}
                      {new Date(props.app.timmings[0]).getHours()}:
                      {new Date(props.app.timmings[0]).getMinutes()}
                    </p>
                  </>
                ) : (
                  ""
                )}
              </div>
              {item.startDate && (
                <div className="card-with-image-date">{item.startDate}</div>
              )}
            </div>
            <div className="card-with-image-content text-left">
              {item.position} <br />
              <p className="card-with-image-location">
                <span className="mr-2">
                  <ImLocation className="card-with-image-location-icon" />
                </span>
                {item.location.street},{item.location.zip} {item.location.city}
              </p>
              <br />
            </div>

            <div className="card-with-image-desc">
              {item.domain && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.domain}
                />
              )}
              {item.duration && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.duration}
                />
              )}
              {item.levelOfEducation && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.levelOfEducation}
                />
              )}
            </div>
            {eventKey === "OffersRecieved" ? (
              <div className="card-with-image-buttons">
                <div
                  className="card-with-image-btn card-with-image-btn-yellow"
                  onClick={() => handleDetail(item._id)}
                >
                  Voir
                </div>
                {props.app && props.app.status === "Approved" ? (
                  ""
                ) : (
                  <>
                    <div
                      onClick={() =>
                        handleOfferAccepted(
                          props.app.jobID,
                          props.appointments,
                          "accepted"
                        )
                      }
                      className="card-with-image-btn card-with-image-btn-green"
                    >
                      Accepter
                    </div>

                    <div
                      onClick={() => handleOfferRejected(item._id, "rejected")}
                      className="card-with-image-btn card-with-image-btn-red"
                    >
                      Refuser
                    </div>
                  </>
                )}
              </div>
            ) : eventKey === "RefusedOffers" ? (
              <div className="card-with-image-buttons">
                <div
                  onClick={() => handleDetail(item._id)}
                  className="card-with-image-btn card-with-image-btn-yellow"
                >
                  Voir
                </div>

                <div className="card-with-image-btn card-with-image-btn-gray">
                  Impossible
                </div>
              </div>
            ) : eventKey === "PreSelectedOffers" ? (
              <div className="card-with-image-buttons">
                <div
                  onClick={() => handleDetail(item._id)}
                  className="card-with-image-btn card-with-image-btn-yellow"
                >
                  Voir
                </div>
                
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {/* {item.score && item.score * 100 > 0 ? (
          item.score * 100 > 50 ? (
            <div className="matches">{item.score * 100}%</div>
          ) : (
            <div className="matches50">{item.score * 100}%</div>
          )
        ) : (
          ""
        )} */}
      </div>
    );
  } else if (props.type && props.type === "company") {
    return (
      <div className="card-with-image">
        <div className="card-with-image-wrapper">
          <div className="card-with-image-image">
            {/* {item.image && <img src={`../images/${item.image}.png`} />} */}

            <img
              src={
                item.photo.image
                  ? `${baseUri}/${item.photo.image}`
                  : DEFAULT_IMAGE
              }
            />
          </div>
          <div className="card-with-image-container">
            <div className="card-with-image-title">
              <div>
                <h3>
                  <b>{item.company && item.company.name}</b>
                </h3>
              </div>
              {item.startDate && (
                <div className="card-with-image-date">{item.startDate}</div>
              )}
            </div>
            <div className="card-with-image-content text-left">
              {item.position} <br />
              <p className="card-with-image-location">
                <span className="mr-2">
                  <ImLocation className="card-with-image-location-icon" />
                </span>
                {item.location.street},{item.location.zip} {item.location.city}
              </p>
              <br />
            </div>

            <div className="card-with-image-desc">
              {item.domain && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.domain}
                />
              )}
              {item.duration && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.duration}
                />
              )}
              {item.levelOfEducation && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.levelOfEducation}
                />
              )}
            </div>
            {eventKey === "Offres" ? (
              <div className="card-with-image-buttons">
                <div
                  onClick={() => handleDetail(item._id)}
                  className="card-with-image-btn card-with-image-btn-yellow"
                >
                  Voir
                </div>
              </div>
            ) : eventKey === "Matchsent" ? (
              <div className="card-with-image-buttons">
                <div
                  onClick={() => handleDetail(item._id)}
                  className="card-with-image-btn card-with-image-btn-yellow"
                >
                  Voir
                </div>
              </div>
            ) : (
              <div className="card-with-image-buttons">
                <div
                  onClick={() => handleDetail(item._id)}
                  className="card-with-image-btn card-with-image-btn-yellow"
                >
                  Voir
                </div>
              </div>
            )}
          </div>
        </div>
        {item.calender && (
          <div className="card-with-image-calender-container">
            <div className="card-with-image-calender-wrapper">
              <div className="card-with-image-calender-heading">
                Félicitations vous avez accepté le match !
              </div>
            </div>

            <div className="card-with-image-calender-wrapper">
              <div className="card-with-image-calender">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
            <div className="text-right">
              <Button
                classes={{
                  root: classes.root4,
                  label: classes.label,
                }}
              >
                Envoyer
              </Button>
            </div>
          </div>
        )}
        {eventKey === "SentMatches"
          ? sendStudentMatchedFunc(item)
          : eventKey === "MatchReceived"
          ? recievedStudentMatchedFunc(item)
          : ""}
      </div>
    );
  } else if (props.type && props.type === "search_student") {
    return (
      <div className="card-with-image">
        <div className="card-with-image-wrapper">
          <div className="card-with-image-image">
            {/* {item.image && <img src={`../images/${item.image}.png`} />} */}
            <img
              src={
                item.professional_Picture.image
                  ? `${baseUri}/views/uploads/${item.professional_Picture.image}`
                  : DEFAULT_IMAGE
              }
            />
          </div>
          <div className="card-with-image-container">
            <div className="card-with-image-title">
              <div>
                <h3>
                  <b>
                    {item.user && item.user.firstName}{" "}
                    {item.user && item.user.lastName}
                  </b>
                </h3>
              </div>
            </div>
            <div className="card-with-image-content text-left">
              {item.positionSought && item.positionSought.position} <br />
              <p className="card-with-image-location">
                <span className="mr-2">
                  <ImLocation className="card-with-image-location-icon" />
                </span>
                {item.user.address.street},{item.user.address.zip}{" "}
                {item.user.address.city}
              </p>
              <br />
            </div>

            <div className="card-with-image-desc">
              {item.positionSought && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.positionSought.domain}
                />
              )}
              {item.positionSought && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.positionSought.duration}
                />
              )}
              {item.positionSought && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.positionSought.levelOfEducation}
                />
              )}
            </div>

            <div className="card-with-image-buttons">
              <div
                className="card-with-image-btn card-with-image-btn-yellow"
                onClick={() => handleDetail(item._id)}
              >
                Voir
              </div>

              <div
                onClick={() =>
                  handleOfferAccepted(item._id, props.offerID, "requested")
                }
                className="card-with-image-btn card-with-image-btn-green"
              >
                Matcher
              </div>

              <div
                onClick={() =>
                  handleOfferRejected(item._id, props.offerID, "rejected")
                }
                className="card-with-image-btn card-with-image-btn-red"
              >
                Refuser
              </div>
            </div>
          </div>
        </div>
        {item.calender && (
          <div className="card-with-image-calender-container">
            <div className="card-with-image-calender-wrapper">
              <div className="card-with-image-calender-heading">
                Félicitations vous avez accepté le match !
              </div>
            </div>

            <div className="card-with-image-calender-wrapper">
              <div className="card-with-image-calender">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
            <div className="text-right">
              <Button
                classes={{
                  root: classes.root4,
                  label: classes.label,
                }}
              >
                Envoyer
              </Button>
            </div>
          </div>
        )}
        {item.score && item.score * 100 > 0 ? (
          item.score * 100 > 50 ? (
            <div className="matches">{Math.round(item.score * 100)}%</div>
          ) : (
            <div className="matches50">{Math.round(item.score * 100)}%</div>
          )
        ) : (
          ""
        )}
      </div>
    );
  } else if (props.type && props.type === "student_offers") {
    return (
      <div className="card-with-image">
        <div className="card-with-image-wrapper">
          <div className="card-with-image-image">
            {/* {item.image && <img src={`../images/${item.image}.png`} />} */}
            <img
              src={
                item.professional_Picture.image
                  ? `${baseUri}/views/uploads/${item.professional_Picture.image}`
                  : DEFAULT_IMAGE
              }
            />
          </div>
          <div className="card-with-image-container">
            <div className="card-with-image-title">
              {props.status && props.status === "accepted" ? (
                <div className="row">
                  <div>
                    <h3>
                      <b>
                        {item.user && item.user.firstName}{" "}
                        {item.user && item.user.lastName}
                      </b>
                    </h3>
                  </div>
                  <div className="pl-3">
                    <h3 className="text-success">
                      CA MATCH!{" "}
                      <small className="text-dark">
                        Sélectionnez une date d'entretien
                      </small>
                    </h3>
                  </div>
                </div>
              ) : (
                <div>
                  <h3>
                    <b>
                      {item.user && item.user.firstName}{" "}
                      {item.user && item.user.lastName}
                    </b>
                  </h3>
                </div>
              )}
            </div>
            <div className="card-with-image-content text-left">
              {item.positionSought && item.positionSought.position} <br />
              <p className="card-with-image-location">
                <span className="mr-2">
                  <ImLocation className="card-with-image-location-icon" />
                </span>
                {item.user.address.street},{item.user.address.zip}{" "}
                {item.user.address.city}
              </p>
              <br />
            </div>

            <div className="card-with-image-desc">
              {item.positionSought && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.positionSought.domain}
                />
              )}
              {item.positionSought && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.positionSought.duration}
                />
              )}
              {item.positionSought && (
                <CardItem
                  className="offer-card-item-bordered company-offer-detail-content"
                  content={item.positionSought.levelOfEducation}
                />
              )}
            </div>
            {eventKey === "SentMatches" ? (
              <div className="card-with-image-buttons">
                <div
                  className="card-with-image-btn card-with-image-btn-yellow"
                  onClick={() => handleDetail(item._id)}
                >
                  Voir
                </div>
                {props.status && props.status === "accepted" ? (
                  ""
                ) : (
                  <div
                    onClick={() => handleOfferRejected(item._id, "rejected")}
                    className="card-with-image-btn card-with-image-btn-red"
                  >
                    Refuser
                  </div>
                )}
              </div>
            ) : (
              <div className="card-with-image-buttons">
                <div
                  className="card-with-image-btn card-with-image-btn-yellow"
                  onClick={() => handleDetail(item._id)}
                >
                  Voir
                </div>
                {props.status && props.status === "accepted" ? (
                  ""
                ) : (
                  <>
                    <div
                      onClick={() =>
                        handleOfferAccepted(item._id, props.jobID, "accepted")
                      }
                      className="card-with-image-btn card-with-image-btn-green"
                    >
                      Matcher
                    </div>

                    <div
                      onClick={() => handleOfferRejected(item._id, "rejected")}
                      className="card-with-image-btn card-with-image-btn-red"
                    >
                      Refuser
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {item.calender && (
          <div className="card-with-image-calender-container">
            <div className="card-with-image-calender-wrapper">
              <div className="card-with-image-calender-heading">
                Félicitations vous avez accepté le match !
              </div>
            </div>

            <div className="card-with-image-calender-wrapper">
              <div className="card-with-image-calender">
                <Calendar onChange={onChange} value={value} />
              </div>
            </div>
            <div className="text-right">
              <Button
                classes={{
                  root: classes.root4,
                  label: classes.label,
                }}
              >
                Envoyer
              </Button>
            </div>
          </div>
        )}
        {item.score && item.score * 100 > 0 ? (
          item.score * 100 > 50 ? (
            <div className="matches">{Math.round(item.score * 100)}%</div>
          ) : (
            <div className="matches50">{Math.round(item.score * 100)}%</div>
          )
        ) : (
          ""
        )}
      </div>
    );
  } else {
    return (
      <div>
        <h1>hello</h1>
      </div>
    );
  }
};

export default CardWithImage;
const useStyles = makeStyles({
  root1: {
    "&:hover": {
      backgroundColor: "#F6C40D",
    },
    "&:focus": {},
    background: "#F6C40D",
    borderRadius: "2.56rem",
    border: 0,
    fontSize: "1.12rem",
    fontWeight: "bold",
    color: "white",
    height: "2.5rem",
    padding: "0 3rem",
  },
  root2: {
    "&:hover": {
      backgroundColor: "#3CBF31",
    },
    "&:focus": {
      border: "none",
      outline: "none",
    },
    background: "#3CBF31",
    borderRadius: "2.56rem",
    border: 0,
    fontSize: "1.12rem",
    fontWeight: "bold",
    color: "white",
    height: "2.5rem",
    padding: "0 3rem",
  },
  rootGray: {
    "&:hover": {
      backgroundColor: "#AAAAAA",
    },
    "&:focus": {
      border: "none",
      outline: "none",
    },
    background: "#AAAAAA",
    borderRadius: "2.56rem",
    border: 0,
    fontSize: "1.12rem",
    fontWeight: "bold",
    color: "white",
    height: "2.5rem",
    padding: "0 50px",
  },
  root3: {
    "&:hover": {
      backgroundColor: "#E52B2B",
    },
    "&:focus": {
      border: "none",
      outline: "none",
    },
    background: "#E52B2B",
    borderRadius: "2.56rem",
    border: 0,
    fontSize: "1.12rem",
    fontWeight: "bold",
    color: "white",
    height: "2.5rem",
    padding: "0 50px",
  },
  root4: {
    "&:hover": {
      backgroundColor: "#2879D9",
    },
    "&:focus": {
      border: "none",
      outline: "none",
    },
    background: "#2879D9",
    borderRadius: "2.56rem",
    border: 0,
    fontSize: "1.37rem",
    fontWeight: "bold",
    color: "white",
    height: "3rem",
    padding: "0.6rem 3rem",
  },
  label: {
    textTransform: "capitalize",
  },
});
