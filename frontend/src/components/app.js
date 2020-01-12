import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import { Route } from "react-router";

import HomePage from "./home/home_page";

const App = () => (
  <Switch>
    {/* <AuthRoute exact path="/" component={HomePage} /> */}
    <Route exact path="/" component={HomePage} />
    <ProtectedRoute exact path="/welcometothejungle" component={HomePage} />
  </Switch>
);

export default App;
