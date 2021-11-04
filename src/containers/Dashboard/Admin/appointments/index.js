import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import {
  listOfAppointment,
  deleteAppointment,
} from "../../../../Redux/actions";
import moment from "moment";
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

export default function Appointments() {
  const classes = useStyles();
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [userflag, setUserflag] = useState(false);
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.admin.Appointments);

  function tableData() {
    let data = [];
    appointments &&
      appointments.map((key, index) => {
        let dateTime = moment(key.timmings).format("DD,MM,YYYY , h:mm:ss");
        data.push({
          _id: key._id,
          timmings: dateTime,
          status: key.status,
          name: key.company.name,
          company_type: key.company.company_type,
        });
        return data;
      });
    setData(data);
  }
  useEffect(() => {
    dispatch(listOfAppointment());
    setUserflag(false);
  }, [userflag]);

  useEffect(() => {
    tableData();
  }, [appointments]);
  return (
    <>
      <MaterialTable
        columns={[
          { title: "Company Name", field: "name" },
          { title: "Type", field: "company_type" },
          { title: "Timmings", field: "timmings" },
          { title: "Status", field: "status" },
        ]}
        data={data}
        title="Appointments"
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
