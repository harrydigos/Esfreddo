import { NextPage } from "next";
import { lazy, Suspense } from 'react';
import StoresSidebar from "@components/StoresSidebar";
import dynamic from "next/dynamic";
import Spinner from "@components/Spinner";
const Map = dynamic(() => import('@components/map'), { suspense: true });

const Stores: NextPage = () => {

  return (
    <>
      <Suspense fallback={<Spinner />}>
        <Map />
      </Suspense>

      <div className="container mx-auto">
        <StoresSidebar />
      </div>
    </>
  );
};

export default Stores;
