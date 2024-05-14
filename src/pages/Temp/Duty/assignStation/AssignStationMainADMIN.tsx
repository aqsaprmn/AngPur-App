import {
  GETDetailKepalaStasiun,
  GETListKepalaStasiun,
} from "@app/Services/DTA/KepalaStasiun/kepalaStasiunApiList";
import { TableAccordion } from "@app/components/Accordion/AccordionTable";
import { PaginationPageSize } from "@app/components/Accordion/PaginationPageSize";
import {
  MainCustomButton,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import {
  KepalaStasiunDetailResponseType,
  KepalaStasiunListResponseType,
} from "@app/utils/constants/types";
import { useMapStore } from "@app/zustand/Maps/maps";
import {
  CircularProgress,
  IconButton,
  InputAdornment,
  OutlinedInput,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEye } from "react-icons/ai";
import { BiHistory, BiLogIn, BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import CreateAssignKepalaStasiun from "./modules/CreateAssignKepalaStasiun";
import DeleteStationConfirmation from "./modules/DeleteStationConfirmation";
import EditAssignedKepalaStasiun from "./modules/EditAssignedKepalaStasiun";
import HistoryListStationAssign from "./modules/HistoryListStationAssign";
import ViewAssignedKepalaStasiun from "./modules/ViewAssignedKepalaStasiun";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";

const AssignStationMainADMIN = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleReset } = useMapStore();
  const [deleteDataConfirmation, setDeleteDataConfirmation] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState(10);
  const [totalPage, setTotalPage] = useState(10);
  const [uuidSearchQuery, setUuidSearchQuery] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmScreenOrLower = useMediaQuery(theme.breakpoints.down("md"));
  const [historyDialog, setHistoryDialog] = useState<boolean>(false);
  const [createAssign, setCreateAssign] = useState<boolean>(false);
  const [viewAssigned, setViewAssigned] = useState<boolean>(false);
  const [editAssigned, setEditAssigned] = useState<boolean>(false);
  const [soList, setSoList] = useState<KepalaStasiunListResponseType>();
  const [selectedData, setSelectedData] = useState<{
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
  } | null>(null);

  const [currentSelectedData, setCurrentSelectedData] = useState<string>("");

  const [detailData, setDetailData] =
    useState<KepalaStasiunDetailResponseType>();
  console.log(detailData);

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
      field: "stationCodeInt",
      headerName: "KODE STASIUN (INT)",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "stationName",
      headerName: "NAMA STASIUN",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "stationChief",
      headerName: "Kepala Stasiun",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "action",
      headerName: "",
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="flex gap-2">
            <IconButton
              size="small"
              sx={{
                backgroundColor: "#F3F6F9",
                borderRadius: "5px",
              }}
              onClick={() => {
                setCurrentSelectedData(params.row.id);
                setViewAssigned(true);
              }}
            >
              <AiFillEye className="text-cyan-800" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "#F3F6F9",
                borderRadius: "5px",
              }}
              onClick={() => {
                setCreateAssign(true);
              }}
              onMouseEnter={() => {
                console.log(params.row.test);
                setSelectedData(params.row.test);
              }}
            >
              <BiLogIn className="text-cyan-800" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "#F3F6F9",
                borderRadius: "5px",
              }}
              onClick={() => {
                setCurrentSelectedData(params.row.id);
                setEditAssigned(true);
              }}
            >
              <BiPencil className="text-cyan-800" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "#F3F6F9",
                borderRadius: "5px",
              }}
              onClick={() => setHistoryDialog(true)}
            >
              <BiHistory className="text-cyan-800" />
            </IconButton>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "#F3F6F9",
                borderRadius: "5px",
              }}
              onClick={() => {
                setCurrentSelectedData(params.row.id);
                setDeleteDataConfirmation(true);
              }}
            >
              <BsTrash className="text-red-500" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const fetchDetailData = async (id: string) => {
    const fetchingAllSO = await GETListKepalaStasiun({
      params: {
        pageSize: 50,
      },
    });
    setSoList(fetchingAllSO.data);
    const fetching = await GETDetailKepalaStasiun(id as string);
    const result = fetching.data as KepalaStasiunDetailResponseType;

    setDetailData(result);
  };

  const fetchDataSecond = async () => {
    handleReset();
    console.log(uuidSearchQuery);
    try {
      const fetching = await GETListKepalaStasiun({
        params: {
          pageSize: currentSize,
          currentPage: currentPage,
          sortOrder: "desc",
        },
      });

      const result = fetching.data as KepalaStasiunListResponseType;

      setTotalPage(result.data.totalPages);

      const process = result.data.content.map((item, index) => {
        return {
          id: item.uuid,
          no: index + 1,
          stationCodeInt: item.stations.code.internal,
          stationName: item.stations.name,
          stationChief: item.user.fullName,
          test: item,
        };
      });

      setRows(process);
      //   }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useMemo((): any => {
    // fetchData();
    fetchDataSecond();
  }, [currentPage, currentSize, uuidSearchQuery]);

  useMemo(() => {
    fetchDetailData(currentSelectedData);
  }, [currentSelectedData, selectedData]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  return (
    <div>
      <div className="flex justify-between">
        <span className="text-xl font-bold">
          Station Management for Station Chief
        </span>
        <MainCustomButton
          onClick={() => {
            navigate("/duty/adm/station-assign/chief");
          }}
        >
          Per Kepala Stasiun
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
              onPageChange={(e: any, p: any) => {
                console.log(e);
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
              rows: rows,
              columns: column,
              currentPage: currentPage,
              currentSize: currentSize,
              totalData: rows.length,
              pageSizeOptions: [10, 25, 50, 100],
              onPageSizeChange: (e) => {
                setCurrentPage(1);
                setCurrentSize(e?.target.value as number);
              },
              onPageChange: (e, v) => {
                setCurrentPage(v as number);
                console.log(e);
              },
              searchQuery: (e: any) => {
                setTimeout(() => {
                  setUuidSearchQuery(e.target.value);
                }, 500);
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
      <CreateAssignKepalaStasiun
        open={createAssign}
        onClose={() => setCreateAssign(false)}
        data={selectedData}
        soList={soList as KepalaStasiunListResponseType}
      />

      {/* VIEW ASSIGNED KEPALA STASIUN */}
      <ViewAssignedKepalaStasiun
        open={viewAssigned}
        onClose={() => setViewAssigned(false)}
      />

      {/* EDIT ASSIGNED */}
      <EditAssignedKepalaStasiun
        open={editAssigned}
        onClose={() => setEditAssigned(false)}
        onConfirm={() => {
          setEditAssigned(false);
        }}
      />
    </div>
  );
};

export default AssignStationMainADMIN;
