import { SearchIcon } from "@components/icons";
import Spinner from "@components/loader/Spinner";
import Store from "@components/stores/Store";
import { useDebounce } from "@hooks/useDebounce";
import { useStores } from "@hooks/useStores";
import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import styles from "./searchBar.module.scss";

const StoresSidebar = () => {
  const [search, setSearch] = useState<string>("");
  const debounceSearch = useDebounce(search);
  const { data: storesData, isFetching } = useStores(debounceSearch);

  return (
    <div className="flex h-screen items-center">
      <div
        className="h-3/4 w-[448px] rounded-2xl border border-white/20 bg-white/50 drop-shadow-[0px_16px_32px_rgba(133,133,133,0.5)]
       backdrop-blur-[8px]"
      >
        <div className="flex h-full flex-col gap-3 p-3">
          <Searchbar setSearch={setSearch} />
          <div className="relative h-full overflow-y-auto scrollbar-hide">
            {isFetching ? (
              <Spinner />
            ) : (
              <div className="flex flex-col gap-[5px] p-[5px]">
                {storesData && storesData.map((store) => <Store key={store.id} {...store} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoresSidebar;

const Searchbar = ({ setSearch }: { setSearch: Dispatch<SetStateAction<string>> }) => {
  return (
    <div className="top-3 w-full border-b border-dark/10 pb-3">
      <div className="relative">
        <input
          className={classNames(styles.searchBar)}
          type="text"
          placeholder="Address, city, or state"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute top-1/2 left-3 -translate-y-1/2">
          <SearchIcon className="stroke-coffee-dark" width={20} height={20} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};
