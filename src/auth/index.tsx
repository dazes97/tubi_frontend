import API from "../services/Api";
import { URL } from "../services/ApiUrl";
export const AuthChecker = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  const parsedToken = JSON.parse(token);
  const expirationDateTime = new Date(parsedToken.expires_at);
  const rightNow = new Date(Date.now());
  if (rightNow.getTime() > expirationDateTime.getTime()) {
    return false;
  }
  return true;
};
export const AuthLogin = async (dataForm: any) => {
  const { data } = await API.POST(URL.AUTH.LOGIN, dataForm);
  if (data?.token) {
    AuhSetLoginInfo(data);
    return true;
  }
  return false;
};
export const AuhSetLoginInfo = (data: any) => {
  const { user, token } = data;
  localStorage.setItem("token", JSON.stringify(token));
  localStorage.setItem("user", JSON.stringify(user));
};

export const AuthLogout = async () => {
  const { data } = await API.POST(URL.AUTH.LOGOUT, {});
  const { revoked } = data;
  if (revoked) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }
  return false;
};
