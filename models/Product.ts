export type Product = {
  id: number;
  name: string | null;
  price: number | null;
  category: string | null;
};

export type BoughtProduct = {
  id: number;
  product_id: number;
  user_id: number;
  quantity: number;
};

export type CartProduct = Product & { quantity: number };
export type Cart = CartProduct[];
