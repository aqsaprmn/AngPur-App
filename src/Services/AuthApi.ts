import Cookies from "js-cookie";
import { useLogoutQueryV2 } from "./AuthV2Api";

export const handleLogOut = async () => {
  try {
    await useLogoutQueryV2().catch((e) => console.log(e));
    await localStorage.removeItem("auth");
    await localStorage.removeItem("cart");
    Object.keys(Cookies.get()).forEach((cookie) => {
      Cookies.remove(cookie);
    });
    window.location.href = "/";
  } catch (error) {
    throw new Error(error as string);
  }
};
