import classNames from "classnames";
import mapboxgl from "mapbox-gl";
import { useContext, useEffect } from "react";
import { MapContext } from "./MapProvider";
import styles from "./marker.module.scss";
import type { Store } from "@hooks/useStores";

const MapMarker: React.FC<Store> = ({
  lat,
  lng,
  city,
  address,
  state,
  image,
}) => {
  const ctx = useContext(MapContext);

  useEffect(() => {
    if (!ctx?.map) return;

    const marker = new mapboxgl.Marker(createMarker())
      .setLngLat([lng!, lat!])
      .setPopup(
        new mapboxgl.Popup()
          .setOffset([0, -20])
          .setLngLat([lng!, lat!])
          .setDOMContent(createPopup({ city, address, state, image }))
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

const createPopup = ({
  ...props
}: Pick<Store, "address" | "city" | "state" | "image">): HTMLDivElement => {
  const popup = document.createElement("div");
  const image = document.createElement("img");
  const info = document.createElement("div");
  const location = document.createElement("div");
  const address = document.createElement("div");
  const city = document.createElement("div");
  const orderBtn = document.createElement("button");

  popup.className = classNames(styles.popup);
  image.className = classNames(styles.image);
  console.log(props.image);
  image.src = props.image!;

  info.className = classNames(styles.info);
  location.className = classNames(styles.location);
  address.className = classNames(styles.address);
  address.innerText = props.address!;
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
