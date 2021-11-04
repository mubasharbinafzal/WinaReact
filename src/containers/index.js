import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  isUserLoggedIn,
  Get_User_Student,
  Get_Student_Jobs,
  Get_Company_Jobs,
  GetAllNotifications,
  SocketNotifications,
} from "../Redux/actions";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Student from "./Dashboard/Student";
import Company from "./Dashboard/Company";
import Admin from "./Dashboard/Admin";
import UnAuth from "./unAuth";
import Loader from "../components/UI/Loader";
import { user } from "../urlConfig";

function App() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);
  //componentDidMount or componentDidUpdate
  React.useEffect(() => {
    dispatch(isUserLoggedIn()).then(() => {
      if (store.user && store.user.type === "student") {
        dispatch(Get_User_Student());
        dispatch(Get_Student_Jobs());
      } else if (store.user && store.user.type === "company") {
        dispatch(Get_Company_Jobs());
      }
      dispatch(GetAllNotifications());
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    });
  }, [loading]);
  useEffect(() => {
    dispatch(SocketNotifications());
  }, [loading]);
  return (
    <>
      {store.loading && <Loader.AbsoluteLinear />}
      {loading ? (
        <Loader.CenterProgress size={80} />
      ) : store.auth ? (
        store.user.type === "student" ? (
          <Student />
        ) : store.user.type === "company" ? (
          <Company />
        ) : store.user.role === "admin" ? (
          <Admin />
        ) : (
          <UnAuth />
        )
      ) : (
        <UnAuth />
      )}
    </>
  );
}

export default App;
