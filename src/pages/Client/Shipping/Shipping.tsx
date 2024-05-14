import { MainCustomButton } from "@app/components/Buttons";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import { DELETEShipping, GETListShipping } from "@app/Services/Shipping";
import { columnStandard } from "@app/utils/constants/Object";
import { useAuthStore } from "@app/zustand/Auth/auth";
import { GridColDef } from "@mui/x-data-grid-premium";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ShippingCreateDialog from "./Dialog/ShippingDialogCreate";
import ShippingDetailDialog from "./Dialog/ShippingDialogDetail";
import ShippingEditDialog from "./Dialog/ShippingDialogEdit";

const ShippingPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSize, setCurrentSize] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(1000000);
  const [totalTick, setTotalTick] = useState<number>(0);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);
  const [uuidDetail, setUuidDetail] = useState<string>("");
  const { uuid } = useAuthStore((state: any) => state);

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
      flex: 0.2,
    },
    {
      ...columnStandard,
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "number",
      headerName: "Number",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "rtrw",
      headerName: "RT/RW",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "village",
      headerName: "Village",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        if (params.row.status === "Y") {
          return <span className="text-green-500 ">Active</span>;
        }

        return <span className="text-red-500 ">No-Active</span>;
      },
    },
    {
      ...columnStandard,
      field: "action",
      headerName: "",
      renderCell: (params) => {
        return (
          <div className="flex gap-1">
            <button
              onClick={() => {
                setUuidDetail(params.row.id);
                setIsDetail(true);
              }}
              className=" bg-gray-500 text-white duration-500 hover:bg-gray-600 px-3 py-2 rounded"
            >
              Detail
            </button>
            <button
              onClick={() => {
                setUuidDetail(params.row.id);
                setIsEdit(true);
              }}
              className=" bg-blue-600 text-white duration-500 hover:bg-blue-700 px-3 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => {
                Swal.fire({
                  title: "Delete shipping",
                  text: "Are you sure?",
                  icon: "question",
                  showDenyButton: true,
                  showCancelButton: false,
                }).then((res) => {
                  if (res.isConfirmed) {
                    processDelete(params.row.id);
                  }
                });
              }}
              className=" bg-red-500 text-white duration-500 hover:bg-red-600 px-3 py-2 rounded"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const processDelete = async (uuid: string) => {
    setLoadingTable(true);

    try {
      const deleteShipping = await DELETEShipping({
        uuid,
      });

      if (deleteShipping.isSuccess) {
        setTotalTick(totalTick + 1);

        return Swal.fire({
          title: "Shipping",
          text: "Delete data successfull",
          icon: "success",
        });
      }

      return Swal.fire({
        title: "Shipping",
        text: deleteShipping.data.message,
        icon: "success",
      });
    } catch (error) {
      console.log(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  const fetchData = async () => {
    setLoadingTable(true);
    try {
      const fetching = await GETListShipping({ user_uuid: uuid });

      const process = fetching.data.data.map((item: any, index: number) => {
        return {
          id: item.shipping.uuid,
          no: index + 1,
          address: item.shipping.address,
          number: item.shipping.number,
          rtrw: `${item.shipping.rt}/${item.shipping.rw}`,
          village: item.shipping.village,
          status: item.shipping.active,
          all: item.shipping,
        };
      });

      const newTotalPage = Math.ceil(
        parseInt(fetching.data.data.length) / currentSize
      );

      setRows(process);
      setTotalData(fetching.data.data.length);
      setTotalPage(newTotalPage);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    } finally {
      setLoadingTable(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [totalTick]);
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-semibold">Shipping List</span>
        <div className="flex">
          <MainCustomButton onClick={() => setIsCreate(true)} hidden={true}>
            Create New Shipping
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

      <ShippingCreateDialog
        user_uuid={uuid}
        setTotalTick={() => setTotalTick(totalTick + 1)}
        open={isCreate}
        onClose={() => setIsCreate(false)}
      />

      <ShippingEditDialog
        uuid={uuidDetail}
        setTotalTick={() => setTotalTick(totalTick + 1)}
        open={isEdit}
        onClose={() => setIsEdit(false)}
      />

      <ShippingDetailDialog
        uuid={uuidDetail}
        open={isDetail}
        onClose={() => setIsDetail(false)}
      />
    </div>
  );
};

export default ShippingPage;
