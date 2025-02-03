import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "@/lib/get-url";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("authjs.session-token");
  const pathname = request.nextUrl.pathname;

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL(getUrl("/notes")));
  }

  if (pathname.includes("/notes") && !token) {
    return NextResponse.redirect(new URL(getUrl("/login")));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
