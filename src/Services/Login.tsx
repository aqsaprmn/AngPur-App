import axios from "axios";

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

    const res = await fetching.data;

    return res;
  } catch (e) {
    return e;
  }
};
