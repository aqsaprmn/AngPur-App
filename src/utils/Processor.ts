import { DecodedJwt } from "@app/interfaces/JwtDecoded";
import { GridRowModel } from "@mui/x-data-grid";
import { default as jwtDecode, default as jwt_decode } from "jwt-decode";
import { getJwtCookie } from "./constants/cookieHandler";
import { Route } from "./constants/types";
import { useAuthStore } from "@app/zustand/Auth/auth";

export async function decodeJwt(jwtToken: string): Promise<DecodedJwt> {
  return await jwt_decode(jwtToken);
}

export const fetchStatus = (status: number) => {
  switch (true) {
    case status > 199 && status < 300:
      return "success";
    case status > 299 && status < 400:
      return "redirection";
    case status > 399 && status < 400:
      return "error";
    case status > 499:
      return "error";
  }
};

export const processRowUpdateV2 = (
  newRow: GridRowModel,
  setStateToChange: any,
  stateToChange: any
) => {
  const updatedRow = { ...newRow, isNew: false };
  setStateToChange(
    stateToChange.map((row: any) => (row.id === newRow.id ? updatedRow : row))
  );
  return updatedRow;
};

export const convertPrice = (price: number) => {
  return Intl.NumberFormat("id", {
    currency: "IDR",
    style: "currency",
  }).format(price);
};

export const permissionExtractor = ({ env }: { env: string }): boolean => {
  let currentPermission = (jwtDecode(getJwtCookie() as string) as any).user
    .activeRole.permission as string[];
  let envData: string[] = [];
  if (env.includes(",")) {
    envData = env.split(",");
  } else {
    envData = [env];
  }

  const intersection = envData.some((role) => currentPermission.includes(role));
  return intersection;
};

export const permissionExtractorMultipe = ({
  envList,
}: {
  envList: string[];
}): boolean => {
  const permissionExtractorArr = envList.map((i) =>
    permissionExtractor({ env: i })
  );

  return permissionExtractorArr.some((e) => e == true);
};

export const roleExtractor = ({ env }: { env: string }): boolean => {
  try {
    let currentRole = (jwtDecode(getJwtCookie() as string) as any).user
      .activeRole.group as string;
    let envData: string[] = [];
    if (env.includes(",")) {
      envData = env.split(",");
    } else {
      envData = [env];
    }

    const intersection = envData.some((role) => role === currentRole);
    return intersection;
  } catch (error) {
    return false;
  }
};

export function findUpdatedKeys(oldObject: any, newObject: any): string[] {
  const updatedKeys: string[] = [];

  function compareObjects(obj1: any, obj2: any, path: string = "") {
    for (const key in obj1) {
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof obj1[key] === "object" && obj1[key] !== null) {
        compareObjects(obj1[key], obj2[key], currentPath);
      } else {
        if (obj1[key] !== obj2[key]) {
          updatedKeys.push(currentPath);
        }
      }
    }
  }

  compareObjects(oldObject, newObject);

  return updatedKeys;
}

export const permissionFullExtractor = ({
  env,
  role,
}: {
  env: string;
  role: string;
}) => {
  if (
    window.location.pathname === "/login" ||
    window.location.pathname === "/register" ||
    window.location.pathname === "/" ||
    window.location.pathname === "/admin/login"
  ) {
    return false;
  }

  let envData: string[] = [];
  if (env.includes(",")) envData = env.split(",");
  else envData = [env];

  if (envData.includes(role)) {
    return true;
  }

  return false;
};

export function processorMenuData(arr: any[], arrayToPush: any[]) {
  arr.map((obj: any) => {
    const currentInNewArr = arrayToPush.find((e) => e.title === obj.title);
    if (!currentInNewArr) {
      return arrayToPush.push({
        ...obj,
        children: obj.children.map((tst: any) => {
          return {
            ...tst,
            isHidden: false,
          };
        }),
        isHidden: false,
      });
    } else {
      obj.children.map((child: any) => {
        if (
          !currentInNewArr.children.some(
            (chld: any) => chld.route === child.route
          )
        ) {
          const thisIndex = arrayToPush.findIndex(
            (test) => test.route === currentInNewArr.route
          );
          arrayToPush[thisIndex] = {
            ...arrayToPush[thisIndex],
            children: [
              ...arrayToPush[thisIndex].children,
              {
                ...child,
                isHidden: false,
              },
            ],
            isHidden: false,
          };
        }
      });
    }
  });
}

export function removeHidden(arr: any[]): Route[] {
  return arr.filter((e) => {
    return e.isHidden == false;
  });
}
