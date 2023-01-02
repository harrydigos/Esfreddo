import { useSession, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { FC } from "react";
import Bag from "./icons/BagIcon";

type NavbarProps = JSX.IntrinsicElements["nav"];

const Navbar: FC<NavbarProps> = () => {
  const session = useSession();
  const user = useUser();

  return (
    <nav className="absolute bg-transparent top-2 z-30 w-full">
      <div
        className="container h-14 px-4 mx-auto flex items-center justify-between font-semibold text-lg text-dark
      drop-shadow-[0px_0px_16px_rgba(41,41,41,0.2)] backdrop-blur-[4px] bg-white/50 border border-white/20 rounded-2xl"
      >
        <div className="flex items-center justify-center gap-6">
          <Link href="/" className="font-extrabold text-2xl">
            ESFREDDO
          </Link>
          <div className="w-[2px] h-6 bg-coffee-cream rounded-full"></div>
          <Link href="/">Home</Link>
          <a href="/products">Products</a>
          <Link href="/stores">Stores</Link>
          <a href="#">Company</a>
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
                <div className="whitespace-nowrap max-w-[140px] overflow-hidden text-ellipsis text-dark">
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

export default Navbar;
