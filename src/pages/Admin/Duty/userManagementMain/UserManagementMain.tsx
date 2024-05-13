import { MainCustomButton } from "@app/components/Buttons";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import { GETAllUsers } from "@app/Services/User/User";
import { DELETEUserADMIN } from "@app/Services/UserManagement/userManagementAPILIST";
import { CircularProgress, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserManagementMain = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [totalData, setTotalData] = useState(100000);
  const [uuidSearchQuery, setUuidSearchQuery] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalTick, setTotalTick] = useState<number>(0);

  const columnFixVal: any = {
    align: "center",
    headerAlign: "center",
  };

  const columns: GridColDef[] = [
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
      align: "left",
      headerAlign: "left",
      field: "name",
      headerName: "NAMA",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "nip",
      headerName: "NIP",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "group",
      headerName: "GROUP",
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
                navigate(`/duty/adm/view-user/${params.row.nip}`);
              }}
            >
              <AiFillEye className="text-cyan-800" />
            </IconButton>
            {/* <IconButton 
              size="small"
              sx={{
                backgroundColor: "#F3F6F9",
                borderRadius: "5px",
              }}
              onClick={() => {
                navigate(`/duty/adm/edit-user/${params.row.uuid}`);
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
                processDelete(params.row.uuid);
              }}
            >
              <BsTrash className="text-red-500" />
            </IconButton> */}
          </div>
        );
      },
    },
  ];

  // const processDelete = async (uuid: string) => {
  //   setLoading(true);

  //   Swal.fire({
  //     title: "Are you sure?",
  //     icon: "warning",
  //     showDenyButton: true,
  //     confirmButtonText: "Ya",
  //     denyButtonText: `Tidak`,
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         const deleteER = await DELETEUserADMIN({
  //           data: {
  //             user: {
  //               uuid,
  //             },
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
  //         setLoading(false);
  //       }
  //     } else {
  //       setLoading(false);
  //     }
  //   });
  // };

  const fetchData = async () => {
    try {
      const fetching = await GETAllUsers({ pageSize: 1000 });

      if (fetching.isError) {
        Swal.fire({
          title: "Error",
          text: fetching.data.message,
          icon: "error",
          timer: 2000,
        });
      }

      const data = fetching.data.data.content.map((item: any, i: number) => {
        let group: string = ``;

        item.user.roles?.forEach((item: any) => {
          group += item.group;
        });

        return {
          id: i + 1,
          no: i + 1,
          uuid: item.user.uuid,
          name: item.user.fullName,
          nip: item.user.username,
          group,
        };
      });

      setTotalPage(fetching.data.data.totalPage);
      setTotalData(fetching.data.data.totalData);
      setRows(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useMemo((): any => {
    fetchData();
  }, [currentPage, currentSize, uuidSearchQuery, totalTick]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  return (
    <div>
      <div className="flex justify-between">
        <span className="text-xl font-bold">User Management</span>
        <MainCustomButton
          onClick={() => {
            navigate("/duty/adm/create-user");
          }}
        >
          Buat User
        </MainCustomButton>
      </div>
      <div className="">
        <CustomTableQuickFiltered
          key={currentSize}
          props={{
            loading,
            totalPage,
            rows,
            columns,
            currentPage: currentPage - 1,
            currentSize,
            useMuiPagination: true,
            withParams: true,
            totalData,
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
      </div>
    </div>
  );
};

export default UserManagementMain;
