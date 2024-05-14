import {
  DELETEKodeDinas,
  GETListKodeDinas,
} from "@app/Services/DTA/KodeDinasSO/kodeDinasSoApiList";
import { TableAccordion } from "@app/components/Accordion/AccordionTable";
import { PaginationPageSize } from "@app/components/Accordion/PaginationPageSize";
import {
  MainCustomButton,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import DeleteDutyCodeConfirmationADMINSC from "@app/pages/StationChief/Duty/kodeDinasan/modules/DeleteStationConfirmationADMINSC";
import { KodeDinasDetailResponseType } from "@app/utils/constants/types";
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
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { AiFillEye } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const KodeDinasanMainADMIN = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { handleReset } = useMapStore();
  const [deleteDataConfirmation, setDeleteDataConfirmation] =
    useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState(10);
  const [totalPage, setTotalPage] = useState(10);
  const [uuidSearchQuery, setUuidSearchQuery] = useState("");
  // const [apiResult, setApiResult] = useState<KodeDinasanListResponseType>({
  //   data: {
  //     content: [],
  //     offset: 0,
  //     pageNumber: currentPage,
  //     pageSize: currentSize,
  //     totalData: 0,
  //     totalPages: 0,
  //   },
  //   message: "",
  //   success: false,
  //   timestamp: 0,
  //   version: "2.0.0",
  // });
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isSmScreenOrLower = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedUuid, setSelectedUuid] = useState<string>("");

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
      field: "dutyCode",
      headerName: "Kode Dinasan",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "startHour",
      headerName: "Jam Mulai",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "finishHour",
      headerName: "Jam Selesai",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "baseEmolument",
      headerName: "Emolumen Dasar",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "additionalEmolument",
      headerName: "Emolumen Tambahan",
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
                  `/duty/adm-sc/duty-code/view-duty-code/${params.row.id}`
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
                  `/duty/adm-sc/duty-code/edit-duty-code/${params.row.id}`
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
              onClick={() => {
                setSelectedUuid(params.row.id);
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

  const fetchDataSecond = async () => {
    handleReset();
    setLoading(true);
    console.log(uuidSearchQuery);
    try {
      const fetching = await GETListKodeDinas({
        pageNumber: currentPage,
        pageSize: currentSize,
        sortOrder: "desc",
      });

      // console.log("INI HASIL FETCHING", fetching);

      let result: KodeDinasDetailResponseType = fetching.data;

      setTotalPage(result.data.totalPages);
      // console.log("start process", result.data.content);

      const process = result.data.content.map((item, index) => {
        return {
          id: item.uuid,
          no: index + 1,
          dutyCode: item.code,
          startHour: item.scheduleTime.start,
          finishHour: item.scheduleTime.finish,
          baseEmolument: item.emolument.base,
          additionalEmolument: item.emolument.addition,
          test: item,
        };
      });

      // console.log("ini proses", process);

      setRows(process);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useMemo(() => {
    // fetchData();
    fetchDataSecond();
  }, [currentPage, currentSize, uuidSearchQuery]);

  useEffect(() => {
    fetchDataSecond();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  return (
    <div>
      <div className="flex justify-between">
        <span
          className="text-xl font-bold"
          onClick={() => console.log("testing")}
        >
          Kode Dinasan
        </span>
        <MainCustomButton
          onClick={() => {
            navigate("/duty/adm/duty-code/create-duty-code");
          }}
        >
          Buat Kode Dinasan
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
              withParams: true,
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
      <DeleteDutyCodeConfirmationADMINSC
        open={deleteDataConfirmation}
        onClose={() => setDeleteDataConfirmation(false)}
        onConfirm={async () => {
          const fetching = await DELETEKodeDinas({
            version: "2.0.0",
            scheduleCodes: [
              {
                scheduleCode: {
                  uuid: selectedUuid,
                },
              },
            ],
          });

          if (fetching.isSuccess) {
            setDeleteDataConfirmation(false);
            return Swal.fire({
              title: "Success",
              text: "Data successfully deleted",
              icon: "success",
            });
          }

          setDeleteDataConfirmation(false);
          return Swal.fire({
            title: "Oops",
            text: "Something went wrong",
            icon: "error",
          });
        }}
      />
    </div>
  );
};

export default KodeDinasanMainADMIN;
