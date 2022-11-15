import Spinner from "@components/Spinner";
import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import styles from "./marker.module.scss";
import classNames from "classnames";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN || "";

const MapComponent = () => {
  const [isLoaded, setLoaded] = useState<boolean>(false);
  const mapContainer = useRef<HTMLDivElement>(null);

  const addMarker = ({
    lat,
    lng,
    map,
  }: {
    lng: number;
    lat: number;
    map: Map;
  }) => {
    const e = document.createElement("div");
    e.className = classNames(styles.marker);

    const marker = new mapboxgl.Marker(e, {
      draggable: false,
    })
      .setLngLat([lng, lat])
      .addTo(map);
  };

  useEffect(() => {
    if (!mapContainer.current) return;
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/digos/clafv45pa000l14sals7h1ijw",
      center: [-74.006, 40.7128],
      zoom: 12,
    });

    map.on("load", () => {
      setLoaded(true);
      addMarker({ lat: 40.7128, lng: -74.006, map });
      map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    });

    return () => map.remove();
  }, []);

  return (
    <>
      {!isLoaded && <Spinner />}
      <div
        className="absolute w-screen h-screen overflow-hidden"
        ref={mapContainer}
      />
    </>
  );
};

export default MapComponent;
