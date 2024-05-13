type Metadata = {
  timeInsert: number;
  timeUpdate: number;
  active: boolean;
  trash: boolean;
};

type User = {
  username: string;
  fullName: string;
};

type ProgramTime = {
  departure: string;
  arrival: string;
};

type Timetable = {
  kaNumber: {
    trainNumber: number;
    tripNumber: number;
  };
};

type ScheduleTime = {
  start: string;
  end: string;
  analysis: {
    totalTimeInTrain: string;
    totalScheduleTime: string;
  };
};

type ScheduleCode = {
  code: string;
  scheduleTime: ScheduleTime;
};

type Schedule = {
  uuid: string;
  scheduleDate: string;
  user: User;
  scheduleCode: ScheduleCode;
};

type Result = {
  isDone: boolean;
  result: string;
};

type Assessment = {
  medical: Result;
  supervisor: Result;
  finalResult: boolean;
};

type Presence = {
  crew: { username: string; fullname: string };
  date: string;
  isPresent: boolean;
  scheduleCode: {
    code: string;
    scheduleTime: {
      start: string;
      end: string;
      analysis: {
        totalTimeInTrain: string;
        totalScheduleTime: string;
      };
    };
  };
  statusAssessment: string;
  assessment?: Assessment;
};

type ListAttendContent = {
  presence: Presence;
};

type ListAttendResponse = PaginatedResponse<ListAttendContent>;
