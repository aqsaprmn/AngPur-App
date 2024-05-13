import {
  MainCustomButton,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import {
  DELETEBankAccount,
  GETListBankAccount,
} from "@app/Services/Library/BankAccount";
import { columnStandard } from "@app/utils/constants/Object";
import { GridColDef } from "@mui/x-data-grid-premium";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CreateBankAccount from "./Create/CreateBankAccount";

type rowBankAccount = {
  id: string;
  no: number;
  username: string;
  fullname: string;
  bankName: string;
  account: string;
  all: [];
};

type bankAccount = {
  bankAccount: {
    metadata: Metadata;
    version: string;
    uuid: string;
    inputOfficer: {
      username: string;
      fullname: string;
    };
    user: {
      uuid: string;
      username: string;
      fullname: string;
    };
    bank: {
      name: string;
      account: string;
    };
  };
};

const BankAccountList = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSize, setCurrentSize] = useState<number>(25);
  const [totalPage, setTotalPage] = useState<number>(10);
  const [totalData, setTotalData] = useState<number>(1000000);
  const [totalTick, setTotalTick] = useState<number>(0);
  const [loadingTable, setLoadingTable] = useState<boolean>(false);
  const [isCreate, setIsCreate] = useState<boolean>(false);
  const [rows, setRows] = useState<rowBankAccount[]>(
    [...Array(0)].map((item, index) => {
      return {
        id: item.event.uuid,
        no: index + 1,
        username: item.event.username,
        fullname: item.event.fullname,
        bankName: item.event.bankName,
        account: item.event.account,
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
      field: "username",
      headerName: "Username",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "fullname",
      headerName: "Nama",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "bankName",
      headerName: "Nama Bank",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "account",
      headerName: "Rekening",
      flex: 1,
    },
    {
      ...columnStandard,
      field: "action",
      headerName: "",
      renderCell: (params) => {
        return (
          <>
            <MainCustomOutlinedButton
              props={{
                sx: {
                  mr: 1,
                },
                color: "error",
                colorCustom: "red",
                children: "Hapus",
                size: "small",
                onClick: () => {
                  processDelete(params.row.id);
                },
              }}
            />
          </>
        );
      },
    },
  ];

  const processDelete = async (uuid: string) => {
    setLoadingTable(true);

    Swal.fire({
      title: "Yakin dihapus?",
      icon: "warning",
      showDenyButton: true,
      confirmButtonText: "Ya",
      denyButtonText: `Tidak`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        try {
          const deleteER = await DELETEBankAccount({
            version: "2.0.0",
            bankAccount: {
              uuid,
            },
          });

          if (deleteER.isSuccess) {
            setTotalTick(totalTick + 1);

            return Swal.fire({
              title: "Success",
              text: "Delete data successfull",
              icon: "success",
            });
          }
        } catch (error) {
          console.log(error);

          return Swal.fire({
            title: "Oops",
            text: "Something went wrongerror",
            icon: "error",
          });
        } finally {
          setLoadingTable(false);
        }
      } else {
        setLoadingTable(false);
      }
    });
  };

  const fetchData = async () => {
    setLoadingTable(true);
    try {
      const fetching = await GETListBankAccount({
        pageNumber: currentPage,
        pageSize: 10000,
      });

      const result = fetching.data;

      const process = result.data.content.map(
        (item: bankAccount, index: number) => {
          return {
            id: item.bankAccount.uuid,
            no: index + 1,
            username: item.bankAccount.user.username,
            fullname: item.bankAccount.user.fullname,
            bankName: item.bankAccount.bank.name,
            account: item.bankAccount.bank.account,
            all: item.bankAccount,
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
  }, [currentPage, currentSize, totalTick]);
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-semibold">Rekening Bank</span>
        <div className="flex">
          <MainCustomButton onClick={() => setIsCreate(true)} hidden={true}>
            Buat Rekening Bank
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

      {/* CREATE BANK ACCOUNT */}
      <CreateBankAccount
        refetch={fetchData}
        open={isCreate}
        onClose={() => setIsCreate(false)}
      />
    </div>
  );
};

export default BankAccountList;
