import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";

export async function middleware(req) {
  const token = await getToken({req, secret: process.env.TOKEN_SECRET});

  if (token) {
    if (
      req.nextUrl.pathname === "/login" ||
      req.nextUrl.pathname === "/signup"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup"],
};
