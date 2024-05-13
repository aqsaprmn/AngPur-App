import Library from "./Library";

export const GETListChecklistAspect = async ({
  pageNumber = 1,
  pageSize = 10,
  sortBy = "",
  sortOrder = "desc",
  title,
  name,
}: {
  pageSize: number;
  pageNumber: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  title?: string;
  name?: string;
}) => {
  try {
    const fetching = await Library.get(
      `${
        import.meta.env.VITE_LIBRARY_SERVICE_CHECKLIST_ASPECT_GET_LIST_END_POINT
      }`,
      {
        params: {
          pageNumber,
          pageSize,
          sortBy,
          sortOrder,
          title,
          name,
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

export const POSTCreateChecklistAspect = async ({
  version,
  aspect,
}: {
  version: string;
  aspect: {
    title: string;
    name: string;
    description: string;
    indicator: {
      positive: string;
      negative: string;
    };
    group: string[];
  };
}) => {
  const body = {
    version,
    aspect,
  };

  try {
    const fetching = await Library.post(
      `${
        import.meta.env.VITE_LIBRARY_SERVICE_CHECKLIST_ASPECT_CREATE_END_POINT
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
