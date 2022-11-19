import type { AppMapType } from "@hooks/useMap";
import { PropsWithChildren } from "react";
import { useContext } from "react";
import { createContext } from "react";

const MapContext = createContext<AppMapType<HTMLDivElement>>({
  initMap: () => { },
  prev: {
    map: null,
    mapContainerRef: { current: undefined },
    isLoaded: false
  }
});

export const useMapContext = () => useContext(MapContext);


const MapProvider: React.FC<PropsWithChildren<AppMapType<HTMLDivElement>>> = ({ children, ...props }) => {
  return (
    <MapContext.Provider value={{ ...props }}>{children}</MapContext.Provider>
  );
};

export default MapProvider;
