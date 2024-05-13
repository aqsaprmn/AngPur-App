import Guest from "./Guest";

export const GETListShipping = async ({ user_uuid }: { user_uuid: string }) => {
  try {
    const fetching = await Guest.get(
      `${import.meta.env.VITE_GET_SHIPPING_END_POINT}`,
      {
        params: {
          user_uuid,
        },
      }
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
