import { MainCustomButtonDeny } from "@app/components/Buttons";
import { GETDetailProduct } from "@app/Services/Product/Product";
import { Dialog, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductDetailDialog = ({
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
    description: string;
    image: string;
    filename: string;
    stock: number;
    sold: number;
    price: string;
  }>({
    name: "",
    description: "",
    filename: "",
    image: "",
    stock: 0,
    sold: 0,
    price: "",
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

      fetching.data.data.product.price = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(fetching.data.data.product.price);

      setDetail(fetching.data.data.product);
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
        <span className="text-md font-semibold">Detail Product</span>
      </div>
      <div className="mb-5 flex flex-wrap justify-between gap-5">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex">
              <div className="flex w-full">
                <img
                  className=" h-52 w-full object-cover"
                  src={detail.image}
                  alt={detail.filename}
                />
              </div>
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
                disabled
                value={detail.name}
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
                disabled
                value={detail.description}
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
            </div>
            <div className="grid grid-cols-3 gap-2">
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
                  disabled
                  name="stock"
                  id="stock"
                  value={detail.stock}
                  sx={{
                    borderRadius: "4px",
                    borderColor: "#DDDDDD !important",
                    fontSize: "12px",
                    "& .Mui-disabled": {
                      borderColor: "red !important",
                    },
                  }}
                />{" "}
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="sold"
                  className="text-text-title text-base font-bold"
                >
                  Sold
                </label>
                <TextField
                  type="number"
                  className="lrt-small-textfield"
                  size="small"
                  disabled
                  name="sold"
                  id="sold"
                  value={detail.sold}
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
                  htmlFor="price"
                  className="text-text-title text-base font-bold"
                >
                  Price
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  disabled
                  name="price"
                  id="price"
                  value={detail.price}
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
      </div>
    </Dialog>
  );
};

export default ProductDetailDialog;
