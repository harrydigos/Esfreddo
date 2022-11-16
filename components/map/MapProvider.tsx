import mapboxgl from "mapbox-gl";
import { useContext, useEffect } from "react";
import MapProviderContext from "./MapContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN || "";

type MapProviderProps = {
  children: React.ReactNode;
};

const MapProvider: React.FC<MapProviderProps> = (props) => {
  const context = useContext(MapProviderContext);

  useEffect(() => {
    if (!context || !context.mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: context.mapContainerRef.current,
      style: "mapbox://styles/digos/clafv45pa000l14sals7h1ijw",
      center: [-74.006, 40.7128],
      zoom: 12,
    });

    map.on("load", () => {
      context.setIsLoaded(true);
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    });

    return () => map.remove();
  }, []);

  return <>{props.children}</>;
};

export default MapProvider;
