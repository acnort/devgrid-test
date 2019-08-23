import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Home, Report } from "./pages";
import { Template } from "./components";

const Routes = () => (
  <Router>
    <Template>
      <Switch>
        <Route path="/" exact={true} component={Home} />
        <Route path="/report" exact={true} component={Report} />
      </Switch>
    </Template>
  </Router>
);

export default Routes;
