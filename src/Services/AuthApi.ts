import axios from "axios";
import Cookies from "js-cookie";
import { useLogoutQueryV2 } from "./AuthV2Api";

export const UseRefreshTokenQuery = async () => {
  const token = await Cookies.get("token_jwt");
  try {
    const newToken = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/v1/refresh`,
      {
        token,
      }
    );

    const res = newToken.data;
    // console.log(newToken);
    if (newToken.status > 199 && newToken.status < 300) {
      Cookies.set("token_jwt", res.token);
      return true;
    }

    if (newToken.status == 401 || newToken.status == 403) {
      return handleLogOut();
    }
  } catch (e: any) {
    if (e?.response?.status == 401 || e?.response?.status == 403) {
      handleLogOut();
    }
  }
};

export const useLogoutQuery = async () => {
  const token = await Cookies.get("token_jwt");
  const fetching = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/v1/logout`,
    {
      token,
    }
  );

  if (fetching.data.result === "success") {
    return true;
  }

  return false;
};

export const handleLogOut = async () => {
  try {
    await useLogoutQueryV2().catch((e) => console.log(e));
    await localStorage.removeItem("auth");
    Object.keys(Cookies.get()).forEach((cookie) => {
      Cookies.remove(cookie);
    });
    window.location.href = "/";
  } catch (error) {
    throw new Error(error as string);
  }
};
