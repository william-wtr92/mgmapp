import getApiClient from "../getApiClient"

const addProduct = async (values: any) => {
  const reqInstance = getApiClient(null)
  const url = "http://localhost:3000/api/product/add"

  try {
    const { data } = await reqInstance.post(url, values)

    return [null, true]
  } catch (error) {
    return [Array.isArray(error) ? error : [error]]
  }
}

export default addProduct
