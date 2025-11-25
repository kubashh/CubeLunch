"use server"

import { z } from "zod"
import { users } from "@/db/db"
import { genToken, getTokenAndRole, getUserFromCookies } from "../lib/utilServer"

const zName = z
  .string()
  .min(4, `Name must contain minimum 4 characters`)
  .max(32, `Name can have max 32 characters`)

const zEmail = z
  .string()
  .min(4, `Email must contain minimum 4 characters`)
  .max(32, `Email can have max 32 characters`)

const zPassword = z
  .string()
  .min(4, `Email must contain minimum 4 characters`)
  .max(32, `Email can have max 32 characters`)

const NewUser = z.object({
  name: zName,
  email: zEmail,
  password: zPassword,
})

const TokenProps = z.object({
  name: zName,
  password: zPassword,
})

export async function token(data: unknown): Promise<{ message?: string; role?: number; token?: string }> {
  const tokenProps = TokenProps.safeParse(data)
  if (!tokenProps.success) return { message: tokenProps.error.message }

  const res = getTokenAndRole(tokenProps.data.name, tokenProps.data.password)
  if (!res) return { message: `Nie udało się zalogować, spróbuj ponownie.` }

  return res
}

export async function register(data: unknown) {
  const newUser = NewUser.safeParse(data)
  if (!newUser.success) return { message: newUser.error.message }

  if (users.get(`name`, newUser.data.name)) return { message: `Użytkownik o takim imieniu już istnieje!` }

  users.create({
    id: 0,
    name: newUser.data.name,
    passwordHash: await Bun.password.hash(newUser.data.password),
    email: newUser.data.email,
    token: genToken(),
    role: 1,
    cart: {},
    items: {},
  })
}

export async function addToCart(id: number) {
  const user = await getUserFromCookies()
  if (!user) return { message: `Nie ma takiego użytkownika!` }

  const cart = user.cart

  if (!cart[id]) cart[id] = 1
  else cart[id]++

  users.createById(user.id, { ...user, cart })

  console.log(user.cart)
}
