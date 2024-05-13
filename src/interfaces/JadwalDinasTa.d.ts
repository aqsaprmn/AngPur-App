interface JadwalDinasTAPaginationResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: DataJadwalDinasTAPagination;
}

interface DataJadwalDinasTAPagination {
  pageNumber: number;
  pageSize: number;
  totalData: number;
  totalPage: number;
  content: ContentJadwalDinasTAPagination[];
}

export interface ContentJadwalDinasTAPagination {
  scheduleDuty: ScheduleDutyJadwalDinasTAPagination;
}

interface ScheduleDutyJadwalDinasTAPagination {
  date: string;
  crew: CrewJadwalDinasTAPagination;
  scheduleCode: ScheduleCodeJadwalDinasTAPagination;
  schedules: Schedule2JadwalDinasTAPagination[];
}

interface ScheduleCodeJadwalDinasTAPagination {
  timetable: TimetableJadwalDinasTAPagination;
  code: string;
  scheduleTime: ScheduleTimeJadwalDinasTAPagination;
}

interface Schedule2JadwalDinasTAPagination {
  schedule: ScheduleJadwalDinasTAPagination;
}

interface ScheduleJadwalDinasTAPagination {
  name: string;
  location: string;
  hasTimetable: boolean;
  program: ProgramJadwalDinasTAPagination;
  distance: number;
  relation: string;
  serviceNumber: string;
}

interface ProgramJadwalDinasTAPagination {
  departure: string;
  arrival: string;
}

interface ScheduleTimeJadwalDinasTAPagination {
  start: string;
  end: string;
  analysis: AnalysisJadwalDinasTAPagination;
}

interface AnalysisJadwalDinasTAPagination {
  totalTimeInTrain: string;
  totalScheduleTime: string;
}

interface TimetableJadwalDinasTAPagination {
  uuid: string;
  name: string;
}

interface CrewJadwalDinasTAPagination {
  username: string;
  fullname: string;
}
