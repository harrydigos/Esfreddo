import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";
import { useNavbarContext } from "./NavbarProvider";
import { useSessionContext } from "@supabase/auth-helpers-react";
import ProfileDropdown from "@components/dropdowns/profile/ProfileDropdown";
import CartDropdown from "@components/dropdowns/cart/CartDropdown";

const LoggedIn = () => {
  return (
    <div className="flex items-center gap-6">
      <CartDropdown />
      <ProfileDropdown />
    </div>
  );
};

const LoggedOut = () => {
  return (
    <div className="flex items-center justify-center gap-6">
      <CartDropdown />
      <Link href="/login">Login</Link>
      <Link
        className="inline-block rounded-md bg-coffee-dark px-4 py-1 font-medium text-coffee-cream-light"
        href="/signUp"
      >
        Sign up
      </Link>
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
          { "-translate-y-[100px]": !visible },
          "fixed top-2 z-50 w-screen bg-transparent transition-transform duration-500 ease-in-out"
        )}
      >
        <div className="container mx-auto flex h-14 items-center justify-between rounded-2xl border border-white/20 bg-white/50 px-4 text-lg font-semibold text-dark drop-shadow-[0px_0px_16px_rgba(41,41,41,0.2)] backdrop-blur-[4px]">
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/"
              className="bg-gradient-to-tr from-coffee-dark to-coffee-cream bg-clip-text text-2xl font-extrabold text-transparent"
            >
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
