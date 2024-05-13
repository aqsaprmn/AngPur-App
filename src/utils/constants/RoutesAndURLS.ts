export const BASE_URL = {
  base_50166:
    process.env.NODE_ENV === "production"
      // ? "https://dev.lrtosis.com:51166"
      ? "https://lrtosis.com:51110"
      : "/teeareport",
  base_50206:
    process.env.NODE_ENV === "production"
      // ? "https://dev.lrtosis.com:50206"
      ? "https://lrtosis.com:51131"
      : "/esoreport",
  base_wad:
    process.env.NODE_ENV === "production"
      ? "https://dev.lrtosis.com:61001"
      : "https://mock.apidog.com",    
};
