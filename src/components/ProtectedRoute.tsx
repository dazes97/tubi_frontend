import React from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthChecker } from "../auth/";
function ProtectedRoute({ component: Component, ...restOfProps }: any) {
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        AuthChecker() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
