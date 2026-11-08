import { cookies, headers } from "next/headers";
// import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  // const requestHeaders = request.headers;
  // console.log(requestHeaders.get("Authorization"));
  //   redirect("/mm");

  const headerList = await headers();

  const theme = request.cookies.get("theme");
  const cookieStore = await cookies();
  cookieStore.set("resultPerPage", "20");

  console.log(theme, cookieStore.get("resultPerPage"));

  console.log(headerList.get("Authorization"));
  return new Response("<h1>Profile updated</h1>", {
    headers: { "Content-Type": "text/html", "Set-Cookie": "theme=dark" },
  });
}
