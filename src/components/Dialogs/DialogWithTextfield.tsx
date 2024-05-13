import { Dialog, DialogContent, OutlinedInput } from "@mui/material";
import { FC } from "react";
import { MainCustomButton, MainCustomButtonDeny } from "../Buttons";

interface DialogWithTextFieldProp {
  open: boolean;
  onClose: any;
  onSubmit?: any;
  onFormChange?: (e: any) => void;
  title?: string;
}

const DialogWithTextfield: FC<DialogWithTextFieldProp> = ({
  open,
  onClose,
  onSubmit,
  onFormChange,
  title,
}) => {
  // const { handleSubmit, values, errors, handleChange } = useFormik({
  //   initialValues: {
  //     reason: "",
  //   },
  //   onSubmit: () => {
  //     onSubmit;
  //   },
  //   validationSchema: Yup.object({
  //     reason: Yup.string()
  //       .min(3, "You need to input more a valid reason")
  //       .required("Required"),
  //   }),
  // });

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={"xs"}
      PaperProps={{
        style: {
          borderRadius: "10px",
          padding: "1rem",
        },
      }}
    >
      <DialogContent>
        <span className="text-xl font-bold text-slate-900">{title}</span>
        <form onSubmit={onSubmit}>
          <OutlinedInput
            id="reason"
            name="reason"
            onChange={onFormChange}
            size="small"
            fullWidth
            multiline
            minRows={3}
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
          <div className="flex flex-wrap gap-2 justify-end">
            <MainCustomButtonDeny onClick={onClose}>
              Cancel
            </MainCustomButtonDeny>
            <MainCustomButton onClick={onSubmit}>Submit</MainCustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWithTextfield;
