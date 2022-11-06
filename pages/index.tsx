import type { NextPage } from "next";
import Head from "next/head";
import { Footer } from "../components/footer";
import { Menu } from "../components/menu";


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Esfreddo</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Menu />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
