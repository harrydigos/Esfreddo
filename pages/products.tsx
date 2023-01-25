import { NextPage } from "next";
import { useCallback, useMemo, useState } from "react";
import classNames from "classnames";
import { Grid2, Grid3, SearchIcon } from "@components/icons";
import { Dropdown } from "@components/dropdown/Dropdown";
import ProductCard from "@components/products/ProductCard";
import Spinner from "@components/loader/Spinner";
import { usePrice, useProducts } from "@hooks/useProducts";
import { useDebounce } from "@hooks/useDebounce";
import ProductFilter from "@components/products/ProductFilter";
import { ProductFilterType } from "@appTypes/productFilter";
import ProductFilterProvider from "@components/products/ProductFilterProvider";

const dropdownItems = ["Featured", "Price", "Rating"] as const;
type DropdownItem = typeof dropdownItems[number];

const filterOut = (current: DropdownItem): DropdownItem[] => dropdownItems.filter((item) => item !== current);

const Products: NextPage = () => {
  const [itemsPerRow, setItemsPerRow] = useState<2 | 3>(3);
  const [sort, setSort] = useState<DropdownItem>("Featured");

  const filteredDropdownItems = useMemo(() => filterOut(sort), [sort]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [productFilters, setProductFilters] = useState<ProductFilterType>({
    categories: [],
    price: { min: 0, max: 0 },
  });

  const newPrice = useCallback((_priceRange: { min: number; max: number }) => {
    if (_priceRange) setProductFilters({ categories: [], price: { min: _priceRange.min, max: _priceRange.max } });
  }, []);

  const { data: initialPrice } = usePrice(newPrice);

  const debounceQuery = useDebounce(searchQuery);
  const debounceFilters = useDebounce(productFilters, 150);
  const { data: products, isFetching, isSuccess } = useProducts(debounceQuery, debounceFilters);

  const hasProducts = products?.length !== 0;

  return (
    <>
      <div className="container mx-auto pt-24">
        <div className="relative flex w-full items-center justify-between">
          <h1 className="text-4xl font-medium text-dark">Products</h1>

          <div className="absolute left-1/2 -translate-x-1/2">
            <div className="relative text-lg font-medium text-coffee-dark">
              <input
                className="h-12 w-96 rounded-xl border border-coffee-dark/10 p-3 pl-12 shadow-sm outline-none placeholder:text-coffee-light"
                type="text"
                placeholder="Search any product"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon
                className="absolute top-1/2 left-[14px] -translate-y-1/2 stroke-coffee-dark"
                width={20}
                height={20}
                strokeWidth={2}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <div className="select-none text-sm  font-medium text-coffee-light/80">Sort by</div>
              <Dropdown<DropdownItem>
                active={sort}
                items={filteredDropdownItems}
                selectItem={(item) => setSort(item)}
              />
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

        <div className="mt-8 flex gap-8">
          <ProductFilterProvider
            filters={productFilters}
            setFilters={setProductFilters}
            initialPrice={initialPrice || { min: 0, max: 0 }}
          >
            <ProductFilter />
          </ProductFilterProvider>
          <div className="relative min-h-screen flex-1">
            {isFetching && <Spinner />}
            {!hasProducts && isSuccess && (
              <div className="flex  w-full flex-col items-center p-16">
                <h1 className="text-2xl font-medium text-dark">No products found</h1>
                <p className="text-sm font-medium text-dark/80">Try changing your search or filter</p>
              </div>
            )}
            <div className={classNames(itemsPerRow === 3 ? "grid-cols-3" : "grid-cols-2", "grid gap-8")}>
              {hasProducts && products?.map((result) => <ProductCard key={result.id} {...result} />)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
