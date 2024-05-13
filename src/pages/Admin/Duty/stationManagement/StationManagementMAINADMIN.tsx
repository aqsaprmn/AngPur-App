import {
  DELETEStasiun,
  GETListStation,
} from "@app/Services/DTA/StationManagement/StationManagementApiList";
import { TableAccordion } from "@app/components/Accordion/AccordionTable";
import { PaginationPageSize } from "@app/components/Accordion/PaginationPageSize";
import {
  MainCustomButton,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import {
  StationDetailResponseType,
  StationListResponseType,
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
import { BiHistory, BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import HistoricalDialogStationManagementADMIN from "./ViewStation/Modules/Dialogs/HistoricalDialogStationManagementADMIN";
import DeleteStationConfirmation from "./modules/DeleteStationConfirmation";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";

const StationManagementMAINADMIN = () => {
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
  const [pageTicks, setPageTicks] = useState<number>(0);
  const [apiResult, setApiResult] = useState<StationListResponseType>({
    version: "",
    data: {
      content: [],
      pageNumber: 1,
      pageSize: 10,
      totalData: 0,
      totalPages: 0,
    },
    message: "",
    success: false,
    timestamp: 0,
  });
  console.log(apiResult, setApiResult);

  const [selectedData, setSelectedData] = useState<StationDetailResponseType>({
    station: {
      code: {
        internal: "X",
        external: "X",
      },
      location: {
        latitude: "0",
        longitude: "0",
      },
      metadata: {
        active: false,
        timeInsert: 0,
        timeUpdate: 0,
        trash: false,
      },
      name: "",
      operationHour: [],
      uuid: "",
    },
  });
  console.log(selectedData);

  const [rows, setRows] = useState<any[]>([]);
  const [historicalDialog, setHistoricalDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmScreenOrLower = useMediaQuery(theme.breakpoints.down("md"));

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
      field: "stationCodeExt",
      headerName: "KODE STASIUN (EXT)",
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
      field: "longitude",
      headerName: "LONGITUDE",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "latitude",
      headerName: "LATITUDE",
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
                navigate(
                  `/duty/adm/station-management/view-station/${params.row.id}`
                );
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
                navigate(
                  `/duty/adm/station-management/edit-station/${params.row.id}`
                );
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
              onMouseEnter={() => {
                setSelectedData(params.row.test);
                console.log(params.row.test);
              }}
              onClick={() => setHistoricalDialog(true)}
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
                setDeleteDataConfirmation(true);
              }}
              onMouseEnter={() => {
                setSelectedData(params.row.test);
              }}
            >
              <BsTrash className="text-red-500" />
            </IconButton>
          </div>
        );
      },
    },
  ];

  const fetchDataSecond = async () => {
    handleReset();
    console.log(uuidSearchQuery);
    try {
      const fetching = await GETListStation({
        pageNumber: currentPage,
        pageSize: currentSize,
        sortOrder: "desc",
      });

      let result = fetching.data as StationListResponseType;

      setTotalPage(10);

      const process = result.data.content.map((item, index) => {
        return {
          id: item.station.uuid,
          no: index + 1,
          stationCodeInt: item.station.code.internal,
          stationCodeExt: item.station.code.external,
          stationName: item.station.name,
          longitude: item.station.location.longitude,
          latitude: item.station.location.latitude,
          historicalData: item.station.operationHour,
          test: item,
        };
      });

      setRows(process);
      setCurrentPage(result.data.pageNumber);
      setCurrentSize(result.data.pageSize);
      setTotalPage(result.data.totalPages);
      setTotalData(result.data.totalData);
      //   }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteData = async (data: StationDetailResponseType) => {
    try {
      const fetching = await DELETEStasiun({
        body: {
          version: "2.0.0",
          stations: [
            {
              station: {
                uuid: data.station.uuid,
              },
            },
          ],
        },
      });

      if (fetching.isSuccess) {
        setDeleteDataConfirmation(false);
        setPageTicks(pageTicks + 1);
        return Swal.fire({
          title: "Success",
          text: `successfully delete ${data.station.name}`,
          icon: "success",
        });
      }
    } catch (error) {
      setDeleteDataConfirmation(false);
      return Swal.fire({
        title: "Oops!",
        text: `Something went wrong when deleting ${data.station.name}`,
        icon: "error",
      });
    }
  };

  useMemo((): any => {
    // fetchData();
    fetchDataSecond();
  }, [currentPage, currentSize, uuidSearchQuery, pageTicks]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  return (
    <div>
      <div className="flex justify-between">
        <span className="text-xl font-bold">Station Management</span>
        <MainCustomButton
          onClick={() => {
            navigate("/duty/adm/station-management/create-station");
          }}
        >
          Buat Stasiun
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
              withParams:true,
              totalPage: totalPage,
              rows: rows,
              columns: column,
              currentPage: currentPage,
              currentSize: currentSize,
              totalData: totalData,
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
        onConfirm={() => {
          handleDeleteData(selectedData);
        }}
        data={selectedData}
      />

      {/* HISTORICAL DIALOG */}
      <HistoricalDialogStationManagementADMIN
        open={historicalDialog}
        onClose={() => setHistoricalDialog(false)}
        data={selectedData}
      />
    </div>
  );
};

export default StationManagementMAINADMIN;
