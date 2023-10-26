import getApiClient from "../getApiClient"

const addProduct = async (values: any): Promise<[null, boolean] | [any]> => {
  const reqInstance = getApiClient(null)
  const url = "http://localhost:3000/api/product/add"

  try {
    const { data } = await reqInstance.post(url, values)

    return [null, true]
  } catch (error) {
    console.log(error);
    return [Array.isArray(error) ? error : [error]]
  }
}

export default addProduct
