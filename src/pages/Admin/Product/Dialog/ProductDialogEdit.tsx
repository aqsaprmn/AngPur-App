import {
  MainCustomButton,
  MainCustomButtonDeny,
  MainCustomOutlinedButton,
} from "@app/components/Buttons";
import {
  GETDetailProduct,
  PATCHEditProduct,
} from "@app/Services/Product/Product";
import { Dialog, FormHelperText, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import * as Yup from "yup";

const ProductEditDialog = ({
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
  const imageRef = useRef<any>();
  const [product, setProduct] = useState<any>({});
  const { values, errors, setFieldValue, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        uuid: "",
        name: "",
        description: "",
        stock: 0,
        price: 0,
        image: "",
      },
      onSubmit: async (val, { resetForm }) => {
        try {
          const body: any = {
            uuid: val.uuid,
            name: val.name,
            description: val.description,
            stock: val.stock,
            price: val.price,
          };

          if (val.image !== "") {
            body.image = val.image;
          }

          const fetching = await PATCHEditProduct({ body });

          if (fetching.isSuccess) {
            onClose();

            resetForm();
            setTotalTick();
            return Swal.fire({
              title: "Success",
              text: "Edit data successfull",
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
      validationSchema: Yup.object().shape({
        name: Yup.string().min(3).max(30).required(),
        description: Yup.string().min(3).max(100).required(),
        stock: Yup.number().min(1).required(),
        price: Yup.number().min(1).required(),
        image: Yup.mixed()
          .test({
            message:
              "Please provide a supported image file type [png, jpg, jpeg]",
            test: (file: any, context) => {
              if (file) {
                const isValidExt = ["png", "jpg", "jpeg"];

                const filenameBefore = file.name;
                const splitName = filenameBefore.split(".");
                const extFile = splitName[1];
                const validateExt = isValidExt.includes(extFile);

                if (!validateExt) {
                  return context.createError();
                }
              }

              return true;
            },
          })
          .test({
            message: "Please provide a supported image file size less than 5mb",
            test: (file: any, context) => {
              if (file) {
                const sizeFile = file.size;

                if (!(sizeFile > 5000)) {
                  return context.createError();
                }
              }

              return true;
            },
          }),
      }),
      validateOnChange: false,
    });

  const fetchData = async () => {
    try {
      const fetching = await GETDetailProduct({ uuid });

      if (fetching.isError) {
        return Swal.fire({
          title: "Oops",
          text: fetching.data.message,
          icon: "error",
        });
      }

      const product = fetching.data.data.product;

      setFieldValue("uuid", product.uuid);
      setFieldValue("name", product.name);
      setFieldValue("description", product.description);
      setFieldValue("stock", product.stock);
      setFieldValue("price", product.price);

      setProduct(product);
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
        <span className="text-md font-semibold">Edit Product</span>
      </div>
      <div className="mb-5 flex flex-wrap justify-between gap-5">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex">
              <div className="flex w-full">
                <img
                  className=" h-52 w-full object-cover"
                  src={product.image}
                  alt={product.filename}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <MainCustomOutlinedButton
                props={{
                  children:
                    values.image == null ? "Choose Image" : "Change Image",
                  onClick: () => {
                    imageRef.current.click();
                  },
                  onMouseEnter: () => console.log(errors),
                  size: "small",
                }}
              />
              <div className="w-2">
                {values.image != null ? (
                  <span className="text-xs text-ellipsis overflow-hidden">
                    {(values.image as any).name}
                  </span>
                ) : null}
              </div>
              {errors.image ? (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.image}
                </FormHelperText>
              ) : null}{" "}
              <input
                hidden
                ref={imageRef}
                type="file"
                onChange={(e) => {
                  if (e.target.files) {
                    let file = e.target.files[0];
                    if (
                      file.name.includes("jpg") ||
                      file.name.includes("jpeg") ||
                      file.name.includes("png")
                    ) {
                      setFieldValue("image", e.target.files[0]);
                    }
                  }
                }}
              />
            </div>
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
                value={values.name}
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
              {errors.name ? (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.name}
                </FormHelperText>
              ) : null}{" "}
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="description"
                className="text-text-title text-base font-bold"
              >
                Description
              </label>
              <TextField
                className="lrt-small-textfield"
                size="small"
                value={values.description}
                onChange={handleChange}
                name="description"
                id="description"
                sx={{
                  borderRadius: "4px",
                  borderColor: "#DDDDDD !important",
                  fontSize: "12px",
                  "& .Mui-disabled": {
                    borderColor: "red !important",
                  },
                }}
              />
              {errors.description ? (
                <FormHelperText sx={{ color: "red" }}>
                  {errors.description}
                </FormHelperText>
              ) : null}{" "}
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="stock"
                  className="text-text-title text-base font-bold"
                >
                  Stock
                </label>
                <TextField
                  type="number"
                  className="lrt-small-textfield"
                  size="small"
                  name="stock"
                  id="stock"
                  value={values.stock}
                  onChange={(e) => {
                    setFieldValue("stock", Math.abs(parseInt(e.target.value)));
                  }}
                  sx={{
                    borderRadius: "4px",
                    borderColor: "#DDDDDD !important",
                    fontSize: "12px",
                    "& .Mui-disabled": {
                      borderColor: "red !important",
                    },
                  }}
                />{" "}
                {errors.stock ? (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.stock}
                  </FormHelperText>
                ) : null}{" "}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="price"
                  className="text-text-title text-base font-bold"
                >
                  Price
                </label>
                <TextField
                  type="number"
                  className="lrt-small-textfield"
                  size="small"
                  name="price"
                  id="price"
                  value={values.price}
                  onChange={(e) => {
                    setFieldValue("price", Math.abs(parseInt(e.target.value)));
                  }}
                  sx={{
                    borderRadius: "4px",
                    borderColor: "#DDDDDD !important",
                    fontSize: "12px",
                    "& .Mui-disabled": {
                      borderColor: "red !important",
                    },
                  }}
                />{" "}
                {errors.price ? (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.price}
                  </FormHelperText>
                ) : null}{" "}
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

export default ProductEditDialog;
