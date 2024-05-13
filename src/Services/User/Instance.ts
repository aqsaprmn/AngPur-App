import { messaging } from "@app/firebase-config";
import { getJwtCookieV2 } from "@app/utils/constants/cookieHandler";
import axios from "axios";
import { deleteToken } from "firebase/messaging";
import Cookies from "js-cookie";

const TrainService = axios.create({
  baseURL: `${import.meta.env.VITE_USER_MANAGEMENT_SERVICE_BASE_URL}`,
  timeout: 1000 * 60,
  validateStatus: (status) => {
    return status >= 200 && status < 500;
  },
});

TrainService.interceptors.request.use(async (config) => {
  let tokensData = Cookies.get("token_jwt_v2");
  if (tokensData !== undefined) {
    config.headers.Authorization = `Bearer ${tokensData}`;
    return config;
  }
  return config;
});

TrainService.interceptors.response.use(
  (res) => res,
  async (error) => {
    // console.log(error);
    if (error.response.status >= 400) {
      const authData = Cookies.get("token_jwt_v2");
      let apiResponse = await axios.post(
        `${import.meta.env.VITE_LOGIN_SERVICE_BASE_URL}${
          import.meta.env.VITE_LOGIN_SERVICE_REFRESH_END_POINT
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getJwtCookieV2()}`,
          },
        }
      );
      if ((apiResponse as any).status === 401 || apiResponse.status === 403) {
        try {
          await axios.post(
            `${import.meta.env.VITE_LOGIN_SERVICE_BASE_URL}${
              import.meta.env.VITE_LOGIN_SERVICE_LOGOUT_END_POINT
            }`,
            {},
            {
              headers: {
                Authorization: `Bearer ${getJwtCookieV2()}`,
              },
            }
          );
          await localStorage.removeItem("auth");
          Object.keys(Cookies.get()).forEach((cookie) => {
            Cookies.remove(cookie);
          });
          await deleteToken(messaging).catch((e) => console.log(e));
          // window.location.reload();
        } catch (error) {
          throw new Error(error as string);
        }
      }
      Cookies.set("token_jwt_v2", (apiResponse as any).data.token);
      error.config.headers["Authorization"] = `Bearer ${authData}`;
      return axios(error.config);
    } else {
      Promise.reject(error);
      axios(error.config);
    }
  }
);

export default TrainService;
