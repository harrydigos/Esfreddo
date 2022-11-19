import { NextPage } from "next";
import { Suspense } from "react";
import StoresSidebar from "@components/stores/StoresSidebar";
import dynamic from "next/dynamic";
import Spinner from "@components/loader/Spinner";
const MapComponent = dynamic(() => import("@components/map/Map"), {
  suspense: true,
});

const Stores: NextPage = () => {
  return (
    <>
      <Suspense fallback={<Spinner />}>
        <MapComponent />
      </Suspense>

      <div className="container mx-auto">
        <StoresSidebar />
      </div>
    </>
  );
};

export default Stores;
