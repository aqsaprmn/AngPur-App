import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { POSTCreateShipping } from "@app/Services/Shipping";
import { Dialog, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const ShippingCreateDialog = ({
  user_uuid,
  onClose,
  open,
  setTotalTick,
}: {
  user_uuid: string;
  open: boolean;
  onClose: any;
  setTotalTick: () => void;
}) => {
  const { handleSubmit, handleChange } = useFormik({
    initialValues: {
      user_uuid,
      address: "",
      number: "",
      rt: "",
      rw: "",
      village: "",
      district: "",
      city: "",
      province: "",
      postalCode: "",
    },
    onSubmit: async (val, { resetForm }) => {
      const fetching = await POSTCreateShipping(val);

      onClose();

      resetForm();

      if (fetching.isSuccess) {
        setTotalTick();
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

  return (
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: "1rem",
        },
      }}
      fullWidth={true}
      maxWidth={"sm"}
      open={open}
      onClose={onClose}
    >
      <div className="mb-8 flex justify-center">
        <span className="text-md font-semibold">Create New Shipping</span>
      </div>
      <div className="mb-5 flex flex-wrap justify-between gap-5">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="address"
                className="text-text-title text-base font-bold"
              >
                Address
              </label>
              <TextField
                className="lrt-small-textfield"
                size="small"
                onChange={handleChange}
                name="address"
                id="address"
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
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="number"
                  className="text-text-title text-base font-bold"
                >
                  Number
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="number"
                  id="number"
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
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="rt"
                  className="text-text-title text-base font-bold"
                >
                  RT
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="rt"
                  id="rt"
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
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="rw"
                  className="text-text-title text-base font-bold"
                >
                  RW
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="rw"
                  id="rw"
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
            <div className="grid grid-cols-3 gap-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="district"
                  className="text-text-title text-base font-bold"
                >
                  District
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="district"
                  id="district"
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
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="village"
                  className="text-text-title text-base font-bold"
                >
                  Village
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="village"
                  id="village"
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
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="postalCode"
                  className="text-text-title text-base font-bold"
                >
                  Postal Code
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="postalCode"
                  id="postalCode"
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
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="city"
                  className="text-text-title text-base font-bold"
                >
                  City
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="city"
                  id="city"
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
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="province"
                  className="text-text-title text-base font-bold"
                >
                  Province
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="province"
                  id="province"
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
