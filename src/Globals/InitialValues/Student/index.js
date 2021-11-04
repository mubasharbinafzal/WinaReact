export const SIGNUP_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm_password: "",
  type: "student",
  phone: "",
  address: {
    city: "",
    street: "",
    zip: "",
    longitude: "",
    latitude: "",
  },
};
export const LOGIN_STATE = {
  email: "",
  password: "",
};
export const SCOOL_STATE = {
  school: "",
  start_Date: "",
  end_Date: "",
  description: "",
  image: "",
};
export const GENERAL_INFO_STATE = {
  general_Presentation: "",
};
export const SOFT_SKILLS_STATE = {
  name: "",
};
export const HARD_SKILLS_STATE = {
  name: "",
};
export const LANGUAGE_STATE = {
  name: "",
  skill: "",
};
export const PROFESSIONAL_PROFILE_STATE = {
  position: "",
  company: "",
  place: "",
  start_date: "",
  end_date: "",
  type: "",
  position_hold: false,
  description: "",
  image: "",
};
export const POSITION_SOUGHT_STATE = {
  domain: "",
  dateOfBirth: "",
  position: "",
  duration: "",
  startDate: "",
  alternationRhythm: "",
  levelOfEducation: "",
};
export const FORGOT_PASSWORD_STATE = {
  email: "",
};

export const VERIFY_STATE = {
  token: "",
};
// rESET password

export const RESET_PASSWORD_STATE = {
  password: "",
  confirm: "",
};
