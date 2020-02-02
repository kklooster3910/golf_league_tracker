import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import { Route } from "react-router";

import HomePage from "./home/home_page";
import NavBar from "./navbar/navbar";
import Course from "./course";

import "./reset.scss";
import "./global.scss";

const App = () => (
  <>
    <NavBar />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/course/:courseId" component={Course} />
    </Switch>
  </>
);

export default App;
