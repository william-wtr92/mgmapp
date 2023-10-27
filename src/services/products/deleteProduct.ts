import getApiClient from "../getApiClient"

const deleteProduct = async (productId: number) => {
  const reqInstance = getApiClient(null)
  const url = `http://localhost:3000/api/product/${productId}`

  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = await reqInstance.delete(url)

    return [null, true]
  } catch (error) {
    return [Array.isArray(error) ? error : [error]]
  }
}

export default deleteProduct
