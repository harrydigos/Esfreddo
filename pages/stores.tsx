import { NextPage } from "next";
import { Suspense } from "react";
import StoresSidebar from "@components/stores/StoresSidebar";
import dynamic from "next/dynamic";
import Spinner from "@components/loader/Spinner";
import MapProvider from "@components/map/MapProvider";
import { useMap } from "@hooks/useMap";


const MapComponent = dynamic(() => import("@components/map/Map"), {
  suspense: true,
});

const Stores: NextPage = () => {
  const methods = useMap<HTMLDivElement>();

  return (
    <MapProvider {...methods}>
      <Suspense fallback={<Spinner />}>
        <MapComponent />
      </Suspense>

      <div className="container mx-auto">
        <StoresSidebar />
      </div>
    </MapProvider>
  );
};

export default Stores;
