interface Metadata {
  timeInsert: number;
  timeUpdate: number;
  active: boolean;
  trash: boolean;
}

interface User {
  username: string;
  fullName: string;
}

interface Code {
  internal: string;
  external: string;
}

interface Stations {
  uuid: string;
  name: string;
  code: Code;
}

interface EffectiveDate {
  startFrom: string;
  endAt: string;
}

interface StationMaster {
  metadata: Metadata;
  uuid: string;
  user: User;
  stations: Stations;
  effectiveDate: EffectiveDate;
}

interface HeadStationSo {
  stationMaster: StationMaster;
}
