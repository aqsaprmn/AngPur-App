import { MainCustomButtonDeny } from "@app/components/Buttons";
import { GETDetailShipping } from "@app/Services/Shipping";
import { Dialog, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ShippingDetailDialog = ({
  uuid,
  onClose,
  open,
}: {
  uuid: string;
  open: boolean;
  onClose: any;
}) => {
  const [detail, setDetail] = useState<{
    address: string;
    number: string;
    rt: string;
    rw: string;
    village: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
    active: string;
  }>({
    address: "",
    number: "",
    rt: "",
    rw: "",
    village: "",
    district: "",
    city: "",
    province: "",
    postalCode: "",
    active: "",
  });

  const fetchData = async () => {
    try {
      const fetching = await GETDetailShipping({ uuid });

      if (fetching.isError) {
        return Swal.fire({
          title: "Oops",
          text: fetching.data.message,
          icon: "error",
        });
      }

      setDetail(fetching.data.data.shipping);
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
        <span className="text-md font-semibold">Detail Shipping</span>
      </div>
      {detail !== undefined && (
        <div className="mb-5 flex flex-wrap justify-between gap-5">
          <div className="flex-1">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="address"
                  className="text-text-title text-base font-bold"
                >
                  Address
                </label>
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  name="address"
                  id="address"
                  disabled
                  value={detail.address}
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
                    htmlFor="number"
                    className="text-text-title text-base font-bold"
                  >
                    Number
                  </label>
                  <TextField
                    className="lrt-small-textfield"
                    size="small"
                    name="number"
                    id="number"
                    value={detail.number}
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
                    htmlFor="rt"
                    className="text-text-title text-base font-bold"
                  >
                    RT
                  </label>
                  <TextField
                    className="lrt-small-textfield"
                    size="small"
                    name="rt"
                    id="rt"
                    value={detail.rt}
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
                    htmlFor="rw"
                    className="text-text-title text-base font-bold"
                  >
                    RW
                  </label>
                  <TextField
                    className="lrt-small-textfield"
                    size="small"
                    name="rw"
                    value={detail.rw}
                    id="rw"
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
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="district"
                    className="text-text-title text-base font-bold"
                  >
                    District
                  </label>
                  <TextField
                    className="lrt-small-textfield"
                    size="small"
                    name="district"
                    id="district"
                    disabled
                    value={detail.district}
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
                    htmlFor="village"
                    className="text-text-title text-base font-bold"
                  >
                    Village
                  </label>
                  <TextField
                    className="lrt-small-textfield"
                    size="small"
                    name="village"
                    id="village"
                    disabled
                    value={detail.village}
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
                    htmlFor="postalCode"
                    className="text-text-title text-base font-bold"
                  >
                    Postal Code
                  </label>
                  <TextField
                    className="lrt-small-textfield"
                    size="small"
                    name="postalCode"
                    value={detail.postalCode}
                    disabled
                    id="postalCode"
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
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="city"
                    className="text-text-title text-base font-bold"
                  >
                    City
                  </label>
                  <TextField
                    className="lrt-small-textfield"
                    size="small"
                    name="city"
                    value={detail.city}
                    disabled
                    id="city"
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
                    htmlFor="province"
                    className="text-text-title text-base font-bold"
                  >
                    Province
                  </label>
                  <TextField
                    className="lrt-small-textfield"
                    size="small"
                    name="province"
                    value={detail.province}
                    disabled
                    id="province"
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
      )}
      <div className="flex flex-wrap justify-end gap-2">
        <MainCustomButtonDeny onClick={onClose}>Close</MainCustomButtonDeny>
      </div>
    </Dialog>
  );
};

export default ShippingDetailDialog;
