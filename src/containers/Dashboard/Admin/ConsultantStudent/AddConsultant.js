import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  listOfConsultantStudent,
  CreateConsultant,
} from "../../../../Redux/actions";
import FullScreenModal from "../../../../components/FullScreenModal";
import Button from "../../../../components/Button";
import { useFormik } from "formik";
import { ADD_Consultant_STATE } from "../../../../Globals/InitialValues/Admin";
import { ADD_CONSULTANT_YUP } from "../../../../components/Formik/Admin";
import { Container, Row, Col, Form } from "react-bootstrap";

const AddConsultant = (props) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: ADD_Consultant_STATE,
    validationSchema: ADD_CONSULTANT_YUP,
    onSubmit: async (values, actions) => {
      let data = {
        firstName: values.firstName,
        lastName: values.lastName,
        type: "studentConsultant",
        status: values.status,
        email: values.email,
        password: values.password,
        confirm_password: values.confirm_password,
        phone: values.phone,
        address: {
          city: values.city,
          street: values.street,
          zip: values.zip,
          longitude: "263",
          latitude: "995",
        },
      };

      let check = dispatch(CreateConsultant(data));
      check.then(function (value) {
        if (value === true) {
          props.setAdd(false);
          actions.resetForm();
          dispatch(listOfConsultantStudent());
        }
      });
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  return (
    <>
      <FullScreenModal
        open={props.add}
        title={`Consultant profile`}
        onClose={() => {
          props.setAdd(false);
        }}
        body={
          <>
            <Container>
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col md="4">
                    <Form.Group controlId="firstName">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        name="firstName"
                        type="text"
                        value={formik.values.firstName}
                        size="lg"
                        placeholder="First Name"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>

                    <div class="text-danger h6">
                      {formik.errors.firstName && formik.touched.firstName
                        ? formik.errors.firstName
                        : null}
                    </div>
                  </Col>
                  <Col md="4">
                    <Form.Group controlId="lastName">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        name="lastName"
                        type="text"
                        value={formik.values.lastName}
                        size="lg"
                        placeholder="Last Name"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>

                    <div class="text-danger h6">
                      {formik.errors.lastName && formik.touched.lastName
                        ? formik.errors.lastName
                        : null}
                    </div>
                  </Col>

                  <Col md="4">
                    <Form.Group>
                      <Form.Label>Type status *</Form.Label>
                      <Form.Control
                        name="status"
                        size="lg"
                        value={formik.values.status}
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                        as="select"
                      >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="deactive">Deactive</option>
                      </Form.Control>
                    </Form.Group>
                    <div class="text-danger h6">
                      {formik.errors.status && formik.touched.status
                        ? formik.errors.status
                        : null}
                    </div>
                  </Col>

                  <Col md="4">
                    <Form.Group controlId="Email">
                      <Form.Label>Email *</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        value={formik.values.email}
                        size="lg"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>

                    <div class="text-danger h6">
                      {formik.errors.email && formik.touched.email
                        ? formik.errors.email
                        : null}
                    </div>
                  </Col>
                  <Col md="4">
                    <Form.Group controlId="Phone">
                      <Form.Label>Phone *</Form.Label>
                      <Form.Control
                        name="phone"
                        type="text"
                        value={formik.values.phone}
                        size="lg"
                        placeholder="Phone"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>

                    <div class="text-danger h6">
                      {formik.errors.phone && formik.touched.phone
                        ? formik.errors.phone
                        : null}
                    </div>
                  </Col>
                  <Col md="4"></Col>
                  <Col md="4">
                    <Form.Group controlId="Password">
                      <Form.Label>Password *</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        value={formik.values.password}
                        size="lg"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>

                    <div class="text-danger h6">
                      {formik.errors.password && formik.touched.password
                        ? formik.errors.password
                        : null}
                    </div>
                  </Col>
                  <Col md="4">
                    <Form.Group controlId="ConfirmPassword">
                      <Form.Label>Confirm Password *</Form.Label>
                      <Form.Control
                        name="confirm_password"
                        type="password"
                        value={formik.values.confirm_password}
                        size="lg"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>

                    <div class="text-danger h6">
                      {formik.errors.confirm_password &&
                      formik.touched.confirm_password
                        ? formik.errors.confirm_password
                        : null}
                    </div>
                  </Col>
                  <Col md="4"></Col>
                  <Col md="4">
                    <Form.Group controlId="City">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        name="city"
                        type="text"
                        value={formik.values.city}
                        size="lg"
                        placeholder="City"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>
                    <div class="text-danger h6">
                      {formik.errors.city && formik.touched.city
                        ? formik.errors.city
                        : null}
                    </div>
                  </Col>
                  <Col md="4">
                    <Form.Group controlId="street">
                      <Form.Label>Street *</Form.Label>
                      <Form.Control
                        name="street"
                        type="text"
                        value={formik.values.street}
                        size="lg"
                        placeholder="Street"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>
                    <div class="text-danger h6">
                      {formik.errors.street && formik.touched.street
                        ? formik.errors.street
                        : null}
                    </div>
                  </Col>
                  <Col md="4">
                    <Form.Group controlId="zip">
                      <Form.Label>Zip *</Form.Label>
                      <Form.Control
                        name="zip"
                        type="text"
                        value={formik.values.zip}
                        size="lg"
                        placeholder="Zip"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>
                    <div class="text-danger h6">
                      {formik.errors.zip && formik.touched.zip
                        ? formik.errors.zip
                        : null}
                    </div>
                  </Col>
                  {/* <Col md="2">
                    <Form.Group controlId="Picture">
                      <Form.Label>Picture</Form.Label>
                      <Form.File
                        name="picture"
                        type="file"
                        value={formik.values.picture}
                        size="lg"
                        placeholder="Picture"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>

                    <div class="text-danger h6">
                      {formik.errors.picture && formik.touched.picture
                        ? formik.errors.picture
                        : null}
                    </div>
                  </Col>
                  <Col md="2">
                    <Form.Group controlId="Video">
                      <Form.Label>Video</Form.Label>
                      <Form.File
                        name="Video"
                        type="file"
                        value={formik.values.Video}
                        size="lg"
                        placeholder="Video"
                        onChange={handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </Form.Group>

                    <div class="text-danger h6">
                      {formik.errors.Video && formik.touched.Video
                        ? formik.errors.Video
                        : null}
                    </div>
                  </Col> */}
                  <Col md="12">
                    <Button
                      fullWidth={false}
                      minWidth="10%"
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
export default AddConsultant;
