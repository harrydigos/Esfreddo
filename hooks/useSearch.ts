import { useQuery } from "@tanstack/react-query";
import { StoreType } from "models/StoreType";

export const useSearch = ({
  search,
  storesData,
}: {
  search: string;
  storesData?: StoreType[];
}) => {
  return useQuery({
    queryKey: ["stores", search],
    queryFn: () => {
      return storesData?.filter((store: StoreType) => {
        return (
          store.address?.toLowerCase().includes(search.toLowerCase()) ||
          store.city?.toLowerCase().includes(search.toLowerCase()) ||
          store.state?.toLowerCase().includes(search.toLowerCase())
        );
      });
    },
  });
};
