import ProductInstance from "./Instance";

export const GETListProduct = async () => {
  try {
    const fetching = await ProductInstance.get(
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

export const GETDetailProduct = async ({ uuid }: { uuid: string }) => {
  try {
    const fetching = await ProductInstance.get(
      `${import.meta.env.VITE_GET_DETAIL_PRODUCT_END_POINT}/${uuid}`
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

export const POSTCreateProduct = async ({
  body,
}: {
  body: {
    name: string;
    description: string;
    stock: number;
    price: number;
    image: any;
  };
}) => {
  try {
    const fetching = await ProductInstance.post(
      `${import.meta.env.VITE_CREATE_PRODUCT_END_POINT}`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const PATCHEditProduct = async ({
  body,
}: {
  body: {
    uuid: string;
    name: string;
    description: string;
    stock: number;
    price: number;
    image?: any;
    _method?: string;
  };
}) => {
  try {
    const uuid = body.uuid;

    body._method = "PATCH";

    const fetching = await ProductInstance.post(
      `${import.meta.env.VITE_EDIT_PRODUCT_END_POINT}/${uuid}`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const DELETEProduct = async ({ uuid }: { uuid: string }) => {
  try {
    const fetching = await ProductInstance.delete(
      `${import.meta.env.VITE_DELETE_PRODUCT_END_POINT}/${uuid}`
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
