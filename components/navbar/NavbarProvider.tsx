import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";

const NavbarContext = createContext({ visible: true });

const NavbarProvider: FC<PropsWithChildren> = ({ children }) => {
  const [, setYOffset] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setYOffset((oldValue) => {
      setVisible(oldValue > window.pageYOffset || window.pageYOffset < 64);
      return window.pageYOffset;
    });
  };

  return <NavbarContext.Provider value={{ visible }}>{children}</NavbarContext.Provider>;
};

export const useNavbarContext = () => useContext(NavbarContext);

export default NavbarProvider;
