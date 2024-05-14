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

export const GETDetailShipping = async ({ uuid }: { uuid: string }) => {
  try {
    const fetching = await Guest.get(
      `${import.meta.env.VITE_GET_DETAIL_SHIPPING_END_POINT}/${uuid}`
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

export const POSTCreateShipping = async ({
  user_uuid,
  address,
  number,
  rt,
  rw,
  village,
  district,
  city,
  province,
  postalCode,
}: {
  user_uuid: string;
  address: string;
  number: string;
  rt: string;
  rw: string;
  village: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
}) => {
  const data = {
    user_uuid,
    address,
    number,
    rt,
    rw,
    village,
    district,
    city,
    province,
    postalCode,
  };

  try {
    const fetching = await Guest.post(
      `${import.meta.env.VITE_CREATE_SHIPPING_END_POINT}`,
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

export const PATCHEditShipping = async ({
  uuid,
  address,
  number,
  rt,
  rw,
  village,
  district,
  city,
  province,
  postalCode,
  active,
}: {
  uuid: string;
  address: string;
  number: string;
  rt: string;
  rw: string;
  village: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  active: string;
}) => {
  const data = {
    address,
    number,
    rt,
    rw,
    village,
    district,
    city,
    province,
    postalCode,
    active,
  };

  try {
    const fetching = await Guest.patch(
      `${import.meta.env.VITE_EDIT_SHIPPING_END_POINT}/${uuid}`,
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

export const DELETEShipping = async ({ uuid }: { uuid: string }) => {
  try {
    const fetching = await Guest.delete(
      `${import.meta.env.VITE_GET_SHIPPING_END_POINT}/${uuid}`
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
