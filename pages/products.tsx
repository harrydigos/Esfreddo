import { NextPage } from "next";
import { useMemo, useState } from "react";
import classNames from "classnames";
import { Grid2, Grid3 } from "@components/icons";
import { Dropdown } from "@components/dropdown/Dropdown";

const dropdownItems = ["Featured", "Price", "Rating"] as const;
type DropdownItem = typeof dropdownItems[number];

const filterOut = (current: DropdownItem): DropdownItem[] =>
  dropdownItems.filter((item) => item !== current);

const Products: NextPage = () => {
  const [itemsPerRow, setItemsPerRow] = useState<2 | 3>(3);
  const [sort, setSort] = useState<DropdownItem>("Featured");

  const filteredDropdownItems = useMemo(() => filterOut(sort), [sort]);

  return (
    <>
      <div className="container mx-auto pt-24">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-4xl font-medium text-dark">Products</h1>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="select-none text-sm  font-medium text-coffee-light/80">Sort by</div>
              <Dropdown<DropdownItem> active={sort} items={filteredDropdownItems} selectItem={(item) => setSort(item)} />
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
