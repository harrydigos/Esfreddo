import { NextPage } from "next";
import Image from "next/image";
import map from "@public/map.jpg";
import StoresSidebar from "@components/StoresSidebar";

const Stores: NextPage = () => {
  return (
    <>
    <div className="container mx-auto">
      <StoresSidebar />

      
    </div>
    <Image
        src={map}
        alt="Map"
        className="w-screen h-screen object-cover"
      ></Image>
    </>
  );
};

export default Stores;
