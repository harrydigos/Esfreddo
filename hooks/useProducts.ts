import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CHECKBOXES } from "@utils/productFilters";
import { ProductFilterType } from "@appTypes/productFilter";
import { Product } from "models/Product";

export const useProducts = (query: string, filters: ProductFilterType): UseQueryResult<Product[]> => {
  const supabase = useSupabaseClient();

  return useQuery(
    ["products", query, filters],
    async ({ signal }) => {
      if (filters.categories.length === 0) filters.categories = Array.from(CHECKBOXES);

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike(`name`, `%${query}%`)
        .in("category", filters.categories)
        .gte("price", filters.price.min)
        .lte("price", filters.price.max)
        .abortSignal(signal!);

      if (error) throw error;
      if (data) return data as Product[];
    },
    { refetchOnWindowFocus: false }
  );
};

export const usePrice = (
  onSuccess: (data: { min: number; max: number }) => void
): UseQueryResult<{ min: number; max: number }> => {
  const supabase = useSupabaseClient();

  return useQuery(
    ["products"],
    async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) throw error;
      if (data) {
        const maxPrice = Math.max(...data.map((product) => product.price));
        const minPrice = Math.min(...data.map((product) => product.price));

        return { min: minPrice, max: maxPrice };
      }
    },
    { onSuccess, refetchOnWindowFocus: false }
  );
};
