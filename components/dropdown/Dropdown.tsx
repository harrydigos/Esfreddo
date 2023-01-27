import { ArrowDown, TickCircle } from "@components/icons";
import { useCloseDropdown } from "@hooks/useCloseDropdown";
import { useRef, useState } from "react";
import { useDropdownContext } from "./DropdownProvider";
import classNames from "classnames";

const DropdownItem = ({ item, toggleDropdown }: { item: string; toggleDropdown: () => void }) => {
  const { selectItem, active } = useDropdownContext();

  return item === active ? (
    <div
      onClick={() => toggleDropdown()}
      className="inline-flex w-full cursor-pointer justify-between gap-2 whitespace-nowrap px-4 py-2 hover:bg-gray-50"
    >
      {active}
      <TickCircle className="stroke-coffee-dark" width={20} />
    </div>
  ) : (
    <div
      onClick={() => {
        selectItem(item);
        toggleDropdown();
      }}
      className="cursor-pointer whitespace-nowrap px-4 py-2 hover:bg-gray-50"
    >
      {item}
    </div>
  );
};

export const Dropdown = () => {
  const { active, items } = useDropdownContext();
  const [showDropdown, setShowDropdown] = useState(false);

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
          <ArrowDown
            className={classNames(showDropdown ? "-scale-100" : null, "stroke-dark transition-all")}
            width={14}
          />
        </button>

        {showDropdown && (
          <div className="absolute right-0 top-full z-10 mt-3 min-w-[120px] animate-anim-dropdown rounded-md bg-white text-left shadow-md">
            <div className="py-1">
              {items.map((item, i) => {
                return <DropdownItem key={i} item={item} toggleDropdown={toggleDropdown} />;
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
