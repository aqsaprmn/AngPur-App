import Guest from "./Guest";

export const GETListProduct = async () => {
  try {
    const fetching = await Guest.get(
      `${import.meta.env.VITE_GET_PRODUCT_END_POINT}`
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
