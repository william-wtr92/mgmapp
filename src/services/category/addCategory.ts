import getApiClient from "../getApiClient"

const addCategory = async (values: any): Promise<[null, boolean] | [any]> => {
  const reqInstance = getApiClient(null)
  const url = "http://localhost:3000/api/category"

  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = await reqInstance.post(url, values)

    return [null, true]
  } catch (error) {
    return [Array.isArray(error) ? error : [error]]
  }
}

export default addCategory
