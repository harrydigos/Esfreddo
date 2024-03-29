import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../layouts/layout";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import NavbarProvider from "@components/navbar/NavbarProvider";
import UserCartProvider from "@components/user/UserCartProvider";
import OrderHistoryProvider from "@components/user/history/OrderHistoryProvider";
import { _supabaseClient } from "@utils/supabase";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => _supabaseClient);

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Esfreddo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <UserCartProvider>
          <OrderHistoryProvider>
            <NavbarProvider>
              <Layout>
                <Component {...pageProps} />
                <Analytics />
              </Layout>
            </NavbarProvider>
          </OrderHistoryProvider>
        </UserCartProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
