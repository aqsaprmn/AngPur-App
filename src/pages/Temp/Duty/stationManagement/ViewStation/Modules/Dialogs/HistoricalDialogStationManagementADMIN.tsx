import CustTableUnpaginated from "@app/components/Tables/CustTableUnpaginated";
import { GlassMorphismDialog } from "@app/utils/constants/Object";
import { StationDetailResponseType } from "@app/utils/constants/types";
import { Dialog } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

const HistoricalDialogStationManagementADMIN = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: any;
  data: StationDetailResponseType;
}) => {
  const [rows, setRows] = useState<any[]>(
    data?.station?.operationHour?.map((item, index) => {
      return {
        id: index + 2,
        effectiveDate: item?.effectiveDate?.startFrom,
        expiredDate: item?.effectiveDate?.endAt,
        stationOperationalHour: `${item?.openTime} - ${item?.closeTime}`,
      };
    }) as any[]
  );

  console.log(setRows);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "effectiveDate",
      headerName: "Tanggal Berlaku",
      flex: 1,
    },
    {
      field: "expiredDate",
      headerName: "Tanggal Kadaluarsa",
      flex: 1,
    },
    {
      field: "stationOperationalHour",
      headerName: "Jam Operasional Stasiun",
      flex: 1,
    },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          ...GlassMorphismDialog,
          padding: "1rem",
        },
      }}
      fullWidth
      maxWidth={"md"}
    >
      <div className="mb-5">
        <span className="text-sm font-extrabold">
          Riwayat Operasional {data?.station?.name}
        </span>
      </div>

      <CustTableUnpaginated
        props={{
          columns,
          rows,
        }}
      />
    </Dialog>
  );
};

export default HistoricalDialogStationManagementADMIN;
