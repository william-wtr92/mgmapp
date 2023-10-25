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

const useGetSearchProduc = (productName: string) => {
  const url = `http://localhost:3000/api/product/search?search=${productName}`

  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    productsSearchData: data,
    productsSearchError: error,
    productsSearchLoading: isLoading,
  }
}

export default useGetSearchProduc
