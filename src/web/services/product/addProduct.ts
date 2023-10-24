import { Product } from "@/types/product/type"
import axios from "axios"

const addProduct = async (productData: Product) => {
  try {
    const { name, desc, stock, categoryId } = productData

    const response = await axios.post("/api/product", {
      name,
      desc,
      stock,
      categoryId,
    })

    if (response.data.result) {
      return { success: true }
    }
  } catch (err: any) {
    const error = err.response?.data?.error || "Oops. Something went wrong"

    return [error]
  }
}

export default addProduct
