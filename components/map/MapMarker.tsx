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

  const popUpData = {
    address: "1234 Main St",
    city: "New York",
    state: "NY",
    image: "/cafe.jpg",
  };

  useEffect(() => {
    if (!ctx?.map) return;

    const marker = new mapboxgl.Marker(createMarker())
      .setLngLat([props.lng, props.lat])
      .setPopup(
        new mapboxgl.Popup()
          .setOffset([0, -20])
          .setLngLat([props.lng, props.lat])
          .setDOMContent(createPopup(popUpData))
      )
      .addTo(ctx.map);
  }, [ctx?.map]);
  return null;
};

const createMarker = (): HTMLDivElement => {
  const el = document.createElement("div");
  el.className = classNames(styles.marker);
  return el;
};

type popUpProps = {
  address: string;
  city: string;
  state: string;
  image: string;
};

const createPopup = ({ ...props }: popUpProps): HTMLDivElement => {
  const popup = document.createElement("div");
  const image = document.createElement("img");
  const info = document.createElement("div");
  const location = document.createElement("div");
  const address = document.createElement("div");
  const city = document.createElement("div");
  const orderBtn = document.createElement("button");

  popup.className = classNames(styles.popup);
  image.className = classNames(styles.image);
  image.src = props.image;

  info.className = classNames(styles.info);
  location.className = classNames(styles.location);
  address.className = classNames(styles.address);
  address.innerText = props.address;
  city.className = classNames(styles.city);
  city.innerText = props.city + ", " + props.state;

  orderBtn.className = classNames(styles.orderBtn);
  orderBtn.innerText = "Order";

  location.appendChild(address);
  location.appendChild(city);
  info.appendChild(location);
  popup.appendChild(image);
  popup.appendChild(info);
  popup.appendChild(orderBtn);

  return popup;
};

export default MapMarker;
