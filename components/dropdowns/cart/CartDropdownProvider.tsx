import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useState } from "react";

type CartDropdownProps = {
  showDropdown: boolean;
  setShowDropdown: Dispatch<SetStateAction<boolean>>;
};

const CartDropdownContext = createContext<
  CartDropdownProps & { showCompleteModal: boolean; setShowCompleteModal: Dispatch<SetStateAction<boolean>> }
>({
  showDropdown: false,
  setShowDropdown: () => {},
  showCompleteModal: false,
  setShowCompleteModal: () => {},
});

const CartDropdownProvider: FC<PropsWithChildren<CartDropdownProps>> = ({ children, ...props }) => {
  const [showCompleteModal, setShowCompleteModal] = useState(false);

  return (
    <CartDropdownContext.Provider value={{ ...props, showCompleteModal, setShowCompleteModal }}>
      {children}
    </CartDropdownContext.Provider>
  );
};

export const useCartDropdownContext = () => useContext(CartDropdownContext);

export default CartDropdownProvider;
