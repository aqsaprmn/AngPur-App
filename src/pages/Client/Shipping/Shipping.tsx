import {
  MainCustomButton,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import { GETListShipping } from "@app/Services/Shipping";
import { columnStandard } from "@app/utils/constants/Object";
import { useAuthStore } from "@app/zustand/Auth/auth";
import { GridColDef } from "@mui/x-data-grid-premium";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ShippingPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSize, setCurrentSize] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(1000000);
  const [totalTick, setTotalTick] = useState<number>(0);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);
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
      flex: 1,
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
      field: "action",
      headerName: "",
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => {
                navigate(`/shipping/detail/${params.row.id}`);
              }}
              className=" bg-gray-500 text-white duration-500 hover:bg-gray-600 px-3 py-2 rounded"
            >
              Detail
            </button>
          </>
        );
      },
    },
  ];

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
        text: "Something went wrongerror",
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
    </div>
  );
};

export default ShippingPage;
