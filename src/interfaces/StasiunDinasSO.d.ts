interface Metadata {
  timeInsert: number;
  timeUpdate: number;
  active: boolean;
  trash: boolean;
}

interface Code {
  internal: string;
  external: string;
}

interface Location {
  latitude: string;
  longitude: string;
}

interface EffectiveDate {
  startFrom: string;
  endAt: string;
}

interface OperationHour {
  openTime: string;
  closeTime: string;
  effectiveDate: EffectiveDate;
}

interface Station {
  metadata: Metadata;
  uuid: string;
  name: string;
  code: Code;
  location: Location;
  operationHour: OperationHour[];
}

interface StationDinas {
  station: Station;
}
