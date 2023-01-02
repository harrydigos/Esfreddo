type DropdownProps<T> = {
  items: T[];
  selectItem: (item: T) => void;
};

export const Dropdown = <T extends string>({ items, selectItem }: DropdownProps<T>) => {
  return (
    <>
      <div className="absolute z-10 right-0 top-full mt-3 min-w-[120px] animate-anim-dropdown text-left rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {items.map((item, index) => {
            return (
              <div key={index} className="px-4 py-2 cursor-pointer hover:bg-gray-100" onClick={() => selectItem(item)}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
