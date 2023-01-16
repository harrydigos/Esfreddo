import { FC } from "react";

type Product = {
  id: string;
  name: string;
};

const ProductCard: FC<Product> = (product) => {
  return <div key={product.id}>{product.name}</div>;
};

export default ProductCard;
