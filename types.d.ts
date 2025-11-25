/// <reference types="next" />
/// <reference types="next/image-types/global" />

module "*.css" {}

// Frontend
type LRFormInputProps = {
  name: string
  type: string
  autoFocus: boolean
}

type LRFormProps = {
  action: (formData: FormData) => void | Promise<void>
  login?: boolean
}

type HeaderProps = {
  role: number
}

type HeaderLinkProps = {
  label: string
  url: TUrl
}

type ImageGrabberCbType = (data: string) => void

type ImageGrabberProps = {
  src: { value: string }
  id: number
}

type CookieType = `token`

type TUrl = `/` | `login` | `register` | `store` | `cart` | `kitchen` | `admin`

type Obj<T> = { [key: string]: T }

// Backend
type User = {
  id: number
  name: string
  passwordHash: string
  email: string
  token: string
  role: number
  cart: { [key: number]: number }
  items: { [key: number]: number }
}

type Product = {
  id: number
  name: string
  cost: string
  img: string
}

type TokenProps = {
  name: string
  password: string
}

type RegisterProps = {
  name: string
  password: string
  email: string
}
