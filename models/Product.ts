export type Product = {
  id: number;
  name: string | null;
  price: number | null;
  category: string | null;
};

export type CartProduct = Product & { quantity: number };
export type Cart = CartProduct[];
