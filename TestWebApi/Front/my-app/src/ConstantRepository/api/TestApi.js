import { baseApiFetch } from "./ApiInterceptor"
import Cookies from "js-cookie"

export function GetTests() {
  return baseApiFetch(
    "api/Test/GetTests",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Cookies.get("JWT"),
      },
    }
  )
}

export function GetTestById(testId) {
  return baseApiFetch(
    "api/Test/GetTestById?" +
    new URLSearchParams({ testId: testId }),
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + Cookies.get("JWT"),
      },
    }
  )
}
