import Spinner from "@components/Spinner";
import MapProvider from "./MapProvider";
import { useRef, useState } from "react";
import MapContext from "./MapContext";

const MapComponent = () => {
  // const methods = useMap<RefObject<HTMLDivElement>, boolean>();
  // const [mapContainerRef, isLoaded] = methods;

  // Couldn't get the above to work, so I did this instead.
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <MapContext.Provider value={{ mapContainerRef, isLoaded, setIsLoaded }}>
      <MapProvider>
        {!isLoaded && <Spinner />}
        <div
          className="absolute w-screen h-screen overflow-hidden"
          ref={mapContainerRef}
        />

        {/* <MapMarker /> Doesn't work yet */}
      </MapProvider>
    </MapContext.Provider>
  );
};

export default MapComponent;
