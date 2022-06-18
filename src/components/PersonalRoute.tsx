import { Navigate } from "react-router-dom";
import { AuthChecker, roleChecker } from "auth";
import { URL } from "services";
import { ROLE_ID } from "helpers";
function PersonalRoute({ children }: any) {
  if (!AuthChecker()) {
    return <Navigate to={URL.AUTH.LOGIN} />;
  }
  return roleChecker() === ROLE_ID.ASISTENTE ? (
    children
  ) : (
    <Navigate to={URL.AUTH.LOGIN} />
  );
}
export default PersonalRoute;
