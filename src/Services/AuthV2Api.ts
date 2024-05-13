import { getJwtCookie } from "@app/utils/constants/cookieHandler";
import axios from "axios";
import Cookies from "js-cookie";
import { handleLogOut } from "./AuthApi";

export const UseRefreshTokenQueryV2 = async () => {
  try {
    const newToken = await axios.post(
      `${import.meta.env.VITE_BASE_URL}${
        import.meta.env.VITE_LOGIN_SERVICE_REFRESH_END_POINT
      }`,
      {},
      {
        headers: {
          Authorization: `Bearer ${getJwtCookie()}`,
        },
      }
    );

    const res = newToken.data;

    if (newToken.status > 199 && newToken.status < 300) {
      Cookies.set("token", res.data.access_token);
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

export const useLogoutQueryV2 = async () => {
  const fetching = await axios.post(
    `${import.meta.env.VITE_BASE_URL}${
      import.meta.env.VITE_LOGIN_SERVICE_LOGOUT_END_POINT
    }`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getJwtCookie()}`,
      },
    }
  );

  if (fetching.data.success) {
    return true;
  }

  return false;
};
