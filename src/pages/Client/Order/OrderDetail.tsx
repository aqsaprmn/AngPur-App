import CardCart from "@app/components/Card/CardCart";
import { GETDetailOrder } from "@app/Services/Order";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { NumericFormat } from "react-number-format";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const OrderDetailAdminPage = () => {
  const params = useParams();
  const parent_uuid = params.uuid;
  const [orderDetail, setOrderDetail] = useState<{
    parent_uuid: string;
    user_uuid: string;
    detail: {
      uuid: string;
      user_uuid: string;
      parent_uuid: string;
      product_uuid: string;
      note: string;
      total: number;
      price: string;
      order_date: string;
      status: string;
      deleted_at: string | null;
      created_at: string;
      updated_at: string;
      product: {
        name: string;
      };
    }[];
    payment: {
      paid: string;
      total: string;
      payment_date: string;
    };
    user: {
      name: string;
    };
  }>({
    parent_uuid: "",
    user_uuid: "",
    detail: [
      {
        uuid: "",
        user_uuid: "",
        parent_uuid: "",
        product_uuid: "",
        note: "",
        total: 1,
        price: "",
        order_date: "",
        status: "",
        deleted_at: "",
        created_at: "",
        updated_at: "",
        product: {
          name: "",
        },
      },
    ],
    payment: {
      paid: "",
      total: "",
      payment_date: "",
    },
    user: {
      name: "",
    },
  });

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const fetching = await GETDetailOrder({ uuid: parent_uuid as string });

      setOrderDetail(fetching.data.data);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrong error",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <span className="text-lg font-semibold">Order Detail</span>
      </div>
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => {
            navigate("/admin/order");
          }}
          className="text-lg flex items-center gap-2 text-gray-500 rounded px-2 py-1 duration-500 hover:bg-gray-300 font-semibold"
        >
          <BsArrowLeft /> Back
        </button>
      </div>
      <div>
        <div className="border bg-white p-3 rounded flex flex-col gap-2">
          <div className="gap-2 grid">
            <div className="flex justify-between text-sm text-gray-500">
              <div>
                ORDER-ID:{" "}
                <span className="font-bold">{orderDetail.parent_uuid}</span>
              </div>
              <div className="font-bold">
                Total Price:{" "}
                <NumericFormat
                  value={orderDetail.payment.total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="font-bold">Haven't delivered</div>
              <div className="text-gray-500 text-sm">
                Payment Date:{" "}
                {orderDetail.payment.payment_date
                  ? dayjs(orderDetail.payment.payment_date).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )
                  : "-"}
              </div>
            </div>
          </div>
          <div className="p-3 border rounded">
            <div className="max-h-48 overflow-y-auto">
              {orderDetail.detail.map((detail: any, di: number) => {
                return (
                  <div key={di}>
                    <CardCart product={detail} noteEdit={false} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailAdminPage;
