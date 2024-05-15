import { MainCustomButtonDeny } from "@app/components/Buttons";
import { GETDetailUser } from "@app/Services/User/User";
import { Autocomplete, Dialog, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const UserDetailDialog = ({
  uuid,
  onClose,
  open,
}: {
  uuid: string;
  open: boolean;
  onClose: any;
}) => {
  const [detail, setDetail] = useState<{
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
  }>({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
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

      setDetail(fetching.data.data.user);
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
        <span className="text-md font-semibold">Detail User</span>
      </div>
      {detail !== undefined && (
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
                  name="name"
                  id="name"
                  disabled
                  value={detail.name}
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
                    className="lrt-small-textfield"
                    size="small"
                    name="email"
                    id="email"
                    value={detail.email}
                    disabled
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
                    value={detail.phone}
                    id="phone"
                    disabled
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
                  disabled
                  filterSelectedOptions={true}
                  options={["ADMIN", "CLIENT"]}
                  value={detail.role}
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
                  isOptionEqualToValue={(option, label) => option == label}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-end gap-2">
        <MainCustomButtonDeny onClick={onClose}>Close</MainCustomButtonDeny>
      </div>
    </Dialog>
  );
};

export default UserDetailDialog;
