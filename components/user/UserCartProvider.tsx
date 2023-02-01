import { useCartLocalStorage } from "@hooks/useCartLocalStorage";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Cart, CartProduct } from "models/Product";
import { createContext, FC, PropsWithChildren, useContext } from "react";

const UserCartContext = createContext({
  cart: [] as Cart,
  totalProducts: 0,
  totalCartPrice: 0,
  addToCart: (product: CartProduct) => {},
  removeFromCart: (productId: number) => {},
  clearCart: () => {},
  purchaseCart: async () => {},
});

const UserCartProvider: FC<PropsWithChildren> = ({ children }) => {
  const { cart, setCart } = useCartLocalStorage();
  const user = useUser();
  const supabase = useSupabaseClient();

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

  const purchaseCart = async () => {
    const productsToBuy = cart.map((product) => ({
      user_id: user!.id,
      product_id: product.id,
      quantity: product.quantity,
    }));

    const { data: products, error } = await supabase.from("bought_products").insert(productsToBuy).select();

    if (products) {
      (async () => {
        const { error } = await supabase.from("orders").insert({
          user_id: user!.id,
          bought_products_id: products.map((product) => parseInt(product["id"])),
          date: new Date(),
        });

        if (error) throw new Error(error.message);
      })();
    }
    if (error) throw new Error(error.message);
  };

  const totalProducts = cart.reduce((acc, product) => acc + product.quantity, 0);

  const totalCartPrice = cart.reduce((acc, product) => acc + product.price! * product.quantity, 0);

  return (
    <UserCartContext.Provider
      value={{ cart, totalProducts, totalCartPrice, addToCart, removeFromCart, clearCart, purchaseCart }}
    >
      {children}
    </UserCartContext.Provider>
  );
};

export const useUserCartContext = () => useContext(UserCartContext);

export default UserCartProvider;
