import {
  MainCustomButton,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import {
  DELETEBankAccount,
  GETListBankAccount,
} from "@app/Services/Library/BankAccount";
import { GETListChecklistAspect } from "@app/Services/Library/ChecklistAspect";
import { columnStandard } from "@app/utils/constants/Object";
import { GridColDef } from "@mui/x-data-grid-premium";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

type RowAspect = {
  id: string;
  no: number;
  uuid: string;
  title: string;
  name: string;
  description: string | null;
  indicator: {
    positive: string;
    negative: string;
  };
  groups: string[];
  all: [];
};

type Aspect = {
  aspect: {
    metadata: Metadata;
    uuid: string;
    title: string;
    name: string;
    description: string;
    indicator: {
      positive: string;
      negative: string;
    };
    groups: string[];
  };
};

const ChecklistAspekList = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSize, setCurrentSize] = useState<number>(25);
  const [totalPage, setTotalPage] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(1000000);
  const [totalTick, setTotalTick] = useState<number>(0);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [rows, setRows] = useState<RowAspect[]>(
    [...Array(0)].map((item, index) => {
      return {
        id: "",
        no: index + 1,
        uuid: "",
        title: "",
        name: "",
        description: "",
        indicator: {
          positive: "",
          negative: "",
        },
        groups: [],
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
      field: "title",
      headerName: "Judul",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "name",
      headerName: "Aspek",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "description",
      headerName: "Deskripsi",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "indicator",
      headerName: "Indikator",
      flex: 1,
      renderCell: (params) => {
        return `${params.row.indicator.positive}, ${params.row.indicator.negative}`;
      },
    },
    {
      ...columnStandard,
      field: "groups",
      headerName: "Grup",
      flex: 1,
      renderCell: (params) => {
        let groups = ``;

        params.row.groups.forEach((item: any, index: number) => {
          groups.concat(`${item}`);

          if (index !== params.row.groups.length - 1) {
            groups.concat(`, `);
          }
        });
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
    //             color: "error",
    //             colorCustom: "red",
    //             children: "Hapus",
    //             size: "small",
    //             onClick: () => {
    //               processDelete(params.row.id);
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
  //     confirmButtonText: "Ya",
  //     denyButtonText: `Tidak`,
  //   }).then(async (result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       try {
  //         const deleteER = await DELETEBankAccount({
  //           version: "2.0.0",
  //           bankAccount: {
  //             uuid,
  //           },
  //         });

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
      const fetching = await GETListChecklistAspect({
        pageNumber: currentPage,
        pageSize: 10000,
      });

      const result = fetching.data;

      const process = result.data.content.map((item: Aspect, index: number) => {
        return {
          id: index,
          no: index + 1,
          uuid: item.aspect.uuid,
          title: item.aspect.title,
          name: item.aspect.name,
          description: item.aspect.description,
          indicator: item.aspect.indicator,
          groups: item.aspect.groups,
          all: item.aspect,
        };
      });

      console.log(process);

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
  }, [currentPage, currentSize, totalTick]);
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-semibold">Checklist Aspek</span>
        <div className="flex">
          <MainCustomButton
            onClick={() => navigate("/duty/adm/checklist-aspek/create")}
            hidden={true}
          >
            Buat Checklist Aspek
          </MainCustomButton>
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

export default ChecklistAspekList;
