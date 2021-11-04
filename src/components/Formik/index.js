export const formik = useFormik({
  initialValues: SIGNUP_STATE,
  validationSchema: SIGNUP_YUP,
  onSubmit: (values) => {
    dispatch(signup(values));
    formik.setSubmitting(false);
    formik.handleReset();
    // console.log(values, "values");
  },
});

export default formik;
