type BasicTotal = {
  totalTime: string;
  totalDistance: number;
};

type Analysis = {
  expected: BasicTotal;
  actual: BasicTotal;
};

type BasicKMPremi = {
  code: string;
  base: number;
  addition: number;
  distance: number;
  totalDistance: number;
  total: number;
};

type CalculatedPremi = {
  expected: BasicKMPremi;
  actual: BasicKMPremi;
  edited: BasicKMPremi;
};

type Photo = {
  uuid: string;
  filename: string;
  path: string;
};

type CheckIn = {
  time: string;
  photo: Photo;
};

type CheckOut = {
  time: string;
  description: string;
};

type Crew = {
  uuid: string;
  username: string;
  fullname: string;
};

type ScheduleCode = {
  code: string;
  scheduleTime: {
    start: string;
    end: string;
  };
};

type PremiDetail = {
  metadata: Metadata;
  crew: Crew;
  date: string;
  sapSubmited: boolean;
  uuid: string;
  analysis: Analysis;
  calculatedPremi: CalculatedPremi;
  checkin: CheckIn | null;
  checkout: CheckOut | null;
  scheduleCode: ScheduleCode;
};

type Premi = {
  premi: PremiDetail;
};
