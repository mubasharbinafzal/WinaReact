import React, { useState, useEffect } from "react";
import { MdLocationOn } from "react-icons/all";
import { Row, Col, Dropdown, Form, Image } from "react-bootstrap";
import { Button, makeStyles } from "@material-ui/core";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextArea from "../../../../../../components/UI/Textarea";

import CardItem from "../../../../../../components/UI/CardWithImage/OfferCardItem";
import "./CompanyCardDetail.css";
import { FaTimes } from "react-icons/all";
import CardWithImage from "../../../../../../components/UI/CardWithImage/CardWithImage";
import { useDispatch, useSelector } from "react-redux";
import { Get_Job } from "../../../../../../Redux/actions";
import Loader from "../../../../../../components/UI/Loader";
import ModalInput from "../../../../../../components/UI/TextField";
import DatePicker from "../../../../../../components/UI/DatePicker";
import Select from "../../../../../../components/UI/Select";
import ModifierButton from "../../../../../../components/UI/Button";
import axios from "axios";
import { useFormik } from "formik";
import { POSITION_SOUGHT_STATE } from "../../../../../../Globals/InitialValues/Company";
import { POSITION_SOUGHT_YUP } from "../../../../../../components/Formik/Company/yupValidation";
import {
  DomainOptions,
  DurationOptions,
  RythmeOptions,
  levelOfEducation,
  AgeRangeOptions,
} from "../../../../../../Globals";
import RadioButton from "../../../../../../components/UI/RadioButton";

import {
  getSkills,
  getApiAdress,
  Search_Students,
  Edit_Job,
} from "../../../../../../Redux/actions";
import AutoComplete from "../../../../../../components/UI/AutoComplete";
import Texts from "../../../../../../Globals/Texts";
import _ from "lodash";
import MultiAutoComplete from "../../../../../../components/UI/MultiSelect";
import { SignalCellularConnectedNoInternet3BarRounded } from "@material-ui/icons";
import { baseUri } from "../../../../../../urlConfig";

const CompanyCardDetail = (props) => {
  const {
    offerID,
    handleStudentDetail,
    handleOfferAccepted,
    handleOfferRejected,
  } = props;
  const dispatch = useDispatch();
  const store2 = useSelector((state) => state.globals);
  const store3 = useSelector((state) => state.company);

  const classes = useStyles();

  const [value, setValue] = useState(30);
  const [isnext, setIsNext] = useState(false);

  const [image, setImage] = useState("");
  const [imageURI, setimageURI] = useState("");

  const [softSkillsArray, setsoftSkillsArray] = useState([]);
  const [softSkillsDB, setsoftSkillsDB] = useState([]);
  const [hardSkillsDB, sethardSkillsDB] = useState([]);
  const [hardSkillsArray, sethardSkillsArray] = useState([]);
  //
  const [items, setItems] = useState([]);

  let SOFT_SKILLS = store2.soft_skills;
  const JOB = store3.job && store3.job;
  let HARD_SKILLS = store2.hard_skills;
  let JOB_MESSAGE_SUCCESS = store3.message;
  let SEARCH_STUDENTS =
    store3.studentBySearch &&
    store3.studentBySearch.filter((st) => st.offer_status === "proposal");

  // formik
  const formik = useFormik({
    initialValues: POSITION_SOUGHT_STATE,
    validationSchema: POSITION_SOUGHT_YUP,
    onSubmit: async (values) => {
      let soft_skills = _.cloneDeep(softSkillsArray);
      let hard_skills = _.cloneDeep(hardSkillsArray);
      let tempValues = _.cloneDeep(values);

      if (softSkillsDB && softSkillsDB.length > 0) {
        softSkillsDB.forEach((element) => {
          soft_skills.push(element._id);
        });
      }
      if (hardSkillsDB && hardSkillsDB.length > 0) {
        hardSkillsDB.forEach((element) => {
          hard_skills.push(element._id);
        });
      }
      tempValues.softSkills = soft_skills;
      tempValues.hardSkills = hard_skills;
      dispatch(Edit_Job(tempValues, offerID));
    },
  });

  useEffect(() => {
    if (offerID) {
      dispatch(Search_Students(offerID));
    }
  }, []);
  // onChange
  console.log(formik,"formik")
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "photo") {
      let file = e.target.files[0];
      if (file.type === "image/png" || file.type === "image/jpeg") {
        let uri = URL.createObjectURL(file);
        setimageURI(uri);
        setImage(file);
        formik.setFieldValue("photo", file.name);
      } else {
        alert("You can upload only images ");
      }
    }
    formik.setFieldValue(name, value);
  };
  // useEffect
  useEffect(() => {
    dispatch(getSkills("Soft_Skill"));

    dispatch(getSkills("Hard_Skill"));
  }, []);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (offerID) dispatch(Get_Job(offerID));
  }, [offerID]);

  useEffect(() => {
    if (JOB) {
      formik.setFieldValue("position", JOB.position);
      formik.setFieldValue("title", JOB.title);
      formik.setFieldValue("description", JOB.description);

      formik.setFieldValue("ageRange", JOB.ageRange);
      formik.setFieldValue("domain", JOB.domain);
      formik.setFieldValue("startDate", JOB.startDate);
      formik.setFieldValue("duration", JOB.duration);
      formik.setFieldValue("location", {
        city: JOB.location.city,
        street: JOB.location.street,
        zip: JOB.location.zip,
        longitude: JOB.location.longitude,
        latitude: JOB.location.latitude,
      });
      formik.setFieldValue("softSkills", JOB.softSkills[0].skillField);
      formik.setFieldValue("hardSkills", JOB.hardSkills[0].skillField);
      formik.setFieldValue("photo", JOB.photo.image);
      formik.setFieldValue("alternationRhythm", JOB.alternationRhythm);
      formik.setFieldValue("levelOfEducation", JOB.levelOfEducation);
      setsoftSkillsDB(JOB.softSkills);
      sethardSkillsDB(JOB.hardSkills);
    }
  }, [JOB, offerID]);
  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };
  const handleAddressChange = (value) => {
    formik.setFieldValue("location", {
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
            postalCode: item.properties.citycode,
            lat: item.geometry.coordinates[1],
            lng: item.geometry.coordinates[0],
          };
        })
      );
    }
  };
  const onSubmitAddress = (value) => {
    formik.setFieldValue("location", {
      city: value.city,
      street: "Street",
      zip: value.postalCode ? value.postalCode : "40180",
      longitude: value.lng,
      latitude: value.lat,
    });
  };
  const onSoftSkillChange = (value) => {
    const valueArray = [];
    for (let i = 0; i < value.length; i++) {
      valueArray.push(value[i]._id);
    }
    if (valueArray.length > 0) {
      formik.setFieldValue("softSkills", valueArray[0]);
    } else {
      formik.setFieldValue("softSkills", "");
    }
    setsoftSkillsArray(valueArray);
  };
  const onHardSkillChange = (value) => {
    const valueArray = [];
    for (let i = 0; i < value.length; i++) {
      valueArray.push(value[i]._id);
    }
    if (valueArray.length > 0) {
      formik.setFieldValue("hardSkills", valueArray[0]);
    } else {
      formik.setFieldValue("hardSkills", "");
    }
    sethardSkillsArray(valueArray);
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  useEffect(() => {
    setIsNext(false);
  }, []);

  const handleSoftSkillDelete = (id) => {
    if (softSkillsDB.length > 0) {
      let fifa = softSkillsDB.filter((dt) => dt._id !== id);
      setsoftSkillsDB(fifa);
    }
  };
  const handlehardSkillDelete = (id) => {
    if (hardSkillsDB.length > 0) {
      let fifa = hardSkillsDB.filter((dt) => dt._id !== id);
      sethardSkillsDB(fifa);
    }
  };
  if (JOB && Object.keys(JOB).length > 0) {
    const Matched = SEARCH_STUDENTS ? SEARCH_STUDENTS.length : 0;
    let MatchedDisable = Matched && Matched > 0 ? false : true;
    return (
      <div className="company-card-detail text-center">
        <div className="company-card-detail-container">
          {isnext === false ? (
            <div className="company-card-detail-wrapper">
              {!props.isPerc && (
                <div className="student-offer-detail-percentage">90%</div>
              )}
              <div className="offer-detail-header">
                <div className="offer-detail-header-image text-right">
                  <img
                  width={300}
                  height={300}

                    src={
                      JOB.photo.image
                        ? `${baseUri}/${JOB.photo.image}`
                        : `../images/offer-card-detail.png`
                    }
                  />
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
                  {formik.values.location.street},{formik.values.location.zip}{" "}
                  {formik.values.location.city}
                </div>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="offer-detail-content">
                  {/* <CardItem
                  className="offer-card-item-bordered offer-detail-content-detail text-center"
                  content={JOB.domain}
                /> */}

                  <div className="w-50 pl-5">
                    <ModalInput
                      name="position"
                      label="Nom du poste"
                      // className="Job_title"
                      placeholder="Position"
                      value={formik.values.position}
                      onChange={handleChange}
                      type="text"
                    />
                    {formik.touched.position && formik.errors.position ? (
                      <div className="formikErrorAuto">
                        {" "}
                        {formik.errors.position}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-50 pl-5">
                    <ModalInput
                      name="title"
                      label="Title"
                      // className="Job_title"
                      placeholder="Title"
                      value={formik.values.title}
                      onChange={handleChange}
                      type="text"
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="formikErrorAuto">
                        {" "}
                        {formik.errors.title}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-50 pl-5">
                    <DatePicker
                      name="startDate"
                      label={" Date de début"}
                      value={formik.values.startDate}
                      onChange={handleChange}
                    />
                    {formik.touched.startDate && formik.errors.startDate ? (
                      <div className="formikErrorDate">
                        {" "}
                        {formik.errors.startDate}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-50">
                    <AutoComplete
                      formik={formik}
                      onChange={handleAddressChange}
                      placeholder={Texts.userProfile}
                      items={items}
                      name={"location"}
                      loading={store2.loading}
                      onSubmit={onSubmitAddress}
                    />
                    {formik.touched.location && formik.errors.location ? (
                      <div className="formikErrorAuto">
                        {" "}
                        {formik.errors.location.city}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="company-card-detail-date-container text-left pt-5">
                  <div className="w-50">
                    <Select
                      name="domain"
                      value={formik.values.domain}
                      onChange={handleChange}
                      options={DomainOptions}
                      label="Domaine"
                    />

                    {formik.touched.domain && formik.errors.domain ? (
                      <div className="formikErrorDate">
                        {" "}
                        {formik.errors.domain}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-50">
                    <Select
                      name="ageRange"
                      value={formik.values.ageRange}
                      onChange={handleChange}
                      options={AgeRangeOptions}
                      label="ageRange"
                    />

                    {formik.touched.ageRange && formik.errors.ageRange ? (
                      <div className="formikErrorDate">
                        {" "}
                        {formik.errors.ageRange}
                      </div>
                    ) : null}
                  </div>

                  <div className="w-50 pl-5">
                    <Select
                      name="duration"
                      value={formik.values.duration}
                      onChange={handleChange}
                      options={DurationOptions}
                      label="Durée"
                    />

                    {formik.touched.duration && formik.errors.duration ? (
                      <div className="formikErrorDate">
                        {" "}
                        {formik.errors.duration}
                      </div>
                    ) : null}
                  </div>

                  <div className="w-50 pl-5">
                    <Select
                      name="levelOfEducation"
                      value={formik.values.levelOfEducation}
                      onChange={handleChange}
                      options={levelOfEducation}
                      label="Niveau d’étude"
                    />

                    {formik.touched.levelOfEducation &&
                    formik.errors.levelOfEducation ? (
                      <div className="formikErrorAuto">
                        {" "}
                        {formik.errors.levelOfEducation}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="w-50 pt-4 text-left">
                  <RadioButton
                    options={RythmeOptions}
                    name="alternationRhythm"
                    label="Rythme alternances :"
                    value={formik.values.alternationRhythm}
                    onChange={handleChange}
                  />
                </div>
                {formik.touched.alternationRhythm &&
                formik.errors.alternationRhythm ? (
                  <div className="formikErrorAuto">
                    {" "}
                    {formik.errors.alternationRhythm}
                  </div>
                ) : null}
                <div className=" pt-4">
                        <TextArea
                          name="description"
                          placeholder="Enter Description"
                          value={formik.values.description}
                          onChange={handleChange}
                          rows={3}
                        />
                        {formik.touched.description &&
                        formik.errors.description ? (
                          <div className="formikErrorDesc">
                            {" "}
                            {formik.errors.description}
                          </div>
                        ) : null}
                      </div>
                <div className="w-50">
                  <MultiAutoComplete
                    formik={formik}
                    placeholder="Compétences générales "
                    items={SOFT_SKILLS}
                    name={"softSkills"}
                    loading={store2.loading}
                    onSubmit={onSoftSkillChange}
                  />

                  {formik.touched.softSkills && formik.errors.softSkills ? (
                    <div className="formikErrorDate">
                      {" "}
                      {formik.errors.softSkills}
                    </div>
                  ) : null}
                </div>
                {/* <Row>
                  <Col className="col-lg-12">
                    <div className="sliderBox">
                      <div className={(classes.root, "slider")}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item xs>
                            <Slider
                              // disabled
                              // disabledaria-labelledby="disabled-slider"
                              value={typeof value === "number" ? value : 0}
                              onChange={handleSliderChange}
                              marks={marks}
                              min={0}
                              max={10000}
                            />
                          </Grid>
                          <Grid item>
                            <Input
                              className={classes.input}
                              value={value}
                              margin="dense"
                              onChange={handleInputChange}
                              onBlur={handleBlur}
                              endAdornment={
                                <InputAdornment position="end">
                                  €
                                </InputAdornment>
                              }
                              inputProps={{
                                step: 10,
                                min: 0,
                                max: 10000,
                                type: "number",
                                "aria-labelledby": "input-slider",
                              }}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  </Col>
                </Row> */}
                <div className="offer-detail-date-container">
                  {softSkillsDB && softSkillsDB.length > 0
                    ? softSkillsDB.map((job) => {
                        return (
                          <CardItem
                            key={job._id}
                            id={job._id}
                            className="offer-detail-skills"
                            content={job.skillField}
                            handleDelete={handleSoftSkillDelete}
                            times
                          />
                        );
                      })
                    : ""}
                </div>

                <div className="w-50">
                  <MultiAutoComplete
                    formik={formik}
                    placeholder="Compétences spécialisées "
                    items={HARD_SKILLS}
                    name={"hardSkills"}
                    loading={store2.loading}
                    onSubmit={onHardSkillChange}
                  />

                  {formik.touched.hardSkills && formik.errors.hardSkills ? (
                    <div className="formikErrorDate">
                      {" "}
                      {formik.errors.hardSkills}
                    </div>
                  ) : null}
                </div>

                <div className="offer-detail-date-container">
                  {JOB.hardSkills && JOB.hardSkills.length > 0
                    ? JOB.hardSkills.map((job) => {
                        return (
                          <CardItem
                            key={job._id}
                            className="offer-detail-skills"
                            content={job.skillField}
                            handleDelete={handlehardSkillDelete}
                            times
                          />
                        );
                      })
                    : ""}
                </div>

                <div className="company-card-detail-buttons-container">
                  <Button
                    onClick={() => setIsNext(true)}
                    disabled={MatchedDisable}
                    classes={{
                      root: classes.root1,
                      label: classes.label,
                    }}
                  >
                    Consulter les matchs conseiller ({Matched})
                  </Button>

                  {store3.loading ? (
                    <ModifierButton
                      className="Enregistrer"
                      type="submit"
                      variant="primary"
                      value="Loading...."
                      disabled={store3.loading}
                    />
                  ) : (
                    <ModifierButton
                      className="Enregistrer"
                      type="submit"
                      variant="primary"
                      value="Modifier"
                      disabled={false}
                    />
                  )}
                </div>
              </form>
            </div>
          ) : SEARCH_STUDENTS && SEARCH_STUDENTS.length > 0 ? (
            SEARCH_STUDENTS.map((item, index) => (
              <CardWithImage
                key={index}
                item={item}
                type="search_student"
                handleDetail={handleStudentDetail}
                handleOfferAccepted={handleOfferAccepted}
                handleOfferRejected={handleOfferRejected}
                offerID={offerID}
              />
            ))
          ) : (
            <h1 className="text-center">No offers found</h1>
          )}
        </div>
      </div>
    );
  } else {
    return <Loader.CenterProgress size={80} />;
  }
};

export default CompanyCardDetail;

{
  /* ****************** */
}
{
  /* 
  <div className="offer-detail-content">
                <CardItem
                  className="offer-card-item-bordered offer-detail-content-detail text-center"
                  content={JOB.domain}
                />
                
                <CardItem
                  className="offer-card-item-bordered offer-detail-content-detail text-center"
                  content="Niveau d’étude : Brevet"
                />
              </div>

              <div className="company-card-detail-date-headings">
                <div className="company-card-detail-date-heading text-left">
                  Date de début
                </div>
                <div className="company-card-detail-date-heading text-left">
                  Durée
                </div>
              </div>
              <div className="company-card-detail-date-container">
                <Dropdown className="custom-dropdown date-dropdown">
                  <Dropdown.Toggle id="dropdown-basic">
                    {JOB.startDate}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">2021</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">2022</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">2023</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Dropdown className="custom-dropdown date-dropdown">
                  <Dropdown.Toggle id="dropdown-basic">
                    {JOB.duration}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">2 an</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">3 an</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">4 an</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <Row>
                <Col className="col-lg-12">
                  <div className="sliderBox">
                    <div className="label">Tranche de salaire</div>
                    <div className={(classes.root, "slider")}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs>
                          <Slider
                            // disabled
                            // disabledaria-labelledby="disabled-slider"
                            value={typeof value === "number" ? value : 0}
                            onChange={handleSliderChange}
                            marks={marks}
                            min={0}
                            max={10000}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            className={classes.input}
                            value={value}
                            margin="dense"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            endAdornment={
                              <InputAdornment position="end">€</InputAdornment>
                            }
                            inputProps={{
                              step: 10,
                              min: 0,
                              max: 10000,
                              type: "number",
                              "aria-labelledby": "input-slider",
                            }}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="company-card-detail-date-container">
                <Dropdown className="custom-dropdown skills-dropdown">
                  <Dropdown.Toggle id="dropdown-basic">
                    Compétences générales
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">2 an</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">3 an</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">4 an</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="offer-detail-date-container">
                <CardItem
                  className="offer-detail-skills"
                  content="Compétences"
                  times
                />
                <CardItem
                  className="offer-detail-skills"
                  content="Compétences"
                  times
                />
                <CardItem
                  className="offer-detail-skills"
                  content="Compétences"
                  times
                />
              </div>
              <div className="company-card-detail-description">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Description"
                  />
                </Form.Group>
              </div>

              <div className="company-card-detail-date-container">
                <Dropdown className="custom-dropdown skills-dropdown">
                  <Dropdown.Toggle id="dropdown-basic">
                    Compétences générales
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">2 an</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">3 an</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">4 an</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="offer-detail-date-container">
                <CardItem
                  className="offer-detail-skills"
                  content="Compétences"
                  times
                />
                <CardItem
                  className="offer-detail-skills"
                  content="Compétences"
                  times
                />
                <CardItem
                  className="offer-detail-skills"
                  content="Compétences"
                  times
                />
              </div>

              <div className="company-card-detail-description">
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Description"
                  />
                </Form.Group>
              </div> */
}
{
  /* ************************************************ */
}

const overviewOffers = [
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "En savoir plus",
    btn2: "Matcher",
    btn3: "Refuser",
    matches: "90%",
  },
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "En savoir plus",
    btn2: "Matcher",
    btn3: "Refuser",
    matches: "90%",
  },
  {
    image: "company-offer-card",
    title: "Excellent",
    content: "Marketing/Communication",
    location: "4 Rue du Général de Larminat - 75015 Paris",
    desc1: "Domaine : Webdesign",
    desc2: "Durée : 1 an",
    desc3: "Niveau d’étude : Brevet",
    btn1: "En savoir plus",
    btn2: "Matcher",
    btn3: "Refuser",
    matches: "90%",
  },
];
const marks = [
  {
    value: 0,
    label: "0€",
  },
  {
    value: 10000,
    label: "10 000€",
  },
];
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
    padding: "0 3.6rem",
  },
  root2: {
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
    height: "3.7rem",
    padding: "0 3.6rem",
  },

  label: {
    textTransform: "capitalize",
  },
});
