import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../layouts/layout";
import { SessionContextProvider, Session } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Head from "next/head";
import NavbarProvider from "@components/navbar/NavbarProvider";
import UserCartProvider from "@components/user/UserCartProvider";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session }>) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Esfreddo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <UserCartProvider>
          <NavbarProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </NavbarProvider>
        </UserCartProvider>
      </SessionContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
