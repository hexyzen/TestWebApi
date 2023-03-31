import ConstantsList from "../ConstantsList"
import Cookies from "js-cookie"

export async function baseApiFetch(...args) {
  let [resource, config] = args
  let response = await fetch(process.env.REACT_APP_API_URL + resource, config)

  if (response.status === 401) {
    return (
      await window.location.replace(`/${ConstantsList.ROUTE_LOGIN_PAGE}`),
      Cookies.remove("JWT"),
      Promise.reject(response)
    )
  }

  return response
}
