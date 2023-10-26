import getApiClient from "../getApiClient";


const updateProduct = async (productId: number, values: any) => {
  const url = `http://localhost:3000/api/product/${productId}`;
  const reqInstance = getApiClient(null);

  try {
    const { data } = await reqInstance.patch(url, values);

    return [null, true]
  } catch (error) {
    console.log(error);
    return [Array.isArray(error) ? error : [error]]
  }
}

export default updateProduct;