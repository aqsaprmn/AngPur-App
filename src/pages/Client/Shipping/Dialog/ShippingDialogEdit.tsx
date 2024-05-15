import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { GETDetailShipping, PATCHEditShipping } from "@app/Services/Shipping";
import { Autocomplete, Dialog, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import Swal from "sweetalert2";

const ShippingEditDialog = ({
  uuid,
  onClose,
  open,
  setTotalTick,
}: {
  uuid: string;
  open: boolean;
  onClose: any;
  setTotalTick: () => void;
}) => {
  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: {
      uuid: "",
      address: "",
      number: "",
      rt: "",
      rw: "",
      village: "",
      district: "",
      city: "",
      province: "",
      postalCode: "",
      active: "",
    },
    onSubmit: async (val, { resetForm }) => {
      const fetching = await PATCHEditShipping(val);

      onClose();

      resetForm();

      if (fetching.isSuccess) {
        setTotalTick();
        return Swal.fire({
          title: "Success",
          text: "Edit data successfull",
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

  const fetchData = async () => {
    try {
      const fetching = await GETDetailShipping({ uuid });

      if (fetching.isError) {
        return Swal.fire({
          title: "Oops",
          text: fetching.data.message,
          icon: "error",
        });
      }

      const shipping = fetching.data.data.shipping;

      setFieldValue("uuid", shipping.uuid);
      setFieldValue("address", shipping.address);
      setFieldValue("number", shipping.number);
      setFieldValue("rt", shipping.rt);
      setFieldValue("rw", shipping.rw);
      setFieldValue("district", shipping.district);
      setFieldValue("village", shipping.village);
      setFieldValue("postalCode", shipping.postalCode);
      setFieldValue("city", shipping.city);
      setFieldValue("province", shipping.province);
      setFieldValue("active", shipping.active);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrongerror",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    if (uuid !== "") {
      fetchData();
    }
  }, [uuid]);

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
        <span className="text-md font-semibold">Edit Shipping</span>
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
                value={values.address}
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
            <div className="flex flex-col gap-1">
              <label
                htmlFor="address"
                className="text-text-title text-base font-bold"
              >
                Active
              </label>
              <Autocomplete
                size="small"
                id="grup"
                filterSelectedOptions={true}
                options={["Active", "No-Active"].map((item) => item)}
                value={values.active === "Y" ? "Active" : "No-Active"}
                renderInput={(params) => (
                  <TextField
                    sx={{
                      "& .MuiInputBase-root": {
                        borderRadius: "7px",
                      },
                    }}
                    {...params}
                  />
                )}
                onChange={(_e, v) => {
                  if (v != null) {
                    setFieldValue("active", v === "Active" ? "Y" : "N");
                  }
                }}
                isOptionEqualToValue={(option, label) => option == label}
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
                  value={values.number}
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
                  value={values.rt}
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
                  value={values.rw}
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
                  value={values.district}
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
                  value={values.village}
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
                  value={values.postalCode}
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
                  value={values.city}
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
                  value={values.province}
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

export default ShippingEditDialog;
