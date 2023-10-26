import getApiClient from "../getApiClient"

const addCategory = async (values: any) => {
  const reqInstance = getApiClient(null)
  const url = "http://localhost:3000/api/category"

  try {
    const { data } = await reqInstance.post(url, values)

    return [null, true]
  } catch (error) {
    console.log(error);
    return [Array.isArray(error) ? error : [error]]
  }
}

export default addCategory
