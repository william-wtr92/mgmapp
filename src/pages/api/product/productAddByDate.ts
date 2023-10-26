import ProductModel from "@/api/db/models/ProductModel"
import auth from "@/api/middelwares/auth"
import mw from "@/api/mw"
import { searchProductMw } from "@/types/product/type"

const handler = mw({
  GET: [
    auth(),
    async ({ res }: searchProductMw) => {
      const productsByDay = await ProductModel.query()
        .select(
          ProductModel.raw(
            'DATE_TRUNC(\'day\', "product"."createdAt") as created_day'
          )
        )
        .count("id as product_count")
        .groupByRaw('DATE_TRUNC(\'day\', "product"."createdAt")')
        .orderBy("created_day", "desc")

      res.send({ result: productsByDay })
    },
  ],
})

export default handler
