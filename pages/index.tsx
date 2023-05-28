import { useSession } from "@supabase/auth-helpers-react";
import type { NextPage } from "next";
import Image from "next/image";
import heroImg from "@public/hero.jpg";
import Link from "next/link";
import { ArrowDown } from "@components/icons";

const Home: NextPage = () => {
  return (
    <div className="w-screem h-screen">
      <Image
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src={heroImg}
        alt="Coffee Machine"
        placeholder="blur"
      />
      <div className="container mx-auto flex h-full flex-col justify-center gap-10">
        <div>
          <h1 className="mb-4 w-fit bg-gradient-to-r from-coffee-light to-coffee-light/75 bg-clip-text text-7xl font-bold text-transparent">
            Esfreddo
          </h1>
          <p className="text-2xl text-coffee-dark">Everything about coffee</p>
        </div>

        <Link
          href="/products"
          className="inline-flex w-fit gap-2 rounded-lg border-2 border-coffee-light bg-white py-2 px-6 text-lg font-medium text-coffee-dark"
        >
          See products
          <ArrowDown className="-rotate-90 stroke-coffee-dark" width={20} />
        </Link>
      </div>
    </div>
  );
};

export default Home;
