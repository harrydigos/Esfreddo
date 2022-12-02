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
        .or(
          `address.ilike.%${keyword}%,city.ilike.%${keyword}%,state.ilike.%${keyword}%`
        )
        .abortSignal(signal!);

      if (error) throw error;
      if (data) {
        const d = data as StoreType[];

        return d.map((store) => ({
          ...store,
          image: `https://fkxrzgowoswekolvadsi.supabase.co/storage/v1/object/public/stores/${store.id}.jpg`,
        }));
      }
    },
    {
      enabled: typeof keyword !== "undefined",
      refetchOnWindowFocus: false,
    }
  );
};
