import { NextResponse } from "next/server"
import { getUserFromCookies } from "./app/lib/utilServer"
import { CODE_ADMIN, CODE_COOK, CODE_USER } from "./app/lib/consts"

export async function proxy(req: Request) {
  // login
  const user = await getUserFromCookies()
  const pathname = new URL(req.url).pathname.slice(1)
  console.count(`req`)
  console.log(user, user?.role)
  switch (user?.role) {
    case CODE_USER:
      if ([`cook`, `admin`].includes(pathname)) NextResponse.redirect(new URL("/store", req.url))
      break
    case CODE_COOK:
      if ([`admin`].includes(pathname)) NextResponse.redirect(new URL("/kitchen", req.url))
      break
    case CODE_ADMIN:
      return NextResponse.redirect(new URL("/admin", req.url))
    default:
      if (pathname !== `/login`) return NextResponse.redirect(new URL("/login", req.url))
      break
  }

  return NextResponse.next()
}

export const config = {
  matcher: [`/store`, `/kitchen`, `/admin`],
}
