import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import { GETDetailUser, PATCHEditUser } from "@app/Services/User/User";
import { Autocomplete, Dialog, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import Swal from "sweetalert2";

const UserEditDialog = ({
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
      name: "",
      email: "",
      role: "",
      phone: "",
    },
    onSubmit: async (val, { resetForm }) => {
      const fetching = await PATCHEditUser({ body: val });

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
      const fetching = await GETDetailUser({ uuid });

      if (fetching.isError) {
        return Swal.fire({
          title: "Oops",
          text: fetching.data.message,
          icon: "error",
        });
      }

      const user = fetching.data.data.user;

      setFieldValue("uuid", user.uuid);
      setFieldValue("name", user.name);
      setFieldValue("email", user.email);
      setFieldValue("phone", user.phone);
      setFieldValue("role", user.role);
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
        <span className="text-md font-semibold">Edit User</span>
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
                value={values.name}
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
                  value={values.email}
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
                  value={values.phone}
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

export default UserEditDialog;
