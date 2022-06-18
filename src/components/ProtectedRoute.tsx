import { Navigate } from "react-router-dom";
import { AuthChecker } from "auth";
import { URL } from "services";
function ProtectedRoute({ children }: any) {
  return AuthChecker() ? children : <Navigate to={URL.AUTH.LOGIN} />;
}
export default ProtectedRoute;
