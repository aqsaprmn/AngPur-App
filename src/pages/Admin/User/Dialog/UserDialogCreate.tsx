import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { POSTCreateUser } from "@app/Services/User/User";
import { Autocomplete, Dialog, TextField } from "@mui/material";
import { useFormik } from "formik";
import Swal from "sweetalert2";

const UserCreateDialog = ({
  onClose,
  open,
  setTotalTick,
}: {
  open: boolean;
  onClose: any;
  setTotalTick: () => void;
}) => {
  const { values, setFieldValue, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
      email: "",
      role: "ADMIN",
      phone: "",
      password: "",
      password_confirmation: "",
    },
    onSubmit: async (val, { resetForm }) => {
      try {
        const fetching = await POSTCreateUser({ body: val });

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
          text: fetching.data.message,
          icon: "error",
        });
      } catch (error) {
        return Swal.fire({
          title: "Oops",
          text: "Something went wrong",
          icon: "error",
        });
      }
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
        <span className="text-md font-semibold">Create New User</span>
      </div>
      <div className="mb-5 flex flex-wrap justify-between gap-5">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-text-title text-base font-bold"
              >
                Name
              </label>
              <TextField
                className="lrt-small-textfield"
                size="small"
                onChange={handleChange}
                name="name"
                id="name"
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
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="email"
                  className="text-text-title text-base font-bold"
                >
                  Email
                </label>
                <TextField
                  type="email"
                  className="lrt-small-textfield"
                  size="small"
                  name="email"
                  id="email"
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
                  htmlFor="phone"
                  className="text-text-title text-base font-bold"
                >
                  Phone
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="phone"
                  id="phone"
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
            <div className="flex flex-col gap-1">
              <label
                htmlFor="role"
                className="text-text-title text-base font-bold"
              >
                Role
              </label>
              <Autocomplete
                size="small"
                id="method"
                filterSelectedOptions={true}
                options={["ADMIN", "CLIENT"]}
                value={values.role}
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
                    setFieldValue("role", v);
                  }
                }}
                isOptionEqualToValue={(option, label) => option == label}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="password"
                  className="text-text-title text-base font-bold"
                >
                  Password
                </label>
                <TextField
                  type="password"
                  className="lrt-small-textfield"
                  size="small"
                  name="password"
                  id="password"
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
                  htmlFor="password_confirmation"
                  className="text-text-title text-base font-bold"
                >
                  Password Confirmation
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="password_confirmation"
                  id="password_confirmation"
                  type="password"
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

export default UserCreateDialog;
