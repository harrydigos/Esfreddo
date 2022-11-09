import Link from "next/link";
import { FC } from "react";

type NavbarProp = JSX.IntrinsicElements["nav"];

export const Navbar: FC<NavbarProp> = () => {
  return (
    <nav className="sticky top-0 z-30 w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-3 font-semibold text-lg text-coffee-dark">
        <div>
          <Link href="/" className="font-extrabold text-2xl">
            ESFREDDO
          </Link>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center gap-6">
          <Link href="/">Home</Link>
          <a href="#">Products</a>
          <a href="#">Stores</a>
          <a href="#">Company</a>
        </div>
        <div className="flex justify-center items-center gap-6">
          <Link href="/login">Login</Link>
          <button className="inline-block rounded-md bg-coffee-dark text-coffee-cream-light px-4 py-1">
            <Link href="/signUp">Sign up</Link>
          </button>
        </div>
      </div>
    </nav>
  );
};
