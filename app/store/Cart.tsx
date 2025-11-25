import Header from "../components/Header"
// import { getCartProductsFromUser, getUserFromCookiesNavigate } from "../lib/utilServer"

export default async function Cart() {
  // const user = await getUserFromCookiesNavigate(`cart`)

  // const products = getCartProductsFromUser(user)

  return (
    <>
      <Header role={0} />
      <div>
        {/* {products.map(([p, n]) => (
          <div key={p.id}>
            {p.name}: {n}
          </div>
        ))} */}
      </div>
    </>
  )
}
