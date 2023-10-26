import getApiClient from "../getApiClient";


const addUser = async(values: any) => {
  const url = "http://localhost:3000/api/user/add";
  const reqInstance = getApiClient(null);

  try {
    const { data } = await reqInstance.post(url, values);

    return [null, true]
  } catch (error) {
    return [Array.isArray(error) ? error : [error]]
  }
}

export default addUser;