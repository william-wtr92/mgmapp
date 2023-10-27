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

const useGetProductAddByDate = () => {
  const url = "http://localhost:3000/api/product/productAddByDate"

  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    productAddByDateData: data,
    productAddByDateError: error,
    productAddByDateLoading: isLoading,
    refreshProductAddByDate: mutate
  }
}

export default useGetProductAddByDate
