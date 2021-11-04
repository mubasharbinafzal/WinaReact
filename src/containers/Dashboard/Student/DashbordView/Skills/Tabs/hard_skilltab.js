import React from "react";
import { Image, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

export default function Hard_skilltab(props) {
  const {
    options,
    Select,
    Button,
    store,
    SKILLS_STATE,
    SKILLS_YUP,
    ModalInput,
    DB_Array,
    Add_info_Student,
    HARD_SKILLS_DB,
    Notistack,
  } = props;
  const dispatch = useDispatch();

  //   ************
  //   ******************************************
  const formik = useFormik({
    initialValues: SKILLS_STATE,
    validationSchema: SKILLS_YUP,
    onSubmit: (values) => {
      let check = HARD_SKILLS_DB.some((sa) => sa === values.name);
      if (check === false) {
        let obj = {};
        DB_Array.push(values.name);
        obj.hardSkills = DB_Array;
        dispatch(Add_info_Student(obj, formik));
        formik.handleReset();
      } else {
        dispatch(
          Notistack.enqueueSnackbar(
            Notistack.snackBar("Hard skill name already existed", "error")
          )
        );
      }
    },
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    formik.setFieldValue(name, value);
  };
  return (
    <div className="GeneralSkillsBox">
      <div className="GeneralSkills">
        <div className="GSkillsBox">
          <div className="skills-heading">
            Dites-nous vos compétences spécialisées :
          </div>
          <div className="text-left">
            <div className="skills-heading-line"></div>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <Select
                name="name"
                value={formik.values.name}
                onChange={handleChange}
                options={options}
                label="Type d’emploi"
                type="skills"
              />

              {formik.touched.name && formik.errors.name ? (
                <div className="formikErrorAuto"> {formik.errors.name}</div>
              ) : null}
            </div>
            <div className="description">
              {/* <ModalInput
              name="linkedIn"
              placeholder="linkedIn"
              onChange={handleNetworkChange}
              value={networkFormData.linkedIn}
              type="text"
            /> */}
            </div>
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
          </form>
        </div>
      </div>
    </div>
  );
}
