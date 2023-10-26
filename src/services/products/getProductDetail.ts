import useSWR from "swr"
import getApiClient from "../getApiClient"

const fetcher = async (url: string) => {
  const reqInstance = getApiClient(null)

  try {
    const { data } = await reqInstance.get(url)

    return data.result
  } catch (error) {
    return [Array.isArray(error) ? error : [error]]
  }
}

const useGetDetailProduct = (productId: number) => {
  const url = `http://localhost:3000/api/product/${productId}`

  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    productDetailData: data,
    productDetailError: error,
    productDetailLoading: isLoading,
    refreshProductDetail: mutate
  }
}

export default useGetDetailProduct
