import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "material-table";
import {
  listOfConsultantStudent,
  listOfConsultantCompany,
} from "../../../../Redux/actions";
import Button from "../../../../components/Button";
import Add from "./AddConsultant";
import EditSkills from "./EditConsultant";
const ConsultantCompany = () => {
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [skillflag, setSkillflag] = useState(false);
  const dispatch = useDispatch();
  const student = useSelector((state) => state.admin.consultantStudent);
  const Teacher = useSelector((state) => state.admin.consultantTeacher);
  const [skillField, setSkillField] = useState("");
  const [add, setAdd] = useState(false);
  const [editSkills, setEditSkills] = useState(false);
  const [editObj, setEditObj] = useState();
  // formik

  function _data() {
    let data = [];
    Teacher &&
      Teacher.map((key, index) => {
        data.push({
          _id: key._id,
          firstName: key.user.firstName,
          lastName: key.user.lastName,
          email: key.user.email,
          phone: key.user.phone,
        });
        return data;
      });
    setData(data);
  }
  useEffect(() => {
    dispatch(listOfConsultantStudent());
    dispatch(listOfConsultantCompany());
  }, [add]);
  useEffect(() => {
    _data();
    setSkillflag(false);
  }, [student, Teacher]);

  return (
    <>
      <Add add={add} setAdd={setAdd} />
      {editSkills === true ? (
        <EditSkills
          editSkills={editSkills}
          setEditSkills={setEditSkills}
          editObj={editObj}
        />
      ) : null}

      <Button
        fullWidth={false}
        minWidth="10%"
        text="CREATE"
        style={{ margin: "0px 0px 8px auto", display: "block" }}
        onClick={() => {
          setAdd(true);
        }}
      />
      <MaterialTable
        columns={[
          { title: "First Name", field: "firstName" },
          { title: "Last Name", field: "lastName" },
          { title: "Email", field: "email" },
          { title: "Phone", field: "phone" },
        ]}
        data={data}
        title="Consultant Company "
        options={{
          actionsColumnIndex: -1,
        }}
        // actions={[
        //   {
        //     icon: "edit",
        //     tooltip: "Edit",
        //     onClick: (event, rowData) => {
        //       // setSkillflag(true);
        //       // setEditSkills(true);
        //       // setEditObj(rowData);
        //     },
        //   },
        //   {
        //     icon: "delete",
        //     tooltip: "Delete",
        //     onClick: (event, rowData) => {
        //       // dispatch(deleteSkills(rowData._id));
        //       // setSkillflag(true);
        //     },
        //   },
        // ]}
      />
    </>
  );
};
export default ConsultantCompany;
