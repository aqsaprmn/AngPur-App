import {
  MainCustomButtonDeny,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import { Checkbox, FormControlLabel, OutlinedInput } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import RoleData from "@app/utils/constants/NEW_ROLES.json";
import Swal from "sweetalert2";
import { GETDetailUser } from "@app/Services/User/User";
import { useNavigate, useParams } from "react-router-dom";

const ViewUserADMIN = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>({});
  const { id } = useParams();
  const photoTextfieldRef = useRef<any>();

  const fetchData = async () => {
    try {
      const fetching = await GETDetailUser({ username: id as string });

      if (fetching.isError) {
        Swal.fire({
          title: "Error",
          text: fetching.data.message,
          icon: "error",
          timer: 2000,
        });
      }

      setUser(fetching.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (Object.keys(user).length < 1) {
    return (
      <div className="bg-white px-4 py-2 rounded-xl">
        <div className="mb-3">
          <span className="text-xl font-bold">Memuat data user...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white px-4 py-2 rounded-xl">
      <div className="mb-3">
        <span className="text-xl font-bold">Detail User "{user.fullName}"</span>
      </div>

      <div>
        {/* NAMA LENGKAP & PHOTO */}
        <div className="grid grid-cols-12 gap-5 mb-3">
          <div className="col-span-6">
            <div>
              <FormTitle
                children="Nama Lengkap"
                forElement="full-name-textfield"
              />
            </div>
            <OutlinedInput
              id="full-name-textfield"
              name="fullName"
              disabled
              size="small"
              fullWidth
              value={user.fullName}
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
          <div className="col-span-6">
            <div className="mb-3">
              <FormTitle children="Foto" forElement="full-name-textfield" />
            </div>
            <div className="flex gap-5 items-center">
              <MainCustomOutlinedButton
                props={{
                  children: "Pilih File",
                  size: "small",
                  onClick: () => {
                    photoTextfieldRef.current.click();
                  },
                }}
              />
              <FormTitle children="File Belum Dipilih" />
            </div>
            <input hidden ref={photoTextfieldRef} type="file" />
          </div>
        </div>

        {/* USERNAME & PASSWORD */}
        <div className="grid grid-cols-12 gap-5 mb-3">
          <div className="col-span-6">
            <div>
              <FormTitle children="Username" forElement="username-textfield" />
            </div>
            <OutlinedInput
              id="username-textfield"
              name="username"
              size="small"
              disabled
              fullWidth
              value={user.username}
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
        </div>

        {/* GROUP & PERMISSIONS */}
        <div className="grid grid-cols-12 gap-5 mb-3">
          {/* GROUP */}
          <div className="col-span-12 bg-[#FCFCFC] rounded-xl px-2 py-2">
            <div>
              <table className="w-full border-collapse border border-slate-300">
                <thead>
                  <tr>
                    <th className="border border-slate-300 py-3">Group</th>
                    <th className="border border-slate-300">Permission</th>
                  </tr>
                </thead>
                <tbody>
                  {RoleData.map((item, index) => {
                    return (
                      <tr key={index + 1}>
                        <td className="border border-slate-300">
                          <div
                            className={`truncate text-ellipsis flex gap-3 items-center rounded-xl`}
                          >
                            <Checkbox
                              checked={user.roles.some(
                                (e: any) => e.group === item.group_name
                              )}
                              size="small"
                            />
                            <span>{item.group_name?.replaceAll("_", " ")}</span>
                          </div>
                        </td>
                        <td className="border border-slate-300">
                          {user.roles.some(
                            (e: any) => e.group === item.group_name
                          ) && (
                            <div className=" text-lg">
                              {user.roles[
                                user.roles.findIndex(
                                  (e: any) => e.group === item.group_name
                                )
                              ].permission.map((ps: any, psi: number) => {
                                let permission: string = "";

                                const length =
                                  user.roles[
                                    user.roles.findIndex(
                                      (e: any) => e.group === item.group_name
                                    )
                                  ].permission.length;

                                permission += ps;
                                if (psi !== length - 1) {
                                  permission += `, `;
                                }

                                return permission;
                              })}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <MainCustomButtonDeny
            onClick={() => {
              navigate("/duty/adm/user-management");
            }}
          >
            Batal
          </MainCustomButtonDeny>
        </div>
      </div>
    </div>
  );
};

export default ViewUserADMIN;
