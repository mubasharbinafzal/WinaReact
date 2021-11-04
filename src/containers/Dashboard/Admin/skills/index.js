import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "material-table";
import { listOfSkills, deleteSkills } from "../../../../Redux/actions";
import Button from "../../../../components/Button";
import AddSkills from "./AddSkills";
import EditSkills from "./EditSkills";
const Skills = () => {
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [skillflag, setSkillflag] = useState(false);
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.admin.skills);
  const [skillField, setSkillField] = useState("");
  const [editSkills, setEditSkills] = useState(false);
  const [editObj, setEditObj] = useState();

  // formik

  function skillsdata() {
    let data = [];
    skills &&
      skills.map((key, index) => {
        data.push({
          _id: key._id,
          name: key.skillField,
          type: key.skillType,
        });
        return data;
      });
    setData(data);
  }
  useEffect(() => {
    dispatch(listOfSkills());
  }, [skillflag]);
  useEffect(() => {
    skillsdata();
    setSkillflag(false);
  }, [skillflag, skills]);

  return (
    <>
      {editSkills === true ? (
        <EditSkills
          editSkills={editSkills}
          setEditSkills={setEditSkills}
          editObj={editObj}
        />
      ) : null}

      <AddSkills
        text="Create"
        style={{ margin: "0px 0px 8px auto", display: "block" }}
      />
      <MaterialTable
        columns={[
          { title: "Name", field: "name" },
          { title: "Type", field: "type" },
        ]}
        data={data}
        title="Skills"
        options={{
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit",
            onClick: (event, rowData) => {
              setSkillflag(true);
              setEditSkills(true);
              setEditObj(rowData);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => {
              dispatch(deleteSkills(rowData._id));
              setSkillflag(true);
            },
          },
        ]}
      />
    </>
  );
};
export default Skills;
