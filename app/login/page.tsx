import Header from "../components/Header"
import LoginForm from "./LoginForm"
import { navigateToken } from "../lib/utilServer"

export default async function Login() {
  const role = await navigateToken(`login`)

  return (
    <>
      <Header role={role} />

      <main className="w-fit mx-auto">
        <LoginForm />
      </main>
    </>
  )
}
