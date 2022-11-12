import { Navbar } from "@components/navbar";
import Head from "next/head";
import { Footer } from "../components/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
