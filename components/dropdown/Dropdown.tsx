import { FC } from "react";

type DropdownProps = {
  items: string[];
  selectItem: (item: string) => void;
  showDropdown: boolean;
  toggleDropdown: () => void;
};

export const Dropdown: FC<DropdownProps> = ({ items, selectItem }) => {
  return (
    <>
      <div>
        {items.map((item, index) => {
          return (
            <div key={index} onClick={() => selectItem(item)}>
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
};
