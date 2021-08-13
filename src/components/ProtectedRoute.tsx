import { Redirect, Route } from "react-router-dom";
import { AuthChecker } from "auth";
import {URL} from 'services'
function ProtectedRoute({ component: Component, ...restOfProps }: any) {
  return (
    <Route
      {...restOfProps}
      render={(props) =>
        AuthChecker() ? <Component {...props} /> : <Redirect to={URL.AUTH.LOGIN} />
      }
    />
  );
}

export default ProtectedRoute;
