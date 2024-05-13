export interface Data {
  [key: string]: any;
}

export type roleObject = {
  group_name: string;
  roles: {
    role_name: string;
    selected: boolean;
    permissions: {
      permission_name: string;
      status: boolean;
    }[];
  }[];
  isDefault: boolean;
};

export interface StationDetailResponseType {
  version?: string;
  timestamp?: number;
  success?: boolean;
  message?: string;
  data?: {
    station: {
      metadata: {
        timeInsert: number;
        timeUpdate: number;
        active: boolean;
        trash: boolean;
      };
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
      operationHour: {
        openTime: string;
        closeTime: string;
        effectiveDate: {
          startFrom: string;
          endAt: string | null | undefined;
        };
      }[];
    };
  };
  station: {
    metadata: {
      timeInsert: number;
      timeUpdate: number;
      active: boolean;
      trash: boolean;
    };
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
    operationHour: {
      openTime: string;
      closeTime: string;
      effectiveDate: {
        startFrom: string;
        endAt: string | null | undefined;
      };
    }[];
  };
}

export interface StationListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPages: number;
    content: {
      station: {
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
        operationHour: {
          openTime: string;
          closeTime: string;
          effectiveDate: {
            startFrom: string;
            endAt: string;
          };
        }[];
      };
    }[];
  };
}

// export interface KodeDinasDetailResponseType {
//   version: string;
//   timestamp: number;
//   success: boolean;
//   message: string;
//   data: {
//     scheduleCode: {
//       metadata: {
//         timeInsert: number;
//         timeUpdate: number;
//         active: boolean;
//         trash: boolean;
//       };
//       uuid: string;
//       code: string;
//       duty: boolean;
//       firstDuty: boolean;
//       lastDuty: boolean;
//       scheduleTime: {
//         start: string;
//         finish: string;
//       };
//       emolument: {
//         base: number;
//         addition: number;
//       };
//     };
//   };
// }

export interface KodeDinasanListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPages: number;
    content: {
      scheduleCode: {
        metadata: {
          timeInsert: number;
          timeUpdate: number;
          active: boolean;
          trash: boolean;
        };
        uuid: string;
        code: string;
        duty: boolean;
        firstDuty: boolean;
        lastDuty: boolean;
        scheduleTime: {
          start: string;
          finish: string;
        };
        emolument: {
          base: number;
          addition: number;
        };
      };
    }[];
  };
}

export interface JadwalSODetailResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    schedule: {
      metadata: {
        timeInsert: number;
        timeUpdate: number;
        active: boolean;
        trash: boolean;
      };
      uuid: string;
      scheduleDate: string;
      user: {
        username: string;
        fullName: string;
      };
      scheduleCode: {
        uuid: string;
        code: string;
        duty: boolean;
        firstDuty: boolean;
        lastDuty: boolean;
        scheduleTime: {
          start: string;
          finish: string;
        };
        emolument: {
          base: number;
          addition: number;
        };
      };
      station: {
        uuid: string;
        name: string;
        code: {
          internal: string;
          external: string;
        };
        location: {
          longitude: string;
          latitude: string;
        };
      };
    };
  };
}

interface ScheduleData {
  pageNumber: number;
  pageSize: number;
  totalData: number;
  totalPage: number;
  content: {
    schedule: {
      metadata: {
        timeInsert: number;
        timeUpdate: number;
        active: boolean;
        trash: boolean;
      };
      uuid: string;
      scheduleDate: string;
      user: {
        username: string;
        fullName: string;
      };
      scheduleCode: {
        uuid: string;
        code: string;
        duty: boolean;
        firstDuty: boolean;
        lastDuty: boolean;
        scheduleTime: {
          start: string;
          finish: string;
        };
        emolument: {
          base: number;
          addition: number;
        };
      };
      station: {
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
    };
  }[];
}

export interface JadwalSOListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: ScheduleData;
}

export interface TemplateData {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
}

export interface KepalaStasiunDetailResponseType extends TemplateData {
  data: {
    stationMaster: {
      metadata: {
        timeInsert: number;
        timeUpdate: number;
        active: boolean;
        trash: boolean;
      };
      uuid: string;
      user: {
        username: string;
        fullName: string;
      };
      stations: {
        station: {
          uuid: string;
          name: string;
          code: {
            internal: string;
            external: string;
          };
          location: {
            longitude: string;
            latitude: string;
          };
          operationHour: {
            openTime: string;
            closeTime: string;
            effectiveDate: {
              startFrom: string;
              endAt: string;
            };
          }[];
        };
      }[];
    };
  };
}

export interface Device {
  id: string;
  type: string;
}

export interface ActiveRole {
  group: string;
  permission: string[];
}

export interface User {
  fullName: string;
  username: string;
  activeRole: ActiveRole;
  extraConfigs: any; // You may replace 'any' with a more specific type if applicable
}

export interface TokenPayload {
  device: Device;
  extraConfigs: null | any; // You may replace 'any' with a more specific type if applicable
  user: User;
  sub: string;
  iat: number;
  exp: number;
}

// KODE DINASAN
export interface ScheduleCode {
  timeInsert: number;
  timeUpdate: number;
  active: boolean;
  trash: boolean;
}

export interface ScheduleTime {
  start: string;
  finish: string;
}

export interface Emolument {
  base: number;
  addition: number;
}

export interface Schedule {
  scheduleCode: ScheduleCode;
  uuid: string;
  duty: boolean;
  firstDuty: boolean;
  lastDuty: null; // Assuming lastDuty can be null
  code: string;
  scheduleTime: ScheduleTime;
  emolument: Emolument;
}

export interface DataKodeDinasan {
  pageNumber: number;
  pageSize: number;
  totalData: number;
  totalPages: number;
  content: Schedule[];
}

export interface KodeDinasDetailResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: DataKodeDinasan;
}

export interface JadwalDinasListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPage: number;
    content: {
      schedule: {
        metadata: {
          timeInsert: number;
          timeUpdate: number;
          active: boolean;
          trash: boolean;
        };
        uuid: string;
        scheduleDate: string;
        user: {
          username: string;
          fullName: string;
        };
        scheduleCode: {
          uuid: string;
          code: string;
          duty: boolean;
          firstDuty: boolean;
          lastDuty: boolean;
          scheduleTime: {
            start: string;
            finish: string;
          };
          emolument: {
            base: number;
            addition: number;
          };
        };
        station: {
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
      };
    }[];
  };
}

export interface KepalaStasiunListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPages: number;
    content: {
      metadata: {
        timeInsert: number;
        timeUpdate: number;
        active: boolean;
        trash: boolean;
      };
      uuid: string;
      stations: {
        code: {
          internal: string;
          external: string;
        };
        name: string;
        id: string;
      };
      user: {
        username: string;
        fullName: string;
      };
      effectiveDate: {
        startFrom: string;
        endAt: string;
      };
    }[];
  };
}

export interface EmolumentListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPage: number;
    content: Array<{
      emolument: {
        metadata: {
          timeInsert: number;
          timeUpdate: number;
          active: boolean;
          trash: boolean;
        };
        uuid: string;
        date: string;
        user: {
          username: string;
          fullName: string;
        };
        actualEmolument: {
          base: number;
          addition: number;
          customByStationMaster: number;
        };
        sapSubmited: {
          actualTime: string;
          stationMaster: {
            uuid: string;
            user: {
              username: string;
              fullName: string;
            };
          };
        };
        checkin: {
          uuid: string;
          actualTime: string;
          uploadedPhoto: {
            uuid: string;
            date: string;
            pathName: string;
            fileName: string;
          };
          actualLocation: {
            latitude: string;
            longitude: string;
          };
          schedule: {
            uuid: string;
            scheduleDate: string;
            scheduleCode: {
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
            station: {
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
          };
          analysis: {
            timeGapWithSchedule: number;
          };
          checkout: {
            actualTime: string;
            notes: string;
            actualLocation: {
              latitude: string;
              longitude: string;
            };
            analysis: {
              timeGapWithSchedule: number;
            };
          };
        };
      };
    }>;
  };
}

export interface EmolumentDetailDataResponseType {
  emolument: {
    metadata: {
      timeInsert: number;
      timeUpdate: number;
      active: boolean;
      trash: boolean;
    };
    uuid: string;
    date: string;
    user: {
      username: string;
      fullName: string;
    };
    actualEmolument: {
      base: number;
      addition: number;
      customByStationMaster: number;
    };
    sapSubmited: {
      actualTime: string;
      stationMaster: {
        uuid: string;
        user: {
          username: string;
          fullName: string;
        };
      };
    };
    checkin: {
      uuid: string;
      actualTime: string;
      uploadedPhoto: {
        uuid: string;
        date: string;
        pathName: string;
        fileName: string;
      };
      actualLocation: {
        latitude: string;
        longitude: string;
      };
      schedule: {
        uuid: string;
        scheduleDate: string;
        scheduleCode: {
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
        station: {
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
      };
      analysis: {
        timeGapWithSchedule: number;
      };
      checkout: {
        uuid: string;
        actualTime: string;
        notes: string;
        actualLocation: {
          latitude: string;
          longitude: string;
        };
        analysis: {
          timeGapWithSchedule: number;
        };
      };
    };
  };
}

export interface TimetableListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPage: number;
    content: [
      {
        timetable: {
          metadata: {
            timeInsert: number;
            timeUpdate: number;
            active: boolean;
            trash: boolean;
          };
          uuid: string;
          name: string;
        };
      }
    ];
  };
}

export interface TimetableDetailResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPage: number;
    content: [
      {
        timetable: {
          kaNumber: {
            trainNumber: number;
            tripNumber: number;
          };
          stationTrack: {
            departure: {
              shunting: boolean;
              time: {
                arrival: string;
                departure: string;
                dwell: number;
              };
              station: {
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
            };
            destination: {
              shunting: boolean;
              time: {
                arrival: string;
                departure: string;
                dwell: number;
              };
              station: {
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
            };
          };
        };
      }
    ];
  };
}

export interface ReportListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPage: number;
    content: Array<{
      reportTrainset: {
        date: string;
        totalReport: {
          totalSo: number;
          totalTso: number;
          totalTsgo: number;
          totalTrainset: number;
        };
      };
    }>;
  };
}

export interface ReportDetailResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    reportTrainsets: Array<{
      reportTrainset: {
        trainset: {
          uuid: string;
          name: string;
          code: string;
        };
        report: {
          status: string;
          description: string;
        };
      };
    }>;
  };
}

export interface OperasiTrainsetListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPage: number;
    content: Array<{
      operatedTrainset: {
        metadata: {
          timeInsert: number;
          timeUpdate: number;
          active: boolean;
          trash: boolean;
        };
        uuid: string;
        date: string;
        trainset: {
          uuid: string;
          name: string;
          code: string;
        };
        kaNumber: {
          trainNumber: number;
          tripNumber: number;
        };
        timetables: Array<{
          timetable: {
            uuid: string;
            name: string;
            stationTrack: {
              departure: {
                shunting: boolean;
                time: {
                  arrival: string;
                  departure: string;
                  dwell: number;
                };
                station: {
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
              };
              destination: {
                shunting: boolean;
                time: {
                  arrival: string;
                  departure: string;
                  dwell: number;
                };
                station: {
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
              };
            };
          };
        }>;
      };
    }>;
  };
}

export interface KodeDinasPenyeliaListResponseType {
  version: string;
  timestamp: number;
  success: boolean;
  message: string;
  data: {
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPage: number;
    content: {
      scheduleCode: {
        metadata: {
          timeInsert: number;
          timeUpdate: number;
          active: boolean;
          trash: boolean;
        };
        uuid: string;
        code: string;
        toTimetableName: string;
        hasTimetable: boolean;
        schedules: {
          name: string;
          description: string | null;
          programTime: {
            departure: string | null;
            arrival: string | null;
          };
          timetable?: {
            kaNumber: {
              trainNumber: number;
              tripNumber: number;
            };
          };
        }[];
        scheduleTime: {
          start: string;
          end: string;
          analysis: {
            totalTimeInTrain?: string | null;
            totalScheduleTime: string;
          };
        };
      };
    }[];
  };
}

export type currentUser = {
  session: {
    device: {
      id: string;
      type: string;
    };
    extraConfigs: null;
  };
  user: {
    fullName: string;
    username: string;
    activeRole: {
      group: string;
      permission: string[];
    };
    extraConfigs: null;
  };
  sub: string;
  iat: number;
  exp: number;
};

export interface ListTimetableV1ResponseType {
  result: string;
  data: {
    total: number;
    content: Array<{
      _id: string;
      uuid: string;
      timestamp: number;
      petugasInput: {
        nipp: string;
        fullName: string;
        group: string;
        _id: string;
      };
      status: string;
      namaJadwal: string;
      jadwal: Array<{
        stasiunAwal: {
          lokasi: {
            latitude: string;
            longitude: string;
          };
          kode: string;
          stasiun: string;
          waktuKedatangan: string;
          waktuKeberangkatan: string;
          dwellTime: number;
        };
        stasiunTujuan: {
          lokasi: {
            latitude: string;
            longitude: string;
          };
          kode: string;
          stasiun: string;
          waktuKedatangan: string;
          waktuKeberangkatan: string;
          dwellTime: number;
        };
        tripNumber: number;
        nomorKa: number;
        jarakStasiun: string;
        _id: string;
      }>;
      __v: number;
    }>;
    pageNumber: number;
    pageSize: number;
    totalData: number;
    totalPage: number;
  };
}

export interface DetailTimetableV1ResponseType {
  draw: null;
  recordsTotal: number;
  recordsFiltered: number;
  data: Array<{
    _id: string;
    uuid: string;
    timestamp: number;
    petugasInput: {
      nipp: string;
      fullName: string;
      group: string;
      _id: string;
    };
    status: string;
    namaJadwal: string;
    jadwal: {
      tripNumber: number;
      nomorKa: number;
      stasiunAwal: {
        kode: string;
        stasiun: string;
        lokasi: {
          latitude: string;
          longitude: string;
        };
        waktuKedatangan: string;
        waktuKeberangkatan: string;
        dwellTime: number;
      };
      stasiunTujuan: {
        kode: string;
        stasiun: string;
        lokasi: {
          latitude: string;
          longitude: string;
        };
        waktuKedatangan: string;
        waktuKeberangkatan: string;
        dwellTime: number;
      };
      jarakStasiun: string;
      _id: string;
    };
    __v: number;
  }>;
  totalData: number;
  totalPage: number;
}

export interface ListTimetableV2ResponseType {
  content: {
    timetable: {
      metadata: Metadata;
      name: string;
      status: boolean;
      uuid: string;
    };
  }[];
  pageNumber: number;
  pageSize: number;
  totalData: number;
  totalPage: number;
}

export interface DetailTimetableV2ResponseType {
  content: {
    timetable: {
      metadata: Metadata;
      details: {
        detail: {
          kaNumber: {
            name: string;
            trainNumber: number;
            tripNumber: number;
          };
          metadata: Metadata;
          stationTrack: {
            arrival: {
              shunting: boolean;
              station: {
                code: {
                  internal: string;
                  external: string;
                };
                location: {
                  latitude: number;
                  longitude: number;
                };
                name: string;
                uuid: string;
              };
              time: {
                arrival: string;
                departure: string;
                dwell: number;
              };
            };
            departure: {
              shunting: boolean;
              station: {
                code: {
                  internal: string;
                  external: string;
                };
                location: {
                  latitude: number;
                  longitude: number;
                };
                name: string;
                uuid: string;
              };
              time: {
                arrival: string;
                departure: string;
                dwell: number;
              };
            };
            stationDistance: number;
          };
          timetable: {
            name: string;
            uuid: string;
          };
          uuid: string;
          version: string;
          __v: number;
          _id: string;
        };
      }[];
    };
  }[];
  pageNumber: number;
  pageSize: number;
  totalData: number;
  totalPage: number;
}

export interface Route {
  id?: number;
  title: string;
  icon?: JSX.Element;
  controls?: string;
  route: string;
  expanded?: boolean;
  translationKey: string;
  children: Route[];
  isHidden: boolean;
}
