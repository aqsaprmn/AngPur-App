export interface DecodedJwt {
  session: Session;
  user: User;
  sub: string;
  iat: number;
  exp: number;
}

interface User {
  fullName: string;
  username: string;
  activeRole: ActiveRole;
  extraConfigs?: any;
}

interface ActiveRole {
  group: string;
  permission: string[];
}

interface Session {
  device: Device;
  extraConfigs?: any;
}

interface Device {
  id: string;
  type: string;
}
