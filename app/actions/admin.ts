"use server"

import { users } from "@/db/db"

export async function changeUserRole(id: number, newRole: number) {
  const user = users.getById(id)
  if (!user) return

  user.role = newRole
  users.createById(id, user)
}

export async function deleteUser(id: number) {
  users.deleteById(id)
}
