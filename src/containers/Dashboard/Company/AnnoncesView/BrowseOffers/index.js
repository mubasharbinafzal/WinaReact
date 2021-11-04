import React, { useState, useEffect } from "react";
import { Row, Col, Nav, Tab, Tabs, Image, Form } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import { POSITION_SOUGHT_STATE } from "../../../../../Globals/InitialValues/Company";
import { POSITION_SOUGHT_YUP } from "../../../../../components/Formik/Company/yupValidation";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import ModalInput from "../../../../../components/UI/TextField";
import DatePicker from "../../../../../components/UI/DatePicker";
import Select from "../../../../../components/UI/Select";
import Button from "../../../../../components/UI/Button";
import axios from "axios";
import RadioButton from "../../../../../components/UI/RadioButton";
import { useHistory } from "react-router-dom";
import {
  DomainOptions,
  DurationOptions,
  RythmeOptions,
  levelOfEducation,
  AgeRangeOptions,
} from "../../../../../Globals";
import {
  getSkills,
  getApiAdress,
  Create_Job,
} from "../../../../../Redux/actions";
import AutoComplete from "../../../../../components/UI/AutoComplete";
import MultiAutoComplete from "../../../../../components/UI/MultiSelect";
import TextArea from "../../../../../components/UI/Textarea";
import _ from "lodash";
import Texts from "../../../../../Globals/Texts";
import { baseUrl } from "../../../../../urlConfig";
import Skills from "../../../Admin/skills/AddSkills";
export default function BrowseOffers() {
  const history = useHistory();
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const store2 = useSelector((state) => state.globals);

  const store = useSelector((state) => state.company);
  const store3 = useSelector((state) => state.auth);

  const COMPANY = store3.user && store3.user.company;

  const [image, setImage] = useState("");
  const [imageURI, setimageURI] = useState("");

  const [softSkillsArray, setsoftSkillsArray] = useState([]);
  const [hardSkillsArray, sethardSkillsArray] = useState([]);
  const [items, setItems] = useState([]);

  const [value, setValue] = React.useState(30);
  let SOFT_SKILLS = store2.soft_skills;
  let HARD_SKILLS = store2.hard_skills;
  let JOB_MESSAGE_SUCCESS = store.message;
  // formik
  const formik = useFormik({
    initialValues: POSITION_SOUGHT_STATE,
    validationSchema: POSITION_SOUGHT_YUP,
    onSubmit: async (values, actions) => {
      let tempValues = _.cloneDeep(values);
      const formdataImage = new FormData();
      formdataImage.append("image", image);
      const imageData = await axios({
        method: "post",
        url: `${baseUrl}/FileUpload`,
        data: formdataImage,
      });
      let imagePath = imageData.data;
      tempValues.softSkills = softSkillsArray;
      tempValues.hardSkills = hardSkillsArray;
      tempValues.photo = imagePath;
      dispatch(Create_Job(tempValues, formik));
      formik.setFieldValue("location", {
        city: "",
        street: "",
        zip: "",
        longitude: "",
        latitude: "",
      });
      formik.setSubmitting(false);
      formik.handleReset();
      setsoftSkillsArray([]);
      sethardSkillsArray([]);
      setItems([]);
      setimageURI("");
      setImage("");
      history.push("/invalid");
    },
  });
  // onChange
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
  // useEffect(() => {
  //   console.log(items);
  // }, [items]);
  useEffect(() => {
    dispatch(getSkills("Soft Skill"));
    dispatch(getSkills("Hard Skill"));
  }, []);
  useEffect(() => {
    if (COMPANY && COMPANY.address && Object.keys(COMPANY).length > 0) {
      const {
        address: { city, street, zip, longitude, latitude },
      } = COMPANY;
      formik.setFieldValue("location", {
        city: city,
        street: street,
        zip: zip,
        longitude: longitude,
        latitude: latitude,
      });
    }
  }, []);
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  const handleAddressChange = (value) => {
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
  // console.log(softSkillsArray, "value");

  return (
    <>
      <Tabs defaultActiveKey="publish" id="publish" className="publish">
        <Tab eventKey="publish" title="Publier" className="h-100">
          <div className="publishBox">
            <div className="publish custom-box">
              <form onSubmit={formik.handleSubmit}>
                <Row className="publish-header align-items-center">
                  <Col lg={4} md={4}>
                    <div className="add_image_icon">
                      <label htmlFor="upload-button">
                        <Image
                          src={
                            imageURI ? imageURI : "../images/add_image_icon.png"
                          }
                        />
                      </label>
                    </div>
                    <input
                      type="file"
                      id="upload-button"
                      name="photo"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                    {formik.touched.photo && formik.errors.photo ? (
                      <div className="formikError"> {formik.errors.photo}</div>
                    ) : null}
                  </Col>
                  <Col lg={8} md={8}>
                    <div className="publish-header-content">
                      <div className="FieldAndPlaces">
                        <div>
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
                        <div className="w-50">
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
                      </div>
                      <div className="FieldAndPlaces">
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
                      <div className="startDateandDuration">
                        <div>
                          <DatePicker
                            name="startDate"
                            label={"Date de début"}
                            value={formik.values.startDate}
                            onChange={handleChange}
                          />
                          {formik.touched.startDate &&
                          formik.errors.startDate ? (
                            <div className="formikErrorDate">
                              {formik.errors.startDate}
                            </div>
                          ) : null}
                        </div>
                        <div>
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
                      </div>
                      <div className="pt-4 FieldAndPlaces">
                        <div>
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
                        <div className="w-50">
                          <AutoComplete
                            formik={formik}
                            onChange={handleAddressChange}
                            items={items}
                            placeholder="Adresse"
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
                      <div className="startDateandDuration pt-4">
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
                    </div>
                  </Col>
                </Row>

                <Row>
                  <Col md={4}>
                    <MultiAutoComplete
                      formik={formik}
                      placeholder="Compétences générales "
                      items={SOFT_SKILLS}
                      name={"softSkills"}
                      loading={store.loading}
                      onSubmit={onSoftSkillChange}
                    />

                    {formik.touched.softSkills && formik.errors.softSkills ? (
                      <div className="formikErrorDate">
                        {formik.errors.softSkills}
                      </div>
                    ) : null}
                  </Col>
                  <Col md={4}>
                    <MultiAutoComplete
                      formik={formik}
                      placeholder="Compétences spécialisées"
                      items={HARD_SKILLS}
                      name={"hardSkills"}
                      loading={store2.loading}
                      onSubmit={onHardSkillChange}
                    />

                    {formik.touched.hardSkills && formik.errors.hardSkills ? (
                      <div className="formikErrorDate">
                        {formik.errors.hardSkills}
                      </div>
                    ) : null}
                  </Col>
                </Row>
                <div className="text-right">
                  {store.loading ? (
                    <Button
                      className="Enregistrer"
                      type="submit"
                      variant="primary"
                      value="Loading...."
                      disabled={store.loading}
                    />
                  ) : (
                    <Button
                      className="Enregistrer"
                      type="submit"
                      variant="primary"
                      value="Enregistrer"
                      disabled={false}
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
// ******************************
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
});
const schoolName = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
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
