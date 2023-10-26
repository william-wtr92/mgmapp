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

const useGetUsers = () => {
  const url = "http://localhost:3000/api/user/all"

  const { data, error, isLoading, mutate } = useSWR(url, fetcher)

  return {
    userData: data,
    userError: error,
    userLoading: isLoading,
    updateUsers: mutate
  }
}

export default useGetUsers
