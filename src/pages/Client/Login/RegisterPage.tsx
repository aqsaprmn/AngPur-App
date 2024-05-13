import { CircularProgress, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import { ProcessRegister } from "@app/Services/Login";
import { MainCustomButton } from "@app/components/Buttons";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [loadingButton, setLoadingButton] = useState(false);

  const [loading, setLoading] = useState(false);
  const { handleChange, values, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
      password_confirmation: Yup.string().required("Required"),
    }),
    onSubmit: async (values, e) => {
      setLoadingButton(true);

      const registerGo = await ProcessRegister({
        body: {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          password_confirmation: values.password_confirmation,
          role: "CLIENT",
        },
      });

      console.log(registerGo);

      e.setSubmitting(false);

      setLoading(false);

      setLoadingButton(false);

      if (registerGo.data.success) {
        return Swal.fire({
          title: "Registration",
          text: registerGo.data.message,
          icon: "success",
          timer: 4000,
          timerProgressBar: true,
        }).then((res) => {
          res;
          window.location.href = "/login";
        });
      }

      if (!registerGo.data.success) {
        return Swal.fire({
          title: "Registration",
          text: registerGo.data.message,
          icon: "error",
          timer: 4000,
          timerProgressBar: true,
        });
      }

      return Swal.fire({
        title: "Something went wrong",
        text: registerGo.data.message,
        icon: "error",
        timer: 4000,
        timerProgressBar: true,
      });
    },
    validateOnChange: false,
  });

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="w-full flex gap-2 justify-center py-10">
      <form
        id="form-submit"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="text-3xl text-center font-bold mb-10">Registration</div>
        <div className="mb-3">
          <div className="mb-1">
            <span className="text-xs font-semibold">Name</span>
          </div>
          <OutlinedInput
            id="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            size="small"
            fullWidth
            className="bg-transparent text-sm h-12"
            error={errors.name && touched.name ? true : false}
            sx={{
              borderRadius: "13px",
            }}
          />
          {errors.name && (
            <div className="text-sm text-red-500">{errors.name}</div>
          )}
        </div>
        <div className="mb-3">
          <div className="mb-1">
            <span className="text-xs font-semibold">Email</span>
          </div>
          <OutlinedInput
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            size="small"
            fullWidth
            className="bg-transparent text-sm h-12"
            error={errors.email && touched.email ? true : false}
            sx={{
              borderRadius: "13px",
            }}
          />
          {errors.email && (
            <div className="text-sm text-red-500">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <div className="mb-1">
            <span className="text-xs font-semibold">Phone</span>
          </div>
          <OutlinedInput
            id="phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            size="small"
            fullWidth
            className="bg-transparent text-sm h-12"
            error={errors.phone && touched.phone ? true : false}
            sx={{
              borderRadius: "13px",
            }}
          />
          {errors.phone && (
            <div className="text-sm text-red-500">{errors.phone}</div>
          )}
        </div>
        <div className="mb-3 flex gap-2">
          <div>
            <div className="mb-1">
              <span className="text-xs font-semibold">Password</span>
            </div>
            <OutlinedInput
              id="password"
              name="password"
              type={"password"}
              value={values.password}
              onChange={handleChange}
              size="small"
              fullWidth
              className="bg-transparent text-sm h-12"
              error={errors.password && touched.password ? true : false}
              sx={{
                borderRadius: "13px",
              }}
            />
            {errors.password && (
              <div className="text-sm text-red-500">{errors.password}</div>
            )}
          </div>
          <div>
            <div className="mb-1">
              <span className="text-xs font-semibold">
                Password Confirmation
              </span>
            </div>
            <OutlinedInput
              id="password_confirmation"
              name="password_confirmation"
              type={"password"}
              value={values.password_confirmation}
              onChange={handleChange}
              size="small"
              fullWidth
              className="bg-transparent text-sm h-12"
              error={
                errors.password_confirmation && touched.password_confirmation
                  ? true
                  : false
              }
              sx={{
                borderRadius: "13px",
              }}
            />
            {errors.password_confirmation && (
              <div className="text-sm text-red-500">
                {errors.password_confirmation}
              </div>
            )}
          </div>
        </div>
        <div className="mb-3">
          <MainCustomButton
            backgroundColor={"blue"}
            loading={loadingButton}
            fullWidth
            type="submit"
            id="form-submit-btn"
            className="h-11"
          >
            Sign In
          </MainCustomButton>
        </div>
        <div className=" text-sm text-center text-gray-500">
          Have an account?{" "}
          <Link to={"/login"} className="font-bold underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
