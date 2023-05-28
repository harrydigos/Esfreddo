import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { StoreType } from "models/StoreType";

export const useStores = (keyword?: string): UseQueryResult<StoreType[]> => {
  const supabase = useSupabaseClient();
  return useQuery(
    ["stores", keyword || "all"],
    async ({ signal }) => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .or(`address.ilike.%${keyword}%,city.ilike.%${keyword}%,state.ilike.%${keyword}%`)
        .abortSignal(signal!);

      if (error) throw error;
      if (data) return data as StoreType[];
    },
    {
      enabled: typeof keyword !== "undefined",
      refetchOnWindowFocus: false,
    }
  );
};
