import { type NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "./data/data";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/profile" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth", request.nextUrl));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};
