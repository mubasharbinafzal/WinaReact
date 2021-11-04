import React, { useState, useEffect } from "react";
import { Row, Col, Tab, Tabs } from "react-bootstrap";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ModalInput from "../../../../../components/UI/TextField";
import Select from "../../../../../components/UI/Select";
import DatePicker from "../../../../../components/UI/DatePicker";
import RadioButton from "../../../../../components/UI/RadioButton";
import CheckBox from "../../../../../components/UI/CheckBox";
import Button from "../../../../../components/UI/Button";
import { useDispatch, useSelector } from "react-redux";
import { Add_info_Student } from "../../../../../Redux/actions";
import { useFormik } from "formik";
import TextArea from "../../../../../components/UI/Textarea";

import { POSITION_SOUGHT_STATE } from "../../../../../Globals/InitialValues/Student";
import {
  DomainOptions,
  DurationOptions,
  RythmeOptions,
  levelOfEducation,
} from "../../../../../Globals";

import { POSITION_SOUGHT_YUP } from "../../../../../components/Formik/Student/yupValidation";

const ResearchedJob = () => {
  const store = useSelector((state) => state.student);
  const dispatch = useDispatch();
  const POSITION_SOUGHT = store.user && store.user.student.positionSought;

  const formik = useFormik({
    initialValues: POSITION_SOUGHT_STATE,
    validationSchema: POSITION_SOUGHT_YUP,
    onSubmit: (values) => {
      let obj = {};
      obj.positionSought = values;
      dispatch(Add_info_Student(obj, formik));
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    if (POSITION_SOUGHT && Object.keys(POSITION_SOUGHT).length > 0) {
      formik.setFieldValue("domain", POSITION_SOUGHT.domain);
      formik.setFieldValue("description", POSITION_SOUGHT.description);

      formik.setFieldValue("position", POSITION_SOUGHT.position);
      formik.setFieldValue("duration", POSITION_SOUGHT.duration);
      formik.setFieldValue("startDate", POSITION_SOUGHT.startDate);
      formik.setFieldValue(
        "alternationRhythm",
        POSITION_SOUGHT.alternationRhythm
      );
      formik.setFieldValue(
        "levelOfEducation",
        POSITION_SOUGHT.levelOfEducation
      );
    }
  }, []);
  return (
    <>
      <Tabs
        defaultActiveKey="Research"
        id="ResearchedJob"
        className="ResearchedJob upper-nav custom-tabs"
      >
        <Tab eventKey="Research" title="Recherche">
          <div className="ResearchBox custom-box">
            <form onSubmit={formik.handleSubmit}>
              <Row className="Research align-items-center">
                <Col lg={3} md={3} className="col-3-width pl-0">
                  <ModalInput
                    name="position"
                    label="Position"
                    // className="Job_title"
                    placeholder="Intitulé du poste . Ex : Chef de projet"
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
                </Col>

                <Col lg={3} md={3}>
                  <Select
                    name="domain"
                    value={formik.values.domain}
                    onChange={handleChange}
                    options={DomainOptions}
                    label="Domaine"
                  />

                  {formik.touched.domain && formik.errors.domain ? (
                    <div className="formikErrorAuto">
                      {" "}
                      {formik.errors.domain}
                    </div>
                  ) : null}
                </Col>
                <Col lg={3} md={3}>
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
                </Col>
              </Row>
              <Row className="levelofStudyBox">
                <Col lg={3} md={3}>
                  <DatePicker
                    name="startDate"
                    label={"Date de début"}
                    value={formik.values.startDate}
                    onChange={handleChange}
                  />
                  {formik.touched.startDate && formik.errors.startDate ? (
                    <div className="formikErrorAuto">
                      {" "}
                      {formik.errors.startDate}
                    </div>
                  ) : null}
                </Col>
                <Col lg={3} md={3}>
                  <DatePicker
                    name="dateOfBirth"
                    label={"Date Of Birth"}
                    value={formik.values.dateOfBirth}
                    onChange={handleChange}
                  />
                  {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                    <div className="formikErrorAuto">
                      {" "}
                      {formik.errors.dateOfBirth}
                    </div>
                  ) : null}
                </Col>

                <Col lg={3} md={3} className="col-3-width">
                  <Select
                    name="duration"
                    value={formik.values.duration}
                    onChange={handleChange}
                    options={DurationOptions}
                    label="Durée"
                  />

                  {formik.touched.duration && formik.errors.duration ? (
                    <div className="formikErrorAuto">
                      {" "}
                      {formik.errors.duration}
                    </div>
                  ) : null}
                </Col>
              </Row>
              <div className="checkBoxes">
                <RadioButton
                  options={RythmeOptions}
                  name="alternationRhythm"
                  label="Rythme alternances :"
                  value={formik.values.alternationRhythm}
                  onChange={handleChange}
                />
                {formik.touched.alternationRhythm &&
                formik.errors.alternationRhythm ? (
                  <div className="formikErrorAuto">
                    {" "}
                    {formik.errors.alternationRhythm}
                  </div>
                ) : null}
              </div>
              <div className="col-lg-6">
                <TextArea
                  name="description"
                  placeholder="Enter Description"
                  value={formik.values.description}
                  onChange={handleChange}
                  rows={3}
                />
                {formik.touched.description && formik.errors.description ? (
                  <div className="formikErrorDesc">
                    {" "}
                    {formik.errors.description}
                  </div>
                ) : null}
              </div>

              {/* <div className="jobIsProvided text-left">
                <CheckBox onChange={handleChange} label="Le poste est pourvu" name="availibilty" />
              </div> */}
              <div className="jobIsProvided text-right">
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
        </Tab>
        {/* <Tab eventKey="Favoris" title="Favoris">
          Favoris
        </Tab>
        <Tab eventKey="Historique" title="Historique">
          Historique
        </Tab> */}
      </Tabs>
    </>
  );
};
export default ResearchedJob;
