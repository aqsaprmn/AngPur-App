import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";
import { NumericFormat } from "react-number-format";

export default function CardProduct({
  product,
  setProduct,
  image,
  name,
  uuid,
  sold,
  stock,
  price,
  cart,
  id,
}: {
  product: any[];
  setProduct: (e: any) => void;
  image: string;
  name: string;
  uuid: string;
  sold: number;
  stock: number;
  price: string;
  cart: number;
  id: number;
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
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
        <div className="flex items-center justify-between w-full px-2 gap-4">
          <div>
            <Link
              to={`/product/detail/${uuid}`}
              className="bg-blue-500 text-sm p-2 rounded text-white"
            >
              Detail
            </Link>
          </div>
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
                  if (i === id) {
                    item.cart += 1;
                  }
                });

                setProduct(newProduct);
              }}
              className=" bg-gray-100 hover:cursor-pointer hover:bg-gray-200 rounded"
            >
              +
            </button>
          </div>
        </div>
      </CardActions>
    </Card>
  );
}
