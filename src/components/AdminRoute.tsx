import { Redirect, Route } from "react-router-dom";
import { AuthChecker, roleChecker } from "auth";
import { ROLE_ID } from "helpers";
function AdminRoute({ component: Component, ...restOfProps }: any) {
  if (!AuthChecker()) {
    return (
      <Route {...restOfProps} render={(props) => <Redirect to={"/login"} />} />
    );
  }
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        roleChecker() === ROLE_ID.ADMINISTRADOR ? (
          <Component {...props} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
}

export default AdminRoute;
