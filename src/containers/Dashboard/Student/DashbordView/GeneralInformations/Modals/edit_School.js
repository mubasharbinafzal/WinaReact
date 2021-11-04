import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { SCOOL_STATE } from "../../../../../../Globals/InitialValues/Student";
import { SCOOL_YUP } from "../../../../../../components/Formik/Student/yupValidation";
import DatePicker from "../../../../../../components/UI/DatePicker";
import TextArea from "../../../../../../components/UI/Textarea";
import SchoolModal from "../../../../../../components/UI/Modal";
import { useDispatch, useSelector } from "react-redux";
import ModalInput from "../../../../../../components/UI/TextField";
import Button from "../../../../../../components/UI/Button";
import Input from "../../../../../../components/UI/Input";
import { baseUrl } from "../../../../../../urlConfig";
import axios from "axios";
import { Add_Image_info_Student } from "../../../../../../Redux/actions";

const GeneralInformationsModal = ({
  show,
  setShow,
  id,
  schoolsArray,
  data,
  setedit_school_id,
}) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.student);
  const [Image, setImage] = useState("");

  // formik
  const formik = useFormik({
    initialValues: SCOOL_STATE,
    validationSchema: SCOOL_YUP,
    onSubmit: async (values) => {
      if (id) {
        if (Image) {
          const formdataImage = new FormData();
          formdataImage.append("image", Image);
          const imageData = await axios({
            method: "post",
            url: `${baseUrl}/FileUpload`,
            data: formdataImage,
          });
          let imagePath = imageData.data;

          values.image = imagePath;
        }
        let temp = data.findIndex((dt) => dt._id === id);
        schoolsArray[temp] = values;
        let form_data = new FormData();
        form_data.append("education", JSON.stringify(schoolsArray));
        dispatch(Add_Image_info_Student(form_data));
        setShow(false);
        setedit_school_id("");
      }
    },
  });

  useEffect(() => {
    if (data && id) {
      let temp = data.find((dt) => dt._id === id);
      if (temp) {
        formik.setFieldValue("description", temp.description);
        formik.setFieldValue("end_Date", temp.end_Date);
        formik.setFieldValue("start_Date", temp.start_Date);
        formik.setFieldValue("school", temp.school);
        formik.setFieldValue("image", temp.image);
      }
    }
  }, [id, show, setShow]);
  // conso,showle.log(formik, "formik");

  // onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      let file = e.target.files[0];
      if (file.type === "image/png" || file.type === "image/jpeg") {
        setImage(file);
        formik.setFieldValue("image", file.name);
      } else {
        alert("You can upload only images ");
      }
    }
    formik.setFieldValue(name, value);
  };

  return (
    <SchoolModal
      show={show}
      className="custom-modal"
      handleClose={() => setShow(false)}
      modalTitle="Formation / École"
      children={
        data && id ? (
          <div class="container">
            <div className="row">
              <div className="col-lg-12 ">
                <form onSubmit={formik.handleSubmit}>
                  <div>
                    <ModalInput
                      name="school"
                      label="École"
                      // className="Job_title"
                      placeholder="École"
                      value={formik.values.school}
                      onChange={handleChange}
                      type="text"
                    />
                    {formik.touched.school && formik.errors.school ? (
                      <div className="formikErrorAuto">
                        {" "}
                        {formik.errors.school}
                      </div>
                    ) : null}
                  </div>
                  <div className="DateRow ">
                    <div>
                      <DatePicker
                        name="start_Date"
                        label={"Date de fin"}
                        value={formik.values.start_Date}
                        onChange={handleChange}
                      />
                      {formik.touched.start_Date && formik.errors.start_Date ? (
                        <div className="formikErrorDate">
                          {" "}
                          {formik.errors.start_Date}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <DatePicker
                        name="end_Date"
                        label={"Date de fin"}
                        value={formik.values.end_Date}
                        onChange={handleChange}
                      />
                      {formik.touched.end_Date && formik.errors.end_Date ? (
                        <div className="formikErrorDate">
                          {" "}
                          {formik.errors.end_Date}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Input
                      name="image"
                      placeholder="professional_Picture"
                      onChange={handleChange}
                      type="file"
                      accept="image/*"
                    />
                    {formik.values.image ? (
                      <div> {formik.values.image}</div>
                    ) : null}
                    {formik.touched.image && formik.errors.image ? (
                      <div className="formikErrorAuto">
                        {" "}
                        {formik.errors.image}
                      </div>
                    ) : null}
                  </div>
                  <div className="description">
                    <TextArea
                      name="description"
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
        ) : (
          "Loading data...."
        )
      }
    />
  );
};

export default GeneralInformationsModal;
