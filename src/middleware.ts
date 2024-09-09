import { headers } from "next/headers";
import { NextResponse } from "next/server";

export function middleware() {
  const auth = headers().get("Authorization");
  if (auth && auth.startsWith("Basic ")) {
    const splitted = auth.split(" ");
    if (splitted.length === 2) {
      const [username, password] = atob(splitted[1]).split(":");
      if (
        username === process.env.ADMIN_USER &&
        password === process.env.ADMIN_PASSWORD
      )
        return NextResponse.next();
    }
  }
  const response = NextResponse.json({ status: 401 }, { status: 401 });
  response.headers.set("WWW-Authenticate", `Basic realm="User Visible Realm"`);
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
