import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

// function must be named "middleware"
export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  // automatically refreshes the session if its expired
  await supabase.auth.api.getSession();
  return res;
}