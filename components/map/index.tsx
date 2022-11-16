import Spinner from "@components/Spinner";
import MapProvider from "./MapProvider";
import { useEffect, useMemo, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapMarker from "./MapMarker";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN || "";

const useMap = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const mapConst = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/digos/clafv45pa000l14sals7h1ijw",
      center: [-74.006, 40.7128],
      zoom: 12,
    });

    mapConst.on("load", () => {
      setIsLoaded(true);
      mapConst.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    });

    setMap(mapConst);

    return () => {
      mapConst.remove();
      setMap(null);
    };
  }, []);

  // return { mapContainerRef, isLoaded, map };
  
  return useMemo(() => ({
    mapContainerRef,
    isLoaded,
    map: map
  }), [mapContainerRef, map, isLoaded]);
};

const MapComponent = () => {
  const methods = useMap();
  const { mapContainerRef, isLoaded } = methods;

  return (
    <MapProvider {...methods}>
      {!isLoaded && <Spinner />}
      <div
        className="absolute w-screen h-screen overflow-hidden"
        ref={mapContainerRef}
      />

      <MapMarker {...{ lat: 40.7128, lng: -74.006 }} />
      <MapMarker {...{ lat: 40.7608722, lng: -73.9661197 }} />
    </MapProvider>
  );
};

export default MapComponent;
