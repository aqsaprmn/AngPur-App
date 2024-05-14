import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { Dialog } from "@mui/material";

const ChangePasswordConfirmation = ({
  onClose,
  open,
  onConfirm,
}: {
  onClose: any;
  open: boolean;
  onConfirm: any;
}) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          padding: "1rem 1rem",
          borderRadius: "10px",
        },
      }}
    >
      <div className="mb-4">
        <span className="text-xl font-bold">Change Password</span>
      </div>

      <div className="mb-3">
        <span className="text-sm font-semibold text-[#383838]">
          Are you sure wants to change this user's password?
        </span>
      </div>

      <div className="flex justify-end gap-2">
        <MainCustomButtonDeny onClick={onClose}>
          Not Sure...
        </MainCustomButtonDeny>
        <MainCustomButton onClick={onConfirm}>Confirm</MainCustomButton>
      </div>
    </Dialog>
  );
};

export default ChangePasswordConfirmation;
