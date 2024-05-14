import {
  GETListKepalaStasiun,
  GETListKepalaStasiunAll,
} from "@app/Services/DTA/KepalaStasiun/kepalaStasiunApiList";
import { GETListStation } from "@app/Services/DTA/StationManagement/StationManagementApiList";
import { TableAccordion } from "@app/components/Accordion/AccordionTable";
import { PaginationPageSize } from "@app/components/Accordion/PaginationPageSize";
import {
  MainCustomButton,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import {
  KepalaStasiunListResponseType,
  StationListResponseType,
} from "@app/utils/constants/types";
import { useMapStore } from "@app/zustand/Maps/maps";
import {
  CircularProgress,
  InputAdornment,
  OutlinedInput,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import DeleteStationConfirmation from "./modules/DeleteStationConfirmation";
import HistoryListStationAssign from "./modules/HistoryListStationAssign";
import CreateChief from "./modules/PerKepalaStasiun/CreateChief";
import CreatePerChiefAssign from "./modules/PerKepalaStasiun/CreatePerChiefAssign";
import EditPerChiefAssign from "./modules/PerKepalaStasiun/EditPerChiefAssign";
import ViewPerChiefAssign from "./modules/PerKepalaStasiun/ViewPerChiefAssign";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";

const AssignChiefToStationADMIN = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleReset } = useMapStore();
  const [deleteDataConfirmation, setDeleteDataConfirmation] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState(10);
  const [totalPage, setTotalPage] = useState(10);
  const [totalData, setTotalData] = useState(1);
  const [uuidSearchQuery, setUuidSearchQuery] = useState("");
  // const [apiResult, setApiResult] = useState<any>();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmScreenOrLower = useMediaQuery(theme.breakpoints.down("md"));
  const [stationList, setStationList] = useState<StationListResponseType>({
    message: "",
    data: {
      content: [],
      pageNumber: 1,
      pageSize: 1,
      totalData: 1,
      totalPages: 1,
    },
    success: false,
    timestamp: 0,
    version: "",
  });
  const [historyDialog, setHistoryDialog] = useState<boolean>(false);
  const [createAssign, setCreateAssign] = useState<boolean>(false);
  const [createChief, setCreateChief] = useState<boolean>(false);
  const [viewAssigned, setViewAssigned] = useState<boolean>(false);
  const [editAssigned, setEditAssigned] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);

  const [selectedData] = useState<{
    username: string;
    fullName: string;
  }>({
    username: "",
    fullName: "",
  });

  const columnFixVal: any = {
    align: "center",
    headerAlign: "center",
  };

  const column: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      ...columnFixVal,
      field: "no",
      headerName: "No",
      flex: 0.5,
    },
    {
      ...columnFixVal,
      field: "nipp",
      headerName: "NIPP",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "stationChiefName",
      headerName: "Nama kepala stasiun",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "stationAmount",
      headerName: "JML Stasiun",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "listOfStation",
      headerName: "Stasiun yang dikepalai",
      flex: 1,
    },
    // {
    //   ...columnFixVal,
    //   field: "action",
    //   headerName: "",
    //   flex: 1,
    //   renderCell: (params) => {
    //     return (
    //       <div className="flex gap-2">
    //         <IconButton
    //           size="small"
    //           sx={{
    //             backgroundColor: "#F3F6F9",
    //             borderRadius: "5px",
    //           }}
    //           onClick={() => {
    //             setViewAssigned(true);
    //           }}
    //         >
    //           <AiFillEye className="text-cyan-800" />
    //         </IconButton>
    //         <IconButton
    //           size="small"
    //           sx={{
    //             backgroundColor: "#F3F6F9",
    //             borderRadius: "5px",
    //           }}
    //           onMouseEnter={() => {
    //             setSelectedData({
    //               username: params.row.nipp,
    //               fullName: params.row.stationChiefName,
    //             });
    //           }}
    //           onClick={() => {
    //             setCreateAssign(true);
    //           }}
    //         >
    //           <BiLogIn className="text-cyan-800" />
    //         </IconButton>
    //         <IconButton
    //           size="small"
    //           sx={{
    //             backgroundColor: "#F3F6F9",
    //             borderRadius: "5px",
    //           }}
    //           onClick={() => {
    //             setEditAssigned(true);
    //           }}
    //         >
    //           <BiPencil className="text-cyan-800" />
    //         </IconButton>
    //         <IconButton
    //           size="small"
    //           sx={{
    //             backgroundColor: "#F3F6F9",
    //             borderRadius: "5px",
    //           }}
    //           onClick={() => setHistoryDialog(true)}
    //         >
    //           <BiHistory className="text-cyan-800" />
    //         </IconButton>
    //         <IconButton
    //           size="small"
    //           sx={{
    //             backgroundColor: "#F3F6F9",
    //             borderRadius: "5px",
    //           }}
    //           onClick={() => {
    //             setDeleteDataConfirmation(true);
    //           }}
    //         >
    //           <BsTrash className="text-red-500" />
    //         </IconButton>
    //       </div>
    //     );
    //   },
    // },
  ];

  const fetchDataChiefUsers = async () => {
    try {
      const res = await GETListKepalaStasiunAll();
      const resData = res.data.data.content;
      setData(resData);
    } catch (error: any) {
      throw new error();
    }
  };

  const fetchDataSecond = async () => {
    handleReset();
    // console.log(uuidSearchQuery);
    try {
      const fetching = await GETListKepalaStasiun({
        params: {
          pageSize: currentSize,
          pageNumber: currentPage,
          sortOrder: "desc",
        },
      });

      const result = fetching.data as KepalaStasiunListResponseType;

      setTotalPage(result.data.totalPages);

      const process = result.data.content.map((item, index) => {
        return {
          id: item.uuid,
          no: index + 1,
          nipp: item.user.username,
          stationChiefName: item.user.fullName,
          stationAmount: 1,
          listOfStation: item.stations.name,
          test: item,
        };
      });

      setRows(process);
      setTotalPage(result.data.totalPages);
      setTotalData(result.data.totalData);
      //   }
    } catch (error: any) {
      throw new error();
    } finally {
      setLoading(false);
    }
  };

  const fetchDataStationList = async () => {
    try {
      const fetching = await GETListStation({
        pageSize: 50,
      });

      const result = fetching.data as StationListResponseType;

      setStationList(result);
    } catch (error: any) {
      throw new error();
    }
  };
  useEffect(() => {
    fetchDataChiefUsers();
  }, []);
  useEffect(() => {
    // fetchData();
    fetchDataSecond();
  }, [currentPage, currentSize, uuidSearchQuery]);

  useMemo(() => {
    fetchDataStationList();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );

  // console.log({ isSmScreenOrLower });
  return (
    <div>
      <div className="flex justify-between mb-3">
        <span className="text-xl font-bold">Kepala Stasiun</span>
        <MainCustomButton onClick={() => setCreateChief(true)}>
          Buat Kepala Stasiun
        </MainCustomButton>
      </div>
      <div className="">
        {isSmScreenOrLower ? (
          <>
            <OutlinedInput
              id="password"
              name="password"
              size="small"
              startAdornment={
                <InputAdornment position="start">
                  <RiSearchLine />
                </InputAdornment>
              }
              className="bg-transparent text-sm h-12"
              sx={{
                borderRadius: "13px",
                fontSize: "12px",
                minWidth: "15rem",
                marginBottom: "1rem",
              }}
              placeholder="Cari"
              onChange={(e) => setUuidSearchQuery(e.target.value)}
            />
            {rows.slice(0, currentSize).map((item, index) => (
              <TableAccordion
                itemTitle={column}
                index={index}
                item={item}
                key={index}
                title={item.companyName}
                actionComponent={
                  <div className="w-full">
                    <MainCustomOutlinedButton
                      props={{
                        children: t("approval"),
                        fullWidth: true,
                        onClick: () => {
                          localStorage.setItem("idTanggalDaily", item.idDaily);
                          navigate(
                            `/duty/sc/approval-permit-to-access/consent/${item.id}`
                          );
                        },
                      }}
                    />
                  </div>
                }
              />
            ))}
            <PaginationPageSize
              pageSizeOption={[10, 25, 50, 100]}
              currentPage={currentPage}
              currentSize={currentSize}
              onPageChange={(_e: any, p: any) => {
                // console.log(e);
                setCurrentPage(p);
              }}
              onPageSizeChange={(e: any) => {
                setCurrentPage(1);
                setCurrentSize(e.target.value);
              }}
              totalPage={totalPage}
            />
          </>
        ) : (
          <CustomTableQuickFiltered
            key={currentSize}
            props={{
              loading,
              totalPage: totalPage,
              withParams: true,
              rows: rows,
              columns: column,
              currentPage: currentPage,
              currentSize: currentSize,
              totalData,
              pageSizeOptions: [10, 25, 50, 100],
              onPageSizeChange: (e) => {
                setCurrentPage(1);
                setCurrentSize(e?.target.value as number);
              },
              onPageChange: (_e, v) => {
                setCurrentPage(v as number);
                // console.log(e);
              },
              searchQuery: (e: any) => {
                setTimeout(() => {
                  setUuidSearchQuery(e.target.value);
                }, 500);
              },
              initialState: {
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
              },
            }}
          />
        )}
      </div>

      {/* DELETE CONFIRMATION DIALOG */}
      <DeleteStationConfirmation
        open={deleteDataConfirmation}
        onClose={() => setDeleteDataConfirmation(false)}
        onConfirm={() => setDeleteDataConfirmation(false)}
      />

      {/* HISTORY DIALOG */}
      <HistoryListStationAssign
        open={historyDialog}
        onClose={() => setHistoryDialog(false)}
      />

      {/* ASSIGN KEPALA STASIUN */}
      <CreateChief
        refetch={fetchDataSecond}
        chiefData={data}
        open={createChief}
        onClose={() => setCreateChief(false)}
        stationData={stationList}
      />
      <CreatePerChiefAssign
        chiefData={selectedData}
        open={createAssign}
        onClose={() => setCreateAssign(false)}
        stationData={stationList}
      />

      {/* VIEW ASSIGNED KEPALA STASIUN */}
      <ViewPerChiefAssign
        open={viewAssigned}
        onClose={() => setViewAssigned(false)}
      />

      {/* EDIT ASSIGNED */}
      <EditPerChiefAssign
        open={editAssigned}
        onClose={() => setEditAssigned(false)}
        onConfirm={() => {
          setEditAssigned(false);
        }}
      />
    </div>
  );
};

export default AssignChiefToStationADMIN;
