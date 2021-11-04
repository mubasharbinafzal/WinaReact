import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import StudentDashboard from "./Student";
import OfferCardDetail from "./OfferCardDetail";

export default function UnAuth() {
  return (
    <Switch>
      <Route exact path="/" exact component={StudentDashboard} />
      <Route exact path="/jobDesc" exact component={OfferCardDetail} />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
