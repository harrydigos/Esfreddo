import classNames from "classnames";
import mapboxgl, { Map } from "mapbox-gl";
import styles from "./marker.module.scss";

// Ignore this for now

type MapMarkerProps = {
  lat: number;
  lng: number;
  map: Map;
};

const MapMarker: React.FC<MapMarkerProps> = (props) => {
  const e = document.createElement("div");
  e.className = classNames(styles.marker);

  const marker = new mapboxgl.Marker(e, {
    draggable: false,
  })
    .setLngLat([props.lat, props.lng])
    .addTo(props.map);
  return <></>;
};

export default MapMarker;
