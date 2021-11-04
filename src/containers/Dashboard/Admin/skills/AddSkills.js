import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listOfSkills, Create_skills } from "../../../../Redux/actions";
import FullScreenModal from "../../../../components/FullScreenModal";
import Button from "../../../../components/Button";
import { useFormik } from "formik";
import { ADD_SKILL_STATE } from "../../../../Globals/InitialValues/Admin";
import { ADD_SKILL_YUP } from "../../../../components/Formik/Admin";
import { Container, Row, Col, Form } from "react-bootstrap";

const AddSkills = (props) => {
  const dispatch = useDispatch();
  const [addSkills, setAddSkills] = useState(false);
  const formik = useFormik({
    initialValues: ADD_SKILL_STATE,
    validationSchema: ADD_SKILL_YUP,
    onSubmit: async (values, actions) => {
      dispatch(Create_skills(values));
      setAddSkills(false);
      dispatch(listOfSkills());
      actions.resetForm();
      props.setUpdateSkills(true);
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  return (
    <>
      <Button
        fullWidth={false}
        minWidth="10%"
        text={props.text}
        style={props.style}
        onClick={() => {
          setAddSkills(true);
        }}
      />
      <FullScreenModal
        open={addSkills}
        title={`Skills`}
        onClose={() => {
          setAddSkills(false);
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
                      >
                        <option value="">Select Skills</option>
                        <option value="Soft Skill">Soft Skill</option>
                        <option value="Hard Skill">Hard Skill</option>
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
export default AddSkills;
