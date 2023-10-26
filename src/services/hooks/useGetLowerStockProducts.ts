import useSWR from "swr";
import getApiClient from "../getApiClient";

const fetcher = async (url: string) => {
  const reqInstance = getApiClient(null);
  
  try {
    const { data } = await reqInstance.get(url)

    return data.result;
  } catch (error) {
    console.log(error);
  }
}

const useGetLowerStockProducts = () => {
  const url = 'http://localhost:3000/api/product/stock'

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    lowerStockProductsData: data,
    lowerStockProductsError: error,
    lowerStockProductsIsLoading: isLoading
  }
}

export default useGetLowerStockProducts;