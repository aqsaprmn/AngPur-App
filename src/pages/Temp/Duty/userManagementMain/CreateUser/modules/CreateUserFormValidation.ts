import { roleObject } from "@app/utils/constants/types";
import * as Yup from "yup";

export const CreateUserFormValidation = Yup.object().shape({
  fullName: Yup.string().min(5).required(),
  username: Yup.string().min(3).required(),
  // photo: Yup.string(),
  password: Yup.string().min(4).required(),
  // email: Yup.string().email().required(),
  // phoneNumber: Yup.string().min(10).required(),
  roles: Yup.array()
    .of(
      Yup.object().shape({
        group_name: Yup.string().min(3).required(),
        isDefault: Yup.boolean().required(),
        roles: Yup.array().of(
          Yup.object().shape({
            role_name: Yup.string().min(2).required(),
            permissions: Yup.array().of(
              Yup.object().shape({
                permission_name: Yup.string(),
                status: Yup.boolean(),
              })
            ),
            selected: Yup.boolean(),
          })
        ),
      })
    )
    .min(1)
    .required(),
  isOneOfRolesPermissionSelected: Yup.array()
    .of(
      Yup.array().of(
        Yup.object().shape({
          group_name: Yup.string().min(3).required(),
          isDefault: Yup.boolean().required(),
          roles: Yup.array().of(
            Yup.object().shape({
              role_name: Yup.string().min(2).required(),
              permissions: Yup.array().of(
                Yup.object().shape({
                  permission_name: Yup.string(),
                  status: Yup.boolean(),
                })
              ),
              selected: Yup.boolean(),
            })
          ),
        })
      )
    )
    .test({
      test: (val, context) => {
        console.log("ini val", val);
        let defineArr: boolean[] = [];
        console.log("ini context", context.parent);
        context.parent.roles.map((item: roleObject) => {
          item.roles.some((e) => e.selected == true)
            ? defineArr.push(true)
            : defineArr.push(false);
        });

        if (defineArr.every((e) => e === true)) {
          return true;
        }
        return false;
      },
      message: "some of the group you've are not being assign to any role",
    }),
});
