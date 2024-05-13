export interface TimetableResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  pageNumber: number;
  pageSize: number;
  totalData: number;
  totalPage: number;
  content: Content[];
}

interface Content {
  timetable: Timetable;
}

interface Timetable {
  uuid: string;
  name: string;
  active: boolean;
  totalTrip: number;
  existingScheduleCode: boolean;
}

interface TimetableDetailResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: Data;
}

interface DataDetail {
  pageNumber: number;
  pageSize: number;
  totalData: number;
  totalPage: number;
  content: Content[];
}

interface Content {
  scheduleCode: ScheduleCode;
}

interface ScheduleCode {
  metadata: Metadata;
  timetable: TimetableDetail;
  code: string;
  scheduleTime: ScheduleTime;
  schedules: Schedule2[];
}

interface Schedule2 {
  schedule: Schedule;
}

interface Schedule {
  name: string;
  location: string;
  hasTimetable: boolean;
  program: Program;
  relation: string;
  serviceNumber: string;
}

interface Program {
  departure: string;
  arrival: string;
}

interface ScheduleTime {
  start: string;
  end: string;
  analysis: Analysis;
}

interface Analysis {
  totalTimeInTrain: string;
  totalScheduleTime: string;
}

interface TimetableDetail {
  uuid: string;
  name: string;
}

interface Metadata {
  timeInsert: number;
  timeUpdate: number;
  active: boolean;
  trash: boolean;
}
