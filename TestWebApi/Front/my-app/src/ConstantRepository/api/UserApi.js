import { baseApiFetch } from "./ApiInterceptor"

export function Login(payload) {
  return baseApiFetch("api/User/Login", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      Accept: "application/json",
      "content-type": "application/json",
    },
  })
}
