import { createContext, FC, PropsWithChildren, useContext } from "react";

type DropdownProps = {
  active: string;
  items: string[];
  selectItem: (item: string) => void;
};

const DropdownContext = createContext<DropdownProps>({ active: "", items: [], selectItem: () => {} });

export const useDropdownContext = () => useContext(DropdownContext);

const DropdownProvider: FC<PropsWithChildren<DropdownProps>> = ({ children, ...props }) => {
  return <DropdownContext.Provider value={{ ...props }}>{children}</DropdownContext.Provider>;
};

export default DropdownProvider;
