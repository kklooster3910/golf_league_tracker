import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import { Route } from "react-router";

import HomePage from "./home/home_page";
import NavBar from "./navbar/navbar";

import "./reset.scss";

const App = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
    </Switch>
  </>
);

export default App;
