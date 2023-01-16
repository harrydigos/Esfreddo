import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { Grid2, Grid3, SearchIcon } from "@components/icons";
import { Dropdown } from "@components/dropdown/Dropdown";

const getProducts = (query: string): Promise<string[]> => {
  const products = [
    "Colombian Blend Coffee Beans",
    "Kenyan Dark Roast Coffee Beans",
    "Ethiopian Medium Roast Coffee Beans",
    "Sumatra Mandheling Coffee Beans",
    "Brazilian Santos Coffee Beans",
    "Guatemalan Antigua Coffee Beans",
    "French Roast Coffee Beans",
    "Italian Roast Coffee Beans",
    "Vienna Roast Coffee Beans",
    "Espresso Roast Coffee Beans",
    "Decaffeinated Coffee Beans",
    "Organic Coffee Beans",
    "Fair Trade Coffee Beans",
    "Rainforest Alliance Coffee Beans",
    "Whole Bean Coffee",
    "Ground Coffee",
    "Instant Coffee",
    "Coffee Pods",
    "Coffee K-Cups",
    "Coffee Capsules",
    "Coffee Filters",
    "French Press Coffee Maker",
    "Pour Over Coffee Maker",
    "Drip Coffee Maker",
    "Espresso Machine",
    "Moka Pot",
    "Siphon Brewer",
    "Cold Brew Coffee Maker",
    "Handheld Milk Frother",
    "Electric Milk Frother",
    "Coffee Grinder",
    "Burr Coffee Grinder",
    "Blade Coffee Grinder",
    "Manual Coffee Grinder",
    "Coffee Scale",
    "Coffee Tamper",
    "Coffee Scoop",
    "Coffee Stirrer",
    "Coffee Mug",
    "Travel Coffee Mug",
    "Insulated Coffee Carafe",
    "Coffee Thermos",
    "Coffee Tumbler",
    "Coffee Cup Warmer",
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.filter((product) => product.toLocaleLowerCase().includes(query.toLocaleLowerCase())));
    }, Math.random() * 1000);
  });
};

const dropdownItems = ["Featured", "Price", "Rating"] as const;
type DropdownItem = typeof dropdownItems[number];

const filterOut = (current: DropdownItem): DropdownItem[] => dropdownItems.filter((item) => item !== current);

const useSearchDebounce = (query: string, delay: number = 300) => {
  const [debounceValue, setDebounceValue] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(query);
    }, delay);
    return () => clearTimeout(timeout);
  }, [query, delay]);

  return debounceValue;
};

const Products: NextPage = () => {
  const [itemsPerRow, setItemsPerRow] = useState<2 | 3>(3);
  const [sort, setSort] = useState<DropdownItem>("Featured");

  const filteredDropdownItems = useMemo(() => filterOut(sort), [sort]);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const debounceQuery = useSearchDebounce(searchQuery);

  useEffect(() => {
    (async () => {
      setSearchResults([]);

      if (debounceQuery.length) {
        const data = await getProducts(debounceQuery);
        setSearchResults(data);
      }
    })();
  }, [debounceQuery]);

  return (
    <>
      <div className="container mx-auto pt-24">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-4xl font-medium text-dark">Products</h1>
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

        {/* TODO:
        - Add loading state
        - When there are no results, show the all products (pagination will be added later)
        */}
        <div className="mt-6 flex w-full flex-col">
          {!searchResults.length ? (
            <div>All products</div>
          ) : (
            searchResults.map((result) => <div key={result}>{result}</div>)
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
