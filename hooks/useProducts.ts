import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CHECKBOXES } from "@utils/productFilters";
import { ProductFilterType } from "@appTypes/productFilter";
import { Product } from "models/Product";

export const useProducts = (query: string, filters: ProductFilterType, sort: string): UseQueryResult<Product[]> => {
  const supabase = useSupabaseClient();

  return useQuery(
    ["products", query, filters, sort],
    async ({ signal }) => {
      if (filters.categories.length === 0) filters.categories = Array.from(CHECKBOXES);
      let sortBy = isPriceAscending(sort);

      let productsQuery = supabase
        .from("products")
        .select("*")
        .ilike(`name`, `%${query}%`)
        .in("category", filters.categories)
        .gte("price", filters.price.min)
        .lte("price", filters.price.max)
        .abortSignal(signal!);

      if (typeof sortBy === "boolean") productsQuery = productsQuery.order("price", { ascending: sortBy });

      const { data, error } = await productsQuery;

      if (error) throw error;
      if (data) return data as Product[];
    },
    { refetchOnWindowFocus: false }
  );
};

/**
 * Returns true if sort is ascending, false if descending, undefined if not price
 */
const isPriceAscending = (sort: string): boolean | undefined => {
  if (sort.includes("Low-High")) return true;
  if (sort.includes("High-Low")) return false;
  return undefined;
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
