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

const useGetStockByCat = () => {
  const url = "http://localhost:3000/api/category/stockByCat"

  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    stockByCatData: data,
    stockByCatError: error,
    stockByCatLoading: isLoading,
    refreshStockByCat: mutate
  }
}

export default useGetStockByCat
