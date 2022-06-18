import { Navigate } from "react-router-dom";
import { AuthChecker, roleChecker } from "auth";
import { ROLE_ID } from "helpers";
import { URL } from "services";
function CompanyOwnerRoute({ children }: any) {
  if (!AuthChecker()) {
    return <Navigate to={URL.AUTH.LOGIN} />;
  }
  return roleChecker() === ROLE_ID.PROPIETARIO ? (
    children
  ) : (
    <Navigate to={"/login"} />
  );
}
export default CompanyOwnerRoute;
