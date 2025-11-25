import { redirect } from "next/navigation"
import { CHARSET, CODE_ADMIN, CODE_COOK, CODE_USER } from "./consts"

export function randChar(n = 1) {
  const buf = []
  for (let i = 0; i < n; i++) buf.push(CHARSET.at(Math.floor(Math.random() * CHARSET.length)))
  return buf.join(``)
}

export function navigateByRole(role: number, currentUrl: TUrl) {
  switch (role) {
    case CODE_USER:
      if ([`register`, `login`, `kitchen`, `admin`].includes(currentUrl)) navigate(`store`, currentUrl)
      break
    case CODE_COOK:
      if ([`register`, `login`, `admin`].includes(currentUrl)) navigate(`kitchen`, currentUrl)
      break
    case CODE_ADMIN:
      if ([`register`, `login`].includes(currentUrl)) navigate(`admin`, currentUrl)
      break
    default:
      return navigate(`register`, currentUrl)
  }
}

function navigate(url: TUrl, curentUrl: TUrl) {
  if (curentUrl !== url) redirect(url)
}
