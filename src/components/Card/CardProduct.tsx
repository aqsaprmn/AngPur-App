import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { useAuthStore } from "@app/zustand/Auth/auth";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useCartStore } from "@app/zustand/Cart/Cart";
import { BiTrash } from "react-icons/bi";

export default function CardProduct({
  product,
  setProduct,
  setProductDetail,
  setDetailDialog,
  image,
  name,
  sold,
  stock,
  price,
  cart,
  all,
  id,
}: {
  product: any[];
  setProduct: (e: any) => void;
  setProductDetail: (e: any) => void;
  setDetailDialog: (e: boolean) => void;
  image: string;
  name: string;
  sold: number;
  stock: number;
  price: string;
  cart: number;
  all: any;
  id: number;
}) {
  const navigate = useNavigate();
  const auth = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);
  const isLoggedin =
    "token" in Cookies.get() && auth.name.length > 1 && auth.role.length > 1
      ? true
      : false;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea
        onClick={() => {
          setProductDetail(all), setDetailDialog(true);
        }}
      >
        <div>
          <img src={image} alt={name} className=" h-60 w-full object-cover" />
        </div>
        <CardContent>
          <div className=" text-lg font-bold mb-2">{name}</div>
          <div className="mb-2">
            <NumericFormat
              value={price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp. "}
            />
          </div>
          <div className="flex justify-between items-center">
            <div>
              Stock: <span className="font-bold">{stock}</span>
            </div>
            <div>
              Sold: <span className="font-bold">{sold}</span>
            </div>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <div className="flex items-center justify-between w-full px-1 gap-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                const newProduct = [...product];

                newProduct.map((item: any, i: number) => {
                  if (item.cart > 0 && i === id) {
                    item.cart -= 1;
                  }
                });

                setProduct(newProduct);
              }}
              className=" bg-gray-100 hover:cursor-pointer hover:bg-gray-200 rounded"
            >
              -
            </button>
            <input
              className="p-1 border rounded text-center"
              type="number"
              min={0}
              max={stock}
              value={cart}
              onChange={(e) => {
                const newProduct = [...product];

                newProduct.map((item: any, i: number) => {
                  if (i === id) {
                    item.cart = Math.abs(parseInt(e.target.value));
                  }
                });

                setProduct(newProduct);
              }}
              onBlur={(e) => {
                const newProduct = [...product];

                newProduct.map((item: any, i: number) => {
                  if (i === id) {
                    if (e.target.value === "") {
                      item.cart = 0;
                    } else if (parseInt(e.target.value) > stock) {
                      item.cart = stock;
                    }
                  }
                });

                setProduct(newProduct);
              }}
            />
            <button
              onClick={() => {
                const newProduct = [...product];

                newProduct.map((item: any, i: number) => {
                  if (i === id && item.cart < stock) {
                    item.cart += 1;
                  }
                });

                setProduct(newProduct);
              }}
              className=" bg-gray-100 hover:cursor-pointer hover:bg-gray-200 rounded"
            >
              +
            </button>
          </div>{" "}
          <div className="flex gap-1">
            <button
              onClick={() => {
                if (!isLoggedin) {
                  return Swal.fire({
                    title: "Sign In",
                    text: "Please, sign in first to order product",
                    icon: "info",
                  }).then((res) => {
                    res;
                    navigate("/login");
                  });
                }

                if (cart === 0) {
                  return Swal.fire({
                    title: "Cart",
                    text: "Please, add quantity of the product",
                    icon: "info",
                  });
                }

                const newCart = {
                  product: {
                    uuid: all.uuid as string,
                    name,
                    price,
                    image,
                    description: all.description as string,
                    total: cart,
                    check: true,
                    note: "",
                  },
                };

                const mergeCart = [...cartStore.cart];

                const existProduct = mergeCart.find((item) => {
                  return item.product.uuid === newCart.product.uuid;
                });

                let goCart = [...mergeCart, newCart];

                if (existProduct) {
                  goCart = mergeCart.map((item) => {
                    if (item.product.uuid === newCart.product.uuid) {
                      item.product.total = newCart.product.total;
                    }

                    return item;
                  });
                }

                let totalProduct: number = 0;

                goCart.forEach((item) => {
                  totalProduct += item.product.total;
                });

                cartStore.setCart({ cart: goCart });
                cartStore.setTotalProduct({ totalProduct });
              }}
              className="bg-blue-500 hover:bg-blue-600 duration-500 text-sm p-2 rounded text-white"
            >
              Add
            </button>
            <button
              onClick={() => {
                if (!isLoggedin) {
                  return Swal.fire({
                    title: "Sign In",
                    text: "Please, sign in first to order product",
                    icon: "info",
                  }).then((res) => {
                    res;
                    navigate("/login");
                  });
                }

                const mergeCart = [...cartStore.cart];

                const existProduct = mergeCart.find((item) => {
                  return item.product.uuid === all.uuid;
                });

                if (!existProduct) {
                  return false;
                }

                const goCart = [...mergeCart].filter(
                  (item) => item.product.uuid !== all.uuid
                );

                console.log(goCart);

                let totalProduct: number = 0;

                goCart.forEach((item) => {
                  totalProduct += item.product.total;
                });

                const newProduct = [...product];

                newProduct.map((item: any, i: number) => {
                  if (i === id) {
                    item.cart = 0;
                  }
                });

                cartStore.setCart({ cart: goCart });
                cartStore.setTotalProduct({ totalProduct });
                setProduct(newProduct);
              }}
              className="bg-red-500 hover:bg-red-600 duration-500 text-sm p-2 rounded text-white"
            >
              <BiTrash />
            </button>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
