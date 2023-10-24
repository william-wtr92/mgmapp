import ProductModel from "@/api/db/models/ProductModel"
import mw from "@/api/mw"
import { searchProductMw } from "@/types/product/type"

const handler = mw({
  GET: [
    async ({ res }: searchProductMw) => {
      const products = await ProductModel.query().select()

      res.send({ result: products })
    },
  ],
})

export default handler
