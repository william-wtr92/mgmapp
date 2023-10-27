import getApiClient from "../getApiClient"


const updateUser = async(userId: number, values: any): Promise<[null, boolean] | [any]> => {
  const url = `http://localhost:3000/api/user/${userId}`
  const reqInstance = getApiClient(null)

  try {
    // eslint-disable-next-line no-unused-vars
    const { data } = await reqInstance.patch(url, values)

    return [null, true]
  } catch (error) {
    return [Array.isArray(error) ? error : [error]]
  }
}

export default updateUser