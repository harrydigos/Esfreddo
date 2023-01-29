import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";

const NavbarContext = createContext({ visible: true, setVisible: (visible: boolean) => {} });

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

  return <NavbarContext.Provider value={{ visible, setVisible }}>{children}</NavbarContext.Provider>;
};

export const useNavbarContext = () => useContext(NavbarContext);

export default NavbarProvider;
