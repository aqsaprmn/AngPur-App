import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { StationDetailResponseType } from "@app/utils/constants/types";
import { Dialog } from "@mui/material";

const DeleteStationConfirmation = ({
  open,
  onClose,
  onConfirm,
  data,
}: {
  open: boolean;
  onClose: any;
  onConfirm: any;
  data: StationDetailResponseType;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          padding: "1rem 1rem",
          borderRadius: "10px",
        },
      }}
    >
      <div className="mb-4">
        <span
          className="text-md font-extrabold"
          onClick={() => console.log("ini data", data)}
        >
          Delete this station
        </span>
      </div>

      <div className="mb-4">
        <span className="text-sm text-[#383838]">
          Are you sure wants to delete "{data?.station?.name}" data?
        </span>
      </div>

      <div className="flex justify-end gap-2">
        <MainCustomButtonDeny onClick={onClose}>Cancel</MainCustomButtonDeny>
        <MainCustomButton onClick={onConfirm}>Change</MainCustomButton>
      </div>
    </Dialog>
  );
};

export default DeleteStationConfirmation;
