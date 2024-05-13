import CardProduct from "@app/components/Card/CardProduct";
import { GETListProduct } from "@app/Services/Product";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";
import DetailProductDialog from "./Detail/DetailProductDialog";

const ProductPage = () => {
  const [product, setProduct] = useState<any[]>([]);
  const [productDetail, setProductDetail] = useState<any>({});
  const [detailDialog, setDetailDialog] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const fetching = await GETListProduct();

      const result = fetching.data;

      const process = result.data.map((item: any, index: number) => {
        return {
          id: item.product.uuid,
          no: index,
          name: item.product.name,
          description: item.product.description,
          stock: item.product.stock,
          sold: item.product.sold !== null ? item.product.sold : 0,
          image: item.product.image,
          price: item.product.price,
          cart: 0,
          all: item.product,
        };
      });

      setProduct(process);
    } catch (error) {
      console.error(error);

      return Swal.fire({
        title: "Oops",
        text: "Something went wrongerror",
        icon: "error",
      });
    }
  };

  useMemo(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="gap-4 grid grid-cols-4">
        {product.map((item) => {
          return (
            <CardProduct
              product={product}
              setProduct={setProduct}
              setProductDetail={setProductDetail}
              setDetailDialog={setDetailDialog}
              image={item.image}
              name={item.name}
              price={item.price}
              stock={item.stock}
              sold={item.sold}
              key={item.id}
              all={item.all}
              id={item.no}
              cart={item.cart}
            />
          );
        })}
      </div>
      <DetailProductDialog
        data={productDetail}
        open={detailDialog}
        onClose={() => setDetailDialog(false)}
      />
    </div>
  );
};

export default ProductPage;
