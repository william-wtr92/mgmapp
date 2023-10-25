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

const useGetHistoricProducts = () => {
  const url = "http://localhost:3000/api/product/historic"

  const { data, error, isLoading } = useSWR(url, fetcher)

  return {
    productHistoricData: data,
    productHistoricError: error,
    productHistoricLoading: isLoading,
  }
}

export default useGetHistoricProducts
