import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import { GETListOrder, PATCHDeliveryOrder } from "@app/Services/Order";
import { columnStandard } from "@app/utils/constants/Object";
import { GridColDef } from "@mui/x-data-grid-premium";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OrderAdminPage = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSize, setCurrentSize] = useState<number>(10);
  const [totalPage, setTotalPage] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(1000000);
  const [totalTick, setTotalTick] = useState<number>(0);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);

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
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "totalOrder",
      headerName: "Total Order",
      align: "center",
      headerAlign: "center",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "totalPrice",
      headerName: "Total Price",
      flex: 1,
      renderCell: (params) => {
        return (
          <NumericFormat
            value={params.row.totalPrice}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"Rp. "}
          />
        );
      },
    },
    {
      ...columnStandard,
      field: "paymentDate",
      headerName: "Payment Date",
      flex: 1,
      renderCell: (params) => {
        if (params.row.paymentDate !== null) {
          return dayjs(params.row.paymentDate).format("DD-MM-YYYY HH:mm:ss");
        }

        return "-";
      },
    },
    {
      ...columnStandard,
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        if (params.row.status === "O") {
          return <span className="text-yellow-500 ">Confirmation Payment</span>;
        }

        if (params.row.status === "P") {
          return <span className="text-orange-500 ">Waiting Delivery</span>;
        }

        if (params.row.status === "D") {
          return <span className="text-blue-500 ">Waiting Accepted</span>;
        }

        if (params.row.status === "C") {
          return <span className="text-red-500 ">Cancel</span>;
        }

        return <span className="text-green-500 ">Completed</span>;
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
                navigate("/admin/order/detail/" + params.row.parent_uuid);
              }}
              className=" bg-gray-500 text-white duration-500 hover:bg-gray-600 px-3 py-2 rounded"
            >
              Detail
            </button>
            {params.row.status === "P" && (
              <button
                onClick={() => {
                  Swal.fire({
                    title: "Order",
                    text: "Are you sure?",
                    icon: "question",
                    showDenyButton: true,
                    showCloseButton: false,
                  }).then((res) => {
                    if (res.isConfirmed) {
                      processDeliveryOrder(params.row.parent_uuid);
                    }
                  });
                }}
                className=" bg-orange-600 text-white duration-500 hover:bg-orange-700 px-3 py-2 rounded"
              >
                Delivery
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const processDeliveryOrder = async (uuid: string) => {
    try {
      setLoadingTable(true);

      const fetching = await PATCHDeliveryOrder({
        uuid,
      });

      setLoadingTable(false);

      if (fetching.isSuccess) {
        return Swal.fire({
          title: "Delivery Order",
          text: fetching.data.message,
          icon: "success",
        }).then(() => {
          setTotalTick(totalTick + 1);
        });
      }

      return Swal.fire({
        title: "Oops",
        text: fetching.data.message,
        icon: "error",
      });
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  const fetchData = async () => {
    try {
      const fetching = await GETListOrder({});

      const process = fetching.data.data.map((item: any, index: number) => {
        let totalOrder = 0;

        item.detail.forEach((item: any) => {
          totalOrder += item.total;
        });

        return {
          id: index + 1,
          no: index + 1,
          name: item.user.name,
          parent_uuid: item.parent_uuid,
          totalOrder,
          totalPrice: item.payment.total,
          paymentDate: item.payment.payment_date,
          detail: item.detail,
          status: item.detail[0].status,
          all: item,
        };
      });

      const newTotalPage = Math.ceil(process.length / currentSize);

      setRows(process);
      setTotalData(process.length);
      setTotalPage(newTotalPage);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [totalTick]);
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-semibold">Order List</span>
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

export default OrderAdminPage;
