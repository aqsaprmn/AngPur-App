type EmolumentMetadata = {
  timeInsert: number;
  timeUpdate: number;
  active: boolean;
  trash: boolean;
};

type User = {
  username: string;
  fullName: string;
};

type ActualEmolument = {
  base: number;
  addition: number;
  customByStationMaster: number;
};

type StationMaster = {
  uuid: string;
  user: User;
};

type ScheduleCode = {
  uuid: string;
  code: string;
  duty: boolean;
  firstDuty: boolean;
  lastDuty: boolean;
  scheduleTime: {
    start: string;
    finish: string;
  };
};

type Station = {
  uuid: string;
  name: string;
  code: {
    internal: string;
    external: string;
  };
  location: {
    latitude: string;
    longitude: string;
  };
};

type Schedule = {
  uuid: string;
  scheduleDate: string;
  scheduleCode: ScheduleCode;
  station: Station;
};

type UploadedPhoto = {
  uuid: string;
  date: string;
  pathName: string;
  fileName: string;
};

type CheckInAnalysis = {
  timeGapWithSchedule: number;
};

type CheckOut = {
  actualTime: string;
  notes: string;
  actualLocation: {
    latitude: string;
    longitude: string;
  };
  analysis: CheckInAnalysis;
};

type CheckIn = {
  uuid: string;
  actualTime: string;
  uploadedPhoto: UploadedPhoto;
  actualLocation: {
    latitude: string;
    longitude: string;
  };
  schedule: Schedule;
  analysis: CheckInAnalysis;
  checkout: CheckOut;
};

type SapSubmited = {
  actualTime: string;
  stationMaster: StationMaster;
};

type Emolument = {
  metadata: EmolumentMetadata;
  uuid: string;
  date: string;
  user: User;
  actualEmolument: ActualEmolument;
  sapSubmited: SapSubmited;
  checkin: CheckIn;
};

type ContentEmolument = {
  emolument: Emolument;
};

type ListEmolumntResponse = PaginatedResponse<ContentEmolument>;
