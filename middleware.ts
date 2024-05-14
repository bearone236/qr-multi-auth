import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 認証済みかどうかを確認（簡易的な例としてCookieを使用）
  const isLoggedIn = request.cookies.get("logged_in");

  if (isLoggedIn) {
    // 認証済みの場合、/loginページにはアクセスさせない
    if (pathname === "/login" || pathname === "/qr") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // 認証されていない場合、/loginおよび/qrページ以外にはアクセスさせない
    if (pathname !== "/login" && pathname !== "/qr") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/reader", "/login", "/qr"],
};
