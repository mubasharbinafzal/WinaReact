import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { GENERAL_INFO_STATE } from "../../../../../../Globals/InitialValues/Student";
import { GENERAL_INFO_YUP } from "../../../../../../components/Formik/Student/yupValidation";
import TextArea from "../../../../../../components/UI/Textarea";
import SchoolModal from "../../../../../../components/UI/Modal";
import ModalInput from "../../../../../../components/UI/Input";
import Button from "../../../../../../components/UI/Button";

import { useDispatch, useSelector } from "react-redux";
import {
  Add_Image_info_Student,
  Add_info_Student,
} from "../../../../../../Redux/actions";

const GeneralInformationsModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.student);

  // states
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [networkFormData, setnetworkFormData] = useState({
    linkedIn: "",
    Behance: "",
    Dribble: "",
    Github: "",
  });
  // formik
  const formik = useFormik({
    initialValues: GENERAL_INFO_STATE,
    validationSchema: GENERAL_INFO_YUP,
    onSubmit: (values) => {
      let form_data = new FormData();
      if (image) {
        form_data.append("image", image);
      }
      if (video) {
        form_data.append("video", video);
      }

      form_data.append(
        "professional_networks",
        JSON.stringify(networkFormData)
      );
      form_data.append("general_Presentation", values.general_Presentation);

      dispatch(Add_Image_info_Student(form_data));

      setShow(false);
    },
  });

  // useEffect
  useEffect(() => {
    if (store.user.student) {
      const {
        professional_networks,
        general_Presentation,
        professional_Picture,
        presentation_Video,
      } = store.user.student;
      if (
        professional_networks &&
        Object.keys(professional_networks).length > 0
      ) {
        const {
          linkedIn,
          Behance,
          Dribble,
          Github,
        } = store.user.student.professional_networks;
        setnetworkFormData({
          linkedIn: linkedIn || "",
          Behance: Behance || "",
          Dribble: Dribble || "",
          Github: Github || "",
        });
      }
      formik.setFieldValue("general_Presentation", general_Presentation);
      formik.setFieldValue("image", professional_Picture.image);
      formik.setFieldValue("video", presentation_Video.video);
    }
  }, [store.user.student, setShow, show]);
  // handle networks chnages
  // https://dribbble.com/s
  const handleNetworkChange = (e) => {
    setnetworkFormData({
      ...networkFormData,
      [e.target.name]: e.target.value,
    });
  };
  // onChange
  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  const handleFileUpload = (e) => {
    if (e.target.files.length) {
      let file = e.target.files[0];
      if (file.type !== "application/pdf") {
        const uri = URL.createObjectURL(file);
        if (file.type === "video/mp4") {
          if (file.size <= 200000000) {
            setVideo(file);
            formik.setFieldValue("video", file.name);
          } else {
            alert("you can upload upto 200mb video");
          }
        } else if (file.type === "image/png" || file.type === "image/jpeg") {
          formik.setFieldValue("image", file.name);

          setImage(file);
        }
      } else {
        alert("You can upload only images or videos ");
      }
    }
  };

  return (
    <SchoolModal
      show={show}
      className="custom-modal"
      handleClose={() => setShow(false)}
      modalTitle="Informations Générales"
      children={
        <div class="container">
          <div className="row">
            <div className="col-lg-12 ">
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <label>Upload Image</label>
                  <ModalInput
                    id="upload-image-button"
                    name="image"
                    accept="image/*"
                    onChange={handleFileUpload}
                    placeholder="professional_Picture"
                    type="file"
                  />
                  {formik.values.image ? (
                    <div>
                      {" "}
                      <b>{formik.values.image}</b>
                    </div>
                  ) : null}
                </div>
                <div className="my-4">
                  <label>Upload Video</label>

                  <ModalInput
                    placeholder="professional_Video"
                    name="video"
                    accept="video/*"
                    onChange={handleFileUpload}
                    type="file"
                  />
                  {formik.values.video ? (
                    <div>
                      {" "}
                      <b>{formik.values.video}</b>
                    </div>
                  ) : null}
                </div>
                <div>
                  <ModalInput
                    name="linkedIn"
                    placeholder="linkedIn"
                    onChange={handleNetworkChange}
                    value={networkFormData.linkedIn}
                    type="text"
                  />
                </div>
                <div>
                  <ModalInput
                    name="Behance"
                    placeholder="Behance"
                    onChange={handleNetworkChange}
                    value={networkFormData.Behance}
                    type="text"
                  />
                </div>
                <div>
                  <ModalInput
                    name="Dribble"
                    placeholder="Dribble"
                    onChange={handleNetworkChange}
                    onBlur={formik.handleBlur}
                    value={networkFormData.Dribble}
                    type="text"
                  />
                </div>
                <div>
                  <ModalInput
                    name="Github"
                    placeholder="Github"
                    onChange={handleNetworkChange}
                    value={networkFormData.Github}
                    type="text"
                  />
                </div>
                <div className="description">
                  <TextArea
                    name="general_Presentation"
                    value={formik.values.general_Presentation}
                    onChange={handleChange}
                    onBlur={formik.handleBlur}
                    rows={3}
                    placeholder="General Presentation"
                  />
                  {formik.touched.general_Presentation &&
                  formik.errors.general_Presentation ? (
                    <div className="formikErrorDesc">
                      {" "}
                      {formik.errors.general_Presentation}
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
      }
    />
  );
};

export default GeneralInformationsModal;
