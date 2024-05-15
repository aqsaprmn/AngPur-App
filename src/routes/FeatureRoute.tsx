import { useAuthStore } from "@app/zustand/Auth/auth";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const FeatureRoute = () => {
  const auth = useAuthStore((state) => state);
  const isLoggedin =
    "token" in Cookies.get() &&
    auth.name.length > 1 &&
    auth.role.length > 1 &&
    auth.initialRoute.length > 0
      ? true
      : false;

  return isLoggedin ? <Outlet /> : <Navigate to={auth.initialRoute} />;
};

export default FeatureRoute;
