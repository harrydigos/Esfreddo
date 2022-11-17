import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

export type Store = {
  id: number;
  address: string | null;
  city: string | null;
  state: string | null;
  lat: number | null;
  lng: number | null;
  image: string | null;
};

export const useStores = () => {
  const supabase = useSupabaseClient();
  return useQuery(["stores"], async () => {
    const { data, error } = await supabase.from("stores").select();

    if (error) throw error;
    if (data) {
      const d = data as Store[];

      return d.map((store) => ({
        ...store,
        image: `https://fkxrzgowoswekolvadsi.supabase.co/storage/v1/object/public/store-images/${store.id}.jpg`,
      }));
    }
  });
};
