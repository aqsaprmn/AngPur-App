import axios from "axios";
import Cookies from "js-cookie";

const UserInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  timeout: 1000 * 60,
  validateStatus: (status) => {
    return status >= 200 && status < 500;
  },
});

UserInstance.interceptors.request.use(async (config) => {
  let tokensData = Cookies.get("token");
  if (tokensData !== undefined) {
    config.headers.Authorization = `Bearer ${tokensData}`;
    return config;
  }
  return config;
});

UserInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    Promise.reject(error);
    axios(error.config);
  }
);

export default UserInstance;
