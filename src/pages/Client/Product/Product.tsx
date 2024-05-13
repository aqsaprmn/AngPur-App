import CardProduct from "@app/components/Card/CardProduct";
import { GETListProduct } from "@app/Services/Product";
import { useMemo, useState } from "react";
import Swal from "sweetalert2";

const ProductPage = () => {
  const [product, setProduct] = useState<any[]>([]);

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
              image={item.image}
              name={item.name}
              price={item.price}
              stock={item.stock}
              sold={item.sold}
              uuid={item.uuid}
              key={item.id}
              id={item.no}
              cart={item.cart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductPage;
