import { useCartLocalStorage } from "@hooks/useCartLocalStorage";
import { Cart, CartProduct } from "models/Product";
import { createContext, FC, PropsWithChildren, useContext } from "react";

const UserCartContext = createContext({
  cart: [] as Cart,
  addToCart: (product: CartProduct) => {},
  removeFromCart: (productId: number) => {},
  clearCart: () => {},
  totalProducts: 0,
});

const UserCartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { cart, setCart } = useCartLocalStorage();

  const addToCart = (product: CartProduct) => {
    const productExist = cart.find((cartProduct) => cartProduct.id === product.id);

    if (productExist) {
      setCart((prevCart) => {
        return prevCart.map((cartProduct) => {
          const productFound = cartProduct.id === product.id;

          if (productFound) return { ...cartProduct, quantity: cartProduct.quantity + 1 };
          else return cartProduct;
        });
      });
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((cartProduct) => cartProduct.id !== productId));
  };

  const clearCart = () => setCart([]);

  const totalProducts = cart.reduce((acc, product) => acc + product.quantity, 0);

  return (
    <UserCartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalProducts }}>
      {children}
    </UserCartContext.Provider>
  );
};

export const useUserContext = () => useContext(UserCartContext);

export default UserCartProvider;
