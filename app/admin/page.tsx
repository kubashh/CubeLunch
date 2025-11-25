import Header from "../components/Header"
import AdminPage from "./AdminPage"
import { navigateToken } from "../lib/utilServer"

export default async function Admin() {
  const role = await navigateToken(`admin`)

  return (
    <>
      <Header role={role} />
      <AdminPage />
    </>
  )
}
