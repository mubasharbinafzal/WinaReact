import * as Yup from "yup";

export const ADD_SKILL_YUP = Yup.object({
  skillField: Yup.string().required("This field is required"),
  skillType: Yup.string().required("This field is required"),
});

export const ADD_CONSULTANT_YUP = Yup.object({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),
  status: Yup.string().required("This field is required"),

  email: Yup.string().email("Invalid email").required("This field is required"),
  phone: Yup.string()
    .min(10, "Phone is not valid")
    .required("This field is required"),
  password: Yup.string()
    .min(6, "Too Short!")
    .required("This field is required"),
  confirm_password: Yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: Yup.string().oneOf(
      [Yup.ref("password")],
      "Both password need to be the same"
    ),
  }),
  city: Yup.string().required("This field is required"),
  street: Yup.string().required("This field is required"),
  zip: Yup.string().min(4, "Too Short!").required("This field is required"),
});
