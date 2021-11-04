import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Switch, Route, Redirect, NavLink, useHistory } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleOutlineIcon from "@material-ui/icons/PeopleOutline";
import WorkIcon from "@material-ui/icons/Work";
import BusinessIcon from "@material-ui/icons/Business";
import SchoolIcon from "@material-ui/icons/School";
import PersonIcon from "@material-ui/icons/Person";

import Users from "../Admin/Users";
import skills from "../Admin/skills";
import Jobs from "../Admin/jobs";
import companies from "../Admin/Companies";
import appointments from "../Admin/appointments";
import ConsultantStudent from "../Admin/ConsultantStudent";
import ConsultantCompany from "./ConsultantCompany";
import { getUser, signout } from "../../../Redux/actions";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "#4DA1FF",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    height: "100vh",
    width: "100vw",
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));

const routes = [
  {
    name: "Users",
    path: "/users",
    icon: <PeopleOutlineIcon />,
  },
  {
    name: "Companies",
    path: "/companies",
    icon: <BusinessIcon />,
  },
  {
    name: "Jobs",
    path: "/jobs",
    icon: <WorkIcon />,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <BusinessIcon />,
  },
  {
    name: "Consultant Student",
    path: "/consultantStudent",
    icon: <SchoolIcon />,
  },
  {
    name: "Consultant Company",
    path: "/consultantCompany",
    icon: <SchoolIcon />,
  },
  {
    name: "Skills",
    path: "/skills",
    icon: <PersonIcon />,
  },
];

const Profile = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // eslint-disable-next-line
  }, [store]);
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Admin Panel
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(signout());
              history.push("/");
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {routes.map((route) => (
              <ListItem
                button
                key={route.name}
                component={NavLink}
                to={route.path}
                selected={""}
              >
                <ListItemIcon>{route.icon}</ListItemIcon>
                <ListItemText primary={route.name} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Switch>
          <Route exact path={`/users`} component={Users} />
          <Route exact path={`/skills`} component={skills} />
          <Route exact path={`/Jobs`} component={Jobs} />
          <Route exact path={`/companies`} component={companies} />
          <Route exact path={`/appointments`} component={appointments} />
          <Route
            exact
            path={`/consultantStudent`}
            component={ConsultantStudent}
          />
          <Route
            exact
            path={`/consultantCompany`}
            component={ConsultantCompany}
          />
          <Redirect from="*" to={"/users"} />
        </Switch>
      </main>
    </div>
  );
};

export default Profile;
