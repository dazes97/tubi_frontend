import React from "react";
import { Login, Register, Dashboard, PersonalType, ErrorPage } from "../pages";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Redirect to="/dashboard" />
      </Route>
      <ProtectedRoute
        exact
        path="/dashboard"
        component={Dashboard}
      ></ProtectedRoute>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/register" component={Register}></Route>
      <ProtectedRoute
        exact
        path="/personalType"
        component={PersonalType}
      ></ProtectedRoute>
      <Route component={ErrorPage}></Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
