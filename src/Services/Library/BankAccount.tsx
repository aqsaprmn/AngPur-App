import Library from "./Library";

export const GETListBankAccount = async ({
  pageNumber = 1,
  pageSize = 10,
  sortBy = "",
  sortOrder = "desc",
}: {
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  try {
    const fetching = await Library.get(
      `${import.meta.env.VITE_LIBRARY_SERVICE_BANK_ACCOUNT_GET_LIST_END_POINT}`,
      {
        params: {
          pageNumber,
          pageSize,
          sortBy,
          sortOrder,
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

export const POSTCreateBankAccount = async ({
  version,
  bankAccount,
}: {
  version: string;
  bankAccount: {
    user: {
      username: string;
    };
    bank: {
      name: string;
      account: string;
    };
  };
}) => {
  const body = {
    version,
    bankAccount,
  };

  try {
    const fetching = await Library.post(
      `${import.meta.env.VITE_LIBRARY_SERVICE_BANK_ACCOUNT_CREATE_END_POINT}`,
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

export const DELETEBankAccount = async ({
  version = "2.0.0",
  bankAccount,
}: {
  version: string;
  bankAccount: {
    uuid: string;
  };
}) => {
  try {
    const fetching = await Library.delete(
      `${import.meta.env.VITE_LIBRARY_SERVICE_BANK_ACCOUNT_DELETE_END_POINT}`,
      {
        data: {
          version,
          bankAccount,
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
