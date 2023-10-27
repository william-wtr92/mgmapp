import { parseCookies } from "nookies"
import Axios from "axios"

const getApiClient = (context: any) => {
  const { token } = parseCookies(context)

  const reqInstance = Axios.create({
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return reqInstance
}

export default getApiClient