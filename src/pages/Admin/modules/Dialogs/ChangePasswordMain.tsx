import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { Dialog, OutlinedInput } from "@mui/material";

const ChangePasswordMain = ({
  onClose,
  open,
  onSubmit,
}: {
  onClose: any;
  open: boolean;
  onSubmit: any;
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
      <div className="flex justify-center items-center">
        <span className="text-lg font-bold text-[#585858]">
          Change Password
        </span>
      </div>

      <form>
        <div className="mb-3">
          <div>
            <label
              htmlFor="old-password-textfield"
              className="text-sm font-bold"
            >
              Old Password
            </label>
          </div>
          <OutlinedInput
            id="old-password-textfield"
            name="oldPassword"
            size="small"
            fullWidth
            className="bg-transparent text-sm mt-4 mb-8"
            sx={{
              borderRadius: "7px",
              borderColor: "#DDDDDD !important",
              // backgroundColor: "grey",
              "& .Mui-disabled": {
                borderColor: "red !important",
              },
            }}
          />
        </div>
        <div className="mb-3">
          <div>
            <label
              htmlFor="new-password-textfield"
              className="text-sm font-bold"
            >
              New Password
            </label>
          </div>
          <OutlinedInput
            id="new-password-textfield"
            name="newPassword"
            size="small"
            fullWidth
            className="bg-transparent text-sm mt-4 mb-8"
            sx={{
              borderRadius: "7px",
              borderColor: "#DDDDDD !important",
              // backgroundColor: "grey",
              "& .Mui-disabled": {
                borderColor: "red !important",
              },
            }}
          />
        </div>
        <div className="mb-3">
          <div>
            <label
              htmlFor="new-password-confirmation-textfield"
              className="text-sm font-bold"
            >
              New Password Confirm
            </label>
          </div>
          <OutlinedInput
            id="new-password-confirmation-textfield"
            name="newPasswordConfirmation"
            size="small"
            fullWidth
            className="bg-transparent text-sm mt-4 mb-8"
            sx={{
              borderRadius: "7px",
              borderColor: "#DDDDDD !important",
              // backgroundColor: "grey",
              "& .Mui-disabled": {
                borderColor: "red !important",
              },
            }}
          />
        </div>

        <div className="flex justify-end gap-2">
          <MainCustomButtonDeny onClick={onClose}>Cancel</MainCustomButtonDeny>
          <MainCustomButton onClick={onSubmit}>Save Changes</MainCustomButton>
        </div>
      </form>
    </Dialog>
  );
};

export default ChangePasswordMain;
