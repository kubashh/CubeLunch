import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { products, users } from "@/db/db"
import { CODE_ADMIN, CODE_COOK, CODE_USER, TOKEN_LENGTH } from "./consts"
import { randChar } from "./util"

export async function getUserRole() {
  return (await getUserFromCookies())?.role || 0
}

export async function getTokenFromCookies() {
  const cookieStore = await cookies()
  return cookieStore.get(`token`)?.value
}

export async function getUserFromCookies() {
  const token = await getTokenFromCookies()
  return users.get(`token`, token)
}

export async function getUserFromCookiesNavigate() {
  const token = await getTokenFromCookies()
  const user = users.get(`token`, token)
  if (!user) redirect(`login`)
  return user
}

export async function navigateToken(currentUrl: TUrl) {
  const role = await getUserRole()
  redirectBy(role, currentUrl)
  return role
}

function redirectBy(role: number, currentUrl: TUrl) {
  switch (role) {
    case CODE_USER:
      if ([`cook`, `admin`].includes(currentUrl)) redirect(`store`)
      break
    case CODE_COOK:
      if ([`admin`].includes(currentUrl)) redirect(`cook`)
      break
    case CODE_ADMIN:
      break
    default:
      if (![`login`, `register`].includes(currentUrl)) redirect(`login`)
  }
}

export function getElementFromUrl(url: string, key: string) {
  return Object.fromEntries(new URL(url).searchParams.entries())[key]
}

const MAX_PRODUCT_ID = 2 ** 52
export function genId(arr: Obj<any>[]) {
  let id = Math.floor(Math.random() * MAX_PRODUCT_ID)
  for (const e of arr) if (e.id === id) return genId(arr)
  return id
}

export function getUserIdByToken(token: string) {
  return users.get(`token`, token)?.role || 0
}

export function getTokenAndRole(name: string, password: string) {
  const user = users.get(`name`, name)
  if (!user) return
  if (Bun.password.verifySync(password, user.passwordHash)) {
    user.token = genToken()

    users.createById(user.id, user)

    return { role: user.role, token: user.token }
  }
}

export function getCartProductsFromUser(user: User) {
  const arr: [Product, number][] = []
  for (const i in user.cart) {
    const p = products.getById(Number(i))
    if (p) arr.push([p, user.cart[i]])
  }
  return arr
}

export function genToken() {
  return randChar(TOKEN_LENGTH)
}
