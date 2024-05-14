import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { Dialog } from "@mui/material";

const EditConfirmationDutyCodeADMIN = ({
  onClose,
  onConfirm,
  open,
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
          borderRadius: "10px",
          padding: "1rem",
        },
      }}
    >
      <div>
        <span className="font-bold">Change data kode dinasan</span>
      </div>
      <div className="mb-7">
        <span className="text-sm font-semibold text-slate-600">
          Are you sure wants to save these changes?
        </span>
      </div>
      <div className="flex justify-end gap-2 items-center">
        <MainCustomButtonDeny onClick={onClose}>Cancel</MainCustomButtonDeny>
        <MainCustomButton onClick={onConfirm}>Change</MainCustomButton>
      </div>
    </Dialog>
  );
};

export default EditConfirmationDutyCodeADMIN;
