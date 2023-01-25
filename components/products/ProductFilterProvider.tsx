import { ProductFilterType } from "@appTypes/productFilter";
import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext } from "react";

type ProductFilterContextType = {
  filters: ProductFilterType;
  setFilters: Dispatch<SetStateAction<ProductFilterType>>;
  initialPrice: ProductFilterType["price"];
};

const ProductFilterContext = createContext<ProductFilterContextType>({
  filters: {
    categories: [],
    price: { min: 0, max: 0 },
  },
  setFilters: () => {},
  initialPrice: { min: 0, max: 0 },
});

export const useProductFilterContext = () => useContext(ProductFilterContext);

const ProductFilterProvider: FC<PropsWithChildren<ProductFilterContextType>> = ({ children, ...props }) => {
  return <ProductFilterContext.Provider value={{ ...props }}>{children}</ProductFilterContext.Provider>;
};

export default ProductFilterProvider;
