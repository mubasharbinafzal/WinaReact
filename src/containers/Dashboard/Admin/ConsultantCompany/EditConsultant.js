import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listOfSkills,
  Create_skills,
  Edit_skills,
} from "../../../../Redux/actions";
import FullScreenModal from "../../../../components/FullScreenModal";
import Button from "../../../../components/Button";
import { useFormik } from "formik";
import { ADD_SKILL_STATE } from "../../../../Globals/InitialValues/Admin";
import { ADD_SKILL_YUP } from "../../../../components/Formik/Admin";
import { Container, Row, Col, Form } from "react-bootstrap";

const EditSkills = (props) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      skillField: props.editObj.name,
      skillType: props.editObj.type,
    },
    validationSchema: ADD_SKILL_YUP,
    onSubmit: async (values, actions) => {
      dispatch(Edit_skills(props.editObj._id, values));
      props.setEditSkills(false);
      dispatch(listOfSkills());
      actions.resetForm();
    },
  });
  useEffect(() => {}, [props]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  return (
    <>
      <FullScreenModal
        open={props.editSkills}
        title={`Skills`}
        onClose={() => {
          props.setEditSkills(false);
        }}
        body={
          <>
            <Container>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        name="skillField"
                        type="text"
                        value={formik.values.skillField}
                        size="lg"
                        placeholder="Name"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>
                    <div class="text-danger h6">
                      {formik.errors.skillField && formik.touched.skillField
                        ? formik.errors.skillField
                        : null}
                    </div>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Type Of Skills</Form.Label>
                      <Form.Control
                        name="skillType"
                        size="lg"
                        value={formik.values.skillType}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        as="select"
                        readOnly
                      >
                        <option
                          disabled={formik.values.skillType}
                          value={formik.values.skillType}
                        >
                          {formik.values.skillType}
                        </option>
                      </Form.Control>
                    </Form.Group>
                    <div class="text-danger h6">
                      {formik.errors.skillType && formik.touched.skillType
                        ? formik.errors.skillType
                        : null}
                    </div>
                  </Col>
                  <Col>
                    <Button
                      fullWidth={false}
                      minWidth="20%"
                      text="Submit"
                      type="submit"
                      style={{
                        marginTop: "19px",
                        height: "35px",
                      }}
                    />
                  </Col>
                </Row>
              </form>
            </Container>
          </>
        }
      />
    </>
  );
};
export default EditSkills;
