import { createContext, FC, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

const NavbarContext = createContext({ visible: true });

let prevYOffset = 0;

const NavbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setVisible(prevYOffset > window.pageYOffset || window.pageYOffset < 64);
    prevYOffset = window.pageYOffset;
  };

  return <NavbarContext.Provider value={{ visible }}>{children}</NavbarContext.Provider>;
};

export const useNavbarContext = () => useContext(NavbarContext);

export default NavbarProvider;
