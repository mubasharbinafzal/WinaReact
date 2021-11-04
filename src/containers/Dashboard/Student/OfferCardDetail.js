import React, { useState, useEffect } from "react"
import { MdLocationOn } from "react-icons/all"
import { Row, Col } from "react-bootstrap"
import { Button, makeStyles } from "@material-ui/core"
import Slider from "@material-ui/core/Slider"
import Grid from "@material-ui/core/Grid"
import Input from "@material-ui/core/Input"
import InputAdornment from "@material-ui/core/InputAdornment"
import CardItem from "../../../components/UI/CardWithImage/OfferCardItem"
import { useDispatch, useSelector } from "react-redux"
import { Get_Job } from "../../../Redux/actions"
import Loader from "../../../components/UI/Loader"
const OfferCardDetail = (props) => {
  const { offerID } = props
  const dispatch = useDispatch()
  const store = useSelector((state) => state.jobs)
  const JOB = store.job && store.job
  const classes = useStyles()

  // state
  const [value, setValue] = useState(30)

  useEffect(() => {
    console.log(offerID, "OfferID")
    if (offerID) dispatch(Get_Job(offerID))
  }, [offerID])

  const handleSliderChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value))
  }
  const marks = [
    {
      value: 0,
      label: "0€",
    },
    {
      value: 10000,
      label: "10 000€",
    },
  ]
  const handleBlur = () => {
    if (value < 0) {
      setValue(0)
    } else if (value > 100) {
      setValue(100)
    }
  }
  if (JOB && Object.keys(JOB).length > 0) {
    return (
      <>
        <div
          className="d-flex justify-content-start align-items-center"
          style={{ height: "10%" }}
        >
          <h5>{JOB.company && JOB.company.name}</h5>
          <span className="offer-apply-btn ml-5">Postuler</span>
        </div>
        <div className="offer-detail">
          <div className="offer-detail-container">
            <div className="student-offer-detail-percentage">90%</div>
            <div className="offer-detail-header">
              <div className="offer-detail-header-image text-right">
                <img src={`../images/offer-card-detail.png`} />
              </div>
              {/* <div className="offer-detail-line"></div> */}
              <div className="offer-detail-header-text text-left offer-detail-header-line">
                {JOB.company && JOB.company.name}
              </div>
            </div>

            <div className="offer-detail-date-container">
              <div className="offer-detail-location text-right">
                <span>
                  <MdLocationOn className="offer-detail-location-icon" />
                </span>{" "}
                {JOB.location.street},{JOB.location.zip} {JOB.location.city}
              </div>
            </div>

            <div className="offer-detail-content">
              <CardItem
                className="offer-card-item-bordered offer-detail-content-detail"
                content={JOB.domain}
              />
              <CardItem
                className="offer-card-item-bordered offer-detail-content-detail"
                content={JOB.levelOfEducation}
              />
            </div>

            <div className="offer-detail-date-headings">
              <div className="offer-detail-date-heading text-left">
                Date de début
              </div>
              <div className="offer-detail-date-heading text-left">Durée</div>
            </div>
            <div className="offer-detail-date-container">
              <CardItem
                className="offer-card-item-bordered offer-detail-date"
                content={JOB.startDate}
              />
              <CardItem
                className="offer-card-item-bordered offer-detail-date"
                content={JOB.duration}
              />
            </div>

            <div className="offer-detail-date-container">
              <CardItem
                className="offer-card-item-bordered offer-detail-skills-heading"
                content="Compétences générales "
              />
            </div>

            <div className="offer-detail-date-container">
              {JOB.softSkills && JOB.softSkills.length > 0 ? (
                JOB.softSkills.map((sf) => (
                  <CardItem
                    className="offer-detail-skills"
                    content={sf.skillField}
                  />
                ))
              ) : (
                <p>No Compétences générales found</p>
              )}
            </div>

            <div className="offer-detail-date-container">
              <CardItem
                className="offer-card-item-bordered offer-detail-skills-heading"
                content="Compétences spécialisées "
              />
            </div>

            <div className="offer-detail-date-container">
              {JOB.hardSkills && JOB.hardSkills.length > 0 ? (
                JOB.hardSkills.map((sf) => (
                  <CardItem
                    className="offer-detail-skills"
                    content={sf.skillField}
                  />
                ))
              ) : (
                <p>No Compétences spécialisées found</p>
              )}
            </div>

            <div className="offer-detail-buttons-container">
              <Button
                classes={{
                  root: classes.root1, // class name, e.g. `classes-nesting-root-x`
                  label: classes.label, // class name, e.g. `classes-nesting-label-x`
                }}
              >
                Matcher
              </Button>
              <Button
                classes={{
                  root: classes.root2, // class name, e.g. `classes-nesting-root-x`
                  label: classes.label, // class name, e.g. `classes-nesting-label-x`
                }}
              >
                Refuser
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return <Loader.CenterProgress size={80} />
  }
}

export default OfferCardDetail
const useStyles = makeStyles({
  root: {
    width: "15.6rem",
  },
  input: {
    width: "5.4rem",
    paddingLeft: 9,
    position: "absolute",
    marginLeft: "6.2rem",
  },
  root1: {
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
    fontSize: "1.37rem",
    fontWeight: "bold",
    color: "white",
    height: "3.7rem",
    padding: "0 3.7rem",
  },
  root2: {
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
    fontSize: "1.37rem",
    fontWeight: "bold",
    color: "white",
    height: "3.7rem",
    padding: "0 3.7rem",
  },

  label: {
    textTransform: "capitalize",
  },
})
