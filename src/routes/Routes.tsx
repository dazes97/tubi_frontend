import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProtectedRoute from "components/ProtectedRoute";
import { PAGE } from "helpers";
import { Login, Dashboard, PersonalType, ErrorPage, Personal } from "pages";
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={PAGE.LOGIN.URL} component={Login}></Route>
      <ProtectedRoute
        exact
        path={PAGE.INDEX.URL}
        component={Dashboard}
      ></ProtectedRoute>
      <ProtectedRoute
        exact
        path={PAGE.PERSONAL_TYPE.INDEX.URL}
        component={PersonalType}
      ></ProtectedRoute>
      <ProtectedRoute
        exact
        path={PAGE.PERSONAL.INDEX.URL}
        component={Personal}
      ></ProtectedRoute>
      <Route component={ErrorPage}></Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
