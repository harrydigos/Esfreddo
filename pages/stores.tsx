import { NextPage } from "next";
import StoresSidebar from "@components/StoresSidebar";
import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const Stores: NextPage = () => {
  const mapContainer = useRef<any>(null);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_GL_ACCESS_TOKEN || "";

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v10",
      center: [-74.006, 40.7128],
      zoom: 12,
    });
    return () => map.remove();
  }, []);

  return (
    <>
      <div className="container mx-auto">
        <StoresSidebar />
      </div>
      <div
        className="w-screen h-screen overflow-hidden"
        ref={mapContainer}
      ></div>
    </>
  );
};

export default Stores;
