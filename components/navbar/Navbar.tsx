import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import { useNavbarContext } from "./NavbarProvider";
import { BagIcon } from "@components/icons";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { useUserContext } from "@components/user/UserCartProvider";

const LoggedIn = () => {
  const user = useUser();
  const { totalProducts } = useUserContext();
  const firstName = user?.user_metadata.full_name.split(" ")[0];

  return (
    <div className="flex items-center gap-6">
      <div className="relative inline-flex rounded-full bg-coffee-cream p-[6px]">
        <BagIcon stroke="#483434" width={32} height={32} />
        {totalProducts > 0 && (
          <div className="absolute bottom-0 -right-1 flex h-5 w-5 items-center justify-center overflow-hidden rounded-full bg-coffee-dark text-xs leading-none text-coffee-cream">
            {totalProducts}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap text-dark">{firstName}</div>
        <div className="h-10 w-10 rounded-full bg-[#C4CDEE]" />
      </div>
    </div>
  );
};

const LoggedOut = () => {
  return (
    <div className="flex items-center justify-center gap-6">
      <Link href="/login">Login</Link>
      <button className="inline-block rounded-md bg-coffee-dark px-4 py-1 text-coffee-cream-light">
        <Link href="/signUp">Sign up</Link>
      </button>
    </div>
  );
};

const Navbar: FC<JSX.IntrinsicElements["nav"]> = () => {
  const { session } = useSessionContext();
  const { visible } = useNavbarContext();

  return (
    <>
      <nav
        className={classNames(
          !visible ? "-translate-y-[100px]" : null,
          "fixed top-2 z-50 w-screen bg-transparent transition-transform duration-500 ease-in-out"
        )}
      >
        <div className="container mx-auto flex h-14 items-center justify-between rounded-2xl border border-white/20 bg-white/50 px-4 text-lg font-semibold text-dark drop-shadow-[0px_0px_16px_rgba(41,41,41,0.2)] backdrop-blur-[4px]">
          <div className="flex items-center justify-center gap-6">
            <Link href="/" className="text-2xl font-extrabold">
              ESFREDDO
            </Link>
            <div className="h-6 w-[2px] rounded-full bg-coffee-cream" />
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
            <Link href="/stores">Stores</Link>
            <a href="#">Company</a>
          </div>

          {session ? <LoggedIn /> : <LoggedOut />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
