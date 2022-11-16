import classNames from "classnames";
import mapboxgl from "mapbox-gl";
import { useContext, useEffect } from "react";
import { MapContext } from "./MapProvider";
import styles from "./marker.module.scss";

type MapMarkerProps = {
  lat: number;
  lng: number;
};

const MapMarker: React.FC<MapMarkerProps> = ({ ...props }) => {
  const ctx = useContext(MapContext);
  useEffect(() => {
    if (!ctx?.map) return;
    console.log(ctx.map);
    const e = document.createElement("div");
    e.className = classNames(styles.marker);

    const marker = new mapboxgl.Marker(e, {
      draggable: false,
    })
      .setLngLat([props.lng, props.lat])
      .addTo(ctx.map);
  }, [ctx?.map]);
  return null;
};

export default MapMarker;
