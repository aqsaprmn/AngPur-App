import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { Dialog, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const ShippingCreateDialog = ({
  onClose,
  open,
  refetch,
  selectedDay,
}: {
  open: boolean;
  onClose: any;
  refetch: () => void;
  selectedDay: string;
}) => {
  const { setFieldValue, values, handleSubmit, handleChange } = useFormik({
    initialValues: {
      description: "",
      date: selectedDay,
    },
    onSubmit: async (val, { resetForm }) => {
      const fetching = await POSTCreateHariBesarNasional({
        version: "2.0.0",
        holiday: {
          date: dayjs(val.date).format("YYYY-MM-DD"),
          description: val.description,
        },
      });
      onClose();

      if (fetching.isSuccess) {
        refetch();
        resetForm();
        return Swal.fire({
          title: "Success",
          text: "Create data successfull",
          icon: "success",
        });
      }

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong",
        icon: "error",
      });
    },
  });

  values.date = selectedDay;

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
    >
      <div className="mb-8 flex justify-center">
        <span className="text-md font-semibold">Buat Hari Besar Nasional</span>
      </div>
      <div className="mb-5 flex flex-wrap justify-between gap-5">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-text-title text-base font-bold">
                Tanggal
              </label>
              <TextField
                type="date"
                className="lrt-small-textfield"
                size="small"
                // defaultValue={dayjs(values.date).format("YYYY-MM-DD")}
                onChange={(e) => {
                  setFieldValue("date", new Date(e.target.value));
                }}
                value={dayjs(values.date).format("YYYY-MM-DD")}
                sx={{
                  borderRadius: "4px",
                  borderColor: "#DDDDDD !important",
                  fontSize: "12px",
                  "& .Mui-disabled": {
                    borderColor: "red !important",
                  },
                }}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-text-title text-base font-bold">
                Deskripsi
              </label>
              <TextField
                className="lrt-small-textfield"
                size="small"
                name="description"
                onChange={handleChange}
                sx={{
                  borderRadius: "4px",
                  borderColor: "#DDDDDD !important",
                  fontSize: "12px",
                  "& .Mui-disabled": {
                    borderColor: "red !important",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-end gap-2">
        <MainCustomButtonDeny onClick={onClose}>Cancel</MainCustomButtonDeny>
        <MainCustomButton
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Simpan
        </MainCustomButton>
      </div>
    </Dialog>
  );
};

export default ShippingCreateDialog;
