import { NextPage } from "next";
import { useState } from "react";
import classNames from "classnames";
import { ArrowDown, Grid2, Grid3 } from "@components/icons";
import { Dropdown } from "@components/dropdown/Dropdown";

export type SortByType = "Featured" | "Price" | "Rating";

const Products: NextPage = () => {
  const [itemsPerRow, setItemsPerRow] = useState<2 | 3>(3);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [sort, setSort] = useState<SortByType>("Featured");

  const toggleDropdown = () => setShowDropdown((oldValue) => !oldValue);

  const dropdownItems = (current: SortByType): SortByType[] => {
    const items = ["Featured", "Price", "Rating"] as SortByType[];
    return items.filter((item) => item !== current);
  };

  const closeDropdown = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (e.currentTarget === e.target) setShowDropdown(false);
  };

  return (
    <>
      <div className="container mx-auto pt-24">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-4xl font-medium text-dark">Products</h1>
          <div className="flex items-center gap-5">
            <div className="text-sm font-medium flex items-center gap-3">
              <div className="text-coffee-light/80 select-none">Sort by</div>
              <button
                className="relative inline-block rounded-md border border-gray-300 bg-white px-2 py-1 text-dark shadow-sm focus:outline-none focus:ring-1 focus:ring-coffee-light focus:ring-offset-2 focus:ring-offset-gray-100"
                onClick={() => toggleDropdown()}
                onBlur={(e) => closeDropdown(e)}
              >
                <div className="inline-flex items-center gap-1">
                  {sort}
                  <ArrowDown className="stroke-dark" width={14} />
                </div>
                {showDropdown && <Dropdown items={dropdownItems(sort)} selectItem={(item) => setSort(item)} />}
              </button>
            </div>
            <div className="flex items-center gap-1">
              <Grid3
                onClick={() => itemsPerRow !== 3 && setItemsPerRow(3)}
                className={classNames(itemsPerRow === 3 ? "fill-coffee-light" : "fill-dark/30", "cursor-pointer")}
                width={24}
              />
              <Grid2
                onClick={() => itemsPerRow !== 2 && setItemsPerRow(2)}
                className={classNames(itemsPerRow === 2 ? "fill-coffee-light" : "fill-dark/30", "cursor-pointer")}
                width={24}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
