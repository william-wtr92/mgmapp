import ProductModel from "@/api/db/models/ProductModel"
import auth from "@/api/middelwares/auth"
import mw from "@/api/mw"
import { searchProductMw } from "@/types/product/type"

const handler = mw({
  GET: [
    auth(),
    async ({ res }: searchProductMw) => {
      const products = await ProductModel.query()
        .orderBy("createdAt", "desc")
        .limit(4)

      res.send({ result: products })
    },
  ],
})

export default handler
