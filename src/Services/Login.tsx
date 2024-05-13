import axios from "axios";
import Guest from "./Guest";

export const ProcessLoginToken = async ({
  body,
}: {
  body: {
    email: string;
    password: string;
  };
}) => {
  try {
    const fetching = await axios.post(
      `${import.meta.env.VITE_BASE_URL}${
        import.meta.env.VITE_LOGIN_SERVICE_LOGIN_END_POINT
      }`,
      body
    );

    const result = {
      isSuccess: fetching.data.success,
      isError: !fetching.data.success,
      data: fetching.data,
    };

    return result;
  } catch (error) {
    return {
      isSuccess: false,
      isError: true,
      data: error,
    };
  }
};

export const ProcessRegister = async ({
  body,
}: {
  body: {
    email: string;
    name: string;
    phone: string;
    password_confirmation: string;
    password: string;
    role: string;
  };
}) => {
  try {
    const fetching = await Guest.post(
      `${import.meta.env.VITE_LOGIN_SERVICE_REGISTER_END_POINT}`,
      body
    );

    const result = {
      isSuccess: fetching.data.success,
      isError: !fetching.data.success,
      data: fetching.data,
    };

    return result;
  } catch (error) {
    return {
      isSuccess: false,
      isError: true,
      data: error,
    };
  }
};
