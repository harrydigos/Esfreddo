import { createContext, RefObject } from "react";

type MapProviderProps = {
  children: React.ReactNode;
  mapContainerRef: RefObject<HTMLDivElement>;
  isLoaded: boolean;
};

type MapContextType = {
  mapContainerRef: RefObject<HTMLDivElement>;
  isLoaded: boolean;
  map?: mapboxgl.Map;
  // setIsLoaded: (isLoaded: boolean) => void;
} | null;

export const MapContext = createContext<MapContextType>(null);

const MapProvider: React.FC<MapProviderProps> = ({ children, ...props }) => {
  return (
    <MapContext.Provider value={{ ...props }}>{children}</MapContext.Provider>
  );
};

export default MapProvider;
