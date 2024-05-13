import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { Dialog } from "@mui/material";

const DeleteStationConfirmation = ({
  open,
  onClose,
  onConfirm,
}: {
  open: boolean;
  onClose: any;
  onConfirm: any;
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
        <span className="text-md font-extrabold">Delete this station</span>
      </div>

      <div className="mb-4">
        <span className="text-sm text-[#383838]">
          Are you sure wants to delete "Stasiun Cawang" data?
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
