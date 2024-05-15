import { useAuthStore } from "@app/zustand/Auth/auth";
import { CircularProgress, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";
import { ProcessLoginToken } from "@app/Services/Login";
import { MainCustomButton } from "@app/components/Buttons";
import { Link } from "react-router-dom";

const LoginClientPage = () => {
  const [loadingButton, setLoadingButton] = useState(false);

  const loginProcess = async (values: any) => {
    const loginGo = await ProcessLoginToken({
      body: {
        password: values.password,
        email: values.email,
      },
    });

    if (loginGo.isError) {
      return Swal.fire({
        title: "Oops!",
        text: "You might just throw wrong password or email",
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: "Let me try again",
      });
    }

    const result = loginGo.data;

    await Cookies.set("token", result.data.access_token);

    if (result.data.access_token) {
      let decoded = jwt_decode(result.data.access_token) as any;

      if (result.data.detail.role) {
        setRole({
          role: result.data.detail.role,
          initialRoute: "/",
        });

        setAuth({
          uuid: result.data.detail.uuid,
          email: result.data.detail.email,
          name: result.data.detail.name,
        });

        setSubAuth({
          value: decoded.sub,
        });

        setTimeout(() => {
          window.location.reload();
        }, 0);
      }
    } else {
      return Swal.fire({
        title: "Oops!",
        text: "You might just throw wrong password or email",
        icon: "info",
        showConfirmButton: true,
        confirmButtonText: "Let me try again",
      });
    }
  };

  const { setAuth, setRole, setSubAuth } = useAuthStore((state: any) => state);

  const [loading, setLoading] = useState(false);
  const { handleChange, values, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, e) => {
      setLoadingButton(true);
      e.setSubmitting(false);
      await loginProcess(values);
      setLoading(false);
      setLoadingButton(false);
    },
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
        <div className="text-3xl text-center font-bold mb-10">Sign In</div>
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
        </div>
        <div className="mb-3">
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
          Haven't account?{" "}
          <Link to={"/register"} className="font-bold underline">
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginClientPage;
