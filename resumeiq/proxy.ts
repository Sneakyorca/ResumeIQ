import { type NextRequest, NextResponse } from "next/server";
import { isLoggedIn } from "./data/data";
export async function proxy(request: NextRequest) {
  //   return NextResponse.redirect(new URL("/", request.url));
  //   if (request.nextUrl.pathname === "/profile" && !isLoggedIn) {
  //     return NextResponse.redirect(new URL("/auth", request.nextUrl));
  //   }
  // export const config = {
  //   matcher: "/profile",
}
