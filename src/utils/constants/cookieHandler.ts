import Cookies from "js-cookie";

export const getJwtCookie = () => {
  return Cookies.get("token");
};
