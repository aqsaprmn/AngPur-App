import { GETListTrainAttendantAll } from "@app/Services/DTA/JadwalDinasTA/jadwalDinasTAApiList";
import { POSTCreateBankAccount } from "@app/Services/Library/BankAccount";
// import { GETListUserADMIN } from "@app/Services/UserManagement/userManagementAPILIST";
import {
  MainCustomButton,
  MainCustomButtonDeny,
} from "@app/components/Buttons";
import {
  Autocomplete,
  Dialog,
  // MenuItem,
  // Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

// type rowUser = {
//   username: string;
//   fullname: string;
//   id: number;
//   select: string;
// };

// type User = {
//   user: {
//     metadata: Metadata | null;
//     uuid: string;
//     username: string;
//     password: string;
//     fullName: string;
//     roles: {
//       group: string;
//       permission: string[];
//       isDefault: boolean;
//     }[];
//   };
// };

const CreateBankAccount = ({
  onClose,
  open,
  refetch,
}: {
  open: boolean;
  onClose: () => void;
  refetch: () => void;
}) => {
  const [allTaUser, setAllTaUser] = useState<
    {
      username: string;
      fullName: string;
    }[]
  >([
    {
      username: "",
      fullName: "",
    },
  ]);

  const { values, handleSubmit, handleChange, setFieldValue } = useFormik({
    initialValues: {
      username: "",
      bankName: "",
      account: "",
    },
    onSubmit: async (val, { resetForm }) => {
      const fetching = await POSTCreateBankAccount({
        version: "2.0.0",
        bankAccount: {
          user: {
            username: val.username,
          },
          bank: {
            name: val.bankName,
            account: val.account + "",
          },
        },
      });
      onClose();
      resetForm();

      if (fetching.isSuccess) {
        refetch();
        return Swal.fire({
          title: "Success",
          text: "Create data successfull",
          icon: "success",
        });
      }

      if (Object.hasOwn(fetching.data, "error")) {
        return Swal.fire({
          title: "Oops",
          text: `${fetching.data.error.errorField[0].field} ${fetching.data.error.errorField[0].message}`,
          icon: "error",
        });
      }

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong",
        icon: "error",
      });
    },
  });

  const getAllTaUser = async () => {
    try {
      const res = await GETListTrainAttendantAll({
        pageNumber: 1,
        pageSize: 10000,
      });
      const allTaUser = res.data.data.content;
      setAllTaUser(allTaUser);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllTaUser();
  }, []);

  return (
    <Dialog
      PaperProps={{
        sx: {
          borderRadius: "10px",
          padding: "1rem",
        },
      }}
      maxWidth="sm"
      fullWidth={true}
      open={open}
      onClose={onClose}
    >
      <div className="mb-8 flex justify-center">
        <span className="text-md font-semibold">Buat Rekening Bank</span>
      </div>
      <div className="mb-5 flex flex-wrap justify-between gap-5">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-text-title text-base font-bold">
                Username
              </label>
              <span className="flex gap-2 items-center">
                <Autocomplete
                  autoComplete
                  size="small"
                  limitTags={1}
                  fullWidth
                  id="choose-ta"
                  options={[...allTaUser]}
                  getOptionLabel={(opt) => `${opt.username} - ${opt.fullName}`}
                  renderInput={(params) => (
                    <TextField
                      sx={{
                        "& .MuiInputBase-root": {
                          borderRadius: "7px",
                        },
                        minWidth: 300,
                        flex: 1,
                      }}
                      {...params}
                      placeholder="Pilih TA"
                    />
                  )}
                  onChange={(e, v) => {
                    e;

                    setFieldValue("username", v?.username);
                  }}
                  isOptionEqualToValue={(e, v) => e.username === v.username}
                />
              </span>
              {/* <Select
                onChange={handleChange}
                name="username"
                id="username"
                value={values.username}
                renderValue={(selected: string) => {
                  console.log(selected);

                  if (selected.length === 0) {
                    return <em>Placeholder</em>;
                  }

                  return selected;
                }}
                sx={{
                  borderRadius: "6px",
                  borderColor: "#DDDDDD !important",
                  fontSize: "12px",
                  "& .Mui-disabled": {
                    borderColor: "red !important",
                  },
                }}
              >
                <MenuItem disabled value="">
                  <em>Username</em>
                </MenuItem> */}
              {/* {users.map((user) => (
                  <MenuItem key={user.id} value={user.username}>
                    {user.select}
                  </MenuItem>
                ))} */}

              {/* </Select> */}
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-text-title text-base font-bold">
                Nama Bank
              </label>
              <TextField
                className="lrt-small-textfield"
                size="small"
                name="bankName"
                onChange={handleChange}
                sx={{
                  borderRadius: "4px",
                  borderColor: "#DDDDDD !important",
                  fontSize: "12px",
                  "& .Mui-disabled": {
                    borderColor: "red !important",
                  },
                }}
                value={values.bankName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-text-title text-base font-bold">
                No. Rekening
              </label>
              <TextField
                className="lrt-small-textfield"
                size="small"
                name="account"
                type="number"
                onChange={handleChange}
                sx={{
                  borderRadius: "4px",
                  borderColor: "#DDDDDD !important",
                  fontSize: "12px",
                  "& .Mui-disabled": {
                    borderColor: "red !important",
                  },
                  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":
                    {
                      WebkitAppearance: "none",
                      margin: 0,
                    },
                  "input[type=number]": {
                    MozAppearance: "textfield",
                  },
                }}
                value={values.account}
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

export default CreateBankAccount;
