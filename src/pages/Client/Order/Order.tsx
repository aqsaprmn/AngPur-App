import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useCartStore } from "@app/zustand/Cart/Cart";
import CardCart from "@app/components/Card/CardCart";
import { Autocomplete, FormHelperText, TextField } from "@mui/material";
import { GETListShipping } from "@app/Services/Shipping";
import Swal from "sweetalert2";
import { useAuthStore } from "@app/zustand/Auth/auth";
import { NumericFormat } from "react-number-format";
import { useFormik } from "formik";
import {
  GETListOrder,
  PATCHCancelOrder,
  PATCHConfirmOrder,
  PATCHReceivedOrder,
  POSTCreateOrder,
} from "@app/Services/Order";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const EWALLET_PROVIDER = ["Dana", "Ovo", "ShopeePay", "Gopay"];
const VABANK_PROVIDER = ["BNI", "BRI", "BCA", "Mandiri", "BSI"];

export default function BasicTabs() {
  const navigate = useNavigate();
  const cartStore = useCartStore((state) => state);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const { uuid } = useAuthStore((state: any) => state);
  const [provider, setProvider] = React.useState<string[]>([]);
  const [value, setValue] = React.useState(0);
  const [shipping, setShipping] = React.useState([]);
  const [orderConfirmationPayment, setOrderConfirmationPayment] =
    React.useState([]);
  const [orderProcess, setOrderProcess] = React.useState([]);
  const [orderDelivery, setOrderDelivery] = React.useState([]);
  const [doneProcess, setDoneProcess] = React.useState([]);
  const [cancelProcess, setCancelProcess] = React.useState([]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    event;
    setValue(newValue);
  };

  const { handleSubmit, errors, values, setFieldValue } = useFormik({
    initialValues: {
      orders: [
        {
          detail: {
            uuid: "",
            note: "",
            total: 0,
            price: 0,
          },
        },
      ],
      user: {
        uuid: uuid,
      },
      shipping: {
        uuid: "",
      },
      payment: {
        method: "COD",
        provider: "Self",
        priceTotal: 0,
      },
    },
    onSubmit: async (val, { resetForm }) => {
      const fetching = await POSTCreateOrder(val);

      if (fetching.isSuccess) {
        return Swal.fire({
          title: "Success",
          text: "Order successfull",
          icon: "success",
          timer: 4000,
          timerProgressBar: true,
        }).then((res) => {
          res;
          resetForm();
          cartStore.setCart({ cart: [] });
          cartStore.setTotalProduct({ totalProduct: 0 });
          navigate("/");
        });
      }

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong",
        icon: "error",
      });
    },
    validationSchema: Yup.object().shape({
      shipping: Yup.object().shape({
        uuid: Yup.string().min(3).max(50).required("Shipping is required"),
      }),
      payment: Yup.object().shape({
        method: Yup.string().min(3).max(30).required("Method is required"),
        provider: Yup.string().min(3).max(30).required("Provider is required"),
      }),
    }),
    validateOnChange: false,
  });

  const fetchShipping = async () => {
    try {
      const fetching = await GETListShipping({ user_uuid: uuid });

      const process = fetching.data.data.map((item: any, index: number) => {
        return {
          id: item.shipping.uuid,
          no: index + 1,
          address: item.shipping.address,
          number: item.shipping.number,
          rtrw: `${item.shipping.rt}/${item.shipping.rw}`,
          village: item.shipping.village,
          status: item.shipping.active,
          all: item.shipping,
        };
      });

      setShipping(process);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  const fetchConfirmationPaymentOrder = async () => {
    try {
      const fetching = await GETListOrder({ user_uuid: uuid, status: "O" });

      const process = fetching.data.data.map((item: any, index: number) => {
        let totalOrder = 0;

        item.detail.forEach((item: any) => {
          totalOrder += item.total;
        });

        return {
          id: index + 1,
          parent_uuid: item.parent_uuid,
          totalOrder,
          totalPrice: item.payment.total,
          detail: item.detail,
          all: item,
        };
      });

      setOrderConfirmationPayment(process);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  const fetchProcessOrder = async () => {
    try {
      const fetching = await GETListOrder({ user_uuid: uuid, status: "P" });

      const process = fetching.data.data.map((item: any, index: number) => {
        let totalOrder = 0;

        item.detail.forEach((item: any) => {
          totalOrder += item.total;
        });

        return {
          id: index + 1,
          parent_uuid: item.parent_uuid,
          totalOrder,
          totalPrice: item.payment.total,
          detail: item.detail,
          status: item.detail[0].status,
          all: item,
        };
      });

      setOrderProcess(process);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  const fetchDeliveryOrder = async () => {
    try {
      const fetching = await GETListOrder({ user_uuid: uuid, status: "D" });

      const process = fetching.data.data.map((item: any, index: number) => {
        let totalOrder = 0;

        item.detail.forEach((item: any) => {
          totalOrder += item.total;
        });

        return {
          id: index + 1,
          parent_uuid: item.parent_uuid,
          totalOrder,
          totalPrice: item.payment.total,
          detail: item.detail,
          status: item.detail[0].status,
          all: item,
        };
      });

      setOrderDelivery(process);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  const fetchDoneOrder = async () => {
    try {
      const fetching = await GETListOrder({ user_uuid: uuid, status: "Y" });

      const process = fetching.data.data.map((item: any, index: number) => {
        let totalOrder = 0;

        item.detail.forEach((item: any) => {
          totalOrder += item.total;
        });

        return {
          id: index + 1,
          parent_uuid: item.parent_uuid,
          totalOrder,
          totalPrice: item.payment.total,
          detail: item.detail,
          status: item.detail[0].status,
          all: item,
        };
      });

      setDoneProcess(process);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  const fetchCancelOrder = async () => {
    try {
      const fetching = await GETListOrder({ user_uuid: uuid, status: "C" });

      const process = fetching.data.data.map((item: any, index: number) => {
        let totalOrder = 0;

        item.detail.forEach((item: any) => {
          totalOrder += item.total;
        });

        return {
          id: index + 1,
          parent_uuid: item.parent_uuid,
          totalOrder,
          totalPrice: item.payment.total,
          detail: item.detail,
          status: item.detail[0].status,
          all: item,
        };
      });

      setCancelProcess(process);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  const processConfirmationPayment = async (uuid: string) => {
    try {
      const fetching = await PATCHConfirmOrder({
        uuid,
      });

      if (fetching.isSuccess) {
        return Swal.fire({
          title: "Confirmation Payment",
          text: fetching.data.message,
          icon: "success",
          timer: 4000,
          timerProgressBar: true,
        }).then(() => {
          navigate("/");
        });
      }

      return Swal.fire({
        title: "Oops",
        text: fetching.data.message,
        icon: "error",
        timer: 4000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  const processCancelOrder = async (uuid: string) => {
    try {
      const fetching = await PATCHCancelOrder({
        uuid,
      });

      if (fetching.isSuccess) {
        return Swal.fire({
          title: "Cancel Order",
          text: fetching.data.message,
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }

      return Swal.fire({
        title: "Oops",
        text: fetching.data.message,
        icon: "error",
      });
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  const processAcceptOrder = async (uuid: string) => {
    try {
      const fetching = await PATCHReceivedOrder({
        uuid,
      });

      if (fetching.isSuccess) {
        return Swal.fire({
          title: "Order Acceepted",
          text: fetching.data.message,
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      }

      return Swal.fire({
        title: "Oops",
        text: fetching.data.message,
        icon: "error",
      });
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  React.useEffect(() => {
    let newTotalPrice: number = 0;

    if (cartStore.cart.length > 0) {
      cartStore.cart.forEach((item) => {
        newTotalPrice += parseInt(item.product.price) * item.product.total;
      });

      const orders = cartStore.cart.map((item) => {
        return {
          detail: {
            uuid: item.product.uuid,
            note: item.product.note,
            total: item.product.total,
            price: item.product.price,
          },
        };
      });

      setFieldValue("orders", orders);
    }

    setFieldValue("payment.priceTotal", newTotalPrice);
    setTotalPrice(newTotalPrice);
  }, [cartStore.cart]);

  React.useEffect(() => {
    fetchShipping();
    fetchConfirmationPaymentOrder();
    fetchProcessOrder();
    fetchDeliveryOrder();
    fetchDoneOrder();
    fetchCancelOrder();
  }, []);

  return (
    <>
      <div className=" text-2xl font-bold">Order List</div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Cart" {...a11yProps(0)} />
            <Tab label="Payment" {...a11yProps(1)} />
            <Tab label="Process" {...a11yProps(2)} />
            <Tab label="Delivery" {...a11yProps(3)} />
            <Tab label="Completed" {...a11yProps(4)} />
            <Tab label="Cancel" {...a11yProps(5)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="grid grid-cols-4 gap-2">
            <div className="col-span-2 min-h-80 border rounded">
              <div className="text-center font-bold border-b-2 pb-2 pt-3">
                Cart
              </div>
              {cartStore.cart.length > 0 ? (
                <div className="p-3">
                  {cartStore.cart.map((product: any, i: number) => {
                    return (
                      <div key={i} className="">
                        <CardCart product={product} total={false} />
                      </div>
                    );
                  })}
                  <div className="flex justify-between pt-4">
                    <div className="font-bold">
                      Total Order: {cartStore.totalProduct}
                    </div>
                    <div className="font-bold">
                      Total Price:{" "}
                      <NumericFormat
                        value={totalPrice}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp. "}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 h-full justify-center items-center">
                  <div>There is no product in cart to ordered.</div>
                  <div>
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="bg-blue-600 rounded px-3 py-2 text-white hover:bg-blue-700"
                    >
                      Go to Menu
                    </button>
                  </div>
                </div>
              )}
            </div>
            {cartStore.cart.length > 0 && (
              <>
                <div className="col-span-1 border rounded h-fit p-3">
                  <div className="text-center font-bold border-b-2 pb-2">
                    Shipping
                  </div>
                  <div className="py-4">
                    <div className="flex flex-col gap-1">
                      <Autocomplete
                        size="small"
                        id="grup"
                        filterSelectedOptions={true}
                        options={[...shipping]}
                        getOptionLabel={(opt: any) =>
                          `${opt.address}, ${opt.village}`
                        }
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
                        onChange={(_e, v) => {
                          _e;
                          setFieldValue("shipping.uuid", v.id);
                        }}
                        isOptionEqualToValue={(option, label) =>
                          option.id == label.id
                        }
                      />
                      {errors.shipping?.uuid ? (
                        <FormHelperText sx={{ color: "red" }}>
                          {errors.shipping?.uuid}
                        </FormHelperText>
                      ) : null}{" "}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 border rounded h-fit p-3">
                  <div className="text-center font-bold border-b-2 pb-2">
                    Payment
                  </div>
                  <div className="py-4">
                    <div className="flex flex-col gap-1 mb-3">
                      <label htmlFor="method">Method</label>
                      <Autocomplete
                        size="small"
                        id="method"
                        filterSelectedOptions={true}
                        options={["COD", "VA-BANK", "E-WALLET"]}
                        value={values.payment.method}
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
                        onChange={(_e, v) => {
                          if (v != null) {
                            if (v === "VA-BANK") {
                              setProvider(VABANK_PROVIDER);
                            } else if (v === "E-WALLET") {
                              setProvider(EWALLET_PROVIDER);
                            }

                            setFieldValue("payment.provider", "");

                            setFieldValue("payment.method", v);
                          }
                        }}
                        isOptionEqualToValue={(option, label) =>
                          option == label
                        }
                      />
                    </div>
                    {values.payment.method !== "COD" &&
                      values.payment.method !== "" && (
                        <div className="flex flex-col gap-1 mb-3">
                          <label htmlFor="method">Provider</label>
                          <Autocomplete
                            size="small"
                            id="provider"
                            filterSelectedOptions={true}
                            value={values.payment.provider}
                            options={[...provider]}
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
                            onChange={(_e, v) => {
                              if (v != null) {
                                setFieldValue("payment.provider", v);
                              }
                            }}
                            isOptionEqualToValue={(option, label) =>
                              option == label
                            }
                          />
                        </div>
                      )}
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          navigate("/");
                        }}
                        className="bg-gray-300 rounded px-3 py-2 text-white hover:bg-gray-400"
                      >
                        Back Menu
                      </button>
                      <button
                        onClick={() => {
                          Swal.fire({
                            title: "Order",
                            text: "Are you sure?",
                            icon: "question",
                            showDenyButton: true,
                            showCloseButton: false,
                          }).then((res) => {
                            if (res.isConfirmed) {
                              handleSubmit();
                            }
                          });
                        }}
                        className="bg-blue-600 rounded px-3 py-2 text-white hover:bg-blue-700"
                      >
                        Order
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="grid grid-cols-4 gap-2">
            <div className="min-h-80 border col-span-2 rounded">
              <div className="text-center font-bold border-b-2 pb-2 pt-3">
                Confirmation Payment
              </div>
              {orderConfirmationPayment.length > 0 ? (
                <div className="p-3">
                  {orderConfirmationPayment.map((detail: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className="border p-2 rounded flex flex-col gap-2"
                      >
                        <div className="text-sm text-gray-500">
                          ORDER-ID:{" "}
                          <span className="font-bold">
                            {detail.parent_uuid}
                          </span>
                        </div>
                        <div className="p-3 border rounded">
                          {detail.detail.map((detail: any, di: number) => {
                            return (
                              <div
                                key={di}
                                className=" max-h-48 overflow-y-auto"
                              >
                                <CardCart product={detail} noteEdit={false} />
                              </div>
                            );
                          })}
                        </div>{" "}
                        <div className="flex justify-between pt-4">
                          <div className="font-bold">
                            Total Order: {detail.totalOrder}
                          </div>
                          <div className="font-bold">
                            Total Price:{" "}
                            <NumericFormat
                              value={detail.totalPrice}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"Rp. "}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              Swal.fire({
                                title: "Order",
                                text: "Are you sure?",
                                icon: "question",
                                showDenyButton: true,
                                showCloseButton: false,
                              }).then((res) => {
                                if (res.isConfirmed) {
                                  processCancelOrder(detail.parent_uuid);
                                }
                              });
                            }}
                            className="bg-gray-400 rounded px-3 py-2 text-white hover:bg-gray-500 duration-500"
                          >
                            Cancel Order
                          </button>
                          <button
                            onClick={() => {
                              Swal.fire({
                                title: "Order",
                                text: "Are you sure?",
                                icon: "question",
                                showDenyButton: true,
                                showCloseButton: false,
                              }).then((res) => {
                                if (res.isConfirmed) {
                                  processConfirmationPayment(
                                    detail.parent_uuid
                                  );
                                }
                              });
                            }}
                            className="bg-blue-600 rounded px-3 py-2 text-white hover:bg-blue-700 duration-500"
                          >
                            Confirmation Payment
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-2 h-full justify-center items-center">
                  <div>There is no order need to confirmation payment.</div>
                  <div>
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="bg-blue-600 rounded px-3 py-2 text-white hover:bg-blue-700 duration-500"
                    >
                      Go to Menu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div className="grid grid-cols-4 gap-2">
            <div className="min-h-80 border col-span-2 rounded">
              <div className="text-center font-bold border-b-2 pb-2 pt-3">
                Order Process
              </div>
              {orderProcess.length > 0 ? (
                <div className="p-3">
                  {orderProcess.map((detail: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className="border p-2 rounded flex flex-col gap-2"
                      >
                        <div className="text-sm text-gray-500">
                          ORDER-ID:{" "}
                          <span className="font-bold">
                            {detail.parent_uuid}
                          </span>
                        </div>
                        <div className="p-3 border rounded">
                          <div className="max-h-48 overflow-y-auto">
                            {detail.detail.map((detail: any, di: number) => {
                              return (
                                <div key={di}>
                                  <CardCart product={detail} noteEdit={false} />
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between pt-4 mb-2">
                            <div className="font-bold">
                              Total Order: {detail.totalOrder}
                            </div>
                            <div className="font-bold">
                              Total Price:{" "}
                              <NumericFormat
                                value={detail.totalPrice}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp. "}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Haven't delivered
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-2 h-full justify-center items-center">
                  <div>There is no order processed.</div>
                  <div>
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="bg-blue-600 rounded px-3 py-2 text-white hover:bg-blue-700 duration-500"
                    >
                      Go to Menu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div className="grid grid-cols-4 gap-2">
            <div className="min-h-80 border col-span-2 rounded">
              <div className="text-center font-bold border-b-2 pb-2 pt-3">
                Order Delivery
              </div>
              {orderDelivery.length > 0 ? (
                <div className="p-3">
                  {orderDelivery.map((detail: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className="border p-2 rounded flex flex-col gap-2"
                      >
                        <div className="text-sm text-gray-500">
                          ORDER-ID:{" "}
                          <span className="font-bold">
                            {detail.parent_uuid}
                          </span>
                        </div>
                        <div className="p-3 border rounded">
                          <div className="max-h-48 overflow-y-auto">
                            {detail.detail.map((detail: any, di: number) => {
                              return (
                                <div key={di}>
                                  <CardCart product={detail} noteEdit={false} />
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between pt-4 mb-2">
                            <div className="font-bold">
                              Total Order: {detail.totalOrder}
                            </div>
                            <div className="font-bold">
                              Total Price:{" "}
                              <NumericFormat
                                value={detail.totalPrice}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp. "}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Is delivered
                          </div>
                        </div>
                        {detail.status === "D" && (
                          <div className="grid grid-cols-1">
                            <button
                              onClick={() => {
                                Swal.fire({
                                  title: "Order",
                                  text: "Are you sure?",
                                  icon: "question",
                                  showDenyButton: true,
                                  showCloseButton: false,
                                }).then((res) => {
                                  if (res.isConfirmed) {
                                    processAcceptOrder(detail.parent_uuid);
                                  }
                                });
                              }}
                              className="bg-blue-600 rounded px-3 py-2 text-white hover:bg-blue-700 duration-500"
                            >
                              Confirmation Accepted
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-2 h-full justify-center items-center">
                  <div>There is no order processed.</div>
                  <div>
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="bg-blue-600 rounded px-3 py-2 text-white hover:bg-blue-700 duration-500"
                    >
                      Go to Menu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <div className="grid grid-cols-4 gap-2">
            <div className="min-h-80 border col-span-2 rounded">
              <div className="text-center font-bold border-b-2 pb-2 pt-3">
                Order Completed
              </div>
              {doneProcess.length > 0 ? (
                <div className="p-3">
                  {doneProcess.map((detail: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className="border p-2 rounded flex flex-col gap-2"
                      >
                        <div className="text-sm text-gray-500">
                          ORDER-ID:{" "}
                          <span className="font-bold">
                            {detail.parent_uuid}
                          </span>
                        </div>
                        <div className="p-3 border rounded">
                          <div className="max-h-48 overflow-y-auto">
                            {detail.detail.map((detail: any, di: number) => {
                              return (
                                <div key={di}>
                                  <CardCart product={detail} noteEdit={false} />
                                </div>
                              );
                            })}
                          </div>
                          <div className="flex justify-between pt-4 mb-2">
                            <div className="font-bold">
                              Total Order: {detail.totalOrder}
                            </div>
                            <div className="font-bold">
                              Total Price:{" "}
                              <NumericFormat
                                value={detail.totalPrice}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"Rp. "}
                              />
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">Completed</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-2 h-full justify-center items-center">
                  <div>There is no order completed.</div>
                  <div>
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="bg-blue-600 rounded px-3 py-2 text-white hover:bg-blue-700 duration-500"
                    >
                      Go to Menu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <div className="grid grid-cols-4 gap-2">
            <div className="min-h-80 border col-span-2 rounded">
              <div className="text-center font-bold border-b-2 pb-2 pt-3">
                Order Cancel
              </div>
              {cancelProcess.length > 0 ? (
                <div className="p-3">
                  {cancelProcess.map((detail: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className="border p-2 rounded flex flex-col gap-2"
                      >
                        <div className="text-sm text-gray-500">
                          ORDER-ID:{" "}
                          <span className="font-bold">
                            {detail.parent_uuid}
                          </span>
                        </div>
                        <div className="p-3 border rounded">
                          <div className="max-h-48 overflow-y-auto">
                            {detail.detail.map((detail: any, di: number) => {
                              return (
                                <div key={di}>
                                  <CardCart product={detail} noteEdit={false} />
                                </div>
                              );
                            })}
                          </div>
                          <div>{detail.status === "C" && "Canceled"} </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-2 h-full justify-center items-center">
                  <div>There is no order cancaled.</div>
                  <div>
                    <button
                      onClick={() => {
                        navigate("/");
                      }}
                      className="bg-blue-600 rounded px-3 py-2 text-white hover:bg-blue-700 duration-500"
                    >
                      Go to Menu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CustomTabPanel>
      </Box>
    </>
  );
}
