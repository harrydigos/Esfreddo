import Image from "next/image";
import ClockIcon from "./icons/ClockIcon";
import HeartIcon from "./icons/HeartIcon";
import LocationIcon from "./icons/LocationIcon";
import store from "@public/cafe.jpg";

const Store = () => {
  return (
    <>
      <div className="flex gap-3 px-3 py-[10px] rounded-xl duration-100 hover:bg-white/70">
        <Image
          src={store}
          alt={"Store"}
          className="w-20 h-20 rounded-lg object-cover"
        />
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col items-start justify-center gap-[3px]">
            <div className="text-xl font-semibold text-coffee-dark">
              3608 N Prince St
            </div>
            <div className="h-[22px] flex gap-2 items-center">
              <LocationIcon
                stroke="#6B4F4F"
                width={16}
                height={16}
                strokeWidth={2}
              />
              <div className="font-medium text-coffee-light">
                Clovis, New York
              </div>
            </div>
            <div className="flex px-2 py-1 gap-1 items-center bg-coffee-cream rounded-full">
              <ClockIcon
                stroke="#483434"
                width={14}
                height={14}
                strokeWidth={2}
              />
              <div className="font-bold text-xs text-coffee-dark">
                08:00 - 20:00
              </div>
            </div>
          </div>
          <div className="self-center py-[6px] px-2 rounded-xl bg-coffee-light">
            <HeartIcon stroke="#eed6c4" strokeWidth={2} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Store;