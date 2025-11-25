import Header from "../components/Header"
import KitchenPage from "./KitchenPage"
import { navigateToken } from "../lib/utilServer"

export default async function Kitchen() {
  const role = await navigateToken(`kitchen`)

  return (
    <>
      <Header role={role} />
      <KitchenPage />
    </>
  )
}
