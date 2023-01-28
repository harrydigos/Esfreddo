import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
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

  const customCartDispatch: Dispatch<SetStateAction<Cart>> = useCallback((cart: Cart | ((prev: Cart) => Cart)) => {
    if (typeof cart === "function") {
      setCart((prev) => {
        const newCart = cart(prev);
        window.localStorage.setItem("cart", JSON.stringify(newCart));
        return newCart;
      });
      return;
    }
    window.localStorage.setItem("cart", JSON.stringify(cart));
    setCart(cart);
  }, []);

  return { cart, setCart: customCartDispatch };
};
