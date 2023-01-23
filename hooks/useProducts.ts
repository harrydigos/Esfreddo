import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CHECKBOXES } from "@utils/productFilters";
import { Product } from "models/Product";

export const useProducts = (query: string, filters: string[]): UseQueryResult<Product[]> => {
  const supabase = useSupabaseClient();

  return useQuery(["products", query, filters], async ({ signal }) => {
    if (filters.length === 0) filters = Array.from(CHECKBOXES);

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .ilike(`name`, `%${query}%`)
      .in("category", filters)
      .abortSignal(signal!);

    if (error) throw error;
    if (data) return data as Product[];
  });
};
