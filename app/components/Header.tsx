import Link from "next/link"
import Logo from "./Logo"
import Logout from "./Logout"

function HeaderLink({ label, url }: HeaderLinkProps) {
  return (
    <Link className="h-6 mx-4 my-2 text-6 float-right justify-self-center" href={url}>
      {label}
    </Link>
  )
}

export default function Header({ role }: HeaderProps) {
  return (
    <header className="w-screen h-10">
      <Logo />

      {role! > 0 ? <Logout /> : null}
      {role === 0 ? <HeaderLink url="/" label="Menu" /> : null}
      {role! > 0 ? <HeaderLink url="cart" label="Koszyk" /> : null}
      {role! > 0 ? <HeaderLink url="store" label="Sklep" /> : null}
      {role! > 1 ? <HeaderLink url="kitchen" label="Kuchnia" /> : null}
      {role! > 2 ? <HeaderLink url="admin" label="Admin" /> : null}
    </header>
  )
}
