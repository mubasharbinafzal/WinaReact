import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../Signin";
import Signup from "../Signup";
import Home from "../Home";

export default function UnAuth() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/reset/:id" component={Home} />
      <Route path="/verifyEmail/:token" component={Home} />

      <Redirect from="*" to="/" />
    </Switch>
  );
}
