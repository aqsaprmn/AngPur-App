import CustomTableQuickFiltered from "@app/components/Tables/CustomTableQuickFiltered";
import { Dialog } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

const HistoryListStationAssign = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: any;
}) => {
  // const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSize, setCurrentSize] = useState(10);
  const [totalPage] = useState(10);
  const [, setUuidSearchQuery] = useState("");
  // console.log(uuidSearchQuery);
  // const [apiResult, setApiResult] = useState<any>();
  const [rows] = useState<any[]>(
    [...Array(0)].map((item, index) => {
      return {
        id: index + 1,
        no: 0,
        effectiveDate: "",
        finishDate: "",
        stationChiefName: "",
        test: item,
      };
    })
  );
  const [loading] = useState(true);

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
      field: "effectiveDate",
      headerName: "Tanggal Berlaku",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "finishDate",
      headerName: "Tanggal Selesai",
      flex: 1,
    },
    {
      ...columnFixVal,
      field: "stationChiefName",
      headerName: "Nama Kepala Stasiun",
      flex: 1,
    },
  ];

  return (
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: "1rem",
        },
      }}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={"md"}
    >
      <div>
        <span>Riwayat Kepala Stasiun "Cawang"</span>
      </div>
      <div>
        <CustomTableQuickFiltered
          key={currentSize}
          props={{
            loading,
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
            onPageChange: (_e, v) => {
              setCurrentPage(v as number);
              // console.log(e);
            },
            searchQuery: (e: any) => {
              setTimeout(() => {
                setUuidSearchQuery(e.target.value);
              }, 500);
            },
          }}
        />
      </div>
    </Dialog>
  );
};

export default HistoryListStationAssign;
