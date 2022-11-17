import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

export type StoreType = {
  id: number;
  address: string | null;
  city: string | null;
  state: string | null;
  lat: number | null;
  lng: number | null;
  image: string | null;
  time_open: string | null;
  time_close: string | null;
};

export const useStores = () => {
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
