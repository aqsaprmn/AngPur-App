import User from "./Instance";

export const GETAllUsers = async ({ pageSize }: { pageSize: number }) => {
  try {
    const fetching = await User.get(`${import.meta.env.VITE_GET_LIST_USER}`, {
      params: {
        pageSize,
      },
    });

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

export const GETDetailUser = async ({ username }: { username: string }) => {
  try {
    const fetching = await User.get(
      `${import.meta.env.VITE_GET_DETAIL_USER}/${username}`
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

export const POSTCreateUser = async ({
  version,
  user,
}: {
  version: string;
  user: {
    username: string;
    password: string;
    fullName: string;
    extraConfigs: [
      {
        key: string;
        value: string;
      }
    ];
    roles: [
      {
        group: string;
        permission: string[];
        isDefault: boolean;
      }
    ];
  };
}) => {
  try {
    const fetching = await User.post(
      `${import.meta.env.VITE_GET_DETAIL_USER}`,
      {
        body: {
          version,
          user,
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
