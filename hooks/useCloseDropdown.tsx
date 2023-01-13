import { RefObject, useEffect } from "react";

/**
 * Hook that closes dropdown when clicked outside of it
 */
export const useCloseDropdown = <T extends HTMLElement>(ref: RefObject<T>, setDropdownState: (b: boolean) => void) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (ref.current && !ref.current.contains(e.target)) setDropdownState(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};
