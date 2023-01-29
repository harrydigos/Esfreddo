import { Product } from "models/Product";
import { useUserCartContext } from "@components/user/UserCartProvider";
import { FC } from "react";
import { useNavbarContext } from "@components/navbar/NavbarProvider";

const ProductCard: FC<Product> = ({ ...props }) => {
  const { addToCart } = useUserCartContext();
  const { setVisible } = useNavbarContext();

  const handlePurchase = () => {
    setVisible(true);
    addToCart({ ...props, quantity: 1 });
  };

  return (
    <>
      <div className="flex h-full w-full flex-col">
        <div className="h-64 w-full rounded-t-lg bg-coffee-cream-light" />
        <div className="flex w-full flex-col justify-between gap-1 rounded-b-lg border-x-2 border-b-2 border-coffee-cream-light px-4 py-5">
          <div className="truncate text-lg font-medium text-dark">{props.name}</div>
          <div className="relative flex items-center justify-between text-coffee-dark">
            $ {props.price}
            <button
              className="rounded-md bg-coffee-dark px-4 py-2 text-base text-coffee-cream-light"
              onClick={handlePurchase}
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
