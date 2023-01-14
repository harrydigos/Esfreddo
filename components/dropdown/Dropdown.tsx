import { ArrowDown } from "@components/icons";
import { useCloseDropdown } from "@hooks/useCloseDropdown";
import { useRef, useState } from "react";

type DropdownProps<T extends string> = {
  active: T;
  items: T[];
  selectItem: (item: T) => void;
};

export const Dropdown = <T extends string>({ active, items, selectItem }: DropdownProps<T>) => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const toggleDropdown = () => setShowDropdown((oldValue) => !oldValue);

  const wrapperRef = useRef<HTMLDivElement>(null);
  useCloseDropdown<HTMLDivElement>(wrapperRef, setShowDropdown);

  return (
    <>
      <div ref={wrapperRef} className="relative inline-block text-sm font-medium text-dark">
        <button
          onClick={() => toggleDropdown()}
          className="inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm  hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-coffee-light focus:ring-offset-2 focus:ring-offset-gray-100"
        >
          {active}
          <ArrowDown className="stroke-dark" width={14} />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full z-10 mt-3 min-w-[120px] animate-anim-dropdown rounded-md bg-white text-left shadow-md">
            <div className="py-1">
              {items.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-50"
                    onClick={() => {
                      selectItem(item);
                      toggleDropdown();
                    }}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
