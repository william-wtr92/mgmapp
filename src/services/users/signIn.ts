import { LoginInitialValues } from "@/types/login/LoginInitialValues";
import Axios from "axios";
import { setCookie } from "nookies";


const signIn = async (values: LoginInitialValues) => {
  const url = "http://localhost:3000/api/sign-in";
  const body = {
    email: values.email,
    password: values.password
  };

  try {
    const { data: { result } } = await Axios.post(url, body);

    setCookie(null, "token", result, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })

    return [null, true];
  } catch (error) {
    return [Array.isArray(error) ? error : [error]];
  }
}

export default signIn;