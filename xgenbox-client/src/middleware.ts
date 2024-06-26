import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await getSession();

  if (!session) {
    if (pathname.includes("dashboard")) {
      return NextResponse.redirect(new URL("/sign-in", request.nextUrl).href);
    } else {
      return NextResponse.next();
    }
  } else {
    if (pathname === "/sign-in" || pathname.includes("sign-up")) {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl).href);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|^/images/).*)"],
};
