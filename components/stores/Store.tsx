import { useMapContext } from "@components/map/MapProvider";
import { StoreType } from "models/StoreType";
import { useCallback } from "react";
import ClockIcon from "../icons/ClockIcon";
import HeartIcon from "../icons/HeartIcon";
import LocationIcon from "../icons/LocationIcon";

const Store: React.FC<Pick<StoreType, "address" | "city" | "state" | "time_close" | "time_open" | "lat" | "lng">> = ({
  address,
  city,
  state,
  time_open,
  time_close,
  lat,
  lng,
}) => {
  const {
    prev: { map },
  } = useMapContext();

  const findInMap = useCallback(() => {
    if (map && lng && lat) {
      map.flyTo({
        center: [lng, lat],
        zoom: 15,
      });
    }
  }, []);

  return (
    <button
      onClick={findInMap}
      className="flex cursor-pointer gap-3 rounded-xl px-3 py-[10px] duration-100 hover:bg-white/70 focus:bg-white/70 focus:outline-none focus:ring focus:ring-coffee-cream"
    >
      <div className="aspect-square h-20 rounded-lg bg-coffee-cream-light object-cover" />
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start justify-center gap-[3px]">
          <div className="w-56 truncate text-left text-xl font-semibold text-coffee-dark">{address}</div>
          <div className="flex h-[22px] items-center gap-2">
            <LocationIcon stroke="#6B4F4F" width={16} height={16} strokeWidth={2} />
            <div className="font-medium text-coffee-light">
              {city}, {state}
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-coffee-cream px-2 py-1">
            <ClockIcon stroke="#483434" width={14} height={14} strokeWidth={2} />
            <div className="text-xs font-bold text-coffee-dark">
              {time_open} - {time_close}
            </div>
          </div>
        </div>
        <div className="self-center rounded-xl bg-coffee-light py-[6px] px-2">
          <HeartIcon stroke="#eed6c4" strokeWidth={2} />
        </div>
      </div>
    </button>
  );
};

export default Store;
