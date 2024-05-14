import Guest from "./Guest";

export const GETListOrder = async ({
  user_uuid,
  status,
}: {
  user_uuid?: string;
  status?: string;
}) => {
  try {
    const fetching = await Guest.get(
      `${import.meta.env.VITE_GET_ORDER_END_POINT}`,
      {
        params: {
          user_uuid,
          status,
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

export const GETDetailOrder = async ({ uuid }: { uuid: string }) => {
  try {
    const fetching = await Guest.get(
      `${import.meta.env.VITE_GET_DETAIL_ORDER_END_POINT}/${uuid}`
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

export const POSTCreateOrder = async ({
  orders,
  user,
  shipping,
  payment,
}: {
  orders: {
    detail: { uuid: string; note: string; total: number; price: number };
  }[];
  shipping: {
    uuid: string;
  };
  user: {
    uuid: string;
  };
  payment: {
    method: string;
    provider: string;
    priceTotal: number;
  };
}) => {
  const data = { orders, shipping, user, payment };

  try {
    const fetching = await Guest.post(
      `${import.meta.env.VITE_CREATE_ORDER_END_POINT}`,
      data
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

export const PATCHCancelOrder = async ({ uuid }: { uuid: string }) => {
  try {
    const fetching = await Guest.patch(
      `${import.meta.env.VITE_CANCEL_ORDER_END_POINT}/${uuid}`
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

export const PATCHConfirmOrder = async ({ uuid }: { uuid: string }) => {
  try {
    const fetching = await Guest.patch(
      `${import.meta.env.VITE_CONFIRM_ORDER_END_POINT}/${uuid}`
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

export const PATCHDeliveryOrder = async ({ uuid }: { uuid: string }) => {
  try {
    const fetching = await Guest.patch(
      `${import.meta.env.VITE_DELIVERY_ORDER_END_POINT}/${uuid}`
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

export const PATCHReceivedOrder = async ({ uuid }: { uuid: string }) => {
  try {
    const fetching = await Guest.patch(
      `${import.meta.env.VITE_RECEIVED_ORDER_END_POINT}/${uuid}`
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
