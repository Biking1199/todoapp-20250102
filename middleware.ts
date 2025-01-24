import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // ユーザーがログインしていない場合、ログインページにリダイレクト
  if (!session && req.nextUrl.pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // ユーザーがログイン済みの場合、ログインページにアクセスするとホームページにリダイレクト
  if (session && req.nextUrl.pathname === "/signin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

// このミドルウェアを適用するパスを指定
export const config = {
  matcher: ["/:path*"],
};
