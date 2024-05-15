import { MainCustomButton } from "@app/components/Buttons";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import { DELETEUser, GETListUser } from "@app/Services/User/User";
import { columnStandard } from "@app/utils/constants/Object";
import { GridColDef } from "@mui/x-data-grid-premium";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserCreateDialog from "./Dialog/UserDialogCreate";
import UserEditDialog from "./Dialog/UserDialogEdit";
import UserDetailDialog from "./Dialog/UserDialogDetail";

const UserPage = () => {
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
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "role",
      headerName: "ROLE",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "active",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        if (params.row.active === "A") {
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
      const deleteUser = await DELETEUser({
        uuid,
      });

      if (deleteUser.isSuccess) {
        setTotalTick(totalTick + 1);

        return Swal.fire({
          title: "User",
          text: "Delete data successfull",
          icon: "success",
        });
      }

      return Swal.fire({
        title: "User",
        text: deleteUser.data.message,
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
      const fetching = await GETListUser();

      const process = fetching.data.data.map((item: any, index: number) => {
        return {
          id: item.user.uuid,
          no: index + 1,
          name: item.user.name,
          email: item.user.email,
          role: item.user.role,
          active: item.user.active,
          all: item.user,
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
        <span className="text-lg font-semibold">User List</span>
        <div className="flex">
          <MainCustomButton onClick={() => setIsCreate(true)} hidden={true}>
            Create New User
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

      <UserCreateDialog
        setTotalTick={() => setTotalTick(totalTick + 1)}
        open={isCreate}
        onClose={() => setIsCreate(false)}
      />

      <UserEditDialog
        uuid={uuidDetail}
        setTotalTick={() => setTotalTick(totalTick + 1)}
        open={isEdit}
        onClose={() => setIsEdit(false)}
      />

      <UserDetailDialog
        uuid={uuidDetail}
        open={isDetail}
        onClose={() => setIsDetail(false)}
      />
    </div>
  );
};

export default UserPage;
