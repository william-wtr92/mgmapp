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

const useGetAllCategories = () => {
  const url = "http://localhost:3000/api/category/all"

  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    allCategoriesData: data,
    allCategoriesError: error,
    allCategoriesLoading: isLoading,
    refreshCategories: mutate
  }
}

export default useGetAllCategories
