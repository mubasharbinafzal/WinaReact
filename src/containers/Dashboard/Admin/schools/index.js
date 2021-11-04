import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import {
  listOfAppointment,
  deleteAppointment,
} from "../../../../Redux/actions";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    objectFit: "cover",
  },
  Link: {
    textDecoration: "none",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > *": {
      margin: "0 5px",
    },
  },
});

export default function Schools() {
  const classes = useStyles();
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [userflag, setUserflag] = useState(false);
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.admin);
  function tableData() {
    let data = [];
    jobs &&
      jobs.map((key, index) => {
        data.push({
          _id: key._id,
          position: key.position,
          description: key.description,
          ageRange: key.ageRange,
          domain: key.domain,
        });
        return data;
      });
    setData(data);
  }
  useEffect(() => {
    dispatch(listOfJobs());
    setUserflag(false);
  }, [userflag]);

  useEffect(() => {
    tableData();
  }, [jobs]);
  return (
    <>
      <MaterialTable
        columns={[
          { title: "position", field: "position" },
          { title: "Domain", field: "domain" },
          { title: "Description", field: "description" },
          { title: "Age Range", field: "ageRange" },
        ]}
        data={data}
        title="Jobs"
        options={{
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => {
              dispatch(deleteAppointment(rowData._id));
              setUserflag(true);
            },
          },
        ]}
      />
    </>
  );
}
