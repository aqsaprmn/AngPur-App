import { useAuthStore } from "@app/zustand/Auth/auth";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const LoginRoute = () => {
  const auth = useAuthStore((state) => state);

  const isLoggedin =
    "token" in Cookies.get() && Cookies.get("token") !== "undefined";
  auth.name.length > 1 && auth.role.length > 1 && auth.initialRoute.length > 1
    ? true
    : false;
  return isLoggedin ? <Navigate to={auth.initialRoute} /> : <Outlet />;
};

export default LoginRoute;
