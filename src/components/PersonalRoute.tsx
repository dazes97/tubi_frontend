import { Redirect, Route } from "react-router-dom";
import { AuthChecker, roleChecker } from "auth";
import { URL } from "services";
import { ROLE_ID } from "helpers";
function PersonalRoute({ component: Component, ...restOfProps }: any) {
  if (!AuthChecker()) {
    return (
      <Route {...restOfProps} render={() => <Redirect to={URL.AUTH.LOGIN} />} />
    );
  }
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        roleChecker() === ROLE_ID.ASISTENTE ? (
          <Component {...props} />
        ) : (
          <Redirect to={URL.AUTH.LOGIN} />
        )
      }
    />
  );
}

export default PersonalRoute;
