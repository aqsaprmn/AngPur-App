import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { Dialog } from "@mui/material";

const DeleteDutyCodeConfirmation = ({
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
        <span className="text-md font-extrabold">Delete this kode dinasan</span>
      </div>

      <div className="mb-4">
        <span className="text-sm text-[#383838]">
          Are you sure wants to delete this data?
        </span>
      </div>

      <div className="flex justify-end gap-2">
        <MainCustomButtonDeny onClick={onClose}>Cancel</MainCustomButtonDeny>
        <MainCustomButton onClick={onConfirm}>Delete</MainCustomButton>
      </div>
    </Dialog>
  );
};

export default DeleteDutyCodeConfirmation;
