import { useOrderHistory } from "@components/user/history/OrderHistoryProvider";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { _supabaseClient } from "@utils/supabase";
import { Order } from "models/Order";
import { BoughtProduct, CartProduct } from "models/Product";
import { Dispatch, SetStateAction } from "react";

export const useOrders = (): UseQueryResult<Order[]> => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const { setOrders, setSelectedOrder } = useOrderHistory();

  return useQuery(
    ["orders"],
    async () => {
      const { data, error } = await supabase
        .from("orders")
        .select()
        .eq("user_id", user!.id)
        .order("id", { ascending: false });

      if (error) throw error;
      if (data) return data as Order[];
    },
    {
      enabled: !!user,
      onSuccess: (orders) => {
        setOrders(orders);
        setSelectedOrder(orders[0]);
      },
    }
  );
};

const getProducts = async (boughtProducts: BoughtProduct[]) => {
  const { data, error } = await _supabaseClient
    .from("products")
    .select()
    .or(boughtProducts.map((product) => `id.eq.${product.product_id}`).join(","));

  const products = data as CartProduct[];

  if (error) throw error;
  if (products) {
    products.map((product, i) => (product.quantity = boughtProducts[i].quantity));
    return products;
  }
};

export const useBoughtProducts = (
  setBoughtProducts: Dispatch<SetStateAction<CartProduct[]>>
): UseQueryResult<CartProduct[]> => {
  const supabase = useSupabaseClient();
  const { selectedOrder } = useOrderHistory();

  return useQuery(
    ["boughtProducts", selectedOrder],
    async () => {
      const { data, error } = await supabase
        .from("bought_products")
        .select()
        .or(selectedOrder!.bought_products_id!.map((id) => `id.eq.${id}`).join(","));
      const boughtProducts = data as BoughtProduct[];

      if (error) throw error;
      if (boughtProducts) return getProducts(boughtProducts);
    },
    { enabled: !!selectedOrder, onSuccess: (products) => setBoughtProducts(products) }
  );
};
