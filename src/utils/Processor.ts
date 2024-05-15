import { DecodedJwt } from "@app/interfaces/JwtDecoded";
import { default as jwtDecode, default as jwt_decode } from "jwt-decode";
import { getJwtCookie } from "./constants/cookieHandler";
import { Route } from "./constants/types";

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

export function removeHidden(arr: any[]): Route[] {
  return arr.filter((e) => {
    return e.isHidden == false;
  });
}
