type Emolument = {
  base: number;
  addition: number;
}

type ScheduleTime = {
  start: string;
  finish: string;
}

type Metadata = {
  timeInsert: number;
  timeUpdate: number;
  active: boolean;
  trash: boolean;
}

type ScheduleCode = {
  metadata: Metadata;
  uuid: string;
  code: string;
  duty: boolean;
  firstDuty: boolean;
  lastDuty: boolean;
  scheduleTime: ScheduleTime;
  emolument: Emolument;
}

type ContentScheduleCode = {
  scheduleCode: ScheduleCode;
}
