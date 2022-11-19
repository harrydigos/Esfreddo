import Spinner from "@components/loader/Spinner";
import MapMarker from "./MapMarker";
import { useStores } from "@hooks/useStores";
import { useMapContext } from "./MapProvider";
import { useRef } from "react";



const MapComponent = () => {
  const { initMap, prev: { isLoaded } } = useMapContext()
  const { data: stores } = useStores();

  return (
    <>
      {!isLoaded && <Spinner />}
      <div
        className="absolute w-screen h-screen overflow-hidden"
        ref={initMap}
      />

      {stores && stores.map((store) => <MapMarker key={store.id} {...store} />)}
    </>
  );
};

export default MapComponent;
