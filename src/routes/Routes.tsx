import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AdminRoute, ProtectedRoute, CompanyOwnerRoute } from "components";
import { PAGE } from "helpers";
import {
  Login,
  Dashboard,
  PersonalType,
  ErrorPage,
  Personal,
  Company,
  CompanyOwner,
  Service,
  Package,
} from "pages";
const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={PAGE.LOGIN.URL} component={Login}></Route>
      <ProtectedRoute
        exact
        path={PAGE.INDEX.URL}
        component={Dashboard}
      ></ProtectedRoute>
      <AdminRoute
        exact
        path={PAGE.PERSONAL_TYPE.INDEX.URL}
        component={PersonalType}
      ></AdminRoute>
      <AdminRoute
        exact
        path={PAGE.COMPANY_OWNER.INDEX.URL}
        component={CompanyOwner}
      ></AdminRoute>
      <CompanyOwnerRoute
        exact
        path={PAGE.PERSONAL.INDEX.URL}
        component={Personal}
      ></CompanyOwnerRoute>
      <CompanyOwnerRoute
        exact
        path={PAGE.SERVICE.INDEX.URL}
        component={Service}
      ></CompanyOwnerRoute>
      <CompanyOwnerRoute
        exact
        path={PAGE.PACKAGE.INDEX.URL}
        component={Package}
      ></CompanyOwnerRoute>
      <AdminRoute
        exact
        path={PAGE.COMPANY.INDEX.URL}
        component={Company}
      ></AdminRoute>
      <Route exact path={PAGE.NOT_FOUND.URL} component={ErrorPage}></Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
