import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { Product } from "models/Product";

export const useProducts = (query: string): UseQueryResult<Product[]> => {
  const supabase = useSupabaseClient();

  return useQuery(["products", query], async ({ signal }) => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike(`name`, `%${query}%`)
      .abortSignal(signal!);

    if (error) throw error;
    if (data) return data as Product[];
  });
};
