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

const useGetUserDetail = (userId: number) => {
  const url = `http://localhost:3000/api/user/${userId}`
  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    userDetailData: data,
    userDetailError: error,
    userDetailLoading: isLoading,
    refreshUserDetail: mutate
  }
}

export default useGetUserDetail
