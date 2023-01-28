import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Cart } from "models/Product";

export const useCartLocalStorage = (): {
  cart: Cart;
  setCart: Dispatch<SetStateAction<Cart>>;
} => {
  const [cart, setCart] = useState<Cart>([]);

  useEffect(() => {
    const localCart = JSON.parse(window.localStorage.getItem("cart") || "[]") as Cart;
    if (localCart.length) setCart(localCart);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return { cart, setCart };
};
