import { useSession, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { FC } from "react";
import Bag from "./icons/Bag";

type NavbarProp = JSX.IntrinsicElements["nav"];

export const Navbar: FC<NavbarProp> = () => {
  const session = useSession();
  const user = useUser();

  // const [firstName] = user?.user_metadata.full_name.split(" ") || [];

  return (
    <nav className="absolute top-0 z-30 w-full border-b bg-white">
      <div className="container h-14 mx-auto flex items-center justify-between font-semibold text-lg text-dark">
        <div className="flex items-center justify-center gap-6">
          <Link href="/" className="font-extrabold text-2xl">
            ESFREDDO
          </Link>
          <div className="w-[2px] h-6 bg-coffee-cream rounded-full"></div>
          <div className="flex items-center justify-center gap-6">
            <Link href="/">Home</Link>
            <a href="#">Products</a>
            <a href="#">Stores</a>
            <a href="#">Company</a>
          </div>
        </div>

        {!session ? (
          <div className="flex justify-center items-center gap-6">
            <Link href="/login">Login</Link>
            <button className="inline-block rounded-md bg-coffee-dark text-coffee-cream-light px-4 py-1">
              <Link href="/signUp">Sign up</Link>
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-6">
              <div className="w-8 h-8 flex justify-center items-center bg-coffee-cream rounded-full">
                <Bag stroke="#483434" width={24} height={24} />
              </div>
              <div className="flex items-center gap-3">
                <div className="whitespace-nowrap max-w-[140px] overflow-hidden text-ellipsis text-coffee-light">
                  {user?.user_metadata.full_name.split(" ")[0]}
                </div>
                <div className="w-10 h-10 rounded-full bg-[#C4CDEE]"></div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};
