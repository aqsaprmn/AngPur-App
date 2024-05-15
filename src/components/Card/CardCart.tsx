import { useCartStore } from "@app/zustand/Cart/Cart";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NumericFormat } from "react-number-format";

export default function CardCart({
  product,
  noteEdit = true,
  total = true,
}: {
  product: any;
  noteEdit?: boolean;
  total?: boolean;
}) {
  const cartStore = useCartStore((state) => state);

  return (
    <>
      <Card sx={{ display: "flex", mb: 1 }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={product.product.image}
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {product.product.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {product.product.description}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              p: 2,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <div className="flex flex-col">
              <div>
                Total: {!total ? product.product.total : product.total}x
              </div>
              <div>
                <NumericFormat
                  value={product.product.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp. "}
                />
              </div>
            </div>
            <div>
              {noteEdit ? (
                <TextField
                  className="lrt-small-textfield"
                  size="small"
                  value={product.product.note}
                  onChange={(e) => {
                    const newStore = [...cartStore.cart].map((item) => {
                      if (item.product.uuid === product.product.uuid) {
                        item.product.note = e.target.value;
                      }

                      return item;
                    });

                    cartStore.setCart({ cart: newStore });
                  }}
                  name="note"
                  placeholder="Note"
                  id="note"
                  sx={{
                    borderRadius: "4px",
                    borderColor: "#DDDDDD !important",
                    fontSize: "12px",
                    "& .Mui-disabled": {
                      borderColor: "red !important",
                    },
                  }}
                />
              ) : (
                <div className="text-sm text-gray-400">
                  {product.product.note}
                </div>
              )}
            </div>
          </Box>
        </Box>
      </Card>
    </>
  );
}
