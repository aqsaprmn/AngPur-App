import { MainCustomButton } from "@app/components/Buttons";
// import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import { permissionFullExtractor } from "@app/utils/Processor";
import { Box, CircularProgress, Tab } from "@mui/material";
import dayjs from "dayjs";

// import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
// import { POSTAktivasiTimetable } from "@app/Services/Timetable/timetableApiList";
// import UploadTrainset from "@app/pages/Occ/Duty/Timetable/modules/Dialog/UploadTrainset";
import { GETListHariBesarNasional } from "@app/Services/HariBesarNasional/HariBesarNasionalApiList";
import { HariBesarListResponseType } from "@app/interfaces/HariBesarNasional";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { DateCalendar, PickersDay, PickersDayProps } from "@mui/x-date-pickers";
import { isSameDay } from "date-fns";
import CreatePublicHoliday from "./Create/CreatePublicHoliday";
// import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";

const PublicHolidayList = () => {
  // const [currentSize, setCurrentSize] = useState<number>(10);
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [totalPage, setTotalPage] = useState<number>(10);
  // const [totalData, setTotalData] = useState<number>(10);
  // const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const today = new Date().toLocaleDateString("id-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const splitInit = today.split("/");

  const dateInit = `${splitInit[2]}-${splitInit[1]}-${splitInit[0]}`;

  const [currentDate, setCurrentDate] = useState<string>(dateInit);
  // const [anchorEl] = useState<HTMLButtonElement | null>(null);
  // const [rows, setRows] = useState<any[]>([
  //   {
  //     id: 0,
  //     no: 1,
  //     date: "1 Januari 2024",
  //     description: "Tahun Baru 2024",
  //     dutyPoint: 5,
  //   },
  //   {
  //     id: 1,
  //     no: 2,
  //     date: "17 Agustus 2024",
  //     description: "Hari Kemerdekaan Indonesia",
  //     dutyPoint: 10,
  //   },
  // ]);
  const [createHBN, setCreateHBN] = useState<boolean>(false);
  const [highlightedDays, setHighlightedDays] = useState<Date[]>([
    new Date("2024-02-01"),
    new Date("2024-02-02"),
    new Date("2024-02-21"),
    new Date("2024-01-01"),
    new Date("2024-05-02"),
    new Date("2024-07-21"),
    new Date("2024-11-10"),
    new Date("2024-12-31"),
    new Date("2024-08-21"),
  ]);
  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

  // const columns: GridColDef[] = [
  //   {
  //     field: "id",
  //     headerName: "ID",
  //     align: "left",
  //     headerAlign: "left",
  //     flex: 1,
  //   },
  //   {
  //     field: "no",
  //     headerName: "No",
  //     align: "left",
  //     headerAlign: "left",
  //     flex: 1,
  //   },
  //   {
  //     field: "date",
  //     headerName: "Tanggal",
  //     align: "left",
  //     headerAlign: "left",
  //     flex: 1,
  //   },
  //   {
  //     field: "description",
  //     headerName: "Keterangan",
  //     align: "left",
  //     headerAlign: "left",
  //     flex: 1,
  //   },
  //   {
  //     field: "dutyPoint",
  //     headerName: "Poin Emolumen Dinas",
  //     align: "left",
  //     headerAlign: "left",
  //     flex: 1,
  //   },
  // ];

  const fetchData = async () => {
    // setLoadingTable(true);
    setLoading(true);
    try {
      const fetching = await GETListHariBesarNasional({
        // pageNumber: currentPage,
        pageSize: 370,
        sortOrder: "desc",
      });

      const result = fetching.data as HariBesarListResponseType;

      const process = result.data.content.map((item) => {
        return new Date(item.holiday.date);
      });

      // setRows(
      //   process.map(() => {
      //     return {
      //       date: process,
      //       id: Math.floor(Math.random() * 1000000),
      //     };
      //   })
      // );
      setHighlightedDays(process);
      // setTotalPage(result.data.totalPage);
      // setTotalData(result.data.totalData);
    } catch (error) {
      console.log(error);
    } finally {
      // setLoadingTable(false);
      setLoading(false);
    }
  };

  const [tabValue, setTabValue] = useState<number>(1);

  const CustomDay = (props: PickersDayProps<Date>) => {
    // console.log(JSON.stringify(props));
    const matchedStyles = highlightedDays.reduce((a, v) => {
      const date = new Date(props.day);
      return isSameDay(date, v) ? { backgroundColor: "#FF0000" } : a;
    }, {});

    const newProps: PickersDayProps<Date> = {
      ...props,
      onDoubleClick: (e) => {
        if (
          permissionFullExtractor({
            env: import.meta.env.VITE_ALLOWED_CREATE_PUBLIC_HOLIDAY,
          })
        ) {
          const target = e.target as HTMLTextAreaElement;
          const dataDate = target.getAttribute("data-timestamp") as string;
          const goCurrentDate = new Date(parseInt(dataDate)).toLocaleDateString(
            "id-ID",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }
          );

          const split = goCurrentDate.split("/");
          const goo = `${split[2]}-${split[1]}-${split[0]}`;

          setCurrentDate(goo);

          setCreateHBN(true);
        }
      },
    };

    return (
      <PickersDay
        {...newProps}
        sx={{
          ...matchedStyles,
        }}
      />
    );
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading == false)
    return (
      <div>
        <div className="mb-3 flex items-center justify-between md:flex-col">
          <span className="text-lg font-semibold">Hari Besar Nasional</span>
          <div className="flex items-center gap-2">
            <div className="flex justify-between gap-2 md:flex-col">
              {permissionFullExtractor({
                env: import.meta.env.VITE_ALLOWED_CREATE_PUBLIC_HOLIDAY,
              }) && (
                <MainCustomButton
                  onClick={() => {
                    setCreateHBN(true);
                  }}
                >
                  Buat HBN
                </MainCustomButton>
              )}
            </div>
          </div>
        </div>

        <div>
          <TabContext value={tabValue.toString()}>
            <TabList
              onChange={(_e, newValue) => {
                setTabValue(Number(newValue));
              }}
            >
              <Tab label="Calendar" value={"1"}></Tab>
              {/* <Tab label="Table" value={"2"}></Tab> */}
            </TabList>
            <TabPanel value="1">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  position: "relative",
                  overflowX: "auto",
                }}
              >
                <div>
                  <div>Januari {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-01-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
                <div>
                  <div>Februari {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-02-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
                <div>
                  <div>Maret {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-03-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
                <div>
                  <div>April {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-04-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  position: "relative",
                  overflowX: "auto",
                }}
              >
                <div>
                  <div>Mei {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-05-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
                <div>
                  <div>Juni {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-06-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
                <div>
                  <div>Juli {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-07-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
                <div>
                  <div>Agustus {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-08-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  p: 1,
                  m: 1,
                  bgcolor: "background.paper",
                  borderRadius: 1,
                  position: "relative",
                  overflowX: "auto",
                }}
              >
                <div>
                  <div>September {new Date().getFullYear()}</div>
                  <DateCalendar
                    //
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-09-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
                <div>
                  <div>Oktober {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-10-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
                <div>
                  <div>November {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-11-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
                <div>
                  <div>Desember {new Date().getFullYear()}</div>
                  <DateCalendar
                    openTo="day"
                    views={["day", "month", "year"]}
                    shouldDisableDate={(e) =>
                      highlightedDays.some((i) => i === new Date(e))
                    }
                    value={null}
                    defaultValue={null}
                    referenceDate={dayjs("2024-12-17") as unknown as Date}
                    // views={['year', 'month', 'day']}
                    slots={{
                      calendarHeader: () => null,
                      day: CustomDay,
                    }}
                  />
                </div>
              </Box>
            </TabPanel>
            <TabPanel value="2">
              {/* <CustomTableQuickFiltered
                key={currentSize}
                props={{
                  hidden: !permissionFullExtractor({
                    env: import.meta.env.VITE_ALLOWED_CREATE_PUBLIC_HOLIDAY,
                  }),
                  rows,
                  withParams: true,
                  columns,
                  currentPage,
                  currentSize,
                  totalData,
                  disableColumnMenu: true,
                  totalPage,
                  pageSizeOptions: [10, 25, 50, 100],
                  columnVisibilityModel: {
                    id: false,
                    ID: false,
                    dutyPoint: permissionFullExtractor({
                      env: import.meta.env.VITE_ALLOWED_CREATE_PUBLIC_HOLIDAY,
                    }),
                  },
                  initialState: {
                    pagination: {
                      paginationModel: {
                        pageSize: currentSize,
                        page: currentPage,
                      },
                    },
                  },
                  loading: loadingTable,
                  // onPageSizeChange: (e) => {
                  //   setCurrentPage(1);
                  //   setCurrentSize(e?.target.value as number);
                  // },
                  // onPageChange: (_v, p) => {
                  //   setCurrentPage(p as number);
                  // },
                }}
              /> */}
            </TabPanel>
          </TabContext>
        </div>

        {/* CREATE PUBLIC HOLIDAY */}
        <CreatePublicHoliday
          refetch={fetchData}
          selectedDay={currentDate}
          open={createHBN}
          onClose={() => setCreateHBN(false)}
        />
      </div>
    );
  else return <CircularProgress />;
};

export default PublicHolidayList;
