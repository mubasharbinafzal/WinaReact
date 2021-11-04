import * as Yup from "yup"

export const SIGNUP_YUP = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  phone: Yup.string()
    .min(10, "Must be 10 characters long")
    .max(10, "Must be 10 characters long")
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
})
export const LOGIN_YUP = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().max(255).required("Required"),
})
export const SCOOL_YUP = Yup.object({
  school: Yup.string().required("Required"),
  start_Date: Yup.string().required("Required"),
  end_Date: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
})
export const GENERAL_INFO_YUP = Yup.object({
  general_Presentation: Yup.string(),
})
export const SOFT_SKILLS_YUP = Yup.object({
  name: Yup.string().required("Required"),
})
export const LANGUAGE_YUP = Yup.object({
  name: Yup.string().required("Required"),
  skill: Yup.string().required("Required"),
})
export const HARD_SKILLS_YUP = Yup.object({
  name: Yup.string().required("Required"),
})
export const PROFESSIONAL_PROFILE_YUP = Yup.object({
  position: Yup.string().required("Required"),
  company: Yup.string().required("Required"),
  type: Yup.string().required("Required"),
  place: Yup.string().required("Required"),
  start_date: Yup.string().required("Required"),
  end_date: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
})
export const POSITION_SOUGHT_YUP = Yup.object({
  domain: Yup.string().required("Required"),
  dateOfBirth: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
  duration: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  alternationRhythm: Yup.string().required("Required"),
  levelOfEducation: Yup.string().required("Required"),
})

// forgot password

export const FORGOT_PASSWORD_YUP = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
})
export const VERIFY_YUP = Yup.object({
  token: Yup.string().required("Required"),
})
// rESET password

export const RESET_PASSWORD_YUP = Yup.object({
  password: Yup.string().required("Required"),
  confirm: Yup.string().required("Required"),
})
