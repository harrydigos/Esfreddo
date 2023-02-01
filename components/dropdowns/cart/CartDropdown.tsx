import { BagIcon } from "@components/icons";
import OrderCompleteModal from "@components/modals/OrderComplete";
import { useNavbarContext } from "@components/navbar/NavbarProvider";
import { useUserCartContext } from "@components/user/UserCartProvider";
import { useCloseDropdown } from "@hooks/useCloseDropdown";
import { useUser } from "@supabase/auth-helpers-react";
import { CartProduct } from "models/Product";
import Link from "next/link";
import { useRef, useState } from "react";
import CartDropdownProvider, { useCartDropdownContext } from "./CartDropdownProvider";

const CartDropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useCloseDropdown<HTMLDivElement>(wrapperRef, setShowDropdown);

  return (
    <div ref={wrapperRef} className="relative">
      <CartDropdownProvider showDropdown={showDropdown} setShowDropdown={setShowDropdown}>
        <CartDropdown.Button />
        <CartDropdown.Content />
        <OrderCompleteModal />
      </CartDropdownProvider>
    </div>
  );
};

export default CartDropdown;

CartDropdown.Button = function () {
  const { totalProducts } = useUserCartContext();
  const { setShowDropdown } = useCartDropdownContext();

  if (!totalProducts) return null;

  return (
    <button
      onClick={() => setShowDropdown((oldValue) => !oldValue)}
      className="relative inline-flex cursor-pointer select-none rounded-full bg-coffee-cream p-[6px]"
    >
      <BagIcon className="stroke-coffee-dark" height={32} />
      <div className="absolute bottom-0 -right-1 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-coffee-dark text-xs leading-none text-coffee-cream">
        {totalProducts}
      </div>
    </button>
  );
};

CartDropdown.Content = function () {
  const { cart, totalCartPrice, totalProducts } = useUserCartContext();
  const { showDropdown } = useCartDropdownContext();
  const { visible } = useNavbarContext();

  if (!visible || !showDropdown || !totalProducts) return null;

  return (
    <div className="absolute top-full left-1/2 z-50 mt-3 w-80 max-w-sm -translate-x-1/2 overflow-hidden rounded-xl border border-black/5 bg-white text-sm font-medium text-dark">
      <div className="flex max-h-80 flex-col gap-4 overflow-y-auto py-4">
        {cart.map((product) => (
          <CartDropdown.Product key={product.id} product={product} />
        ))}
      </div>
      <div className="flex items-center justify-between border-y-2 border-black/5 px-4 py-3 text-right text-base font-semibold">
        <div>Total Price</div>
        <div>{totalCartPrice} $</div>
      </div>
      <div className="flex w-full font-semibold">
        <ClearCart />
        <Checkout />
      </div>
    </div>
  );
};

CartDropdown.Product = function ({ product }: { product: CartProduct }) {
  const { removeFromCart } = useUserCartContext();

  return (
    <div className="flex items-center justify-between gap-4 px-4">
      <div className="flex flex-col gap-1">
        <div className="max-w-[230px] truncate whitespace-nowrap font-medium">{product.name}</div>
        <div className="inline-flex">
          <div className="w-[88px] opacity-75">Quantity: {product.quantity}</div>
          <button onClick={() => removeFromCart(product.id)} className="text-xs text-red-600 underline">
            Remove
          </button>
        </div>
      </div>
      <div className="whitespace-nowrap font-medium">{product.price} $</div>
    </div>
  );
};

const ClearCart = () => {
  const { clearCart } = useUserCartContext();

  return (
    <button onClick={() => clearCart()} className="w-1/2 py-3 text-red-600 transition-colors hover:bg-gray-50">
      Clear cart
    </button>
  );
};

const Checkout = () => {
  const user = useUser();
  const { setShowDropdown, setShowCompleteModal } = useCartDropdownContext();
  const { clearCart, purchaseCart } = useUserCartContext();

  const styles = `w-1/2 bg-coffee-cream-light py-3 text-coffee-dark text-center transition-colors duration-200 hover:bg-coffee-cream/50 `;

  const handlePurchase = async () => {
    await purchaseCart();

    clearCart();
    setShowDropdown(false);
    setShowCompleteModal(true);
  };

  if (!user) {
    return (
      <Link onClick={() => setShowDropdown(false)} href="/login" className={styles}>
        Login to checkout
      </Link>
    );
  }

  return (
    <button onClick={handlePurchase} className={styles}>
      Checkout
    </button>
  );
};
