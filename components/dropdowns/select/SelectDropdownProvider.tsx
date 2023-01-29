import { createContext, FC, PropsWithChildren, useContext } from "react";

type SelectDropdownProps = {
  active: string;
  items: string[];
  selectItem: (item: string) => void;
};

const SelectDropdownContext = createContext<SelectDropdownProps>({ active: "", items: [], selectItem: () => {} });

export const useSelectDropdownContext = () => useContext(SelectDropdownContext);

const SelectDropdownProvider: FC<PropsWithChildren<SelectDropdownProps>> = ({ children, ...props }) => {
  return <SelectDropdownContext.Provider value={{ ...props }}>{children}</SelectDropdownContext.Provider>;
};

export default SelectDropdownProvider;
