import { FC } from "react";

type MenuProps = JSX.IntrinsicElements["nav"];

export const Menu: FC<MenuProps> = () => {
  return (
    <nav className="w-full fixed top-0 border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 font-medium text-lg text-stone-800">
        <div>
          <a>Esfreddo</a>
        </div>
        <div className="flex justify-center items-center gap-6">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Stores</a>
          <a href="#">Company</a>
        </div>
        <div className="flex justify-center items-center gap-6">
          <a href="#">Login</a>
          <button className="inline-block rounded border border-stone-800 bg-stone-800 px-3 py-1 text-white hover:bg-transparent hover:text-stone-800 focus:outline-none focus:ring active:text-stone-800">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};
