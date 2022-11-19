import SearchIcon from "@components/icons/SearchIcon";
import Store from "@components/stores/Store";
import { useSearch } from "@hooks/useSearch";
import { useStores } from "@hooks/useStores";
import classNames from "classnames";
import { useState } from "react";
import styles from "./searchBar.module.scss";

const StoresSidebar = () => {
  const { data: storesData } = useStores();
  const [search, setSearch] = useState<string>("");
  const { data: searchResults } = useSearch({ search, storesData });
  const stores = searchResults || storesData;

  return (
    <div className="h-screen flex items-center">
      <div
        className="w-[400px] h-3/4 backdrop-blur-[8px] bg-white/50 border border-white/20 rounded-2xl
       drop-shadow-[0px_16px_32px_rgba(133,133,133,0.5)]"
      >
        <div className="flex h-full flex-col gap-3 p-3">
          <div className="top-3 w-full pb-3 border-b border-dark/10">
            <div className="relative">
              <input
                className={classNames(styles.searchBar)}
                type="text"
                placeholder="Address, city, or state"
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-3">
                <SearchIcon
                  className="stroke-coffee-dark"
                  width={20}
                  height={20}
                  strokeWidth={2}
                />
              </div>
            </div>
          </div>
          <div className="h-full overflow-y-auto scrollbar-hide">
            <div className="flex flex-col">
              {stores &&
                stores.map((store) => <Store key={store.id} {...store} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoresSidebar;
