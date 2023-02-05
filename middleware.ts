import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  /* If the user is not logged in and is trying to access the order history page, redirect them to the home page */
  if (req.nextUrl.pathname.startsWith("/order-history") && !session) {
    return NextResponse.rewrite(new URL("/", req.url));
  }
}
