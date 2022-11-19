import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { StoreType } from "models/StoreType";

export const useStores = (): UseQueryResult<StoreType[]> => {
  const supabase = useSupabaseClient();
  return useQuery(["stores"], async () => {
    const { data, error } = await supabase.from("stores").select();

    if (error) throw error;
    if (data) {
      const d = data as StoreType[];

      return d.map((store) => ({
        ...store,
        image: `https://fkxrzgowoswekolvadsi.supabase.co/storage/v1/object/public/stores/${store.id}.jpg`,
      }));
    }
  });
};
