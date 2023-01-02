import { NextPage } from "next";
import { useState } from "react";
import classNames from "classnames";
import { ArrowDown, Grid2, Grid3 } from "@components/icons";
import { Dropdown } from "@components/dropdown/Dropdown";

export type SortByType = "Featured" | "Price" | "Rating";

const Products: NextPage = () => {
  const [itemsPerRow, setItemsPerRow] = useState<2 | 3>(3);

  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("Featured");

  const toggleDropdown = () => setShowDropdown((oldValue) => !oldValue);

  const dropdownItems = (current: string): string[] => {
    const items = ["Featured", "Price", "Rating"] as string[];
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
            <div className="text-sm font-medium flex gap-2">
              <div className="text-coffee-light/80">Sort by</div>
              <button
                className={classNames(showDropdown ? "active" : null, "flex items-center gap-1 text-dark")}
                onClick={() => toggleDropdown()}
                onBlur={(e) => closeDropdown(e)}
              >
                {sort}
                {showDropdown && (
                  <Dropdown
                    items={dropdownItems(sort)}
                    selectItem={(item: string) => setSort(item)}
                    showDropdown={false}
                    toggleDropdown={() => toggleDropdown()}
                  />
                )}
                <ArrowDown className="stroke-dark" width={14} />
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
