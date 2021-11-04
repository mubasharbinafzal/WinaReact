import React, { useEffect, useState, Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import { listOfCompany, deleteCompany } from "../../../../Redux/actions";
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

export default function Companies() {
  const classes = useStyles();
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [userflag, setUserflag] = useState(false);
  const dispatch = useDispatch();
  const Companies = useSelector((state) => state.admin.Company);
  function tableData() {
    let data = [];
    Companies &&
      Companies.map((key, index) => {
        data.push({
          _id: key._id,
          name: key.name,
          company_type: key.company_type,
          siretNumber: key.siretNumber,
          groupName: key.groupName,
        });
        return data;
      });
    setData(data);
  }
  useEffect(() => {
    dispatch(listOfCompany());
    setUserflag(false);
  }, [userflag]);

  useEffect(() => {
    tableData();
  }, [Companies]);
  return (
    <>
      <MaterialTable
        columns={[
          { title: "Name", field: "name" },
          { title: "Type", field: "company_type" },
          { title: "siret Number", field: "siretNumber" },
          { title: "groupName", field: "groupName" },
        ]}
        data={data}
        title="Companies"
        options={{
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete",
            onClick: (event, rowData) => {
              dispatch(deleteCompany(rowData._id));
              setUserflag(true);
            },
          },
        ]}
      />
    </>
  );
}
