import { Product } from "models/Product";
import { FC } from "react";

const ProductCard: FC<Product> = ({ name, price }) => {
  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="h-64 w-full rounded-t-lg bg-coffee-cream-light" />
        <div className="flex w-full flex-col justify-between gap-1 rounded-b-lg border-x-2 border-b-2 border-coffee-cream-light px-4 py-5">
          <div className="truncate text-lg font-medium text-dark">{name}</div>
          <div className="text-coffee-dark">$ {price}</div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
