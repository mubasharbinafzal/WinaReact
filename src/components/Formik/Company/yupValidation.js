import * as Yup from "yup"
const address_object = Yup.object({
  street: Yup.string().required(),
  city: Yup.string().required(),
  zip: Yup.string().required(),
  latitude: Yup.number().required(),
  longitude: Yup.number().required(),
})
export const SECOND_SIGNUP_YUP = Yup.object().shape({
  name: Yup.string().required("Required"),
  company_type: Yup.string().required("Required"),
  siretNumber: Yup.string()
    .max(20, "siretNumber must be less than or equal to 20 characters")
    .required("Required"),

  address: Yup.object()
    .shape({
      street: Yup.string().required("Required"),
      city: Yup.string().required(
        "Please select your complete address from list"
      ),
      zip: Yup.string().required("Required"),
      latitude: Yup.string().required("Required"),
      longitude: Yup.string().required("Required"),
    })
    .required("Required"),
  // contactPerson
})
export const FIRST_SIGNUP_YUP = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string()
    .min(10, "Must be 10 characters long")
    .max(10, "Must be 10 characters long")
    .required("Required"),

  password: Yup.string()
    .min(6, "Must be 6 characters long")
    .max(255)
    .required("Required"),
  confirm_password: Yup.string()
    .when("password", {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    })
    .min(6, "Must be 10 characters long")
    .max(255)
    .required("Required"),
  positionHeld: Yup.string().required("Required"),
})

export const LOGIN_YUP = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().max(255).required("Required"),
})

// position sought

export const POSITION_SOUGHT_YUP = Yup.object({
  title: Yup.string().required("Required"),
  domain: Yup.string().required("Required"),
  description: Yup.string().required("Required"),

  position: Yup.string().required("Required"),
  duration: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  alternationRhythm: Yup.string().required("Required"),
  levelOfEducation: Yup.string().required("Required"),
  softSkills: Yup.string().required("Required"),
  hardSkills: Yup.string().required("Required"),
  ageRange: Yup.string().required("Required"),
  photo: Yup.string().required("Required"),
  location: Yup.object().shape({
    street: Yup.string().required("Required"),
    city: Yup.string().required(
      "Please select your complete address from list"
    ),
    zip: Yup.string().required("Required"),
    latitude: Yup.string().required("Required"),
    longitude: Yup.string().required("Required"),
  }),
})
