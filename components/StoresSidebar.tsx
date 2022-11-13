import Store from "@components/Store";

const StoresSidebar = () => {
  return (
    <div className="h-screen flex items-center">
      <div className="w-[400px] h-3/4 drop-shadow-[0px_16px_32px_rgba(133,133,133,0.5)] backdrop-blur-[8px] bg-white/50 border border-white/20 rounded-2xl">
        <div className="flex h-full flex-col gap-3 p-3">
          <div className="top-3 w-full pb-3 border-b border-dark/10">
            <input
              className="input-field rounded-full"
              type="text"
              placeholder="Find a store"
              // minor changes to the input field
            />
          </div>
          <div className="h-full overflow-y-auto scrollbar-hide">
            <div className="flex flex-col">
              <Store />
              <Store />
              <Store />
              <Store />
              <Store />
              <Store />
              <Store />
              <Store />
              <Store />
              <Store />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoresSidebar;
