import { FC } from "react";

type MenuProps = JSX.IntrinsicElements["nav"];

export const Menu: FC<MenuProps> = () => {
  return (
    <nav className="fixed top-0 flex w-full items-center justify-center border-b">
      <p className="text-base text-slate-800 p-4">Esfreddo</p>
    </nav>
  );
};