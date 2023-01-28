import { Product } from "models/Product";
import { useUserContext } from "@components/user/UserCartProvider";
import { FC } from "react";

const ProductCard: FC<Product> = ({ ...props }) => {
  const { addToCart } = useUserContext();

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="h-64 w-full rounded-t-lg bg-coffee-cream-light" />
        <div className="flex w-full flex-col justify-between gap-1 rounded-b-lg border-x-2 border-b-2 border-coffee-cream-light px-4 py-5">
          <div className="truncate text-lg font-medium text-dark">{props.name}</div>
          <div className="flex items-center justify-between text-coffee-dark">
            $ {props.price}
            <button
              className="rounded-md bg-coffee-dark px-4 py-2 text-base text-coffee-cream-light"
              onClick={() => addToCart({ ...props, quantity: 1 })}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
