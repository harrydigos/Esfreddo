import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "./footer";
import { LoginForm } from "./login";
import { Menu } from "./menu";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Esfreddo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <LoginForm />

      <Footer />
    </div>
  );
};

export default Home;
