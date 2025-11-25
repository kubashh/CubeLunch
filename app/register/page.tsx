import Header from "../components/Header"
import RegisterForm from "./RegisterForm"
import { navigateToken } from "../lib/utilServer"

export default async function Register() {
  const role = await navigateToken(`register`)

  return (
    <>
      <Header role={role} />

      <main className="w-fit mx-auto">
        <RegisterForm />
      </main>
    </>
  )
}
