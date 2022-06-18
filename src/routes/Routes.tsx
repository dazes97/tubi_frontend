import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminRoute,
  ProtectedRoute,
  CompanyOwnerRoute,
  PersonalRoute,
} from "components";
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
  Branch,
  Request,
  Quote,
} from "pages";
const RoutesPage = () => (
  <BrowserRouter>
    <Routes>
      <Route path={PAGE.LOGIN.URL} element={<Login />} />
      <Route path={PAGE.NOT_FOUND.URL} element={<ErrorPage />} />
      <Route
        path={PAGE.INDEX.URL}
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path={PAGE.REQUEST.INDEX.URL}
        element={
          <PersonalRoute>
            <Request />
          </PersonalRoute>
        }
      />
      <Route
        path={PAGE.QUOTE.INDEX.URL}
        element={
          <PersonalRoute>
            <Quote />
          </PersonalRoute>
        }
      />
      <Route
        path={PAGE.PERSONAL_TYPE.INDEX.URL}
        element={
          <AdminRoute>
            <PersonalType />
          </AdminRoute>
        }
      />
      <Route
        path={PAGE.COMPANY_OWNER.INDEX.URL}
        element={
          <AdminRoute>
            <CompanyOwner />
          </AdminRoute>
        }
      />
      <Route
        path={PAGE.COMPANY.INDEX.URL}
        element={
          <AdminRoute>
            <Company />
          </AdminRoute>
        }
      />
      <Route
        path={PAGE.PERSONAL.INDEX.URL}
        element={
          <CompanyOwnerRoute>
            <Personal />
          </CompanyOwnerRoute>
        }
      />
      <Route
        path={PAGE.SERVICE.INDEX.URL}
        element={
          <CompanyOwnerRoute>
            <Service />
          </CompanyOwnerRoute>
        }
      />
      <Route
        path={PAGE.PACKAGE.INDEX.URL}
        element={
          <CompanyOwnerRoute>
            <Package />
          </CompanyOwnerRoute>
        }
      />
      <Route
        path={PAGE.BRANCH.INDEX.URL}
        element={
          <CompanyOwnerRoute>
            <Branch />
          </CompanyOwnerRoute>
        }
      />

      {/* <ProtectedRoute
        exact
        path={PAGE.INDEX.URL}
        component={Dashboard}
      ></ProtectedRoute> */}
      {/* <PersonalRoute
        exact
        path={PAGE.REQUEST.INDEX.URL}
        component={Request}
      ></PersonalRoute> */}
      {/* <PersonalRoute
        exact
        path={PAGE.QUOTE.INDEX.URL}
        component={Quote}
      ></PersonalRoute> */}
      {/* <AdminRoute
        exact
        path={PAGE.PERSONAL_TYPE.INDEX.URL}
        component={PersonalType}
      ></AdminRoute> */}
      {/* <AdminRoute
        exact
        path={PAGE.COMPANY_OWNER.INDEX.URL}
        component={CompanyOwner}
      ></AdminRoute> */}
      {/* <AdminRoute
        exact
        path={PAGE.COMPANY.INDEX.URL}
        component={Company}
      ></AdminRoute> */}
      {/* <CompanyOwnerRoute
        exact
        path={PAGE.PERSONAL.INDEX.URL}
        component={Personal}
      ></CompanyOwnerRoute> */}
      {/* <CompanyOwnerRoute
        exact
        path={PAGE.SERVICE.INDEX.URL}
        component={Service}
      ></CompanyOwnerRoute> */}
      {/* <CompanyOwnerRoute
        exact
        path={PAGE.PACKAGE.INDEX.URL}
        component={Package}
      ></CompanyOwnerRoute> */}
      {/* <CompanyOwnerRoute
        exact
        path={PAGE.BRANCH.INDEX.URL}
        component={Branch}
      ></CompanyOwnerRoute> */}
    </Routes>
  </BrowserRouter>
);

export default RoutesPage;
