import {
  MainCustomButton,
  MainCustomButtonDeny,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import { FormTitle } from "@app/components/Texts";
import ChangePasswordConfirmation from "@app/pages/Admin/modules/Dialogs/ChangePasswordConfirmation";
import ChangePasswordMain from "@app/pages/Admin/modules/Dialogs/ChangePasswordMain";
import RoleData from "@app/utils/constants/NEW_ROLES.json";
import { roleObject } from "@app/utils/constants/types";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { CreateUserFormValidation } from "./modules/CreateUserFormValidation";

const EditUserADMIN = () => {
  const photoTextfieldRef = useRef<any>();
  const [changePasswordConfirm, setChangePasswordConfirm] =
    useState<boolean>(false);
  const [changePassword, setChangePassword] = useState<boolean>(false);
  const [currentChosedGroup, setCurrentChosedGroup] = useState<roleObject>({
    group_name: "null",
    isDefault: false,
    roles: [],
  });
  const CreateUserForm = useFormik({
    initialValues: {
      fullName: "",
      nip: "",
      photo: "",
      password: "",
      email: "",
      phoneNumber: "",
      roles: [],
    },
    onSubmit: (val) => {
      console.log(val);
    },
    validationSchema: CreateUserFormValidation,
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <div className="bg-white px-4 py-2 rounded-xl">
      <div>
        <span
          className="text-xl font-bold"
          onClick={() => {
            console.log("ini value", CreateUserForm.values);
            console.log("ini errors", CreateUserForm.errors);
          }}
        >
          Edit User "Radian Rasyid"
        </span>
      </div>

      <form onSubmit={CreateUserForm.handleSubmit}>
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
              error={CreateUserForm.errors.fullName ? true : false}
              onChange={CreateUserForm.handleChange}
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
            {CreateUserForm.errors.fullName ? (
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {CreateUserForm.errors.fullName}
              </FormHelperText>
            ) : null}
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
            <input
              hidden
              ref={photoTextfieldRef}
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  CreateUserForm.setFieldValue("photo", e.target.files[0]);
                }
              }}
            />
            {CreateUserForm.errors.photo ? (
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {CreateUserForm.errors.photo}
              </FormHelperText>
            ) : null}
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
              onChange={CreateUserForm.handleChange}
              error={CreateUserForm.errors.nip ? true : false}
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
            {CreateUserForm.errors.nip ? (
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {CreateUserForm.errors.nip}
              </FormHelperText>
            ) : null}
          </div>
          <div className="col-span-6">
            <div className="mb-3">
              <FormTitle children="Password" forElement="password-textfield" />
            </div>
            <Button
              variant="text"
              size="small"
              onClick={() => setChangePasswordConfirm(true)}
            >
              Change Password
            </Button>
            {CreateUserForm.errors.password ? (
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {CreateUserForm.errors.password}
              </FormHelperText>
            ) : null}
          </div>
        </div>

        {/* EMAIL & PHONE NUMBER */}
        <div className="grid grid-cols-12 gap-5 mb-3">
          <div className="col-span-6">
            <div>
              <FormTitle children="Email" forElement="email-textfield" />
            </div>
            <OutlinedInput
              id="email-textfield"
              name="email"
              onChange={CreateUserForm.handleChange}
              error={CreateUserForm.errors.email ? true : false}
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
            {CreateUserForm.errors.email ? (
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {CreateUserForm.errors.email}
              </FormHelperText>
            ) : null}
          </div>
          <div className="col-span-6">
            <div>
              <FormTitle
                children="Phone Number"
                forElement="phone-number-textfield"
              />
            </div>
            <OutlinedInput
              id="phone-number-textfield"
              name="phoneNumber"
              onChange={CreateUserForm.handleChange}
              error={CreateUserForm.errors.phoneNumber ? true : false}
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
            {CreateUserForm.errors.phoneNumber ? (
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {CreateUserForm.errors.phoneNumber}
              </FormHelperText>
            ) : null}
          </div>
        </div>

        {/* AKSES POSISI */}
        <div className="mb-3">
          <div>
            <FormTitle
              children="Akses Posisi"
              forElement="give-all-group-access"
            />
          </div>
          <FormControlLabel
            control={<Checkbox size="small" />}
            label="Berikan semua group"
            id="give-all-group-access"
            checked={
              JSON.stringify(CreateUserForm.values.roles) ==
              JSON.stringify(RoleData)
            }
            onChange={() => {
              if (
                JSON.stringify(CreateUserForm.values.roles) ==
                JSON.stringify(RoleData)
              ) {
                return CreateUserForm.setFieldValue("roles", []);
              }

              CreateUserForm.setFieldValue("roles", RoleData);
            }}
          />
        </div>

        {/* GROUP & PERMISSIONS */}
        <div className="grid grid-cols-12 gap-5 mb-3">
          {/* GROUP */}
          <div className="col-span-4 bg-[#FCFCFC] rounded-xl px-2 py-2">
            <div>
              <span className="text-lg font-semibold">Group</span>
            </div>
            <div>
              {RoleData.map((item, index) => {
                return (
                  <div
                    className={`truncate text-ellipsis flex gap-3 items-center rounded-xl ${
                      currentChosedGroup.group_name === item.group_name
                        ? "bg-red-600"
                        : ""
                    }`}
                    key={index + 1}
                  >
                    <Checkbox
                      checked={CreateUserForm.values.roles.some(
                        (e: roleObject) => e.group_name === item.group_name
                      )}
                      size="small"
                      sx={{
                        color:
                          currentChosedGroup.group_name === item.group_name
                            ? "#FFFFFF"
                            : "",
                        "&.Mui-checked": {
                          color:
                            currentChosedGroup.group_name === item.group_name
                              ? "#FFFFFF"
                              : "",
                        },
                      }}
                      onClick={() => {
                        console.log(
                          "ini validation",
                          CreateUserForm.values.roles.some(
                            (e: roleObject) => e.group_name === item.group_name
                          )
                        );
                        setCurrentChosedGroup(item);
                        if (
                          CreateUserForm.values.roles.some(
                            (e: roleObject) => e.group_name === item.group_name
                          )
                        ) {
                          CreateUserForm.setFieldValue(
                            "roles",
                            CreateUserForm.values.roles.filter(
                              (e: roleObject) =>
                                e.group_name !== item.group_name
                            )
                          );

                          return;
                        }

                        CreateUserForm.setFieldValue("roles", [
                          ...CreateUserForm.values.roles,
                          item,
                        ]);
                      }}
                    />
                    <span
                      onClick={() => {
                        console.log("TEST");
                        setCurrentChosedGroup(item);
                      }}
                      className={
                        currentChosedGroup.group_name === item.group_name
                          ? "text-white font-semibold"
                          : ""
                      }
                    >
                      {item.group_name?.replaceAll("_", " ")}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PERMISSIONS FOR GROUP */}
          <div className="col-span-8 bg-[#FCFCFC] rounded-xl px-2 py-2">
            <div>
              <span className="text-lg font-semibold">
                Permissions pada group
              </span>
            </div>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-6">
                {currentChosedGroup?.roles?.map((item, index) => {
                  let currIndex = CreateUserForm.values?.roles.findIndex(
                    (e: roleObject) =>
                      e.group_name === currentChosedGroup.group_name
                  );
                  return (
                    <div key={index + 3}>
                      <FormControlLabel
                        disabled={
                          (CreateUserForm.values.roles as roleObject[]).some(
                            (e) =>
                              e.group_name === currentChosedGroup.group_name
                          ) == false
                        }
                        control={<Checkbox size="small" />}
                        label={item?.role_name}
                        slotProps={{
                          typography: {
                            sx: {
                              fontSize: 12,
                            },
                          },
                        }}
                        checked={
                          (CreateUserForm.values.roles as roleObject[])[
                            currIndex
                          ]?.roles[index].selected
                        }
                        onChange={() => {
                          let currVal = [
                            ...CreateUserForm.values.roles,
                          ] as roleObject[];
                          currVal[currIndex].roles[index].selected =
                            !currVal[currIndex]?.roles[index].selected;
                          setCurrentChosedGroup(currVal[currIndex]);
                          CreateUserForm.setFieldValue("roles", currVal);
                          return;
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="col-span-6">
                {currentChosedGroup.group_name == "null" ? null : (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          size="small"
                          checked={currentChosedGroup.roles.every(
                            (e) => e.selected == true
                          )}
                        />
                      }
                      checked={currentChosedGroup.roles.every(
                        (e) => e.selected == true
                      )}
                      disabled={currentChosedGroup.roles.every(
                        (e) => e.selected == false
                      )}
                      label="Berikan semua role"
                      onChange={() => {
                        let currIndex = CreateUserForm.values?.roles.findIndex(
                          (e: roleObject) =>
                            e.group_name === currentChosedGroup?.group_name
                        );

                        let duplicateCurrChosed = { ...currentChosedGroup };

                        if (
                          (CreateUserForm.values.roles as roleObject[])[
                            currIndex
                          ]?.roles.every((e) => e.selected == true)
                        ) {
                          duplicateCurrChosed = {
                            ...duplicateCurrChosed,
                            roles: duplicateCurrChosed.roles?.map((item) => {
                              return {
                                ...item,
                                selected: false,
                              };
                            }),
                          };
                          setCurrentChosedGroup(duplicateCurrChosed);

                          let tempValue: roleObject[] = [
                            ...CreateUserForm.values.roles,
                          ];

                          tempValue[currIndex] = duplicateCurrChosed;
                          CreateUserForm.setFieldValue("roles", tempValue);
                          return;
                        } else {
                          duplicateCurrChosed = {
                            ...duplicateCurrChosed,
                            roles: duplicateCurrChosed.roles?.map((item) => {
                              return {
                                ...item,
                                selected: true,
                              };
                            }),
                          };
                          setCurrentChosedGroup(duplicateCurrChosed);

                          let tempValue: roleObject[] = [
                            ...CreateUserForm.values.roles,
                          ];

                          tempValue[currIndex] = duplicateCurrChosed;
                          CreateUserForm.setFieldValue("roles", tempValue);
                        }
                        return;
                      }}
                    />
                    <FormControlLabel
                      control={<Checkbox size="small" />}
                      label="Jadikan sebagai default"
                      disabled={currentChosedGroup.roles.every(
                        (e) => e.selected == false
                      )}
                      checked={currentChosedGroup.isDefault}
                      onChange={() => {
                        if (
                          CreateUserForm.values.roles.every(
                            (e: roleObject) => e.isDefault == false
                          )
                        ) {
                          let currIndex =
                            CreateUserForm.values?.roles.findIndex(
                              (e: roleObject) =>
                                e.group_name === currentChosedGroup?.group_name
                            );

                          let dupRolesFormikValue: roleObject[] = [
                            ...CreateUserForm.values.roles,
                          ];
                          dupRolesFormikValue[currIndex].isDefault = true;
                          setCurrentChosedGroup(dupRolesFormikValue[currIndex]);
                          CreateUserForm.setFieldValue(
                            "roles",
                            dupRolesFormikValue
                          );
                          return;
                        } else {
                          if (currentChosedGroup.isDefault == true) {
                            let currIndex =
                              CreateUserForm.values?.roles.findIndex(
                                (e: roleObject) =>
                                  e.group_name ===
                                  currentChosedGroup?.group_name
                              );

                            let dupRolesFormikValue: roleObject[] = [
                              ...CreateUserForm.values.roles,
                            ];
                            dupRolesFormikValue[currIndex].isDefault = false;
                            setCurrentChosedGroup(
                              dupRolesFormikValue[currIndex]
                            );
                            CreateUserForm.setFieldValue(
                              "roles",
                              dupRolesFormikValue
                            );
                            return;
                          } else {
                            alert(
                              "you already chosed another group to be default"
                            );
                          }
                        }
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {CreateUserForm.errors.roles ? (
          <FormHelperText
            sx={{
              color: "red",
            }}
          >
            {CreateUserForm.errors.roles}
          </FormHelperText>
        ) : null}
        {(CreateUserForm.errors as any).isOneOfRolesPermissionSelected ? (
          <FormHelperText
            sx={{
              color: "red",
            }}
          >
            {(CreateUserForm.errors as any).isOneOfRolesPermissionSelected}
          </FormHelperText>
        ) : null}

        <div className="flex justify-end gap-2">
          <MainCustomButtonDeny>CANCEL</MainCustomButtonDeny>
          <MainCustomButton
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              CreateUserForm.handleSubmit();
            }}
          >
            Simpan
          </MainCustomButton>
        </div>
      </form>

      {/* CHANGE PASSWORD CONFIRMATIO DIALOG */}
      <ChangePasswordConfirmation
        onClose={() => setChangePasswordConfirm(false)}
        open={changePasswordConfirm}
        onConfirm={() => {
          setChangePasswordConfirm(false);
          setChangePassword(true);
        }}
      />

      {/* CHANGE PASSWORD MAIN DIALOG */}
      <ChangePasswordMain
        onClose={() => setChangePassword(false)}
        open={changePassword}
        onSubmit={() => {
          setChangePassword(false);
        }}
      />
    </div>
  );
};

export default EditUserADMIN;
