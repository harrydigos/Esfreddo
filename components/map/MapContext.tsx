import { createContext, RefObject } from "react";

type MapContextType = {
  mapContainerRef: RefObject<HTMLDivElement>;
  isLoaded: boolean;
  setIsLoaded: (isLoaded: boolean) => void;
} | null;

const MapContext = createContext<MapContextType>(null);

export default MapContext;
