import { MainCustomButton } from "@app/components/Buttons";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import { GETListMasterQuestion } from "@app/Services/Assessment/MasterQuestion";
import { columnStandard } from "@app/utils/constants/Object";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid-premium";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JSX } from "react/jsx-runtime";
import Swal from "sweetalert2";

type AnswersType = { answer: { text: string; correct: boolean } };

export type MasterQuestion = {
  masterQuestion: {
    metadata: Metadata;
    uuid: string;
    type: string;
    fixed: boolean;
    owner: string;
    code: string;
    group: {
      code: string;
      name: string;
    };
    question: string;
    answers: AnswersType[];
  };
  answered: {
    text: string;
    correct: boolean;
  } | null;
};

const MasterQuestionsMain = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSize, setCurrentSize] = useState<number>(25);
  const [totalPage, setTotalPage] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(1000000);
  // const [totalTick, setTotalTick] = useState<number>(0);
  const [fixed, setFixed] = useState<boolean>(true);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [rows, setRows] = useState(
    [...Array(0)].map((item, index) => {
      return {
        id: item.event.uuid,
        noLk: `LK-${index + 2}`,
        eventTime: dayjs(new Date()).format("DD/MM/YYYY - HH:mm"),
        finishTime: dayjs(new Date()).format("DD/MM/YYYY - HH:mm"),
        directorateUnit: "Unit Angkutan Penumpang (Non Andil)",
        causalCode: `L - ${110 + index}`,
        reporterName: "DEMO OCC",
        disturbingTrip: "YA",
        status: "Waiting",
        all: item,
      };
    })
  );

  const columns: GridColDef[] = [
    {
      ...columnStandard,
      field: "id",
      headerName: "id",
    },
    {
      ...columnStandard,
      field: "no",
      headerName: "No",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "code",
      headerName: "Kode",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "question",
      headerName: "Pertanyaan",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "answers",
      headerName: "Jawaban",
      flex: 1,
      renderCell: (params) => {
        const answers: JSX.Element[] = [];

        if (params.row.answers)
          params.row.answers.forEach(
            (
              item: { answer: { text: string; correct: boolean } },
              index: number
            ) => {
              answers.push(
                <Typography key={index}>
                  <span className={item.answer.correct ? "text-green-500" : ""}>
                    {item.answer.text}
                  </span>
                  {index !== params.row.answers.length - 1 ? `, ` : ""}
                </Typography>
              );
            }
          );

        return <>{answers.length ? answers : ""}</>;
      },
    },
    {
      ...columnStandard,
      field: "fixed",
      headerName: "Tetap",
      flex: 1,
      renderCell: (params) => {
        return params.row.fixed ? `YA` : `TIDAK`;
      },
    },
    // {
    //   ...columnStandard,
    //   field: "action",
    //   headerName: "",
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <MainCustomOutlinedButton
    //           props={{
    //             sx: {
    //               mr: 1,
    //             },
    //             children: "Detail",
    //             size: "small",
    //             onClick: () => {
    //               navigate(
    //                 `/report/occ/laporan-kejadian/detail/${params.row.id}`
    //               );
    //             },
    //           }}
    //         />

    //         <MainCustomOutlinedButton
    //           props={{
    //             sx: {
    //               mr: 1,
    //             },
    //             color: "error",
    //             colorCustom: "red",
    //             children: "Hapus",
    //             size: "small",
    //             onClick: () => {
    //               processDelete(params.row.id);
    //             },
    //           }}
    //         />

    //         <MainCustomOutlinedButton
    //           props={{
    //             sx: {
    //               mr: 1,
    //             },
    //             color: "info",
    //             colorCustom: "blue",
    //             children: "Edit",
    //             size: "small",
    //             onClick: () => {
    //               navigate(
    //                 `/report/occ/laporan-kejadian/update/${params.row.id}`
    //               );
    //             },
    //           }}
    //         />
    //       </>
    //     );
    //   },
    // },
  ];

  // const processDelete = async (uuid: string) => {
  //   setLoadingTable(true);

  //   Swal.fire({
  //     title: "Yakin dihapus?",
  //     icon: "warning",
  //     showDenyButton: true,
  //     showCancelButton: true,
  //     confirmButtonText: "Ya",
  //     denyButtonText: `Tidak`,
  //   }).then(async (result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       try {
  //         const deleteER = await DELETEEventReport({ uuid });

  //         if (deleteER.isSuccess) {
  //           setTotalTick(totalTick + 1);

  //           return Swal.fire({
  //             title: "Success",
  //             text: "Delete data successfull",
  //             icon: "success",
  //           });
  //         }
  //       } catch (error) {
  //         console.log(error);

  //         return Swal.fire({
  //           title: "Oops",
  //           text: "Something went wrongerror",
  //           icon: "error",
  //         });
  //       } finally {
  //         setLoadingTable(false);
  //       }
  //     } else {
  //       setLoadingTable(false);
  //     }
  //   });
  // };

  const fetchData = async () => {
    setLoadingTable(true);
    try {
      const fetching = await GETListMasterQuestion({
        pageNumber: currentPage,
        pageSize: 10000,
        fixed,
      });

      const result = fetching.data;

      const process = result.data.content.map(
        (item: MasterQuestion, index: number) => {
          return {
            id: item.masterQuestion.uuid,
            no: index + 1,
            code: item.masterQuestion.code,
            fixed: item.masterQuestion.fixed,
            question: item.masterQuestion.question,
            answers: item.masterQuestion.answers,
            all: item.masterQuestion,
          };
        }
      );

      setRows(process);
      setTotalPage(result.data.totalPage);
      setTotalData(result.data.totalData);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrongerror",
        icon: "error",
      });
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, currentSize, fixed]);
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-semibold">Master Pertanyaan</span>
        <div className="flex">
          <div>
            <FormControlLabel
              control={<Checkbox value={fixed} size="small" />}
              label="Tetap"
              onChange={() => setFixed(!fixed)}
              checked={fixed}
              slotProps={{
                typography: {
                  fontSize: "14px",
                  fontWeight: "600",
                },
              }}
            />
          </div>
          <Link to={"/duty/adm/master-question/create"}>
            <MainCustomButton hidden={true}>Buat Pertanyaan</MainCustomButton>
          </Link>
        </div>
      </div>
      <CustomTableQuickFiltered
        key={currentSize}
        props={{
          rows,
          columns,
          currentPage: currentPage - 1,
          currentSize,
          totalPage,
          totalData,
          useMuiPagination: true,
          withParams: true,
          loading: loadingTable,
          pageSizeOptions: [10, 25, 50, 100],
          columnVisibilityModel: {
            id: false,
            ID: false,
            noLk: false,
          },
          initialState: {
            pagination: {
              paginationModel: {
                pageSize: 25,
                page: 0,
              },
            },
          },
          onPageSizeChange: (e) => {
            setCurrentPage(1);
            setCurrentSize(e?.target.value as number);
          },
          onPageChange: (_v, p) => {
            setCurrentPage(p as number);
          },
        }}
      />
    </div>
  );
};

export default MasterQuestionsMain;
